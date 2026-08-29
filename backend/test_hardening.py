"""Local functional test for the /chat auth hardening (no LLM triggered).

Sets CHAT_API_KEY + empty GROQ_API_KEY so the auth logic is exercised but the
pipeline stops before any model call (GROQ key missing -> 500).
"""
import os
import sys

os.environ["CHAT_API_KEY"] = "test-key-123"
os.environ["GROQ_API_KEY"] = ""          # stop before LLM: expect 500 after auth passes
os.environ["RATE_LIMIT_PER_MINUTE"] = "60/minute"

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi.testclient import TestClient  # noqa: E402
from main import app  # noqa: E402

client = TestClient(app)
results = []


def check(name, cond, extra=""):
    results.append((name, bool(cond)))
    print(f"  {'PASS' if cond else 'FAIL'}  {name}  {extra}")


def post(headers=None, origin=None):
    h = {"Content-Type": "application/json"}
    if origin:
        h["Origin"] = origin
    if headers:
        h.update(headers)
    return client.post("/api/chat", json={"message": "hai"}, headers=h)


# 1. No Origin + no key -> 401 (blocked)
r = post()
check("no origin + no key -> 401", r.status_code == 401, f"got {r.status_code}")

# 2. Evil origin + no key -> 401 (blocked)
r = post(origin="https://evil.com")
check("evil origin + no key -> 401", r.status_code == 401, f"got {r.status_code}")

# 3. Trusted origin + no key -> auth passes -> 500 (GROQ key unset in test)
r = post(origin="https://raflylabs.com")
check("raflylabs origin + no key -> auth OK (500 GROQ)", r.status_code == 500,
      f"got {r.status_code}")

# 4. No origin + valid key -> auth passes -> 500 (GROQ key unset in test)
r = post(headers={"X-API-Key": "test-key-123"})
check("no origin + valid key -> auth OK (500 GROQ)", r.status_code == 500,
      f"got {r.status_code}")

# 5. No origin + wrong key -> 401
r = post(headers={"X-API-Key": "wrong-key"})
check("no origin + wrong key -> 401", r.status_code == 401, f"got {r.status_code}")

# 6. CORS preflight: evil origin -> no ACAO header for it
r = client.options("/api/chat", headers={
    "Origin": "https://evil.com",
    "Access-Control-Request-Method": "POST",
})
check("preflight evil origin -> no ACAO", "access-control-allow-origin" not in r.headers,
      f"ACAO={r.headers.get('access-control-allow-origin')!r}")

# 7. CORS preflight: trusted origin -> ACAO present
r = client.options("/api/chat", headers={
    "Origin": "https://raflylabs.com",
    "Access-Control-Request-Method": "POST",
})
check("preflight trusted origin -> ACAO set",
      r.headers.get("access-control-allow-origin") == "https://raflylabs.com",
      f"ACAO={r.headers.get('access-control-allow-origin')!r}")

# 8. status endpoint still open (config info, no secret)
r = client.get("/status")
check("GET /status -> 200", r.status_code == 200, f"got {r.status_code}")

print()
fails = [n for n, ok in results if not ok]
print(f"RESULT: {len(results) - len(fails)}/{len(results)} PASSED"
      + (f"  FAILED -> {fails}" if fails else " — all good"))
sys.exit(1 if fails else 0)