# Portfolio Projects

## Scribd Tool
**URL:** https://scribd.raflylabs.com
**GitHub:** https://github.com/Apewww/scribd-tool
**Status:** Demo aktif

Web-based & CLI document extractor untuk mengekstrak dokumen Scribd secara penuh, render lokal 2x Retina scale, dan konversi ke searchable PDF serta teks plain. Menggunakan Playwright Chromium headless untuk bypass proteksi Scribd, in-memory job manager multithreaded (Waitress & ThreadPoolExecutor), dan PyMuPDF/Pillow untuk sintesis PDF presisi.
- **Tags:** Flask, Playwright, Python, PyMuPDF, CLI
- **Fitur:** Local DOM rendering (2x Retina), bypass Cloudflare/Fastly challenge, dual interface (Web UI & CLI), thread-safe multithreaded queue, ekspor PDF & TXT.

## Natacell Portal
**URL:** https://natacell.my.id
**Status:** Demo aktif — kode sumber privat

Portal etalase online toko ATK, pulsa/PPOB, jasa fotocopy & service komputer. Dilengkapi bank soal SD-SMA untuk menarik trafik organik dari Google.
- **Tags:** Laravel, Filament, TailwindCSS, SEO
- **Fitur:** etalase produk, konten bank soal, optimasi SEO organik

## AI Gateway
**URL:** https://chat.raflylabs.com
**GitHub:** https://github.com/Apewww/AI-Assistant-Gateway
**Status:** Publik

Gateway AI terpusat berbasis web yang menghubungkan model LLM (via OpenRouter) dengan beberapa platform frontend (portofolio, weather, audio stream) melalui satu API endpoint. Setiap request membawa `session_id` (kontinuitas percakapan) dan `source_platform` (AI menyesuaikan peran per platform). AI bisa memanggil fungsi backend (`get_weather`, `play_audio`, `get_portfolio`) dan respons berisi teks biasa atau **action trigger** yang dieksekusi frontend (misal memutar lagu).
- **Tags:** NextJS, FastAPI, Uvicorn, OpenRouter, Redis, Python, AI, LLM
- **Fitur:** Function Calling (`get_current_weather`, `control_audio_player`, `get_portfolio_info`), session persistence Redis + fallback in-memory, rate limiting 10 req/menit/session, AI Mode `isolated` (portfolio-only, refusals ketat) vs `open` (general-purpose)
- **Arsitektur modular:** `app/` package berisi config, models (Pydantic), session store, rate_limiter, system_prompts, routes, dan tools (weather/audio)
- **Frontend:** Next.js Chat Panel dark theme, markdown rendering, session management
- **Peran dalam ekosistem:** menjadi "otak" terpusat yang dipakai banyak aplikasi RaflyLabs, termasuk asisten di portofolio ini.

## Syncra
**URL:** https://syncra.raflylabs.com
**Status:** Demo aktif — kode sumber privat

Platform streaming audio web berbasis YouTube yang ringan, modern, dan stabil. Mencakup Backend API, React Web Application, Admin Control Panel, dan Mobile Application. API production di `api.raflylabs.com` (dokumentasi di `/docs`) dengan endpoint MCP (`/mcp/sse/v1`) untuk monitoring.
- **Tags:** React, FastAPI, YT-DLP, Python, React Native
- **Fitur:** search & stream instan dari YouTube (streaming PWA installable), autoplay "Mix" ala Spotify (list=RD), infinite queue, UI glassmorphism, admin panel (monitor CPU/RAM/Disk/Network, live logs, broadcast, manajemen user, support ticket), autentikasi terpusat (JWT cookie), mobile app React Native (Expo)
- **Integrasi AI:** chatbot AI untuk kontrol pemutar musik, backend API production di api.raflylabs.com
- **API:** REST API dengan autentikasi API key

## Natahost
**URL:** https://natahost.raflylabs.com
**Status:** Repo privat (tidak ada link publik)

Web penjualan hosting dan domain dengan payment gateway terintegrasi.
- **Tags:** React, Laravel, Payment Gateway
- **Fitur:** katalog layanan hosting & domain, integrasi payment gateway, manajemen pembelian dari dashboard frontend React.

