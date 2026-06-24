import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CV_PATH = '/assets/pdf/CV_RaflyAnggaraPutra.pdf';

// Icon components
const IconDownload = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
  </svg>
);

const IconExternalLink = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const IconClose = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function CVModal({ isOpen, onClose }) {
  const overlayRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center sm:p-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="relative w-full sm:max-w-3xl lg:max-w-4xl bg-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col rounded-t-2xl sm:rounded-2xl overflow-hidden"
            style={{ height: '92vh', maxHeight: '92vh' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-4 py-3 border-b-4 border-black bg-nb-cream flex-shrink-0">
              {/* Left: label */}
              <div className="flex items-center gap-2.5">
                <span className="text-lg">📄</span>
                <div>
                  <p className="font-black text-xs uppercase tracking-widest leading-none">Curriculum Vitae</p>
                  <p className="text-[10px] text-black/50 font-semibold mt-0.5">Rafly Anggara Putra</p>
                </div>
              </div>

              {/* Right: actions */}
              <div className="flex items-center gap-2">
                {/* Open in new tab */}
                <a
                  href={CV_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Buka di tab baru"
                  className="h-8 w-8 flex items-center justify-center border-2 border-black rounded-lg bg-white hover:bg-nb-yellow shadow-[2px_2px_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  <IconExternalLink />
                </a>

                {/* Download — satu-satunya tombol download */}
                <a
                  href={CV_PATH}
                  download="CV_RaflyAnggaraPutra.pdf"
                  title="Download CV"
                  className="h-8 flex items-center gap-1.5 px-3 border-2 border-black rounded-lg bg-nb-pink font-black text-xs uppercase tracking-tight shadow-[2px_2px_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  <IconDownload />
                  <span className="hidden sm:inline">Download</span>
                </a>

                {/* Divider */}
                <span className="w-px h-5 bg-black/20 mx-1" />

                {/* Close */}
                <button
                  onClick={onClose}
                  title="Tutup (Esc)"
                  className="h-8 w-8 flex items-center justify-center border-2 border-black rounded-lg bg-white hover:bg-red-100 shadow-[2px_2px_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  aria-label="Tutup preview CV"
                >
                  <IconClose />
                </button>
              </div>
            </div>

            {/* ── PDF Viewer — maksimalkan area ── */}
            <div className="flex-1 overflow-hidden bg-gray-200">
              <iframe
                src={`${CV_PATH}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                title="Preview CV Rafly Anggara Putra"
                className="w-full border-none"
                style={{ height: '100%', display: 'block' }}
              />
            </div>

            {/* ── Hint bar — tipis, subtle ── */}
            <div className="flex items-center justify-between px-4 py-1.5 border-t-2 border-black/10 bg-nb-cream flex-shrink-0">
              <span className="text-[10px] text-black/40 font-semibold">
                Tekan <kbd className="font-black bg-white border border-black/20 rounded px-1">Esc</kbd> atau klik di luar untuk menutup
              </span>
              <span className="text-[10px] text-black/30 font-semibold hidden sm:block">
                CV_RaflyAnggaraPutra.pdf
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
