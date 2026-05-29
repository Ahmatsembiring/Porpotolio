import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowRight,
  FaBookOpen,
  FaBriefcase,
  FaCalendarAlt,
  FaClock,
  FaCode,
  FaEthereum,
  FaGraduationCap,
  FaSearch,
  FaShieldAlt,
} from 'react-icons/fa';
import { blogPosts } from '../data/blogs';

const accentMap = {
  security: {
    icon: FaShieldAlt,
    gradient: 'linear-gradient(135deg, #3b82f6, #6d28d9)',
    badgeBg: 'rgba(59,130,246,0.1)',
    badgeColor: '#1d4ed8',
    border: 'rgba(59,130,246,0.2)',
  },
  web: {
    icon: FaCode,
    gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
    badgeBg: 'rgba(14,165,233,0.1)',
    badgeColor: '#0369a1',
    border: 'rgba(14,165,233,0.22)',
  },
  web3: {
    icon: FaEthereum,
    gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    badgeBg: 'rgba(139,92,246,0.1)',
    badgeColor: '#6d28d9',
    border: 'rgba(139,92,246,0.22)',
  },
  experience: {
    icon: FaBriefcase,
    gradient: 'linear-gradient(135deg, #10b981, #3b82f6)',
    badgeBg: 'rgba(16,185,129,0.1)',
    badgeColor: '#047857',
    border: 'rgba(16,185,129,0.22)',
  },
  learning: {
    icon: FaGraduationCap,
    gradient: 'linear-gradient(135deg, #f59e0b, #ec4899)',
    badgeBg: 'rgba(245,158,11,0.12)',
    badgeColor: '#b45309',
    border: 'rgba(245,158,11,0.24)',
  },
};

