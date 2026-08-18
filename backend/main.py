import datetime
import os
from pathlib import Path

import httpx
from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI, Header, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

# Load backend/.env first, fallback to root .env
env_path = Path(__file__).parent / ".env"
root_env_path = Path(__file__).parent.parent / ".env"
if env_path.exists():
    load_dotenv(env_path)
if root_env_path.exists():
    load_dotenv(root_env_path)

from vectorstore import ingest, search  # noqa: E402

GROQ_BASE_URL = os.environ.get("GROQ_BASE_URL", "https://api.groq.com/openai/v1")
GROQ_MODEL = os.environ.get("GROQ_MODEL", "openai/gpt-oss-120b")
GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")
CHAT_API_KEY = os.environ.get("CHAT_API_KEY") or os.environ.get("PORTFOLIO_API_KEY", "")
RATE_LIMIT_SETTING = os.environ.get("RATE_LIMIT_PER_MINUTE", "10/minute")
DISCORD_WEBHOOK_URL = os.environ.get("DISCORD_WEBHOOK_URL", "")

_ingested = False

BASE_SYSTEM_PROMPT = """Anda adalah Stellochron, asisten AI resmi untuk website portofolio Rafly Anggara Putra (raflylabs.com).

PRINSIP UTAMA & BATASAN SKOP (GUARDRAILS):
1. Tugas Anda HANYA memberikan informasi seputar profil, keahlian/skills, pengalaman kerja, pendidikan, dan proyek-proyek milik Rafly Anggara Putra.
2. JANGAN PERNAH membuatkan kode program (coding/scripting), menulis fungsi/skrip baru, atau menyelesaikan tugas koding orang lain atas permintaan pengguna dalam bentuk apa pun.
3. JANGAN PERNAH menjawab pertanyaan umum di luar konteks portofolio Rafly (seperti soal matematika, sains, berita, pengetahuan umum luar, dsb).

PENANGANAN REQUEST DI LUAR KONTEKS / REQUEST KODE:
Jika pengguna meminta dibuatkan kode program, fungsi/script, atau menanyakan topik yang tidak berhubungan dengan portofolio Rafly, JANGAN penuhi permintaan tersebut. Tolak secara ramah dan singkat (1-2 kalimat).
Contoh penolakan: "Maaf, sebagai asisten AI portofolio Rafly, saya hanya dapat memberikan informasi seputar profil, skill, dan proyek-proyek Rafly. Saya tidak dapat membuatkan kode program atau menjawab pertanyaan di luar konteks portofolio."

GAYA BAHASA & ATURAN RESPONS:
- Jawab singkat, padat, ramah, dan profesional dalam Bahasa Indonesia (maksimal 2-3 kalimat per respon, kecuali jika diminta merinci daftar proyek/skill Rafly).
- Gunakan fakta faktual dari konteks informasi portofolio Rafly yang disediakan. Jangan mengarang data.
- Jika tidak menemukan informasi faktual di konteks, ingatkan dengan sopan dan sarankan pengguna untuk menghubungi kontak resmi Rafly."""

limiter = Limiter(key_func=get_remote_address)
app = FastAPI(title="Portfolio AI Assistant & Gateway")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

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
        print(f"WARN: ingest gagal saat startup: {e}")


def _ensure_ingested():
    global _ingested
    if not _ingested:
        ingest()
        _ingested = True


def verify_api_key(x_api_key: str | None = None, authorization: str | None = None) -> bool:
    if not CHAT_API_KEY:
        return True
    
    if x_api_key and x_api_key.strip() == CHAT_API_KEY.strip():
        return True
    
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split("Bearer ")[1].strip()
        if token == CHAT_API_KEY.strip():
            return True

    return False


class ChatRequest(BaseModel):
    message: str
    history: list[dict] | None = None


class ContactRequest(BaseModel):
    name: str
    email: str
    subject: str | None = "Portofolio Inquiry"
    message: str


router = APIRouter()


@router.get("/health")
@router.get("/status")
def status_info():
    return {
        "status": "online",
        "service": "Portfolio AI Gateway & Vector RAG",
        "model": GROQ_MODEL,
        "vector_store": "ChromaDB Ready",
        "api_key_protected": bool(CHAT_API_KEY),
        "rate_limit": RATE_LIMIT_SETTING,
        "discord_webhook_configured": bool(DISCORD_WEBHOOK_URL),
        "timestamp": datetime.datetime.utcnow().isoformat() + "Z",
    }


