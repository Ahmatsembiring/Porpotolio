// src/pages/Sertifikasi.jsx
import { useEffect } from 'react';
import AOS from 'aos';

const sertifikasiData = [
  {
    id: 1,
    nama: 'Certified Ethical Hacker (CEH)',
    penerbit: 'EC-Council',
    tahun: '2024',
    kategori: 'Security',
    gambar: '/sertifikasi/sertifikat1.png',
  },
  {
    id: 2,
    nama: 'Web Development Bootcamp',
    penerbit: 'Udemy',
    tahun: '2023',
    kategori: 'Web Dev',
    gambar: '/sertifikasi/sertifikat2.png',
  },
  {
    id: 3,
    nama: 'Cloud Computing Fundamentals',
    penerbit: 'AWS',
    tahun: '2023',
    kategori: 'Cloud',
    gambar: '/sertifikasi/sertifikat3.png',
  },
  {
    id: 4,
    nama: 'Artificial Intelligence Fundamentals',
    penerbit: 'Coursera',
    tahun: '2023',
    kategori: 'AI',
    gambar: '/sertifikasi/sertifikat4.png',
  },
  {
    id: 5,
    nama: 'Web Development Bootcamp',
    penerbit: 'Udemy',
    tahun: '2023',
    kategori: 'Web Dev',
    gambar: '/sertifikasi/sertifikat5.png',
  },
  {
    id: 6,
    nama: 'Web Development Bootcamp',
    penerbit: 'Udemy',
    tahun: '2023',
    kategori: 'Web Dev',
    gambar: '/sertifikasi/sertifikat6.jpg',
  },
   {
    id: 7,
    nama: 'Web Development Bootcamp',
    penerbit: 'Udemy',
    tahun: '2023',
    kategori: 'Web Dev',
    gambar: '/sertifikasi/sertifikat7.png',
  },
  {
    id: 8,
    nama: 'Web Development Bootcamp',
    penerbit: 'Udemy',
    tahun: '2023',
    kategori: 'Web Dev',
    gambar: '/sertifikasi/sertifikat8.png',
  },
  {
    id: 9,
    nama: 'Web Development Bootcamp',
    penerbit: 'Udemy',
    tahun: '2023',
    kategori: 'Web Dev',
    gambar: '/sertifikasi/sertifikat9.png',
  },
];

const badgeColor = {
  Security: 'bg-red-100 text-red-700',
  'Web Dev': 'bg-blue-100 text-blue-700',
  Cloud: 'bg-sky-100 text-sky-700',
  AI: 'bg-purple-100 text-purple-700',
  Other: 'bg-gray-100 text-gray-600',
};

const Sertifikasi = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Sertifikasi</h1>
          <p className="text-gray-500 text-lg">
            Koleksi sertifikat yang telah saya raih
          </p>
        </div>

        {/* Grid Sertifikasi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sertifikasiData.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Gambar Sertifikat */}
              <div className="w-full h-44 bg-gray-100 overflow-hidden flex items-center justify-center">
                <img
                  src={item.gambar}
                  alt={item.nama}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeColor[item.kategori] || badgeColor.Other}`}
                  >
                    {item.kategori}
                  </span>
                  <span className="text-xs text-gray-400">{item.tahun}</span>
                </div>
                <h3 className="font-semibold text-gray-800 text-base mb-1 leading-snug">
                  {item.nama}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{item.penerbit}</p>

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Lihat Sertifikat
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {sertifikasiData.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-xl">Belum ada sertifikasi ditambahkan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sertifikasi;
