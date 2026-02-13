export default function Skills() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">Keahlian Saya</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Web Development */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Web Development</h3>
            <ul className="space-y-2 text-gray-700 list-disc pl-5">
              <li>Frontend dengan React & Tailwind CSS</li>
              <li>Responsive & Accessible UI Design</li>
              <li>State Management & API Integration</li>
              <li>Deployment & Performance Optimization</li>
            </ul>
          </div>

          {/* Penetration Testing */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Penetration Testing</h3>
            <ul className="space-y-2 text-gray-700 list-disc pl-5">
              <li>Vulnerability Assessment (XSS, SQLi, etc.)</li>
              <li>Manual & Automated Security Testing</li>
              <li>Security Reporting & Mitigation Plan</li>
              <li>CTF & Bug Bounty Experience</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}