@router.post("/chat")
@limiter.limit(RATE_LIMIT_SETTING)
async def chat(
    req: ChatRequest,
    request: Request,
    x_api_key: str | None = Header(None, alias="X-API-Key"),
    authorization: str | None = Header(None)
):
    if not verify_api_key(x_api_key, authorization):
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"error": "Akses ditolak: API Key tidak valid atau tidak ditemukan."}
        )

    if not GROQ_API_KEY:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"error": "GROQ_API_KEY tidak diset. Tambahkan ke file .env."}
        )

    # RAG Search dengan fallback ke in-memory KB jika embedding server offline
    context = ""
    try:
        _ensure_ingested()
        retrieved = search(req.message, k=3, max_distance=0.95)
        docs = retrieved.get("documents", [[]])[0] or []
        context = "\n\n---\n\n".join(docs)
    except Exception as e:
        print(f"WARN: RAG search gagal/offline ({e}), menggunakan fallback Knowledge Base in-memory.")
        try:
            from kb import KB
            # Ambil seluruh ringkasan KB sebagai fallback
            context = "\n\n---\n\n".join([f"### {k.upper()}\n{v}" for k, v in KB.items()])
        except Exception:
            context = ""

    system_prompt = (
        f"{BASE_SYSTEM_PROMPT}\n\nKONTEKS DATA PORTOFOLIO RAFLY:\n{context}"
        if context
        else BASE_SYSTEM_PROMPT
    )

    messages = [{"role": "system", "content": system_prompt}]
    messages.extend(req.history or [])
    messages.append({"role": "user", "content": req.message})

    try:
        async with httpx.AsyncClient(timeout=45) as client:
            resp = await client.post(
                f"{GROQ_BASE_URL}/chat/completions",
                headers={"Authorization": f"Bearer {GROQ_API_KEY}"},
                json={
                    "model": GROQ_MODEL,
                    "messages": messages,
                    "stream": False,
                    "temperature": 0.2,
                    "max_tokens": 512,
                },
            )
        if resp.status_code != 200:
            try:
                detail = resp.json().get("error", {}).get("message", resp.text[:300])
            except Exception:
                detail = resp.text[:300]
            return JSONResponse(
                status_code=status.HTTP_502_BAD_GATEWAY,
                content={"error": f"LLM Gateway ({resp.status_code}): {detail}"}
            )

        reply = resp.json()["choices"][0]["message"]["content"]
        return {"reply": reply}
    except httpx.TimeoutException:
        return JSONResponse(
            status_code=status.HTTP_504_GATEWAY_TIMEOUT,
            content={"error": "LLM Gateway timeout. Silakan coba beberapa saat lagi."}
        )
    except Exception as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"error": f"Terjadi kesalahan pemrosesan AI: {str(e)}"}
        )


@router.post("/contact")
@limiter.limit("5/minute")
async def contact(req: ContactRequest, request: Request):
    if not req.name or not req.email or not req.message:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"error": "Nama, email, dan pesan wajib diisi."}
        )

    if not DISCORD_WEBHOOK_URL:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"error": "DISCORD_WEBHOOK_URL tidak dikonfigurasi."}
        )

    embed = {
        "title": f"📩 Pesan Baru Portofolio: {req.subject or 'Inquiry'}",
        "color": 16711807,  # #ff007f Neubrutalism pink
        "fields": [
            {"name": "👤 Nama Pengirim", "value": req.name, "inline": True},
            {"name": "📧 Email Pengirim", "value": req.email, "inline": True},
            {"name": "💬 Isi Pesan", "value": req.message, "inline": False},
        ],
        "footer": {"text": "Stellochron Portfolio AI Gateway • Web Notification"},
        "timestamp": datetime.datetime.utcnow().isoformat() + "Z",
    }

    try:
        async with httpx.AsyncClient(timeout=15) as client:
            resp = await client.post(
                DISCORD_WEBHOOK_URL,
                json={
                    "username": "RaflyLabs Portfolio Bot",
                    "avatar_url": "https://raflylabs.com/favicon.ico",
                    "embeds": [embed]
                },
            )
        if resp.status_code not in (200, 204):
            return JSONResponse(
                status_code=status.HTTP_502_BAD_GATEWAY,
                content={"error": f"Gagal mengirim pesan ke Discord ({resp.status_code})."}
            )
    except Exception as e:
        return JSONResponse(
            status_code=status.HTTP_502_BAD_GATEWAY,
            content={"error": f"Terjadi kesalahan saat terhubung ke Discord: {e}"}
        )

    return {"status": "success", "message": "Pesan Anda telah berhasil terkirim langsung ke Discord Rafly!"}


app.include_router(router)
app.include_router(router, prefix="/api")
