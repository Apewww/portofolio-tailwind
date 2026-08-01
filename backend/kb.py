import re

KB = {
    "identity": """# Identity & Profile

## Personal Data

| Attribute | Detail |
|---|---|
| **Full Name** | Rafly Anggara Putra |
| **Role** | Backend Engineer |
| **Focus** | Scalability and Automation |
| **Email** | apewinaja@gmail.com |
| **Location** | Bandung, Indonesia |
| **Website** | https://raflylabs.com |
| **GitHub** | https://github.com/Apewww |
| **LinkedIn** | https://linkedin.com/in/raflylabs |

## Short Bio

Backend Engineer with a focus on Scalability and Automation. Building scalable systems and automated DevOps environments that power the next generation of web applications. Always learning, always building.

## AI Response Guidelines

- Answer questions professionally, politely, and concisely in Indonesian.
- SCOPE STRICTLY LIMITED: Only answer questions related to Rafly Anggara Putra's profile, skills, projects, education, and experience.
- PROHIBITED: NEVER generate source code, scripts, programming code, or solve general coding tasks requested by users.
- OUT OF SCOPE: Politely decline any non-portfolio requests, coding generation tasks, general knowledge Q&A, or off-topic prompts.
- Do not fabricate information not present in the knowledge base.
- Redirect sensitive or personal questions to the appropriate contact channels.""",

    "skills": """# Technical Skills

## Core Competencies

### 1. Backend Architecture
Designing high-performance server-side logic and scalable database structures.
- **Languages & Frameworks:** Python, FastAPI, Node.js, Laravel, Flask
- **Databases:** PostgreSQL, MySQL, Supabase

### 2. DevOps & Infrastructure
Automating deployment pipelines and managing cloud-native environments.
- **Tools:** Docker, CI/CD, Server Management

### 3. API Development
Building robust, secure, and fast APIs.
- **Methods:** RESTful API, Authentication, WebSocket
- **Security:** Rate limiting, CORS, secure token handling

## Technology Stack

| Layer | Technologies |
|---|---|
| **Backend** | Python, FastAPI, Node.js, Flask, Laravel |
| **Database** | PostgreSQL, MySQL, Supabase |
| **Frontend** | React, Next.js, JavaScript, Java |
| **DevOps** | Docker, CI/CD |
| **Languages** | Python, JavaScript, Java, C# |""",

    "projects": """# Portfolio Projects

## 1. AI Gateway
**URL:** https://chat.raflylabs.com
**GitHub:** https://github.com/Apewww/AI-Assistant-Gateway

Web AI Gateway. Centralized AI chatbot gateway connecting multiple platforms (portofolio, cuaca, audio stream) with LLM via OpenRouter.
- **Tags:** NextJS, FastAPI, Uvicorn, LLM, Openrouter

## 2. Syncra
**URL:** https://syncra.raflylabs.com

Web Audio stream platform for enjoying music and audio content with AI chatbot integration for music player control.
- **Tags:** React, FastAPI, YT-DLP

## 3. Natahost
**URL:** https://natahost.raflylabs.com
**GitHub:** https://github.com/Apewww/natahosts

Web hosting and domain sales platform with integrated payment gateway.
- **Tags:** React, Laravel, Payment Gateway

## 4. MyFinance Note
**URL:** https://myfinance-note.vercel.app
**GitHub:** https://github.com/Apewww/myfinance-note

Personal finance system focused on reliable high-concurrency data tracking for income and expenses.
- **Tags:** React, Supabase

## 5. CuacaKita
**URL:** https://cuacakita.raflylabs.com
**GitHub:** https://github.com/Apewww/cuacakita

Meteorological application using modern API integrations and Flask framework for weather forecasting with AI chatbot.
- **Tags:** Flask, PWA

## 6. Asset Management
**GitHub:** https://github.com/Apewww/asset-management

Enterprise project management system emphasizing efficiency and structural integrity.
- **Tags:** React, Flask

## 7. Algorithm SAW
**GitHub:** https://github.com/Apewww/saw-calculation

Optimized decision support implementation using Simple Additive Weighting (SAW) method with structural mathematical logic.
- **Tags:** Python, Logic""",

    "academicProjects": """# Academic Projects

## Tribite - Tugas Besar Pemrograman Website Semester 2
**GitHub:** https://github.com/Apewww/tribite

Aplikasi web profil dengan sistem rating dan riwayat. Dibangun sebagai tugas besar mata kuliah pemrograman website.
- **Teknologi:** HTML, CSS, JavaScript
- **Tahun:** 2025

## EndlessDrive - Game 2D Endless Runner
**GitHub:** https://github.com/Apewww/EndlessDrive

Game endless runner 2D retro-futuristik dengan procedurally generated obstacles, skin system 4 karakter (Royal Phoenix, Neon Pulse, Desert Nomad, Classic), high score tracker, coin collection, sound synthesis, dan persistence preferences menggunakan Java Swing/AWT.
- **Teknologi:** Java 17+, Java Swing, AWT
- **Fitur:** 4 skin mobile, procedurally generated obstacles, coin & particle system, high score, fullscreen mode, procedural audio

## Startup Simulator - Game Simulasi Manajemen Startup
**GitHub:** https://github.com/Apewww/startup-simulator

Game simulasi manajemen startup teknologi berbasis desktop. Pemain membangun perusahaan teknologi dari awal, mengelola R&D, marketing, hiring, server infrastructure, compliance, dan investor relations. Terinspirasi dari Startup Company (Hovgaard Games).
- **Teknologi:** React 19, TypeScript, Tauri 2, Tailwind CSS 4, Zustand 5, Dexie.js (IndexedDB)
- **Versi:** v1.0 - v2.3 (multi-product, global expansion, endgame victory screen)

## Bot PDDikti Discord - Verifikasi Data Mahasiswa Otomatis
**GitHub:** https://github.com/Apewww/bot-pddikti-dc

Bot Discord untuk verifikasi data mahasiswa Indonesia secara otomatis melalui PDDikti. Menggunakan Chrome headless automation via CDP untuk bypass Cloudflare, dengan sistem role otomatis dan database SQLite.
- **Teknologi:** Node.js, Discord.js, SQLite, Chrome DevTools Protocol
- **Fitur:** Auto-verifikasi NIM, bypass Cloudflare, role otomatis, log channel, multi-server support""",

    "experience": """# Professional Experience & Education

## Work Experience

### Backend Engineer - RaflyLabs (2023 - Present)
- Developing and maintaining AI chatbot gateway with FastAPI and Python
- Building RAG system for personal portfolio documentation
- Integrating with various external APIs (OpenRouter, weather, audio streaming)
- Server deployment and infrastructure management

## Education

### Unjani University (2023 - Present)
- **Major:** Teknik Informatika
- **Focus:** Algorithms, database systems, software engineering, and backend architecture

### SMK Negeri 1 Cimahi (2019 - 2023)
- **Major:** SIJA - Sistem Informatika Jaringan dan Aplikasi
- **Focus:** Vocational training in network administration, web development, and software engineering

## Certifications

| Certificate | Issuer | Link |
|---|---|---|
| HTML / CSS in Depth | Meta / Coursera | https://coursera.org/verify/UTJ9Y0Q04F0E |
| Introduction Frontend Systems | Meta / Coursera | https://coursera.org/verify/R3HXJABQVHH2 |
| Javascript Core Logic | Meta / Coursera | https://coursera.org/verify/Z654TDKKZJK2 |
| Python Engineering | Meta / Coursera | https://coursera.org/verify/6IIWE8U7861R |
| Version Control Workflow | Meta / Coursera | https://coursera.org/verify/PI22FH6PPXS7 |""",
}


def chunk_kb():
    chunks = []
    for key, text in KB.items():
        lines = text.split("\n")
        cur = []
        for line in lines:
            if re.match(r"^#{2,3} ", line) and cur:
                t = "\n".join(cur).strip()
                if len(t) > 30:
                    chunks.append({"key": key, "text": t})
                cur = [line]
            else:
                cur.append(line)
        t = "\n".join(cur).strip()
        if len(t) > 30:
            chunks.append({"key": key, "text": t})
    return chunks
