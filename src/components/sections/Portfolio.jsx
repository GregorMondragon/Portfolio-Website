import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Award, Layers, ExternalLink, ArrowRight } from 'lucide-react';
import { projects, certificates, techStack } from '../../assets/data/portfolio';
import GlowOrbs from '../ui/GlowOrbs';
import SectionTitle from '../ui/SectionTitle';
import { staggerContainer, staggerItem, useFluidParallax, zoomIn, slideInDown } from '../../utils/animations';
import '../../styles/Portfolio.css';

const TABS = [
  { id: 'projects', label: 'Projects', Icon: Code2 },
  { id: 'certificates', label: 'Certificates', Icon: Award },
  { id: 'techstack', label: 'Tech Stack', Icon: Layers },
];

// ── Project Card ─────────────────────────────────────────────
const ProjectCard = ({ project, index }) => (
  <motion.div
    variants={zoomIn} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} custom={index * 0.1}
    whileHover={{ y: -6 }}
    className="glass-card glass-card-hover project-card"
  >
    {/* Color header */}
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
      {/* Big letter */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="project-card-letter"
          style={{ color: `${project.color}18` }}
        >
          {project.title.charAt(0)}
        </span>
      </div>
      {/* Tags overlay */}
      <div className="project-card-tags">
        {project.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="project-card-tag">{tag}</span>
        ))}
      </div>
      {project.featured && (
        <span className="project-card-featured">★ featured</span>
      )}
    </div>

    <div className="project-card-body">
      <h3 className="project-card-title">{project.title}</h3>
      <p className="project-card-desc">
        {project.description}
      </p>

      {/* Actions */}
      <div className="project-card-actions">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card-link-primary"
        >
          <ExternalLink size={12} /> Live Demo
        </a>
        <a
          href={project.detailUrl}
          className="project-card-link-secondary"
        >
          Details <ArrowRight size={12} />
        </a>
      </div>
    </div>
  </motion.div>
);

// ── Certificate Card ─────────────────────────────────────────
const CertCard = ({ cert, index }) => (
  <motion.div
    variants={zoomIn} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} custom={index * 0.1}
    whileHover={{ x: 5 }}
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

// ── Tech Card ────────────────────────────────────────────────
const TechCard = ({ tech, index }) => (
  <motion.div
    variants={zoomIn} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} custom={index * 0.1}
    whileHover={{ y: -8, scale: 1.06 }}
    className="glass-card glass-card-hover tech-card"
  >
    <div className="tech-card-icon-wrapper">
      <div className="tech-card-glow" />
      <img
        src={tech.icon}
        alt={tech.name}
        className="tech-card-icon"
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    </div>
    <span className="tech-card-name">{tech.name}</span>
  </motion.div>
);

// ── Portfolio ────────────────────────────────────────────────
const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const sectionRef = useRef(null);
  const { y, scale } = useFluidParallax(sectionRef, {
    offset: ["start start", "end start"],
    yRange: [0, 80],
    scaleRange: [1, 0.95]
  });

  return (
    <section id="portfolio" className="portfolio-section" ref={sectionRef}>
      <motion.div className="portfolio-container" style={{ y, scale }}>
        <SectionTitle
          title="Portfolio"
          highlight="Showcase"
          subtitle="Explore my journey through projects, certifications, and technical expertise. Each section represents a milestone in my continuous learning path."
        />

        {/* Tab bar */}
        <motion.div
          variants={slideInDown} initial="hidden" whileInView="visible" viewport={{ once: false }}
          className="portfolio-tabs-wrapper"
        >
          {TABS.map(({ id, label, Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="portfolio-tab-btn"
                style={{ color: isActive ? 'white' : 'var(--text-muted)' }}
              >
                {isActive && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,102,255,0.5), rgba(0,80,200,0.35))',
                      border: '1px solid rgba(0,102,255,0.4)',
                      boxShadow: '0 0 20px rgba(0,102,255,0.2)',
                    }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="portfolio-tab-btn-content">
                  <Icon size={14} />
                  {label}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="portfolio-projects-grid"
              >
                {projects.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'certificates' && (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="portfolio-certs-grid"
              >
                {certificates.map((cert, i) => (
                  <CertCard key={cert.title} cert={cert} index={i} />
                ))}
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'techstack' && (
            <motion.div
              key="techstack"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="portfolio-tech-grid"
              >
                {techStack.map((tech, i) => (
                  <TechCard key={tech.name} tech={tech} index={i} />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Portfolio;
