import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || "http://localhost:8000").replace(/\/+$/, '');

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Tawaran Proyek / Inquiry',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: null, message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ loading: false, success: false, message: 'Mohon lengkapi Nama, Email, dan Isi Pesan Anda!' });
      return;
    }

    setStatus({ loading: true, success: null, message: 'Mengirim pesan ke Discord Rafly...' });

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
        message: '🎉 Terima kasih! Pesan Anda telah berhasil terkirim instan ke Discord Rafly!'
      });
      setFormData({ name: '', email: '', subject: 'Tawaran Proyek / Inquiry', message: '' });
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        message: err.message || 'Gagal terhubung ke server backend. Pastikan server aktif.'
      });
    }
  };

  return (
    <div id="contact" className="mt-36 mb-24 max-w-[1300px] mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
        
        {/* Left Column: Context & Contact Info */}
        <motion.div
          className="lg:col-span-5 flex flex-col gap-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="inline-block text-xs font-black uppercase tracking-[0.25em] bg-nb-yellow text-black border-2 border-black px-3 py-1 rounded-lg mb-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              ⚡ Instant Webhook Messaging
            </span>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-none text-black mb-4">
              Hubungi Rafly <br />
              <span className="text-nb-pink underline decoration-nb-yellow decoration-8 underline-offset-4">Langsung</span> 💬
            </h2>
            <p className="text-sm font-bold opacity-85 leading-relaxed">
              Punya ide proyek, penawaran kerja sama, atau pertanyaan? Kirim pesan di sini dan notifikasi bot akan langsung muncul di channel Discord pribadi saya.
            </p>
          </div>

          {/* Quick Info Badges */}
          <div className="space-y-3">
            <div className="p-4 bg-white border-3 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-nb-cyan border-2 border-black flex items-center justify-center text-lg flex-shrink-0">
                💬
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <p className="text-[10px] font-black uppercase tracking-wider text-gray-500">Discord Notification</p>
                </div>
                <p className="text-xs font-black truncate text-black">Notifikasi Instan Active</p>
              </div>
            </div>

            <div className="p-4 bg-white border-3 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-nb-yellow border-2 border-black flex items-center justify-center text-lg flex-shrink-0">
                📧
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-500">Email Resmi</p>
                <a href="mailto:apewinaja@gmail.com" className="text-xs font-black truncate text-black hover:text-nb-pink transition-colors">
                  apewinaja@gmail.com
                </a>
              </div>
            </div>

            <div className="p-4 bg-white border-3 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-nb-pink border-2 border-black flex items-center justify-center text-lg flex-shrink-0">
                📷
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-500">Instagram</p>
                <a href="https://www.instagram.com/stellochron/" target="_blank" rel="noopener noreferrer" className="text-xs font-black truncate text-black hover:text-nb-cyan transition-colors">
                  @stellochron
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: High-Contrast Neubrutalism Form */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] rounded-3xl p-6 sm:p-8 md:p-10 relative">
            <div className="flex items-center justify-between border-b-3 border-black pb-4 mb-6">
              <h3 className="font-black text-xl uppercase tracking-tight text-black flex items-center gap-2">
                Formulir Pesan <span className="text-nb-pink font-mono text-sm">[DISCORD API]</span>
              </h3>
              <span className="text-[10px] font-black uppercase bg-nb-cream border border-black px-2 py-0.5 rounded-md">
                Fast Response
              </span>
            </div>

            {status.message && (
              <div
                className={`mb-6 p-4 rounded-xl border-3 border-black font-bold text-xs sm:text-sm text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
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

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-black uppercase mb-1 text-black">
                    Nama Lengkap <span className="text-nb-pink">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nama Anda / Perusahaan"
                    required
                    className="w-full px-4 py-3 border-3 border-black rounded-xl text-xs sm:text-sm font-bold bg-nb-cream focus:bg-white focus:outline-none focus:ring-2 focus:ring-nb-pink transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase mb-1 text-black">
                    Email Kontak <span className="text-nb-pink">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@domain.com"
                    required
                    className="w-full px-4 py-3 border-3 border-black rounded-xl text-xs sm:text-sm font-bold bg-nb-cream focus:bg-white focus:outline-none focus:ring-2 focus:ring-nb-pink transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase mb-1 text-black">
                  Subjek Pesan
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Tawaran Proyek / Pertanyaan"
                  className="w-full px-4 py-3 border-3 border-black rounded-xl text-xs sm:text-sm font-bold bg-nb-cream focus:bg-white focus:outline-none focus:ring-2 focus:ring-nb-pink transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase mb-1 text-black">
                  Isi Pesan <span className="text-nb-pink">*</span>
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tuliskan pesan atau penawaran Anda di sini..."
                  required
                  className="w-full px-4 py-3 border-3 border-black rounded-xl text-xs sm:text-sm font-bold bg-nb-cream focus:bg-white focus:outline-none focus:ring-2 focus:ring-nb-pink transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] resize-y min-h-[110px]"
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="w-full nb-button-primary py-4 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all hover:bg-nb-yellow"
              >
                {status.loading ? (
                  <>
                    <span className="animate-spin inline-block border-2 border-black border-t-transparent rounded-full w-4 h-4"></span>
                    <span>Mengirim Ke Discord...</span>
                  </>
                ) : (
                  <>
                    <span>Kirim Pesan Ke Discord Rafly</span>
                    <span className="text-base">🚀</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
