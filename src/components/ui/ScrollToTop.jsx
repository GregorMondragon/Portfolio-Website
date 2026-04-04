import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import '../../styles/UI.css';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="scroll-to-top-btn"
          style={{
            background: 'linear-gradient(135deg, var(--primary), #0052CC)',
            boxShadow: '0 0 22px rgba(0,102,255,0.5), 0 4px 15px rgba(0,0,0,0.35)',
          }}
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} color="white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
