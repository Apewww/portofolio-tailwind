import React from "react";
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <div id="home" className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content Section */}
            <motion.div
                className="text-center lg:text-left order-2 lg:order-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-6xl md:text-7xl lg:text-4xl font-black mb-8 leading-[1.1] tracking-tighter text-black relative">
                    I'm a <span className="relative">Backend Engineer <span className="absolute -top-6 -right-12 text-4xl">✴?</span></span> <br />
                    with a focus on <span className="text-nb-pink [-webkit-text-stroke:2px_black] underline decoration-nb-yellow decoration-8 underline-offset-8">Scalability</span> and <span className="text-nb-pink [-webkit-text-stroke:2px_black] underline decoration-nb-yellow decoration-8 underline-offset-8">Automation</span>
                </h1>

                <p className="text-xl font-bold mb-12 max-w-xl leading-snug text-black opacity-80">
                    Building scalable systems and automated DevOps environments that power the next generation of web applications.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                    <a
                        href="#portofolio"
                        className="nb-button bg-black text-white hover:bg-nb-pink hover:text-black"
                    >
                        Hire Me
                    </a>
                    <a
                        href="#skills"
                        className="nb-button-primary"
                    >
                        Learn more
                    </a>
                </div>
            </motion.div>

            {/* Image Section */}
            <motion.div
                className="relative flex justify-center order-1 lg:order-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="relative w-full max-w-lg">
                    {/* Status Bubble / Tweet */}
                    <div className="absolute top-[70%] -right-12 z-40 animate-bounce delay-700">
                        <div className="bg-white nb-border nb-shadow px-6 py-3 rotate-6">
                            <p className="font-black text-lg italic">
                                "Always Learning, always building" 🚀
                            </p>
                            {/* Speech Bubble Tail */}
                            <div className="absolute -bottom-4 left-6 w-8 h-8 bg-white border-b-4 border-r-4 border-black rotate-45 z-[-1]"></div>
                        </div>
                    </div>

                    {/* Integrated Main Graphic (Blob + Person) */}
                    <div className="relative z-10 flex justify-center items-end h-[48rem]">
                        <img
                            src="/assets/img/final_me.png"
                            className="w-auto h-full object-contain mix-blend-multiply"
                            alt="Rafly Anggara"
                            onError={(e) => {
                                e.target.src = "/assets/img/me_final.png";
                            }}
                        />
                    </div>

                    {/* Floating Icons */}
                    <div className="absolute top-10 right-10 w-16 h-16 bg-nb-yellow nb-border nb-shadow -rotate-12 flex items-center justify-center z-30">
                        <img src="https://cdn.simpleicons.org/python/000000" className="w-8 h-8" alt="Python" />
                    </div>
                    <div className="absolute bottom-20 left-0 w-16 h-16 bg-nb-pink nb-border nb-shadow rotate-12 flex items-center justify-center z-30">
                        <img src="https://cdn.simpleicons.org/docker/000000" className="w-8 h-8" alt="Docker" />
                    </div>
                    <div className="absolute top-1/4 -left-10 w-12 h-12 bg-nb-white nb-border nb-shadow -rotate-6 flex items-center justify-center z-30">
                        <img src="https://cdn.simpleicons.org/postgresql/000000" className="w-6 h-6" alt="PostgreSQL" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
