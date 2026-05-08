// src/pages/Contact.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub,
  FaDiscord, FaInstagram, FaPaperPlane,
  FaCheckCircle, FaTimesCircle, FaClock,
} from 'react-icons/fa';

const contactInfo = [
  { icon: FaEnvelope,      label: 'Email',   value: 'ahmatsembiring11@gmail.com', href: 'mailto:ahmatsembiring11@gmail.com', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
  { icon: FaMapMarkerAlt,  label: 'Lokasi',  value: 'Medan, Sumatera Utara, Indonesia', href: null, color: '#ec4899', bg: 'rgba(236,72,153,0.1)' },
  { icon: FaClock,         label: 'Respon',  value: 'Biasanya dalam 1–2 hari kerja', href: null, color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
];

const socials = [
  { icon: FaLinkedin,  href: 'https://linkedin.com/in/ahmatprayoga',         label: 'LinkedIn',  bg: 'linear-gradient(135deg,#0077b5,#0a91d4)' },
  { icon: FaGithub,    href: 'https://github.com/Ahmatsembiring',            label: 'GitHub',    bg: 'linear-gradient(135deg,#1f2937,#374151)' },
  { icon: FaDiscord,   href: 'https://discord.gg/raven',                    label: 'Discord',   bg: 'linear-gradient(135deg,#5865f2,#7289da)' },
  { icon: FaInstagram, href: 'https://www.instagram.com/ahnat_sembiring11/', label: 'Instagram', bg: 'linear-gradient(135deg,#e1306c,#f77737)' },
];

export default function Contact() {
  const [form, setForm]           = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setSubmit] = useState(false);
  const [status, setStatus]       = useState(null);
  const [focused, setFocused]     = useState('');

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true); setStatus(null);
    try {
      const res = await fetch('https://formspree.io/f/xnjbpwlg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus(null), 6000);
      } else { setStatus('error'); }
    } catch { setStatus('error'); }
    finally { setSubmit(false); }
  };

  const fieldBorder = (name) => focused === name ? '#8b5cf6' : 'rgba(0,0,0,0.1)';

  return (
    <>
      <style>{`
        .contact-page {
          min-height: 100vh;
          background: linear-gradient(180deg,#f8f4ff 0%,#f0f4ff 40%,#fff 100%);
          padding: 5rem 0 6rem;
          position: relative; overflow: hidden;
        }
        .contact-page::before {
          content:''; position:absolute; top:-100px; right:-80px;
          width:500px; height:500px;
          background:radial-gradient(circle,rgba(139,92,246,.08) 0%,transparent 70%);
          pointer-events:none;
        }
        .contact-container { max-width:1100px; margin:0 auto; padding:0 1.25rem; position:relative; z-index:2; }

        .contact-header { text-align:center; margin-bottom:3.5rem; }
        .contact-tag {
          display:inline-block; background:linear-gradient(90deg,rgba(59,130,246,.1),rgba(139,92,246,.1));
          border:1px solid rgba(139,92,246,.25); color:#6d28d9; font-size:.75rem; font-weight:700;
          padding:5px 16px; border-radius:20px; margin-bottom:.85rem; letter-spacing:.08em; text-transform:uppercase;
        }
        .contact-title {
          font-size:clamp(1.9rem,5vw,3rem); font-weight:800; letter-spacing:-.02em;
          background:linear-gradient(135deg,#1e3a8a,#6d28d9,#be185d);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          margin-bottom:.75rem;
        }
        .contact-sub { font-size:1rem; color:#64748b; max-width:500px; margin:0 auto; line-height:1.65; }

        .contact-grid { display:grid; grid-template-columns:1fr; gap:2rem; }
        @media(min-width:768px){ .contact-grid { grid-template-columns:1.1fr 0.9fr; gap:2.5rem; } }

        /* Form Card */
        .form-card {
          background:rgba(255,255,255,.85); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
          border:1px solid rgba(255,255,255,.95); border-radius:28px; padding:2.25rem;
          box-shadow:0 8px 40px rgba(0,0,0,.07); position:relative; overflow:hidden;
        }
        .form-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:4px;
          background:linear-gradient(90deg,#3b82f6,#8b5cf6,#ec4899); border-radius:28px 28px 0 0;
        }
        .form-title { font-size:1.1rem; font-weight:800; color:#1e293b; margin-bottom:1.5rem; display:flex; align-items:center; gap:8px; }
        .form-title svg { color:#8b5cf6; }

        .field-group { margin-bottom:1.1rem; }
        .field-label { display:block; font-size:.8rem; font-weight:700; color:#374151; margin-bottom:6px; letter-spacing:.02em; }
        .field-input,.field-textarea {
          width:100%; padding:11px 14px; border-radius:12px; border:1.5px solid;
          font-size:.9rem; font-family:inherit; color:#1e293b;
          background:rgba(248,250,252,.8); outline:none;
          transition:border-color .2s,box-shadow .2s,background .2s; box-sizing:border-box;
        }
        .field-input:focus,.field-textarea:focus { background:#fff; box-shadow:0 0 0 3px rgba(139,92,246,.12); }
        .field-textarea { resize:vertical; min-height:110px; }

        .submit-btn {
          width:100%; padding:13px; border-radius:14px; border:none;
          font-size:.95rem; font-weight:700; font-family:inherit; cursor:pointer;
          display:flex; align-items:center; justify-content:center; gap:8px;
          background:linear-gradient(135deg,#3b82f6,#8b5cf6); color:#fff;
          box-shadow:0 4px 20px rgba(59,130,246,.35);
          transition:filter .2s,box-shadow .2s; margin-top:.25rem;
        }
        .submit-btn:hover:not(:disabled){ filter:brightness(1.08); box-shadow:0 8px 28px rgba(59,130,246,.45); }
        .submit-btn:disabled{ opacity:.65; cursor:not-allowed; }

        .status-alert { display:flex; align-items:flex-start; gap:10px; padding:12px 14px; border-radius:12px; font-size:.87rem; font-weight:500; margin-bottom:1.1rem; }
        .status-success { background:rgba(34,197,94,.1); color:#15803d; border:1px solid rgba(34,197,94,.25); }
        .status-error   { background:rgba(239,68,68,.1);  color:#b91c1c; border:1px solid rgba(239,68,68,.25); }

        /* Right */
        .contact-right { display:flex; flex-direction:column; gap:1.25rem; }
        .info-card {
          background:rgba(255,255,255,.82); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px);
          border:1px solid rgba(255,255,255,.95); border-radius:22px; padding:1.5rem;
          box-shadow:0 4px 24px rgba(0,0,0,.06);
        }
        .info-card-title { font-size:.95rem; font-weight:800; color:#1e293b; margin-bottom:1.1rem; }
        .info-item { display:flex; align-items:flex-start; gap:12px; margin-bottom:.9rem; }
        .info-item:last-child { margin-bottom:0; }
        .info-icon { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:.9rem; flex-shrink:0; }
        .info-label { font-size:.7rem; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:#94a3b8; margin-bottom:2px; }
        .info-value { font-size:.85rem; color:#374151; font-weight:500; word-break:break-all; }
        .info-value a { color:inherit; text-decoration:none; }
        .info-value a:hover { color:#6d28d9; }

        .social-btns { display:flex; flex-wrap:wrap; gap:.6rem; }
        .social-btn {
          display:flex; align-items:center; gap:7px; padding:8px 14px; border-radius:11px;
          color:#fff; text-decoration:none; font-size:.82rem; font-weight:600;
          box-shadow:0 3px 12px rgba(0,0,0,.15); transition:opacity .2s,transform .15s;
        }
        .social-btn:hover { opacity:.88; transform:translateY(-2px); }

        .avail-card {
          background:linear-gradient(135deg,rgba(139,92,246,.08),rgba(59,130,246,.08));
          border:1px solid rgba(139,92,246,.2); border-radius:18px; padding:1.25rem;
        }
        .avail-dot { width:8px; height:8px; background:#22c55e; border-radius:50%; animation:pulse 2s ease-in-out infinite; flex-shrink:0; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
        .avail-head { display:flex; align-items:center; gap:8px; font-size:.9rem; font-weight:700; color:#6d28d9; margin-bottom:6px; }
        .avail-desc { font-size:.82rem; color:#7c3aed; line-height:1.55; }
      `}</style>

      <section className="contact-page">
        <div className="contact-container">
          <motion.div className="contact-header" initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ duration:.7,ease:[.16,1,.3,1] }}>
            <span className="contact-tag">📬 Hubungi Saya</span>
            <h1 className="contact-title">Mari Bekerja Sama!</h1>
            <p className="contact-sub">Terbuka untuk proyek web, audit keamanan, kolaborasi edukasi, atau sekadar ngobrol tech.</p>
          </motion.div>

          <div className="contact-grid">
            {/* Form */}
            <motion.div className="form-card" initial={{ opacity:0,x:-40 }} animate={{ opacity:1,x:0 }} transition={{ duration:.8,delay:.1,ease:[.16,1,.3,1] }}>
              <p className="form-title"><FaPaperPlane /> Kirim Pesan</p>
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div className="status-alert status-success" initial={{ opacity:0,y:-8 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-8 }}>
                    <FaCheckCircle /><span>Pesan berhasil terkirim! Saya akan segera merespons.</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div className="status-alert status-error" initial={{ opacity:0,y:-8 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-8 }}>
                    <FaTimesCircle /><span>Terjadi kesalahan. Coba via email langsung.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit}>
                {[
                  { name:'name',    label:'Nama',   type:'text',  placeholder:'Nama lengkap Anda' },
                  { name:'email',   label:'Email',  type:'email', placeholder:'email@contoh.com' },
                  { name:'subject', label:'Subjek', type:'text',  placeholder:'Misal: Kolaborasi Proyek' },
                ].map(({ name, label, type, placeholder }) => (
                  <div className="field-group" key={name}>
                    <label className="field-label" htmlFor={name}>{label}</label>
                    <input id={name} name={name} type={type} required placeholder={placeholder}
                      value={form[name]} onChange={handleChange}
                      onFocus={() => setFocused(name)} onBlur={() => setFocused('')}
                      className="field-input" style={{ borderColor: fieldBorder(name) }}
                    />
                  </div>
                ))}
                <div className="field-group">
                  <label className="field-label" htmlFor="message">Pesan</label>
                  <textarea id="message" name="message" required placeholder="Ceritakan kebutuhan Anda…"
                    value={form.message} onChange={handleChange}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                    className="field-textarea" style={{ borderColor: fieldBorder('message') }}
                  />
                </div>
                <motion.button type="submit" className="submit-btn" disabled={isSubmitting}
                  whileHover={!isSubmitting ? { y:-2 } : {}} whileTap={!isSubmitting ? { scale:.98 } : {}}>
                  <FaPaperPlane /> {isSubmitting ? 'Mengirim…' : 'Kirim Pesan'}
                </motion.button>
              </form>
            </motion.div>

            {/* Right */}
            <motion.div className="contact-right" initial={{ opacity:0,x:40 }} animate={{ opacity:1,x:0 }} transition={{ duration:.8,delay:.2,ease:[.16,1,.3,1] }}>
              <div className="info-card">
                <p className="info-card-title">Info Kontak</p>
                {contactInfo.map(({ icon:Icon, label, value, href, color, bg }) => (
                  <div className="info-item" key={label}>
                    <div className="info-icon" style={{ background:bg, color }}><Icon /></div>
                    <div>
                      <p className="info-label">{label}</p>
                      <p className="info-value">{href ? <a href={href}>{value}</a> : value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="info-card">
                <p className="info-card-title">Temukan Saya di</p>
                <div className="social-btns">
                  {socials.map(({ icon:Icon, href, label, bg }) => (
                    <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="social-btn" style={{ background:bg }}
                      whileHover={{ y:-3, scale:1.04 }} whileTap={{ scale:.96 }}>
                      <Icon /> {label}
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="avail-card">
                <div className="avail-head"><div className="avail-dot" /> Open to Work!</div>
                <p className="avail-desc">Tersedia untuk <strong>freelance</strong>, kolaborasi, dan peluang full-time. Tulis <strong>"URGENT"</strong> di subjek untuk respon lebih cepat.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}