# Rekayasa & Proyek Terbaru (2026)

## RatingLy - Review Platform & Verification System
**GitHub:** https://github.com/Apewww/RatingLy
**Status:** Aktif / Tugas Besar Implementasi Perangkat Lunak

Platform rating dan ulasan berbasis web modern dengan sistem verifikasi transaksi dan audit ulasan anti-spam. Dibangun untuk memberikan transparansi evaluasi layanan digital dan produk.
- **Teknologi:** Laravel 11, PHP 8.3, Blade, TailwindCSS, MySQL, Alpine.js
- **Fitur:**
  - Role-based Access Control (Admin, Reviewer terverifikasi, Merchant/Pemilik Produk).
  - Algoritma moderasi ulasan otomatis untuk mendeteksi sentimen palsu dan spam rating.
  - RESTful API terstandarisasi untuk integrasi widget rating eksternal.
  - Pelaporan komprehensif, filtering tag kategori, dan analitik performa ulasan secara berkala.

## StitchLab Server - Microservice Image Synthesis & Processing
**GitHub:** https://github.com/Apewww/stitchlab-server
**Status:** Aktif / Private Microservice

Backend microservice berkinerja tinggi untuk pemrosesan citra, stitching multi-layer otomatis, kompresi aset gambar, dan konversi format grafis generasi baru (WebP/AVIF).
- **Teknologi:** Python, FastAPI, Pillow, OpenCV, NumPy, Redis Queue
- **Fitur:**
  - Automated image stitching dan layout synthesis dengan resolusi tinggi.
  - Background async queue worker berbasis Redis untuk job rendering berat.
  - RESTful API terenkripsi untuk komunikasi aman antar service RaflyLabs.

## SvcPanel - Homelab & Microservice Dashboard Manager
**GitHub:** https://github.com/Apewww/svcpanel-server
**Status:** Aktif / Homelab Production

Platform kontrol dan dashboard manajemen microservice server internal. Menyediakan pemantauan status kesehatan service, log inspection, manajemen restart NSSM/systemd, dan webhook alert real-time ke Discord.
- **Teknologi:** Node.js, Express, Fastify, WebSocket, Systemd / NSSM Bridge
- **Fitur:**
  - Health probe real-time untuk container LXC dan virtual machine di homelab.
  - Dispatch event status dan peringatan gangguan langsung ke channel Discord Homelab via webhook.
  - Lightweight web console dengan low-latency WebSocket connection.

## Reverse Engineering & Rekonstruksi Game Native / WebGL
**GitHub Repositories:** 
- https://github.com/Apewww/House-of-Legacy-Decompiled
- https://github.com/Apewww/Esports-Manager-2026-Decompiled
**Status:** Riset Teknikal & Rekayasa Perangkat Lunak Tingkat Lanjut

Proyek riset mendalam dekompilasi, decompilation assembly, dan rekonstruksi struktur kode game modern dari biner native ke C# murni:
- **House of Legacy:** Rekonstruksi menyeluruh arsitektur kode Mono Unity 2020 ke export project terstruktur dan optimasi pipeline WebGL.
- **Esports Manager 2026:** Dekompilasi game Unity 6 (6000.3.20f1) dengan proteksi IL2CPP Metadata v39 menggunakan Cpp2IL low-memory pipeline, menghasilkan DummyDll dan C# diffable yang bersih untuk analisa taktik engine game.
- **Keahlian:** Assembly inspection, Memory patching, IL2CPP metadata parsing, Unity reverse-engineering.
