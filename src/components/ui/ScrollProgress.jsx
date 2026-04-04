import { useScroll, motion } from 'framer-motion';
import '../../styles/UI.css';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, var(--primary), var(--accent))',
        boxShadow: '0 0 12px rgba(0,102,255,0.7), 0 0 4px rgba(0,212,255,0.5)',
      }}
    />
  );
};

export default ScrollProgress;
