import React from 'react';
import { motion } from 'framer-motion';

const TechMarquee = () => {
  const techs = [
    { name: 'Python', color: 'bg-nb-yellow', icon: '/assets/img/python.png' },
    { name: 'JavaScript', color: 'bg-nb-cyan', icon: '/assets/img/js.png' },
    { name: 'Java', color: 'bg-nb-white', icon: '/assets/img/java.png' },
    { name: 'C#', color: 'bg-nb-pink', icon: '/assets/img/c-.png' },
    { name: 'Flask', color: 'bg-nb-cyan', icon: '/assets/img/python.png' },
    { name: 'React', color: 'bg-nb-white', icon: '/assets/img/js.png' },
    { name: 'Next.js', color: 'bg-nb-pink', icon: '/assets/img/js.png' },
    { name: 'Laravel', color: 'bg-nb-yellow', icon: '/assets/img/php.png' },
    { name: 'MySQL', color: 'bg-nb-cyan', icon: '' },
    { name: 'Supabase', color: 'bg-nb-white', icon: '' },
  ];

  // Triple to guarantee seamless infinite loop
  const duplicatedTechs = [...techs, ...techs, ...techs];

  return (
    <div className="w-full overflow-hidden bg-black py-8 border-y-4 border-black">
      <motion.div
        className="flex items-center gap-10"
        style={{ width: 'max-content' }}
        animate={{ x: [0, '-33.33%'] }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 28,
          ease: 'linear',
        }}
      >
        {duplicatedTechs.map((tech, index) => (
          <div
            key={index}
            className={`flex-shrink-0 inline-flex items-center gap-3 px-8 py-3 ${tech.color} border-4 border-black font-black text-2xl uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}
          >
            <img
              src={tech.icon}
              alt={tech.name}
              className="w-8 h-8 object-contain"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            {tech.name}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechMarquee;
