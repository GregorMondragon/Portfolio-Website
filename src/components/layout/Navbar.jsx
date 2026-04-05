import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveSection } from '../../hooks';
import { navLinks, personal } from '../../assets/data/portfolio';
import { Menu, X, Sparkles } from 'lucide-react';
import '../../styles/Navbar.css';

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
                <Sparkles size={16} className="ai-sparkle-icon" />
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
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mobile-menu-overlay"
          >
            <nav className="mobile-menu-nav">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                    onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                    className={`mobile-menu-link ${isActive ? 'active' : ''}`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="mobileActiveIndicator"
                        className="mobile-menu-active-indicator"
                      />
                    )}
                    {link.label}
                  </motion.a>
                );
              })}

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mobile-menu-ai-wrapper"
              >
                <button
                  onClick={() => { setMenuOpen(false); onChatToggle(); }}
                  className="mobile-menu-ai-btn"
                >
                  <Sparkles size={18} />
                  <span>Talk to AI Assistant</span>
                </button>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mobile-menu-cta-wrapper"
              >
                <a href={`mailto:${personal.email}`} className="mobile-menu-cta group">
                  <div className="mobile-menu-cta-shine" />
                  <span className="mobile-menu-cta-dot" />
                  Available for hire
                </a>
              </motion.div>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mobile-menu-footer"
            >
              <div className="mobile-menu-footer-content">
                <span className="mobile-menu-footer-line" />
                <span>DevGreg Portfolio</span>
                <span className="mobile-menu-footer-line" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
