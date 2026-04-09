import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Mail, ArrowDown } from 'lucide-react';
import { personal, skills } from '../../assets/data/portfolio';
import GlowOrbs from '../ui/GlowOrbs';
import { useFluidParallax, fadeUp, staggerContainer, slideInLeft, slideInRight, zoomIn } from '../../utils/animations';
import { useTilt } from '../../hooks';
import '../../styles/Hero.css';

// ── Typewriter ───────────────────────────────────────────────
const WORDS = ['Software Engineer', 'UI/UX Craftsman', 'Creative Developer', 'Full-Stack Builder'];

const TypeWriter = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = WORDS[wordIndex];
    let t;
    if (!deleting && displayed.length < word.length) {
      t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === word.length) {
      t = setTimeout(() => setDeleting(true), 2500);
    } else if (deleting && displayed.length > 0) {
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else {
      setDeleting(false);
      setWordIndex((p) => (p + 1) % WORDS.length);
    }
    return () => clearTimeout(t);
  }, [displayed, deleting, wordIndex]);

  return (
    <span className="typewriter-container">
      <span className="typewriter-text">{displayed}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        className="typewriter-cursor"
      />
    </span>
  );
};

// ── Social Icon Components ───────────────────────────────────
const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
  </svg>
);

const TelegramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zM17.65 8.232l-1.933 9.112c-.145.64-.523.798-1.06.498L11.7 15.58l-1.42 1.368c-.157.157-.289.289-.59.289l.21-2.981L15.33 9.531c.236-.21-.051-.327-.367-.116l-6.71 4.225-2.89-.904c-.628-.196-.64-.628.13-.928l11.31-4.359c.523-.196.981.116.847.783z" />
  </svg>
);

const socialLinks = [
  { Icon: GithubIcon, href: personal.links.github, label: 'GitHub' },
  { Icon: LinkedinIcon, href: personal.links.linkedin, label: 'LinkedIn' },
  { Icon: FacebookIcon, href: personal.links.facebook, label: 'Facebook' },
  { Icon: InstagramIcon, href: personal.links.instagram, label: 'Instagram' },
  { Icon: TelegramIcon, href: personal.links.telegram, label: 'Telegram' },
];

