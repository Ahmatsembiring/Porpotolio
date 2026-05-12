// src/pages/CV.jsx
import { useEffect } from 'react';
import AOS from 'aos';

const CV = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  const cvFile = '/cv/CV.pdf';

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10" data-aos="fade-up">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My CV</h1>
          <p className="text-gray-500 text-lg">Preview curriculum vitae saya</p>
        </div>

        {/* Tombol Download */}
        <div className="flex justify-center gap-4 mb-8" data-aos="fade-up" data-aos-delay="100">
          <a
            href={cvFile}
            download
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-all duration-200"
          >
            Download CV
          </a>
          <a
            href={cvFile}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2.5 px-6 rounded-lg transition-all duration-200"
          >
            Buka di Tab Baru
          </a>
        </div>

        {/* Preview PDF */}
        <div
          className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <iframe
            src={cvFile}
            title="CV Ahmat Prayoga Sembiring"
            className="w-full"
            style={{ height: '900px' }}
          />
        </div>

      </div>
    </div>
  );
};

export default CV;