// src/data/projects.js
export const projects = [
  {
    id: 'web-jurnal',
    title: 'Website Jurnal Nasional',
    category: 'web',
    tech: 'React, Tailwind CSS, Firebase',
    overview: 'Platform publikasi akademik dengan sistem multi-role: author, reviewer, dan admin.',
    details: {
      features: [
        'Login & registrasi berbasis role',
        'Upload & review artikel ilmiah',
        'Dashboard khusus per role',
        'Notifikasi real-time via Firebase',
      ],
      challenges: [
        'Manajemen state kompleks antar role',
        'Validasi form ketat untuk mencegah XSS',
      ],
      security:
        'Input sanitization, token-based auth, rate limiting pada endpoint sensitif.',
    },
  },
  {
    id: 'pentest-ecommerce',
    title: 'Pentest pada Aplikasi E-Commerce',
    category: 'security',
    tech: 'Burp Suite, OWASP ZAP, Nmap, Manual Testing',
    overview: 'Audit keamanan aplikasi e-commerce UMKM untuk mengidentifikasi kerentanan.',
    details: {
      findings: [
        'XSS reflektif pada kolom pencarian',
        'IDOR pada endpoint /api/orders/{id}',
        'Session fixation setelah login',
      ],
      mitigation: [
        'Sanitasi input dengan DOMPurify',
        'Validasi ownership di sisi server',
        'Regenerasi session ID setelah autentikasi',
      ],
      report: 'Laporan lengkap tersedia dalam format PDF (redacted untuk privasi).',
    },
  },
];