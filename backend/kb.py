import re
from pathlib import Path

# Knowledge base dimuat dari file markdown di folder kb/.
# Edit file .md di kb/ lalu jalankan re-ingest (python vectorstore.py --reingest)
# agar perubahan masuk ke vector store.
_KB_DIR = Path(__file__).parent / "kb"


def _load_kb() -> dict:
    if not _KB_DIR.is_dir():
        raise RuntimeError(
            f"Folder knowledge base tidak ditemukan: {_KB_DIR}. "
            "Pastikan folder kb/ ikut ter-deploy bersama backend."
        )
    kb = {}
    for md_file in sorted(_KB_DIR.glob("*.md")):
        key = md_file.stem
        # "01-identity.md" -> "identity"
        if "-" in key and key.split("-", 1)[0].isdigit():
            key = key.split("-", 1)[1]
        kb[key] = md_file.read_text(encoding="utf-8").strip()
    if not kb:
        raise RuntimeError(f"Folder knowledge base kosong: {_KB_DIR}")
    return kb


KB = _load_kb()


def chunk_kb():
    chunks = []
    for key, text in KB.items():
        # Ambil H1 dokumen sebagai konteks induk utama jika ada
        doc_title = ""
        for line in text.split("\n"):
            if line.startswith("# "):
                doc_title = line.replace("# ", "").strip()
                break

        lines = text.split("\n")
        cur = []
        cur_heading = ""
        for line in lines:
            if re.match(r"^#{2,3} ", line) and cur:
                t = "\n".join(cur).strip()
                if len(t) > 30:
                    # Tambahkan awalan konteks dokumen agar chunk mandiri
                    prefix = f"[{doc_title} > {cur_heading}]\n" if (doc_title and cur_heading) else ""
                    chunks.append({"key": key, "text": f"{prefix}{t}"})
                cur = [line]
                cur_heading = line.lstrip("#").strip()
            else:
                if not cur_heading and re.match(r"^#{2,3} ", line):
                    cur_heading = line.lstrip("#").strip()
                cur.append(line)
        t = "\n".join(cur).strip()
        if len(t) > 30:
            prefix = f"[{doc_title} > {cur_heading}]\n" if (doc_title and cur_heading) else ""
            chunks.append({"key": key, "text": f"{prefix}{t}"})
    return chunks