function BlogCard({ post, index, featured = false }) {
  const accent = accentMap[post.accent] || accentMap.web;
  const Icon = accent.icon;

  return (
    <Motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className={featured ? 'blog-card blog-card-featured' : 'blog-card'}
    >
      <div className="blog-card-visual" style={{ background: accent.gradient }}>
        <div className="blog-visual-grid" />
        <div className="blog-icon-wrap">
          <Icon />
        </div>
        <span className="blog-category-badge" style={{ background: accent.badgeBg, color: accent.badgeColor, borderColor: accent.border }}>
          {post.category}
        </span>
      </div>

      <div className="blog-card-body">
        <div className="blog-meta-row">
          <span><FaCalendarAlt /> {post.date}</span>
          <span><FaClock /> {post.readTime}</span>
        </div>

        <h2 className="blog-card-title">{post.title}</h2>
        <p className="blog-card-excerpt">{post.excerpt}</p>

        <div className="blog-tag-row">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="blog-tag">{tag}</span>
          ))}
        </div>

        <Link to={`/blog/${post.slug}`} className="blog-read-link">
          Baca Selengkapnya
          <FaArrowRight />
        </Link>
      </div>
    </Motion.article>
  );
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [search, setSearch] = useState('');

  const categories = useMemo(
    () => ['Semua', ...new Set(blogPosts.map((post) => post.category))],
    [],
  );

  const featuredPost = blogPosts[0];
  const filteredPosts = blogPosts.filter((post) => {
    const matchCategory = activeCategory === 'Semua' || post.category === activeCategory;
    const keyword = search.toLowerCase();
    const matchSearch =
      post.title.toLowerCase().includes(keyword) ||
      post.excerpt.toLowerCase().includes(keyword) ||
      post.tags.join(' ').toLowerCase().includes(keyword);

    return matchCategory && matchSearch;
  });

  const gridPosts = filteredPosts.filter((post) => post.slug !== featuredPost.slug);
  const showFeatured = activeCategory === 'Semua' && !search;

  return (
    <>
      <style>{`
        .blog-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #f8f4ff 0%, #f0f4ff 42%, #fafbff 100%);
          padding: 5rem 0 6rem;
          position: relative;
          overflow: hidden;
        }
        .blog-page::before {
          content: '';
          position: absolute;
          top: -100px;
          right: -90px;
          width: 520px;
          height: 520px;
          background: radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .blog-page::after {
          content: '';
          position: absolute;
          bottom: -160px;
          left: -120px;
          width: 460px;
          height: 460px;
          background: radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .blog-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.25rem;
          position: relative;
          z-index: 2;
        }
        .blog-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .blog-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
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
        .blog-title {
          font-size: clamp(1.9rem, 5vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #1e3a8a, #6d28d9, #be185d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.75rem;
        }
        .blog-subtitle {
          font-size: 1rem;
          color: #64748b;
          max-width: 620px;
          margin: 0 auto;
          line-height: 1.65;
        }
        .blog-featured-wrap {
          margin-bottom: 2rem;
        }
        .blog-tools {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: stretch;
          margin-bottom: 1.5rem;
        }
        @media (min-width: 768px) {
          .blog-tools {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }
        .blog-filter-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .blog-filter-tab {
          padding: 8px 15px;
          border-radius: 999px;
          border: 1.5px solid rgba(0,0,0,0.08);
          background: rgba(255,255,255,0.82);
          color: #64748b;
          font-size: 0.82rem;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .blog-filter-tab:hover {
          border-color: rgba(139,92,246,0.3);
          color: #6d28d9;
        }
        .blog-filter-tab.active {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: #fff;
          border-color: transparent;
          box-shadow: 0 6px 22px rgba(59,130,246,0.24);
        }
        .blog-search-wrap {
          position: relative;
          width: 100%;
        }
        @media (min-width: 768px) {
          .blog-search-wrap {
            width: 260px;
          }
        }
        .blog-search-icon {
          position: absolute;
          left: 13px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          font-size: 0.88rem;
          pointer-events: none;
        }
        .blog-search-input {
          width: 100%;
          box-sizing: border-box;
          padding: 10px 14px 10px 38px;
          border-radius: 999px;
          border: 1.5px solid rgba(0,0,0,0.09);
          background: rgba(255,255,255,0.86);
          backdrop-filter: blur(10px);
          outline: none;
          font-size: 0.875rem;
          font-family: inherit;
          color: #1e293b;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .blog-search-input:focus {
          border-color: #8b5cf6;
          box-shadow: 0 0 0 3px rgba(139,92,246,0.1);
        }
        .blog-result-count {
          color: #94a3b8;
          font-size: 0.82rem;
          font-weight: 600;
          margin-bottom: 1.25rem;
          text-align: center;
        }
        .blog-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 700px) {
          .blog-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .blog-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .blog-card {
          height: 100%;
          background: rgba(255,255,255,0.86);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
          position: relative;
          transition: box-shadow 0.25s;
        }
        .blog-card:hover {
          box-shadow: 0 16px 48px rgba(0,0,0,0.12);
        }
        .blog-card-featured {
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 800px) {
          .blog-card-featured {
            grid-template-columns: 0.9fr 1.1fr;
          }
          .blog-card-featured .blog-card-visual {
            min-height: 100%;
          }
          .blog-card-featured .blog-card-title {
            font-size: clamp(1.35rem, 3vw, 2rem);
          }
        }
        .blog-card-visual {
          min-height: 170px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .blog-visual-grid {
          position: absolute;
          inset: 0;
          opacity: 0.18;
          background-image:
            linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .blog-icon-wrap {
          width: 76px;
          height: 76px;
          border-radius: 22px;
          background: rgba(255,255,255,0.16);
          border: 1px solid rgba(255,255,255,0.28);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          box-shadow: 0 18px 40px rgba(0,0,0,0.16);
          position: relative;
          z-index: 2;
        }
        .blog-category-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 2;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 5px 11px;
          border-radius: 999px;
          border: 1px solid;
          background: rgba(255,255,255,0.86);
          backdrop-filter: blur(10px);
        }
        .blog-card-body {
          padding: 1.35rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex: 1;
        }
        .blog-meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          color: #94a3b8;
          font-size: 0.76rem;
          font-weight: 700;
        }
        .blog-meta-row span {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .blog-card-title {
          color: #1e293b;
          font-size: 1.05rem;
          font-weight: 800;
          line-height: 1.3;
          letter-spacing: -0.01em;
        }
        .blog-card-excerpt {
          color: #64748b;
          font-size: 0.875rem;
          line-height: 1.65;
          flex: 1;
        }
        .blog-tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }
        .blog-tag {
          color: #475569;
          background: #f1f5f9;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 8px;
          padding: 4px 9px;
          font-size: 0.7rem;
          font-weight: 700;
        }
        .blog-read-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          width: fit-content;
          color: #6d28d9;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 800;
          padding-top: 0.25rem;
          transition: gap 0.2s, color 0.2s;
        }
        .blog-read-link:hover {
          gap: 11px;
          color: #4c1d95;
        }
        .blog-read-link svg {
          font-size: 0.8rem;
        }
        .blog-empty {
          text-align: center;
          padding: 4rem 1rem;
          background: rgba(255,255,255,0.72);
          border: 1px solid rgba(255,255,255,0.9);
          border-radius: 22px;
          color: #64748b;
          font-weight: 600;
        }
      `}</style>

      <section className="blog-page">
        <div className="blog-container">
          <Motion.div
            className="blog-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="blog-kicker"><FaBookOpen /> Personal Blog</span>
            <h1 className="blog-title">Blog & Catatan Belajar</h1>
            <p className="blog-subtitle">
              Tulisan tentang cyber security, web development, Web3, pengalaman magang,
              dan perjalanan saya sebagai mahasiswa Teknik Informatika.
            </p>
          </Motion.div>

          {showFeatured && (
            <div className="blog-featured-wrap">
              <BlogCard post={featuredPost} index={0} featured />
            </div>
          )}

          <Motion.div
            className="blog-tools"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <div className="blog-filter-tabs">
              {categories.map((category) => (
                <Motion.button
                  key={category}
                  className={`blog-filter-tab ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {category}
                </Motion.button>
              ))}
            </div>
            <div className="blog-search-wrap">
              <FaSearch className="blog-search-icon" />
              <input
                className="blog-search-input"
                placeholder="Cari artikel..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </Motion.div>

          <p className="blog-result-count">{filteredPosts.length} artikel tersedia</p>

          {filteredPosts.length === 0 ? (
            <Motion.div className="blog-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Artikel tidak ditemukan. Coba kategori atau kata kunci lain.
            </Motion.div>
          ) : (
            <Motion.div className="blog-grid" layout>
              <AnimatePresence mode="popLayout">
                {(showFeatured ? gridPosts : filteredPosts).map((post, index) => (
                  <BlogCard key={post.slug} post={post} index={index} />
                ))}
              </AnimatePresence>
            </Motion.div>
          )}
        </div>
      </section>
    </>
  );
}
