// src/pages/ProjectDetail.jsx
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import {
  FaArrowLeft, FaExternalLinkAlt, FaGithub,
  FaCheckCircle, FaExclamationTriangle, FaShieldAlt,
  FaCode, FaLightbulb, FaFileAlt, FaCogs,
} from 'react-icons/fa';

const catConfig = {
  web: {
    gradient: 'linear-gradient(135deg,#3b82f6,#6d28d9)',
    badge: { bg: 'rgba(59,130,246,0.1)', color: '#1d4ed8', border: 'rgba(59,130,246,0.2)' },
    label: 'Web Development',
    emoji: '💻',
  },
  security: {
    gradient: 'linear-gradient(135deg,#8b5cf6,#ec4899)',
    badge: { bg: 'rgba(139,92,246,0.1)', color: '#6d28d9', border: 'rgba(139,92,246,0.2)' },
    label: 'Cyber Security',
    emoji: '🔐',
  },
};

function SectionBlock({ icon: Icon, title, color, children, delay = 0 }) {
  return (
    <motion.div
      className="detail-section"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="detail-section-head">
        <div className="detail-section-icon" style={{ background: `${color}18`, color }}>
          <Icon />
        </div>
        <h2 className="detail-section-title">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const [imgOk, setImgOk] = useState(true);

  if (!project) {
    return (
      <>
        <style>{`
          .not-found { min-height:80vh; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1.5rem; background:linear-gradient(180deg,#f8f4ff,#fff); }
          .not-found h2 { font-size:1.6rem; font-weight:800; color:#1e293b; }
          .not-found a { display:flex; align-items:center; gap:8px; color:#6d28d9; font-weight:600; font-size:.9rem; text-decoration:none; }
          .not-found a:hover { text-decoration:underline; }
        `}</style>
        <div className="not-found">
          <div style={{ fontSize: '4rem' }}>🔍</div>
          <h2>Proyek tidak ditemukan</h2>
          <Link to="/projects"><FaArrowLeft /> Kembali ke Daftar Proyek</Link>
        </div>
      </>
    );
  }

  const cc = catConfig[project.category] || catConfig.web;
  const imgPath = `/images/projects/${project.id}.png`;
  const isWeb = project.category === 'web';

  return (
    <>
      <style>{`
        .detail-page {
          min-height:100vh;
          background:linear-gradient(180deg,#f8f4ff 0%,#f0f4ff 40%,#fafbff 100%);
          padding:3rem 0 6rem;
          position:relative; overflow:hidden;
        }
        .detail-page::before {
          content:''; position:absolute; top:-100px; right:-80px;
          width:500px; height:500px;
          background:radial-gradient(circle,rgba(139,92,246,.07) 0%,transparent 70%);
          pointer-events:none;
        }
        .detail-container { max-width:900px; margin:0 auto; padding:0 1.25rem; position:relative; z-index:2; }

        /* Back link */
        .back-link {
          display:inline-flex; align-items:center; gap:8px;
          font-size:.87rem; font-weight:600; color:#6d28d9; text-decoration:none;
          padding:8px 16px; border-radius:12px; background:rgba(139,92,246,.06);
          border:1px solid rgba(139,92,246,.15); margin-bottom:2rem;
          transition:background .2s,border-color .2s;
        }
        .back-link:hover { background:rgba(139,92,246,.12); border-color:rgba(139,92,246,.3); }

        /* Hero image */
        .detail-hero {
          position:relative; border-radius:24px; overflow:hidden;
          margin-bottom:2rem; box-shadow:0 12px 48px rgba(0,0,0,.1);
        }
        .detail-hero-img { width:100%; height:clamp(220px,40vw,400px); object-fit:cover; display:block; }
        .detail-hero-placeholder {
          width:100%; height:clamp(220px,40vw,400px);
          display:flex; align-items:center; justify-content:center;
          font-size:4rem;
        }
        .detail-hero-overlay {
          position:absolute; inset:0;
          background:linear-gradient(to top,rgba(0,0,0,.5) 0%,transparent 60%);
        }
        .detail-hero-info {
          position:absolute; bottom:0; left:0; right:0;
          padding:1.5rem 1.75rem;
          display:flex; flex-direction:column; gap:.5rem;
        }
        .detail-hero-badge {
          display:inline-flex; align-items:center; gap:6px;
          font-size:.72rem; font-weight:700; padding:5px 12px; border-radius:20px;
          backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px);
          width:fit-content;
        }
        .detail-hero-title {
          font-size:clamp(1.5rem,4vw,2.25rem); font-weight:800;
          color:#fff; line-height:1.2; text-shadow:0 2px 12px rgba(0,0,0,.3);
        }

        /* Action buttons */
        .detail-actions { display:flex; flex-wrap:wrap; gap:.75rem; margin-bottom:2rem; }
        .detail-btn {
          display:inline-flex; align-items:center; gap:8px;
          padding:10px 20px; border-radius:12px; font-size:.87rem; font-weight:600;
          text-decoration:none; transition:filter .2s,box-shadow .2s,transform .1s;
        }
        .detail-btn:hover { transform:translateY(-2px); }
        .btn-demo {
          background:linear-gradient(135deg,#3b82f6,#6d28d9); color:#fff;
          box-shadow:0 4px 18px rgba(59,130,246,.35);
        }
        .btn-demo:hover { filter:brightness(1.1); box-shadow:0 8px 28px rgba(59,130,246,.45); }
        .btn-repo {
          background:rgba(255,255,255,.85); backdrop-filter:blur(10px);
          border:1.5px solid rgba(0,0,0,.1); color:#1e293b;
        }
        .btn-repo:hover { border-color:rgba(139,92,246,.3); box-shadow:0 4px 16px rgba(0,0,0,.08); }

        /* Overview card */
        .overview-card {
          background:rgba(255,255,255,.85); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
          border:1px solid rgba(255,255,255,.95); border-radius:24px;
          padding:2rem; box-shadow:0 6px 32px rgba(0,0,0,.06);
          position:relative; overflow:hidden; margin-bottom:1.5rem;
        }
        .overview-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:4px;
          border-radius:24px 24px 0 0;
        }
        .overview-text { font-size:.95rem; color:#475569; line-height:1.75; }

        /* Tech pills row */
        .tech-pills-row { display:flex; flex-wrap:wrap; gap:.5rem; margin-top:1.25rem; padding-top:1rem; border-top:1px solid rgba(0,0,0,.05); }
        .tech-pill-detail {
          display:flex; align-items:center; gap:5px;
          font-size:.78rem; font-weight:600; padding:5px 12px; border-radius:10px;
          background:#f1f5f9; color:#475569; border:1px solid rgba(0,0,0,.06);
        }
        .tech-pill-detail svg { font-size:.7rem; color:#8b5cf6; }

        /* Section blocks */
        .detail-section {
          background:rgba(255,255,255,.85); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px);
          border:1px solid rgba(255,255,255,.95); border-radius:22px;
          padding:1.75rem; box-shadow:0 4px 24px rgba(0,0,0,.06);
          margin-bottom:1.25rem;
        }
        .detail-section-head { display:flex; align-items:center; gap:10px; margin-bottom:1.1rem; }
        .detail-section-icon {
          width:38px; height:38px; border-radius:11px;
          display:flex; align-items:center; justify-content:center;
          font-size:.95rem; flex-shrink:0;
        }
        .detail-section-title { font-size:1.05rem; font-weight:800; color:#1e293b; }

        /* List items */
        .detail-list { list-style:none; padding:0; margin:0; }
        .detail-list-item {
          display:flex; align-items:flex-start; gap:10px;
          padding:8px 0; font-size:.87rem; color:#475569; line-height:1.6;
        }
        .detail-list-item:not(:last-child) { border-bottom:1px solid rgba(0,0,0,.04); }
        .detail-list-bullet {
          width:22px; height:22px; border-radius:6px;
          display:flex; align-items:center; justify-content:center;
          font-size:.6rem; flex-shrink:0; margin-top:2px;
        }
        .detail-para { font-size:.9rem; color:#475569; line-height:1.7; }

        /* Report callout */
        .report-callout {
          display:flex; align-items:flex-start; gap:12px;
          background:rgba(139,92,246,.06); border:1px solid rgba(139,92,246,.15);
          border-radius:14px; padding:1rem 1.25rem; margin-top:1rem;
          font-size:.85rem; color:#6d28d9; line-height:1.6;
        }
        .report-callout svg { font-size:1.1rem; flex-shrink:0; margin-top:2px; }
      `}</style>

      <section className="detail-page">
        <div className="detail-container">

          {/* Back */}
          <motion.div initial={{ opacity:0,x:-16 }} animate={{ opacity:1,x:0 }} transition={{ duration:.4 }}>
            <Link to="/projects" className="back-link"><FaArrowLeft /> Semua Proyek</Link>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="detail-hero"
            initial={{ opacity:0,scale:.96 }}
            animate={{ opacity:1,scale:1 }}
            transition={{ duration:.6,ease:[.16,1,.3,1] }}
          >
            {imgOk ? (
              <img src={imgPath} alt={project.title} className="detail-hero-img" onError={() => setImgOk(false)} />
            ) : (
              <div className="detail-hero-placeholder" style={{ background:cc.gradient }}>{cc.emoji}</div>
            )}
            <div className="detail-hero-overlay" />
            <div className="detail-hero-info">
              <div className="detail-hero-badge" style={{ background:cc.badge.bg, color:cc.badge.color, border:`1px solid ${cc.badge.border}` }}>
                {cc.emoji} {cc.label}
              </div>
              <h1 className="detail-hero-title">{project.title}</h1>
            </div>
          </motion.div>

          {/* Action buttons */}
          {(project.demoUrl || project.repoUrl) && (
            <motion.div className="detail-actions" initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:.2 }}>
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="detail-btn btn-demo">
                  <FaExternalLinkAlt /> Lihat Demo
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="detail-btn btn-repo">
                  <FaGithub /> Lihat Kode
                </a>
              )}
            </motion.div>
          )}

          {/* Overview */}
          <motion.div
            className="overview-card"
            initial={{ opacity:0,y:20 }}
            animate={{ opacity:1,y:0 }}
            transition={{ delay:.25,duration:.6,ease:[.16,1,.3,1] }}
            style={{ '--bar': cc.gradient }}
          >
            <div style={{ position:'absolute',top:0,left:0,right:0,height:4,background:cc.gradient,borderRadius:'24px 24px 0 0' }} />
            <p className="overview-text">{project.overview}</p>
            <div className="tech-pills-row">
              {project.tech.split(',').map((t) => (
                <span key={t.trim()} className="tech-pill-detail"><FaCogs />{t.trim()}</span>
              ))}
            </div>
          </motion.div>

          {/* Web-specific sections */}
          {isWeb && (
            <>
              <SectionBlock icon={FaCheckCircle} title="Fitur Utama" color="#3b82f6" delay={0.35}>
                <ul className="detail-list">
                  {project.details.features.map((f, i) => (
                    <li key={i} className="detail-list-item">
                      <span className="detail-list-bullet" style={{ background:'rgba(59,130,246,.1)',color:'#3b82f6' }}>
                        <FaCheckCircle />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </SectionBlock>

              <SectionBlock icon={FaLightbulb} title="Tantangan & Solusi" color="#f59e0b" delay={0.45}>
                <ul className="detail-list">
                  {project.details.challenges.map((c, i) => (
                    <li key={i} className="detail-list-item">
                      <span className="detail-list-bullet" style={{ background:'rgba(245,158,11,.1)',color:'#f59e0b' }}>
                        <FaLightbulb />
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              </SectionBlock>

              <SectionBlock icon={FaShieldAlt} title="Keamanan" color="#10b981" delay={0.55}>
                <p className="detail-para">{project.details.security}</p>
              </SectionBlock>
            </>
          )}

          {/* Security-specific sections */}
          {!isWeb && (
            <>
              <SectionBlock icon={FaExclamationTriangle} title="Temuan Kerentanan" color="#ef4444" delay={0.35}>
                <ul className="detail-list">
                  {project.details.findings.map((f, i) => (
                    <li key={i} className="detail-list-item">
                      <span className="detail-list-bullet" style={{ background:'rgba(239,68,68,.1)',color:'#ef4444' }}>
                        <FaExclamationTriangle />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </SectionBlock>

              <SectionBlock icon={FaShieldAlt} title="Rekomendasi Mitigasi" color="#10b981" delay={0.45}>
                <ul className="detail-list">
                  {project.details.mitigation.map((m, i) => (
                    <li key={i} className="detail-list-item">
                      <span className="detail-list-bullet" style={{ background:'rgba(16,185,129,.1)',color:'#10b981' }}>
                        <FaCheckCircle />
                      </span>
                      {m}
                    </li>
                  ))}
                </ul>
              </SectionBlock>

              {project.details.report && (
                <motion.div
                  initial={{ opacity:0,y:16 }}
                  animate={{ opacity:1,y:0 }}
                  transition={{ delay:.55 }}
                >
                  <div className="report-callout">
                    <FaFileAlt />
                    <span>{project.details.report}</span>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}