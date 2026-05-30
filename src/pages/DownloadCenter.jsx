import { useMemo, useState } from 'react';
import {
  FaBookOpen,
  FaCalendarAlt,
  FaCloud,
  FaDownload,
  FaFileAlt,
  FaFilter,
  FaSearch,
  FaShieldAlt,
  FaUserSecret,
} from 'react-icons/fa';
import { downloads } from '../data/downloads';

const categoryIcons = {
  'Web Security': FaShieldAlt,
  'Offensive Security': FaUserSecret,
  'ISO 27001': FaFileAlt,
  'Risk Management': FaFilter,
  'Cloud Security': FaCloud,
  Technology: FaBookOpen,
};

const categoryColors = {
  'Web Security': '#38bdf8',
  'Offensive Security': '#a78bfa',
  'ISO 27001': '#22c55e',
  'Risk Management': '#f59e0b',
  'Cloud Security': '#60a5fa',
  Technology: '#f472b6',
};

function formatDate(value) {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

function DownloadCard({ item }) {
  const Icon = categoryIcons[item.category] || FaFileAlt;
  const color = categoryColors[item.category] || '#60a5fa';

  return (
    <article className="download-card">
      <div className="download-card-top">
        <div className="download-icon" style={{ color, background: `${color}18` }}>
          <Icon />
        </div>
        <span className="download-type">{item.type}</span>
      </div>

      <div className="download-card-body">
        <span className="download-category" style={{ color, borderColor: `${color}55`, background: `${color}12` }}>
          {item.category}
        </span>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
      </div>

      <div className="download-meta">
        <span><FaCalendarAlt /> {formatDate(item.publishedAt)}</span>
        <span>{item.size}</span>
      </div>

      <a className="download-btn" href={item.file} download>
        <FaDownload />
        Download
      </a>
    </article>
  );
}

export default function DownloadCenter() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [search, setSearch] = useState('');

  const categories = useMemo(
    () => ['Semua', ...new Set(downloads.map((item) => item.category))],
    [],
  );

  const filteredDownloads = downloads.filter((item) => {
    const keyword = search.trim().toLowerCase();
    const matchesCategory = activeCategory === 'Semua' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword) ||
      item.type.toLowerCase().includes(keyword);

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <style>{`
        .download-page {
          min-height: 100vh;
          padding: 5rem 0 6rem;
          position: relative;
        }
        .download-container {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 1.25rem;
          position: relative;
          z-index: 2;
        }
        .download-header {
          text-align: center;
          margin-bottom: 2.4rem;
        }
        .download-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 999px;
          color: #93c5fd;
          background: rgba(37, 99, 235, 0.14);
          border: 1px solid rgba(96, 165, 250, 0.22);
          font-size: 0.76rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 1rem;
        }
        .download-title {
          font-size: clamp(2rem, 5vw, 3.35rem);
          line-height: 1.05;
          font-weight: 900;
          background: linear-gradient(135deg, #60a5fa, #38bdf8 45%, #a78bfa);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.8rem;
        }
        .download-subtitle {
          max-width: 720px;
          margin: 0 auto;
          color: var(--text-soft);
          line-height: 1.75;
        }
        .download-toolbar {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-bottom: 1.6rem;
        }
        @media (min-width: 820px) {
          .download-toolbar {
            grid-template-columns: 1fr auto;
            align-items: center;
          }
        }
        .download-search {
          position: relative;
        }
        .download-search svg {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .download-search input {
          width: 100%;
          box-sizing: border-box;
          min-height: 2.9rem;
          border-radius: 999px;
          border: 1px solid var(--line);
          background: rgba(15, 23, 42, 0.72);
          color: var(--text-main);
          outline: none;
          padding: 0.7rem 1rem 0.7rem 2.8rem;
          font: inherit;
        }
        .download-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
        }
        .download-tab {
          border: 1px solid var(--line);
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.72);
          color: var(--text-soft);
          padding: 0.62rem 0.9rem;
          font: inherit;
          font-size: 0.82rem;
          font-weight: 900;
          cursor: pointer;
          transition: transform 0.2s, border-color 0.2s, color 0.2s, background 0.2s;
        }
        .download-tab:hover {
          transform: translateY(-2px);
          color: #e0f2fe;
          border-color: rgba(56, 189, 248, 0.34);
        }
        .download-tab.active {
          color: #fff;
          border-color: transparent;
          background: linear-gradient(135deg, #2563eb, #38bdf8);
        }
        .download-count {
          color: var(--text-muted);
          font-size: 0.84rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }
        .download-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.2rem;
        }
        @media (min-width: 700px) {
          .download-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (min-width: 1040px) {
          .download-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        .download-card {
          display: flex;
          min-height: 100%;
          flex-direction: column;
          gap: 1rem;
          border: 1px solid var(--line);
          border-radius: 22px;
          background: var(--surface);
          box-shadow: var(--shadow-card);
          padding: 1.25rem;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }
        .download-card:hover {
          transform: translateY(-6px);
          border-color: rgba(56, 189, 248, 0.24);
          box-shadow: 0 28px 82px rgba(15, 23, 42, 0.58), 0 0 0 1px rgba(56, 189, 248, 0.08);
        }
        .download-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.8rem;
        }
        .download-icon {
          width: 48px;
          height: 48px;
          border-radius: 15px;
          display: grid;
          place-items: center;
          font-size: 1.25rem;
        }
        .download-type {
          color: var(--text-soft);
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 0.3rem 0.62rem;
          font-size: 0.72rem;
          font-weight: 900;
        }
        .download-category {
          display: inline-flex;
          width: fit-content;
          border: 1px solid;
          border-radius: 999px;
          padding: 0.3rem 0.62rem;
          font-size: 0.72rem;
          font-weight: 900;
          margin-bottom: 0.8rem;
        }
        .download-card h2 {
          color: var(--text-main);
          font-size: 1.05rem;
          font-weight: 900;
          line-height: 1.35;
          margin-bottom: 0.55rem;
        }
        .download-card p {
          color: var(--text-soft);
          line-height: 1.65;
          font-size: 0.88rem;
        }
        .download-meta {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.65rem;
          color: var(--text-muted);
          font-size: 0.78rem;
          font-weight: 800;
          margin-top: auto;
          padding-top: 0.2rem;
        }
        .download-meta span {
          display: inline-flex;
          align-items: center;
          gap: 0.38rem;
        }
        .download-btn {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          gap: 0.55rem;
          min-height: 2.65rem;
          border-radius: 14px;
          color: #fff;
          text-decoration: none;
          font-weight: 900;
          background: linear-gradient(135deg, #2563eb, #38bdf8);
          box-shadow: 0 12px 30px rgba(37, 99, 235, 0.28);
          transition: transform 0.2s, filter 0.2s;
        }
        .download-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.08);
        }
        .download-empty {
          border: 1px solid var(--line);
          border-radius: 22px;
          background: var(--surface);
          color: var(--text-soft);
          padding: 3rem 1rem;
          text-align: center;
          font-weight: 800;
        }
        html[data-theme='light'] .download-search input,
        html[data-theme='light'] .download-tab {
          background: rgba(248, 250, 252, 0.92);
          color: #475569;
        }
        html[data-theme='light'] .download-card:hover {
          box-shadow: 0 22px 58px rgba(15, 23, 42, 0.13), 0 0 0 1px rgba(37, 99, 235, 0.05);
        }
      `}</style>

      <main className="download-page">
        <div className="download-container">
          <header className="download-header">
            <span className="download-kicker"><FaDownload /> Knowledge Base</span>
            <h1 className="download-title">Download Center</h1>
            <p className="download-subtitle">
              Kumpulan tulisan, e-book mini, template, catatan pembelajaran, dan dokumentasi
              seputar Cyber Security, Offensive Security, ISO 27001, Risk Management,
              Web Security, Cloud Security, dan teknologi lainnya.
            </p>
          </header>

          <section className="download-toolbar" aria-label="Download filters">
            <label className="download-search">
              <FaSearch />
              <input
                type="search"
                placeholder="Cari materi, kategori, atau topik..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <div className="download-tabs">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`download-tab ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          <p className="download-count">{filteredDownloads.length} materi tersedia</p>

          {filteredDownloads.length > 0 ? (
            <section className="download-grid">
              {filteredDownloads.map((item) => (
                <DownloadCard key={item.id} item={item} />
              ))}
            </section>
          ) : (
            <div className="download-empty">
              Materi tidak ditemukan. Coba kata kunci atau kategori lain.
            </div>
          )}
        </div>
      </main>
    </>
  );
}
