import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Code2, Award, Layers, ExternalLink, ArrowRight, X } from 'lucide-react';
import { projects, certificates, techStack } from '../../assets/data/portfolio';
import SectionTitle from '../ui/SectionTitle';
import { staggerContainer, useFluidParallax, zoomIn, slideInDown } from '../../utils/animations';
import { useMobile } from '../../hooks';
import '../../styles/Portfolio.css';

const TABS = [
  { id: 'projects', label: 'Projects', Icon: Code2 },
  { id: 'certificates', label: 'Certificates', Icon: Award },
  { id: 'techstack', label: 'Tech Stack', Icon: Layers },
];

// ── Project Modal ──────────────────────────────────────────────
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="project-modal-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="project-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="project-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="project-modal-layout elitist-layout">
          {/* Elite Intro Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="project-modal-intro-bar"
          >
            <div className="intro-bar-left">
              <span className="intro-meta-label">Project No.</span>
              <span className="intro-meta-value">{String(project.id).padStart(3, '0')}</span>
              <div className="intro-meta-divider" />
              <span className="intro-meta-label">Status</span>
              <span className={`project-status-dot dot-${project.status.replace('-', '')}`} />
              <span className="intro-meta-value">{project.status}</span>
            </div>
          </motion.div>

          {/* Elite Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="project-modal-elite-title"
          >
            {project.title}
          </motion.h2>

          {/* Elite Hero Gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="project-modal-hero-gallery"
          >
            <div className="gallery-main-frame">
              <img src={project.image} alt={project.title} className="gallery-img" />
              <div className="gallery-vignette" />
            </div>
            <div className="gallery-tags-floating">
              {project.tags.map(tag => (
                <span key={tag} className="floating-tag">{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* Elite Technical Narrative / Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="project-modal-narrative-section"
          >
            <div className="narrative-grid">
              <div className="narrative-main-col">
                <h4 className="narrative-subtitle">Project Synopsis</h4>
                <p className="narrative-desc-lead">{project.description}</p>
                <p className="narrative-desc-full">{project.extendedDescription}</p>
              </div>

              <div className="narrative-specs-col">
                <div className="specs-elite-grid">
                  <div className="elite-spec">
                    <span className="spec-elite-label">Engineering Focus</span>
                    <p className="spec-elite-value">{project.tags[0]}</p>
                  </div>
                  <div className="elite-spec">
                    <span className="spec-elite-label">Execution Status</span>
                    <p className="spec-elite-value">{project.status === 'Deployed' ? 'Success & Live' : 'Active Prototype'}</p>
                  </div>
                  <div className="elite-spec">
                    <span className="spec-elite-label">Project Ownership</span>
                    <p className="spec-elite-value">Gregor Mondragon</p>
                  </div>
                </div>

                <div className="narrative-actions-elite">
                  {project.status === 'Deployed' && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="elite-action-btn primary">
                      <ExternalLink size={16} /> Open Experience
                    </a>
                  )}
                  <button className="elite-action-btn secondary" onClick={onClose}>
                    Close Perspective
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Project Card ─────────────────────────────────────────────
const ProjectCard = ({ project, index, onOpen }) => {
  const cardRef = useRef(null);
  const isMobile = useMobile();
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const parallaxRange = isMobile ? 10 : 40;
  const stickyY = useTransform(scrollYProgress, [0, 1], [parallaxRange, -parallaxRange]);
  const smoothStickyY = useSpring(stickyY, { stiffness: 100, damping: 20 });

  const entranceVariants = isMobile ? {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  } : {
    hidden: { opacity: 0, y: 100, rotateY: 15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={entranceVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      style={{ y: smoothStickyY, perspective: "1000px" }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="glass-card glass-card-hover project-card"
    >
      <div
        className="project-card-header"
        style={{ background: `linear-gradient(135deg, ${project.color}22 0%, ${project.color}08 100%)` }}
      >
        <div
          className="project-card-bg"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 40%, ${project.color}30 0%, transparent 55%), radial-gradient(circle at 75% 70%, ${project.color}15 0%, transparent 45%)`,
          }}
        />
        <img src={project.image} alt={project.title} className="project-card-preview-img" />

        {/* Status Badge */}
        <div className="project-status-badges">
          <span className={`project-status-badge status-${project.status.toLowerCase()}`}>
            {project.status === "Deployed" ? "● Deployed" : "○ Developing"}
          </span>
        </div>

        <div className="project-card-tags">
          {project.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="project-card-tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="project-card-body">
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-desc">
          {project.description}
        </p>

        <div className="project-card-actions">
          {project.status === 'Deployed' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-link-primary"
            >
              <ExternalLink size={12} /> Live
            </a>
          )}
          <button
            onClick={() => onOpen(project)}
            className="project-card-link-secondary"
            style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
          >
            Details <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ── Certificate Card ─────────────────────────────────────────
