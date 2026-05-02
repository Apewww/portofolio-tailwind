import React from 'react';
import { motion } from 'framer-motion';

const TechMarquee = () => {
  const techs = [
    { name: 'Flask', color: 'bg-nb-yellow' },
    { name: 'React', color: 'bg-nb-cyan' },
    { name: 'Next.js', color: 'bg-nb-white' },
    { name: 'Redis', color: 'bg-nb-pink' },
    { name: 'n8n', color: 'bg-nb-yellow' },
    { name: 'Openclaw', color: 'bg-nb-cyan' },
    { name: 'Laravel', color: 'bg-nb-white' },
    { name: 'Codeigniter', color: 'bg-nb-pink' },
    { name: 'MySQL', color: 'bg-nb-yellow' },
    { name: 'SQL Server', color: 'bg-nb-cyan' },
    { name: 'Supabase', color: 'bg-nb-white' },
  ];

  // Duplicate list to create a seamless loop
  const duplicatedTechs = [...techs, ...techs, ...techs];

  return (
    <div className="relative w-full overflow-hidden bg-black py-6 border-y-4 border-black">
      <motion.div
        className="flex whitespace-nowrap gap-8 items-center"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {duplicatedTechs.map((tech, index) => (
          <div
            key={index}
            className={`inline-flex items-center gap-2 px-6 py-2 ${tech.color} border-2 border-black font-black text-xl uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
          >
            <span>✴?</span>
            {tech.name}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechMarquee;
