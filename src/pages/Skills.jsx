import React from "react";
import { motion } from 'framer-motion';

export default function Skills() {
    const services = [
        {
            title: "Backend Architecture",
            description: "Designing high-performance server-side logic and scalable database structures.",
            icon: "python",
            color: "nb-yellow"
        },
        {
            title: "DevOps & Infrastructure",
            description: "Automating deployment pipelines and managing cloud-native environments.",
            icon: "docker",
            color: "nb-pink"
        },
        {
            title: "API Development",
            description: "Building robust, secure, and fast APIs using modern frameworks like FastAPI & Node.js.",
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
