import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className="relative w-12 h-12 flex items-center justify-center border-4 border-black shadow-nb bg-black group-hover:bg-nb-pink transition-all">
        <span className="relative font-black text-2xl text-white group-hover:scale-110 transition-transform">R</span>
      </div>

      <div className="flex flex-col leading-none font-black uppercase tracking-tighter text-black">
        <span className="text-sm md:text-xl bg-white border-2 border-black px-2 shadow-nb">Rafly Anggara P.</span>
        <span className="text-nb-black text-[8px] md:text-[10px] tracking-[0.2em] font-black mt-1">Fullstack Engineer</span>
      </div>
    </div>
  );
};

export default Logo;
