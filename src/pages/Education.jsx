import React from "react";
import { motion } from 'framer-motion';

const EducationItem = ({ school, degree, period, description }) => (
    <motion.div
        className="flex flex-col md:flex-row gap-8 md:gap-16 mb-20 last:mb-0 group"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
    >
        <div className="md:w-1/4">
            <div className="bg-dev-navy border border-dev-border p-4 text-center group-hover:border-primary transition-all shadow-lg">
                <span className="font-sans font-black text-xs uppercase tracking-widest text-primary">
                    {period}
                </span>
            </div>
        </div>

        <div className="md:w-3/4">
            <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-2 group-hover:text-primary transition-colors">
                {school}
            </h3>
            <p className="text-lg font-bold text-secondary mb-4 underline decoration-primary decoration-2 underline-offset-8">
                {degree}
            </p>
            <div className="p-6 bg-dev-navy border border-dev-border mt-6">
                <p className="opacity-60 text-sm leading-relaxed font-medium italic">
                    {description}
                </p>
            </div>
        </div>
    </motion.div>
);

export default function Education() {
    const educationData = [
        {
            school: "Unjani University",
            degree: "Teknik Informatika",
            period: "2023 - Present",
            description: "Mendalami arsitektur perangkat lunak, algoritma, dan sistem backend. Berfokus pada pembangunan solusi pengembangan yang scalable dan sesuai standar industri."
        },
        {
            school: "SMK Negeri 1 Cimahi",
            degree: "Sistem Informasi Jaringan dan Aplikasi",
            period: "2019 - 2023",
            description: "Fondasi dalam administrasi jaringan, sistem operasi, dan pengembangan perangkat lunak dasar."
        }
    ];

    return (
        <section id="education" className="py-32 bg-base-100 relative">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="mb-24 flex items-center justify-between">
                    <div className="max-w-2xl">
                        <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">-</span>
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">
                            Acedemic <span className="text-primary">Journey</span>.
                        </h2>
                    </div>
                    <div className="hidden lg:block w-32 h-px bg-base-300" />
                </div>

                <div className="max-w-6xl mx-auto">
                    {educationData.map((item, index) => (
                        <EducationItem key={index} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
}
