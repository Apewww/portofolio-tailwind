import React from "react";
import { motion } from 'framer-motion';

export default function Education() {
    const educationData = [
        {
            school: "Unjani University",
            degree: "Teknik Informatika",
            period: "2023 - Present",
            color: "nb-cyan",
            description: "Deepening software architecture, algorithms, and backend systems."
        },
        {
            school: "SMK Negeri 1 Cimahi",
            degree: "SIJA",
            period: "2019 - 2023",
            color: "nb-pink",
            description: "Foundation in network administration and software development."
        }
    ];

    return (
        <div id="education" className="mt-48">
            <div className="flex flex-col items-center justify-center gap-4 mb-12 sm:mb-16 md:mb-20">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase flex items-center gap-4">
                    Education <span className="text-4xl text-nb-pink">✴?</span>
                </h2>
                <div className="w-8 h-2 bg-black rounded-full" />
            </div>

            <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-1 before:bg-black">
                {educationData.map((item, index) => (
                    <motion.div
                        key={index}
                        className="pl-10 relative"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className={`absolute left-0 top-1 w-8 h-8 rounded-none border-2 border-black bg-${item.color} shadow-nb z-10`} />
                        <div className="nb-card p-4 bg-white border-2">
                            <span className="text-[10px] font-black uppercase bg-black text-white px-2 py-0.5 mb-2 inline-block">
                                {item.period}
                            </span>
                            <h3 className="text-xl font-black uppercase leading-none mb-1">{item.school}</h3>
                            <p className="text-xs font-bold text-nb-pink uppercase mb-2">{item.degree}</p>
                            <p className="text-[11px] font-bold italic leading-tight">{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
