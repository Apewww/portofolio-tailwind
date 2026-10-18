import { React, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './pages/Hero';
import Skills from './pages/Skills';
import TechStackSection from './components/TechStackSection';
import SocialSidebar from './components/SocialSidebar';
import Portofolio from './pages/Portofolio';
import GithubSection from './pages/GithubSection';
import Education from './pages/Education';
import Certificates from './pages/Certificates';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import AIChatBubble from './components/AIChatBubble';

function App() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowButton(window.pageYOffset > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

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

      <main className="relative pt-20 sm:pt-24 pb-12 px-4 sm:px-6 md:px-12 max-w-[1400px] mx-auto z-10">
        <Hero />

        <div id="skills" className="mt-16 sm:mt-24 md:mt-28">
          <div className="flex flex-col items-center justify-center gap-3 mb-10 sm:mb-14 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
              Keahlian & Fokus Teknis
            </h2>
            <div className="h-1.5 w-16 bg-nb-pink border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Skills />
          </div>

          {/* Categorized Tech Stack Section */}
          <TechStackSection />
        </div>

        <div id="education" className="mt-16 sm:mt-24 md:mt-28">
          <Education />
        </div>

        <div id="portofolio" className="mt-16 sm:mt-24 md:mt-28">
          <Portofolio />
        </div>

        <div id="github" className="mt-16 sm:mt-24 md:mt-28">
          <GithubSection />
        </div>

        <div id="certificates" className="mt-16 sm:mt-24 md:mt-28">
          <Certificates />
        </div>

        {/* Contact Section connected to Discord Webhook */}
        <ContactSection />
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
      <AIChatBubble />
    </div>
  );
}

export default App;
