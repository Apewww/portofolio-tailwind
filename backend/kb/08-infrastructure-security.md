# Infrastruktur, Homelab & Keamanan

## Arsitektur Zero-Trust Homelab & Server Production

Rafly merancang dan mengelola kluster server private berarsitektur Zero-Trust untuk menopang seluruh ekosistem layanan RaflyLabs:
- **Virtualisasi & Hypervisor:** Proxmox VE (Kernel Linux modern), LXC Containers untuk microservices terisolasi (AdGuard Home, Ingress Gateway, RaflyLabs Web, Scribd Tool, DB PostgreSQL/MySQL, Game Servers).
- **Network Routing & Firewall:** Router MikroTik RouterOS (RB750Gr3) dengan konfigurasi Zero-Trust firewall: isolasi jaringan publik dari LAN internal, central ingress port-forwarding, dan strict drop rules untuk segmen database.
- **Edge Proxy & Tunneling:** Integrasi Cloudflare Tunnel terenkripsi (Zero-Trust Tunnel) dengan central SSL certificate management di Ingress Gateway Nginx, melindungi origin IP server dari serangan DDoS langsung.
- **Microservices Deployment:** Otomasi systemd daemon, zero-downtime reload via control sockets, dan monitoring kesehatan berkala.

## Keamanan Web & Vulnerability Research

- **Fokus Riset:** Identifikasi celah keamanan web (OWASP Top 10), analisa logic flaw, bypass filter, rate limit bypass, dan secure coding practice.
- **Standar Pelaporan:** Berpengalaman menyusun laporan kerentanan teknis (Vulnerability Disclosure Program / VDP) berstandar internasional dengan deskripsi akar masalah (root cause), bukti eksploitasi (Proof of Concept), dan rekomendasi mitigasi terperinci.
- **Etika Keamanan:** Menjunjung tinggi etika *responsible disclosure* tanpa melakukan pengujian destruktif pada sistem pihak ketiga tanpa otorisasi.
