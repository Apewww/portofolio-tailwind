import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || "http://localhost:8000").replace(/\/+$/, '');

const categories = [
  "💼 Tawaran Proyek",
  "🤝 Kolaborasi",
  "🐛 Report Bug / Feedback",
  "☕ Tanya-tanya"
];

function CustomDropdown({ options, selected, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3.5 border-[3px] border-black rounded-2xl text-xs sm:text-sm font-bold bg-nb-cream text-black flex items-center justify-between transition-all duration-200 cursor-pointer ${
          isOpen
            ? 'bg-white border-nb-pink translate-x-[3px] translate-y-[3px] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
            : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
        }`}
      >
        <span className="truncate">{selected}</span>
        <span className={`transition-transform duration-200 text-xs font-black ml-2 ${isOpen ? 'rotate-180 text-nb-pink' : 'text-black'}`}>
          ▼
        </span>
      </button>

      {/* Custom Dropdown Options Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl overflow-hidden py-1 transition-all">
          {options.map((option, idx) => {
            const isSelected = option === selected;
            return (
              <div
                key={idx}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className={`px-4 py-3 text-xs sm:text-sm font-black cursor-pointer flex items-center justify-between border-b border-black/10 last:border-b-0 transition-colors ${
                  isSelected
                    ? 'bg-nb-pink text-black'
                    : 'bg-white text-black hover:bg-nb-yellow'
                }`}
              >
                <span>{option}</span>
                {isSelected && (
                  <span className="text-[10px] font-black uppercase bg-black text-white px-1.5 py-0.5 rounded">
                    AKTIF
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '💼 Tawaran Proyek',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: null, message: '', step: 0 });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ loading: false, success: false, message: 'Mohon lengkapi Nama Lengkap, Email Kontak, dan Isi Pesan Anda!', step: 0 });
      return;
    }

    // Step 1: Initiating connection
    setStatus({ loading: true, success: null, message: 'Menghubungkan ke API Gateway...', step: 1 });

    try {
      // Step 2: Formatting payload after short delay for feedback
      await new Promise((resolve) => setTimeout(resolve, 400));
      setStatus({ loading: true, success: null, message: 'Memproses Notifikasi Discord Webhook...', step: 2 });

      const response = await fetch(`${BACKEND_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Gagal mengirim pesan ke server');
      }

      // Step 3: Success
      setStatus({
        loading: false,
        success: true,
        message: '🎉 Terima kasih! Pesan Anda telah berhasil terkirim secara instan ke channel Discord Rafly.',
        step: 3
      });
      setFormData({ name: '', email: '', subject: '💼 Tawaran Proyek', message: '' });
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        message: err.message || 'Gagal terhubung ke server backend. Pastikan server aktif.',
        step: 0
      });
    }
  };

  const inputStyle = "w-full px-4 py-3.5 border-[3px] border-black rounded-2xl text-xs sm:text-sm font-bold bg-nb-cream text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:bg-white focus:border-nb-pink focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] focus:outline-none transition-all duration-200 placeholder:text-gray-400 placeholder:font-medium";

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

        {/* Processing / Status Feedback Banner */}
        {status.loading && (
          <div className="mb-8 p-5 bg-nb-yellow border-3 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-3 animate-pulse">
            <div className="flex items-center justify-between font-black text-xs uppercase tracking-wider text-black">
              <span className="flex items-center gap-2">
                <span className="animate-spin inline-block border-2 border-black border-t-transparent rounded-full w-4 h-4"></span>
                {status.message}
              </span>
              <span>Langkah {status.step}/3</span>
            </div>
            <div className="w-full bg-white border-2 border-black h-3 rounded-full overflow-hidden p-0.5">
              <div
                className="bg-nb-pink h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(status.step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {!status.loading && status.message && (
          <div
            className={`mb-8 p-4 rounded-2xl border-3 border-black font-black text-xs sm:text-sm text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${
              status.success === true
                ? 'bg-green-300 text-black border-black'
                : 'bg-red-300 text-black border-black'
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
                className={inputStyle}
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
                className={inputStyle}
              />
            </div>

            {/* Input 3: Custom Neubrutalism Dropdown */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                  <span>🏷️</span> Kategori Pesan
                </label>
                <span className="text-[9px] font-black uppercase bg-nb-yellow/40 text-black border border-black/30 px-1.5 py-0.5 rounded">Pilih</span>
              </div>
              <CustomDropdown
                options={categories}
                selected={formData.subject}
                onSelect={(val) => setFormData({ ...formData, subject: val })}
              />
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
              className={`${inputStyle} resize-y min-h-[140px]`}
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
                <span>Memproses Pesan...</span>
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
