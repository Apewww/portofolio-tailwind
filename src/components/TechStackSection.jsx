import React from 'react';
import { motion } from 'framer-motion';

const TECH_CATEGORIES = [
  {
    id: 'backend',
    title: 'Backend Systems',
    description: 'Arsitektur API berkinerja tinggi, asynchronous event handling, mikroservis, dan automasi proses bisnis.',
    badgeColor: 'bg-nb-yellow',
    accentColor: 'border-nb-yellow',
    skills: [
      { name: 'Python', icon: 'python' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'Flask', icon: 'flask' },
      { name: 'Node.js', icon: 'nodedotjs' },
      { name: 'Express', icon: 'express' },
      { name: 'Laravel', icon: 'laravel' },
      { name: 'REST API', icon: 'postman' },
    ]
  },
  {
    id: 'database',
    title: 'Database & Storage',
    description: 'Skema data terstruktur, optimasi query relasional, in-memory caching berkecepatan tinggi, dan semantic vector store.',
    badgeColor: 'bg-nb-cyan',
    accentColor: 'border-nb-cyan',
    skills: [
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'Supabase', icon: 'supabase' },
      { name: 'Redis', icon: 'redis' },
      { name: 'ChromaDB', icon: 'databricks' },
    ]
  },
  {
    id: 'devops',
    title: 'DevOps & Infrastructure',
    description: 'Containerization aplikasi, virtualisasi server lokal (Proxmox homelab), reverse proxy Nginx, dan proteksi DNS.',
    badgeColor: 'bg-nb-pink',
    accentColor: 'border-nb-pink',
    skills: [
      { name: 'Docker', icon: 'docker' },
      { name: 'Proxmox VE', icon: 'proxmox' },
      { name: 'Ubuntu Linux', icon: 'ubuntu' },
      { name: 'Nginx', icon: 'nginx' },
      { name: 'Cloudflare', icon: 'cloudflare' },
      { name: 'Bash / Shell', icon: 'gnubash' },
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend & Interface',
    description: 'Antarmuka reaktif, komponen modular, server-side rendering, dan desain sistem Neobrutalism yang bersih.',
    badgeColor: 'bg-nb-yellow',
    accentColor: 'border-nb-yellow',
    skills: [
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'nextdotjs' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'HTML5 & CSS3', icon: 'html5' },
    ]
  },
  {
    id: 'tools',
    title: 'Tools & Automation',
    description: 'Pipeline CI/CD, headless browser scraping, end-to-end API testing, dan manipulasi multimedia skala besar.',
    badgeColor: 'bg-white',
    accentColor: 'border-black',
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub Actions', icon: 'githubactions' },
      { name: 'Playwright', icon: 'playwright' },
      { name: 'Postman', icon: 'postman' },
      { name: 'yt-dlp', icon: 'youtube' },
      { name: 'FFmpeg', icon: 'ffmpeg' },
    ]
  }
];

export default function TechStackSection() {
  return (
    <div id="tech-stack" className="mt-16 sm:mt-24 md:mt-28 w-full">
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center gap-3 mb-10 sm:mb-14 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
          Tech Stack & Peralatan
        </h2>
        <div className="h-1.5 w-16 bg-nb-yellow border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"></div>
        <p className="text-xs sm:text-sm font-bold text-slate-700 max-w-xl mt-1">
          Kategori teknologi dan perkakas terverifikasi yang saya implementasikan dalam rekayasa backend, pipeline automasi, dan deployment.
        </p>
      </div>

      {/* Categorized Bento Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {TECH_CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.id}
            className={`nb-card p-6 bg-white flex flex-col justify-between ${
              idx === 0 || idx === 3 ? 'lg:col-span-1' : ''
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className={`text-[10px] sm:text-xs font-black uppercase ${cat.badgeColor} border-2 border-black px-2.5 py-1 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                  {cat.skills.length} Teknologi
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                  Cat. 0{idx + 1}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black mb-2">
                {cat.title}
              </h3>

              <p className="text-xs text-slate-600 font-medium leading-relaxed mb-6">
                {cat.description}
              </p>
            </div>

            {/* Tech Badges / Chips */}
            <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-black/10">
              {cat.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-nb-cream hover:bg-nb-yellow border-2 border-black rounded-lg px-2.5 py-1.5 flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default"
                >
                  <img
                    src={`https://cdn.simpleicons.org/${skill.icon}/000000`}
                    alt={skill.name}
                    className="w-3.5 h-3.5 object-contain flex-shrink-0"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <span className="text-xs font-extrabold uppercase tracking-tight text-black leading-none">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
