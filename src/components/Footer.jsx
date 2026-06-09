// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaGithub, FaLinkedin, FaYoutube,
  FaInstagram, FaDiscord, FaEnvelope,
  FaCode, FaHeart,
} from 'react-icons/fa';

const socials = [
  { icon: FaGithub,    href: 'https://github.com/Ahmatsembiring',           label: 'GitHub',    color: '#e2e8f0', hover: '#fff' },
  { icon: FaLinkedin,  href: 'https://linkedin.com/in/ahmatprayoga',         label: 'LinkedIn',  color: '#0077b5', hover: '#0a91d4' },
  { icon: FaYoutube,   href: 'https://www.youtube.com/@Programmer-ai-25',    label: 'YouTube',   color: '#ff0000', hover: '#ff3333' },
  { icon: FaInstagram, href: 'https://www.instagram.com/ahnat_sembiring11/', label: 'Instagram', color: '#e1306c', hover: '#f06292' },
  { icon: FaDiscord,   href: 'https://discord.gg/raven',                    label: 'Discord',   color: '#7289da', hover: '#8fa0f2' },
  { icon: FaEnvelope,  href: 'mailto:ahmatsembiring11@gmail.com',            label: 'Email',     color: '#94a3b8', hover: '#e2e8f0' },
];

const navLinks = [
  { to: '/',           label: 'Home' },
  { to: '/experience', label: 'Pengalaman' },
  { to: '/projects',   label: 'Proyek' },
  { to: '/blog',       label: 'Blog' },
  { to: '/contact',    label: 'Kontak' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        .footer {
          position: relative;
          background: linear-gradient(160deg, #0f0c29 0%, #1a1040 40%, #0d1b2a 100%);
          color: #e2e8f0;
          overflow: hidden;
          padding: 4rem 0 0;
        }
        /* top glow */
        .footer::before {
          content: '';
          position: absolute;
          top: -120px; left: 50%;
          transform: translateX(-50%);
          width: 600px; height: 300px;
          background: radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .footer-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.25rem;
          position: relative;
          z-index: 2;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        @media (min-width: 640px) { .footer-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .footer-grid { grid-template-columns: 1.6fr 1fr 1.2fr; } }

        /* Brand col */
        .footer-brand-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1rem;
          text-decoration: none;
        }
        .footer-brand-icon {
          width: 38px; height: 38px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 0.95rem;
          box-shadow: 0 4px 16px rgba(139,92,246,0.4);
        }
        .footer-brand-name {
          font-size: 1.05rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #a5b4fc, #f9a8d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .footer-brand-desc {
          font-size: 0.85rem;
          color: #94a3b8;
          line-height: 1.65;
          margin-bottom: 1.5rem;
          max-width: 300px;
        }

        /* Social icons */
        .footer-socials {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .footer-social-btn {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s, border-color 0.2s;
        }
        .footer-social-btn:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.18);
          transform: translateY(-3px);
        }

        /* Nav col */
        .footer-col-title {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #64748b;
          margin-bottom: 1rem;
        }
        .footer-nav-link {
          display: block;
          font-size: 0.875rem;
          color: #94a3b8;
          text-decoration: none;
          padding: 5px 0;
          transition: color 0.2s, transform 0.2s;
          width: fit-content;
        }
        .footer-nav-link:hover { color: #e2e8f0; transform: translateX(4px); }

        /* Contact col */
        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 0.85rem;
          font-size: 0.85rem;
          color: #94a3b8;
        }
        .footer-contact-item svg {
          font-size: 1rem;
          margin-top: 1px;
          flex-shrink: 0;
          color: #8b5cf6;
        }
        .footer-contact-item a {
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-contact-item a:hover { color: #c4b5fd; }

        /* Bottom bar */
        .footer-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 1.25rem 0;
          text-align: center;
        }
        @media (min-width: 640px) {
          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
          }
        }
        .footer-copy {
          font-size: 0.78rem;
          color: #475569;
          display: flex; align-items: center; gap: 5px;
        }
        .footer-copy svg { color: #ec4899; }
        .footer-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          color: #475569;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          padding: 4px 10px;
          border-radius: 20px;
        }
        .badge-dot {
          width: 6px; height: 6px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">

            {/* Col 1: Brand */}
            <div>
              <Link to="/" className="footer-brand-logo">
                <div className="footer-brand-icon"><FaCode /></div>
                <span className="footer-brand-name">Ahmat Prayoga</span>
              </Link>
              <p className="footer-brand-desc">
                Offensive Security &amp; Web Developer.
                Membangun aplikasi yang cepat, indah, dan aman.
              </p>
              <div className="footer-socials">
                {socials.map(({ icon: Icon, href, label, color, hover }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="footer-social-btn"
                    style={{ color }}
                    whileHover={{ color: hover, scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Col 2: Nav */}
            <div>
              <p className="footer-col-title">Navigasi</p>
              {navLinks.map(({ to, label }) => (
                <Link key={to} to={to} className="footer-nav-link">{label}</Link>
              ))}
            </div>

            {/* Col 3: Contact */}
            <div>
              <p className="footer-col-title">Kontak</p>
              <div className="footer-contact-item">
                <FaEnvelope />
                <a href="mailto:ahmatsembiring11@gmail.com">ahmatsembiring11@gmail.com</a>
              </div>
              <div className="footer-contact-item">
                <FaDiscord />
                <a href="https://discord.gg/raven" target="_blank" rel="noopener noreferrer">
                  Discord: Raven Community
                </a>
              </div>
              <div
                style={{
                  marginTop: '1.25rem',
                  background: 'rgba(139,92,246,0.1)',
                  border: '1px solid rgba(139,92,246,0.2)',
                  borderRadius: '14px',
                  padding: '1rem',
                  fontSize: '0.82rem',
                  color: '#c4b5fd',
                  lineHeight: '1.55',
                }}
              >
                💬 Respon dalam <strong style={{ color: '#a78bfa' }}>1-2 hari kerja</strong>.
                Untuk urgent, tulis <strong style={{ color: '#a78bfa' }}>"URGENT"</strong> di subjek email.
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="footer-bottom">
            <p className="footer-copy">
              © {year} Ahmat Prayoga Sembiring. Dibuat dengan <FaHeart /> penuh semangat.
            </p>
            <div className="footer-badge">
              <div className="badge-dot" />
              Open to opportunities
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
