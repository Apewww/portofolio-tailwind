# Product Requirements Document (PRD)
## RaflyLabs — Personal Portfolio & AI Ecosystem

---

### Informasi Dokumen
- **Nama Produk:** RaflyLabs Personal Portfolio & AI Assistant
- **Repositori:** `portofolio-tailwind`
- **Product Owner / Developer:** Rafly Anggara Putra
- **Versi Dokumen:** 1.0.0
- **Status:** Active / Production
- **Domain Publik:** [https://raflylabs.com](https://raflylabs.com)
- **API Gateway:** [https://api.raflylabs.com/api/ai](https://api.raflylabs.com/api/ai)

---

## 1. Ringkasan Eksekutif & Visi Produk

### 1.1 Visi Produk
Menciptakan representasi digital yang interaktif, elegan, dan *developer-centric* bagi **Rafly Anggara Putra** sebagai seorang **Backend Engineer** yang berfokus pada skalabilitas, otomatisasi, DevOps, dan ekosistem kecerdasan buatan (AI). 

Portofolio ini bukan sekadar CV statis konvensional, melainkan platform dinamis yang menggabungkan:
1. **Showcase Keterampilan & Proyek Nyata:** Menampilkan proyek-proyek produksi yang aktif (SnatchVid, Scribd Tool, Natacell Portal, AI Gateway, Syncra, dll.).
2. **Asisten AI Interaktif Berbasis RAG (Stellochron):** Chatbot cerdas yang dapat menjawab pertanyaan seputar keahlian, pengalaman, dan proyek secara akurat tanpa halusinasi dengan data faktual terverifikasi.
3. **Notifikasi Real-Time via Discord:** Sistem form kontak langsung yang terhubung ke webhook Discord untuk responsivitas komunikasi bisnis/kolaborasi.
4. **Desain Visual Neubrutalism yang Kuat:** Gaya visual kontras tinggi, tegas, dan modern yang memberikan impresi kuat pada pengunjung pertama kali.

### 1.2 Tujuan Utama (Goals & Objectives)
- **Meningkatkan Konversi Perekrutan / Kolaborasi:** Memudahkan recruiter, technical lead, dan klien mengevaluasi kompetensi teknis, melihat live demo, meninjau source code GitHub, dan mengunduh CV resmi dalam hitungan detik.
- **Membuktikan Kemampuan Engineering:** Memperlihatkan kecakapan langsung dalam arsitektur modern: frontend reaktif, microservice backend FastAPI, vector search (ChromaDB), model embedding lokal, LLM inference, dan hardening keamanan API.
- **Kenyamanan Pengalaman Pengguna (UX):** Navigasi satu halaman yang cepat, responsif di segala perangkat (mobile, tablet, desktop), serta widget pendukung yang non-intrusif.

---

## 2. Target Pengguna (User Personas)

| Persona | Profil & Kebutuhan | Fitur Kunci yang Digunakan |
|---|---|---|
| **Tech Recruiter / Talent Acquisition** | Membutuhkan tinjauan cepat mengenai riwayat pendidikan, ringkasan skill, sertifikasi resmi, dan akses cepat ke berkas CV format PDF. | Header/Hero, Preview/Download CV Modal, Bagian Sertifikat, Bagian Pendidikan. |
| **Engineering Lead / CTO** | Mengevaluasi arsitektur sistem, skalabilitas kode, variasi tech stack, serta integritas proyek nyata (bukan sekadar tutorial proyek). | Kartu Proyek (GitHub links, demo links, tech badges), Status Gateway Telemetri, Section Backend/DevOps Skills. |
| **Calon Klien / Partner Bisnis** | Ingin mengetahui layanan teknis yang ditawarkan (Backend, API, DevOps), melihat portofolio terkait, dan menghubungi langsung. | Formulir Kontak Real-time (Discord webhook), Quick Social Links, Email CTA. |
| **Komunitas Developer / Pengunjung Umum** | Mencoba fungsionalitas unik situs, bereksperimen dengan AI Chatbot (Stellochron), dan menjelajahi ekosistem RaflyLabs. | Widget Chatbot RAG, Marquee Tech Stack, Subdomain Ekosistem RaflyLabs. |

---

## 3. Arsitektur Sistem & Alur Data

### 3.1 Arsitektur Tingkat Tinggi
```
+-------------------------------------------------------------+
|                      Client Browser                         |
|  - React 18 SPA (TailwindCSS Neubrutalism)                  |
|  - Framer Motion, Markdown/GFM Engine, CV Viewer Modal       |
+--------------+------------------------------+---------------+
               |                              |
         (Chat Queries)                 (Contact Form)
               |                              |
               v                              v
+-------------------------------------------------------------+
|             Backend Service: FastAPI (Port 8016)            |
|  - Rate Limiting (SlowAPI: 10/min chat, 5/min contact)      |
|  - CORS & Browser Origin Allowlist Validation               |
|  - Input Sanitization & Anti-Prompt Injection Guard         |
+--------------+------------------------------+---------------+
               |                              |
      +--------+--------+                     |
      |                 |                     v
      v                 v          +----------------------+
+-----------+    +-------------+   | Discord Webhook API  |
| llama.cpp |    |  ChromaDB   |   | (Pemberitahuan Tim)  |
| Embedding |    | Vectorstore |   +----------------------+
| (Port 8015|    | (Cosine Sim)|
+-----------+    +------+------+
                        |
            (Retrieved Top-k Chunks)
                        |
                        v
         +-----------------------------+
         |      Groq LLM Gateway       |
         | (Model: openai/gpt-oss-120b)|
         +-----------------------------+
```

### 3.2 Penanganan Ketahanan Sistem (Resilience & Fallback)
- **Fallback RAG:** Jika ChromaDB atau server embedding lokal sedang offline, backend secara otomatis beralih ke *in-memory Knowledge Base (`kb.py`)* sehingga asisten tetap dapat merespons tanpa melempar error 500 ke pengunjung.
- **Fail-Closed Security:** Akses non-browser (skrip pihak ketiga/curl) wajib menyertakan API Key yang valid, sementara browser resmi diverifikasi lewat *Origin Header Allowlist*.

---

## 4. Spesifikasi Fungsional (Feature Specifications)

### 4.1 Navigasi & Tata Letak Utama (Navbar & Shell)
- **Sticky Navbar:** Tetap berada di bagian atas layar dengan efek latar blur dan transisi batas saat halaman di-scroll (`scrollY > 20`).
- **Menu Cepat:** Menghubungkan langsung dengan *smooth-scrolling* ke section: Keahlian (`#skills`), Pendidikan (`#education`), Proyek (`#portofolio`), dan Sertifikat (`#certificates`).
- **Tombol Modal CV:** Menampilkan tombol *"VIEW CV"* yang selalu terlihat di navbar desktop dan drawer menu mobile.
- **Drawer Responsif Mobile:** Menu hamburger kustom dengan penguncian scroll layar (`body lock`) saat drawer aktif.

### 4.2 Hero Section (Identitas & Personal Branding)
- **Headline Penegasan:** Menegaskan peran *"Backend Engineer berfokus pada Skalabilitas dan Otomasi"*.
- **Visual Utama:** Foto profil beresolusi tinggi yang dioptimalkan dalam format WebP modern dengan aksen elemen melayang bergaya badge (Python, Docker, PostgreSQL).
- **Mascot / Personal Quote:** Elemen dialog bergaya tweet *"Always learning, always building 🚀"* yang merefleksikan etos kerja.
- **Tombol CTA (Call to Action):** Tombol primer email langsung dan tombol sekunder eksplorasi profil.

### 4.3 Section Keahlian & Tech Stack
- **Bento / Clean Badges (No Percentages):** Menghindari representasi persentase usang (misal: "Python 90%"). Digantikan oleh kartu pilar kapabilitas:
  - *Backend Development* (Logika server, perancangan database, arsitektur sistem).
  - *DevOps & Infrastruktur* (Docker, Nginx, Linux Debian/Ubuntu, HomeLab Proxmox).
  - *Pengembangan API* (REST API performa tinggi, FastAPI, Node.js, integrasi webhook).
- **Tech Marquee:** Animasi horizontal berjalan tanpa henti berisi logo teknologi utama untuk memperkaya estetika interaktif.

### 4.4 Section Portofolio Proyek (Project Showcase)
- **Grid Kartu Seragam:** Layout responsif berisi proyek-proyek unggulan.
- **Metadata Lengkap per Proyek:**
  - Gambar/screenshot WebP dengan rasio konsisten (16:9).
  - Judul proyek yang tegas dan deskripsi berorientasi solusi teknis (1-2 kalimat).
  - Tag teknologi (FastAPI, Python, YT-DLP, Playwright, React, Laravel, dll.).
  - Tombol aksi: *Live Demo* (jika layanan publik aktif) dan *View on GitHub* (untuk proyek open-source).
- **Filter Tag Interaktif:** Memungkinkan pengunjung memfilter proyek berdasarkan teknologi kunci secara instan tanpa reload.

### 4.5 Section Pendidikan & Riwayat Akademik
- **Timeline Rapi:** Menampilkan riwayat pendidikan formal:
  - Universitas Jenderal Achmad Yani (Teknik Informatika - S1).
  - SMK Negeri 1 Cimahi (Sistem Informatika Jaringan dan Aplikasi - 4 Tahun).
- **Fokus Studi:** Penjelasan ringkas mengenai mata kuliah/bidang yang didalami (arsitektur backend, struktur data & algoritma, jaringan komputer).

### 4.6 Section Sertifikasi Profesional
- **Kredensial Terverifikasi:** Daftar sertifikasi industri dari institusi terpercaya (Meta / Coursera).
- **Verifikasi Langsung:** Tautan langsung menuju halaman verifikasi Coursera untuk membuktikan keaslian kredensial.
- **Kategori:** Pemrograman (Python, JavaScript, Frontend Systems, HTML/CSS) dan Operasional (Version Control Workflow).

### 4.7 Formulir Kontak Real-Time (Discord Webhook Integration)
- **Kategori Dropdown Kustom:** Pilihan subjek pesan interaktif (*💼 Tawaran Proyek, 🤝 Kolaborasi, 🐛 Report Bug / Feedback, ☕ Tanya-tanya*).
- **Multi-State Feedback:** Menampilkan status progres interaktif kepada pengguna (Menghubungkan -> Mengirim Data -> Terkirim Sukses).
- **Discord Notification Embed:** Data formulir diformat sebagai *rich embed* rapi di Discord lengkap dengan nama pengirim, email, subjek, isi pesan, dan timestamp UTC.
- **Proteksi Spam:** Dibatasi dengan rate limiting maksimal 5 pengiriman pesan per menit per alamat IP.

### 4.8 Asisten AI Cerdas — "Stellochron" (AIChatBubble Widget)
- **Floating Action Button:** Ikon bubble percakapan di pojok kiri bawah layar yang mencolok.
- **Panel Percakapan yang Dapat Disesuaikan (Draggable & Resizable):**
  - Pengguna dapat memperbesar/memperkecil ukuran window chat secara dinamis (*drag corner / edge*).
  - State ukuran terakhir disimpan di `localStorage`.
  - Mode *Maximize* dan *Minimize/Reset* dengan satu klik.
- **Full Markdown & GFM Table Support:** Mampu merender teks tebal, miring, list, kutipan, blok kode sintaksis, tautan, hingga tabel perbandingan data secara responsif.
- **Riwayat Percakapan (Session Persistence):** Pesan disimpan di browser (`localStorage`) sehingga riwayat tidak hilang saat berpindah halaman atau me-refresh.
- **Guardrails Ketat (Safety & Scope):**
  - Hanya bertindak sebagai asisten resmi portofolio Rafly Anggara Putra.
  - Memiliki instruksi tegas untuk menolak pembuatan kode program (scripting/coding) untuk pengguna lain.
  - Menolak menjawab topik di luar konteks portofolio (soal ujian, politik, berita luar).
  - Dilengkapi perlindungan *anti-prompt injection* dengan pembungkusan data RAG di dalam tag `<context>`.

### 4.9 Preview Modal CV
- **In-App PDF Viewer:** Membuka berkas `CV_RaflyAnggaraPutra.pdf` langsung dalam modal iframe tanpa memaksa pengguna meninggalkan situs.
- **Aksi Cepat:** Tombol langsung unduh PDF (*Download*), tombol buka di tab baru (*External Link*), dan tombol tutup dengan dukungan shortcut tombol `Escape` dan klik backdrop.

### 4.10 Widget Status Sistem (System Telemetry Widget)
- **Live Health Monitoring:** Melakukan ping periodik setiap 30 detik ke endpoint backend `/status`.
- **Indikator Visual:** Menampilkan status koneksi gateway (Online/Offline) dengan animasi denyut (*ping dot*), latensi koneksi (ms), model LLM yang sedang aktif, serta kesiapan Vector Database.

---

## 5. Kebutuhan Non-Fungsional (Non-Functional Requirements)

### 5.1 Kinerja & Pemuatan (Performance)
- Menggunakan `react-snap` untuk *pre-rendering* halaman statis agar waktu *First Contentful Paint (FCP)* berada di bawah 1.0 detik.
- Format aset gambar terstandarisasi dalam WebP dengan kompresi optimal.
- Lazy-loading komponen non-kritis dan rendering bersyarat untuk modal.

### 5.2 Keamanan (Security)
- **CORS Protection:** Hanya domain yang terdaftar dalam `ALLOWED_ORIGINS` (default: `https://raflylabs.com`) yang diizinkan melakukan interaksi browser ke backend.
- **Sanitasi Input:** Semua request di-parse dan disanitasi menggunakan Pydantic v2 (pemotongan karakter kontrol berbahaya `\x00`, pembatasan panjang teks maksimal 2.000 karakter, pembatasan histori pesan maksimal 12 turn).
- **Rate Limiting:** Menggunakan SlowAPI untuk mencegah eksploitasi token LLM dan spam webhook Discord.

### 5.3 SEO & Keterjangkauan (SEO & Accessibility)
- Metadata judul halaman, deskripsi, dan Open Graph yang deskriptif.
- Struktur semantik HTML5 (`<nav>`, `<main>`, `<section>`, `<footer>`).
- Dukungan atribut aksesibilitas (`aria-label`, tombol ramah pembaca layar, kontras teks tinggi).

---

## 6. Desain & Panduan Estetika (UI/UX Guidelines)

### 6.1 Filosofi Gaya: Neubrutalism
Antarmuka menerapkan gaya **Neubrutalism** modern yang menyeimbangkan karakter berani dan kejelasan fungsional:
- **Batas Tebal (Solid Borders):** `border-[3px] border-black` pada seluruh elemen kartu, tombol, dan window.
- **Bayangan Keras (Hard Drop Shadows):** Bayangan tajam tanpa blur, contohnya `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]` yang memberikan kesan fisik/taktil saat ditekan (*active state translation*).
- **Sudut Lengkung Terkendali:** Perpaduan antara radius `rounded-3xl` pada kartu bento dan `rounded-xl` pada tombol aksi.

### 6.2 Palet Warna (Color Tokens)

| Token Warna | Hex Code | Penggunaan |
|---|---|---|
| **nb-cream** | `#F4F1EA` | Warna latar belakang utama seluruh halaman |
| **nb-yellow** | `#E8FF8E` | Aksen tombol utama, header tabel chat, badge sorotan |
| **nb-pink** | `#FF90E8` | Aksen sekunder, tombol chat AI, tautan aktif, teks penekanan |
| **nb-cyan** | `#23A094` | Badge kategori sertifikat, tag teknologi, indikator status |
| **nb-black** | `#000000` | Border, teks utama, bayangan drop shadow |
| **nb-white** | `#FFFFFF` | Latar belakang kartu kontras, isi pop-up modal |

---

## 7. Rencana Pengembangan Masa Depan (Product Roadmap)

### Fase 1: Pemeliharaan & Stabilitas (Saat Ini)
- [x] Implementasi RAG ChromaDB dengan Cosine Similarity distance.
- [x] Integrasi formulir kontak dengan webhook Discord.
- [x] Optimalisasi widget chat responsif dengan dukungan resize dinamis.
- [x] Penguatan guardrails AI untuk pencegahan prompt injection.

### Fase 2: Peningkatan Interaktivitas & Homelab Monitoring
- [ ] **Homelab Status Dashboard:** Menampilkan widget ringkas telemetri server pribadi (CPU, RAM, Uptime Proxmox) secara publik.
- [ ] **Voice Input / Output pada AI Assistant:** Memungkinkan interaksi suara langsung (Speech-to-Text & Text-to-Speech) pada widget chat.
- [ ] **Audio Player Integration (Syncra Linkage):** Mengizinkan asisten chat memicu pemutaran audio latar (misal: "Putar lagu lofi") sesuai spesifikasi `INTEGRATION.md`.

### Fase 3: Analisis & Eksplorasi Proyek Lebih Lanjut
- [ ] **Interactive Terminal / CLI Mode:** Menambahkan modal terminal mini bagi pengunjung teknis untuk mengeksplorasi direktori proyek dan data diri via perintah teks sederhana.
- [ ] **Project Case Study Detail Pages:** Halaman detail untuk proyek besar (SnatchVid, Scribd Tool) yang membedah diagram arsitektur dan tantangan teknis yang diselesaikan.
