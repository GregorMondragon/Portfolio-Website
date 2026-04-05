import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Code2, Award, Globe, Download, ArrowUpRight } from 'lucide-react';
import { personal, stats } from '../../assets/data/portfolio';
import GlowOrbs from '../ui/GlowOrbs';
import SectionTitle from '../ui/SectionTitle';
import { useTilt } from '../../hooks';
import { staggerContainer, zoomIn, fadeUp, useFluidParallax, slideInLeft, slideInRight } from '../../utils/animations';
import '../../styles/About.css';

const iconMap = { code: Code2, award: Award, globe: Globe };

const StatCard = ({ stat, index }) => {
  const { tilt, onMouseMove, onMouseLeave } = useTilt(15);
  const Icon = iconMap[stat.icon] || Code2;

  return (
    <motion.div
      variants={zoomIn}
      custom={0.2 + index * 0.15}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="concept-stat-card"
      style={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        perspective: '1000px',
      }}
    >
      <div className="stat-icon-box">
        <Icon size={24} />
      </div>

      <div className="stat-number-big">
        {stat.value.replace('+', '')}
      </div>

      <div className="stat-label-group">
        <span className="stat-main-label">{stat.label}</span>
        <span className="stat-sub-label">{stat.description}</span>
      </div>

      <div className="stat-card-arrow">
        <ArrowUpRight size={20} />
      </div>
    </motion.div>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const { y, scale } = useFluidParallax(sectionRef, {
    offset: ["start start", "end start"],
    yRange: [0, 80],
    scaleRange: [1, 0.95]
  });

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <motion.div className="about-container" style={{ y, scale }}>
        <SectionTitle
          title="About Me"
          subtitle="Transforming ideas into digital experiences"
          withGlow
          center
        />

        <motion.div 
          className="about-top-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {/* Left Bio Content - Synchronized Stagger */}
          <motion.div 
            className="about-bio-content" 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <motion.h4 className="about-hello" variants={slideInLeft}>
              Hello, I'm
            </motion.h4>
            
            <motion.h2 className="about-name" variants={slideInRight}>
              {personal.name.split(' ')[0]} {personal.name.split(' ').slice(1).join(' ')}
            </motion.h2>
            
            <motion.p className="about-description" variants={fadeUp}>
              {personal.bio}
            </motion.p>
            
            <motion.div className="about-buttons" variants={zoomIn}>
              <motion.a 
                href="#" 
                className="button button-primary"
                whileHover={{ y: -3, boxShadow: '0 10px 20px rgba(124, 58, 237, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={18} /> Download CV
              </motion.a>
              <motion.a 
                href="#portfolio" 
                className="button button-outline"
                whileHover={{ y: -3, background: 'rgba(255,255,255,0.05)' }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Code2 size={18} /> View Projects
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Avatar Content */}
          <motion.div 
            className="about-avatar-container"
            variants={zoomIn}
            custom={0.3}
          >
            <div className="about-avatar-glow" />
            <div className="about-avatar-circle">
              <img 
                src="/Images/GregorDP.jpg" 
                alt={personal.name} 
                className="about-avatar-image" 
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="about-stats-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
