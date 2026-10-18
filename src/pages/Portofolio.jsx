import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "SnatchVid",
    description: "Web tool & CLI local media utility untuk unduh video YouTube, TikTok, dan Instagram secara instan dengan auto-merge DASH ffmpeg & impersonation engine.",
    image: "/assets/img/snatchvid.webp",
    url: "https://snatchvid.raflylabs.com",
    github: "https://github.com/Apewww/SnatchVid",
    tags: ["FastAPI", "Python", "YT-DLP", "CLI"],
    demo: true,
  },
  {
    title: "Scribd Tool",
    description: "Web tool & CLI document extractor untuk bypass proteksi Scribd, render lokal 2x Retina, dan konversi ke searchable PDF & teks.",
    image: "/assets/img/scribdtool.webp",
    url: "https://scribd.raflylabs.com",
    github: "https://github.com/Apewww/scribd-tool",
    tags: ["Flask", "Playwright", "Python", "PyMuPDF", "CLI"],
    demo: true,
  },
  {
    title: "Natacell Portal",
    description: "Portal etalase online toko ATK, pulsa/PPOB, jasa fotocopy & service komputer, dilengkapi bank soal SD-SMA untuk menarik trafik organik dari Google.",
    image: "/assets/img/natacellportal.webp",
    url: "https://natacell.my.id",
    tags: ["Laravel", "Filament", "TailwindCSS", "SEO"],
    demo: true,
  },
  {
    title: "AI Gateway",
    description: "Gateway AI berbasis web. Gateway terpusat untuk chatbot LLM via OpenRouter.",
    image: "/assets/img/aigateway.webp",
    url: "https://chat.raflylabs.com/",
    github: "https://github.com/Apewww/AI-Assistant-Gateway",
    tags: ["NextJS", "FastAPI", "Uvicorn", "LLM", "Openrouter", "Python", "AI"],
    demo: true,
  },
  {
    title: "Syncra",
    description: "Platform streaming audio web dengan integrasi AI chatbot untuk kontrol pemutar musik.",
    image: "/assets/img/syncra.webp",
    url: "https://syncra.raflylabs.com/",
    tags: ["React", "FastAPI", "YT-DLP", "Python"],
    demo: true,
  },
  {
    title: "Natahost",
    description: "Web Penjualan Hosting dan Domain dengan Payment Gateway Terintegrasi.",
    image: "/assets/img/natahost.webp",
    url: "https://natahost.raflylabs.com/",
    tags: ["React", "Laravel", "Payment Gateway"],
    demo: false,
  },
  {
    title: "MyFinance Note",
    description: "Sistem keuangan pribadi yang fokus pada pencatatan data andal dengan konkurensi tinggi.",
    image: "/assets/img/myfinance_note.webp",
    url: "https://myfinance-note.vercel.app/",
    github: "https://github.com/Apewww/myfinance-note",
    tags: ["React", "Supabase"],
    demo: true,
  },
  {
    title: "CuacaKita",
    description: "Implementasi meteorologi menggunakan integrasi API modern dan framework Flask.",
    image: "/assets/img/cuacakita.webp",
    url: "https://cuacakita.raflylabs.com/",
    github: "https://github.com/Apewww/CuacaKita",
    tags: ["Flask", "PWA", "Python"],
    demo: true,
  },
  {
    title: "Asset Management",
    description: "Sistem manajemen aset perusahaan yang menekankan efisiensi dan integritas struktural.",
    image: "/assets/img/asset_management.webp",
    tags: ["React", "Flask", "Python"],
    demo: false,
  },
  {
    title: "Algorithm SAW",
    description: "Implementasi pendukung keputusan yang dioptimalkan menggunakan logika matematika terstruktur.",
    image: "/assets/img/project_1.webp",
    tags: ["Python", "Logic"],
    demo: false,
  }
];

const allTags = ["Semua", "Python", "Playwright", "Flask", "FastAPI", "React", "Laravel", "AI", "PWA", "Supabase", "CLI"];

const ProjectItem = ({ project, index }) => {
  if (!project) return null;
  const tags = Array.isArray(project.tags) ? project.tags : [];

  return (
    <motion.div
      className="nb-card p-0 overflow-hidden bg-white group hover:border-nb-pink transition-colors flex flex-col justify-between"
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <div>
        <div className="relative aspect-[16/10] overflow-hidden border-b-3 border-black bg-slate-900">
          <img
            src={project.image || "/assets/img/project_1.webp"}
            alt={project.title || "Project"}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 max-w-[90%]">
            {tags.map((tag, i) => (
              <span key={i} className="bg-nb-yellow text-black text-[10px] font-black uppercase px-2 py-0.5 border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-black uppercase mb-2 tracking-tight text-black">
            {project.title || "Untitled Project"}
          </h3>
          <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed mb-6">
            {project.description || ""}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 flex items-center gap-3">
        {project.demo && project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="nb-button-primary h-11 px-4 text-xs font-extrabold uppercase flex-1 text-center inline-flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>Live Demo</span>
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`nb-button bg-white hover:bg-nb-yellow h-11 px-4 text-xs font-extrabold uppercase inline-flex items-center justify-center gap-2 text-center ${
              project.demo && project.url ? 'flex-1' : 'w-full'
            }`}
            title="Lihat Source Code GitHub"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            <span>GitHub</span>
          </a>
        )}
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
    <div className="w-full">
      <div className="flex flex-col items-center justify-center gap-3 mb-10 sm:mb-14 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
          Karya & Proyek Terpilih
        </h2>
        <div className="h-1.5 w-16 bg-nb-cyan border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"></div>
        <p className="text-xs sm:text-sm font-bold text-slate-700 max-w-lg mt-1">
          Aplikasi web produksi, automasi CLI, dan arsitektur sistem backend nyata.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="max-w-3xl mx-auto mb-10 flex flex-col gap-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black">
            <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target?.value ?? "")}
            placeholder="Cari judul proyek atau teknologi..."
            className="w-full pl-11 pr-4 py-3 border-3 border-black rounded-2xl text-xs sm:text-sm font-bold bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-nb-cream transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded-xl border-2 border-black transition-all cursor-pointer ${selectedTag === tag
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
        <div className="text-center py-12 bg-white border-3 border-black rounded-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-lg mx-auto p-6">
          <p className="text-sm font-black uppercase">Tidak ada proyek yang cocok dengan filter "{searchTerm || selectedTag}"</p>
          <button
            onClick={() => { setSearchTerm(""); setSelectedTag("Semua"); }}
            className="mt-4 nb-button-primary py-2 px-5 text-xs font-black"
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
