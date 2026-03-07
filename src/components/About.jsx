// src/components/About.jsx
export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2
          data-aos="fade-down"
          className="text-3xl font-bold text-center mb-16"
        >
          Tentang Saya
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Teks tentang saya */}
          <div data-aos="fade-right" data-aos-delay="100">
            <p className="text-gray-700 mb-4">
              Saya seorang developer yang percaya bahwa <strong>keindahan UI harus berjalan beriringan dengan keamanan sistem</strong>.
            </p>
            <p className="text-gray-700 mb-4">
              Di sisi frontend, saya membangun antarmuka yang responsif dan intuitif menggunakan React dan Tailwind CSS. 
              Di sisi keamanan, saya menguji kerentanan aplikasi web dan memberikan rekomendasi mitigasi yang jelas.
            </p>
            <p className="text-gray-700">
              Saat ini, saya sedang mengembangkan proyek-proyek open source dan berbagi pengetahuan melalui konten edukasi.
            </p>
          </div>

          {/* Tech Stack */}
          <div
            data-aos="fade-left"
            data-aos-delay="200"
            className="bg-gray-100 p-6 rounded-2xl border border-gray-200 shadow-sm"
          >
            <h3 className="font-semibold text-lg mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {[
                'React', 'Tailwind CSS', 'JavaScript', 'Burp Suite',
                'Nmap', 'OWASP ZAP', 'Git', 'Firebase'
              ].map((tech) => (
                <span
                  key={tech}
                  className="bg-white px-3 py-1.5 rounded-full text-sm border border-gray-300 shadow-sm hover:shadow transition"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}