import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "MyFinance Note",
    description: "Aplikasi pencatat keuangan pribadi yang komprehensif dengan dasbor interaktif.",
    image: "/assets/img/myfinance_note.png",
    url: "https://myfinance-note.vercel.app/",
    tags: ["React", "Live Demo"],
    demo: true,
  },
  {
    title: "CuacaKita",
    description: "Aplikasi cuaca yang menampilkan informasi cuaca real-time untuk berbagai lokasi di seluruh dunia.",
    image: "/assets/img/cuacakita.png",
    url: "https://cuacakita.raflylabs.com/",
    tags: ["Flask", "Live Demo"],
    demo: true,
  },
  {
    title: "Asset Management",
    description: "Aplikasi internal perusahaan untuk manajemen aset dan inventaris.",
    image: "/assets/img/asset_management.png",
    url: "https://assetmanagement.example.com",
    tags: ["React", "Node.js"],
    demo: false,
  },
  {
    title: "Saw Calculation",
    description: "Sistem pendukung keputusan menggunakan algoritma SAW teknis.",
    image: "/assets/img/project_1.png",
    url: "https://sawcalculation.example.com",
    tags: ["Algorithm", "React"],
    demo: false,
  },
  {
    title: "Reference Project",
    description: "Tools Dragon Nest",
    image: "/assets/img/reference_project.png",
    url: "https://referenceproject.example.com",
    tags: ["Documentation", "Standards"],
    demo: false,
  }
];

export default function Portofolio() {
  return (
    <section id="portofolio" className="py-24 bg-base-200">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              Project Preview
            </motion.h2>
            <p className="text-lg text-base-content/60 leading-relaxed">
              Kumpulan proyek pilihan yang menunjukkan kemampuan teknis saya dalam membangun solusi digital yang fungsional dan terukur.
            </p>
          </div>
          <div className="hidden md:block w-32 h-1 bg-primary mb-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-base-300 mb-8 border border-base-content/5 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-base-900/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              <div className="flex justify-between items-start gap-4">
                <div className="max-w-md">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-base-content/50 leading-relaxed text-sm mb-6">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-6">
                    {project.demo ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold border-b-2 border-primary pb-1 flex items-center gap-2 group/btn"
                      >
                        Try Demo
                        <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    ) : (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-base-content/30 hover:text-primary transition-colors flex items-center gap-2 group/btn"
                      >
                        View Info
                        <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
