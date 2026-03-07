// src/pages/ProjectsList.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';

// Variants untuk animasi staggered
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
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Link to={`/projects/${proj.id}`} className="block h-full">
                  <div className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      <img
                        src={imgPath}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23f3f4f6"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="16" fill="%239ca3af"%3E🖼️%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium mb-3 inline-block ${
                          proj.category === 'web'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {proj.category === 'web' ? 'Web Dev' : 'Security'}
                      </span>
                      <h3 className="text-xl font-semibold mb-2">{proj.title}</h3>
                      <p className="text-gray-700 text-sm mt-auto">{proj.overview}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}