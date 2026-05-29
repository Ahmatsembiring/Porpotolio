export const blogPosts = [
  {
    slug: 'mindset-cyber-security-untuk-pemula',
    title: 'Mindset Cyber Security untuk Pemula',
    category: 'Cyber Security',
    accent: 'security',
    date: '18 Mei 2026',
    readTime: '6 menit',
    excerpt:
      'Catatan awal tentang cara melihat aplikasi dari sudut pandang attacker dan defender tanpa kehilangan etika belajar.',
    tags: ['OWASP', 'Pentest', 'Mindset'],
    content: [
      {
        heading: 'Belajar melihat sistem secara utuh',
        paragraphs: [
          'Cyber security bukan hanya soal menemukan celah, tetapi memahami bagaimana sebuah sistem dibangun, digunakan, dan bisa disalahgunakan. Mindset ini membantu kita lebih hati-hati saat membaca alur autentikasi, input pengguna, penyimpanan data, sampai konfigurasi server.',
          'Untuk pemula, langkah terbaik adalah mulai dari dasar web, jaringan, Linux, dan OWASP Top 10. Dari sana, latihan security terasa lebih masuk akal karena setiap temuan punya konteks teknis yang jelas.',
        ],
      },
      {
        heading: 'Kebiasaan yang saya pakai',
        list: [
          'Membaca dokumentasi fitur sebelum melakukan testing.',
          'Mencatat langkah reproduksi dengan bahasa yang mudah dipahami.',
          'Membedakan eksplorasi legal, lab, dan sistem produksi.',
          'Memberi rekomendasi mitigasi, bukan hanya daftar masalah.',
        ],
      },
    ],
  },
  {
    slug: 'secure-coding-di-aplikasi-react',
    title: 'Secure Coding di Aplikasi React',
    category: 'Web Development',
    accent: 'web',
    date: '10 Mei 2026',
    readTime: '7 menit',
    excerpt:
      'Praktik sederhana untuk membuat aplikasi React lebih aman, mulai dari validasi input sampai cara menangani token.',
    tags: ['React', 'Frontend', 'Security'],
    content: [
      {
        heading: 'Keamanan tetap dimulai dari frontend',
        paragraphs: [
          'Frontend tidak bisa menjadi satu-satunya lapisan keamanan, tetapi frontend yang rapi membantu mengurangi kesalahan pengguna dan memperjelas alur data. Validasi input, sanitasi output, dan manajemen state yang disiplin membuat bug lebih mudah dilacak.',
          'Di React, kita perlu berhati-hati saat menampilkan konten dinamis, menyimpan token, dan memanggil API. Setiap keputusan kecil bisa berdampak pada pengalaman dan keamanan pengguna.',
        ],
      },
      {
        heading: 'Checklist singkat',
        list: [
          'Hindari render HTML mentah kecuali benar-benar dibutuhkan.',
          'Gunakan validasi input di frontend dan backend.',
          'Batasi data sensitif yang disimpan di browser.',
          'Tampilkan pesan error yang jelas tanpa membocorkan detail sistem.',
        ],
      },
    ],
  },
  {
    slug: 'catatan-magang-pentest-aplikasi-web',
    title: 'Catatan Magang: Pentest Aplikasi Web',
    category: 'Pengalaman Magang',
    accent: 'experience',
    date: '28 April 2026',
    readTime: '5 menit',
    excerpt:
      'Beberapa pelajaran dari proses audit keamanan aplikasi web, mulai dari komunikasi temuan sampai penyusunan laporan.',
    tags: ['Internship', 'Report', 'Web Security'],
    content: [
      {
        heading: 'Yang paling penting bukan hanya tools',
        paragraphs: [
          'Selama magang, saya belajar bahwa tools seperti Burp Suite, OWASP ZAP, atau Nmap hanya membantu menemukan indikasi. Nilai utamanya ada pada kemampuan memahami impact, membuat proof of concept yang aman, dan menjelaskan risiko ke tim developer.',
          'Laporan yang baik harus bisa dibaca oleh dua pihak: engineer yang akan memperbaiki bug dan stakeholder yang perlu memahami prioritas risiko.',
        ],
      },
      {
        heading: 'Hal yang saya pelajari',
        list: [
          'Membuat severity berdasarkan impact dan likelihood.',
          'Menulis rekomendasi yang realistis untuk tim pengembang.',
          'Menjaga scope testing agar tetap sesuai izin.',
          'Melakukan retest setelah perbaikan diterapkan.',
        ],
      },
    ],
  },
  {
    slug: 'web3-untuk-web-developer',
    title: 'Web3 untuk Web Developer',
    category: 'Web3',
    accent: 'web3',
    date: '16 April 2026',
    readTime: '6 menit',
    excerpt:
      'Ringkasan konsep Web3 yang perlu dipahami web developer sebelum masuk ke smart contract dan dApp.',
    tags: ['Blockchain', 'dApp', 'Smart Contract'],
    content: [
      {
        heading: 'Mulai dari konsep, bukan hype',
        paragraphs: [
          'Bagi web developer, Web3 terasa lebih mudah dipahami jika dimulai dari konsep ownership, wallet, transaksi, dan smart contract. dApp tetap membutuhkan UI yang jelas, state management, dan error handling yang baik.',
          'Perbedaannya adalah pengguna sering berinteraksi dengan aset bernilai nyata. Karena itu, UX dan security harus berjalan bersama sejak desain awal.',
        ],
      },
      {
        heading: 'Dasar yang perlu dikuasai',
        list: [
          'Cara wallet menandatangani transaksi.',
          'Perbedaan read dan write pada smart contract.',
          'Risiko phishing dan approval yang terlalu luas.',
          'Pentingnya testnet sebelum menyentuh mainnet.',
        ],
      },
    ],
  },
  {
    slug: 'roadmap-belajar-mahasiswa-teknik-informatika',
    title: 'Roadmap Belajar Mahasiswa Teknik Informatika',
    category: 'Perjalanan Belajar',
    accent: 'learning',
    date: '2 April 2026',
    readTime: '8 menit',
    excerpt:
      'Cara menyusun ritme belajar yang seimbang antara kuliah, proyek, komunitas, dan eksplorasi karier di bidang teknologi.',
    tags: ['Mahasiswa TI', 'Career', 'Learning'],
    content: [
      {
        heading: 'Belajar yang punya arah',
        paragraphs: [
          'Sebagai mahasiswa Teknik Informatika, pilihan bidang terasa sangat luas. Ada web development, mobile, cloud, data, AI, cyber security, Web3, dan banyak lagi. Karena itu, roadmap membantu kita menjaga fokus tanpa menutup kesempatan eksplorasi.',
          'Saya mencoba membagi waktu antara teori kampus, proyek nyata, latihan security, dan kontribusi komunitas. Kombinasi ini membuat portofolio terasa lebih hidup karena setiap proyek punya cerita dan proses belajar.',
        ],
      },
      {
        heading: 'Ritme yang bisa dicoba',
        list: [
          'Pilih satu fokus utama untuk 3 bulan.',
          'Bangun proyek kecil yang bisa dipublikasikan.',
          'Tulis catatan belajar agar progres mudah dilacak.',
          'Ikut komunitas untuk mendapat feedback dan teman belajar.',
        ],
      },
    ],
  },
];
