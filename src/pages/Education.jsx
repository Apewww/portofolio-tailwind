import React from "react";
import { motion } from 'framer-motion';

const colorClass = {
  "nb-cyan": "bg-nb-cyan",
  "nb-pink": "bg-nb-pink",
  "nb-yellow": "bg-nb-yellow",
  "nb-lime": "bg-nb-lime",
};

export default function Education() {
  const educationData = [
    {
      school: "Unjani University",
      degree: "Teknik Informatika",
      period: "2023 - Sekarang",
      color: "nb-cyan",
      description: "Fokus pada algoritma, pendalaman basis data, rekayasa perangkat lunak, arsitektur backend dan kecerdasan buatan."
    },
    {
      school: "SMK Negeri 1 Cimahi",
      degree: "SIJA - Sistem Informatika Jaringan dan Aplikasi",
      period: "2019 - 2023",
      color: "nb-pink",
      description: "Pelatihan kejuruan dalam jaringan, internet of things, dan rekayasa perangkat lunak."
    }
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center gap-3 mb-10 sm:mb-14 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
          Riwayat Pendidikan
        </h2>
        <div className="h-1.5 w-16 bg-nb-cyan border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"></div>
      </div>

      <div className="space-y-6 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-1.5 before:bg-black max-w-3xl mx-auto">
        {educationData.map((item, index) => (
          <motion.div
            key={index}
            className="pl-10 sm:pl-12 relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`absolute left-0 top-3 w-8 h-8 border-3 border-black ${colorClass[item.color] || "bg-black"} shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] z-10`} />
            <div className="nb-card p-5 sm:p-6 bg-white">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-black uppercase bg-black text-white px-2.5 py-1">
                  {item.period}
                </span>
                <span className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider">
                  Akademik
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase leading-tight text-black mb-1">
                {item.school}
              </h3>
              <p className="text-xs sm:text-sm font-black text-nb-pink uppercase tracking-wider mb-2">
                {item.degree}
              </p>
              <p className="text-sm font-medium text-slate-800 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
