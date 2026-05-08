// src/components/About.jsx
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
  FaReact, FaGitAlt, FaFireAlt, FaShieldAlt,
  FaCode, FaLightbulb, FaGraduationCap, FaRocket,
} from 'react-icons/fa';
import {
  SiTailwindcss, SiJavascript, SiBurpsuite,
  SiOwasp, SiNodedotjs, SiMysql,
} from 'react-icons/si';
import { TbBrandVscode } from 'react-icons/tb';

/* ─── Data ─────────────────────────────────────────────────────────── */
const techStack = [
  {
    category: 'Frontend',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.2)',
    items: [
      { name: 'React', icon: FaReact, color: '#61dafb' },
      { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4' },
    ],
  },
  {
    category: 'Security',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.2)',
    items: [
      { name: 'Burp Suite', icon: SiBurpsuite, color: '#f97316' },
      { name: 'OWASP ZAP', icon: SiOwasp, color: '#ef4444' },
      { name: 'Nmap', icon: FaShieldAlt, color: '#8b5cf6' },
    ],
  },
  {
    category: 'Backend & Tools',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.2)',
    items: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#22c55e' },
      { name: 'MySQL', icon: SiMysql, color: '#0ea5e9' },
      { name: 'Firebase', icon: FaFireAlt, color: '#fb923c' },
      { name: 'Git', icon: FaGitAlt, color: '#f97316' },
      { name: 'VS Code', icon: TbBrandVscode, color: '#0078d4' },
    ],
  },
];

const skills = [
  { name: 'React / Frontend Dev', value: 82, color: '#3b82f6' },
  { name: 'Web Security / Pentest', value: 72, color: '#8b5cf6' },
  { name: 'JavaScript', value: 78, color: '#f59e0b' },
  { name: 'Linux & Networking', value: 68, color: '#10b981' },
];

const journey = [
  {
    year: '2023',
    title: 'Mulai Belajar Web Dev',
    desc: 'Memulai perjalanan dengan HTML, CSS, dan JavaScript dasar.',
    icon: FaCode,
    color: '#3b82f6',
  },
  {
    year: '2024',
    title: 'Masuk Dunia Keamanan Siber',
    desc: 'Mempelajari OWASP Top 10, Burp Suite, dan dasar-dasar penetration testing.',
    icon: FaShieldAlt,
    color: '#8b5cf6',
  },
  {
    year: '2024',
    title: 'Open Source & Komunitas',
    desc: 'Bergabung dengan 2 komunitas tech dan mulai berkontribusi di proyek open source.',
    icon: FaRocket,
    color: '#ec4899',
  },
  {
    year: '2025',
    title: 'Membangun Portofolio',
    desc: 'Mengembangkan proyek nyata dan berbagi pengetahuan melalui konten edukasi.',
    icon: FaLightbulb,
    color: '#10b981',
  },
];

