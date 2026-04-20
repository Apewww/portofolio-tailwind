import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "MyFinance Note",
    description: "Personal finance system focused on reliable high-concurrency data tracking.",
    image: "/assets/img/myfinance_note.png",
    url: "https://myfinance-note.vercel.app/",
    github: "https://github.com/Apewww/myfinance-note",
    tags: ["React", "Supabase"],
    demo: true,
  },
  {
    title: "CuacaKita",
    description: "Meteorological implementation using modern API integrations and Flask framework.",
    image: "/assets/img/cuacakita.png",
    url: "https://cuacakita.raflylabs.com/",
    github: "https://github.com/Apewww/cuacakita",
    tags: ["Flask", "PWA"],
    demo: true,
  },
  {
    title: "Asset Management",
    description: "Enterprise project management system emphasizing efficiency and structural integrity.",
    image: "/assets/img/asset_management.png",
    url: "https://github.com/Apewww/asset-management",
    github: "https://github.com/Apewww/asset-management",
    tags: ["PHP", "CI4"],
    demo: false,
  },
  {
    title: "Algorithm SAW",
    description: "Optimized decision support implementation using structural mathematical logic.",
    image: "/assets/img/project_1.png",
    url: "https://github.com/Apewww/saw-calculation",
    github: "https://github.com/Apewww/saw-calculation",
    tags: ["Python", "Logic"],
    demo: false,
  }
];

const ProjectCard = ({ project, index }) => (
  <motion.div
    className="solid-card rounded-lg overflow-hidden group"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="relative aspect-video overflow-hidden bg-dev-navy">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-700"
      />
      <div className="absolute top-4 left-4 flex gap-2">
        {project.tags.map((tag, i) => (
          <span key={i} className="bg-primary text-white text-[10px] font-black uppercase px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>

    <div className="p-8">
      <h3 className="text-2xl font-black uppercase tracking-tight mb-3 group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      <p className="text-sm opacity-60 font-medium leading-relaxed mb-8 h-10 line-clamp-2">
        {project.description}
      </p>

      <div className="flex items-center justify-between">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-black uppercase tracking-[0.2em] text-primary hover:underline underline-offset-8"
        >
          {project.demo ? "View Demo" : "Learn More"}
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline btn-sm btn-square rounded-md hover:btn-primary"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
        </a>
      </div>
    </div>
  </motion.div>
);

export default function Portofolio() {
  return (
    <section id="portofolio" className="py-32 bg-base-100 relative">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Selection</span>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">
              Project <span className="text-primary">Preview</span>.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
