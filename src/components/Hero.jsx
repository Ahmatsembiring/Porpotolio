export default function Hero() {
  // Gunakan path dari public/, bukan import
  const profileImg = '/images/profile.png'; // pastikan file ini ada di public/images/

  return (
    <section id="home" className="min-h-screen flex items-center bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Foto Profil */}
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={profileImg}
              alt="Nama Kamu"
              className="w-64 h-64 md:w-80 md:h-80 rounded-2xl object-cover border-4 border-white shadow-xl"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500 rounded-full opacity-10"></div>
          </div>
        </div>

        {/* Intro Text */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Halo, saya <span className="text-blue-600">Nama Asli Kamu</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Web Developer & Ethical Hacker  
            Membangun aplikasi yang cepat, indah, dan aman.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
            <a
              href="#projects"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block transition shadow-md hover:shadow-lg"
            >
              Lihat Proyek
            </a>
            <a
              href="#contact"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg inline-block transition"
            >
              Hubungi Saya
            </a>
          </div>

          {/* Social Icons — GANTI DENGAN LINK ASLI! */}
          <div className="flex justify-center md:justify-start space-x-5 mt-8">
            <a href="https://youtube.com/@NAMA_ASLI_KAMU" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-red-600 transition-colors">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.276-11.596-.276-15.2 0-3.603.276-3.603 4.598-3.603 4.598 0 3.347 2.423 6.385 2.423 6.385s-2.423 3.038-2.423 6.385c0 0 0 4.322 3.603 4.598 3.604.276 11.596.276 15.2 0 3.603-.276 3.603-4.598 3.603-4.598 0-3.347-2.423-6.385-2.423-6.385s2.423-3.038 2.423-6.385c0 0 0-4.322-3.603-4.598zm-10.4 14.598v-9.2l8.4 4.6z"/></svg>
            </a>
            <a href="https://instagram.com/NAMA_ASLI_KAMU" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-pink-600 transition-colors">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.28-.073 1.689-.073 4.848 0 3.259.014 3.668.072 4.848.2 4.358 2.618 6.78 6.98 6.98 1.28.058 1.689.072 4.849.072 3.259 0 3.668-.014 4.848-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.848 0-3.259-.014-3.667-.072-4.847-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.849-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}