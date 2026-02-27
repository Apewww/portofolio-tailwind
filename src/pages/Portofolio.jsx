import React, { useRef } from "react";
import { motion, useInView } from 'framer-motion';

export default function Portofolio() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  
  const isInView1 = useInView(ref1, { triggerOnce: false });
  const isInView2 = useInView(ref2, { triggerOnce: false });

  // const [inView, setInView] = useState({ section1: false, section2: false });

  // useEffect(() => {
  //     if (isInView1) setInView((prev) => ({ ...prev, section1: true }));
  //     else setInView((prev) => ({ ...prev, section1: false }));
  // }, [isInView1]);

  // useEffect(() => {
  //     if (isInView2) setInView((prev) => ({ ...prev, section2: true }));
  //     else setInView((prev) => ({ ...prev, section2: false }));
  // }, [isInView2]);

  return (
    <section id="portofolio">
      <div className="min-h-screen flex justify-center items-center py-10 bg-base-200">
        <div className="max-w-screen-lg w-full">
          <motion.h1 
            className="text-5xl font-bold text-center pt-7"
            initial={{ opacity: 0, y: -50 }}
            animate={isInView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
            transition={{ duration: 1, delay: 0.6 }}
            ref={ref1}
          >
            Portofolio
          </motion.h1>
          <div className="pt-5">
            <motion.div
              className="carousel w-full"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 1, delay: 0.8 }}
              ref={ref2}
            >
              <div id="slide1" className="carousel-item relative w-full">
                <div className="mockup-browser border bg-base-300">
                  <div className="mockup-browser-toolbar">
                    <div className="input">https://assetmanagement.example.com</div>
                  </div>
                  <img src="/assets/img/asset_management.png" alt="asset_management" className="w-full" />
                </div>
                <div className="absolute flex justify-between items-center transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide2" className="btn btn-circle">❮</a> 
                  <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
              </div> 
              <div id="slide2" className="carousel-item relative w-full">
                <div className="mockup-browser border bg-base-300">
                  <div className="mockup-browser-toolbar">
                    <div className="input">https://sawcalculation.example.com</div>
                  </div>
                  <img src="/assets/img/project_1.png" alt="project_1" className="w-full" />
                </div>
                <div className="absolute flex justify-between items-center transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide1" className="btn btn-circle">❮</a> 
                  <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
              </div> 
              <div id="slide3" className="carousel-item relative w-full">
                <div className="mockup-browser border bg-base-300">
                  <div className="mockup-browser-toolbar">
                    <div className="input">https://referenceproject.example.com</div>
                  </div>
                  <img src="/assets/img/reference_project.png" alt="project_1" className="w-full" />
                </div>
                <div className="absolute flex justify-between items-center transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide1" className="btn btn-circle">❮</a> 
                  <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
              </div> 
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
