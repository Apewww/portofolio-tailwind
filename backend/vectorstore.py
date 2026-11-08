import os
import sys

import chromadb
import httpx
from chromadb.api.types import Documents, Embeddings, EmbeddingFunction

from kb import chunk_kb

EMBED_BASE_URL = os.environ.get("EMBED_BASE_URL", "http://localhost:8015").rstrip("/")
EMBED_MODEL = os.environ.get("EMBED_MODEL", "nomic-embed-text")
EMBED_API_KEY = os.environ.get("EMBED_API_KEY", "")
_BASE_DIR = os.path.dirname(__file__)
CHROMA_DIR = os.environ.get("CHROMA_DIR", os.path.join(_BASE_DIR, "chroma_db"))
if not os.path.isabs(CHROMA_DIR):
    CHROMA_DIR = os.path.join(_BASE_DIR, CHROMA_DIR)

COLLECTION_NAME = "kb_docs"
# Chroma/HNSW memakai "space" untuk mengukur kemiripan vektor.
HNSW_SPACE = "cosine"
MAX_DISTANCE = 0.95  # batas jarak cosine (0 = identik, 2 = berlawanan)


def get_embedding_function():
    # Jika EMBED_BASE_URL lokal/remote tersedia, pakai endpoint llama.cpp / nomic
    # Jika tidak diset atau server eksternal mati, gunakan built-in ONNXMiniLM_L6_V2 (all-MiniLM-L6-v2)
    # yang 100% lokal, cepat, mandiri tanpa ketergantungan server embedding terpisah.
    use_builtin = os.environ.get("EMBED_BUILTIN", "true").lower() in ("1", "true", "yes")
    if use_builtin:
        from chromadb.utils.embedding_functions import ONNXMiniLM_L6_V2
        return ONNXMiniLM_L6_V2()
    return LlamaServerEmbeddingFunction()


class LlamaServerEmbeddingFunction(EmbeddingFunction):
    """Embedding via llama.cpp server. Mencoba OpenAI-compatible /v1/embeddings,
    fallback ke endpoint native /embedding untuk build lama."""

    def __call__(self, input: Documents) -> Embeddings:
        with httpx.Client(timeout=5.0) as client:
            return [self._embed_one(client, t) for t in input]

    def _embed_one(self, client, text):
        headers = {"Authorization": f"Bearer {EMBED_API_KEY}"} if EMBED_API_KEY else {}
        r = client.post(
            f"{EMBED_BASE_URL}/v1/embeddings",
            headers=headers,
            json={"model": EMBED_MODEL, "input": text},
        )
        if r.status_code == 404:
            r = client.post(f"{EMBED_BASE_URL}/embedding", headers=headers, json={"content": text})
        if r.status_code != 200:
            raise RuntimeError(
                f"Embedding gagal ({r.status_code}) dari {EMBED_BASE_URL}: {r.text[:200]}"
            )
        data = r.json()
        if "data" in data:
            return data["data"][0]["embedding"]
        return data["embedding"]


def get_collection(recreate: bool = False):
    client = chromadb.PersistentClient(path=CHROMA_DIR)
    if recreate:
        try:
            client.delete_collection(COLLECTION_NAME)
        except Exception:
            pass
    ef = get_embedding_function()
    try:
        return client.get_or_create_collection(
            COLLECTION_NAME,
            metadata={"hnsw:space": HNSW_SPACE},
            embedding_function=ef,
        )
    except ValueError:
        col = client.get_or_create_collection(COLLECTION_NAME)
        col._embedding_function = ef
        return col


def _collection_uses_cosine(collection) -> bool:
    return (collection.metadata or {}).get("hnsw:space") == HNSW_SPACE


def ingest(force: bool = False):
    """Isi vector store dari knowledge base. Otomatis re-migrasi index jika
    collection lama memakai distance metric selain cosine."""
    collection = get_collection()

    if not _collection_uses_cosine(collection):
        print(f"[ingest] Deteksi index lama (space != {HNSW_SPACE}), rebuild collection...")
        collection = get_collection(recreate=True)

    force = force or os.environ.get("FORCE_REINGEST", "") in ("1", "true", "True")
    if collection.count() > 0 and not force:
        return

    if force and collection.count() > 0:
        print(f"[ingest] FORCE_REINGEST: menghapus {collection.count()} dokumen lama...")
        collection = get_collection(recreate=True)

    chunks = chunk_kb()
    collection.add(
        ids=[f"{c['key']}-{i}" for i, c in enumerate(chunks)],
        documents=[c["text"] for c in chunks],
        metadatas=[{"key": c["key"]} for c in chunks],
    )
    print(f"[ingest] OK: {len(chunks)} chunk ter-index ke {CHROMA_DIR} (space={HNSW_SPACE})")


def search(query, k=5, max_distance=MAX_DISTANCE):
    collection = get_collection()
    # 1. Semantic search via vector query
    res = collection.query(query_texts=[query], n_results=k * 2)
    docs = res.get("documents", [[]])[0] or []
    distances = res.get("distances", [[]])[0] or []

    # 2. Keyword/Lexical boost (Hybrid retrieval ringan):
    # Ekstrak token kata kunci penting (> 3 karakter) dari query untuk mencocokkan dokumen eksak
    # seperti nama proyek spesifik (RatingLy, StitchLab, Proxmox, SvcPanel, Unjani, dll.)
    raw_tokens = [w.lower().strip("?,.!") for w in query.split() if len(w.strip("?,.!")) >= 3]
    # Abaikan stop words umum bahasa Indonesia / Inggris
    stop_words = {"apakah", "bagaimana", "siapa", "dimana", "ceritakan", "tentang", "milik", "rafly", "apew", "yang", "dan", "dari", "untuk", "what", "how", "tell", "about"}
    keywords = [t for t in raw_tokens if t not in stop_words]

    scored_docs = []
    seen_texts = set()

    # Ambil semua dokumen yang lolos filter jarak
    for doc, dist in zip(docs, distances):
        if max_distance is not None and dist > max_distance:
            continue
        # Skor awal: 1.0 - (dist / 2.0)
        score = 1.0 - (dist / 2.0)
        doc_lower = doc.lower()
        for kw in keywords:
            if kw in doc_lower:
                score += 0.5  # Boost signifikan jika memuat keyword eksak
        scored_docs.append((score, doc))
        seen_texts.add(doc)

    # Jika ada keyword spesifik, cek juga seluruh chunk apakah ada exact match yang terlewat oleh semantik
    if keywords:
        all_data = collection.get()
        all_docs = all_data.get("documents", []) or []
        for d in all_docs:
            if d in seen_texts:
                continue
            d_lower = d.lower()
            matches = sum(1 for kw in keywords if kw in d_lower)
            if matches > 0:
                score = 0.5 + (0.3 * matches)
                scored_docs.append((score, d))
                seen_texts.add(d)

    # Urutkan berdasarkan skor tertinggi (hybrid semantic + exact match)
    scored_docs.sort(key=lambda x: x[0], reverse=True)
    final_docs = [doc for _, doc in scored_docs[:k]]

    res["documents"] = [final_docs]
    return res


if __name__ == "__main__":
    # python vectorstore.py --reingest
    if "--reingest" in sys.argv:
        ingest(force=True)
    else:
        ingest()
