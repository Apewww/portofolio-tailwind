import {React, useState, useEffect} from 'react';
import Navbar from './components/Navbar';
import Hero from './pages/Hero';
import Skills from './pages/Skills';
import Portofolio from './pages/Portofolio';
import Footer from './components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';

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
    <>
    <nav>
      <Navbar />
    </nav>
    <main>
      <Hero />
      <Skills />
      <Portofolio />
    </main>
    <footer>
      <Footer />
    </footer>
    {showButton && (
    <div className="fixed bottom-[20px] right-[20px] z-index-[51]">
      <button className="btn btn-primary" onClick={scrollToTop}>
        <FontAwesomeIcon icon={faCaretUp} />
      </button>
    </div>
    )}
    </>
  );
}

export default App;
