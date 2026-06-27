# Panduan Integrasi Klien - Centralized AI Chatbot Gateway

Dokumen ini menjelaskan cara mengintegrasikan client platform (**Web Portofolio**, **Web CuacaKita**, dan **Audio Stream (Syncra)**) dengan **Centralized AI Chatbot Gateway**.

---

## 🛠️ Alur Kerja Integrasi

```mermaid
sequenceDiagram
    participant User as Pengguna (Browser)
    participant Client as Aplikasi Klien (Frontend)
    participant Gateway as FastAPI Chatbot Gateway
    participant Redis as Redis Session DB
    participant OpenRouter as LLM (OpenRouter)

    User->>Client: Input Pesan Chat / Perintah Suara
    Client->>Gateway: POST /api/v1/chat/message { session_id, source_platform, message }
    Gateway->>Redis: Ambil History Chat (session_id)
    Redis-->>Gateway: Riwayat Chat
    Gateway->>OpenRouter: Kirim System Prompt + History + Pesan Baru
    OpenRouter-->>Gateway: Hasil teks / Function Call (Tool)
    Note over Gateway: Jika Function Call terpicu,<br/>jalankan fungsi lokal & perbarui context
    Gateway->>Redis: Simpan Riwayat Baru (TTL 1 Jam)
    Gateway-->>Client: Response JSON { response_type, content, action_triggered }
    Client->>User: Render pesan teks / Jalankan Aksi di UI (Play Musik, dll.)
```

---

## ⚙️ 1. Konfigurasi Environment Klien

Di masing-masing proyek klien, tambahkan variabel berikut pada file `.env` masing-masing:

```env
# URL Gateway Chatbot
REACT_APP_CHATBOT_GATEWAY_URL=https://api.raflylabs.com/api/ai/v1/chat/message
# Untuk project Next.js
NEXT_PUBLIC_CHATBOT_GATEWAY_URL=https://api.raflylabs.com/api/ai/v1/chat/message
# Untuk project Vite
VITE_CHATBOT_GATEWAY_URL=https://api.raflylabs.com/api/ai/v1/chat/message
```

---

## 💻 2. Contoh Kode Implementasi (JavaScript / TypeScript)

Berikut adalah contoh fungsi umum (*universal helper*) untuk mengirim pesan ke Gateway dan mengelola sesi obrolan di Frontend:

```javascript
// Mengambil atau membuat session_id unik untuk disimpan di localStorage klien
function getOrCreateSessionId(platformName) {
  const key = `chatbot_session_${platformName}`;
  let sessionId = localStorage.getItem(key);
  if (!sessionId) {
    sessionId = `${platformName}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem(key, sessionId);
  }
  return sessionId;
}

