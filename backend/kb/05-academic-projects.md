# Academic Projects

## Tribite - Tugas Besar Pemrograman Website Semester 2
**GitHub:** https://github.com/Apewww/tribite
**Status:** Publik (1 star)

Aplikasi web profil dengan sistem rating dan riwayat. Dibangun sebagai tugas besar mata kuliah pemrograman website.
- **Teknologi:** HTML, CSS, JavaScript
- **Fitur:** profile CRUD, rating menu, riwayat
- **Tahun:** 2025

## EndlessDrive - Game 2D Endless Runner
**GitHub:** https://github.com/Apewww/EndlessDrive
**Status:** Publik (1 star)

Game endless runner 2D retro-futuristik (synthwave neon) dengan procedurally generated obstacles, skin system 4 mobil unik (Royal Phoenix, Neon Pulse, Desert Nomad, Classic) dengan efek glow berbeda, high score tracker, coin collection & shop (beli/equip skin), sound synthesis, dan persistence preferences menggunakan Java Swing/AWT.
- **Teknologi:** Java 17+ (rekomendasi Java 21), Java Swing, AWT
- **Fitur:** 4 skin mobil + glow, sistem koin & belanja skin, procedurally generated obstacles, high score & coin via Java Preferences API, fullscreen exclusive mode, kontrol keyboard (arrow/WASD), sound procedural (coin/crash/select), settings toggle sound, menu utama (high score & coin balance), game over stats, shop preview animasi

## Startup Simulator - Game Simulasi Manajemen Startup
**GitHub:** https://github.com/Apewww/startup-simulator
**Status:** Publik (2 star)

Game simulasi manajemen startup teknologi berbasis desktop. Pemain membangun perusahaan teknologi dari awal, mengelola R&D, marketing, hiring, server infrastructure, compliance, dan investor relations. Terinspirasi dari Startup Company (Hovgaard Games). Tick-based simulation (1 tick = 1 jam in-game; 20 tick = 1 hari; 600 tick = 1 bulan; speed 1x/2x/4x + pause).
- **Teknologi:** React 19, TypeScript, Tauri 2, Tailwind CSS 4, Zustand 5, Dexie.js (IndexedDB), Lucide React, Vite 8
- **Evolusi fitur (v1.0→v2.3):**
  - v1.0-1.2: game loop, keuangan, karyawan, produksi komponen
  - v1.3: platform features, traffic/users, server rack+node+cooling, compliance
  - v1.4: Lead Developer supervision, office grid modular, furniture system, perk points
  - v1.5: monetisasi rebalance (Ads Tier, B2B API, Subscription), cooling grid, SysAdmin tie-in
  - v1.6: Ad Sales Pipeline (spesialis, leads, campaign, auto-renew)
  - v1.7: pricing slider per produk, banking (loan, credit score)
  - v1.8: revenue visualization, deal notification, client history
  - v1.9: competitor AI, marketing & branding system
  - v2.0: R&D Tech Tree, Investor Relations (board, term sheet), Personal Wealth & Titles
  - v2.1: Leaderboard 1000 produk, Stock Market, Multi-AI funding, akuisisi
  - v2.2: Multi-Product Portfolio, Global Expansion, RPS routing per rack
  - v2.3: Endgame (Victory screen, New Game+), per-product valuation

## Bot PDDikti Discord - Verifikasi Data Mahasiswa Otomatis
**GitHub:** https://github.com/Apewww/bot-pddikti-dc
**Status:** Publik (1 star)

Bot Discord untuk verifikasi data mahasiswa Indonesia secara otomatis melalui PDDikti (Pangkalan Data Pendidikan Tinggi). Bot membaca data dari server PDDikti menggunakan Chrome stealth automation untuk bypass Cloudflare, lalu mencocokkan dengan database universitas yang dikonfigurasi per server. Cocok untuk server kampus, organisasi mahasiswa, atau komunitas pendidikan.
- **Teknologi:** Node.js, Discord.js, SQLite, Chrome DevTools Protocol (CDP)
- **Fitur:** auto-verifikasi Nama+NIM ke PDDikti, config per-server (universitas, role, channel log), database SQLite (NIM terverifikasi tidak bisa dipakai ulang), auto bypass Cloudflare (Chrome headless via CDP, bot terdeteksi sebagai browser normal, tanpa 2Captcha), role otomatis, channel log, DM support (default UNJANI)
- **Commands:** `/setup` (admin, embed + konfigurasi server), `/setrole` (admin, role ID), `/check` (modal input Nama + NIM, auto-approve jika cocok)
