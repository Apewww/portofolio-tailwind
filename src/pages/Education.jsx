import React from "react";
import { motion } from "framer-motion";

const Education = () => {
  const schools = [
    {
      name: "Universitas Jenderal Achmad Yani",
      major: "Teknik Informatika",
      period: "2023 - Sekarang",
      status: "Terakhir",
      description: "Berfokus pada pengembangan perangkat lunak, arsitektur sistem modern dan kecerdasan buatan.",
      color: "bg-blue-600",
    },
    {
      name: "SMK Negeri 1 Cimahi",
      major: "Sistem Informasi Jaringan dan Aplikasi",
      period: "2019 - 2023",
      status: "Berawal dari",
      description: "Mendalami infrastruktur jaringan dan sistem aplikasi.",
      color: "bg-emerald-600",
    },
  ];

  return (
    <section id="education" className="py-24 bg-base-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-20">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            Jenjang Pendidikan
          </motion.h2>
          <div className="w-20 h-1.5 bg-primary rounded-full" />
        </div>

        <div className="relative border-l-2 border-base-300 ml-3 md:ml-6 space-y-12">
          {schools.map((school, index) => (
            <motion.div
              key={index}
              className="relative pl-8 md:pl-12"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Timeline Dot */}
              <div className={`absolute left-[-9px] top-1.5 w-4 h-4 rounded-full border-4 border-base-100 shadow-sm ${school.color}`} />

              <div className="bg-base-200/50 hover:bg-base-200 p-2 md:p-4 rounded-3xl border border-base-content/5 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <span className="text-sm font-bold text-primary uppercase tracking-tighter">
                    {school.status} • {school.period}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-1">
                  {school.name}
                </h3>
                <p className="text-md font-medium text-base-content/70 mb-4">
                  {school.major}
                </p>
                <p className="text-base-content/50 leading-relaxed max-w-2xl">
                  {school.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
