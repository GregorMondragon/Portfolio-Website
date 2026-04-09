import { useScroll, useTransform } from 'framer-motion';

// ============================================================
// Framer Motion Animation Variants & Hooks
// ============================================================

/**
 * Custom hook for smooth, sticky fluid parallax animations.
 * Applies a physical spring wrapper over scroll progress for a lively feel.
 */
export const useFluidParallax = (ref, options = {}) => {
  const {
    yRange = [50, -50],
    scaleRange = [1, 1],
    opacityRange = [1, 1],
    offset = ["start end", "end start"]
  } = options;

  const { scrollYProgress } = useScroll({ target: ref, offset });

  // Direct useTransform ensures stability without continuous spring updates
  const y = useTransform(scrollYProgress, [0, 1], yRange);
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const opacity = useTransform(scrollYProgress, [0, 1], opacityRange);

  return { y, scale, opacity };
};

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 2.5, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 2.5, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 3, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 3, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export const slideInDown = {
  hidden: { opacity: 0, y: -60 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 3, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export const zoomIn = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 1.5, type: "spring", bounce: 0.3, delay },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};
