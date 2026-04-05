import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/animations';
import '../../styles/UI.css';

const SectionTitle = ({ 
  eyebrow, 
  title, 
  highlight, 
  subtitle, 
  center = true, 
  compact = false,
  withGlow = false 
}) => {
  return (
    <div className={`section-title-wrapper ${center ? 'center' : ''}`} style={{ position: 'relative' }}>
      {withGlow && <div className="premium-title-glow" />}
      
      {eyebrow && (
        <motion.p
          className="section-eyebrow section-eyebrow-text"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          custom={0}
        >
          {eyebrow}
        </motion.p>
      )}
      <div className="section-header-container">
        <motion.div 
          className="section-header-line left"
          initial={{ scaleX: 0, originX: 1 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />
        
        <motion.h2
          className={`section-heading ${compact ? 'compact' : ''}`}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          custom={0.2}
        >
          {title}{' '}
          {highlight && (
            <span className="glow-text-primary" style={{ color: 'var(--accent)' }}>
              {highlight}
            </span>
          )}
        </motion.h2>

        <motion.div 
          className="section-header-line right"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />
      </div>
      {subtitle && (
        <motion.p
          className="section-subtitle"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          custom={0.4}
        >
          <span className="section-subtitle-content">
            {subtitle}
          </span>
        </motion.p>
      )}
    </div>
  );
};

export default SectionTitle;
