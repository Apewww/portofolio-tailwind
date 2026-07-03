import React from 'react';
import { motion } from 'framer-motion';

const techs = [
  { name: 'Python', color: 'bg-nb-yellow', icon: 'python' },
  { name: 'JavaScript', color: 'bg-nb-cyan', icon: 'javascript' },
  { name: 'Java', color: 'bg-nb-white', icon: 'openjdk' },
  { name: 'C#', color: 'bg-nb-pink', icon: 'csharp' },
  { name: 'FastAPI', color: 'bg-nb-cyan', icon: 'fastapi' },
  { name: 'Flask', color: 'bg-nb-white', icon: 'flask' },
  { name: 'React', color: 'bg-nb-pink', icon: 'react' },
  { name: 'Next.js', color: 'bg-nb-yellow', icon: 'nextdotjs' },
  { name: 'Laravel', color: 'bg-nb-pink', icon: 'laravel' },
  { name: 'Node.js', color: 'bg-nb-cyan', icon: 'nodedotjs' },
  { name: 'PostgreSQL', color: 'bg-nb-cyan', icon: 'postgresql' },
  { name: 'MySQL', color: 'bg-nb-yellow', icon: 'mysql' },
  { name: 'Docker', color: 'bg-nb-yellow', icon: 'docker' },
  { name: 'Supabase', color: 'bg-nb-pink', icon: 'supabase' },
];

const Pill = ({ name, color, icon }) => (
  <div
    className={`flex-shrink-0 inline-flex items-center gap-3 px-6 py-3 ${color} border-4 border-black font-black text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all`}
  >
    <img
      src={`https://cdn.simpleicons.org/${icon}/000000`}
      alt={name}
      className="w-6 h-6 object-contain"
      onError={(e) => { e.target.style.display = 'none'; }}
    />
    {name}
  </div>
);

const TechMarquee = () => {
  return (
    <div className="w-full overflow-hidden bg-white py-10 border-y-4 border-black">
      <motion.div
        className="flex items-center gap-6"
        style={{ width: 'max-content' }}
        animate={{ x: [0, '-50%'] }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 35,
          ease: 'linear',
        }}
      >
        {[...techs, ...techs].map((tech, index) => (
          <Pill key={index} {...tech} />
        ))}
      </motion.div>
    </div>
  );
};

export default TechMarquee;
