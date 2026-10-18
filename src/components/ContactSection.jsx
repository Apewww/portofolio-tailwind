import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || "https://api.raflylabs.com/api/ai").replace(/\/+$/, '');

const categories = [
  "Tawaran Proyek",
  "Kolaborasi Rekayasa",
  "Konsultasi & Diskusi",
  "Pertanyaan Umum"
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Tawaran Proyek',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: null, message: '' });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("contact@raflylabs.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        loading: false,
        success: false,
        message: 'Mohon lengkapi Nama, Email, dan Pesan Anda sebelum mengirim.'
      });
      return;
    }

    setStatus({ loading: true, success: null, message: 'Mengirimkan pesan Anda...' });

    try {
      const response = await fetch(`${BACKEND_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Gagal mengirim pesan ke server.');
      }

      setStatus({
        loading: false,
        success: true,
        message: 'Pesan Anda berhasil dikirim! Terima kasih, saya akan segera merespon.'
      });
      setFormData({ name: '', email: '', subject: 'Tawaran Proyek', message: '' });
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        message: 'Gagal mengirim via form saat ini. Silakan hubungi langsung ke contact@raflylabs.com.'
      });
    }
  };

  const inputStyle = "w-full px-4 py-3 border-2 border-black rounded-xl text-sm font-semibold bg-nb-cream text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:bg-white focus:border-nb-pink focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] focus:outline-none transition-all duration-200 placeholder:text-slate-400";

  return (
    <div id="contact" className="mt-16 sm:mt-24 md:mt-28 mb-16 w-full">
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center gap-3 mb-10 sm:mb-14 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
          Hubungi Saya
        </h2>
        <div className="h-1.5 w-16 bg-nb-pink border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"></div>
        <p className="text-xs sm:text-sm font-bold text-slate-700 max-w-lg mt-1">
          Ada ide proyek, peluang kerja sama, atau ingin bertukar pikiran? Jangan ragu untuk menghubungi saya.
        </p>
      </div>

      {/* Standard 2-Column Contact Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-start">
        {/* Left Column: Contact Information Cards */}
        <motion.div
          className="lg:col-span-5 flex flex-col gap-5"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Card 1: Email Box */}
          <div className="nb-card p-6 bg-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-nb-yellow border-2 border-black flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-black uppercase text-slate-500 tracking-wider">Email Utama</p>
                <a
                  href="mailto:contact@raflylabs.com"
                  className="text-sm sm:text-base font-black font-mono text-black hover:text-nb-pink transition-colors underline decoration-2 underline-offset-4"
                >
                  contact@raflylabs.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-2 border-t-2 border-black/10">
              <a
                href="mailto:contact@raflylabs.com"
                className="nb-button bg-black text-white hover:bg-nb-pink hover:text-black py-2 px-3.5 text-xs font-extrabold uppercase tracking-wider flex-1 text-center inline-flex items-center justify-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span>Kirim Email</span>
              </a>

              <button
                type="button"
                onClick={copyEmail}
                className="nb-button bg-nb-yellow hover:bg-nb-pink py-2 px-3.5 text-xs font-extrabold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Tersalin</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Salin</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card 2: Location & Availability */}
          <div className="nb-card p-6 bg-white space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-nb-pink border-2 border-black flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-black uppercase text-slate-500 tracking-wider">Lokasi</p>
                <p className="text-sm font-bold text-black">Cimahi / Bandung, Jawa Barat</p>
                <p className="text-xs text-slate-600 font-medium">Tersedia untuk Remote & On-site</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 border-t-2 border-black/10">
              <div className="w-9 h-9 rounded-xl bg-nb-cyan border-2 border-black flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-black uppercase text-slate-500 tracking-wider">Waktu Respon</p>
                <p className="text-sm font-bold text-black">&lt; 24 Jam Kerja</p>
                <p className="text-xs text-slate-600 font-medium">Senin - Jumat (09:00 - 18:00 WIB)</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Standard Clean Form Card */}
        <motion.div
          className="lg:col-span-7 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-3xl p-6 sm:p-8"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="border-b-2 border-black pb-4 mb-6">
            <h3 className="text-xl font-black uppercase tracking-tight text-black">
              Formulir Kontak
            </h3>
            <p className="text-xs text-slate-600 font-semibold mt-1">
              Silakan isi formulir di bawah ini. Pesan akan langsung diteruskan ke saya.
            </p>
          </div>

          {/* Status Alert Banner */}
          {status.message && (
            <div
              className={`mb-6 p-4 rounded-xl border-2 border-black font-bold text-xs sm:text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                status.success === true
                  ? 'bg-green-300 text-black'
                  : status.loading
                  ? 'bg-nb-yellow text-black animate-pulse'
                  : 'bg-red-300 text-black'
              }`}
            >
              <div className="flex items-center gap-2">
                {status.loading && (
                  <span className="animate-spin inline-block border-2 border-black border-t-transparent rounded-full w-4 h-4"></span>
                )}
                <span>{status.message}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Field: Nama Lengkap */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-black flex items-center justify-between">
                <span>Nama Lengkap</span>
                <span className="text-[10px] text-nb-pink font-black uppercase">Wajib</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap Anda"
                required
                className={inputStyle}
              />
            </div>

            {/* Field: Email Kontak */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-black flex items-center justify-between">
                <span>Alamat Email</span>
                <span className="text-[10px] text-nb-pink font-black uppercase">Wajib</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="contoh: nama@domain.com"
                required
                className={inputStyle}
              />
            </div>

            {/* Field: Kategori / Subjek */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-black flex items-center justify-between">
                <span>Topik / Kategori</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">Pilih</span>
              </label>
              <div className="relative">
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`${inputStyle} appearance-none cursor-pointer pr-10`}
                >
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat} className="bg-white text-black font-semibold">
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-black">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Field: Isi Pesan */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-black flex items-center justify-between">
                <span>Pesan</span>
                <span className="text-[10px] text-nb-pink font-black uppercase">Wajib</span>
              </label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tuliskan pesan, rincian proyek, atau pertanyaan Anda..."
                required
                className={`${inputStyle} resize-y min-h-[120px]`}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status.loading}
              className="w-full nb-button-primary py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {status.loading ? (
                <>
                  <span className="animate-spin inline-block border-2 border-black border-t-transparent rounded-full w-4 h-4"></span>
                  <span>Mengirimkan Pesan...</span>
                </>
              ) : (
                <>
                  <span>Kirim Pesan</span>
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
