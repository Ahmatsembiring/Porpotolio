// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaBars, FaTimes } from 'react-icons/fa';

// ✅ FIX: semua pakai format { to, label } yang konsisten
const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/experience', label: 'Pengalaman' },
  { to: '/projects', label: 'Proyek' },
  { to: '/blog', label: 'Blog' },
  { to: '/cv', label: 'CV' },
  { to: '/sertifikasi', label: 'Sertifikasi' },
  { to: '/contact', label: 'Kontak' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  const isActive = (path) => (
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
  );

  return (
    <>
      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          transition: all 0.3s ease;
        }
        .navbar.scrolled {
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 1px 30px rgba(0,0,0,0.08);
          border-bottom: 1px solid rgba(255,255,255,0.6);
        }
        .navbar.top {
          background: rgba(255,255,255,0.6);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .nav-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 9px;
          text-decoration: none;
          font-weight: 800;
          font-size: 1rem;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .nav-brand-icon {
          width: 34px;
          height: 34px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 0.85rem;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(59,130,246,0.35);
        }
        .nav-links {
          display: none;
          align-items: center;
          gap: 0.25rem;
          list-style: none;
          margin: 0; padding: 0;
        }
        @media (min-width: 768px) { .nav-links { display: flex; } }
        .nav-link {
          position: relative;
          display: inline-block;
          padding: 7px 14px;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 10px;
          transition: color 0.2s, background 0.2s;
          color: #475569;
        }
        .nav-link:hover { color: #6d28d9; background: rgba(139,92,246,0.07); }
        .nav-link.active {
          color: #6d28d9;
          background: rgba(139,92,246,0.1);
        }
        .nav-link-dot {
          position: absolute;
          bottom: 4px;
          left: 50%; transform: translateX(-50%);
          width: 4px; height: 4px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 50%;
        }
        .nav-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px; height: 38px;
          border: none;
          border-radius: 10px;
          background: rgba(139,92,246,0.08);
          color: #6d28d9;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .nav-toggle:hover { background: rgba(139,92,246,0.15); }
        @media (min-width: 768px) { .nav-toggle { display: none; } }
        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 99;
          display: flex;
          flex-direction: column;
        }
        .mobile-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
        .mobile-drawer {
          position: relative;
          z-index: 1;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0,0,0,0.06);
          padding: 1rem 1.25rem 1.5rem;
          box-shadow: 0 20px 50px rgba(0,0,0,0.12);
        }
        .mobile-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          padding-top: 10px;
        }
        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          color: #374151;
          transition: all 0.2s;
          margin-bottom: 4px;
        }
        .mobile-nav-link:hover { background: rgba(139,92,246,0.07); color: #6d28d9; }
        .mobile-nav-link.active { background: rgba(139,92,246,0.1); color: #6d28d9; }
      `}</style>

      <nav className={`navbar ${scrolled ? 'scrolled' : 'top'}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-brand">
            <div className="nav-brand-icon"><FaCode /></div>
            Ahmat Prayoga
          </Link>

          {/* Desktop Nav */}
          <ul className="nav-links">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className={`nav-link ${isActive(to) ? 'active' : ''}`}>
                  {label}
                  {isActive(to) && <span className="nav-link-dot" />}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Toggle */}
          <motion.button
            className="nav-toggle"
            onClick={() => setIsOpen((o) => !o)}
            aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
            whileTap={{ scale: 0.92 }}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="mobile-backdrop"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="mobile-drawer"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mobile-menu-header">
                <Link to="/" className="nav-brand">
                  <div className="nav-brand-icon"><FaCode /></div>
                  Ahmat Prayoga
                </Link>
                <motion.button
                  className="nav-toggle"
                  onClick={() => setIsOpen(false)}
                  whileTap={{ scale: 0.92 }}
                >
                  <FaTimes />
                </motion.button>
              </div>
              {navLinks.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    to={to}
                    className={`mobile-nav-link ${isActive(to) ? 'active' : ''}`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
