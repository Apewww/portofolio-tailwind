import React, { useState, useMemo } from "react";
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
        description: "Gateway AI berbasis web. Gateway terpusat untuk chatbot LLM via OpenRouter.",
        image: "/assets/img/aigateway.png",
        url: "https://chat.raflylabs.com/",
        github: "https://github.com/Apewww/AI-Assistant-Gateway",
        tags: ["NextJS", "FastAPI", "Uvicorn", "LLM", "Openrouter", "Python", "AI"],
        demo: true,
    },
    {
        title: "Syncra",
        description: "Platform streaming audio web dengan integrasi AI chatbot untuk kontrol pemutar musik.",
        image: "/assets/img/syncra.png",
        url: "https://syncra.raflylabs.com/",
        github: "https://github.com/Apewww/-",
        tags: ["React", "FastAPI", "YT-DLP", "Python"],
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
        tags: ["Flask", "PWA", "Python"],
        demo: true,
    },
    {
        title: "Asset Management",
        description: "Sistem manajemen aset perusahaan yang menekankan efisiensi dan integritas struktural.",
        image: "/assets/img/asset_management.png",
        url: "https://github.com/Apewww/asset-management",
        github: "https://github.com/Apewww/asset-management",
        tags: ["React", "Flask", "Python"],
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

const allTags = ["Semua", "Python", "FastAPI", "React", "Laravel", "AI", "Flask", "PWA", "Supabase"];

const ProjectItem = ({ project, index }) => {
    if (!project) return null;
    const tags = Array.isArray(project.tags) ? project.tags : [];

    return (
        <motion.div
            className="nb-card p-0 overflow-hidden bg-white group hover:border-nb-pink transition-colors"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
        >
            <div className="relative aspect-video overflow-hidden border-b-2 border-black bg-black">
                <img
                    src={project.image || "/assets/img/project_1.png"}
                    alt={project.title || "Project"}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    onError={(e) => (e.target.style.display = 'none')}
                />
                <div className="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[90%]">
                    {tags.map((tag, i) => (
                        <span key={i} className="bg-nb-yellow text-black text-[8px] font-black uppercase px-1.5 py-0.5 border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-black uppercase mb-1 truncate">{project.title || "Untitled Project"}</h3>
                <p className="text-[11px] font-bold mb-4 line-clamp-2 h-9 leading-snug opacity-80">{project.description || ""}</p>
                <div className="flex gap-2">
                    <a href={project.url || "#"} target="_blank" rel="noopener noreferrer" className="nb-button-primary py-1.5 px-4 text-[9px] flex-1 text-center font-black">Demo Web</a>
                    <a href={project.github || "#"} target="_blank" rel="noopener noreferrer" className="nb-button bg-nb-lime py-1.5 px-3 flex items-center justify-center" title="GitHub Code"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg></a>
                </div>
            </div>
        </motion.div>
    );
};

export default function Portofolio() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState("Semua");

    const filteredProjects = useMemo(() => {
        const query = String(searchTerm || "").toLowerCase().trim();
        const selected = String(selectedTag || "Semua").toLowerCase().trim();

        return (projects || []).filter((project) => {
            if (!project) return false;

            const title = String(project.title || "").toLowerCase();
            const description = String(project.description || "").toLowerCase();
            const tags = Array.isArray(project.tags) ? project.tags : [];

            const matchesSearch =
                !query ||
                title.includes(query) ||
                description.includes(query) ||
                tags.some((t) => String(t || "").toLowerCase().includes(query));

            const matchesTag =
                selected === "semua" ||
                tags.some((t) => String(t || "").toLowerCase() === selected);

            return matchesSearch && matchesTag;
        });
    }, [searchTerm, selectedTag]);

    return (
        <div id="portofolio" className="mt-40">
            <div className="flex flex-col items-center justify-center gap-3 mb-10 text-center">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase flex items-center gap-3">
                    Karya Terpilih <span className="text-3xl sm:text-4xl text-nb-cyan">✴</span>
                </h2>
                <p className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-nb-pink">Standar Industri • Sistem Skalabel</p>
            </div>

            {/* Filter & Search Bar */}
            <div className="max-w-3xl mx-auto mb-10 flex flex-col gap-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target?.value ?? "")}
                    placeholder="🔍 Cari judul atau teknologi proyek..."
                    className="w-full px-4 py-3 border-3 border-black rounded-2xl text-xs sm:text-sm font-bold bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-nb-cream transition-all"
                />

                <div className="flex flex-wrap items-center justify-center gap-2">
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-3 py-1 text-xs font-black uppercase tracking-wider rounded-xl border-2 border-black transition-all cursor-pointer ${
                                selectedTag === tag
                                    ? 'bg-nb-pink text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[1px] translate-y-[1px]'
                                    : 'bg-white text-black hover:bg-nb-yellow shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {filteredProjects.length === 0 ? (
                <div className="text-center py-12 bg-white border-3 border-black rounded-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-lg mx-auto">
                    <p className="text-sm font-black uppercase">Tidak ada proyek yang cocok dengan filter "{searchTerm || selectedTag}"</p>
                    <button
                        onClick={() => { setSearchTerm(""); setSelectedTag("Semua"); }}
                        className="mt-4 nb-button-primary py-2 px-4 text-xs"
                    >
                        Reset Filter
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {filteredProjects.map((project, index) => (
                        <ProjectItem key={project.title || index} project={project} index={index} />
                    ))}
                </div>
            )}
        </div>
    );
}
