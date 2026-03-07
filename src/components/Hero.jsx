// src/components/Hero.jsx
import { Link } from 'react-router-dom';
import profileImg from '../assets/images/profile.png';
import {
  FaLinkedin,
  FaGithub,
  FaMedium,
  FaYoutube,
  FaInstagram,
  FaCode,
  FaUserShield, // ✅ diganti dari FaShieldAlt
} from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-gradient-to-b from-gray-50 to-white overflow-hidden relative"
    >
      {/* Background accents */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center w-full z-10">
        {/* Foto Profil */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-purple-500/20 to-transparent z-10"></div>

            <img
              src={profileImg}
              alt="Ahmat Prayoga"
              className="w-full h-full object-cover"
            />

            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/2 p-4 text-left z-20">
              <div className="flex items-center gap-2">
                <FaCode className="text-blue-500" />
                <span className="text-xs font-medium text-blue-700">Web Dev</span>
              </div>
            </div>

            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 p-4 text-right z-20">
              <div className="flex items-center gap-2 justify-end">
                <span className="text-xs font-medium text-purple-700">Security</span>
                <FaUserShield className="text-purple-500" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Teks & Konten */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-center md:text-left"
        >
          <motion.h1
            className="text-3xl md:text-5xl font-bold mb-4"
            initial={{ backgroundPosition: '0% 50%' }}
            animate={{ backgroundPosition: '100% 50%' }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 200%',
            }}
          >
            Halo, saya Ahmat Prayoga Sembiring
          </motion.h1>

          <motion.p
            className="text-lg text-gray-700 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Web Developer & Cyber Security Enthusiast
            <br />
            Membangun aplikasi yang cepat, indah, dan aman.
          </motion.p>

          {/* Statistik Mini */}
          <motion.div
            className="grid grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-2xl font-bold text-blue-700">10+</p>
              <p className="text-xs text-gray-600">Proyek</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-2xl font-bold text-purple-700">2</p>
              <p className="text-xs text-gray-600">Komunitas</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-2xl font-bold text-green-700">1+</p>
              <p className="text-xs text-gray-600">Tahun</p>
            </div>
          </motion.div>

          {/* Tombol */}
          <motion.div
            className="flex flex-wrap justify-center md:justify-start gap-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/projects"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition shadow-md hover:shadow-lg inline-block"
              >
                Lihat Proyek
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/contact"
                className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg transition inline-block"
              >
                Hubungi Saya
              </Link>
            </motion.div>
          </motion.div>

          {/* Sosial Media — tanpa spasi di URL! */}
          <motion.div
            className="flex justify-center md:justify-start space-x-5 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.a
              href="https://linkedin.com/in/ahmatprayoga"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-700 hover:text-blue-600 transition text-2xl"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin />
            </motion.a>

            <motion.a
              href="https://github.com/Ahmatsembiring"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-700 hover:text-gray-900 transition text-2xl"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub />
            </motion.a>

            <motion.a
              href="https://medium.com/@Ahmatsembiring"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Medium"
              className="text-gray-700 hover:text-green-600 transition text-2xl"
              whileHover={{ scale: 1.2, rotate: 3 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaMedium />
            </motion.a>

            <motion.a
              href="https://www.youtube.com/@Programmer-ai-25"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-gray-700 hover:text-red-600 transition text-2xl"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaYoutube />
            </motion.a>

            <motion.a
              href="https://www.instagram.com/ahnat_sembiring11"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-700 hover:text-pink-600 transition text-2xl"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaInstagram />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}