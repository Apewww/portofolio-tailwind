import React from "react";
import { motion } from "framer-motion";

const projects = [
    {
        title: "Natacell Portal",
        description: "Portal etalase online toko ATK, pulsa/PPOB, jasa fotocopy & service komputer, dilengkapi bank soal SD-SMA untuk menarik trafik organik dari Google.",
        image: "/assets/img/natacellportal.png",
        url: "https://natacell.my.id",
        github: "https://github.com/Apewww/natacell-portal",
        tags: ["Laravel", "Filament", "TailwindCSS", "SEO"],
        demo: true,
    },
    {
        title: "AI Gateway",
        description: "Gateway AI berbasis web.",
        image: "/assets/img/aigateway.png",
        url: "https://chat.raflylabs.com/",
        github: "https://github.com/Apewww/AI-Assistant-Gateway",
        tags: ["NextJS", "FastAPI", "Uvicorn", "LLM", "Openrouter"],
        demo: true,
    },
    {
        title: "Syncra",
        description: "Web streaming audio.",
        image: "/assets/img/syncra.png",
        url: "https://syncra.raflylabs.com/",
        github: "https://github.com/Apewww/-",
        tags: ["React", "FastAPI", "YT-DLP"],
        demo: true,
    },
    {
        title: "Natahost",
        description: "Web Penjualan Hosting dan Domain dengan Payment Gateway Terintegrasi.",
        image: "/assets/img/natahost.png",
        url: "https://natahost.raflylabs.com/",
        github: "https://github.com/Apewww/natahosts",
        tags: ["React", "Laravel", "Payment Gateway"],
        demo: false,
    },
    {
        title: "MyFinance Note",
        description: "Sistem keuangan pribadi yang fokus pada pencatatan data andal dengan konkurensi tinggi.",
        image: "/assets/img/myfinance_note.png",
        url: "https://myfinance-note.vercel.app/",
        github: "https://github.com/Apewww/myfinance-note",
        tags: ["React", "Supabase"],
        demo: true,
    },
    {
        title: "CuacaKita",
        description: "Implementasi meteorologi menggunakan integrasi API modern dan framework Flask.",
        image: "/assets/img/cuacakita.png",
        url: "https://cuacakita.raflylabs.com/",
        github: "https://github.com/Apewww/cuacakita",
        tags: ["Flask", "PWA"],
        demo: true,
    },
    {
        title: "Asset Management",
        description: "Sistem manajemen aset perusahaan yang menekankan efisiensi dan integritas struktural.",
        image: "/assets/img/asset_management.png",
        url: "https://github.com/Apewww/asset-management",
        github: "https://github.com/Apewww/asset-management",
        tags: ["React", "Flask"],
        demo: false,
    },
    {
        title: "Algorithm SAW",
        description: "Implementasi pendukung keputusan yang dioptimalkan menggunakan logika matematika terstruktur.",
        image: "/assets/img/project_1.png",
        url: "https://github.com/Apewww/saw-calculation",
        github: "https://github.com/Apewww/saw-calculation",
        tags: ["Python", "Logic"],
        demo: false,
    }
];

const ProjectItem = ({ project, index }) => (
    <motion.div
        className="nb-card p-0 overflow-hidden bg-white group"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
    >
        <div className="relative aspect-video overflow-hidden border-b-2 border-black bg-black">
            <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                onError={(e) => (e.target.style.display = 'none')}
            />
            <div className="absolute top-2 left-2 flex gap-1">
                {project.tags.map((tag, i) => (
                    <span key={i} className="bg-nb-yellow text-black text-[8px] font-black uppercase px-1 border-2 border-black">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
        <div className="p-4">
            <h3 className="text-lg font-black uppercase mb-1 truncate">{project.title}</h3>
            <p className="text-[10px] font-bold mb-4 line-clamp-2 h-8 leading-tight">{project.description}</p>
            <div className="flex gap-2">
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="nb-button-primary py-1 px-4 text-[8px] flex-1 text-center">Demo</a>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="nb-button bg-nb-lime py-1 px-2"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg></a>
            </div>
        </div>
    </motion.div>
);

export default function Portofolio() {
    return (
        <div id="portofolio" className="mt-48">
            <div className="flex flex-col items-center justify-center gap-4 mb-12 sm:mb-16 md:mb-20">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase flex items-center gap-4">
                    Karya Terpilih <span className="text-4xl text-nb-cyan">✴?</span>
                </h2>
                <p className="text-sm font-black uppercase tracking-[0.3em] text-nb-pink">Standar Industri • Sistem Skalabel</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <ProjectItem key={index} project={project} index={index} />
                ))}
            </div>
        </div>
    );
}
