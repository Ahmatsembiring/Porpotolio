export default function SocialMedia() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ikuti Perjalanan Saya</h2>
        <p className="text-gray-700 mb-12 max-w-2xl mx-auto">
          Saya rutin berbagi tips coding, hasil lab keamanan, dan insight tech di media sosial.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* YouTube */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.276-11.596-.276-15.2 0-3.603.276-3.603 4.598-3.603 4.598 0 3.347 2.423 6.385 2.423 6.385s-2.423 3.038-2.423 6.385c0 0 0 4.322 3.603 4.598 3.604.276 11.596.276 15.2 0 3.603-.276 3.603-4.598 3.603-4.598 0-3.347-2.423-6.385-2.423-6.385s2.423-3.038 2.423-6.385c0 0 0-4.322-3.603-4.598zm-10.4 14.598v-9.2l8.4 4.6z"/></svg>
            </div>
            <h3 className="font-semibold text-xl mb-2">YouTube</h3>
            <p className="text-gray-700 mb-4">Tutorial React, live coding, dan walkthrough pentest.</p>
            <a
              href="https://youtube.com/@..."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
            >
              Kunjungi Channel
            </a>
          </div>

          {/* Instagram */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.28-.073 1.689-.073 4.848 0 3.259.014 3.668.072 4.848.2 4.358 2.618 6.78 6.98 6.98 1.28.058 1.689.072 4.849.072 3.259 0 3.668-.014 4.848-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.848 0-3.259-.014-3.667-.072-4.847-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.849-.073z"/></svg>
            </div>
            <h3 className="font-semibold text-xl mb-2">Instagram</h3>
            <p className="text-gray-700 mb-4">Daily life, workspace, dan cuplikan proyek.</p>
            <a
              href="https://instagram.com/..."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-lg transition"
            >
              Lihat Profil
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}