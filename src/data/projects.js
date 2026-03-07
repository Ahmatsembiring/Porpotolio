// src/data/projects.js
export const projects = [
  // === WEB DEVELOPMENT ===
  {
    id: 'web-jurnal',
    title: 'Website Jurnal Nasional',
    category: 'web',
    tech: 'React, Tailwind CSS, Firebase, React Router',
    overview: 'Platform publikasi akademik dengan sistem multi-role untuk universitas.',
    details: {
      features: [
        'Login berbasis role (author, reviewer, admin)',
        'Upload & review artikel ilmiah',
        'Notifikasi real-time via Firebase',
        'Dashboard khusus per role'
      ],
      challenges: [
        'Manajemen state kompleks antar role',
        'Validasi form ketat untuk mencegah XSS'
      ],
      security: 'Input sanitization, token-based auth, rate limiting pada endpoint sensitif.'
    }
  },
  {
    id: 'sobat-web-ai',
    title: 'Sobat Web AI',
    category: 'web',
    tech: 'Next.js, Tailwind CSS, OpenAI API, Vercel',
    overview: 'Platform edukasi berbasis AI untuk membantu pemula belajar web development.',
    details: {
      features: [
        'Chatbot AI untuk bimbingan coding',
        'Generator boilerplate otomatis',
        'Kuis interaktif berbasis konsep',
        'Progress tracking personal'
      ],
      challenges: [
        'Integrasi API AI dengan UX intuitif',
        'Optimasi biaya penggunaan model besar'
      ],
      security: 'Rate limiting, input validation, dan enkripsi data sesi.'
    }
  },
  {
    id: 'raven-dashboard',
    title: 'Raven Community Dashboard',
    category: 'web',
    tech: 'React, Firebase, Chart.js, Tailwind CSS',
    overview: 'Dashboard internal untuk komunitas Raven Cybersecurity.',
    details: {
      features: [
        'Manajemen anggota & event',
        'Statistik partisipasi workshop',
        'Forum diskusi internal',
        'Notifikasi kegiatan'
      ],
      challenges: [
        'Sinkronisasi data real-time antar pengguna',
        'Desain UI untuk non-teknis'
      ],
      security: 'Role-based access control, audit log aktivitas.'
    }
  },
  {
    id: 'portofolio-v2',
    title: 'Portofolio Pribadi v2',
    category: 'web',
    tech: 'React, Framer Motion, Tailwind CSS, Vite',
    overview: 'Website portofolio profesional dengan animasi modern dan multi-halaman.',
    details: {
      features: [
        'Halaman terpisah (Home, Projects, Experience)',
        'Detail proyek teknis',
        'Integrasi media sosial',
        'Responsif & performa tinggi'
      ],
      challenges: [
        'Routing dinamis tanpa SPA overload',
        'Animasi smooth tanpa lag'
      ],
      security: 'Tidak ada backend — 100% static site, aman dari serangan server-side.'
    }
  },
  {
    id: 'ecommerce-landing',
    title: 'Landing Page E-Commerce',
    category: 'web',
    tech: 'HTML, Tailwind CSS, Alpine.js, Netlify',
    overview: 'Landing page konversi tinggi untuk UMKM fashion lokal.',
    details: {
      features: [
        'Hero section interaktif',
        'Testimoni slider',
        'Form kontak dengan validasi',
        'Optimasi SEO dasar'
      ],
      challenges: [
        'Desain mobile-first dengan load time < 1s',
        'Kompatibilitas browser lama'
      ],
      security: 'Form dilindungi reCAPTCHA, tidak ada penyimpanan data sensitif.'
    }
  },

  // === SECURITY / PENETRATION TESTING ===
  {
    id: 'pentest-ecommerce',
    title: 'Pentest Aplikasi E-Commerce',
    category: 'security',
    tech: 'Burp Suite, OWASP ZAP, Nmap, Manual Testing',
    overview: 'Audit keamanan aplikasi e-commerce UMKM untuk mengidentifikasi kerentanan.',
    details: {
      findings: [
        'XSS reflektif pada kolom pencarian',
        'IDOR pada endpoint /api/orders/{id}',
        'Session fixation setelah login'
      ],
      mitigation: [
        'Sanitasi input dengan DOMPurify',
        'Validasi ownership di sisi server',
        'Regenerasi session ID setelah autentikasi'
      ],
      report: 'Laporan lengkap tersedia dalam format PDF (redacted untuk privasi).'
    }
  },
  {
    id: 'ctf-platform-audit',
    title: 'Audit Platform CTF Internal',
    category: 'security',
    tech: 'Nmap, Nikto, SQLMap, Manual Exploitation',
    overview: 'Pengujian keamanan platform Capture The Flag untuk komunitas Raven.',
    details: {
      findings: [
        'SQL Injection pada form login',
        'Directory listing terbuka',
        'Hardcoded credentials di source code'
      ],
      mitigation: [
        'Parameterized queries',
        'Nonaktifkan directory listing',
        'Gunakan secret manager untuk kredensial'
      ],
      report: 'Temuan digunakan untuk meningkatkan keamanan infrastruktur pelatihan.'
    }
  },
  {
    id: 'api-security-review',
    title: 'Review Keamanan REST API',
    category: 'security',
    tech: 'Postman, Burp Suite, JWT Debugger',
    overview: 'Analisis keamanan REST API untuk aplikasi jurnal akademik.',
    details: {
      findings: [
        'JWT token tidak memiliki expiry',
        'Endpoint /api/users tidak memvalidasi role',
        'CORS terlalu permisif (* wildcard)'
      ],
      mitigation: [
        'Set masa berlaku token (15 menit)',
        'Implementasi middleware role check',
        'Batasi origin CORS hanya ke domain resmi'
      ],
      report: 'Rekomendasi diimplementasikan sebelum rilis produksi.'
    }
  },
  {
    id: 'wordpress-hardening',
    title: 'Hardening Website WordPress',
    category: 'security',
    tech: 'WPScan, Manual Review, Security Plugins',
    overview: 'Penguatan keamanan website institusi pendidikan berbasis WordPress.',
    details: {
      findings: [
        'Plugin outdated dengan CVE diketahui',
        'File wp-config.php dapat diakses publik',
        'Tidak ada two-factor authentication'
      ],
      mitigation: [
        'Update semua plugin & core',
        'Lindungi file konfigurasi via .htaccess',
        'Aktifkan 2FA untuk admin'
      ],
      report: 'Website berhasil lolos scan lanjutan pasca mitigasi.'
    }
  },
  {
    id: 'network-pentest-campus',
    title: 'Pentest Jaringan Kampus',
    category: 'security',
    tech: 'Nmap, Metasploit, Wireshark, Nessus',
    overview: 'Pengujian penetrasi jaringan laboratorium kampus.',
    details: {
      findings: [
        'Port SSH terbuka tanpa fail2ban',
        'Default credentials pada perangkat IoT',
        'VLAN hopping pada switch lama'
      ],
      mitigation: [
        'Implementasi fail2ban & key-based auth',
        'Ganti kredensial default',
        'Upgrade firmware switch & segmentasi VLAN'
      ],
      report: 'Laporan diserahkan ke tim IT untuk peningkatan infrastruktur.'
    }
  }
];