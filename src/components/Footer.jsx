// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import {
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaDiscord,
  FaEnvelope,
} from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Kolom 1: Brand & Deskripsi */}
          <div>
            <h3 className="text-xl font-bold mb-4">Ahmat Prayoga</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Web Developer & Cybersecurity Enthusiast dari Medan.  
              Membangun aplikasi yang cepat, indah, dan aman.
            </p>
          </div>

          {/* Kolom 2: Navigasi */}
          <div>
            <h4 className="font-semibold text-gray-300 mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/experience" className="text-gray-400 hover:text-white transition">
                  Pengalaman
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-white transition">
                  Proyek
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Sosial Media */}
          <div>
            <h4 className="font-semibold text-gray-300 mb-4">Temukan Saya</h4>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/Ahmatsembiring"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.youtube.com/@Programmer-ai-25"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition"
              >
                <FaYoutube />
              </a>
              <a
                href="https://www.instagram.com/ahnat_sembiring11/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center hover:bg-pink-700 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://discord.gg/raven"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center hover:bg-indigo-700 transition"
              >
                <FaDiscord />
              </a>
              <a
                href="mailto:ahmatsembiring11@gmail.com"
                aria-label="Email"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        {/* Garis pemisah */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Ahmat Prayoga Sembiring. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}