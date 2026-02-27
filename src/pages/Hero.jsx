import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from 'framer-motion';

export default function Hero() {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    
    const isInView1 = useInView(ref1, { triggerOnce: false });
    const isInView2 = useInView(ref2, { triggerOnce: false });
    const isInView3 = useInView(ref3, { triggerOnce: false });
    
    const [inView, setInView] = useState({ section1: false, section2: false, section3: false });

    useEffect(() => {
        if (isInView1) setInView((prev) => ({ ...prev, section1: true }));
        else setInView((prev) => ({ ...prev, section1: false }));
    }, [isInView1]);

    useEffect(() => {
        if (isInView2) setInView((prev) => ({ ...prev, section2: true }));
        else setInView((prev) => ({ ...prev, section2: false }));
    }, [isInView2]);

    useEffect(() => {
        if (isInView3) setInView((prev) => ({ ...prev, section3: true }));
        else setInView((prev) => ({ ...prev, section3: false }));
    }, [isInView3]);

    const handleClick = (e, id) => {
        e.preventDefault(); 
        const element = document.getElementById(id);
        element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home">
            <motion.div 
                className="hero min-h-screen bg-base-200 relative"
                initial={{ opacity: 0, y: -50 }}
                animate={inView.section1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
                transition={{ duration: 1 }}
                ref={ref1}
            >
                <div className="hero-content flex-col lg:flex-row-reverse relative z-[1] lg:gap-[5rem]">
                    <motion.img 
                        src="/assets/img/me.png" 
                        className="max-w-[250px] md:max-w-[300px] relative z-20 rounded-xl" 
                        alt="Me"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={inView.section2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        ref={ref2}
                    />
                    <motion.div 
                        className="lg:text-left text-center lg:mr-8"
                        initial={{ opacity: 0, x: -100 }}
                        animate={inView.section3 ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        ref={ref3}
                    >
                        <h1 className="text-2xl font-bold">Hi, I am Rafly Anggara Putra</h1>
                        <h2 className="text-xl font-bold opacity-75">Backend Developer</h2>
                        <p className="py-6">
                            I have over a year of experience as a backend developer <br/>
                            and specialize in using Python, and PHP. <br/>
                            Feel free to get to know me more.
                        </p>
                        <button className="btn btn-primary">
                            <span onClick={(e) => handleClick(e, 'skills')}>Next Slide</span>
                        </button>   
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
