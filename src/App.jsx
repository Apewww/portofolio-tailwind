import { React, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './pages/Hero';
import Skills from './pages/Skills';
import TechMarquee from './components/TechMarquee';
import SocialSidebar from './components/SocialSidebar';
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
    // 1. Disable Right Click
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // 2. Disable Keyboard Shortcuts
    const handleKeyDown = (e) => {
      // Disable F12
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
      if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+U (View Source)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }
    };

    // 3. Debugger Loop (Anti-DevTools)
    const debuggerLoop = setInterval(() => {
      (function () {
        (function a() {
          try {
            (function b(i) {
              if (("" + i / i).length !== 1 || i % 20 === 0) {
                (function () { }).constructor("debugger")();
              } else {
                debugger;
              }
              b(++i);
            })(0);
          } catch (e) {
            setTimeout(a, 5);
          }
        })();
      })();
    }, 1000);

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

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
    <div className="bg-nb-cream selection:bg-nb-pink selection:text-white min-h-screen overflow-x-hidden">
      <nav>
        <Navbar />
      </nav>

      {/* Vertical Social Sidebar */}
      <SocialSidebar />

      <main className="relative pt-20 sm:pt-24 pb-24 px-4 sm:px-6 md:px-12 max-w-[1400px] mx-auto z-10">
        <Hero />

        <div id="skills" className="mt-24 sm:mt-32 md:mt-48">
          <div className="flex items-center justify-center gap-4 mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase flex items-center gap-4">
              Core Skills <span className="text-4xl text-nb-pink">✴?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <Skills />
          </div>

          {/* Tech Marquee below skills - Full Width Breakout */}
          <div className="relative mt-16 sm:mt-24 md:mt-32 overflow-hidden" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', width: '100vw' }}>
            <TechMarquee />
          </div>
        </div>

        <div id="education" className="mt-24 sm:mt-32 md:mt-48">
          <Education />
        </div>

        <div id="portofolio" className="mt-24 sm:mt-32 md:mt-48">
          <Portofolio />
        </div>

        <div id="certificates" className="mt-24 sm:mt-32 md:mt-48">
          <Certificates />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
      {showButton && (
        <div className="fixed bottom-6 right-4 sm:bottom-10 sm:right-16 md:right-20 z-[9999]">
          <button
            className="nb-button bg-nb-yellow p-3 sm:p-3.5 px-3 sm:px-5 rounded-full"
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
