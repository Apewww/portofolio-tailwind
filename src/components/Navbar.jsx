import React, { useState, useEffect } from 'react';
import Logo from './Logo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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

  return (
    <>
      <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <a className="text-4xl font-black tracking-tighter" href="#home" onClick={(e) => handleClick(e, 'home')}>
            Rafly Anggara P.
          </a>

          <div className="hidden lg:flex items-center gap-12 font-bold uppercase text-xs tracking-widest">
            <button onClick={(e) => handleClick(e, 'education')} className="hover:text-nb-pink transition-colors">Education</button>
            <button onClick={(e) => handleClick(e, 'skills')} className="hover:text-nb-pink transition-colors">Skills</button>
            <button onClick={(e) => handleClick(e, 'portofolio')} className="hover:text-nb-pink transition-colors">My Work</button>
            <a
              href="#"
              className="nb-button bg-nb-pink py-2 px-6 text-[10px] rounded-lg"
            >
              Download CV
            </a>
          </div>

          <div className="lg:hidden">
            {/* Mobile menu could go here, but keeping it simple for now */}
            <div className="p-2 border-2 border-black rounded-lg bg-white shadow-nb">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}