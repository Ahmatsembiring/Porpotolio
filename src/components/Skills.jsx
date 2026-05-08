// src/components/Skills.jsx
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  FaCode, FaShieldAlt, FaReact, FaGitAlt,
  FaFireAlt, FaCheck, FaTerminal, FaNetworkWired,
} from 'react-icons/fa';
import {
  SiJavascript, SiTailwindcss, SiNodedotjs,
  SiMysql, SiBurpsuite, SiOwasp,
  SiVercel, SiFirebase,
} from 'react-icons/si';
import { TbBrandVscode } from 'react-icons/tb';

/* ─── Data ─────────────────────────────────────────────────────────── */
const categories = [
  {
    id: 'webdev',
    label: 'Web Development',
    icon: FaCode,
    gradient: 'linear-gradient(135deg, #3b82f6, #6d28d9)',
    glow: 'rgba(59,130,246,0.25)',
    accent: '#3b82f6',
    accentSoft: 'rgba(59,130,246,0.08)',
    accentBorder: 'rgba(59,130,246,0.2)',
    description: 'Membangun antarmuka modern, responsif, dan berperforma tinggi.',
    skills: [
      { name: 'React', icon: FaReact, color: '#61dafb', level: 82 },
      { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e', level: 78 },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4', level: 85 },
      { name: 'Node.js', icon: SiNodedotjs, color: '#22c55e', level: 65 },
      { name: 'MySQL', icon: SiMysql, color: '#0ea5e9', level: 60 },
      { name: 'Firebase', icon: SiFirebase, color: '#fb923c', level: 70 },
      { name: 'Vercel', icon: SiVercel, color: '#000000', level: 75 },
      { name: 'Git', icon: FaGitAlt, color: '#f97316', level: 80 },
    ],
    highlights: [
      'UI/UX responsif & intuitif',
      'Integrasi REST API & state management',
      'Deployment via Firebase & Vercel',
      'Component-driven development',
    ],
  },
  {
    id: 'security',
    label: 'Cyber Security',
    icon: FaShieldAlt,
    gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    glow: 'rgba(139,92,246,0.25)',
    accent: '#8b5cf6',
    accentSoft: 'rgba(139,92,246,0.08)',
    accentBorder: 'rgba(139,92,246,0.2)',
    description: 'Mengidentifikasi kerentanan dan memperkuat keamanan aplikasi web.',
    skills: [
      { name: 'Burp Suite', icon: SiBurpsuite, color: '#f97316', level: 72 },
      { name: 'OWASP ZAP', icon: SiOwasp, color: '#ef4444', level: 68 },
      { name: 'Nmap', icon: FaNetworkWired, color: '#8b5cf6', level: 65 },
      { name: 'Linux / Bash', icon: FaTerminal, color: '#22c55e', level: 70 },
      { name: 'VS Code', icon: TbBrandVscode, color: '#0078d4', level: 90 },
    ],
    highlights: [
      'Ethical hacking & penetration testing',
      'Pengujian XSS, SQLi, CSRF, IDOR',
      'Analisis kerentanan & mitigasi',
      'Laporan keamanan profesional',
    ],
  },
];

/* ─── Circular Progress ─────────────────────────────────────────── */
function CircleProgress({ value, color, size = 56 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const dash = inView ? circ - (value / 100) * circ : circ;

  return (
    <svg ref={ref} width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f1f5f9" strokeWidth={5} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: dash }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      />
    </svg>
  );
}

/* ─── Skill Chip ────────────────────────────────────────────────── */
function SkillChip({ skill, accent, delay }) {
  const Icon = skill.icon;
  return (
    <motion.div
      className="skill-chip"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, scale: 1.04 }}
    >
      <div className="skill-chip-top">
        <CircleProgress value={skill.level} color={accent} size={50} />
        <div className="skill-chip-icon" style={{ color: skill.color }}>
          <Icon />
        </div>
      </div>
      <p className="skill-chip-name">{skill.name}</p>
      <p className="skill-chip-level" style={{ color: accent }}>{skill.level}%</p>
    </motion.div>
  );
}

