// src/pages/Experience.jsx
import { motion } from 'framer-motion';
import { FaDiscord, FaTiktok, FaEnvelope, FaBriefcase, FaUsers, FaTrophy, FaCalendarAlt, FaTag } from 'react-icons/fa';
import ravenLogo from '../assets/images/raven-logo.jpg';

const organizationalExperiences = [
  {
    title: 'Founder',
    organization: 'Raven Cybersecurity Community',
    period: '2023 – Sekarang',
    description: 'Membangun komunitas keamanan siber untuk mahasiswa, mengadakan workshop, dan mentoring dalam penetration testing serta secure coding.',
    tech: ['Komunitas', 'Workshop', 'Mentorship'],
    logo: ravenLogo,
    gradient: 'linear-gradient(135deg, #6d28d9, #3b82f6)',
    glow: 'rgba(109,40,217,0.2)',
    social: [
      { icon: FaDiscord, href: 'https://discord.gg/raven', label: 'Discord', color: '#7289da' },
      { icon: FaTiktok, href: 'https://www.tiktok.com/@raven_cyber', label: 'TikTok', color: '#000' },
    ],
  },
  {
    title: 'Founder',
    organization: 'Sobat Web AI',
    period: '2024 – Sekarang',
    description: 'Menginisiasi platform edukasi teknologi berbasis AI untuk membantu pemula belajar web development dengan pendekatan interaktif.',
    tech: ['Edukasi', 'AI', 'Web Development'],
    logo: null,
    gradient: 'linear-gradient(135deg, #ec4899, #f59e0b)',
    glow: 'rgba(236,72,153,0.2)',
    social: [
      { icon: FaEnvelope, href: 'mailto:hello@sobatweb.ai', label: 'Email', color: '#64748b' },
      { icon: FaTiktok, href: 'https://www.tiktok.com/@sobatweb_ai', label: 'TikTok', color: '#000' },
    ],
  },
];

const professionalExperiences = [
  {
    title: 'Frontend Developer',
    company: 'PPLK ITERA 2025',
    period: 'Mei 2025 – Agustus 2025',
    type: 'Panitia',
    icon: FaBriefcase,
    description: 'Mengembangkan antarmuka pengguna untuk platform Program Pengenalan Lingkungan Kampus menggunakan React,TypeScript dan Tailwind CSS. Fokus pada performa, aksesibilitas, dan UX.',
    tech: ['React', 'Tailwind CSS', 'Firebase', 'Git'],
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.08)',
    tagColor: 'rgba(34,197,94,0.15)',
    tagText: '#16a34a',
  },
  {
    title: 'Penetration Testing ITERA',
    company: 'CyberSec Labs',
    period: 'Sep 2025 – Des 2025',
    type: 'Magang',
    icon: FaUsers,
    description: 'Melakukan audit keamanan aplikasi web, mengidentifikasi kerentanan Top 10 OWASP, serta menyusun laporan mitigasi untuk tim TIK Kampus.',
    tech: ['Burp Suite', 'OWASP ZAP', 'Nmap', 'Manual Testing'],
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.08)',
    tagColor: 'rgba(59,130,246,0.15)',
    tagText: '#1d4ed8',
  },
  {
    title: 'Peserta CTF Nasional',
    company: 'Kompetisi Keamanan Siber 2023',
    period: 'Okt 2023',
    type: 'Kompetisi',
    icon: FaTrophy,
    description: 'Tim kami menempati peringkat 5 besar dalam kompetisi Capture The Flag tingkat nasional, fokus pada web exploitation dan cryptography.',
    tech: ['Linux', 'Python', 'Wireshark', 'SQLMap'],
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    tagColor: 'rgba(245,158,11,0.15)',
    tagText: '#b45309',
  },
];

