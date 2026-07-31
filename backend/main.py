import os
from pathlib import Path

import httpx
from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv(Path(__file__).parent / ".env")

from vectorstore import ingest, search  # noqa: E402

GROQ_BASE_URL = os.environ.get("GROQ_BASE_URL", "https://api.groq.com/openai/v1")
GROQ_MODEL = os.environ.get("GROQ_MODEL", "llama-3.3-70b-versatile")
GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")
_ingested = False

BASE_SYSTEM_PROMPT = """Anda adalah asisten AI untuk website portofolio Rafly Anggara Putra (raflylabs.com).
Tugas Anda menjawab pertanyaan pengunjung tentang profil, skill, proyek, dan pengalaman Rafly.
Jawab singkat, padat, langsung ke inti. Maksimal 2-3 kalimat jika memungkinkan.
Gunakan bahasa Indonesia. Jika tidak tahu, jangan mengarang. Arahkan ke kontak yang sesuai."""

app = FastAPI(title="Portfolio AI Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in os.environ.get("CORS_ORIGINS", "*").split(",") if o.strip()],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def _startup():
    try:
        _ensure_ingested()
    except Exception as e:
        print(f"WARN: ingest gagal saat startup (llama-cli tersedia?): {e}")


def _ensure_ingested():
    global _ingested
    if not _ingested:
        ingest()
        _ingested = True


class ChatRequest(BaseModel):
    message: str
    history: list[dict] | None = None


router = APIRouter()


@router.get("/health")
def health():
    return {"status": "ok", "model": GROQ_MODEL}


@router.post("/chat")
async def chat(req: ChatRequest):
    if not GROQ_API_KEY:
        return {"error": "GROQ_API_KEY tidak diset. Tambahkan ke file .env."}

    try:
        _ensure_ingested()
    except Exception as e:
        return {"error": f"Vector store belum siap: {e}"}

    retrieved = search(req.message, 3)
    docs = retrieved.get("documents", [[]])[0] or []
    context = "\n\n---\n\n".join(docs)

    system_prompt = (
        f"{BASE_SYSTEM_PROMPT}\n\nGunakan informasi berikut untuk menjawab pertanyaan:\n\n{context}"
        if context
        else BASE_SYSTEM_PROMPT
    )

    messages = [{"role": "system", "content": system_prompt}]
    messages.extend(req.history or [])
    messages.append({"role": "user", "content": req.message})

    async with httpx.AsyncClient(timeout=60) as client:
        resp = await client.post(
            f"{GROQ_BASE_URL}/chat/completions",
            headers={"Authorization": f"Bearer {GROQ_API_KEY}"},
            json={
                "model": GROQ_MODEL,
                "messages": messages,
                "stream": False,
                "temperature": 0.3,
                "max_tokens": 512,
            },
        )
    if resp.status_code != 200:
        detail = resp.json().get("error", {}).get("message", resp.text[:300])
        return {"error": f"Groq ({resp.status_code}): {detail}"}
    reply = resp.json()["choices"][0]["message"]["content"]
    return {"reply": reply}


app.include_router(router)
app.include_router(router, prefix="/api")
