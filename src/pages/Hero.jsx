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
                <h1 className="text-4xl sm:text-5xl md:text-5xl font-black mb-6 sm:mb-8 leading-[1.1] tracking-tighter text-black relative">
                    I'm a <span className="relative">Backend Engineer <span className="absolute -top-6 -right-12 text-4xl">✴?</span></span> <br />
                    with a focus on <span className="text-nb-pink [-webkit-text-stroke:2px_black] underline decoration-nb-yellow decoration-8 underline-offset-8">Scalability</span> and <span className="text-nb-pink [-webkit-text-stroke:2px_black] underline decoration-nb-yellow decoration-8 underline-offset-8">Automation</span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl font-bold mb-8 sm:mb-12 max-w-xl leading-snug text-black opacity-80">
                    Building scalable systems and automated DevOps environments that power the next generation of web applications.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                    <a
                        href="mailto:apewinaja@gmail.com"
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
                    {/* Status Bubble / Tweet - Hidden on very small mobile, repositioned on md+ */}
                    <div className="hidden sm:block absolute top-[65%] sm:-right-4 md:-right-8 lg:-right-12 z-40 animate-bounce delay-700">
                        <div className="bg-white nb-border nb-shadow px-3 sm:px-6 py-2 sm:py-3 rotate-6">
                            <p className="font-black text-sm sm:text-lg italic">
                                "Always Learning, always building" 🚀
                            </p>
                            {/* Speech Bubble Tail */}
                            <div className="absolute -bottom-4 left-6 w-8 h-8 bg-white border-b-4 border-r-4 border-black rotate-45 z-[-1]"></div>
                        </div>
                    </div>

                    {/* Integrated Main Graphic (Blob + Person) */}
                    <div className="relative z-10 flex justify-center items-end h-[22rem] sm:h-[30rem] md:h-[38rem] lg:h-[44rem] xl:h-[48rem]">
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
                    <div className="absolute flex top-4 right-16 sm:top-10 sm:right-10 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-nb-yellow nb-border nb-shadow -rotate-12 items-center justify-center z-30">
                        <img src="https://cdn.simpleicons.org/python/000000" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" alt="Python" />
                    </div>
                    <div className="absolute flex bottom-16 left-16 sm:bottom-10 sm:left-16 md:bottom-20 md:left-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-nb-pink nb-border nb-shadow rotate-12 items-center justify-center z-30">
                        <img src="https://cdn.simpleicons.org/docker/000000" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" alt="Docker" />
                    </div>
                    <div className="absolute flex top-1/3 left-8 sm:top-1/4 sm:left-6 lg:-left-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-nb-white nb-border nb-shadow -rotate-6 items-center justify-center z-30">
                        <img src="https://cdn.simpleicons.org/postgresql/000000" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" alt="PostgreSQL" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
