// src/pages/Experience.jsx
import { motion } from "framer-motion";
import { FaDiscord, FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa";

// ✅ Import gambar langsung
import ravenLogo from '../assets/images/raven-logo.jpg';
import sobatwebLogo from '../assets/images/sobatweb-logo.jpg';

export default function Experience() {
  const organizationalExperiences = [
    {
      title: "Founder",
      organization: "Raven Cybersecurity Community",
      period: "2023 – Sekarang",
      description: "Membangun komunitas keamanan siber untuk mahasiswa, mengadakan workshop, dan mentoring dalam penetration testing serta secure coding.",
      tech: ["Komunitas", "Workshop", "Mentorship"],
      logo: ravenLogo, // ✅ gunakan langsung
      social: [
        { icon: <FaDiscord className="text-indigo-600" />, href: "https://discord.gg/raven", label: "Discord" },
        { icon: <FaInstagram className="text-pink-600" />, href: "https://instagram.com/raven_cyber", label: "Instagram" },
        { icon: <FaTiktok className="text-black" />, href: "https://tiktok.com/@raven_cyber", label: "TikTok" },
      ],
    },
    {
      title: "Founder",
      organization: "Sobat Web AI",
      period: "2024 – Sekarang",
      description: "Menginisiasi platform edukasi teknologi berbasis AI untuk membantu pemula belajar web development dengan pendekatan interaktif.",
      tech: ["Edukasi", "AI", "Web Development"],
      logo: sobatwebLogo, // ✅ gunakan langsung
      social: [
        { icon: <FaEnvelope className="text-gray-700" />, href: "mailto:hello@sobatweb.ai", label: "Email" },
        { icon: <FaInstagram className="text-pink-600" />, href: "https://instagram.com/sobatweb_ai", label: "Instagram" },
        { icon: <FaTiktok className="text-black" />, href: "https://tiktok.com/@sobatweb_ai", label: "TikTok" },
      ],
    }
  ];

  const professionalExperiences = [
    {
      title: "Frontend Developer",
      company: "PT Solusi Digital Indonesia",
      period: "Jan 2024 – Sekarang",
      type: "Pekerjaan",
      description: "Mengembangkan antarmuka pengguna untuk platform jurnal akademik menggunakan React dan Tailwind CSS. Fokus pada performa, aksesibilitas, dan UX.",
      tech: ["React", "Tailwind CSS", "Firebase", "Git"]
    },
    {
      title: "Penetration Testing Intern",
      company: "CyberSec Labs",
      period: "Jul 2023 – Des 2023",
      type: "Magang",
      description: "Melakukan audit keamanan aplikasi web, mengidentifikasi kerentanan seperti XSS dan IDOR, serta menyusun laporan mitigasi untuk klien UMKM.",
      tech: ["Burp Suite", "OWASP ZAP", "Nmap", "Manual Testing"]
    },
    {
      title: "Peserta CTF Nasional",
      company: "Kompetisi Keamanan Siber 2023",
      period: "Okt 2023",
      type: "Kompetisi",
      description: "Tim kami menempati peringkat 5 besar dalam kompetisi Capture The Flag tingkat nasional, fokus pada web exploitation dan cryptography.",
      tech: ["Linux", "Python", "Wireshark", "SQLMap"]
    }
  ];

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Pengalaman Saya
        </motion.h1>

        {/* Organisasi */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-8 text-center">Pengalaman Organisasi</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {organizationalExperiences.map((exp, idx) => (
              <motion.div
                key={idx}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-200">
                    <img
                      src={exp.logo} // ✅ langsung dari import
                      alt={exp.organization}
                      className="w-10 h-10 object-contain"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Crect width="40" height="40" fill="%23e5e7eb"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="16" fill="%239ca3af"%3EΛ%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mb-1">
                      Founder
                    </span>
                    <h3 className="text-xl font-bold text-gray-800">{exp.organization}</h3>
                    <p className="text-gray-600 text-sm">{exp.period}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{exp.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {exp.tech.map((t, i) => (
                    <span key={i} className="bg-white text-blue-700 text-xs px-2 py-1 rounded border border-blue-200">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                  {exp.social.map((item, i) => (
                    <a
                      key={i}
                      href={item.href.trim()} // ✅ hapus spasi di akhir URL
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                      aria-label={item.label}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Profesional */}
        <div>
          <h2 className="text-2xl font-bold mb-8 text-center">Pengalaman Profesional</h2>
          <div className="space-y-10 relative pl-8 border-l-2 border-gray-200 ml-4">
            {professionalExperiences.map((exp, idx) => (
              <motion.div
                key={idx}
                className="pb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600"></div>
                <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    exp.type === 'Pekerjaan' ? 'bg-green-100 text-green-800' :
                    exp.type === 'Magang' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {exp.type}
                  </span>
                </div>
                <p className="font-medium text-gray-700">{exp.company}</p>
                <p className="text-sm text-gray-500 mb-3">{exp.period}</p>
                <p className="text-gray-700 mb-3">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}