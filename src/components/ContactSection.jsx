import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || "http://localhost:8000").replace(/\/+$/, '');

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Portofolio Inquiry',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: null, message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ loading: false, success: false, message: 'Mohon isi nama, email, dan pesan Anda!' });
      return;
    }

    setStatus({ loading: true, success: null, message: 'Mengirim pesan ke Discord...' });

    try {
      const response = await fetch(`${BACKEND_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Gagal mengirim pesan');
      }

      setStatus({
        loading: false,
        success: true,
        message: '🚀 Pesan Anda telah terkirim langsung ke Discord Rafly!'
      });
      setFormData({ name: '', email: '', subject: 'Portofolio Inquiry', message: '' });
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        message: err.message || 'Gagal terhubung ke server. Pastikan backend aktif.'
      });
    }
  };

  return (
    <div id="contact" className="mt-40 mb-20 max-w-4xl mx-auto px-4 sm:px-6">
      <motion.div
        className="nb-card bg-white p-6 sm:p-10 relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center text-center gap-2 mb-8">
          <span className="text-xs font-black uppercase tracking-[0.3em] bg-nb-yellow border-2 border-black px-3 py-1 rounded-md">
            Direct Messaging
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
            Kirim Pesan Langsung 📩
          </h2>
          <p className="text-sm font-bold opacity-80 max-w-md">
            Pesan yang Anda kirim akan langsung masuk sebagai notifikasi instan ke channel Discord Rafly.
          </p>
        </div>

        {status.message && (
          <div
            className={`mb-6 p-4 rounded-xl border-2 border-black font-bold text-xs sm:text-sm text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
              status.success === true
                ? 'bg-green-200 text-green-900 border-green-800'
                : status.success === false
                ? 'bg-red-200 text-red-900 border-red-800'
                : 'bg-nb-cyan text-black'
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-black uppercase mb-1">Nama Lengkap *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 border-2 border-black rounded-xl text-xs sm:text-sm font-bold bg-nb-cream focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Email Anda *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className="w-full px-4 py-3 border-2 border-black rounded-xl text-xs sm:text-sm font-bold bg-nb-cream focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase mb-1">Subjek / Topik</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Tawaran Proyek / Pertanyaan"
              className="w-full px-4 py-3 border-2 border-black rounded-xl text-xs sm:text-sm font-bold bg-nb-cream focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase mb-1">Isi Pesan *</label>
            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tuliskan detail pesan Anda di sini..."
              required
              className="w-full px-4 py-3 border-2 border-black rounded-xl text-xs sm:text-sm font-bold bg-nb-cream focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="w-full nb-button-primary py-4 text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {status.loading ? 'Mengirim Pesan...' : 'Kirim Pesan Ke Discord Rafly 🚀'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
