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

        <motion.div
          className="w-full h-80 bg-gray-100 rounded-xl shadow-md mb-8 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <img
            src={imgPath}
            alt={project.title}
            className="w-full h-full object-cover rounded-xl"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect width="400" height="400" fill="%23f3f4f6"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="24" fill="%239ca3af"%3E📷 Gambar Tidak Tersedia%3C/text%3E%3C/svg%3E';
            }}
          />
        </motion.div>

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
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {f}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-semibold mb-3 text-gray-800">Tantangan & Solusi</h2>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {project.details.challenges.map((c, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {c}
                    </motion.li>
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
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {f}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-semibold mb-3 text-gray-800">Rekomendasi Mitigasi</h2>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {project.details.mitigation.map((m, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {m}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div variants={itemVariants}>
                <p className="text-gray-700">{project.details.report}</p>
              </motion.div>
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