import React from "react";
import { motion } from 'framer-motion';

export default function Skills() {
    const services = [
        {
            title: "Backend Development",
            description: "Merancang alur sistem, logika server, dan struktur database yang rapi serta efisien.",
            icon: "python",
            color: "nb-yellow"
        },
        {
            title: "DevOps & Infrastruktur",
            description: "Membantu proses alur deployment, setup server, dan mengelola lingkungan aplikasi agar berjalan lancar.",
            icon: "docker",
            color: "nb-pink"
        },
        {
            title: "Pengembangan API",
            description: "Membuat REST API yang stabil, aman, dan mudah diintegrasikan menggunakan FastAPI atau Node.js.",
            icon: "fastapi",
            color: "nb-cyan"
        }
    ];

    return (
        <>
            {services.map((service, i) => (
                <motion.div
                    key={i}
                    className="nb-card group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                >
                    <div className={`w-16 h-16 bg-${service.color} border-2 border-black rounded-xl mb-6 flex items-center justify-center shadow-nb group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all`}>
                        <img
                            src={`https://cdn.simpleicons.org/${service.icon}/000000`}
                            className="w-8 h-8"
                            alt={service.title}
                        />
                    </div>
                    <h3 className="text-2xl font-black uppercase mb-4 leading-none">{service.title}</h3>
                    <p className="font-bold text-sm leading-tight opacity-70">
                        {service.description}
                    </p>
                </motion.div>
            ))}
        </>
    );
}
