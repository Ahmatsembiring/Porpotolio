// src/components/SocialMedia.jsx
import { FaYoutube, FaInstagram } from 'react-icons/fa';

export default function SocialMedia() {
  return (
    <section 
      id="social" 
      className="py-20 bg-gray-50"
      data-aos="fade-up"
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 
          className="text-3xl font-bold mb-4"
          data-aos="fade-down"
        >
          Ikuti Perjalanan Saya
        </h2>
        <p 
          className="text-gray-700 mb-12 max-w-2xl mx-auto"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          Saya rutin berbagi tips coding, hasil lab keamanan, dan insight tech di media sosial.
        </p>

        <div 
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          {/* YouTube */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
              <FaYoutube className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-xl mb-2">YouTube</h3>
            <p className="text-gray-700 mb-4">
              Tutorial React, live coding, dan walkthrough pentest.
            </p>
            <a
              href="https://www.youtube.com/@Programmer-ai-25"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition hover:shadow"
            >
              Kunjungi Channel
            </a>
          </div>

          {/* Instagram */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-600">
              <FaInstagram className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Instagram</h3>
            <p className="text-gray-700 mb-4">
              Daily life, workspace, dan cuplikan proyek.
            </p>
            <a
              href="https://www.instagram.com/ahmat_sembiring11/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-lg transition hover:shadow"
            >
              Lihat Profil
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}