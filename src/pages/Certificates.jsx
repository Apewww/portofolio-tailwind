import React from "react";
import { motion } from "framer-motion";

const CERTIFICATES = [
  {
    id: "python",
    title: "Python Engineering",
    issuer: "Meta / Coursera",
    credentialId: "6IIWE8U7861R",
    link: "https://coursera.org/verify/6IIWE8U7861R",
    category: "Fokus Utama Backend",
    categoryColor: "bg-nb-yellow",
    description: "Penguasaan paradigma pemrograman berorientasi objek, struktur data, penanganan exception, dan manipulasi data terstruktur yang menjadi fondasi layanan backend skalabel.",
    skills: ["Python OOP", "Data Structures", "Algorithmic Logic", "File I/O"],
    image: "/assets/img/Certif_Programming Python.webp",
    featured: true
  },
  {
    id: "git",
    title: "Version Control Workflow",
    issuer: "Meta / Coursera",
    credentialId: "PI22FH6PPXS7",
    link: "https://coursera.org/verify/PI22FH6PPXS7",
    category: "DevOps & Workflow",
    categoryColor: "bg-nb-pink",
    description: "Implementasi version control terstandarisasi mencakup branching models, merge conflict resolution, pull request workflow, dan otomasi kolaborasi repository.",
    skills: ["Git CLI", "GitHub Flow", "Branching", "CI/CD Readiness"],
    image: "/assets/img/Certif_Version Control.webp"
  },
  {
    id: "js",
    title: "Javascript Core Logic",
    issuer: "Meta / Coursera",
    credentialId: "Z654TDKKZJK2",
    link: "https://coursera.org/verify/Z654TDKKZJK2",
    category: "Logika Pemrograman",
    categoryColor: "bg-nb-cyan",
    description: "Pemahaman eksekusi JavaScript tingkat lanjut, asynchronous event loop, closures, prototipe, serta manipulasi data reaktif.",
    skills: ["Async / Await", "ES6+ Standards", "Event Loop", "Scope & Closures"],
    image: "/assets/img/Certif_Programming Javascript.webp"
  },
  {
    id: "frontend",
    title: "Introduction Frontend Systems",
    issuer: "Meta / Coursera",
    credentialId: "R3HXJABQVHH2",
    link: "https://coursera.org/verify/R3HXJABQVHH2",
    category: "Arsitektur Web",
    categoryColor: "bg-nb-yellow",
    description: "Prinsip arsitektur aplikasi berbasis web modern, client-server lifecycle, interaksi RESTful API, dan optimasi performa antarmuka pengguna.",
    skills: ["Client-Server", "API Integration", "Web Lifecycle", "Component Design"],
    image: "/assets/img/Certif_Intro Frontend Development.webp"
  },
  {
    id: "htmlcss",
    title: "HTML / CSS in Depth",
    issuer: "Meta / Coursera",
    credentialId: "UTJ9Y0Q04F0E",
    link: "https://coursera.org/verify/UTJ9Y0Q04F0E",
    category: "Desain & Aksesibilitas",
    categoryColor: "bg-white",
    description: "Teknik tata letak responsif tingkat lanjut menggunakan Grid, Flexbox, semantic HTML5 untuk SEO, serta animasi antarmuka teroptimasi.",
    skills: ["CSS Grid & Flex", "Semantic HTML5", "Responsive UI", "Web Standards"],
    image: "/assets/img/Certif_HTML and CSS.webp"
  }
];

