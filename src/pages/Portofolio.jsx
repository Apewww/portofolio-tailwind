import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    title: "MyFinance Note",
    description: "Personal finance management application with spending tracking and interactive charts.",
    image: "/assets/img/myfinance_note.png",
    url: "https://myfinance-note.vercel.app/",
    tags: ["React", "Tailwind", "Vercel"],
    demo: true
  },
  {
    title: "Asset Management",
    description: "Comprehensive system for tracking and managing corporate assets and inventory.",
    image: "/assets/img/asset_management.png",
    url: "https://assetmanagement.example.com",
    tags: ["React", "Node.js", "Dashboard"],
    demo: false
  },
  {
    title: "Saw Calculation",
    description: "Decision support system using Simple Additive Weighting method for optimized calculations.",
    image: "/assets/img/project_1.png",
    url: "https://sawcalculation.example.com",
    tags: ["Algorithm", "React", "Tools"],
    demo: false
  },
  {
    title: "Reference Project",
    description: "A showcase of technical implementations and best practices in modern web development.",
    image: "/assets/img/reference_project.png",
    url: "https://referenceproject.example.com",
    tags: ["Showcase", "UI/UX", "Modern"],
    demo: false
  }
];

export default function Portofolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: false });

  return (
    <section id="portofolio" className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 1 }}
          ref={ref}
        >
          Project Preview
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group relative bg-base-100 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-base-300 transform hover:-translate-y-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-base-content/70 mb-6 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono text-base-content/40">
                    {project.url.replace("https://", "")}
                  </span>
                  {project.demo ? (
                    <a 
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm rounded-xl px-6"
                    >
                      Try Demo
                    </a>
                  ) : (
                    <a 
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost btn-sm btn-circle"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