## MyFinance Note
**URL:** https://myfinance-note.vercel.app
**GitHub:** https://github.com/Apewww/myfinance-note
**Status:** Publik

Personal finance PWA modern untuk pencatatan pemasukan dan pengeluaran, dibangun dengan React + Tailwind + Supabase.
- **Tags:** React, TypeScript, Supabase, TailwindCSS, Vite
- **Fitur:** PWA installable dgn offline support, real-time sync via Supabase, glassmorphism + Framer Motion animations + dark mode, financial analytics (trend charts, category breakdown), format Rupiah otomatis, full auth (login/register) dengan Supabase Auth & RLS

## CuacaKita
**URL:** https://cuacakita.raflylabs.com
**GitHub:** https://github.com/Apewww/CuacaKita
**Status:** Publik

Aplikasi widget prakiraan cuaca modern untuk kota-kota Indonesia, antarmuka bersih & responsif dengan tema gelap/terang. Dinamis search tanpa reload, dukungan PWA installable.
- **Tags:** Flask, Python, WeatherAPI, TailwindCSS, PWA
- **Fitur:** premium UI glassmorphism + tipografi Inter, dynamic city search, dark/light mode otomatis & manual (tersimpan di browser), responsive mobile & desktop
- **Produksi:** Windows Service via Waitress (WSGI) + NSSM untuk stabilitas tinggi

## Nata Soal
**URL:** https://natasoal.my.id
**Status:** Demo aktif (statis, tanpa payment gateway)

Platform bank soal & rangkuman materi pelajaran gratis untuk SD, SMP, SMA, SMK, plus kategori Latihan TKA (Tes Kemampuan Akademik). Pengguna bisa melihat pratinjau materi, membuka file via Google Drive, dan mengunduh tanpa login. Didanai melalui donasi QRIS. Tagline: "Gratis untuk Semua Pelajar Indonesia".
- **Tags:** HTML, CSS, JavaScript, SEO
- **Fitur:** katalog materi + filter (jenjang, tipe soal/rangkuman, mapel, kelas, pencarian), pratinjau layar penuh + buka file Google Drive, tombol share (WA/FB/Telegram), modal donasi QRIS, SEO meta & OpenGraph

## PDDikti Lookup & Web Explorer
**Status:** Repo lokal (dual interface: Web Portal + CLI)

Platform pencarian & eksplorasi data publik pendidikan tinggi Indonesia (Mahasiswa, Dosen, Perguruan Tinggi, Program Studi) dari PDDikti Kemdiktisaintek. Terdiri dari Web Portal Explorer (replica web PDDikti, backend Node.js/Express) dan CLI tool Python tanpa dependensi. Termasuk reverse engineering mekanisme enkripsi `/internal/decrypt` untuk menerjemahkan payload API.
- **Tags:** Python, Node.js, Express, CLI, Web Scraping
- **Fitur:** pencarian multi-kategori (mahasiswa by NIM/nama, dosen by NIDN/NUPTK, PT by kode/nama, prodi dengan filter jenjang + kampus), biodata detail (status akademik, tanggal masuk, jenis pendaftaran, kode PT/prodi), proxy API + dekripsi payload live, CLI ringan dengan output tabel terminal

## Asset Management
**Status:** Repo privat (tidak ada link publik)

Sistem manajemen aset perusahaan yang menekankan efisiensi dan integritas struktural (inventarisasi, pelacakan, dan pengelolaan aset).
- **Tags:** React, Flask, Python
- **Fitur:** pencatatan & pelacakan aset, manajemen inventaris, antarmuka React + API Flask.

## Algorithm SAW
**Status:** Repo privat (tidak ada link publik)

Implementasi sistem pendukung keputusan yang dioptimalkan menggunakan metode Simple Additive Weighting (SAW) dengan logika matematika terstruktur (normalisasi matriks, pembobotan kriteria, perangkingan alternatif).
- **Tags:** Python, Logic
- **Fitur:** perhitungan SAW multi-kriteria, logika perangkingan, pendukung keputusan berbasis matematika.
