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

Gateway AI terpusat berbasis web yang menghubungkan model LLM (via OpenRouter) dengan beberapa platform frontend melalui satu API endpoint. Setiap request membawa `session_id` (kontinuitas percakapan) dan `source_platform` (AI menyesuaikan peran per platform).
- **Tags:** NextJS, FastAPI, Uvicorn, LLM, OpenRouter, Python
- **Fitur:** function calling (get_weather, play_audio, get_portfolio), session management dengan Redis, rate limiting, mode AI (isolated/open)
- **Frontend:** Next.js Chat Panel

## Syncra
**URL:** https://syncra.raflylabs.com
**Status:** Demo aktif — kode sumber privat

Platform streaming audio web berbasis YouTube yang ringan, modern, dan stabil. Mencakup Backend API, React Web Application, Admin Control Panel, dan Mobile Application.
- **Tags:** React, FastAPI, YT-DLP, Python, React Native
- **Fitur:** search & stream instan dari YouTube, autoplay "Mix" ala Spotify (list=RD), infinite queue, UI glassmorphism, admin panel (monitor CPU/RAM/Disk/Network, live logs, broadcast, manajemen user, support ticket), autentikasi terpusat, mobile app React Native (Expo)
- **API:** REST API dengan autentikasi API key

## Natahost
**URL:** https://natahost.raflylabs.com
**Status:** Repo privat (tidak ada link publik)

Web penjualan hosting dan domain dengan payment gateway terintegrasi.
- **Tags:** React, Laravel, Payment Gateway

## MyFinance Note
**URL:** https://myfinance-note.vercel.app
**GitHub:** https://github.com/Apewww/myfinance-note

Sistem keuangan pribadi yang fokus pada pencatatan data andal dengan konkurensi tinggi untuk pemasukan dan pengeluaran.
- **Tags:** React, TypeScript, Supabase
- **Fitur:** pencatatan transaksi, laporan keuangan, autentikasi via Supabase

## CuacaKita
**URL:** https://cuacakita.raflylabs.com
**GitHub:** https://github.com/Apewww/CuacaKita

Aplikasi prakiraan cuaca kota-kota di Indonesia menggunakan integrasi API modern dan framework Flask, dengan dukungan PWA agar bisa dipasang di perangkat.
- **Tags:** Flask, PWA, Python
- **Fitur:** prakiraan cuaca per kota, installable PWA, terintegrasi AI chatbot melalui gateway

## Asset Management
**Status:** Repo privat (tidak ada link publik)

Sistem manajemen aset perusahaan yang menekankan efisiensi dan integritas struktural.
- **Tags:** React, Flask, Python

## Algorithm SAW
**Status:** Repo privat (tidak ada link publik)

Implementasi sistem pendukung keputusan yang dioptimalkan menggunakan metode Simple Additive Weighting (SAW) dengan logika matematika terstruktur.
- **Tags:** Python, Logic
