import React from 'react';

const Marquee = ({ text, bg = "bg-nb-yellow" }) => {
  return (
    <div className={`relative flex overflow-x-hidden border-y-8 border-black ${bg} py-4 select-none`}>
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-4xl md:text-6xl font-black uppercase tracking-tighter mx-8 text-black">
            {text} <span className="text-white [-webkit-text-stroke:2px_black]">✦</span>
          </span>
        ))}
      </div>

      <div className="absolute top-0 animate-marquee whitespace-nowrap flex items-center" aria-hidden="true">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-4xl md:text-6xl font-black uppercase tracking-tighter mx-8 text-black">
            {text} <span className="text-white [-webkit-text-stroke:2px_black]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