const CertCard = ({ cert, index }) => {
  const certRef = useRef(null);
  const isMobile = useMobile();
  
  const { scrollYProgress } = useScroll({
    target: certRef,
    offset: ["start end", "end start"]
  });

  const parallaxRange = isMobile ? 8 : 25;
  const stickyY = useTransform(scrollYProgress, [0, 1], [parallaxRange, -parallaxRange]);
  const smoothStickyY = useSpring(stickyY, { stiffness: 100, damping: 25 });

  const entranceVariants = isMobile ? {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: "easeOut" } 
    }
  } : {
    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }
    }
  };
  return (
    <motion.div
      ref={certRef}
      variants={entranceVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      style={{ y: smoothStickyY }}
      whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      className="glass-card glass-card-hover cert-card"
    >
      <div className="cert-card-num">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="cert-card-content">
        <p className="cert-card-title">{cert.title}</p>
        <p className="cert-card-meta">
          {cert.issuer} · {cert.year}
        </p>
      </div>
      <Award size={15} className="cert-card-icon" />
    </motion.div>
  );
};

// ── Tech Card ────────────────────────────────────────────────
const TechCard = ({ tech, index }) => {
  const techRef = useRef(null);
  const isMobile = useMobile();
  
  const { scrollYProgress } = useScroll({
    target: techRef,
    offset: ["start end", "end start"]
  });

  // Performance: Disable parallax calculation for tech icons on mobile
  const parallaxRange = isMobile ? 0 : 15;
  const stickyY = useTransform(scrollYProgress, [0, 1], [parallaxRange, -parallaxRange]);
  const smoothStickyY = useSpring(stickyY, { stiffness: 120, damping: 30 });

  return (
    <motion.div
      ref={techRef}
      variants={zoomIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      custom={index * 0.05}
      style={{ y: smoothStickyY }}
      whileHover={{ y: -8, scale: 1.1, rotate: 2 }}
      className="glass-card glass-card-hover tech-card"
    >
      <div className="tech-card-icon-wrapper">
        <div className="tech-card-glow" />
        <img
          src={tech.icon}
          alt={tech.name}
          className="tech-card-icon"
          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
        />
        <div style={{ display: 'none' }}><Code2 size={24} color="var(--primary)" /></div>
      </div>
      <span className="tech-card-name">{tech.name}</span>
    </motion.div>
  );
};

// ── Portfolio ────────────────────────────────────────────────
const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [activeProject, setActiveProject] = useState(null);
  const sectionRef = useRef(null);

  const { y: containerY, scale } = useFluidParallax(sectionRef, {
    offset: ["start start", "end start"],
    yRange: [0, 100],
    scaleRange: [1, 0.92]
  });

  return (
    <section id="portfolio" className="portfolio-section" ref={sectionRef}>
      <motion.div className="portfolio-container" style={{ y: containerY, scale }}>
        <SectionTitle
          title="Portfolio"
          highlight="Showcase"
          subtitle="Explore my journey through projects, certifications, and technical expertise. Each section represents a milestone in my continuous learning path."
          center
          withGlow
        />

        {/* Enhanced Tab bar (Sub-Navbar) */}
        <div className="portfolio-tabs-nav">
          <div className="portfolio-tabs-container">
            {TABS.map(({ id, label, Icon }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`portfolio-tab-btn-elite ${isActive ? 'active' : ''}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="tab-highlight"
                      className="portfolio-tab-highlight"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="portfolio-tab-label-elite">
                    <Icon size={14} className="tab-icon-elite" />
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab content */}
        <div className="portfolio-content-area-elite">
          <AnimatePresence mode="wait">
            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="portfolio-projects-grid"
              >
                {projects.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} onOpen={setActiveProject} />
                ))}
              </motion.div>
            )}

            {activeTab === 'certificates' && (
              <motion.div
                key="certificates"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="portfolio-certs-grid"
              >
                {certificates.map((cert, i) => (
                  <CertCard key={cert.title} cert={cert} index={i} />
                ))}
              </motion.div>
            )}

            {activeTab === 'techstack' && (
              <motion.div
                key="techstack"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="tech-stack-organized"
              >
                {techStack.map((group) => (
                  <div key={group.category} className="tech-category-section-elite">
                    <div className="tech-category-header-centered">
                      <div className="tech-category-separator" />
                      <h3 className="tech-category-title-elite">{group.category}</h3>
                      <div className="tech-category-separator" />
                    </div>
                    <div className="portfolio-tech-grid-elite">
                      {group.techs.map((tech, i) => (
                        <TechCard key={tech.name} tech={tech} index={i} />
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Project Expansion Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
