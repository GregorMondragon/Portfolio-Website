import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Sections
import IntroScreen from './components/sections/IntroScreen';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Portfolio from './components/sections/Portfolio';
import Contact from './components/sections/Contact';
import SceneBackground from './components/ui/SceneBackground';
// UI
import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import ScrollToTop from './components/ui/ScrollToTop';
import ChatBot from './components/ui/ChatBot';

const App = () => {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {/* Custom cursor */}
      <CustomCursor />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Intro splash screen */}
      <AnimatePresence>
        {!introComplete && (
          <IntroScreen onComplete={() => setIntroComplete(true)} />
        )}
      </AnimatePresence>

      {/* Main site */}
      {introComplete && (
        <>
          <SceneBackground />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Portfolio />
            <Contact />
          </main>
          <Footer />
          <ScrollToTop />
          <ChatBot />
        </>
      )}
    </>
  );
};

export default App;
