import { React, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './pages/Hero';
import Skills from './pages/Skills';
import TechMarquee from './components/TechMarquee';
import Portofolio from './pages/Portofolio';
import Education from './pages/Education';
import Certificates from './pages/Certificates';
import Footer from './components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import Marquee from './components/Marquee';

function App() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="bg-nb-cream selection:bg-nb-pink selection:text-white min-h-screen">
      <nav>
        <Navbar />
      </nav>
      <main className="relative pt-20 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto z-10">
        <Hero />

        <div id="skills" className="mt-48">
          <div className="flex items-center justify-center gap-4 mb-20">
            <h2 className="text-5xl md:text-6xl font-black uppercase flex items-center gap-4">
              Core Skills <span className="text-4xl text-nb-pink">✴?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Skills />
          </div>

          {/* Tech Marquee below skills */}
          <div className="w-full mt-32 -mx-6 md:-mx-12">
            <TechMarquee />
          </div>
        </div>

        <div id="education" className="mt-48">
          <Education />
        </div>

        <div id="portofolio" className="mt-48">
          <Portofolio />
        </div>

        <div id="certificates" className="mt-48">
          <Certificates />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
      {showButton && (
        <div className="fixed bottom-10 right-10 z-[9999]">
          <button
            className="nb-button bg-nb-yellow p-4 rounded-full"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <FontAwesomeIcon icon={faCaretUp} />
          </button>
        </div>
      )}
    </div>

  );
}

export default App;
