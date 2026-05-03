import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { label: 'Education', id: 'education' },
    { label: 'Skills', id: 'skills' },
    { label: 'My Work', id: 'portofolio' },
    { label: 'Certifications', id: 'certificates' },
  ];

  return (
    <>
      <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-sm border-b-2 border-black' : 'bg-transparent py-6 sm:py-8'}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          <a
            className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter"
            href="#home"
            onClick={(e) => handleClick(e, 'home')}
          >
            Rafly Anggara P.
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12 font-bold uppercase text-xs tracking-widest">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={(e) => handleClick(e, link.id)}
                className="hover:text-nb-pink transition-colors"
              >
                {link.label}
              </button>
            ))}
            <a
              href="/assets/cv.pdf"
              download
              className="nb-button bg-nb-pink py-2 px-6 text-[10px] rounded-lg"
            >
              Download CV
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="lg:hidden p-2 border-2 border-black rounded-lg bg-white shadow-[3px_3px_0_rgba(0,0,0,1)] transition-all active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 lg:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer */}
        <div className={`absolute right-0 top-0 h-full w-72 bg-nb-cream border-l-4 border-black shadow-[-8px_0_0_rgba(0,0,0,1)] transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="pt-24 px-8 flex flex-col gap-2">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-nb-pink mb-4">Navigation</p>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={(e) => handleClick(e, link.id)}
                className="text-left text-2xl font-black uppercase py-3 border-b-2 border-black hover:text-nb-pink hover:pl-2 transition-all"
              >
                {link.label}
              </button>
            ))}
            <a
              href="/assets/cv.pdf"
              download
              className="nb-button bg-nb-pink text-black mt-8 text-center"
              onClick={() => setMenuOpen(false)}
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </>
  );
}