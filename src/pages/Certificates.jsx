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

const CertBadge = ({ cert, index }) => (
    <motion.div
        className="nb-card p-6 bg-white flex flex-col md:flex-row gap-8 items-center group"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
    >
        <div className="relative w-full md:w-1/3 aspect-[16/10] overflow-hidden border-2 border-black bg-nb-yellow flex-shrink-0">
            <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML += `<div class="flex items-center justify-center h-full font-black text-2xl uppercase p-4 text-center">${cert.issuer.split(' ')[0]}</div>`;
                }}
            />
        </div>
        <div className="flex-1 text-center md:text-left">
            <span className="text-xs font-black uppercase bg-nb-cyan border-2 border-black px-2 py-1 mb-3 inline-block shadow-nb">{cert.category}</span>
            <h3 className="text-2xl font-black uppercase mb-2 leading-tight">{cert.title}</h3>
            <p className="text-nb-pink font-black uppercase tracking-widest text-sm mb-6">{cert.issuer}</p>
            <a href={cert.link} target="_blank" rel="noopener noreferrer" className="nb-button-primary py-2 px-8 text-xs inline-block">Verify Certificate</a>
        </div>
    </motion.div>
);

export default function Certificates() {
    return (
        <div id="certificates" className="mt-48">
            <div className="flex flex-col items-center justify-center gap-4 mb-20">
                <h2 className="text-5xl md:text-6xl font-black uppercase flex items-center gap-4">
                    Certifications <span className="text-4xl text-nb-yellow">✴?</span>
                </h2>
                <div className="flex gap-4">
                    <div className="w-4 h-4 bg-nb-yellow border-2 border-black rotate-12" />
                    <div className="w-4 h-4 bg-nb-pink border-2 border-black -rotate-12" />
                    <div className="w-4 h-4 bg-nb-cyan border-2 border-black rotate-45" />
                </div>
            </div>

            <div className="flex flex-col gap-8">
                {certificates.map((cert, index) => (
                    <CertBadge key={index} cert={cert} index={index} />
                ))}
            </div>
        </div>
    );
}
