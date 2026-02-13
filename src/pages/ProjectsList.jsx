// src/pages/ProjectsList.jsx
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import webJurnal from '../assets/images/projects/web-jurnal.png';
import pentestReport from '../assets/images/projects/pentest-report.JPG';

const projectImages = {
  'web-jurnal': webJurnal,
  'pentest-ecommerce': pentestReport,
};

export default function ProjectsList() {
  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-16">Semua Proyek</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj) => {
            const img = projectImages[proj.id];
            return (
              <Link to={`/projects/${proj.id}`} key={proj.id} className="block">
                <div className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
                  <img
                    src={img}
                    alt={proj.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        proj.category === 'web'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {proj.category === 'web' ? 'Web Dev' : 'Security'}
                    </span>
                    <h3 className="text-xl font-semibold mt-3 mb-2">{proj.title}</h3>
                    <p className="text-gray-700 text-sm">{proj.overview}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}