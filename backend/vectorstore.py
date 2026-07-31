import os

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


class LlamaServerEmbeddingFunction(EmbeddingFunction):
    """Embedding via llama.cpp server. Mencoba OpenAI-compatible /v1/embeddings,
    fallback ke endpoint native /embedding untuk build lama."""

    def __call__(self, input: Documents) -> Embeddings:
        with httpx.Client(timeout=120) as client:
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


def get_collection():
    client = chromadb.PersistentClient(path=CHROMA_DIR)
    return client.get_or_create_collection(
        "kb_docs", embedding_function=LlamaServerEmbeddingFunction()
    )


def ingest():
    collection = get_collection()
    if collection.count() > 0:
        return
    chunks = chunk_kb()
    collection.add(
        ids=[f"{c['key']}-{i}" for i, c in enumerate(chunks)],
        documents=[c["text"] for c in chunks],
        metadatas=[{"key": c["key"]} for c in chunks],
    )


def search(query, k=3):
    collection = get_collection()
    return collection.query(query_texts=[query], n_results=k)
