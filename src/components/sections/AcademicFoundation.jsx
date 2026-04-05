import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { academic } from '../../assets/data/portfolio';
import SectionTitle from '../ui/SectionTitle';
import { Code2, Database, Layers, Activity, GraduationCap } from 'lucide-react';
import { fadeUp, staggerContainer, zoomIn, useFluidParallax } from '../../utils/animations';
import '../../styles/AcademicFoundation.css';

const iconMap = {
  code: Code2,
  database: Database,
  layers: Layers,
  activity: Activity,
};

const TimelineItem = ({ item, index, containerScroll }) => {
  const itemRef = useRef(null);
  const Icon = iconMap[item.icon] || GraduationCap;
  const isRight = index % 2 !== 0;

  // Individual scroll-based sticky effect
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  });

  // Sticky-feel vertical offset: moves slightly slower/faster than scroll
  const stickyY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const smoothStickyY = useSpring(stickyY, { stiffness: 100, damping: 20 });

  return (
    <motion.div
      ref={itemRef}
      className={`timeline-item ${isRight ? 'right' : 'left'}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      style={{ y: smoothStickyY }}
    >
      <div className="timeline-dot-wrapper">
        <motion.div 
          className="timeline-dot"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20, 
            delay: 0.1 
          }}
        />
      </div>

      <motion.div 
        className="timeline-content-card shadow-premium"
        variants={isRight ? {
          hidden: { opacity: 0, x: 100, rotateY: 20 },
          visible: { 
            opacity: 1, 
            x: 0, 
            rotateY: 0,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
          }
        } : {
          hidden: { opacity: 0, x: -100, rotateY: -20 },
          visible: { 
            opacity: 1, 
            x: 0, 
            rotateY: 0,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
          }
        }}
      >
        <div className="timeline-header">
          <motion.div 
            className="timeline-icon-box"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Icon size={20} />
          </motion.div>
          <span className="timeline-year-badge">{item.year}</span>
        </div>

        <h3 className="timeline-title">{item.title}</h3>
        <span className="timeline-focus">{item.focus}</span>

        <div className="timeline-body">
          {item.concepts && (
            <div className="timeline-info-group">
              <span className="info-label">Key Concepts</span>
              <p className="info-value">{item.concepts.join(', ')}</p>
            </div>
          )}

          {item.stack && (
            <div className="timeline-info-group">
              <span className="info-label">Tech Stack</span>
              <div className="stack-tags">
                {item.stack.map(tech => (
                  <motion.span 
                    key={tech} 
                    className="stack-tag"
                    whileHover={{ backgroundColor: "rgba(124, 58, 237, 0.2)", color: "#fff" }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {item.project && (
            <div className="timeline-info-group">
              <span className="info-label">Major Project</span>
              <p className="info-value">{item.project}</p>
            </div>
          )}

          {item.deepDives && (
            <div className="timeline-info-group">
              <span className="info-label">Deep Dives</span>
              <p className="info-value">{item.deepDives.join(', ')}</p>
            </div>
          )}

          {item.goal && (
            <div className="timeline-info-group">
              <span className="info-label">Primary Goal</span>
              <p className="info-value">{item.goal}</p>
            </div>
          )}

          {item.status && (
            <motion.span 
              className="timeline-status"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {item.status}
            </motion.span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const AcademicFoundation = () => {
  const sectionRef = useRef(null);
  
  // Fluid Parallax Shrink for the whole section
  const { y, scale } = useFluidParallax(sectionRef, {
    offset: ["start start", "end start"],
    yRange: [0, 100],
    scaleRange: [1, 0.92]
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  const lineScaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="academic" className="academic-section" ref={sectionRef}>
      <motion.div className="academic-container" style={{ y, scale }}>
        <SectionTitle
          title="Academic"
          highlight="Foundation"
          subtitle="Education and technical growth journey"
          center
          withGlow
        />

        <motion.div 
          className="academic-identity-block shadow-premium"
          variants={zoomIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          <h2 className="academic-degree">{academic.degree}</h2>
          <h3 className="academic-major">{academic.major}</h3>
          <p className="academic-institution">{academic.institution}</p>
          <p className="academic-period">{academic.period}</p>
        </motion.div>

        <div className="timeline-wrapper">
          <motion.div 
            className="timeline-line" 
            style={{ scaleY: lineScaleY, transformOrigin: "top" }}
          />
          
          <div className="timeline-items">
            {academic.timeline.map((item, index) => (
              <TimelineItem 
                key={item.id} 
                item={item} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AcademicFoundation;
