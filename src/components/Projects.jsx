import webJurnal from '../assets/images/projects/web-jurnal.png';
import pentestReport from '../assets/images/projects/pentest-report.jpg';

export default function Projects() {
  const projects = [
    {
      title: "Website Jurnal Nasional",
      desc: "Platform publikasi akademik dengan fitur login multi-role (admin, reviewer, author).",
      tech: "React, Tailwind CSS, Firebase",
      image: webJurnal,
      category: "web",
      link: "#",
    },
    {
      title: "Pentest pada Aplikasi E-Commerce",
      desc: "Audit keamanan menemukan XSS & IDOR, dilengkapi laporan mitigasi.",
      tech: "Burp Suite, OWASP ZAP, Manual Testing",
      image: pentestReport,
      category: "security",
      link: "#",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">Proyek Saya</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((proj, i) => (
            <div key={i} className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src={proj.image} alt={proj.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  proj.category === 'web' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {proj.category === 'web' ? 'Web Dev' : 'Security'}
                </span>
                <h3 className="text-xl font-semibold mt-3 mb-2">{proj.title}</h3>
                <p className="text-gray-700 mb-3">{proj.desc}</p>
                <p className="text-sm text-gray-600 mb-4">{proj.tech}</p>
                <a href={proj.link} className="text-blue-600 hover:underline font-medium">Lihat Detail →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}