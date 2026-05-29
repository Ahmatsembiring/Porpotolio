import { Link, useParams } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import {
  FaArrowLeft,
  FaArrowRight,
  FaBookOpen,
  FaBriefcase,
  FaCalendarAlt,
  FaClock,
  FaCode,
  FaEthereum,
  FaGraduationCap,
  FaShieldAlt,
} from 'react-icons/fa';
import { blogPosts } from '../data/blogs';

const accentMap = {
  security: { icon: FaShieldAlt, gradient: 'linear-gradient(135deg, #3b82f6, #6d28d9)', color: '#6d28d9' },
  web: { icon: FaCode, gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)', color: '#0369a1' },
  web3: { icon: FaEthereum, gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)', color: '#7c3aed' },
  experience: { icon: FaBriefcase, gradient: 'linear-gradient(135deg, #10b981, #3b82f6)', color: '#047857' },
  learning: { icon: FaGraduationCap, gradient: 'linear-gradient(135deg, #f59e0b, #ec4899)', color: '#b45309' },
};

export default function BlogDetail() {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <section style={{ minHeight: '70vh', padding: '6rem 1.25rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.75rem' }}>
          Artikel Tidak Ditemukan
        </h1>
        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
          Artikel yang kamu cari belum tersedia atau sudah dipindahkan.
        </p>
        <Link to="/blog" style={{ color: '#6d28d9', fontWeight: 800, textDecoration: 'none' }}>
          Kembali ke Blog
        </Link>
      </section>
    );
  }

  const accent = accentMap[post.accent] || accentMap.web;
  const Icon = accent.icon;
  const relatedPosts = blogPosts
    .filter((item) => item.slug !== post.slug && item.category === post.category)
    .slice(0, 2);

  return (
    <>
      <style>{`
        .blog-detail-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #f8f4ff 0%, #f0f4ff 42%, #fff 100%);
          padding: 4.5rem 0 6rem;
          position: relative;
          overflow: hidden;
        }
        .blog-detail-page::before {
          content: '';
          position: absolute;
          top: -120px;
          right: -100px;
          width: 520px;
          height: 520px;
          background: radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .blog-detail-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 1.25rem;
          position: relative;
          z-index: 2;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #6d28d9;
          text-decoration: none;
          font-size: 0.86rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          transition: gap 0.2s;
        }
        .back-link:hover {
          gap: 12px;
        }
        .article-hero {
          background: rgba(255,255,255,0.84);
          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 26px;
          box-shadow: 0 8px 42px rgba(0,0,0,0.07);
          overflow: hidden;
          margin-bottom: 1.5rem;
        }
        .article-visual {
          min-height: 220px;
          background: var(--article-gradient);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .article-visual::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.18;
          background-image:
            linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        .article-icon-wrap {
          width: 90px;
          height: 90px;
          border-radius: 26px;
          background: rgba(255,255,255,0.16);
          border: 1px solid rgba(255,255,255,0.28);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.35rem;
          box-shadow: 0 18px 44px rgba(0,0,0,0.16);
          position: relative;
          z-index: 2;
        }
        .article-head {
          padding: 2rem;
        }
        @media (max-width: 520px) {
          .article-head {
            padding: 1.5rem;
          }
        }
        .article-category {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(139,92,246,0.09);
          border: 1px solid rgba(139,92,246,0.18);
          color: #6d28d9;
          border-radius: 999px;
          padding: 5px 12px;
          font-size: 0.74rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }
        .article-title {
          color: #1e293b;
          font-size: clamp(1.9rem, 5vw, 3.25rem);
          line-height: 1.12;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }
        .article-excerpt {
          color: #64748b;
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 1.25rem;
        }
        .article-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.9rem;
          color: #94a3b8;
          font-size: 0.82rem;
          font-weight: 700;
        }
        .article-meta span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .article-content {
          background: rgba(255,255,255,0.86);
          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 24px;
          box-shadow: 0 4px 28px rgba(0,0,0,0.06);
          padding: 2rem;
        }
        @media (max-width: 520px) {
          .article-content {
            padding: 1.5rem;
          }
        }
        .article-section + .article-section {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(0,0,0,0.06);
        }
        .article-section h2 {
          color: #1e293b;
          font-size: 1.25rem;
          line-height: 1.35;
          font-weight: 800;
          margin-bottom: 0.85rem;
        }
        .article-section p {
          color: #475569;
          font-size: 0.95rem;
          line-height: 1.85;
          margin-bottom: 1rem;
        }
        .article-section p:last-child {
          margin-bottom: 0;
        }
        .article-section ul {
          display: grid;
          gap: 0.75rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .article-section li {
          color: #475569;
          background: #f8fafc;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 14px;
          padding: 0.85rem 1rem 0.85rem 2.3rem;
          line-height: 1.65;
          position: relative;
          font-size: 0.92rem;
        }
        .article-section li::before {
          content: '';
          position: absolute;
          left: 1rem;
          top: 1.5rem;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--article-color);
        }
        .article-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(0,0,0,0.06);
        }
        .article-tag {
          background: #f1f5f9;
          border: 1px solid rgba(0,0,0,0.06);
          color: #475569;
          border-radius: 9px;
          padding: 5px 10px;
          font-size: 0.72rem;
          font-weight: 800;
        }
        .related-block {
          margin-top: 2rem;
        }
        .related-title {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #1e293b;
          font-size: 1rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }
        .related-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 680px) {
          .related-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .related-card {
          background: rgba(255,255,255,0.84);
          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 18px;
          padding: 1.15rem;
          color: inherit;
          text-decoration: none;
          box-shadow: 0 4px 22px rgba(0,0,0,0.05);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .related-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 34px rgba(0,0,0,0.1);
        }
        .related-card p {
          color: #94a3b8;
          font-size: 0.76rem;
          font-weight: 800;
          margin-bottom: 0.4rem;
        }
        .related-card h3 {
          color: #1e293b;
          font-size: 0.98rem;
          font-weight: 800;
          line-height: 1.35;
          margin-bottom: 0.75rem;
        }
        .related-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #6d28d9;
          font-size: 0.8rem;
          font-weight: 800;
        }
      `}</style>

      <section className="blog-detail-page" style={{ '--article-gradient': accent.gradient, '--article-color': accent.color }}>
        <div className="blog-detail-container">
          <Link to="/blog" className="back-link">
            <FaArrowLeft />
            Kembali ke Blog
          </Link>

          <Motion.article
            className="article-hero"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="article-visual">
              <div className="article-icon-wrap">
                <Icon />
              </div>
            </div>
            <div className="article-head">
              <span className="article-category">
                <FaBookOpen />
                {post.category}
              </span>
              <h1 className="article-title">{post.title}</h1>
              <p className="article-excerpt">{post.excerpt}</p>
              <div className="article-meta">
                <span><FaCalendarAlt /> {post.date}</span>
                <span><FaClock /> {post.readTime}</span>
              </div>
            </div>
          </Motion.article>

          <Motion.div
            className="article-content"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {post.content.map((section) => (
              <section key={section.heading} className="article-section">
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <div className="article-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="article-tag">{tag}</span>
              ))}
            </div>
          </Motion.div>

          {relatedPosts.length > 0 && (
            <Motion.div
              className="related-block"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <p className="related-title"><FaBookOpen /> Artikel Terkait</p>
              <div className="related-grid">
                {relatedPosts.map((item) => (
                  <Link key={item.slug} to={`/blog/${item.slug}`} className="related-card">
                    <p>{item.category}</p>
                    <h3>{item.title}</h3>
                    <span className="related-link">
                      Baca Artikel
                      <FaArrowRight />
                    </span>
                  </Link>
                ))}
              </div>
            </Motion.div>
          )}
        </div>
      </section>
    </>
  );
}
