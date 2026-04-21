import React from "react";
import { motion } from "framer-motion";

const certificates = [
  {
    title: "HTML / CSS in Depth",
    issuer: "Meta / Coursera",
    link: "https://coursera.org/verify/UTJ9Y0Q04F0E",
    category: "Development",
    image: "/assets/img/Certif_HTML and CSS.png"
  },
  {
    title: "Introduction Frontend Systems",
    issuer: "Meta / Coursera",
    link: "https://coursera.org/verify/R3HXJABQVHH2",
    category: "Development",
    image: "/assets/img/Certif_Intro Frontend Development.png"
  },
  {
    title: "Javascript Core Logic",
    issuer: "Meta / Coursera",
    link: "https://coursera.org/verify/Z654TDKKZJK2",
    category: "Programming",
    image: "/assets/img/Certif_Programming Javascript.png"
  },
  {
    title: "Python Engineering",
    issuer: "Meta / Coursera",
    link: "https://coursera.org/verify/6IIWE8U7861R",
    category: "Programming",
    image: "/assets/img/Certif_Programming Python.png"
  },
  {
    title: "Version Control Workflow",
    issuer: "Meta / Coursera",
    link: "https://coursera.org/verify/PI22FH6PPXS7",
    category: "Operations",
    image: "/assets/img/Certif_Version Control.png"
  }
];

const CertificateItem = ({ cert, index }) => (
  <motion.div
    className="py-12 border-b border-dev-border flex flex-col lg:flex-row items-center gap-12 group last:border-0"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
  >
    {/* Certificate Thumbnail */}
    <div className="lg:w-1/3 relative overflow-hidden bg-dev-navy border-2 border-dev-border group-hover:border-primary transition-all duration-500 shadow-[8px_8px_0px_#0F172A]">
      <img
        src={cert.image}
        alt={cert.title}
        className="w-full aspect-[16/10] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100 scale-105 group-hover:scale-100"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.parentNode.classList.add('flex', 'items-center', 'justify-center');
          e.target.parentNode.innerHTML += `<span class="font-black text-primary/20 text-4xl italic">${cert.issuer.split(' ')[0]}</span>`;
        }}
      />
      <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
    </div>

    {/* Info */}
    <div className="lg:w-1/3 text-center lg:text-left">
      <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-3 block">
        {cert.category}
      </div>
      <h3 className="text-3xl font-black uppercase tracking-tight mb-4 group-hover:text-primary transition-colors leading-tight">
        {cert.title}
      </h3>
      <div className="flex items-center justify-center lg:justify-start gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
        <div className="w-4 h-px bg-white" />
        <span className="font-bold text-xs uppercase tracking-widest">{cert.issuer}</span>
      </div>
    </div>

    {/* Action */}
    <div className="lg:w-1/3 flex lg:justify-end w-full">
      <a
        href={cert.link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full lg:w-auto bg-transparent border-2 border-dev-border text-white hover:bg-primary hover:border-primary px-8 py-4 font-black uppercase tracking-[0.2em] text-[10px] transition-all text-center shadow-[4px_4px_0px_rgba(255,255,255,0.05)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
      >
        Verify Credential
      </a>
    </div>
  </motion.div>
);

export default function Certificates() {
  return (
    <section id="certificates" className="py-32 bg-base-200/20 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="mb-24">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Proven Expertise</span>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">
            Professional <span className="text-primary">Validation</span>.
          </h2>
        </div>

        <div className="border-t border-dev-border">
          {certificates.map((cert, index) => (
            <CertificateItem key={index} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