/* ─── Animated Skill Bar ─────────────────────────────────────────── */
function SkillBar({ name, value, color, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>{name}</span>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color }}>
          {inView ? `${value}%` : '0%'}
        </span>
      </div>
      <div className="skill-track">
        <motion.div
          className="skill-fill"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}cc)` }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${value}%` : 0 }}
          transition={{ duration: 1.2, delay: delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

/* ─── Section Header ─────────────────────────────────────────────── */
function SectionHeader({ tag, title, subtitle }) {
  return (
    <motion.div
      className="about-header"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="about-tag">{tag}</span>
      <h2 className="about-title">{title}</h2>
      <p className="about-subtitle">{subtitle}</p>
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */
export default function About() {
  return (
    <>
      <style>{`
        /* === ABOUT SECTION === */
        #about {
          position: relative;
          padding: 6rem 0 7rem;
          background: linear-gradient(180deg, #fafbff 0%, #fff 60%, #f8f4ff 100%);
          overflow: hidden;
        }

        /* Subtle bg decoration */
        #about::before {
          content: '';
          position: absolute;
          top: -120px;
          right: -100px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        #about::after {
          content: '';
          position: absolute;
          bottom: -80px;
          left: -80px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .about-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.25rem;
          position: relative;
          z-index: 2;
        }

        /* === SECTION HEADER === */
        .about-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .about-tag {
          display: inline-block;
          background: linear-gradient(90deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1));
          border: 1px solid rgba(139,92,246,0.25);
          color: #6d28d9;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 5px 16px;
          border-radius: 20px;
          margin-bottom: 0.85rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .about-title {
          font-size: clamp(1.8rem, 4.5vw, 2.75rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
          background: linear-gradient(135deg, #1e3a8a 0%, #6d28d9 60%, #be185d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .about-subtitle {
          font-size: 1rem;
          color: #64748b;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* === TOP GRID (bio + skills) === */
        .about-top-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }
        @media (min-width: 768px) {
          .about-top-grid {
            grid-template-columns: 1.1fr 0.9fr;
            gap: 2.5rem;
          }
        }

        /* === BIO CARD === */
        .bio-card {
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.9);
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 4px 30px rgba(0,0,0,0.06);
          position: relative;
          overflow: hidden;
        }
        .bio-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
          border-radius: 24px 24px 0 0;
        }
        .bio-icon-row {
          display: flex;
          gap: 10px;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }
        .bio-icon-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .bio-icon-chip svg { font-size: 0.9rem; }
        .bio-card p {
          font-size: 0.92rem;
          color: #475569;
          line-height: 1.75;
          margin-bottom: 1rem;
        }
        .bio-card p:last-child { margin-bottom: 0; }
        .bio-card strong { color: #1e293b; font-weight: 700; }
        .bio-highlight {
          display: inline-block;
          background: linear-gradient(90deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1));
          border-radius: 4px;
          padding: 0 4px;
        }

        /* === SKILLS CARD === */
        .skills-card {
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.9);
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 4px 30px rgba(0,0,0,0.06);
          position: relative;
          overflow: hidden;
        }
        .skills-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #8b5cf6, #ec4899, #f59e0b);
          border-radius: 24px 24px 0 0;
        }
        .card-section-title {
          font-size: 1rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .card-section-title svg { color: #8b5cf6; }
        .skill-track {
          background: #f1f5f9;
          border-radius: 99px;
          height: 8px;
          overflow: hidden;
        }
        .skill-fill {
          height: 100%;
          border-radius: 99px;
        }

        /* === TECH STACK === */
        .tech-stack-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
          margin-bottom: 3rem;
        }
        @media (min-width: 640px) {
          .tech-stack-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .tech-stack-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .tech-category-card {
          border-radius: 20px;
          padding: 1.5rem;
          border: 1px solid;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .tech-category-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.1);
        }
        .tech-category-label {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 1rem;
        }
        .tech-items-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .tech-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.85);
          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 10px;
          padding: 6px 11px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #374151;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          transition: transform 0.15s, box-shadow 0.15s;
          cursor: default;
        }
        .tech-chip:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.1);
        }
        .tech-chip svg { font-size: 1rem; }

        /* === JOURNEY TIMELINE === */
        .journey-section { margin-top: 1rem; }
        .journey-title {
          text-align: center;
          font-size: clamp(1.25rem, 3vw, 1.6rem);
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 2.5rem;
          letter-spacing: -0.01em;
        }
        .timeline {
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .timeline { grid-template-columns: repeat(2, 1fr); gap: 1.75rem; }
        }
        .timeline-card {
          background: rgba(255,255,255,0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 3px 20px rgba(0,0,0,0.06);
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: default;
        }
        .timeline-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 35px rgba(0,0,0,0.1);
        }
        .timeline-icon-wrap {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          flex-shrink: 0;
        }
        .timeline-body {}
        .timeline-year {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 3px;
        }
        .timeline-item-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 4px;
        }
        .timeline-desc {
          font-size: 0.82rem;
          color: #64748b;
          line-height: 1.55;
        }
      `}</style>

      <section id="about">
        <div className="about-container">

          {/* ── Header ── */}
          <SectionHeader
            tag="Kenali Saya"
            title="Tentang Saya"
            subtitle="Developer yang percaya bahwa kode yang baik adalah kode yang cepat, indah, dan aman."
          />

          {/* ── Bio + Skills ── */}
          <div className="about-top-grid">

            {/* Bio Card */}
            <motion.div
              className="bio-card"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="bio-icon-row">
                <div className="bio-icon-chip" style={{ background: 'rgba(59,130,246,0.1)', color: '#1d4ed8' }}>
                  <FaCode /> Frontend Dev
                </div>
                <div className="bio-icon-chip" style={{ background: 'rgba(139,92,246,0.1)', color: '#6d28d9' }}>
                  <FaShieldAlt /> Security
                </div>
                <div className="bio-icon-chip" style={{ background: 'rgba(16,185,129,0.1)', color: '#065f46' }}>
                  <FaGraduationCap /> Learner
                </div>
              </div>

              <p>
                Saya seorang developer yang percaya bahwa{' '}
                <strong>
                  <span className="bio-highlight">keindahan UI harus berjalan beriringan dengan keamanan sistem</span>
                </strong>.
              </p>
              <p>
                Di sisi <strong>frontend</strong>, saya membangun antarmuka yang responsif dan intuitif menggunakan{' '}
                <strong>React</strong> dan <strong>Tailwind CSS</strong>. Di sisi <strong>keamanan</strong>, saya menguji
                kerentanan aplikasi web dan memberikan rekomendasi mitigasi yang jelas.
              </p>
              <p>
                Saat ini saya sedang mengembangkan proyek-proyek <strong>open source</strong> dan berbagi pengetahuan
                melalui konten edukasi di komunitas.
              </p>
            </motion.div>

            {/* Skills Card */}
            <motion.div
              className="skills-card"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="card-section-title">
                <FaRocket /> Skill Level
              </p>
              {skills.map((s, i) => (
                <SkillBar key={s.name} {...s} delay={0.2 + i * 0.12} />
              ))}
            </motion.div>
          </div>

          {/* ── Tech Stack ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="card-section-title" style={{ justifyContent: 'center', marginBottom: '1.5rem', fontSize: '1rem' }}>
              🛠️ &nbsp;Tech Stack Favorit
            </p>
            <div className="tech-stack-grid">
              {techStack.map((cat, ci) => (
                <motion.div
                  key={cat.category}
                  className="tech-category-card"
                  style={{ background: cat.bg, borderColor: cat.border }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: ci * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                >
                  <p className="tech-category-label" style={{ color: cat.color }}>
                    {cat.category}
                  </p>
                  <div className="tech-items-grid">
                    {cat.items.map(({ name, icon: Icon, color }) => (
                      <div key={name} className="tech-chip">
                        <Icon style={{ color }} />
                        {name}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Journey Timeline ── */}
          <motion.div
            className="journey-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="journey-title">🗺️ Perjalanan Saya</p>
            <div className="timeline">
              {journey.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    className="timeline-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -4 }}
                  >
                    <div
                      className="timeline-icon-wrap"
                      style={{
                        background: `${item.color}18`,
                        color: item.color,
                      }}
                    >
                      <Icon />
                    </div>
                    <div className="timeline-body">
                      <p className="timeline-year" style={{ color: item.color }}>
                        {item.year}
                      </p>
                      <p className="timeline-item-title">{item.title}</p>
                      <p className="timeline-desc">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}