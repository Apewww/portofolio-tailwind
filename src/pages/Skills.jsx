import React, { useRef } from "react";
import { motion, useInView } from 'framer-motion';

export default function Skills() {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    
    const isInView1 = useInView(ref1, { triggerOnce: false });
    const isInView2 = useInView(ref2, { triggerOnce: false });
    const isInView3 = useInView(ref3, { triggerOnce: false });
    
    // const [inView, setInView] = useState({ section1: false, section2: false, section3: false });

    // useEffect(() => {
    //     if (isInView1) setInView((prev) => ({ ...prev, section1: true }));
    //     else setInView((prev) => ({ ...prev, section1: false }));
    // }, [isInView1]);

    // useEffect(() => {
    //     if (isInView2) setInView((prev) => ({ ...prev, section2: true }));
    //     else setInView((prev) => ({ ...prev, section2: false }));
    // }, [isInView2]);

    // useEffect(() => {
    //     if (isInView3) setInView((prev) => ({ ...prev, section3: true }));
    //     else setInView((prev) => ({ ...prev, section3: false }));
    // }, [isInView3]);

    return (
        <section id="skills">
            <motion.div 
                className="hero min-h-screen bg-base-200"
                initial={{ opacity: 0 }}
                animate={isInView1 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1 }}
                ref={ref1}
            >
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <motion.h1 
                            className="text-5xl font-bold"
                            initial={{ opacity: 0, y: -50 }}
                            animate={isInView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
                            transition={{ duration: 1, delay: 0.6 }}
                        >
                            My Skills
                        </motion.h1>
                        
                        {/* Backend Developer */}
                        <motion.div 
                            className="py-5"
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            ref={ref2}
                        >
                            <div tabIndex={0} className="collapse collapse-arrow border border-base-content bg-base-200 max-w-[500px]">
                                <div className="collapse-title text-xl font-medium">
                                    Backend Developer
                                </div>
                                <div className="collapse-content"> 
                                    <ul>
                                        <li className="flex justify-between">
                                            <span className="flex justify-start">Flask</span>
                                            <span className="flex justify-end">83%</span>
                                        </li>
                                        <li>
                                            <progress className="progress progress-primary w-full mb-3" value="83" max="100"></progress>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="flex justify-start">CodeIgniter</span>
                                            <span className="flex justify-end">68%</span>
                                        </li>
                                        <li>
                                            <progress className="progress progress-primary w-full mb-3" value="68" max="100"></progress>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="flex justify-start">Express JS</span>
                                            <span className="flex justify-end">30%</span>
                                        </li>
                                        <li>
                                            <progress className="progress progress-primary w-full mb-3" value="30" max="100"></progress>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="flex justify-start">Next JS</span>
                                            <span className="flex justify-end">30%</span>
                                        </li>
                                        <li>
                                            <progress className="progress progress-primary w-full mb-3" value="30" max="100"></progress>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        {/* Frontend Developer */}
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                            transition={{ duration: 1, delay: 0.8 }}
                        >
                            <div tabIndex={0} className="collapse collapse-arrow border border-base-content bg-base-200 max-w-[500px]">
                                <div className="collapse-title text-xl font-medium">
                                    Frontend Developer
                                </div>
                                <div className="collapse-content"> 
                                    <ul>
                                        <li className="flex justify-between">
                                            <span className="flex justify-start">HTML</span>
                                            <span className="flex justify-end">90%</span>
                                        </li>
                                        <li>
                                            <progress className="progress progress-primary w-full mb-3" value="90" max="100"></progress>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="flex justify-start">CSS</span>
                                            <span className="flex justify-end">50%</span>
                                        </li>
                                        <li>
                                            <progress className="progress progress-primary w-full mb-3" value="50" max="100"></progress>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="flex justify-start">React JS</span>
                                            <span className="flex justify-end">60%</span>
                                        </li>
                                        <li>
                                            <progress className="progress progress-primary w-full mb-3" value="60" max="100"></progress>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="flex justify-start">Tailwind</span>
                                            <span className="flex justify-end">50%</span>
                                        </li>
                                        <li>
                                            <progress className="progress progress-primary w-full mb-3" value="50" max="100"></progress>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="flex justify-start">Bootstrap</span>
                                            <span className="flex justify-end">30%</span>
                                        </li>
                                        <li>
                                            <progress className="progress progress-primary w-full mb-3" value="30" max="100"></progress>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        {/* Database Management */}
                        <motion.div 
                            className="py-5"
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView3 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                            transition={{ duration: 1, delay: 1 }}
                            ref={ref3}
                        >
                            <div tabIndex={0} className="collapse collapse-arrow border border-base-content bg-base-200 max-w-[500px]">
                                <div className="collapse-title text-xl font-medium">
                                    Database Management
                                </div>
                                <div className="collapse-content"> 
                                    <ul>
                                        <li className="flex justify-between">
                                            <span className="flex justify-start">MySQL</span>
                                            <span className="flex justify-end">60%</span>
                                        </li>
                                        <li>
                                            <progress className="progress progress-primary w-full mb-3" value="60" max="100"></progress>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="flex justify-start">PostgreSQL</span>
                                            <span className="flex justify-end">30%</span>
                                        </li>
                                        <li>
                                            <progress className="progress progress-primary w-full mb-3" value="30" max="100"></progress>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="flex justify-start">SQLServer</span>
                                            <span className="flex justify-end">50%</span>
                                        </li>
                                        <li>
                                            <progress className="progress progress-primary w-full mb-3" value="50" max="100"></progress>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="flex justify-start">Firebase</span>
                                            <span className="flex justify-end">20%</span>
                                        </li>
                                        <li>
                                            <progress className="progress progress-primary w-full mb-3" value="20" max="100"></progress>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </motion.div>
        </section>
    );
}
