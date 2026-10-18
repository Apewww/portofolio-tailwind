import React from "react";
import { motion } from "framer-motion";

const certificates = [
  {
    title: "HTML / CSS in Depth",
    issuer: "Meta / Coursera",
    link: "https://coursera.org/verify/UTJ9Y0Q04F0E",
    category: "Pemrograman",
    image: "/assets/img/Certif_HTML and CSS.webp"
  },
  {
    title: "Introduction Frontend Systems",
    issuer: "Meta / Coursera",
    link: "https://coursera.org/verify/R3HXJABQVHH2",
    category: "Pemrograman",
    image: "/assets/img/Certif_Intro Frontend Development.webp"
  },
  {
    title: "Javascript Core Logic",
    issuer: "Meta / Coursera",
    link: "https://coursera.org/verify/Z654TDKKZJK2",
    category: "Pemrograman",
    image: "/assets/img/Certif_Programming Javascript.webp"
  },
  {
    title: "Python Engineering",
    issuer: "Meta / Coursera",
    link: "https://coursera.org/verify/6IIWE8U7861R",
    category: "Pemrograman",
    image: "/assets/img/Certif_Programming Python.webp"
  },
  {
    title: "Version Control Workflow",
    issuer: "Meta / Coursera",
    link: "https://coursera.org/verify/PI22FH6PPXS7",
    category: "Operasional",
    image: "/assets/img/Certif_Version Control.webp"
  }
];

const CertBadge = ({ cert, index }) => {
  const [imageError, setImageError] = React.useState(false);

  return (
    <motion.div
      className="nb-card p-0 overflow-hidden bg-white group flex flex-col justify-between"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <div>
        <div className="relative aspect-[16/10] overflow-hidden border-b-3 border-black bg-nb-yellow flex items-center justify-center">
          {!imageError ? (
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <span className="font-black text-2xl uppercase tracking-tighter text-black">
                {cert.issuer.split(' ')[0]}
              </span>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-800">
                Verified Credential
              </span>
            </div>
          )}
          <div className="absolute top-2.5 left-2.5">
            <span className="text-[10px] font-black uppercase bg-nb-cyan border-2 border-black px-2 py-0.5 inline-block shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              {cert.category}
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500 uppercase mb-1">
            <span>Meta</span>
            <span>•</span>
            <span>Coursera</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black uppercase mb-1 text-black leading-tight">
            {cert.title}
          </h3>
          <p className="text-nb-pink font-black uppercase tracking-wider text-xs mb-4">
            {cert.issuer}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0">
        <a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full nb-button-primary py-2.5 px-4 text-xs font-black uppercase inline-flex items-center justify-center gap-2 text-center"
        >
          <span>Verifikasi Kredensial</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
};

export default function Certificates() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center gap-3 mb-10 sm:mb-14 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
          Sertifikasi Profesional
        </h2>
        <div className="h-1.5 w-16 bg-nb-yellow border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"></div>
        <p className="text-xs sm:text-sm font-bold text-slate-700 max-w-lg mt-1">
          Kredensial rekayasa perangkat lunak dan version control terverifikasi dari Meta & Coursera.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {certificates.map((cert, index) => (
          <CertBadge key={index} cert={cert} index={index} />
        ))}
      </div>
    </div>
  );
}
