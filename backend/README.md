# Backend AI Assistant (Groq + RAG ChromaDB)

FastAPI backend untuk widget AI di portofolio. RAG memakai ChromaDB dengan embedding
`nomic-embed-text` via **llama.cpp server**, lalu jawaban di-generate Groq
(`llama-3.3-70b-versatile`).

## Setup

### 1. Embedding server (llama.cpp)

Jalankan server embedding (model auto tersedia di folder; unduh `nomic-embed-text-v1.5.Q4_K_M.gguf`
dari HuggingFace bila belum ada):

```
llama server -m nomic-embed-text-v1.5.Q4_K_M.gguf -e --embedding --host 0.0.0.0 --port 8015
```

Verifikasi:

```
curl http://localhost:8015/v1/embeddings -H "Content-Type: application/json" -d "{\"model\":\"nomic-embed-text\",\"input\":\"test\"}"
```

> Keamanan: karena `--host 0.0.0.0` tanpa API key, batasi aksesnya (firewall/allowlist), atau
> jalankan dengan `--api-key <key>` dan set `EMBED_API_KEY` di `.env`.

### 2. Environment (`.env` di root repo)

```
GROQ_API_KEY=...
GROQ_MODEL=llama-3.3-70b-versatile
EMBED_BASE_URL=http://localhost:8015
EMBED_MODEL=nomic-embed-text
EMBED_API_KEY=            # opsional, isi jika llama server pakai --api-key
CHROMA_DIR=chroma_db
```
Jika llama server hanya bisa diakses lewat proxy Apache/nginx (mis.
`https://api.raflylabs.com/api/embedding`), set `EMBED_BASE_URL` ke URL proxy tersebut —
backend memanggil `<base>/v1/embeddings` (fallback `<base>/embedding`).

### 3. Install & jalankan backend (di mesin yang sama dengan llama server)

```
cd backend
python -m venv .venv
.venv\Scripts\pip install -r requirements.txt
.venv\Scripts\python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

Ingest ke ChromaDB otomatis saat pertama kali `/chat` dipanggil (sekali saja; hasil
tersimpan permanen di `CHROMA_DIR`).

### 3a. Knowledge base & re-ingest

Konten RAG ada di folder `backend/kb/*.md` (identity, skills, projects, ecosystem,
academic-projects, experience) — edit langsung file `.md`-nya, tanpa menyentuh kode.

Setelah mengubah konten KB, jalankan re-ingest (butuh embedding server aktif):

```
cd backend
.venv\Scripts\python vectorstore.py --reingest
```

Atau set `FORCE_REINGEST=1` lalu restart service. Sejak versi cosine, ingest otomatis
mendeteksi index ChromaDB lama (space `l2`) dan rebuild ke `cosine` — jarak hasil
pencarian kini bermakna (rentang 0–2) sehingga filter `max_distance` berfungsi
dengan benar.

### 3b. Jalankan sebagai service Windows (NSSM)

Pastikan `nssm.exe` ada di `PATH` (unduh dari https://nssm.cc), lalu dari **prompt
Administrator**:

```
nssm install PortfolioBackend "C:\...\backend\.venv\Scripts\python.exe" -m uvicorn main:app --host 0.0.0.0 --port 8016
nssm set PortfolioBackend AppDirectory "C:\...\backend"
nssm set PortfolioBackend AppStdout "C:\...\backend\logs\out.log"
nssm set PortfolioBackend AppStderr "C:\...\backend\logs\err.log"
nssm set PortfolioBackend AppRotateFiles 1
nssm set PortfolioBackend AppRotateBytes 10485760
nssm set PortfolioBackend AppExit Default Restart
nssm set PortfolioBackend Start SERVICE_AUTO_START
nssm start PortfolioBackend
```

Catatan: `.env` dibaca dari `backend\.env` (bukan root repo) — pastikan disalin saat deploy.

### 3c. llama server sebagai service Windows (NSSM)

Jalankan sebagai Administrator, model ditaruh lokal agar tidak tergantung cache/dowload:

```
curl -L -o nomic-embed-text-v1.5.Q4_K_M.gguf https://huggingface.co/nomic-ai/nomic-embed-text-v1.5-GGUF/resolve/main/nomic-embed-text-v1.5.Q4_K_M.gguf
```

```
nssm install LlamaEmbedding "C:\...\llama.exe"
nssm set LlamaEmbedding AppParameters "server -m nomic-embed-text-v1.5.Q4_K_M.gguf -e --embedding --host 0.0.0.0 --port 8015"
nssm set LlamaEmbedding AppDirectory "C:\...\folder-llama"
nssm set LlamaEmbedding AppStdout "C:\...\folder-llama\logs\out.log"
nssm set LlamaEmbedding AppStderr "C:\...\folder-llama\logs\err.log"
nssm set LlamaEmbedding AppRotateFiles 1
nssm set LlamaEmbedding AppExit Default Restart
nssm set LlamaEmbedding Start SERVICE_AUTO_START
nssm start LlamaEmbedding
```

## Endpoint

- `GET /health` — cek status (alias `/api/health`).
- `POST /chat` — body `{ "message": "...", "history": [{ "role": "user", "content": "..." }] }`
  → `{ "reply": "..." }` (alias `/api/chat`).

Route dilayani di `/` dan `/api/` sekaligus, sehingga cocok untuk dev lokal (`/api/chat`)
maupun di belakang proxy Apache yang menghapus prefix. Contoh:

```apache
ProxyPass        /api/ai/  http://127.0.0.1:8016/  connectiontimeout=5 timeout=300
ProxyPassReverse /api/ai/  http://127.0.0.1:8016/
```

(`https://api.raflylabs.com/api/ai/chat` → diteruskan sebagai `/chat`.)

## Frontend

Set `REACT_APP_BACKEND_URL` ke base URL proxy (default `http://localhost:8000`) lalu
`npm start`. Frontend menambahkan `/chat` sendiri:

- Dev lokal: `REACT_APP_BACKEND_URL=http://localhost:8000` → `/chat`.
- Deploy: `REACT_APP_BACKEND_URL=https://api.raflylabs.com/api/ai` → `/api/ai/chat`.

## Uji

```
curl -X POST http://localhost:8000/chat ^
  -H "Content-Type: application/json" ^
  -d "{\"message\":\"project apa saja yang dibuat Rafly?\"}"
```