// ── 3D Code Panel ──────────────────────────────────────────────
const CodePanel = () => {
  const { tilt, onMouseMove, onMouseLeave } = useTilt(20);

  return (
    <motion.div
      variants={zoomIn} initial="hidden" whileInView="visible" viewport={{ once: false }}
      className="hero-code-panel-wrapper"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ perspective: 1200 }}
    >
      {/* Dynamic outer glow */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="hero-code-panel-glow"
      />

      {/* 3D Container */}
      <motion.div
        animate={{
          y: [-3, 3, -3]
        }}
        transition={{
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
        }}
        style={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        className="hero-code-panel-body"
      >
        {/* Title bar */}
        <div className="hero-code-panel-header">
          <div className="hero-code-panel-dots">
            <span />
            <span />
            <span />
          </div>
          <span className="hero-code-panel-title">portfolio.js</span>
        </div>

        {/* Code block content */}
        <div className="hero-code-panel-content">
          <div><span style={{ color: '#60a5fa' }}>const</span> <span style={{ color: '#67e8f9' }}>Developer</span> <span style={{ color: 'rgba(255,255,255,0.5)' }}>= {'{'}</span></div>
          <div className="hero-code-panel-line-indent"><span style={{ color: '#93c5fd' }}>name</span><span style={{ color: 'rgba(255,255,255,0.5)' }}>:</span> <span style={{ color: '#6ee7b7', borderBottom: '1px solid rgba(110,231,183,0.3)' }}>"Gregor Allen"</span><span style={{ color: 'rgba(255,255,255,0.5)' }}>,</span></div>
          <div className="hero-code-panel-line-indent"><span style={{ color: '#93c5fd' }}>role</span><span style={{ color: 'rgba(255,255,255,0.5)' }}>:</span> <span style={{ color: '#6ee7b7' }}>"Software Engineer"</span><span style={{ color: 'rgba(255,255,255,0.5)' }}>,</span></div>
          <div className="hero-code-panel-line-indent"><span style={{ color: '#93c5fd' }}>passion</span><span style={{ color: 'rgba(255,255,255,0.5)' }}>:</span> <span style={{ color: '#6ee7b7' }}>"Premium Web Experiences"</span><span style={{ color: 'rgba(255,255,255,0.5)' }}>,</span></div>

          <div className="hero-code-panel-line-indent" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
            <span style={{ color: '#93c5fd', marginTop: '0.25rem' }}>skills</span><span style={{ color: 'rgba(255,255,255,0.5)', marginTop: '0.25rem' }}>: [</span>
            {skills.map((s, i) => (
              <span key={s} className="hero-code-panel-skill-badge">
                "{s}"{i < skills.length - 1 ? ',' : ''}
              </span>
            ))}
            <span style={{ color: 'rgba(255,255,255,0.5)', marginTop: '0.25rem' }}>],</span>
          </div>

          <div className="hero-code-panel-line-indent" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '0.25rem' }}>
            <span style={{ color: '#93c5fd' }}>status</span><span style={{ color: 'rgba(255,255,255,0.5)' }}>:</span>
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ color: '#34d399', fontWeight: 500 }}
            >
              "Building..."
            </motion.span>
          </div>
          <div><span style={{ color: 'rgba(255,255,255,0.5)' }}>{'}'}</span></div>
        </div>

        {/* Scan line overlay */}
        <div className="hero-code-panel-scanline">
          <div className="animate-scan hero-code-panel-scanline-bar" />
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Hero Section ────────────────────────────────────────────────
const Hero = () => {
  const heroRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Small delay to ensure background/grid is visible first
    const timer = setTimeout(() => setIsReady(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const { y, scale } = useFluidParallax(heroRef, {
    offset: ["start start", "end start"],
    yRange: [0, 120],
    scaleRange: [1, 0.9]
  });

  // Slow, premium transition variants
  const slowFadeUp = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const slowStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const slowSlideInLeft = {
    hidden: { opacity: 0, x: -100, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 2.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const slowSlideInRight = {
    hidden: { opacity: 0, x: 100, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 2.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const slowZoomIn = {
    hidden: { opacity: 0, scale: 0.8, filter: 'blur(15px)' },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }
    }
  };

  return (
    <section id="home" className="hero-section" ref={heroRef}>
      {/* Subtle radial highlights */}
      <div className="hero-radial-highlight" />

      <motion.div className="hero-container" style={{ scale, y }}>
        <div className="hero-grid">

          {/* ── LEFT COLUMN: Typography & Actions ── */}
          <motion.div
            className="hero-content"
            variants={slowStagger}
            initial="hidden"
            animate={isReady ? "visible" : "hidden"}
          >

            {/* Status Badge */}
            <motion.div
              variants={slowFadeUp}
              className="hero-badge group"
            >
              <div className="hero-badge-shine animate-shimmer" />
              <motion.span
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', backgroundColor: '#34d399', boxShadow: '0 0 10px rgba(52,211,153,0.8)' }}
              />
              <span className="hero-badge-text">Open for projects</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={slowStagger}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.025em' }}>
                <motion.span variants={slowSlideInLeft} className="hero-h1-first" style={{ display: 'block' }}>
                  Software
                </motion.span>
                <motion.span variants={slowSlideInRight} className="hero-h1-second" style={{ display: 'block' }}>
                  Engineer
                </motion.span>
              </h1>
            </motion.div>

            {/* Dynamic Typewriter */}
            <motion.div
              variants={slowFadeUp}
              className="hero-typewriter-wrapper"
            >
              <TypeWriter />
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={slowFadeUp}
              className="hero-bio"
            >
              I am a dedicated <strong className="text-white-bold">Front-end Developer</strong> and <strong className="text-white-bold">UI/UX Designer</strong> focused on building high-performance, visually stunning web experiences. With a blend of technical expertise and creative precision, I transform complex ideas into intuitive digital solutions.
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              variants={slowFadeUp}
              className="hero-actions"
            >
              <motion.a
                href="#portfolio"
                onClick={(e) => { e.preventDefault(); document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="hero-btn-primary group"
              >
                <div className="hero-btn-primary-shine" />
                <span className="hero-btn-primary-text">
                  View Projects <ExternalLink size={18} />
                </span>
              </motion.a>

              <motion.a
                href={`mailto:${personal.email}`}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(0,102,255,0.08)", borderColor: "rgba(0,212,255,0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="hero-btn-secondary"
              >
                Let's Talk <Mail size={18} />
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={slowFadeUp}
              className="hero-socials"
            >
              <div className="hero-socials-list">
                {socialLinks.map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -4, backgroundColor: "rgba(0,102,255,0.15)", borderColor: "rgba(0,212,255,0.4)", color: "#00D4FF" }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={label}
                    className="hero-social-link"
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN: 3D Illustration ── */}
          <motion.div
            variants={slowZoomIn}
            initial="hidden"
            animate={isReady ? "visible" : "hidden"}
            className="hero-right-col"
          >
            <CodePanel />
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
};

export default Hero;