export default function Experience() {
  return (
    <>
      <style>{`
        .exp-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #f8f4ff 0%, #f0f4ff 40%, #fafbff 100%);
          padding: 5rem 0 6rem;
          position: relative;
          overflow: hidden;
        }
        .exp-page::before {
          content: '';
          position: absolute;
          top: -100px; right: -100px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .exp-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.25rem;
          position: relative;
          z-index: 2;
        }

        /* PAGE HEADER */
        .exp-page-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .exp-tag {
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
        .exp-page-title {
          font-size: clamp(1.9rem, 5vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #1e3a8a, #6d28d9, #be185d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.75rem;
        }
        .exp-page-sub {
          font-size: 1rem;
          color: #64748b;
          max-width: 460px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* SECTION LABEL */
        .section-label {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 1.75rem;
        }
        .section-label-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139,92,246,0.2));
        }
        .section-label-text {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #8b5cf6;
          white-space: nowrap;
        }

        /* ORG CARDS */
        .org-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 4rem;
        }
        @media (min-width: 768px) { .org-grid { grid-template-columns: repeat(2, 1fr); } }

        .org-card {
          background: rgba(255,255,255,0.8);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 4px 30px rgba(0,0,0,0.07);
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.2s;
        }
        .org-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          border-radius: 24px 24px 0 0;
        }
        .org-card:hover {
          box-shadow: 0 16px 50px rgba(0,0,0,0.12);
        }
        .org-card-top {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .org-logo-wrap {
          width: 52px; height: 52px;
          border-radius: 14px;
          background: #f1f5f9;
          border: 1px solid rgba(0,0,0,0.07);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; flex-shrink: 0;
          font-size: 1.4rem;
          color: #94a3b8;
        }
        .org-logo-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
        }
        .org-role-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 20px;
          margin-bottom: 3px;
          color: #fff;
        }
        .org-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 2px;
        }
        .org-period {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.75rem;
          color: #94a3b8;
          font-weight: 500;
        }
        .org-desc {
          font-size: 0.875rem;
          color: #475569;
          line-height: 1.65;
          margin-bottom: 1rem;
        }
        .org-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .org-tag {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 8px;
          background: rgba(139,92,246,0.08);
          border: 1px solid rgba(139,92,246,0.15);
          color: #6d28d9;
        }
        .org-socials {
          display: flex;
          gap: 0.75rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(0,0,0,0.05);
        }
        .org-social-link {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 10px;
          background: rgba(0,0,0,0.04);
          text-decoration: none;
          color: #475569;
          transition: background 0.2s, color 0.2s;
        }
        .org-social-link:hover { background: rgba(0,0,0,0.08); }
        .org-social-link svg { font-size: 0.9rem; }

        /* PROFESSIONAL TIMELINE */
        .timeline-wrap {
          position: relative;
          padding-left: 2rem;
        }
        .timeline-line {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, #3b82f6, #8b5cf6, #ec4899);
          border-radius: 1px;
        }
        .timeline-item {
          position: relative;
          padding-bottom: 2.5rem;
        }
        .timeline-item:last-child { padding-bottom: 0; }
        .timeline-dot {
          position: absolute;
          left: -2.55rem;
          top: 0;
          width: 20px; height: 20px;
          border-radius: 50%;
          border: 3px solid #fff;
          box-shadow: 0 0 0 2px currentColor, 0 4px 16px rgba(0,0,0,0.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.5rem;
          color: #fff;
        }
        .timeline-card {
          background: rgba(255,255,255,0.8);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .timeline-card:hover {
          transform: translateX(4px);
          box-shadow: 0 10px 36px rgba(0,0,0,0.1);
        }
        .timeline-top-row {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.5rem;
          margin-bottom: 0.25rem;
        }
        .timeline-job-title {
          font-size: 1rem;
          font-weight: 800;
          color: #1e293b;
        }
        .timeline-type-badge {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 20px;
        }
        .timeline-company {
          font-size: 0.875rem;
          font-weight: 600;
          color: #475569;
          margin-bottom: 3px;
        }
        .timeline-period {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.75rem;
          color: #94a3b8;
          margin-bottom: 0.75rem;
        }
        .timeline-desc {
          font-size: 0.87rem;
          color: #475569;
          line-height: 1.65;
          margin-bottom: 0.85rem;
        }
        .tech-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .tech-pill {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 8px;
          background: #f1f5f9;
          color: #475569;
          border: 1px solid rgba(0,0,0,0.06);
        }
      `}</style>

      <section className="exp-page">
        <div className="exp-container">

          {/* Page Header */}
          <motion.div
            className="exp-page-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="exp-tag">🚀 Track Record</span>
            <h1 className="exp-page-title">Pengalaman Saya</h1>
            <p className="exp-page-sub">Perjalanan saya dalam membangun komunitas, berkarier, dan berkompetisi di bidang tech.</p>
          </motion.div>

          {/* ── Organisasi ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label">
              <span className="section-label-text">👥 Kepemimpinan &amp; Komunitas</span>
              <div className="section-label-line" />
            </div>
            <div className="org-grid">
              {organizationalExperiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  className="org-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}
                  style={{ '--card-gradient': exp.gradient }}
                >
                  {/* top bar */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0,
                    height: '3px', background: exp.gradient, borderRadius: '24px 24px 0 0',
                  }} />

                  <div className="org-card-top">
                    <div className="org-logo-wrap">
                      {exp.logo ? (
                        <img
                          src={exp.logo}
                          alt={exp.organization}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : '🌐'}
                    </div>
                    <div>
                      <div
                        className="org-role-badge"
                        style={{ background: exp.gradient }}
                      >
                        {exp.title}
                      </div>
                      <p className="org-title">{exp.organization}</p>
                      <p className="org-period">
                        <FaCalendarAlt /> {exp.period}
                      </p>
                    </div>
                  </div>

                  <p className="org-desc">{exp.description}</p>

                  <div className="org-tags">
                    {exp.tech.map((t) => (
                      <span key={t} className="org-tag"><FaTag style={{ fontSize: '0.6rem' }} /> {t}</span>
                    ))}
                  </div>

                  <div className="org-socials">
                    {exp.social.map((s) => {
                      const Icon = s.icon;
                      return (
                        <motion.a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="org-social-link"
                          aria-label={s.label}
                          whileHover={{ x: 4 }}
                        >
                          <Icon style={{ color: s.color }} />
                          {s.label}
                        </motion.a>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Profesional ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label">
              <span className="section-label-text">💼 Pengalaman Profesional</span>
              <div className="section-label-line" />
            </div>

            <div className="timeline-wrap">
              <div className="timeline-line" />
              {professionalExperiences.map((exp, idx) => {
                const Icon = exp.icon;
                return (
                  <motion.div
                    key={idx}
                    className="timeline-item"
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.div
                      className="timeline-dot"
                      style={{ color: exp.color, background: exp.color }}
                      whileHover={{ scale: 1.4 }}
                    >
                      <Icon />
                    </motion.div>

                    <div className="timeline-card">
                      <div className="timeline-top-row">
                        <p className="timeline-job-title">{exp.title}</p>
                        <span
                          className="timeline-type-badge"
                          style={{ background: exp.tagColor, color: exp.tagText }}
                        >
                          {exp.type}
                        </span>
                      </div>
                      <p className="timeline-company">{exp.company}</p>
                      <p className="timeline-period">
                        <FaCalendarAlt /> {exp.period}
                      </p>
                      <p className="timeline-desc">{exp.description}</p>
                      <div className="tech-pills">
                        {exp.tech.map((t) => (
                          <span key={t} className="tech-pill">{t}</span>
                        ))}
                      </div>
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