/* ─── Main ──────────────────────────────────────────────────────── */
export default function Skills() {
  const [active, setActive] = useState('webdev');
  const cat = categories.find((c) => c.id === active);
  const CatIcon = cat.icon;

  return (
    <>
      <style>{`
        /* === SKILLS SECTION === */
        #skills {
          position: relative;
          padding: 6rem 0 7rem;
          background: linear-gradient(180deg, #f8f4ff 0%, #f0f4ff 50%, #fafbff 100%);
          overflow: hidden;
        }
        #skills::before {
          content: '';
          position: absolute;
          top: -80px; right: -100px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        #skills::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -80px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .skills-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.25rem;
          position: relative;
          z-index: 2;
        }

        /* === HEADER === */
        .skills-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .skills-tag {
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
        .skills-title {
          font-size: clamp(1.8rem, 4.5vw, 2.75rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
          background: linear-gradient(135deg, #1e3a8a, #6d28d9, #be185d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .skills-subtitle {
          font-size: 1rem;
          color: #64748b;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* === TAB SWITCHER === */
        .tab-row {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }
        .tab-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
          outline: none;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .tab-btn.inactive {
          background: rgba(255,255,255,0.75);
          color: #64748b;
          border: 1.5px solid rgba(0,0,0,0.08);
          backdrop-filter: blur(8px);
        }
        .tab-btn.inactive:hover {
          border-color: rgba(139,92,246,0.3);
          color: #6d28d9;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }
        .tab-btn.active {
          color: #fff;
          border: 1.5px solid transparent;
          box-shadow: 0 6px 24px rgba(0,0,0,0.18);
        }
        .tab-btn svg { font-size: 0.9rem; }

        /* === MAIN CARD === */
        .main-card {
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 28px;
          padding: 2.25rem;
          box-shadow: 0 8px 40px rgba(0,0,0,0.07);
          position: relative;
          overflow: hidden;
          margin-bottom: 2rem;
        }
        .main-card-accent-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          border-radius: 28px 28px 0 0;
        }

        /* === CARD TOP ROW === */
        .card-top {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        @media (min-width: 640px) {
          .card-top { flex-direction: row; align-items: flex-start; justify-content: space-between; }
        }
        .card-top-left {}
        .cat-icon-wrap {
          width: 54px;
          height: 54px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          color: #fff;
          margin-bottom: 0.85rem;
          flex-shrink: 0;
        }
        .cat-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 0.3rem;
          letter-spacing: -0.01em;
        }
        .cat-desc {
          font-size: 0.87rem;
          color: #64748b;
          max-width: 380px;
          line-height: 1.55;
        }

        /* Highlights list */
        .highlights-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          min-width: 220px;
        }
        .highlight-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: #475569;
          font-weight: 500;
        }
        .highlight-check {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          color: #fff;
          flex-shrink: 0;
        }

        /* === SKILL CHIPS GRID === */
        .chips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 1rem;
        }
        @media (min-width: 480px) {
          .chips-grid { grid-template-columns: repeat(auto-fill, minmax(115px, 1fr)); }
        }

        .skill-chip {
          background: rgba(255,255,255,0.85);
          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 18px;
          padding: 1rem 0.75rem 0.85rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          cursor: default;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          transition: box-shadow 0.2s;
        }
        .skill-chip:hover {
          box-shadow: 0 8px 28px rgba(0,0,0,0.1);
        }
        .skill-chip-top {
          position: relative;
          width: 50px;
          height: 50px;
          margin-bottom: 6px;
        }
        .skill-chip-icon {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }
        .skill-chip-name {
          font-size: 0.73rem;
          font-weight: 700;
          color: #1e293b;
          text-align: center;
          line-height: 1.2;
        }
        .skill-chip-level {
          font-size: 0.68rem;
          font-weight: 600;
        }

        /* === BOTTOM STATS ROW === */
        .bottom-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .bottom-stats { grid-template-columns: repeat(4, 1fr); }
        }
        .stat-pill {
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 18px;
          padding: 1.25rem 1rem;
          text-align: center;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: default;
        }
        .stat-pill:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .stat-pill-icon {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .stat-pill-value {
          font-size: 1.5rem;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 2px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .stat-pill-label {
          font-size: 0.72rem;
          color: #94a3b8;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      `}</style>

      <section id="skills">
        <div className="skills-container">

          {/* ── Header ── */}
          <motion.div
            className="skills-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="skills-tag">⚡ Keahlian</span>
            <h2 className="skills-title">Keahlian Saya</h2>
            <p className="skills-subtitle">
              Dua domain utama yang saya kuasai — Web Development &amp; Cyber Security.
            </p>
          </motion.div>

          {/* ── Tab Switcher ── */}
          <motion.div
            className="tab-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {categories.map((c) => {
              const Icon = c.icon;
              const isActive = c.id === active;
              return (
                <motion.button
                  key={c.id}
                  className={`tab-btn ${isActive ? 'active' : 'inactive'}`}
                  style={isActive ? { background: c.gradient } : {}}
                  onClick={() => setActive(c.id)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Icon />
                  {c.label}
                </motion.button>
              );
            })}
          </motion.div>

          {/* ── Main Card (animated key change) ── */}
          <motion.div
            key={active}
            className="main-card"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top accent bar */}
            <div className="main-card-accent-bar" style={{ background: cat.gradient }} />

            {/* Card Top */}
            <div className="card-top">
              <div className="card-top-left">
                <div className="cat-icon-wrap" style={{ background: cat.gradient, boxShadow: `0 8px 24px ${cat.glow}` }}>
                  <CatIcon />
                </div>
                <p className="cat-title">{cat.label}</p>
                <p className="cat-desc">{cat.description}</p>
              </div>

              <div className="highlights-list">
                {cat.highlights.map((h, i) => (
                  <motion.div
                    key={h}
                    className="highlight-item"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                  >
                    <div className="highlight-check" style={{ background: cat.gradient }}>
                      <FaCheck />
                    </div>
                    {h}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skill Chips */}
            <div className="chips-grid">
              {cat.skills.map((skill, i) => (
                <SkillChip key={skill.name} skill={skill} accent={cat.accent} delay={i * 0.07} />
              ))}
            </div>
          </motion.div>

          {/* ── Bottom Stats ── */}
          <motion.div
            className="bottom-stats"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {[
              { icon: '💻', value: '10+', label: 'Proyek Selesai' },
              { icon: '🔐', value: '5+', label: 'CTF Selesai' },
              { icon: '📦', value: '8+', label: 'Tech Digunakan' },
              { icon: '🌐', value: '2+', label: 'Komunitas' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="stat-pill"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
              >
                <div className="stat-pill-icon">{s.icon}</div>
                <p className="stat-pill-value">{s.value}</p>
                <p className="stat-pill-label">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
    </>
  );
}