import React from "react";
import { motion } from "framer-motion";

const certificates = [
  {
    title: "HTML and CSS in Depth",
    issuer: "Progate / Coursera",
    image: "/assets/img/Certif_HTML and CSS.png",
    pdf: "/assets/pdf/Coursera UTJ9Y0Q04F0E.pdf",
    category: "Web Development"
  },
  {
    title: "Introduction Frontend Development",
    issuer: "Progate / Coursera",
    image: "/assets/img/Certif_Intro Frontend Development.png",
    pdf: "/assets/pdf/Coursera R3HXJABQVHH2.pdf",
    category: "Web Development"
  },
  {
    title: "Programming Javascript",
    issuer: "Progate / Coursera",
    image: "/assets/img/Certif_Programming Javascript.png",
    pdf: "/assets/pdf/Coursera Z654TDKKZJK2.pdf",
    category: "Web Development"
  },
  {
    title: "Programming Python",
    issuer: "Progate / Coursera",
    image: "/assets/img/Certif_Programming Python.png",
    pdf: "/assets/pdf/Coursera 6IIWE8U7861R.pdf",
    category: "Programming"
  },
  {
    title: "Version Control",
    issuer: "Progate / Coursera",
    image: "/assets/img/Certif_Version Control.png",
    pdf: "/assets/pdf/Coursera PI22FH6PPXS7.pdf",
    category: "DevOps"
  }
];

export default function Certificates() {
  return (
    <section id="certificates" className="py-24 bg-base-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-20">
          <motion.h2
            className="text-5xl md:text-6xl font-black mb-6 tracking-tight"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            Sertifikasi
          </motion.h2>
          <p className="text-xl text-base-content/60 max-w-2xl mx-auto">
            Koleksi sertifikat yang memvalidasi kompetensi teknis saya di berbagai bidang teknologi. Tekan untuk melihat PDF.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {certificates.map((cert, index) => (
            <motion.a
              key={index}
              href={cert.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="break-inside-avoid relative block group overflow-hidden rounded-[2rem] bg-base-200 border border-base-content/5 hover:border-primary/30 transition-all duration-500 shadow-lg hover:shadow-2xl"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <span className="text-white/60 text-xs font-bold uppercase tracking-[0.2em] mb-2">
                    {cert.issuer}
                  </span>
                  <h3 className="text-white text-xl font-bold leading-tight">
                    {cert.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 bg-base-200 group-hover:bg-base-300 transition-colors duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
                      {cert.title}
                    </h4>
                    <p className="text-sm text-base-content/50 font-medium tracking-wide">
                      {cert.issuer} • {cert.category}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 100-2H5z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* PDF Overlay Hint */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                  View PDF
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
