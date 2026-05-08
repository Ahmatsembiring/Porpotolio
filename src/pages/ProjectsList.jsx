// src/pages/ProjectsList.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import { FaCode, FaShieldAlt, FaArrowRight, FaSearch } from 'react-icons/fa';

/* ── Category config ─────────────────────────────────────────────── */
const categories = [
  { id: 'all',      label: 'Semua',           icon: null },
  { id: 'web',      label: 'Web Development', icon: FaCode },
  { id: 'security', label: 'Cyber Security',  icon: FaShieldAlt },
];

const catStyle = {
  web: {
    gradient: 'linear-gradient(135deg,#3b82f6,#6d28d9)',
    badge: { bg: 'rgba(59,130,246,0.1)', color: '#1d4ed8', border: 'rgba(59,130,246,0.2)' },
    glow: 'rgba(59,130,246,0.15)',
    label: 'Web Development',
  },
  security: {
    gradient: 'linear-gradient(135deg,#8b5cf6,#ec4899)',
    badge: { bg: 'rgba(139,92,246,0.1)', color: '#6d28d9', border: 'rgba(139,92,246,0.2)' },
    glow: 'rgba(139,92,246,0.15)',
    label: 'Cyber Security',
  },
};

const catEmoji = { web: '💻', security: '🔐' };

