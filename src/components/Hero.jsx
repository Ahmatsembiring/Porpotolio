// src/components/Hero.jsx
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import profileImg from '../assets/images/profile.png';
import {
  FaLinkedin,
  FaGithub,
  FaMedium,
  FaYoutube,
  FaInstagram,
  FaCode,
  FaUserShield,
  FaDownload,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Typing Effect Hook ─────────────────────────────────────────── */
function useTypingEffect(words, speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

/* ─── Floating Particle ──────────────────────────────────────────── */
function Particle({ style }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={style}
      animate={{ y: [0, -30, 0], opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ─── Social Link ─────────────────────────────────────────────────── */
function SocialLink({ href, label, icon: Icon, hoverColor }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="social-icon"
      style={{ '--hover-color': hoverColor }}
      whileHover={{ scale: 1.25, y: -4 }}
      whileTap={{ scale: 0.9 }}
    >
      <Icon />
    </motion.a>
  );
}

/* ─── Stat Card ───────────────────────────────────────────────────── */
function StatCard({ value, label, color }) {
  return (
    <motion.div
      className="stat-card"
      style={{ '--accent': color }}
      whileHover={{ y: -4, scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <p className="stat-value">{value}</p>
      <p className="stat-label">{label}</p>
    </motion.div>
  );
}

/* ─── Main Component ──────────────────────────────────────────────── */
export default function Hero() {
  const roles = [
    'Web Developer 💻',
    'Cyber Security Enthusiast 🔐',
    'Open Source Contributor 🚀',
    'UI/UX Crafter 🎨',
  ];
  const typedRole = useTypingEffect(roles);

  const particles = Array.from({ length: 12 }, (_, i) => ({
    key: i,
    style: {
      width: `${8 + Math.random() * 16}px`,
      height: `${8 + Math.random() * 16}px`,
      top: `${Math.random() * 90}%`,
      left: `${Math.random() * 90}%`,
      background: i % 3 === 0
        ? 'rgba(59,130,246,0.35)'
        : i % 3 === 1
        ? 'rgba(139,92,246,0.35)'
        : 'rgba(236,72,153,0.25)',
      filter: 'blur(1px)',
    },
  }));

  return (
    <>
      {/* ── Inline Styles (scoped) ── */}
      <style>{`
        /* === HERO SECTION === */
        #home {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #fff0f8 100%);
          overflow: hidden;
          padding-top: 80px;
        }

        /* === ANIMATED BG BLOBS === */
        .blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(80px);
          pointer-events: none;
          will-change: transform;
        }
        .blob-blue {
          width: clamp(200px, 40vw, 500px);
          height: clamp(200px, 40vw, 500px);
          background: rgba(59,130,246,0.12);
          top: -10%;
          left: -10%;
          animation: blobFloat1 10s ease-in-out infinite alternate;
        }
        .blob-purple {
          width: clamp(200px, 35vw, 450px);
          height: clamp(200px, 35vw, 450px);
          background: rgba(139,92,246,0.12);
          bottom: -10%;
          right: -10%;
          animation: blobFloat2 12s ease-in-out infinite alternate;
        }
        .blob-pink {
          width: clamp(100px, 20vw, 300px);
          height: clamp(100px, 20vw, 300px);
          background: rgba(236,72,153,0.08);
          top: 40%;
          left: 60%;
          animation: blobFloat3 8s ease-in-out infinite alternate;
        }
        @keyframes blobFloat1 { from { transform: translate(0,0) scale(1); } to { transform: translate(4%,3%) scale(1.05); } }
        @keyframes blobFloat2 { from { transform: translate(0,0) scale(1); } to { transform: translate(-3%,-4%) scale(1.08); } }
        @keyframes blobFloat3 { from { transform: translate(0,0); } to { transform: translate(-5%,5%); } }

        /* === GRID LAYOUT === */
        .hero-grid {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 1.25rem 3rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          width: 100%;
          position: relative;
          z-index: 10;
        }
        @media (min-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr 1.15fr;
            gap: 4rem;
            padding: 3rem 2rem;
          }
        }
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr 1.2fr;
            gap: 5rem;
          }
        }

        /* === PROFILE PHOTO AREA === */
        .photo-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        /* Glowing ring */
        .photo-ring {
          position: relative;
          width: clamp(220px, 55vw, 340px);
          height: clamp(220px, 55vw, 340px);
          border-radius: 30px;
          padding: 3px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
          animation: ringRotate 6s linear infinite;
          box-shadow: 0 0 40px rgba(139,92,246,0.3), 0 20px 60px rgba(59,130,246,0.2);
        }
        @keyframes ringRotate {
          0%   { box-shadow: 0 0 30px rgba(59,130,246,0.35), 0 20px 50px rgba(139,92,246,0.2); }
          50%  { box-shadow: 0 0 50px rgba(139,92,246,0.45), 0 25px 60px rgba(236,72,153,0.25); }
          100% { box-shadow: 0 0 30px rgba(59,130,246,0.35), 0 20px 50px rgba(139,92,246,0.2); }
        }

        .photo-inner {
          width: 100%;
          height: 100%;
          border-radius: 28px;
          overflow: hidden;
          position: relative;
          background: #e0e7ff;
        }
        .photo-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .photo-ring:hover .photo-inner img {
          transform: scale(1.04);
        }

        /* Overlay shimmer */
        .photo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(59,130,246,0.12) 0%,
            transparent 50%,
            rgba(139,92,246,0.12) 100%
          );
          border-radius: 28px;
          pointer-events: none;
        }

        /* Floating Badges */
        .badge {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          border-radius: 30px;
          font-size: 0.7rem;
          font-weight: 600;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          white-space: nowrap;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
          border: 1px solid rgba(255,255,255,0.6);
          z-index: 20;
        }
        .badge-webdev {
          background: rgba(239,246,255,0.9);
          color: #1d4ed8;
          bottom: -18px;
          left: -20px;
          animation: badgeFloat 3.5s ease-in-out infinite;
        }
        .badge-sec {
          background: rgba(245,243,255,0.9);
          color: #6d28d9;
          top: -18px;
          right: -20px;
          animation: badgeFloat 4s ease-in-out infinite reverse;
        }
        .badge svg {
          font-size: 0.85rem;
          flex-shrink: 0;
        }
        @keyframes badgeFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }
        @media (max-width: 480px) {
          .badge-webdev { left: -8px; bottom: -14px; }
          .badge-sec    { right: -8px; top: -14px; }
        }

        /* === TEXT SIDE === */
        .hero-text {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        @media (min-width: 768px) {
          .hero-text { text-align: left; }
        }

        /* Greeting chip */
        .greeting-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(90deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1));
          border: 1px solid rgba(139,92,246,0.25);
          color: #6d28d9;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 5px 14px;
          border-radius: 20px;
          margin-bottom: 1rem;
          letter-spacing: 0.04em;
          width: fit-content;
          margin-left: auto;
          margin-right: auto;
        }
        @media (min-width: 768px) {
          .greeting-chip { margin-left: 0; margin-right: 0; }
        }
        .greeting-chip-dot {
          width: 7px;
          height: 7px;
          background: #8b5cf6;
          border-radius: 50%;
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.3); }
        }

        /* Heading */
        .hero-heading {
          font-size: clamp(1.75rem, 5vw, 3rem);
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 0.5rem;
          background: linear-gradient(90deg, #1e3a8a, #6d28d9, #be185d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
          animation: gradientShift 4s ease-in-out infinite alternate;
          letter-spacing: -0.02em;
        }
        @keyframes gradientShift {
          from { background-position: 0% 50%; }
          to   { background-position: 100% 50%; }
        }

        /* Typing role */
        .hero-role {
          font-size: clamp(0.95rem, 2.5vw, 1.15rem);
          font-weight: 500;
          color: #475569;
          margin-bottom: 0.35rem;
          min-height: 1.8em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        @media (min-width: 768px) {
          .hero-role { justify-content: flex-start; }
        }
        .cursor-blink {
          display: inline-block;
          width: 2px;
          height: 1.2em;
          background: #8b5cf6;
          border-radius: 1px;
          animation: blink 1s step-end infinite;
          vertical-align: text-bottom;
          margin-left: 2px;
        }
        @keyframes blink { 50% { opacity: 0; } }

        /* Subtitle */
        .hero-subtitle {
          font-size: clamp(0.85rem, 2vw, 0.95rem);
          color: #64748b;
          margin-bottom: 1.75rem;
          line-height: 1.6;
        }

        /* === STATS === */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          margin-bottom: 1.75rem;
        }
        .stat-card {
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.8);
          border-radius: 14px;
          padding: 0.85rem 0.5rem;
          cursor: default;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          transition: box-shadow 0.2s;
        }
        .stat-card:hover {
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
        }
        .stat-value {
          font-size: clamp(1.35rem, 3vw, 1.75rem);
          font-weight: 800;
          color: var(--accent);
          line-height: 1;
          margin-bottom: 3px;
        }
        .stat-label {
          font-size: 0.7rem;
          color: #94a3b8;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* === BUTTONS === */
        .btn-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
          margin-bottom: 1.75rem;
        }
        @media (min-width: 768px) {
          .btn-row { justify-content: flex-start; }
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #3b82f6, #6d28d9);
          color: #fff;
          font-weight: 600;
          font-size: 0.9rem;
          padding: 11px 24px;
          border-radius: 12px;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(59,130,246,0.4);
          transition: box-shadow 0.2s, filter 0.2s;
        }
        .btn-primary:hover {
          filter: brightness(1.1);
          box-shadow: 0 8px 30px rgba(59,130,246,0.5);
        }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: #6d28d9;
          font-weight: 600;
          font-size: 0.9rem;
          padding: 11px 24px;
          border-radius: 12px;
          text-decoration: none;
          border: 1.5px solid rgba(109,40,217,0.3);
          transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
        }
        .btn-secondary:hover {
          background: rgba(245,243,255,0.9);
          border-color: #8b5cf6;
          box-shadow: 0 4px 20px rgba(139,92,246,0.2);
        }

        /* === SOCIAL ICONS === */
        .social-row {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        @media (min-width: 768px) {
          .social-row { justify-content: flex-start; }
        }
        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.9);
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          color: #64748b;
          font-size: 1.15rem;
          text-decoration: none;
          transition: color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .social-icon:hover {
          color: var(--hover-color);
          background: rgba(255,255,255,0.95);
          box-shadow: 0 6px 24px rgba(0,0,0,0.13);
        }

        /* === SCROLL INDICATOR === */
        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          opacity: 0.5;
          z-index: 10;
        }
        .scroll-indicator span {
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #64748b;
        }
        .scroll-mouse {
          width: 22px;
          height: 34px;
          border: 2px solid #94a3b8;
          border-radius: 11px;
          display: flex;
          justify-content: center;
          padding-top: 5px;
        }
        .scroll-dot {
          width: 4px;
          height: 6px;
          background: #94a3b8;
          border-radius: 2px;
          animation: scrollDot 1.5s ease-in-out infinite;
        }
        @keyframes scrollDot {
          0%   { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(10px); }
        }
        @media (max-height: 600px) { .scroll-indicator { display: none; } }
      `}</style>

      <section id="home">
        {/* Animated blobs */}
        <div className="blob blob-blue" />
        <div className="blob blob-purple" />
        <div className="blob blob-pink" />

        {/* Floating particles */}
        {particles.map((p) => (
          <Particle key={p.key} style={p.style} />
        ))}

        <div className="hero-grid">
          {/* ── LEFT: Photo ── */}
          <motion.div
            className="photo-wrapper"
            initial={{ opacity: 0, x: -60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="photo-ring">
              <div className="photo-inner">
                <img src={profileImg} alt="Ahmat Prayoga Sembiring" />
                <div className="photo-overlay" />
              </div>
            </div>

            {/* Badge: Web Dev */}
            <motion.div
              className="badge badge-webdev"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <FaCode />
              <span>Web Developer</span>
            </motion.div>

            {/* Badge: Security */}
            <motion.div
              className="badge badge-sec"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <FaUserShield />
              <span>Offensive Security</span>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Text ── */}
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Greeting chip */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div className="greeting-chip" style={{ marginLeft: 0, marginRight: 0, alignSelf: 'flex-start' }}>
                <div className="greeting-chip-dot" />
                Available for work
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="hero-heading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Halo, saya<br />
              Ahmat Prayoga<br />
              Sembiring
            </motion.h1>

            {/* Typing role */}
            <motion.p
              className="hero-role"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {typedRole}
              <span className="cursor-blink" />
            </motion.p>

            {/* Subtitle */}
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Membangun aplikasi yang cepat, indah, dan aman.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="stats-row"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <StatCard value="10+" label="Proyek" color="#3b82f6" />
              <StatCard value="2" label="Komunitas" color="#8b5cf6" />
              <StatCard value="1+" label="Tahun Exp" color="#10b981" />
            </motion.div>

            {/* Buttons */}
            <motion.div
              className="btn-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link to="/projects" className="btn-primary">
                  Lihat Proyek
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link to="/contact" className="btn-secondary">
                  Hubungi Saya
                </Link>
              </motion.div>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              className="social-row"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <SocialLink href="https://linkedin.com/in/ahmatprayoga" label="LinkedIn" icon={FaLinkedin} hoverColor="#0077b5" />
              <SocialLink href="https://github.com/Ahmatsembiring" label="GitHub" icon={FaGithub} hoverColor="#171515" />
              <SocialLink href="https://medium.com/@Ahmatsembiring" label="Medium" icon={FaMedium} hoverColor="#00ab6c" />
              <SocialLink href="https://www.youtube.com/@Programmer-ai-25" label="YouTube" icon={FaYoutube} hoverColor="#ff0000" />
              <SocialLink href="https://www.instagram.com/ahnat_sembiring11" label="Instagram" icon={FaInstagram} hoverColor="#e1306c" />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-mouse">
            <div className="scroll-dot" />
          </div>
        </div>
      </section>
    </>
  );
}