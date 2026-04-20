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
      <div className={`navbar fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'nav-solid py-2 shadow-lg' : 'bg-transparent py-4'}`}>
        <div className="navbar-start">
          <div className="dropdown relative z-[100]">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden border-none hover:bg-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow-2xl bg-base-200 border border-base-300 rounded-lg w-52 font-bold">
              <li><button onClick={(e) => handleClick(e, 'skills')} className="hover:text-primary">Tech Stack</button></li>
              <li><button onClick={(e) => handleClick(e, 'portofolio')} className="hover:text-primary">Projects</button></li>
              <li><button onClick={(e) => handleClick(e, 'education')} className="hover:text-primary">Education</button></li>
              <li className="mt-2 pt-2 border-t border-base-300"><a href="https://github.com/Apewww" target="_blank" rel="noreferrer" className="text-primary underline">Github</a></li>
            </ul>
          </div>
          <a className="flex md:ml-4" href="#home" onClick={(e) => handleClick(e, 'home')}>
            <Logo />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2 font-bold text-sm opacity-80">
            <li><button onClick={(e) => handleClick(e, 'skills')} className="hover:text-primary transition-colors">Tech Stack</button></li>
            <li><button onClick={(e) => handleClick(e, 'portofolio')} className="hover:text-primary transition-colors">Projects</button></li>
            <li><button onClick={(e) => handleClick(e, 'education')} className="hover:text-primary transition-colors">Education</button></li>
          </ul>
        </div>
        <div className="navbar-end gap-3 md:mr-4">
          <a
            href="mailto:apewinaja@gmail.com"
            className="btn btn-primary btn-sm rounded-md px-6 hidden sm:flex"
          >
            Hire Me
          </a>
        </div>
      </div>
    </>
  )
}