export default function Certificates() {
  const pythonCert = CERTIFICATES[0];
  const gitCert = CERTIFICATES[1];
  const otherCerts = CERTIFICATES.slice(2);

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center gap-3 mb-10 sm:mb-14 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
          Sertifikasi Profesional
        </h2>
        <div className="h-1.5 w-16 bg-nb-yellow border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"></div>
        <p className="text-xs sm:text-sm font-bold text-slate-700 max-w-lg mt-1">
          Kredensial rekayasa perangkat lunak dan version control terverifikasi resmi dari Meta & Coursera.
        </p>
      </div>

      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
        {/* Bento Row 1 - Card 1: Featured Python Engineering (8 cols) */}
        <motion.div
          className="md:col-span-12 lg:col-span-8 nb-card p-6 sm:p-8 bg-white flex flex-col justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Left Content */}
            <div className="flex-1 flex flex-col justify-between h-full">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`text-[10px] sm:text-xs font-black uppercase ${pythonCert.categoryColor} border-2 border-black px-2.5 py-0.5 rounded shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]`}>
                    {pythonCert.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                    {pythonCert.issuer}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black uppercase text-black mb-2 tracking-tight">
                  {pythonCert.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-4">
                  {pythonCert.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {pythonCert.skills.map((skill, i) => (
                    <span key={i} className="text-[10px] font-bold bg-nb-cream border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] text-black">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-mono font-bold uppercase text-slate-500 mb-2">
                  ID Kredensial: <span className="text-black font-extrabold">{pythonCert.credentialId}</span>
                </p>
                <a
                  href={pythonCert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nb-button-primary py-2.5 px-5 text-xs font-extrabold uppercase inline-flex items-center gap-2"
                >
                  <span>Verifikasi Kredensial</span>
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Image Thumbnail */}
            <div className="w-full sm:w-56 md:w-64 flex-shrink-0 border-3 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group bg-slate-900 aspect-[16/11]">
              <img
                src={pythonCert.image}
                alt={pythonCert.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>
        </motion.div>

        {/* Bento Row 1 - Card 2: Version Control Workflow (4 cols) */}
        <motion.div
          className="md:col-span-12 lg:col-span-4 nb-card p-6 bg-white flex flex-col justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div>
            <div className="border-3 border-black rounded-2xl overflow-hidden shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-4 aspect-[16/10] bg-slate-900 group">
              <img
                src={gitCert.image}
                alt={gitCert.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
              />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] font-black uppercase ${gitCert.categoryColor} border-2 border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]`}>
                {gitCert.category}
              </span>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                {gitCert.issuer}
              </span>
            </div>

            <h3 className="text-xl font-black uppercase text-black mb-1.5 tracking-tight">
              {gitCert.title}
            </h3>

            <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
              {gitCert.description}
            </p>
          </div>

          <div className="pt-2 border-t-2 border-black/10">
            <p className="text-[10px] font-mono font-bold uppercase text-slate-500 mb-2">
              ID: <span className="text-black font-extrabold">{gitCert.credentialId}</span>
            </p>
            <a
              href={gitCert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full nb-button-primary py-2 px-4 text-xs font-extrabold uppercase inline-flex items-center justify-center gap-2 text-center"
            >
              <span>Verifikasi Kredensial</span>
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Bento Row 2: 3 Cards (4 cols each) */}
        {otherCerts.map((cert, idx) => (
          <motion.div
            key={cert.id}
            className="md:col-span-6 lg:col-span-4 nb-card p-5 bg-white flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 + idx * 0.08 }}
          >
            <div>
              <div className="border-3 border-black rounded-2xl overflow-hidden shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-4 aspect-[16/10] bg-slate-900 group">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-black uppercase ${cert.categoryColor} border-2 border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]`}>
                  {cert.category}
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                  {cert.issuer}
                </span>
              </div>

              <h3 className="text-lg font-black uppercase text-black mb-1 tracking-tight">
                {cert.title}
              </h3>

              <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
                {cert.description}
              </p>
            </div>

            <div className="pt-2 border-t-2 border-black/10">
              <p className="text-[10px] font-mono font-bold uppercase text-slate-500 mb-2">
                ID: <span className="text-black font-extrabold">{cert.credentialId}</span>
              </p>
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full nb-button-primary py-2 px-4 text-xs font-extrabold uppercase inline-flex items-center justify-center gap-2 text-center"
              >
                <span>Verifikasi Kredensial</span>
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
