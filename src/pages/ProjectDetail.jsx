// src/pages/ProjectDetail.jsx
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import webJurnal from '../assets/images/projects/web-jurnal.png';
import pentestReport from '../assets/images/projects/pentest-report.JPG';

const projectImages = {
  'web-jurnal': webJurnal,
  'pentest-ecommerce': pentestReport,
};

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const img = project ? projectImages[project.id] : null;

  if (!project) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl">Proyek tidak ditemukan</h2>
        <Link to="/projects" className="text-blue-600 mt-4 inline-block">
          ← Kembali ke Daftar
        </Link>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/projects" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Kembali ke Semua Proyek
        </Link>

        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>

        <img
          src={img}
          alt={project.title}
          className="w-full rounded-xl shadow-md mb-8"
        />

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Overview</h2>
          <p className="text-gray-700">{project.overview}</p>
        </div>

        {project.category === 'web' ? (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Fitur Utama</h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {project.details.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Tantangan & Solusi</h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {project.details.challenges.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">Keamanan</h2>
              <p className="text-gray-700">{project.details.security}</p>
            </div>
          </>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Temuan Kerentanan</h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {project.details.findings.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Rekomendasi Mitigasi</h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {project.details.mitigation.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-gray-700">{project.details.report}</p>
            </div>
          </>
        )}

        <div className="mt-8 pt-6 border-t">
          <p className="text-sm text-gray-600">Teknologi: {project.tech}</p>
        </div>
      </div>
    </section>
  );
}