// Fungsi utama pengiriman pesan ke Gateway
async function sendMessageToGateway(messageText, platformName) {
  const gatewayUrl = window.env?.CHATBOT_GATEWAY_URL || "https://api.raflylabs.com/api/ai/v1/chat/message";
  const sessionId = getOrCreateSessionId(platformName);

  try {
    const response = await fetch(gatewayUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-assistant-kaylafayrousaflah"
      },
      body: JSON.stringify({
        session_id: sessionId,
        source_platform: platformName,
        message: messageText,
      }),
    });

    if (response.status === 429) {
      return {
        success: false,
        error: "Rate limit terlampaui. Silakan tunggu 1 menit sebelum mencoba lagi.",
      };
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data // { session_id, response_type, content, action_triggered }
    };
  } catch (error) {
    console.error("Gagal terhubung ke AI Gateway:", error);
    return {
      success: false,
      error: "Gagal terhubung ke asisten AI. Pastikan server gateway aktif.",
    };
  }
}
```

---

## 🎨 3. Penerapan Spesifik per Platform

### A. Website Portofolio (`web_porto` / `raflylabs.com`)
* **Tujuan**: Menjawab pertanyaan pengunjung tentang skill, proyek, dan pengalaman kerja Rafly.
* **Tipe Integrasi**: Widget Chat (Floating Chatbot Bubble) di pojok kanan bawah.
* **Penanganan Respons**:
  - Tampilkan `content` berupa teks respons dari AI.
  - Karena bertipe tanya-jawab umum, respons biasanya memiliki `"response_type": "text"`.

### B. Website Cuaca (`web_cuacakita`)
* **Tujuan**: Membantu pengguna memproses pertanyaan seputar ramalan cuaca melalui interaksi natural (NLP).
* **Tipe Integrasi**: Kolom pencarian bertenaga AI atau Chatbox Asisten Cuaca.
* **Penanganan Respons**:
  - Menampilkan deskripsi prakiraan cuaca yang dikembalikan oleh AI di UI Chat.

### C. Platform Audio Stream (`audio_stream` / `Syncra`)
* **Tujuan**: Memungkinkan kendali pemutar musik lewat perintah chat teks / suara (misal: "Putar lagu lofi").
* **Tipe Integrasi**: Chatbox asisten pemutar musik.
* **Penanganan Respons**:
  - Selain menampilkan pesan teks `content`, aplikasi **wajib** mendengarkan field `action_triggered`.
  - Jika `response_type` bernilai `"action"` dan `action_triggered` tidak kosong, jalankan fungsi pemutar musik di frontend.

#### Kode Contoh Integrasi Player di Audio Stream:
```javascript
async function handleAudioChat(userInput) {
  const result = await sendMessageToGateway(userInput, "audio_stream");

  if (!result.success) {
    addMessageToUI("system", result.error);
    return;
  }

  const { content, response_type, action_triggered } = result.data;
  
  // 1. Tampilkan pesan teks dari AI ke UI Chat
  addMessageToUI("assistant", content);

  // 2. Jika ada perintah pemutar musik yang dipicu oleh AI
  if (response_type === "action" && action_triggered) {
    const { target_service, command, parameters } = action_triggered;

    if (target_service === "audio_stream") {
      executeMusicCommand(command, parameters);
    }
  }
}

// Fungsi pengontrol pemutar musik asli di frontend Audio Stream
function executeMusicCommand(command, parameters) {
  console.log(`Menjalankan perintah musik: ${command} dengan parameter:`, parameters);
  
  switch (command) {
    case "PLAY_TRACK":
      // Contoh logika integrasi dengan audio player (HTML5 Audio / Spotify SDK / Custom Player)
      if (parameters.genre === "lo-fi") {
        playMusicGenre("lo-fi", parameters.track_id);
      } else {
        playMusicGenre(parameters.genre || "general");
      }
      break;
    case "STOP":
      pauseMusic();
      break;
    case "PAUSE":
      pauseMusic();
      break;
    case "NEXT":
      nextTrack();
      break;
    case "PREV":
      previousTrack();
      break;
    default:
      console.warn("Perintah tidak dikenal oleh player:", command);
  }
}
```

---

## ⚠️ Penanganan Error & Best Practices

1. **Rate Limiting (HTTP 429)**
   - Jika pengguna mengirim pesan terlalu cepat (lebih dari 10 kali/menit), gateway akan membalas dengan status HTTP 429.
   - Frontend harus menangkap status ini dan menampilkan notifikasi ramah pengguna: *"Eits, lambatkan pesanmu! Silakan tunggu beberapa saat."*

2. **Fallback Sesi Offline / Server Down**
   - Pastikan widget chat atau asisten AI di frontend tidak memblokir fungsionalitas utama web jika Gateway Chatbot mati. Gunakan blok `try-catch` di tingkat terluar pemanggilan API.

3. **Indikator Loading (Typing Indicator)**
   - Panggilan ke LLM memerlukan waktu sekitar 1 s.d. 3 detik. Pastikan menampilkan animasi ketikan/loading (*typing indicator*) di UI chat agar memberikan pengalaman pengguna yang responsif (*interactive UX*).
