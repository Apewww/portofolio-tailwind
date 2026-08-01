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
        transition={{ duration: 0.6 }}
      >
        {/* Form Card Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-black pb-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-nb-pink border border-black inline-block"></span>
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
            className={`mb-6 p-4 rounded-2xl border-3 border-black font-black text-xs sm:text-sm text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${status.success === true
              ? 'bg-green-300 text-black border-black'
              : status.success === false
                ? 'bg-red-300 text-black border-black'
                : 'bg-nb-cyan text-black'
              }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-black uppercase mb-1.5 text-black tracking-wider">
                Nama Lengkap <span className="text-nb-pink">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama Anda / Perusahaan"
                required
                className="w-full px-4 py-3.5 border-3 border-black rounded-2xl text-xs sm:text-sm font-bold bg-nb-cream focus:bg-white focus:outline-none focus:ring-2 focus:ring-nb-pink transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] placeholder:text-gray-400 placeholder:font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1.5 text-black tracking-wider">
                Email Kontak <span className="text-nb-pink">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="nama@domain.com"
                required
                className="w-full px-4 py-3.5 border-3 border-black rounded-2xl text-xs sm:text-sm font-bold bg-nb-cream focus:bg-white focus:outline-none focus:ring-2 focus:ring-nb-pink transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] placeholder:text-gray-400 placeholder:font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1.5 text-black tracking-wider">
                Subjek Pesan
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Tawaran Proyek / Inquiry"
                className="w-full px-4 py-3.5 border-3 border-black rounded-2xl text-xs sm:text-sm font-bold bg-nb-cream focus:bg-white focus:outline-none focus:ring-2 focus:ring-nb-pink transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] placeholder:text-gray-400 placeholder:font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase mb-1.5 text-black tracking-wider">
              Isi Pesan <span className="text-nb-pink">*</span>
            </label>
            <textarea
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tuliskan detail pesan atau penawaran Anda di sini..."
              required
              className="w-full px-4 py-3.5 border-3 border-black rounded-2xl text-xs sm:text-sm font-bold bg-nb-cream focus:bg-white focus:outline-none focus:ring-2 focus:ring-nb-pink transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] placeholder:text-gray-400 placeholder:font-semibold resize-y min-h-[140px]"
            />
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="w-full nb-button-primary py-4 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 transition-all hover:bg-nb-yellow shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none"
          >
            {status.loading ? (
              <>
                <span className="animate-spin inline-block border-2 border-black border-t-transparent rounded-full w-4 h-4"></span>
                <span>Mengirim Ke Discord...</span>
              </>
            ) : (
              <>
                <span>Kirim Pesan</span>
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
