import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveSection } from '../../hooks';
import { navLinks, personal } from '../../assets/data/portfolio';
import { Menu, X, ArrowRight, ArrowLeft, Code2, Globe, Mail, Zap } from 'lucide-react';
import '../../styles/Navbar.css';

// ── Social Icon SVGs (Lucide v1.7 doesn't have brands) ────────────────
const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);
const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const Navbar = ({ onChatToggle }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(['home', 'about', 'portfolio', 'contact']);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="navbar-header"
      >
        <div className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNav('#home'); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="navbar-logo"
          >
            <div className="navbar-logo-icon">
              <img src="/Images/LogoDevGreg.png" alt="DevGreg Logo" className="navbar-logo-img" />
            </div>
            <span className="navbar-logo-text">
              Dev<span className="navbar-logo-highlight">Greg</span>
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="navbar-desktop-nav">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                  className="navbar-link"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="navbar-link-active-bg"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className={`navbar-link-text ${isActive ? 'active' : ''}`}>
                    {link.label}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="navbar-actions">
            {/* AI Assistant Wrapper (Synchronized Hover) */}
            <motion.div
              initial="initial"
              whileHover="hover"
              className="navbar-ai-wrapper"
            >
              <motion.span 
                variants={{
                  initial: { x: 20, opacity: 0 },
                  hover: { x: 0, opacity: 1 }
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="ai-btn-text"
              >
                gregbot
              </motion.span>
              
              <motion.button
                onClick={onChatToggle}
                whileTap={{ scale: 0.9 }}
                className="navbar-ai-icon-btn"
                aria-label="Toggle gregbot AI"
              >
                <Zap size={16} className="ai-sparkle-icon" />
                <div className="ai-icon-glow" />
              </motion.button>
            </motion.div>

            {/* CTA */}
            <motion.a
              href={`mailto:${personal.email}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="navbar-cta group"
            >
              <div className="navbar-cta-shine" />
              <span className="navbar-cta-dot" />
              <span className="navbar-cta-text">Available</span>
            </motion.a>

            {/* Mobile hamburger */}
            <button
              className="navbar-mobile-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {menuOpen
                  ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={20} color="#fff" /></motion.div>
                  : <motion.div key="men" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={20} color="#fff" /></motion.div>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mobile-menu-overlay"
          >
            <div className="mobile-menu-glass" />
            <div className="mobile-menu-bg-glow-center" />
            
            <div className="mobile-menu-content-centered">
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="mobile-menu-header-centered"
              >
                <span className="mobile-menu-label-architect">NAVIGATION</span>
                <div className="label-dots" />
              </motion.div>

              <nav className="mobile-menu-nav-centered">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      transition={{ delay: 0.1 + index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                      className={`mobile-menu-link-pill ${isActive ? 'active' : ''}`}
                    >
                      <span className="link-text-minimal">{link.label}</span>
                      {isActive && (
                        <motion.div 
                          layoutId="mobileActiveIndicatorCenter"
                          className="link-active-glow"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.a>
                  );
                })}

                {/* Back Button */}
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  onClick={() => setMenuOpen(false)}
                  className="mobile-menu-back-btn"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Site</span>
                </motion.button>
              </nav>

              <div className="mobile-menu-footer-hub">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="social-hub-centered"
                >
                  <div className="social-links-row-centered">
                    <a href={personal.links.github} target="_blank" rel="noopener noreferrer" className="social-link-item-hub"><GithubIcon /></a>
                    <a href={personal.links.linkedin} target="_blank" rel="noopener noreferrer" className="social-link-item-hub"><LinkedinIcon /></a>
                    <a href={personal.links.facebook} target="_blank" rel="noopener noreferrer" className="social-link-item-hub"><FacebookIcon /></a>
                    <a href={personal.links.instagram} target="_blank" rel="noopener noreferrer" className="social-link-item-hub"><InstagramIcon /></a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mobile-actions-hub-vertical"
                >
                  <button
                    onClick={() => { setMenuOpen(false); onChatToggle(); }}
                    className="hub-action-btn-ai-full glow-box-primary"
                  >
                    <Zap size={14} className="sparkle-primary" />
                    <span>Chat with GregBot</span>
                  </button>
                  
                  <a href={`mailto:${personal.email}`} className="hub-action-btn-hire-full btn-shimmer-lite">
                    <span>Available for Projects</span>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
