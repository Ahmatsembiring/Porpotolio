// src/pages/Sertifikasi.jsx
//update: 2024-06-15
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FaAward,
  FaCalendarAlt,
  FaCertificate,
  FaExternalLinkAlt,
  FaSearch,
  FaTimes,
  FaUniversity,
} from 'react-icons/fa';

const MotionArticle = motion.article;
const MotionDiv = motion.div;
const MotionHeader = motion.header;

const sertifikasiData = [
  {
    id: 1,
    nama: 'Certified Apresiasion BMKG',
    penerbit: 'BMKG',
    tahun: '2024',
    kategori: 'Security',
    gambar: '/sertifikasi/sertifikat1.png',
  },
  {
    id: 2,
    nama: 'Certified Bug Hunter',
    penerbit: 'Diskominfo Santik Sulawesi Tengah',
    tahun: '2023',
    kategori: 'Web Dev',
    gambar: '/sertifikasi/sertifikat2.png',
  },
  {
    id: 3,
    nama: 'Piagam Penghargaan Keamanan Siber Pemprov Bali',
    penerbit: 'AWS',
    tahun: '2023',
    kategori: 'Cloud',
    gambar: '/sertifikasi/sertifikat3.png',
  },
  {
    id: 4,
    nama: 'Artificial Intelligence Fundamentals',
    penerbit: 'Coursera',
    tahun: '2023',
    kategori: 'AI',
    gambar: '/sertifikasi/sertifikat4.png',
  },
  {
    id: 5,
    nama: 'Web Development Bootcamp',
    penerbit: 'Udemy',
    tahun: '2023',
    kategori: 'Web Dev',
    gambar: '/sertifikasi/sertifikat5.png',
  },
  {
    id: 6,
    nama: 'Web Development Bootcamp',
    penerbit: 'Udemy',
    tahun: '2023',
    kategori: 'Web Dev',
    gambar: '/sertifikasi/sertifikat6.jpg',
  },
  {
    id: 7,
    nama: 'Web Development Bootcamp',
    penerbit: 'Udemy',
    tahun: '2023',
    kategori: 'Web Dev',
    gambar: '/sertifikasi/sertifikat7.png',
  },
  {
    id: 8,
    nama: 'Web Development Bootcamp',
    penerbit: 'Udemy',
    tahun: '2023',
    kategori: 'Web Dev',
    gambar: '/sertifikasi/sertifikat8.png',
  },
  {
    id: 9,
    nama: 'Web Development Bootcamp',
    penerbit: 'Udemy',
    tahun: '2023',
    kategori: 'Web Dev',
    gambar: '/sertifikasi/sertifikat9.png',
  },
];

const categoryTheme = {
  Security: {
    gradient: 'linear-gradient(135deg, #ef4444, #8b5cf6)',
    soft: 'rgba(239, 68, 68, 0.1)',
    text: '#b91c1c',
    ring: 'rgba(239, 68, 68, 0.22)',
  },
  'Web Dev': {
    gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
    soft: 'rgba(59, 130, 246, 0.1)',
    text: '#1d4ed8',
    ring: 'rgba(59, 130, 246, 0.22)',
  },
  Cloud: {
    gradient: 'linear-gradient(135deg, #0ea5e9, #14b8a6)',
    soft: 'rgba(14, 165, 233, 0.11)',
    text: '#0369a1',
    ring: 'rgba(14, 165, 233, 0.22)',
  },
  AI: {
    gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    soft: 'rgba(139, 92, 246, 0.1)',
    text: '#6d28d9',
    ring: 'rgba(139, 92, 246, 0.22)',
  },
};

const getTheme = (kategori) => categoryTheme[kategori] || categoryTheme['Web Dev'];

function CertificationCard({ item, index, onPreview }) {
  const theme = getTheme(item.kategori);

  return (
    <MotionArticle
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.42, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="cert-card"
    >
      <button type="button" className="cert-thumb" onClick={() => onPreview(item)}>
        <img
          src={item.gambar}
          alt={item.nama}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <span className="cert-thumb-glow" style={{ background: theme.gradient }} />
        <span className="cert-view-pill">Preview</span>
      </button>

      <div className="cert-body">
        <div className="cert-meta">
          <span
            className="cert-badge"
            style={{ background: theme.soft, color: theme.text, borderColor: theme.ring }}
          >
            {item.kategori}
          </span>
          <span className="cert-year">
            <FaCalendarAlt /> {item.tahun}
          </span>
        </div>

        <h3 className="cert-title">{item.nama}</h3>
        <p className="cert-issuer">
          <FaUniversity /> {item.penerbit}
        </p>

        <button type="button" className="cert-cta" onClick={() => onPreview(item)}>
          Lihat detail
          <FaExternalLinkAlt />
        </button>
      </div>

      <span className="cert-line" style={{ background: theme.gradient }} />
    </MotionArticle>
  );
}

