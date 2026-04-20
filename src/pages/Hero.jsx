import React from "react";
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section id="home" className="relative bg-base-100 min-h-screen flex flex-col justify-center pt-24 pb-12 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 w-full mb-12">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">

                    {/* Content Section */}
                    <motion.div
                        className="lg:w-3/5 text-center lg:text-left"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight tracking-tight uppercase">
                            Rafly <br />
                            <span className="text-white italic">Anggara</span> <br />
                            <span className="text-primary underline decoration-white decoration-8 underline-offset-[12px]">Putra.</span>
                        </h1>

                        <p className="text-lg md:text-xl opacity-60 mb-12 max-w-2xl leading-relaxed border-l-4 border-primary pl-6">
                            Fullstack Engineer specialized in building high-performance server architectures,
                            automated DevOps environments, and scalable systems. Currently focused on structural software engineering.
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                            <a
                                href="#portofolio"
                                className="bg-primary text-white font-black uppercase tracking-[0.2em] px-12 py-5 rounded-none shadow-[6px_6px_0px_#1E293B] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                            >
                                Works
                            </a>
                            <a
                                href="#skills"
                                className="font-black uppercase tracking-[0.2em] text-[10px] border-b-2 border-base-300 pb-1 hover:border-primary transition-all"
                            >
                                Tech Stack
                            </a>
                        </div>
                    </motion.div>

                    {/* Image Section - Professional Portrait with Interactive Spotlight */}
                    <motion.div
                        className="lg:w-2/5 relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <HeroImageContainer />
                    </motion.div>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-[10%] right-[-10%] w-1/2 h-1/2 bg-primary/2 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
}

function HeroImageContainer() {
    const [isRed, setIsRed] = React.useState(false);
    const [mousePos, setMousePos] = React.useState({ x: -500, y: -500 });
    const containerRef = React.useRef(null);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            ref={containerRef}
            className="relative p-8 group cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: -500, y: -500 })}
            onClick={() => setIsRed(!isRed)}
        >
            {/* Geometric Shapes Behind Image */}
            <div className="absolute top-0 left-0 w-full h-full bg-primary/10 -skew-x-6 z-0" />
            <div className="absolute top-12 left-12 w-full h-full bg-primary/20 -skew-x-6 z-[-1]" />

            <div className={`relative p-0 z-10 border-4 border-dev-border overflow-hidden transition-colors duration-1000 ${isRed ? 'bg-red-400' : 'bg-dev-navy'}`}>

                {/* 1. Base Layer: Stylized Monochrome Image */}
                <div className="relative">
                    {!isRed && (
                        <div className="absolute inset-0 z-15 bg-primary/20 mix-blend-color grayscale pointer-events-none transition-all duration-700" />
                    )}
                    <img
                        src="/assets/img/me_final.png"
                        className={`w-full relative z-10 transition-all duration-700 ${isRed ? 'opacity-0' : 'grayscale contrast-125 brightness-90'}`}
                        alt="Stylized"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>

                {/* 2. Top Layer: Original Color Image (Revealed by Mask or Click) */}
                <div
                    className="absolute inset-0 z-20 transition-all duration-700"
                    style={{
                        maskImage: isRed
                            ? 'none'
                            : `radial-gradient(circle 180px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
                        WebkitMaskImage: isRed
                            ? 'none'
                            : `radial-gradient(circle 180px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
                    }}
                >
                    <img
                        src="/assets/img/me_final.png"
                        className="w-full h-full object-cover"
                        alt="Original"
                    />
                </div>

                {/* Optional Red Halo Effect for the Flashlight */}
                {!isRed && (
                    <motion.div
                        className="absolute inset-0 z-25 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background: `radial-gradient(circle 185px at ${mousePos.x}px ${mousePos.y}px, rgba(239, 68, 68, 0.2), transparent 100%)`,
                        }}
                    />
                )}

                {/* Improved Bold Label */}
                <div className={`absolute -bottom-4 right-[-20px] p-4 px-10 font-black uppercase text-[12px] tracking-[0.5em] shadow-[8px_8px_0px_#0F172A] border-2 border-white/20 z-30 whitespace-nowrap transform -skew-x-12 transition-all duration-500 cursor-default ${isRed ? 'bg-white text-red-600' : 'bg-primary text-white'}`}>
                    Fullstack Engineer
                </div>
            </div>
        </div>
    );
}
