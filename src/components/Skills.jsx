// src/components/Skills.jsx
import { FaCode, FaShieldAlt, FaEthereum } from 'react-icons/fa';
import { SiBlockchaindotcom } from 'react-icons/si';

export default function Skills() {
  return (
    <section 
      id="skills" 
      className="py-20 bg-gray-50"
      data-aos="fade-up"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 
          className="text-3xl font-bold text-center mb-16"
          data-aos="fade-down"
        >
          Keahlian Saya
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Web Development */}
          <div 
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            data-aos="fade-right"
          >
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <FaCode className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Web Development</h3>
            <ul className="space-y-2 text-gray-700 list-disc pl-5">
              <li>Frontend dengan <strong>React & Tailwind CSS</strong></li>
              <li>UI/UX responsif & intuitif</li>
              <li>Integrasi API & manajemen state</li>
              <li>Deployment via <strong>Firebase</strong> & Vercel</li>
            </ul>
          </div>

          {/* Security & Web3 */}
          <div 
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            data-aos="fade-left"
          >
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <FaShieldAlt className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Security & Web3</h3>
            <ul className="space-y-2 text-gray-700 list-disc pl-5">
              <li><strong>Ethical hacking</strong> & penetration testing</li>
              <li>Pengujian kerentanan: XSS, SQLi, CSRF</li>
              <li>Alat: <strong>Burp Suite, Nmap, OWASP ZAP</strong></li>
              <li>Pengembangan <strong>smart contract</strong> & aplikasi terdesentralisasi (dApps)</li>
              <li>Kontribusi proyek <strong>open-source blockchain</strong></li>
            </ul>
          </div>
        </div>

        {/* Tech Highlights (Opsional - Tambahkan jika mau lebih visual) */}
        <div 
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <FaEthereum className="text-3xl text-gray-700 mx-auto mb-2" />
            <p className="text-sm font-medium">Solidity</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <SiBlockchaindotcom className="text-3xl text-gray-700 mx-auto mb-2" />
            <p className="text-sm font-medium">Web3</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <FaCode className="text-3xl text-gray-700 mx-auto mb-2" />
            <p className="text-sm font-medium">JavaScript</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <FaShieldAlt className="text-3xl text-gray-700 mx-auto mb-2" />
            <p className="text-sm font-medium">Security</p>
          </div>
        </div>
      </div>
    </section>
  );
}