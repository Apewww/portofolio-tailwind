import React from "react";
import { motion } from 'framer-motion';

const TechBadge = ({ label, icon }) => (
    <div className="bg-dev-navy border border-dev-border px-6 py-4 rounded-md hover:border-primary hover:bg-primary/5 transition-all group flex items-center justify-between">
        <div className="flex items-center gap-3">
            {icon && (
                <img
                    src={`https://cdn.simpleicons.org/${icon}/3B82F6`}
                    className="w-4 h-4 grayscale group-hover:grayscale-0 transition-all opacity-40 group-hover:opacity-100"
                    alt={label}
                />
            )}
            <span className="font-bold text-xs tracking-tight opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all uppercase">
                {label}
            </span>
        </div>
        <div className="w-1.5 h-1.5 bg-primary/20 group-hover:bg-primary rounded-full transition-all" />
    </div>
);

const SkillCategory = ({ title, skills, description }) => (
    <motion.div
        className="mb-16 last:mb-0"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
    >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-dev-border pb-6">
            <div className="max-w-xl">
                <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-2">{title}</h3>
                <p className="text-sm opacity-50 font-medium leading-relaxed">{description}</p>
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 text-primary">
                Competency / {skills.length} Techs
            </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, i) => (
                <TechBadge key={i} label={skill.name} icon={skill.icon} />
            ))}
        </div>
    </motion.div>
);

export default function Skills() {
    const categories = [
        {
            title: "Backend Core",
            description: "Advanced server-side logic, performance optimization, and specialized modern tools.",
            skills: [
                { name: "Python", icon: "python" },
                { name: "Flask", icon: "flask" },
                { name: "FastAPI", icon: "fastapi" },
                { name: "PHP", icon: "php" },
                { name: "CodeIgniter", icon: "codeigniter" },
                { name: "Node.js", icon: "nodedotjs" },
                { name: "OpenClaw", icon: "openai" } // Placeholder icon if exact not found
            ]
        },
        {
            title: "Data Persistence",
            description: "Systems for reliable data storage, retrieval, and high-concurrency management.",
            skills: [
                { name: "PostgreSQL", icon: "postgresql" },
                { name: "Supabase", icon: "supabase" },
                { name: "MySQL", icon: "mysql" },
                { name: "SQLServer", icon: "microsoftsqlserver" },
                { name: "Redis", icon: "redis" },
                { name: "Firebase", icon: "firebase" }
            ]
        },
        {
            title: "AI & Specialized",
            description: "Local large language model implementations and intelligent technical solutions.",
            skills: [
                { name: "Llama", icon: "meta" },
                { name: "Ollama", icon: "ollama" },
                { name: "Prompting", icon: "openai" },
            ]
        },
        {
            title: "Infrastructure & DevOps",
            description: "Environments for hosting, virtualization, networking, and automated deployment.",
            skills: [
                { name: "Vercel", icon: "vercel" },
                { name: "Cloudflare", icon: "cloudflare" },
                { name: "Proxmox", icon: "proxmox" },
                { name: "Mikrotik", icon: "mikrotik" },
                { name: "Docker", icon: "docker" },
                { name: "Nginx", icon: "nginx" },
                { name: "Linux", icon: "linux" },
                { name: "Git", icon: "git" }
            ]
        }
    ];

    return (
        <section id="skills" className="py-32 bg-base-100 relative">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-3xl">
                        <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Proven Stack</span>
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">
                            Engineering <span className="text-primary">Skills</span>.
                        </h2>
                    </div>
                </div>

                <div>
                    {categories.map((cat, index) => (
                        <SkillCategory key={index} {...cat} />
                    ))}
                </div>
            </div>
        </section>
    );
}
