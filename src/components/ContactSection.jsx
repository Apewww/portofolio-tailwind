import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || "http://localhost:8000").replace(/\/+$/, '');

const categories = [
  "💼 Tawaran Proyek",
  "🤝 Kolaborasi",
  "🐛 Report Bug / Feedback",
  "☕ Tanya-tanya"
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '💼 Tawaran Proyek',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: null, message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ loading: false, success: false, message: 'Mohon lengkapi Nama Lengkap, Email Kontak, dan Isi Pesan Anda!' });
      return;
    }

    setStatus({ loading: true, success: null, message: 'Mengirim pesan instan ke Discord Rafly...' });

    try {
      const response = await fetch(`${BACKEND_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Gagal mengirim pesan ke server');
      }

      setStatus({
        loading: false,
        success: true,
        message: '🎉 Terima kasih! Pesan Anda telah berhasil terkirim secara instan ke channel Discord Rafly.'
      });
      setFormData({ name: '', email: '', subject: '💼 Tawaran Proyek', message: '' });
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        message: err.message || 'Gagal terhubung ke server backend. Pastikan server aktif.'
      });
    }
  };

  return (
    <div id="contact" className="mt-40 mb-24 w-full">
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center gap-3 mb-10 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase flex items-center gap-3">
          Hubungi Rafly Langsung <span className="text-3xl sm:text-4xl text-nb-pink">✴</span>
        </h2>
      </div>

      {/* Main Stretched Form Card */}
      <motion.div
        className="w-full bg-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Form Card Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-black pb-4 mb-8">
          <div className="flex items-center gap-2.5">
            <span className="w-3.5 h-3.5 rounded-full bg-nb-pink border-2 border-black inline-block animate-pulse"></span>
            <h3 className="font-black text-lg sm:text-xl uppercase tracking-tight text-black flex items-center gap-2">
              Formulir Pesan <span className="text-nb-pink font-mono text-xs sm:text-sm">[DISCORD API]</span>
            </h3>
          </div>
          <span className="text-[10px] sm:text-xs font-black uppercase bg-nb-yellow text-black border-2 border-black px-3 py-1 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            Webhook Discord
          </span>
        </div>

        {/* Status Notification Banner */}
        {status.message && (
          <div
            className={`mb-8 p-4 rounded-2xl border-3 border-black font-black text-xs sm:text-sm text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${
              status.success === true
                ? 'bg-green-300 text-black border-black'
                : status.success === false
                ? 'bg-red-300 text-black border-black'
                : 'bg-nb-cyan text-black'
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input 1: Nama Lengkap */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                  <span>👤</span> Nama Lengkap
                </label>
                <span className="text-[9px] font-black uppercase bg-nb-pink/20 text-nb-pink border border-black/30 px-1.5 py-0.5 rounded">Wajib</span>
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama Anda / Perusahaan"
                required
                className="w-full px-4 py-3.5 border-[3px] border-black rounded-2xl text-xs sm:text-sm font-bold bg-nb-cream text-black focus:bg-white focus:outline-none focus:border-nb-pink transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] placeholder:text-gray-400 placeholder:font-medium"
              />
            </div>

            {/* Input 2: Email Kontak */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                  <span>📧</span> Email Kontak
                </label>
                <span className="text-[9px] font-black uppercase bg-nb-pink/20 text-nb-pink border border-black/30 px-1.5 py-0.5 rounded">Wajib</span>
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="nama@domain.com"
                required
                className="w-full px-4 py-3.5 border-[3px] border-black rounded-2xl text-xs sm:text-sm font-bold bg-nb-cream text-black focus:bg-white focus:outline-none focus:border-nb-pink transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] placeholder:text-gray-400 placeholder:font-medium"
              />
            </div>

            {/* Input 3: Kategori Pesan Dropdown */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                  <span>🏷️</span> Kategori Pesan
                </label>
                <span className="text-[9px] font-black uppercase bg-nb-yellow/40 text-black border border-black/30 px-1.5 py-0.5 rounded">Pilih</span>
              </div>
              <div className="relative">
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border-[3px] border-black rounded-2xl text-xs sm:text-sm font-bold bg-nb-cream text-black focus:bg-white focus:outline-none focus:border-nb-pink transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer appearance-none pr-10"
                >
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat} className="bg-white text-black font-bold py-2">
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black font-black text-xs">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* Textarea: Isi Pesan */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                <span>💬</span> Isi Pesan
              </label>
              <span className="text-[9px] font-black uppercase bg-nb-pink/20 text-nb-pink border border-black/30 px-1.5 py-0.5 rounded">Wajib</span>
            </div>
            <textarea
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tuliskan detail pesan, kebutuhan proyek, atau pertanyaan Anda di sini..."
              required
              className="w-full px-4 py-3.5 border-[3px] border-black rounded-2xl text-xs sm:text-sm font-bold bg-nb-cream text-black focus:bg-white focus:outline-none focus:border-nb-pink transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] placeholder:text-gray-400 placeholder:font-medium resize-y min-h-[140px]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status.loading}
            className="w-full nb-button-primary py-4 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 transition-all hover:bg-nb-yellow shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] active:shadow-none"
          >
            {status.loading ? (
              <>
                <span className="animate-spin inline-block border-2 border-black border-t-transparent rounded-full w-4 h-4"></span>
                <span>Mengirim Ke Discord...</span>
              </>
            ) : (
              <>
                <span>Kirim Pesan Ke Discord</span>
                <span className="text-base">🚀</span>
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
