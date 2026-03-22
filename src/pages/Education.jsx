import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: false });

  const schools = [
    {
      name: "Universitas Jenderal Achmad Yani",
      major: "Teknik Informatika",
      period: "Terakhir",
      description: "Fokus pada pengembangan perangkat lunak, algoritma, dan pemrograman tingkat lanjut.",
      icon: "🎓",
    },
    {
      name: "SMK Negeri 1 Cimahi",
      major: "Sistem Informasi Jaringan dan Aplikasi",
      period: "Berawal dari",
      description: "Mempelajari dasar-dasar jaringan komputer, sistem operasi, dan administrasi server.",
      icon: "🏫",
    },
  ];

  return (
    <section id="education" className="py-20 bg-base-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          className="text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          ref={ref}
        >
          Jejak Sekolah
        </motion.h2>

        <div className="relative border-l-4 border-primary ml-4 md:ml-0 md:left-1/2 md:-translate-x-1/2">
          {schools.map((school, index) => (
            <motion.div
              key={index}
              className={`mb-12 relative w-full md:w-1/2 ${
                index % 2 === 0 ? "md:ml-auto md:pl-12" : "md:mr-auto md:pr-12 md:text-right"
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
            >
              <div className="absolute top-0 w-8 h-8 bg-primary rounded-full -left-10 md:left-0 md:translate-x-[-50%] flex items-center justify-center text-white text-sm">
                {school.icon}
              </div>
              <div className="bg-base-200 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-base-300">
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  {school.period}
                </span>
                <h3 className="text-2xl font-bold mt-1">{school.name}</h3>
                <p className="text-secondary font-medium mt-1">{school.major}</p>
                <p className="mt-4 text-base-content/70 italic text-sm">
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
