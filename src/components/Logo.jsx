import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden">
        {/* Dynamic Bold Initial 'R' Logo */}
        <div className="absolute inset-0 bg-primary transform -skew-x-12 group-hover:skew-x-0 transition-all duration-500 shadow-[4px_4px_0px_rgba(255,255,255,0.1)]"></div>
        <span className="relative font-black text-xl italic text-white group-hover:scale-110 transition-transform duration-500">R</span>

        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-2 h-2 bg-white/20"></div>
      </div>

      <div className="flex flex-col leading-none font-extrabold uppercase tracking-tighter">
        <span className="text-white text-lg">Rafly Anggara</span>
        <span className="text-primary text-[10px] tracking-[0.3em] font-black italic">Fullstack Engineer</span>
      </div>
    </div>
  );
};

export default Logo;
