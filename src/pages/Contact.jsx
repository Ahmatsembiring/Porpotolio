// src/pages/Contact.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaMedium } from 'react-icons/fa';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.target);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      // 🔥 GANTI DENGAN FORMSPREE ENDPOINT ASLI KAMU DI SINI
      const response = await fetch('https://formspree.io/f/xnjbpwlg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: json,
      });

      if (response.ok) {
        setIsSuccess(true);
        e.target.reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.error || 'Terjadi kesalahan. Coba lagi nanti.');
      }
    } catch (err) {
      setError('Gagal mengirim pesan. Periksa koneksi internet.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Mari Bekerja Sama!
        </motion.h1>

        <motion.p
          className="text-gray-700 text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Terbuka untuk proyek pengembangan web, audit keamanan, kolaborasi edukasi, atau sekadar ngobrol tech.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* === FORM KONTAK === */}
          <motion.div
            className="bg-gray-50 p-8 rounded-2xl shadow-sm"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-6">Kirim Pesan</h2>
            
            {isSuccess && (
              <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
                ✅ Pesan berhasil terkirim! Saya akan segera membalas.
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
                ❌ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nama Anda"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="email@contoh.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subjek
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Misal: Kolaborasi Proyek"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ceritakan kebutuhan Anda..."
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                whileHover={!isSubmitting ? { y: -2 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
              </motion.button>
            </form>
          </motion.div>

          {/* === INFO KONTAK === */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <h2 className="text-xl font-semibold mb-4">Info Kontak</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaEnvelope className="text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:hello@ahmatprayoga.com"
                      className="text-blue-600 hover:underline"
                    >
                      hello@ahmatprayoga.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Lokasi</p>
                    <p className="text-gray-700">Medan, Sumatera Utara, Indonesia</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Temukan Saya di</h2>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://linkedin.com/in/ahmatprayoga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
                >
                  <FaLinkedin />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/ahmatprayoga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
                >
                  <FaGithub />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://medium.com/@ahmatprayoga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                  <FaMedium />
                  <span>Medium</span>
                </a>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h3 className="font-semibold text-blue-800 mb-2">Respons Cepat!</h3>
              <p className="text-blue-700">
                Saya biasanya merespons dalam 1-2 hari kerja. Untuk permintaan mendesak, 
                sebutkan "URGENT" di subjek email.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}