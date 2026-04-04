import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { personal } from '../../assets/data/portfolio';
import GlowOrbs from '../ui/GlowOrbs';
import SectionTitle from '../ui/SectionTitle';
import { slideInLeft, slideInRight, useFluidParallax, staggerContainer, fadeUp } from '../../utils/animations';
import '../../styles/Contact.css';

// ── Social icons ─────────────────────────────────────────────
const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const socialLinks = [
  { Icon: GithubIcon, href: personal.links.github, label: 'GitHub' },
  { Icon: LinkedinIcon, href: personal.links.linkedin, label: 'LinkedIn' },
  { Icon: InstagramIcon, href: personal.links.instagram, label: 'Instagram' },
];

// ── Contact ──────────────────────────────────────────────────
const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise((r) => setTimeout(r, 1800));
    setStatus('sent');
    setTimeout(() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }); }, 3000);
  };

  const sectionRef = useRef(null);
  const { y, scale } = useFluidParallax(sectionRef, {
    offset: ["start start", "end start"],
    yRange: [0, 80],
    scaleRange: [1, 0.95]
  });

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <motion.div className="contact-container" style={{ y, scale }}>
        <SectionTitle
          title="Contact"
          highlight="Me"
          subtitle="Have a project in mind or just want to say hi? My inbox is always open."
        />

        <div className="contact-grid">

          {/* ── Left ── */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            custom={0}
            className="contact-left-col"
          >
            <div>
              <h3 className="contact-header-title">Let's work together</h3>
              <p className="contact-header-desc">
                I'm always looking for exciting new projects. Whether you need a website, a web app, or just want to collaborate — feel free to reach out!
              </p>
            </div>

            {/* Contact info */}
            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-info-icon email">
                  <Mail size={15} color="var(--accent)" />
                </div>
                <div>
                  <p className="contact-info-label">Email</p>
                  <a href={`mailto:${personal.email}`} className="contact-info-value">{personal.email}</a>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon location">
                  <MapPin size={15} color="var(--accent)" />
                </div>
                <div>
                  <p className="contact-info-label">Location</p>
                  <p className="contact-info-value">{personal.location}</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div>
              <p className="contact-social-label">Find me on</p>
              <div className="contact-social-list">
                {socialLinks.map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={label}
                    className="contact-social-link"
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="contact-avail-card"
            >
              <div className="contact-avail-header">
                <span className="contact-avail-dot animate-pulse" />
                <span className="contact-avail-label">Available for work</span>
              </div>
              <p className="contact-avail-desc">
                Open to freelance projects, internships, or full-time opportunities.
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right form ── */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            custom={0}
            className="contact-form-col"
          >
            <motion.form
              variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: false }}
              onSubmit={handleSubmit} className="contact-form"
            >
              <div className="contact-form-row">
                <motion.div variants={fadeUp}>
                  <label className="contact-input-label">Your Name</label>
                  <input
                    className="contact-input"
                    type="text" name="name" placeholder="John Doe"
                    value={form.name} onChange={handleChange} required
                  />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <label className="contact-input-label">Email Address</label>
                  <input
                    className="contact-input"
                    type="email" name="email" placeholder="hello@example.com"
                    value={form.email} onChange={handleChange} required
                  />
                </motion.div>
              </div>
              <motion.div variants={fadeUp}>
                <label className="contact-input-label">Subject</label>
                <input
                  className="contact-input"
                  type="text" name="subject" placeholder="Project inquiry..."
                  value={form.subject} onChange={handleChange}
                />
              </motion.div>
              <motion.div variants={fadeUp}>
                <label className="contact-input-label">Message</label>
                <textarea
                  className="contact-input contact-textarea"
                  name="message" placeholder="Tell me about your project..."
                  value={form.message} onChange={handleChange} required
                />
              </motion.div>
              <motion.button
                variants={fadeUp}
                type="submit"
                disabled={status !== 'idle'}
                whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                className="contact-submit-btn"
                style={{
                  background: status === 'sent'
                    ? 'linear-gradient(135deg, #059669, #047857)'
                    : 'linear-gradient(135deg, var(--primary) 0%, #0052CC 50%, #003D99 100%)',
                  opacity: status === 'sending' ? 0.8 : 1,
                  boxShadow: status === 'idle' ? '0 0 30px rgba(0,102,255,0.3)' : 'none',
                }}
              >
                {status === 'idle' && <><Send size={15} /> Send Message</>}
                {status === 'sending' && <><Loader2 size={15} className="animate-spin" /> Sending...</>}
                {status === 'sent' && <><CheckCircle2 size={15} /> Message Sent!</>}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