/* ── Card ────────────────────────────────────────────────────────── */
function ProjectCard({ proj, index }) {
  const cs = catStyle[proj.category] || catStyle.web;
  const imgPath = `/images/projects/${proj.id}.png`;
  const [imgOk, setImgOk] = useState(true);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      style={{ height: '100%' }}
    >
      <Link to={`/projects/${proj.id}`} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>
        <div className="proj-card">
          {/* Image */}
          <div className="proj-img-wrap">
            {imgOk ? (
              <img
                src={imgPath}
                alt={proj.title}
                className="proj-img"
                onError={() => setImgOk(false)}
              />
            ) : (
              <div className="proj-img-placeholder" style={{ background: cs.gradient }}>
                <span style={{ fontSize: '2.5rem' }}>{catEmoji[proj.category]}</span>
              </div>
            )}
            {/* Gradient overlay */}
            <div className="proj-img-overlay" style={{ background: cs.gradient }} />
            {/* Category badge */}
            <div className="proj-cat-badge" style={{ background: cs.badge.bg, color: cs.badge.color, border: `1px solid ${cs.badge.border}` }}>
              {catEmoji[proj.category]} {cs.label}
            </div>
          </div>

          {/* Body */}
          <div className="proj-body">
            <h3 className="proj-title">{proj.title}</h3>
            <p className="proj-overview">{proj.overview}</p>

            {/* Tech pills */}
            <div className="proj-tech-row">
              {proj.tech.split(',').slice(0, 3).map((t) => (
                <span key={t} className="proj-tech-pill">{t.trim()}</span>
              ))}
              {proj.tech.split(',').length > 3 && (
                <span className="proj-tech-pill proj-tech-more">+{proj.tech.split(',').length - 3}</span>
              )}
            </div>

            <div className="proj-cta">
              <span>Lihat Detail</span>
              <FaArrowRight className="proj-cta-arrow" />
            </div>
          </div>

          {/* Bottom accent */}
          <div className="proj-bottom-bar" style={{ background: cs.gradient }} />
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Main ────────────────────────────────────────────────────────── */
export default function ProjectsList() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = projects.filter((p) => {
    const matchCat  = activeFilter === 'all' || p.category === activeFilter;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                        p.overview.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <style>{`
        .projects-page {
          min-height: 100vh;
          background: linear-gradient(180deg,#f8f4ff 0%,#f0f4ff 40%,#fafbff 100%);
          padding: 5rem 0 6rem;
          position: relative; overflow: hidden;
        }
        .projects-page::before {
          content:''; position:absolute; top:-80px; right:-80px;
          width:500px; height:500px;
          background:radial-gradient(circle,rgba(139,92,246,.07) 0%,transparent 70%);
          pointer-events:none;
        }
        .projects-container { max-width:1100px; margin:0 auto; padding:0 1.25rem; position:relative; z-index:2; }

        /* Header */
        .projects-header { text-align:center; margin-bottom:3rem; }
        .projects-tag {
          display:inline-block; background:linear-gradient(90deg,rgba(59,130,246,.1),rgba(139,92,246,.1));
          border:1px solid rgba(139,92,246,.25); color:#6d28d9; font-size:.75rem; font-weight:700;
          padding:5px 16px; border-radius:20px; margin-bottom:.85rem; letter-spacing:.08em; text-transform:uppercase;
        }
        .projects-title {
          font-size:clamp(1.9rem,5vw,3rem); font-weight:800; letter-spacing:-.02em;
          background:linear-gradient(135deg,#1e3a8a,#6d28d9,#be185d);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          margin-bottom:.75rem;
        }
        .projects-sub { font-size:1rem; color:#64748b; max-width:480px; margin:0 auto; line-height:1.65; }

        /* Controls */
        .controls-row {
          display:flex; flex-direction:column; gap:1rem; margin-bottom:2.5rem; align-items:center;
        }
        @media(min-width:640px){ .controls-row { flex-direction:row; justify-content:space-between; } }

        /* Filter tabs */
        .filter-tabs { display:flex; gap:.5rem; flex-wrap:wrap; }
        .filter-tab {
          display:flex; align-items:center; gap:6px; padding:8px 18px; border-radius:50px;
          font-size:.85rem; font-weight:600; border:1.5px solid; cursor:pointer; outline:none;
          transition:all .2s ease;
        }
        .filter-tab.inactive { background:rgba(255,255,255,.8); color:#64748b; border-color:rgba(0,0,0,.08); }
        .filter-tab.inactive:hover { border-color:rgba(139,92,246,.3); color:#6d28d9; }
        .filter-tab.active { color:#fff; border-color:transparent; box-shadow:0 4px 18px rgba(0,0,0,.18); background:linear-gradient(135deg,#3b82f6,#8b5cf6); }
        .filter-tab svg { font-size:.8rem; }

        /* Search */
        .search-wrap { position:relative; }
        .search-icon { position:absolute; left:12px; top:50%; transform:translateY(-50%); color:#94a3b8; font-size:.9rem; pointer-events:none; }
        .search-input {
          padding:9px 14px 9px 36px; border-radius:50px; border:1.5px solid rgba(0,0,0,.09);
          background:rgba(255,255,255,.85); backdrop-filter:blur(10px); outline:none; font-size:.875rem;
          font-family:inherit; color:#1e293b; min-width:220px;
          transition:border-color .2s,box-shadow .2s;
        }
        .search-input:focus { border-color:#8b5cf6; box-shadow:0 0 0 3px rgba(139,92,246,.1); }

        /* Count */
        .result-count { font-size:.82rem; color:#94a3b8; font-weight:500; text-align:center; margin-bottom:1.5rem; }

        /* Grid */
        .projects-grid {
          display:grid; grid-template-columns:1fr; gap:1.5rem;
        }
        @media(min-width:640px){ .projects-grid { grid-template-columns:repeat(2,1fr); } }
        @media(min-width:1024px){ .projects-grid { grid-template-columns:repeat(3,1fr); } }

        /* Card */
        .proj-card {
          background:rgba(255,255,255,.85); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px);
          border:1px solid rgba(255,255,255,.95); border-radius:22px; overflow:hidden;
          box-shadow:0 4px 24px rgba(0,0,0,.06); height:100%;
          display:flex; flex-direction:column; position:relative;
          transition:box-shadow .25s;
        }
        .proj-card:hover { box-shadow:0 16px 50px rgba(0,0,0,.12); }

        .proj-img-wrap { position:relative; height:200px; overflow:hidden; }
        .proj-img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .5s ease; }
        .proj-card:hover .proj-img { transform:scale(1.06); }
        .proj-img-placeholder { width:100%; height:100%; display:flex; align-items:center; justify-content:center; }
        .proj-img-overlay { position:absolute; inset:0; opacity:.15; }
        .proj-cat-badge {
          position:absolute; top:12px; left:12px;
          font-size:.68rem; font-weight:700; padding:4px 10px; border-radius:20px;
          backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px);
        }

        .proj-body { padding:1.4rem 1.4rem 1rem; flex:1; display:flex; flex-direction:column; gap:.5rem; }
        .proj-title { font-size:1rem; font-weight:800; color:#1e293b; line-height:1.3; }
        .proj-overview { font-size:.83rem; color:#64748b; line-height:1.6; flex:1; }

        .proj-tech-row { display:flex; flex-wrap:wrap; gap:.4rem; margin-top:.25rem; }
        .proj-tech-pill {
          font-size:.7rem; font-weight:600; padding:3px 9px; border-radius:8px;
          background:#f1f5f9; color:#475569; border:1px solid rgba(0,0,0,.06);
        }
        .proj-tech-more { background:rgba(139,92,246,.08); color:#6d28d9; border-color:rgba(139,92,246,.15); }

        .proj-cta {
          display:flex; align-items:center; gap:6px; padding:.85rem 1.4rem;
          font-size:.82rem; font-weight:700; color:#6d28d9; border-top:1px solid rgba(0,0,0,.05);
          transition:gap .2s;
        }
        .proj-card:hover .proj-cta { gap:10px; }
        .proj-cta-arrow { font-size:.8rem; transition:transform .2s; }
        .proj-card:hover .proj-cta-arrow { transform:translateX(4px); }

        .proj-bottom-bar { height:3px; }

        /* Empty */
        .empty-state { text-align:center; padding:4rem 1rem; }
        .empty-emoji { font-size:3rem; margin-bottom:1rem; }
        .empty-text { font-size:1rem; color:#94a3b8; font-weight:500; }
      `}</style>

      <section className="projects-page">
        <div className="projects-container">

          {/* Header */}
          <motion.div className="projects-header" initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ duration:.7,ease:[.16,1,.3,1] }}>
            <span className="projects-tag">🚀 Portofolio</span>
            <h1 className="projects-title">Semua Proyek</h1>
            <p className="projects-sub">Kumpulan proyek web development dan cyber security yang telah saya kerjakan.</p>
          </motion.div>

          {/* Controls */}
          <motion.div className="controls-row" initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:.2,duration:.6 }}>
            <div className="filter-tabs">
              {categories.map(({ id, label, icon: Icon }) => (
                <motion.button
                  key={id}
                  className={`filter-tab ${activeFilter === id ? 'active' : 'inactive'}`}
                  onClick={() => setActiveFilter(id)}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: .97 }}
                >
                  {Icon && <Icon />} {label}
                </motion.button>
              ))}
            </div>
            <div className="search-wrap">
              <FaSearch className="search-icon" />
              <input
                className="search-input"
                placeholder="Cari proyek…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Count */}
          <p className="result-count">{filtered.length} proyek ditemukan</p>

          {/* Grid */}
          {filtered.length === 0 ? (
            <motion.div className="empty-state" initial={{ opacity:0 }} animate={{ opacity:1 }}>
              <div className="empty-emoji">🔍</div>
              <p className="empty-text">Proyek tidak ditemukan. Coba kata kunci lain.</p>
            </motion.div>
          ) : (
            <motion.div className="projects-grid" layout>
              <AnimatePresence mode="popLayout">
                {filtered.map((proj, i) => (
                  <ProjectCard key={proj.id} proj={proj} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}