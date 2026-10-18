import React from 'react';

const navLinks = [
  { label: 'Keahlian', id: 'skills' },
  { label: 'Pendidikan', id: 'education' },
  { label: 'Proyek', id: 'portofolio' },
  { label: 'GitHub', id: 'github' },
  { label: 'Sertifikat', id: 'certificates' },
  { label: 'Kontak', id: 'contact' },
];

export default function Footer() {
  const handleClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-nb-black text-white border-t-8 border-black">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10 text-center sm:text-left">
        <div className="flex flex-col items-center sm:items-start gap-2">
          <p className="font-black uppercase tracking-tighter text-lg leading-none">Rafly Anggara Putra</p>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-nb-yellow">
            Always Learning, <span className="text-nb-pink">Always Building!</span>
          </p>
        </div>

        <div className="flex flex-col items-center sm:items-start gap-2">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-1">Navigasi</p>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleClick(e, link.id)}
              className="font-bold text-xs uppercase tracking-wider hover:text-nb-yellow transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center sm:items-start gap-2.5">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-1">Kontak & Jaringan</p>
          <a
            href="mailto:contact@raflylabs.com"
            className="font-bold text-xs uppercase tracking-wider hover:text-nb-yellow transition-colors flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5 text-nb-yellow flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>contact@raflylabs.com</span>
          </a>
          <a
            href="https://www.instagram.com/stellochron/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-xs uppercase tracking-wider hover:text-nb-pink transition-colors flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5 text-nb-pink flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span>Instagram (@stellochron)</span>
          </a>
          <a
            href="https://discord.com/users/695513585639620629"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-xs uppercase tracking-wider hover:text-nb-cyan transition-colors flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5 text-nb-cyan flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            <span>Discord (@stellochron)</span>
          </a>
          <p className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Cimahi, Jawa Barat, Indonesia</span>
          </p>
        </div>
      </div>

      <div className="border-t-2 border-white/20 text-center py-4 px-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">
          © {new Date().getFullYear()} Rafly Anggara Putra. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
