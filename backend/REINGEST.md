# Re-Ingest Vector Store (RAG)

Setelah mengubah file markdown di `backend/kb/`, vector store ChromaDB harus di-re-index
agar asisten AI Stellochron menggunakan data terbaru.

## Cara re-ingest

Jalankan dari folder `backend/` di server tempat chroma_db production berada:

```bash
cd backend
python vectorstore.py --reingest
```

- `--reingest` → menghapus & membangun ulang collection dari nol (pakai data KB terbaru).
- Tanpa flag → hanya ingest jika collection kosong (tidak menimpa).

## Prasyarat

| Variabel | Nilai (via .env) | Catatan |
|---|---|---|
| `EMBED_BASE_URL` | `https://api.raflylabs.com/api/embedding` | Embedding server production (sudah reachable) |
| `EMBED_MODEL` | `nomic-embed-text` | Model embedding |
| `CHROMA_DIR` | `chroma_db` | Folder vector store |

Verifikasi embedding server aktif:
```bash
curl -X POST "https://api.raflylabs.com/api/embedding/v1/embeddings" \
  -H "Content-Type: application/json" \
  -d '{"model":"nomic-embed-text","input":"test"}'
# -> 200
```

## Verifikasi hasil

Setelah re-ingest, tanya chatbot portofolio (`/chat`) misalnya:
> "Apa proyek AI Gateway dan teknologi yang dia pakai?"

Respons harus menyebut detail enriched (Function Calling, session_id, source_platform, dsb)
yang baru ditambahkan ke `03-projects.md`.

## Pitfall

- **Jangan re-ingest langsung dari WSL repo ini** jika chroma_db yang dipakai live ada di
  server terpisah — pastikan menjalankannya di environment deploy yang sama.
- Re-ingest memakai embedding server production, jadi butuh koneksi internet + API key
  yang valid di `.env`.
