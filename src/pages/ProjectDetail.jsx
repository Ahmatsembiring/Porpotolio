// src/pages/ProjectDetail.jsx
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="py-20 text-center">
        <motion.h2
          className="text-2xl font-bold text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Proyek tidak ditemukan
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/projects" className="text-blue-600 mt-4 inline-block hover:underline">
            ← Kembali ke Daftar Proyek
          </Link>
        </motion.div>
      </div>
    );
  }

  // Gunakan public folder → path absolut
  const imgPath = `/images/projects/${project.id}.png`;

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/projects" className="text-blue-600 hover:underline mb-6 inline-block">
            ← Kembali ke Semua Proyek
          </Link>
        </motion.div>

        <motion.h1
          className="text-3xl font-bold mb-4 text-gray-800"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {project.title}
        </motion.h1>

        {/* Gambar Proyek */}
        <motion.div
          className="w-full h-80 bg-gray-100 rounded-xl shadow-md mb-8 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <img
            src={imgPath}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.outerHTML = `
                <div class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                  📷 Gambar tidak tersedia
                </div>
              `;
            }}
          />
        </motion.div>

        {/* Tombol Demo & Repo (Opsional) */}
        {(project.demoUrl || project.repoUrl) && (
          <motion.div
            className="flex flex-wrap gap-3 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Lihat Demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
              >
                Lihat Kode
              </a>
            )}
          </motion.div>
        )}

        {/* Konten Detail */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Overview</h2>
            <p className="text-gray-700">{project.overview}</p>
          </motion.div>

          {project.category === 'web' ? (
            <>
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-semibold mb-3 text-gray-800">Fitur Utama</h2>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {project.details.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-semibold mb-3 text-gray-800">Tantangan & Solusi</h2>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {project.details.challenges.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-semibold mb-3 text-gray-800">Keamanan</h2>
                <p className="text-gray-700">{project.details.security}</p>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-semibold mb-3 text-gray-800">Temuan Kerentanan</h2>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {project.details.findings.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-semibold mb-3 text-gray-800">Rekomendasi Mitigasi</h2>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {project.details.mitigation.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </motion.div>
              {project.details.report && (
                <motion.div variants={itemVariants}>
                  <p className="text-gray-700">{project.details.report}</p>
                </motion.div>
              )}
            </>
          )}

          <motion.div
            variants={itemVariants}
            className="pt-6 border-t border-gray-200"
          >
            <p className="text-sm text-gray-600">Teknologi: {project.tech}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}