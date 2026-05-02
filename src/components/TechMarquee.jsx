import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Server, 
  Layers, 
  Cpu, 
  Globe, 
  Cloud, 
  Zap,
  Box,
  Terminal,
  Settings,
  Container
} from 'lucide-react';

const TechMarquee = () => {
  const techs = [
    { name: 'Flask', color: 'bg-nb-yellow', icon: <Server size={24} /> },
    { name: 'React', color: 'bg-nb-cyan', icon: <Layers size={24} /> },
    { name: 'Next.js', color: 'bg-nb-white', icon: <Zap size={24} /> },
    { name: 'Redis', color: 'bg-nb-pink', icon: <Database size={24} /> },
    { name: 'n8n', color: 'bg-nb-yellow', icon: <Settings size={24} /> },
    { name: 'Openclaw', color: 'bg-nb-cyan', icon: <Terminal size={24} /> },
    { name: 'Laravel', color: 'bg-nb-white', icon: <Box size={24} /> },
    { name: 'Codeigniter', color: 'bg-nb-pink', icon: <Cpu size={24} /> },
    { name: 'MySQL', color: 'bg-nb-yellow', icon: <Database size={24} /> },
    { name: 'SQL Server', color: 'bg-nb-cyan', icon: <Server size={24} /> },
    { name: 'Supabase', color: 'bg-nb-white', icon: <Cloud size={24} /> },
  ];

  // Duplicate list to create a seamless loop
  const duplicatedTechs = [...techs, ...techs, ...techs];

  return (
    <div className="relative w-full overflow-hidden bg-black py-8 border-y-4 border-black">
      <motion.div
        className="flex whitespace-nowrap gap-10 items-center"
        animate={{
          x: [0, -1500],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
      >
        {duplicatedTechs.map((tech, index) => (
          <div
            key={index}
            className={`inline-flex items-center gap-3 px-8 py-3 ${tech.color} border-4 border-black font-black text-2xl uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}
          >
            {tech.icon}
            {tech.name}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechMarquee;
