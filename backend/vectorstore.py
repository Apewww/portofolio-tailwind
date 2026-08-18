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
# l2 (default) menghasilkan jarak yang nilainya tidak terbatas, sehingga
# filter max_distance pada search() tidak bermakna. cosine menghasilkan
# jarak dalam rentang [0, 2] dan lebih cocok untuk semantic search.
HNSW_SPACE = "cosine"
MAX_DISTANCE = 0.95  # batas jarak cosine (0 = identik, 2 = berlawanan)


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
    try:
        return client.get_or_create_collection(
            COLLECTION_NAME,
            metadata={"hnsw:space": HNSW_SPACE},
            embedding_function=LlamaServerEmbeddingFunction(),
        )
    except ValueError:
        # Collection lama dibuat tanpa embedding function custom (konflik nama EF).
        # Ambil apa adanya lalu pasang embedding function secara manual agar
        # query embedding tetap berfungsi.
        col = client.get_or_create_collection(COLLECTION_NAME)
        col._embedding_function = LlamaServerEmbeddingFunction()
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


def search(query, k=3, max_distance=MAX_DISTANCE):
    collection = get_collection()
    res = collection.query(query_texts=[query], n_results=k)
    docs = res.get("documents", [[]])[0] or []
    distances = res.get("distances", [[]])[0] or []

    if distances and max_distance is not None:
        filtered_docs = []
        for doc, dist in zip(docs, distances):
            if dist <= max_distance:
                filtered_docs.append(doc)
        res["documents"] = [filtered_docs]
    return res


if __name__ == "__main__":
    # python vectorstore.py --reingest
    if "--reingest" in sys.argv:
        ingest(force=True)
    else:
        ingest()
