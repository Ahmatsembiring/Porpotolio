// src/pages/ProjectsList.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

// Helper: dapatkan label kategori
const getCategoryLabel = (category) => {
  switch (category) {
    case 'web': return 'Web Development';
    case 'security': return 'Security Audit';
    case 'blockchain': return 'Web3 / Blockchain';
    default: return 'Proyek';
  }
};

const getCategoryStyle = (category) => {
  switch (category) {
    case 'web': return 'bg-blue-100 text-blue-800';
    case 'security': return 'bg-purple-100 text-purple-800';
    case 'blockchain': return 'bg-indigo-100 text-indigo-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function ProjectsList() {
  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h1
          className="text-3xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Semua Proyek
        </motion.h1>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Belum ada proyek yang ditampilkan.</p>
          </div>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {projects.map((proj) => {
              const imgPath = `/images/projects/${proj.id}.png`;
              return (
                <motion.div
                  key={proj.id}
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  className="h-full"
                >
                  <Link to={`/projects/${proj.id}`} className="block h-full">
                    <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      {/* Gambar */}
                      <div className="w-full h-48 bg-gray-100 flex items-center justify-center relative">
                        <img
                          src={imgPath}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.outerHTML = `
                              <div class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-4xl">
                                🖼️
                              </div>
                            `;
                          }}
                        />
                        {/* Badge khusus (opsional) */}
                        {proj.category === 'security' && (
                          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            Internal
                          </span>
                        )}
                      </div>

                      {/* Konten */}
                      <div className="p-6 flex flex-col flex-grow">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium mb-3 inline-block ${getCategoryStyle(proj.category)}`}>
                          {getCategoryLabel(proj.category)}
                        </span>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{proj.title}</h3>
                        <p className="text-gray-700 text-sm mt-auto line-clamp-2">
                          {proj.overview}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}