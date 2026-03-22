import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const certificates = [
  {
    title: "Full Stack Web Development",
    issuer: "Udemy / Coursera",
    date: "2023",
    description: "Certification for mastering front-end and back-end web technologies including React, Node.js, and Databases.",
    icon: "🌐"
  },
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    description: "Validated knowledge of cloud concepts, security, technology, and billing models of AWS.",
    icon: "☁️"
  },
  {
    title: "UI/UX Design Specialization",
    issuer: "Google / Coursera",
    date: "2023",
    description: "Professional certification focused on user-centered design, wireframing, and interactive prototyping.",
    icon: "🎨"
  },
  {
    title: "Cisco Certified Network Associate (CCNA)",
    issuer: "Cisco",
    date: "2022",
    description: "Deep understanding of networking fundamentals, IP connectivity, and security services.",
    icon: "📡"
  }
];

export default function Certificates() {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: false });

  return (
    <section id="certificates" className="py-20 bg-base-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          className="text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8 }}
          ref={ref}
        >
          Certificates
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              className="bg-base-200 p-8 rounded-3xl border border-base-300 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl group flex flex-col justify-between"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div>
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-inner">
                  {cert.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>
                <p className="text-primary font-medium text-sm mb-4">
                  {cert.issuer} • {cert.date}
                </p>
                <p className="text-base-content/60 text-sm italic leading-relaxed">
                  "{cert.description}"
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-base-300 flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-widest text-base-content/30 group-hover:text-primary/50 transition-colors">
                  Verified
                </span>
                <div className="h-2 w-12 bg-primary/20 rounded-full group-hover:w-20 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