export default function Sertifikasi() {
  const [search, setSearch] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const filteredCertificates = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return sertifikasiData.filter((item) => {
      const matchesSearch =
        item.nama.toLowerCase().includes(keyword) ||
        item.penerbit.toLowerCase().includes(keyword) ||
        item.tahun.includes(keyword);

      return matchesSearch;
    });
  }, [search]);

  const totalCategories = new Set(sertifikasiData.map((item) => item.kategori)).size;
  const newestYear = Math.max(...sertifikasiData.map((item) => Number(item.tahun)));

  return (
    <>
      <style>{`
        .cert-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(59, 130, 246, 0.11), transparent 34rem),
            radial-gradient(circle at top right, rgba(236, 72, 153, 0.1), transparent 32rem),
            linear-gradient(180deg, #f8f4ff 0%, #f0f7ff 45%, #fbfdff 100%);
          padding: 5.5rem 0 6rem;
          overflow: hidden;
          position: relative;
        }
        .cert-page::after {
          content: '';
          position: absolute;
          inset: auto -8rem -12rem auto;
          width: 34rem;
          height: 34rem;
          background: radial-gradient(circle, rgba(14, 165, 233, 0.11), transparent 68%);
          pointer-events: none;
        }
        .cert-container {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 1.25rem;
          position: relative;
          z-index: 1;
        }
        .cert-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .cert-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.36rem 0.95rem;
          border: 1px solid rgba(139, 92, 246, 0.24);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.72);
          color: #6d28d9;
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .cert-heading {
          margin: 0.9rem 0 0.65rem;
          font-size: clamp(2rem, 5vw, 3.2rem);
          line-height: 1.05;
          font-weight: 900;
          letter-spacing: 0;
          background: linear-gradient(135deg, #1e3a8a, #6d28d9, #be185d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .cert-subtitle {
          max-width: 560px;
          margin: 0 auto;
          color: #64748b;
          line-height: 1.7;
          font-size: 1rem;
        }
        .cert-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.8rem;
          max-width: 680px;
          margin: 1.8rem auto 0;
        }
        .cert-stat {
          background: rgba(255, 255, 255, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 18px;
          box-shadow: 0 10px 32px rgba(15, 23, 42, 0.06);
          padding: 1rem;
          backdrop-filter: blur(14px);
        }
        .cert-stat strong {
          display: block;
          color: #172554;
          font-size: 1.55rem;
          line-height: 1;
          font-weight: 900;
        }
        .cert-stat span {
          display: block;
          margin-top: 0.32rem;
          color: #64748b;
          font-size: 0.78rem;
          font-weight: 700;
        }
        .cert-toolbar {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin: 2.4rem 0 1rem;
        }
        .cert-search {
          position: relative;
          flex: 0 0 260px;
        }
        .cert-search svg {
          position: absolute;
          left: 0.9rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          font-size: 0.9rem;
        }
        .cert-search input {
          width: 100%;
          min-height: 2.45rem;
          border-radius: 999px;
          border: 1px solid rgba(15, 23, 42, 0.08);
          background: rgba(255, 255, 255, 0.78);
          color: #1e293b;
          outline: none;
          padding: 0.58rem 1rem 0.58rem 2.45rem;
          font-size: 0.86rem;
          font-family: inherit;
          box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .cert-search input:focus {
          border-color: rgba(139, 92, 246, 0.45);
          box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
        }
        .cert-count {
          color: #94a3b8;
          font-size: 0.82rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
        }
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.25rem;
        }
        .cert-card {
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.84);
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow: 0 8px 32px rgba(15, 23, 42, 0.07);
          backdrop-filter: blur(16px);
        }
        .cert-card:hover {
          box-shadow: 0 22px 52px rgba(15, 23, 42, 0.13);
        }
        .cert-thumb {
          position: relative;
          display: block;
          width: 100%;
          height: 190px;
          overflow: hidden;
          background: #e2e8f0;
          border: 0;
          padding: 0;
          cursor: pointer;
        }
        .cert-thumb img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.55s ease;
        }
        .cert-card:hover .cert-thumb img {
          transform: scale(1.08);
        }
        .cert-thumb-glow {
          position: absolute;
          inset: 0;
          opacity: 0.08;
          transition: opacity 0.25s;
        }
        .cert-card:hover .cert-thumb-glow {
          opacity: 0.2;
        }
        .cert-view-pill {
          position: absolute;
          right: 0.8rem;
          bottom: 0.8rem;
          padding: 0.36rem 0.72rem;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.72);
          color: #fff;
          font-size: 0.72rem;
          font-weight: 800;
          transform: translateY(8px);
          opacity: 0;
          transition: transform 0.2s, opacity 0.2s;
        }
        .cert-card:hover .cert-view-pill {
          transform: translateY(0);
          opacity: 1;
        }
        .cert-body {
          padding: 1.1rem 1.15rem 1.2rem;
        }
        .cert-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.8rem;
        }
        .cert-badge {
          border: 1px solid;
          border-radius: 999px;
          padding: 0.28rem 0.68rem;
          font-size: 0.7rem;
          font-weight: 900;
        }
        .cert-year,
        .cert-issuer {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #94a3b8;
          font-size: 0.76rem;
          font-weight: 700;
        }
        .cert-title {
          min-height: 2.65rem;
          color: #172554;
          font-size: 1rem;
          line-height: 1.34;
          font-weight: 900;
        }
        .cert-issuer {
          margin: 0.55rem 0 1rem;
          color: #64748b;
        }
        .cert-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: 0;
          background: transparent;
          color: #6d28d9;
          padding: 0;
          font-size: 0.82rem;
          font-weight: 900;
          cursor: pointer;
        }
        .cert-cta svg {
          font-size: 0.72rem;
          transition: transform 0.2s;
        }
        .cert-card:hover .cert-cta svg {
          transform: translate(3px, -3px);
        }
        .cert-line {
          display: block;
          height: 3px;
          width: 100%;
        }
        .cert-empty {
          padding: 4rem 1rem;
          text-align: center;
          color: #64748b;
          font-weight: 700;
        }
        .cert-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 60;
          display: grid;
          place-items: center;
          padding: 1.25rem;
          background: rgba(15, 23, 42, 0.58);
          backdrop-filter: blur(10px);
        }
        .cert-modal {
          width: min(920px, 100%);
          max-height: min(88vh, 760px);
          overflow: hidden;
          border-radius: 24px;
          background: #fff;
          box-shadow: 0 30px 90px rgba(15, 23, 42, 0.32);
        }
        .cert-modal-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem 1.1rem;
          border-bottom: 1px solid rgba(15, 23, 42, 0.08);
        }
        .cert-modal-title {
          color: #172554;
          font-size: 1rem;
          font-weight: 900;
          line-height: 1.35;
        }
        .cert-modal-sub {
          margin-top: 0.25rem;
          color: #64748b;
          font-size: 0.82rem;
          font-weight: 700;
        }
        .cert-close {
          display: grid;
          place-items: center;
          width: 2.35rem;
          height: 2.35rem;
          border-radius: 999px;
          border: 1px solid rgba(15, 23, 42, 0.08);
          background: #f8fafc;
          color: #475569;
          cursor: pointer;
        }
        .cert-modal-image {
          max-height: calc(88vh - 86px);
          overflow: auto;
          background: #0f172a;
          padding: 1rem;
        }
        .cert-modal-image img {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 14px;
          background: #e2e8f0;
        }
        @media (max-width: 900px) {
          .cert-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .cert-toolbar { align-items: stretch; }
          .cert-search { flex: none; }
        }
        @media (max-width: 640px) {
          .cert-page { padding-top: 5rem; }
          .cert-stats { grid-template-columns: 1fr; }
          .cert-grid { grid-template-columns: 1fr; }
          .cert-count { text-align: center; }
          .cert-thumb { height: 210px; }
          .cert-modal-top { align-items: center; }
        }
      `}</style>

      <section className="cert-page">
        <div className="cert-container">
          <MotionHeader
            className="cert-header"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="cert-kicker">
              <FaCertificate /> Credential Wall
            </span>
            <h1 className="cert-heading">Sertifikasi</h1>
            <p className="cert-subtitle">
              Kumpulan sertifikat yang merekam proses belajar saya di bidang web development,
              security, cloud, dan AI.
            </p>

            <div className="cert-stats">
              <MotionDiv className="cert-stat" whileHover={{ y: -4 }}>
                <strong>{sertifikasiData.length}</strong>
                <span>Total Sertifikat</span>
              </MotionDiv>
              <MotionDiv className="cert-stat" whileHover={{ y: -4 }}>
                <strong>{totalCategories}</strong>
                <span>Kategori Skill</span>
              </MotionDiv>
              <MotionDiv className="cert-stat" whileHover={{ y: -4 }}>
                <strong>{newestYear}</strong>
                <span>Tahun Terbaru</span>
              </MotionDiv>
            </div>
          </MotionHeader>

          <MotionDiv
            className="cert-toolbar"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <label className="cert-search">
              <FaSearch />
              <input
                type="search"
                placeholder="Cari sertifikat..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
          </MotionDiv>

          <p className="cert-count">{filteredCertificates.length} sertifikat ditemukan</p>

          {filteredCertificates.length > 0 ? (
            <MotionDiv className="cert-grid" layout>
              <AnimatePresence mode="popLayout">
                {filteredCertificates.map((item, index) => (
                  <CertificationCard
                    key={item.id}
                    item={item}
                    index={index}
                    onPreview={setSelectedCertificate}
                  />
                ))}
              </AnimatePresence>
            </MotionDiv>
          ) : (
            <MotionDiv className="cert-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Sertifikat tidak ditemukan. Coba kategori atau kata kunci lain.
            </MotionDiv>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedCertificate && (
          <MotionDiv
            className="cert-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
          >
            <MotionDiv
              className="cert-modal"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.22 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="cert-modal-top">
                <div>
                  <h2 className="cert-modal-title">{selectedCertificate.nama}</h2>
                  <p className="cert-modal-sub">
                    <FaAward /> {selectedCertificate.penerbit} - {selectedCertificate.tahun}
                  </p>
                </div>
                <button
                  type="button"
                  className="cert-close"
                  aria-label="Tutup preview"
                  onClick={() => setSelectedCertificate(null)}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="cert-modal-image">
                <img src={selectedCertificate.gambar} alt={selectedCertificate.nama} />
              </div>
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
}
