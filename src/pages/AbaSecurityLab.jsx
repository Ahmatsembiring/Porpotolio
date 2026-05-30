import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FaArrowLeft,
  FaBookOpen,
  FaBug,
  FaCheckCircle,
  FaChevronRight,
  FaClipboardList,
  FaCode,
  FaDatabase,
  FaExclamationTriangle,
  FaEye,
  FaFileUpload,
  FaFolderOpen,
  FaKey,
  FaLock,
  FaSearch,
  FaServer,
  FaShieldAlt,
  FaTerminal,
  FaUserShield,
} from 'react-icons/fa';

const wafModes = {
  off: 'OFF',
  detect: 'Detection Only',
  block: 'Blocking Mode',
};

const wafRules = [
  {
    type: 'SQL Injection',
    severity: 'High',
    pattern: /('|--|;|\/\*|\*\/|union\s+select|or\s+1\s*=\s*1|sleep\s*\(|drop\s+table|information_schema)/i,
  },
  {
    type: 'Cross-Site Scripting',
    severity: 'High',
    pattern: /(<script|<\/script|onerror\s*=|onload\s*=|javascript:|alert\s*\(|document\.|innerhtml|<img)/i,
  },
  {
    type: 'Access Control Probe',
    severity: 'Medium',
    pattern: /(role=admin|is_admin=true|\/admin|\/backup|object_id=|user_id=|account_id=)/i,
  },
  {
    type: 'Authentication Attack',
    severity: 'Medium',
    pattern: /(brute|attempt=|password123|123456|admin' --|token=|session=|remember_me)/i,
  },
  {
    type: 'Suspicious Upload',
    severity: 'Medium',
    pattern: /(\.php|\.phtml|\.jsp|\.asp|\.exe|\.sh|\.bat|\.svg|application\/x-httpd-php|image\/svg)/i,
  },
  {
    type: 'Misconfiguration Check',
    severity: 'Medium',
    pattern: /(debug=true|server-status|\.env|directory listing|trace method|default credentials)/i,
  },
];

const labCategories = [
  {
    slug: 'sql-injection',
    title: 'SQL Injection Lab',
    shortTitle: 'SQL Injection',
    icon: FaDatabase,
    accent: '#38bdf8',
    difficulty: 'Beginner - Intermediate',
    status: 'Ready',
    description:
      'Latihan memahami input yang masuk ke query database, mulai dari bypass filter sederhana sampai UNION-based enumeration.',
    scenarios: [
      {
        slug: 'basic-sql-injection',
        title: 'Basic SQL Injection',
        difficulty: 'Beginner',
        status: 'Ready',
        icon: FaSearch,
        attackType: 'SQL Injection',
        detector: /('|--|or\s+1\s*=\s*1)/i,
        inputLabel: 'Search keyword',
        placeholder: "Coba: laptop' OR '1'='1' --",
        defaultInput: "laptop' OR '1'='1' --",
        payloads: ["' OR '1'='1' --", "training' OR 1=1 --", "' AND '1'='2' --"],
        explanation:
          'Basic SQL Injection terjadi ketika nilai dari form pencarian digabung langsung ke query SQL tanpa parameterized query.',
        objectives: [
          'Melihat bagaimana kondisi OR dapat melewati filter WHERE.',
          'Membedakan response normal dan response saat input dianggap bagian dari query.',
          'Memahami dampak kebocoran record karena validasi server lemah.',
        ],
        normalOutput: 'Query hanya mengembalikan record yang sesuai keyword pencarian.',
        vulnerableOutput:
          'Vulnerable response: filter WHERE dilewati dan seluruh record training tampil, termasuk data internal.',
        secureOutput:
          'Secure response: payload diperlakukan sebagai teks biasa sehingga tidak mengubah struktur query.',
        successReason:
          'Payload berhasil karena aplikasi vulnerable menyusun query dengan string concatenation. Bagian OR membuat kondisi query selalu bernilai benar.',
        failureReason:
          'Payload gagal saat WAF memblokir pola berbahaya atau saat secure mode menggunakan prepared statement dan parameter binding.',
        mitigation: [
          'Gunakan prepared statement atau ORM parameter binding.',
          'Validasi tipe data dan panjang input sebelum diproses.',
          'Batasi privilege akun database aplikasi.',
          'Tambahkan logging untuk query pattern mencurigakan.',
        ],
      },
      {
        slug: 'login-bypass',
        title: 'Login Bypass',
        difficulty: 'Beginner',
        status: 'Ready',
        icon: FaKey,
        attackType: 'SQL Injection',
        detector: /('|--|or\s+1\s*=\s*1|admin'\s*--)/i,
        inputLabel: 'Email atau username',
        placeholder: "Coba: admin' --",
        defaultInput: "admin' --",
        payloads: ["admin' --", "' OR '1'='1' --", "admin' OR 1=1 --"],
        explanation:
          'Login bypass mensimulasikan form login yang memeriksa username dan password melalui query yang tidak aman.',
        objectives: [
          'Memahami kenapa login harus selalu memvalidasi credential dengan query aman.',
          'Melihat dampak bypass autentikasi pada akun admin.',
          'Mengenali log percobaan login mencurigakan.',
        ],
        normalOutput: 'Credential tidak cocok. Login ditolak.',
        vulnerableOutput:
          'Vulnerable response: login berhasil sebagai admin training karena kondisi password terlewati.',
        secureOutput:
          'Secure response: username diproses sebagai parameter, password tetap wajib cocok dengan hash yang valid.',
        successReason:
          'Payload berhasil karena komentar SQL atau kondisi OR memotong pemeriksaan password pada query login.',
        failureReason:
          'Payload gagal ketika input tidak pernah digabung langsung ke query dan rate limit mencatat percobaan abnormal.',
        mitigation: [
          'Gunakan password hashing yang kuat seperti Argon2 atau bcrypt.',
          'Gunakan prepared statement untuk query autentikasi.',
          'Aktifkan rate limit dan lockout bertahap.',
          'Catat login gagal berulang di security dashboard.',
        ],
      },
      {
        slug: 'union-based-sql-injection',
        title: 'Union-Based SQL Injection',
        difficulty: 'Intermediate',
        status: 'Ready',
        icon: FaDatabase,
        attackType: 'SQL Injection',
        detector: /(union\s+select|information_schema|concat\s*\()/i,
        inputLabel: 'Product filter',
        placeholder: "Coba: -1 UNION SELECT username,password FROM users --",
        defaultInput: "-1 UNION SELECT username,password FROM users --",
        payloads: [
          "-1 UNION SELECT username,password FROM users --",
          "1 UNION SELECT table_name,column_name FROM information_schema.columns --",
          "-1 UNION SELECT 1,version() --",
        ],
        explanation:
          'Union-based SQL Injection memanfaatkan UNION SELECT untuk menggabungkan hasil query asli dengan data dari tabel lain.',
        objectives: [
          'Mengenali syarat jumlah kolom dan tipe data pada UNION SELECT.',
          'Melihat bagaimana metadata database dapat terekspos.',
          'Memahami kenapa error detail database tidak boleh dibuka ke user.',
        ],
        normalOutput: 'Filter produk hanya mengembalikan data katalog training.',
        vulnerableOutput:
          'Vulnerable response: query gabungan menampilkan mock username dan hash password dari tabel users.',
        secureOutput:
          'Secure response: input dianggap value filter biasa dan tidak bisa mengubah SELECT statement.',
        successReason:
          'Payload berhasil jika query asli menerima UNION tambahan dengan jumlah kolom yang sesuai.',
        failureReason:
          'Payload gagal jika query diparameterisasi, error detail disembunyikan, dan privilege database dibatasi.',
        mitigation: [
          'Parameterize semua query dinamis.',
          'Jangan tampilkan SQL error mentah ke user.',
          'Gunakan least privilege pada database user.',
          'Monitoring pola UNION, information_schema, dan enumerasi kolom.',
        ],
      },
    ],
  },
  {
    slug: 'xss',
    title: 'XSS Lab',
    shortTitle: 'Cross-Site Scripting',
    icon: FaBug,
    accent: '#f472b6',
    difficulty: 'Beginner - Intermediate',
    status: 'Ready',
    description:
      'Latihan reflected, stored, dan DOM-based XSS dengan fokus pada output encoding, sanitasi, dan Content Security Policy.',
    scenarios: [
      {
        slug: 'reflected-xss',
        title: 'Reflected XSS',
        difficulty: 'Beginner',
        status: 'Ready',
        icon: FaBug,
        attackType: 'Cross-Site Scripting',
        detector: /(<script|alert\s*\(|onerror\s*=|javascript:)/i,
        inputLabel: 'Search query',
        placeholder: "Coba: <script>alert('xss')</script>",
        defaultInput: "<script>alert('xss')</script>",
        payloads: ["<script>alert('xss')</script>", "<img src=x onerror=alert(1)>", "javascript:alert(1)"],
        explanation:
          'Reflected XSS terjadi ketika input dari request langsung dipantulkan ke halaman tanpa encoding.',
        objectives: [
          'Menguji response yang memantulkan parameter pencarian.',
          'Memahami perbedaan sanitasi input dan encoding output.',
          'Mengenali pola payload yang umum terdeteksi WAF.',
        ],
        normalOutput: 'Halaman menampilkan pesan pencarian normal tanpa menjalankan script.',
        vulnerableOutput:
          'Vulnerable response: payload dipantulkan sebagai HTML aktif pada area hasil pencarian.',
        secureOutput:
          'Secure response: karakter berbahaya di-escape sehingga tampil sebagai teks, bukan script.',
        successReason:
          'Payload berhasil karena aplikasi vulnerable mempercayai query string dan menulisnya ke DOM sebagai HTML.',
        failureReason:
          'Payload gagal jika output di-encode, CSP dibatasi, dan sink HTML berbahaya tidak digunakan.',
        mitigation: [
          'Encode output sesuai konteks HTML, attribute, URL, atau JavaScript.',
          'Gunakan library sanitasi terpercaya untuk konten HTML yang memang dibutuhkan.',
          'Terapkan Content Security Policy.',
          'Hindari penggunaan dangerouslySetInnerHTML untuk input user.',
        ],
      },
      {
        slug: 'stored-xss',
        title: 'Stored XSS',
        difficulty: 'Intermediate',
        status: 'Ready',
        icon: FaClipboardList,
        attackType: 'Cross-Site Scripting',
        detector: /(<script|onerror\s*=|onload\s*=|<svg|alert\s*\()/i,
        inputLabel: 'Comment body',
        placeholder: "Coba: <img src=x onerror=alert('stored')>",
        defaultInput: "<img src=x onerror=alert('stored')>",
        payloads: ["<img src=x onerror=alert('stored')>", "<svg onload=alert(1)>", "<script>alert('comment')</script>"],
        explanation:
          'Stored XSS terjadi ketika payload disimpan sebagai data, lalu dijalankan saat halaman dibuka user lain.',
        objectives: [
          'Memahami risiko XSS yang tersimpan di komentar atau profil.',
          'Melihat kenapa validasi saat simpan saja belum cukup.',
          'Menguji cara monitoring payload pada aktivitas komentar.',
        ],
        normalOutput: 'Komentar aman tersimpan dan dirender sebagai teks.',
        vulnerableOutput:
          'Vulnerable response: komentar tersimpan sebagai HTML aktif dan berpotensi berjalan pada pembaca berikutnya.',
        secureOutput:
          'Secure response: komentar disimpan, tetapi dirender dengan output encoding dan sanitasi allowlist.',
        successReason:
          'Payload berhasil karena aplikasi vulnerable menyimpan dan merender konten user tanpa escape.',
        failureReason:
          'Payload gagal jika pipeline simpan dan render memakai sanitasi, encoding, dan policy script ketat.',
        mitigation: [
          'Sanitasi HTML dengan allowlist tag dan attribute.',
          'Encode output saat menampilkan data user.',
          'Gunakan CSP tanpa unsafe-inline.',
          'Review semua tempat data user dirender ulang.',
        ],
      },
      {
        slug: 'dom-based-xss',
        title: 'DOM-Based XSS',
        difficulty: 'Intermediate',
        status: 'Ready',
        icon: FaCode,
        attackType: 'Cross-Site Scripting',
        detector: /(location\.hash|document\.write|innerhtml|<script|onerror\s*=|alert\s*\()/i,
        inputLabel: 'URL fragment or client-side value',
        placeholder: "Coba: #<img src=x onerror=alert(1)>",
        defaultInput: "#<img src=x onerror=alert(1)>",
        payloads: ["#<img src=x onerror=alert(1)>", "location.hash=<script>alert(1)</script>", "innerHTML=<svg onload=alert(1)>"],
        explanation:
          'DOM-Based XSS muncul ketika JavaScript client-side mengambil data tidak dipercaya lalu memasukkannya ke sink berbahaya.',
        objectives: [
          'Mengidentifikasi sink seperti innerHTML dan document.write.',
          'Membedakan DOM XSS dari reflected dan stored XSS.',
          'Menerapkan textContent atau safe rendering untuk input client-side.',
        ],
        normalOutput: 'Nilai client-side hanya dipakai sebagai teks untuk mengubah tampilan.',
        vulnerableOutput:
          'Vulnerable response: nilai fragment masuk ke innerHTML sehingga payload menjadi markup aktif.',
        secureOutput:
          'Secure response: nilai fragment masuk ke textContent sehingga payload tidak dieksekusi.',
        successReason:
          'Payload berhasil karena source seperti location.hash mengalir langsung ke sink innerHTML.',
        failureReason:
          'Payload gagal ketika data client-side dimasukkan sebagai text node, bukan HTML.',
        mitigation: [
          'Gunakan textContent untuk data tidak dipercaya.',
          'Audit source dan sink DOM dengan threat modeling ringan.',
          'Hindari document.write dan innerHTML untuk input user.',
          'Tambahkan CSP dan Trusted Types pada aplikasi modern.',
        ],
      },
    ],
  },
  {
    slug: 'broken-access-control',
    title: 'Broken Access Control Lab',
    shortTitle: 'Broken Access Control',
    icon: FaUserShield,
    accent: '#a78bfa',
    difficulty: 'Intermediate',
    status: 'Ready',
    description:
      'Simulasi IDOR, privilege escalation, dan forced browsing untuk memahami authorization yang harus divalidasi di server.',
    scenarios: [
      {
        slug: 'idor',
        title: 'IDOR',
        difficulty: 'Intermediate',
        status: 'Ready',
        icon: FaEye,
        attackType: 'Access Control Probe',
        detector: /(object_id=1|user_id=1|account_id=1|invoice_id=1001)/i,
        inputLabel: 'Object request',
        placeholder: 'Coba: /api/invoices?user_id=1&invoice_id=1001',
        defaultInput: '/api/invoices?user_id=1&invoice_id=1001',
        payloads: [
          '/api/invoices?user_id=1&invoice_id=1001',
          '/api/profile?account_id=1',
          '/api/files?object_id=1',
        ],
        explanation:
          'IDOR terjadi saat user dapat mengubah identifier objek dan mengakses data milik user lain.',
        objectives: [
          'Melihat risiko object ID yang mudah ditebak.',
          'Memahami bahwa hidden field atau UI restriction bukan authorization.',
          'Menguji log akses objek yang tidak sesuai owner.',
        ],
        normalOutput: 'User hanya menerima objek miliknya sendiri.',
        vulnerableOutput:
          'Vulnerable response: data milik user lain dikembalikan karena server hanya percaya object_id.',
        secureOutput:
          'Secure response: server memeriksa owner objek terhadap session aktif dan menolak akses.',
        successReason:
          'Payload berhasil karena authorization tidak dicek pada level objek di server.',
        failureReason:
          'Payload gagal jika server memverifikasi ownership, role, dan policy sebelum mengambil data.',
        mitigation: [
          'Validasi authorization pada setiap request server-side.',
          'Gunakan indirect reference atau UUID yang tidak mudah ditebak sebagai tambahan, bukan pengganti kontrol akses.',
          'Buat test akses lintas akun.',
          'Log anomali akses objek sensitif.',
        ],
      },
      {
        slug: 'privilege-escalation',
        title: 'Privilege Escalation',
        difficulty: 'Intermediate',
        status: 'Ready',
        icon: FaUserShield,
        attackType: 'Access Control Probe',
        detector: /(role=admin|is_admin=true|plan=enterprise|permission=write_all)/i,
        inputLabel: 'Profile update request',
        placeholder: 'Coba: role=admin&is_admin=true',
        defaultInput: 'name=student&role=admin&is_admin=true',
        payloads: ['role=admin&is_admin=true', 'permission=write_all', 'plan=enterprise&role=owner'],
        explanation:
          'Privilege escalation terjadi ketika user biasa dapat mengubah role atau permission yang seharusnya dikendalikan server.',
        objectives: [
          'Menguji parameter sensitif pada request update profil.',
          'Memahami mass assignment dan trust boundary.',
          'Melihat dampak role admin palsu terhadap dashboard.',
        ],
        normalOutput: 'Update profil hanya mengubah field aman seperti nama dan bio.',
        vulnerableOutput:
          'Vulnerable response: role user berubah menjadi admin karena server menerima parameter sensitif.',
        secureOutput:
          'Secure response: server mengabaikan field role dan hanya menerima field yang masuk allowlist.',
        successReason:
          'Payload berhasil karena backend menerima semua field request tanpa allowlist dan policy role.',
        failureReason:
          'Payload gagal jika field sensitif dikunci server-side dan hanya admin yang boleh mengubah role.',
        mitigation: [
          'Gunakan allowlist field pada update resource.',
          'Pisahkan endpoint user profile dan role management.',
          'Terapkan policy authorization terpusat.',
          'Audit perubahan permission dan role.',
        ],
      },
      {
        slug: 'forced-browsing',
        title: 'Forced Browsing',
        difficulty: 'Beginner',
        status: 'Ready',
        icon: FaFolderOpen,
        attackType: 'Access Control Probe',
        detector: /(\/admin|\/backup|\/internal|\/debug|\/reports\/finance)/i,
        inputLabel: 'Hidden path',
        placeholder: 'Coba: /admin/security-dashboard',
        defaultInput: '/admin/security-dashboard',
        payloads: ['/admin/security-dashboard', '/backup/database.sql', '/internal/debug'],
        explanation:
          'Forced browsing terjadi ketika endpoint tersembunyi dapat diakses langsung tanpa authorization yang benar.',
        objectives: [
          'Menguji akses langsung ke path admin atau backup.',
          'Memahami kenapa menyembunyikan link tidak cukup.',
          'Membaca log request ke route sensitif.',
        ],
        normalOutput: 'Route publik terbuka dan route admin meminta authorization.',
        vulnerableOutput:
          'Vulnerable response: halaman internal terbuka hanya karena user menebak URL.',
        secureOutput:
          'Secure response: middleware authorization memblokir path sensitif sebelum handler berjalan.',
        successReason:
          'Payload berhasil karena endpoint tidak dilindungi middleware akses server-side.',
        failureReason:
          'Payload gagal saat setiap route sensitif dilindungi role check dan file backup tidak berada di web root.',
        mitigation: [
          'Terapkan authorization middleware pada semua route sensitif.',
          'Jangan simpan backup, .env, atau dump database di public web root.',
          'Nonaktifkan directory listing.',
          'Tambahkan alert untuk request ke path internal.',
        ],
      },
    ],
  },
  {
    slug: 'authentication',
    title: 'Authentication Lab',
    shortTitle: 'Authentication Attack',
    icon: FaLock,
    accent: '#60a5fa',
    difficulty: 'Beginner - Intermediate',
    status: 'Ready',
    description:
      'Latihan brute force detection, weak password policy, dan session management pada workflow login aplikasi web.',
    scenarios: [
      {
        slug: 'brute-force-login',
        title: 'Brute Force Login',
        difficulty: 'Beginner',
        status: 'Ready',
        icon: FaLock,
        attackType: 'Authentication Attack',
        detector: /(attempt=|brute|admin:|password=|login_count=)/i,
        inputLabel: 'Login attempts',
        placeholder: 'Coba: attempt=5&username=admin&password=password123',
        defaultInput: 'attempt=5&username=admin&password=password123',
        payloads: [
          'attempt=5&username=admin&password=password123',
          'admin:123456 attempt=8',
          'brute username=admin password=admin123',
        ],
        explanation:
          'Brute force login adalah percobaan menebak credential berulang sampai kombinasi benar ditemukan.',
        objectives: [
          'Melihat kapan failed login berubah menjadi sinyal serangan.',
          'Menguji peran rate limit dan lockout bertahap.',
          'Membaca log username target dan jumlah percobaan.',
        ],
        normalOutput: 'Satu login gagal dicatat sebagai failed login biasa.',
        vulnerableOutput:
          'Vulnerable response: aplikasi terus menerima percobaan tanpa rate limit atau lockout.',
        secureOutput:
          'Secure response: percobaan berulang diberi delay, CAPTCHA adaptif, atau lockout sementara.',
        successReason:
          'Serangan berhasil jika aplikasi tidak membatasi frekuensi percobaan login.',
        failureReason:
          'Serangan gagal jika ada rate limit berbasis akun, IP, device fingerprint, dan monitoring.',
        mitigation: [
          'Terapkan rate limit dan lockout bertahap.',
          'Gunakan MFA untuk akun sensitif.',
          'Log failed login berulang dan kirim alert.',
          'Hindari pesan error yang membocorkan validitas username.',
        ],
      },
      {
        slug: 'weak-password',
        title: 'Weak Password',
        difficulty: 'Beginner',
        status: 'Ready',
        icon: FaKey,
        attackType: 'Authentication Attack',
        detector: /(password123|123456|qwerty|admin123|welcome1)/i,
        inputLabel: 'Password candidate',
        placeholder: 'Coba: password123',
        defaultInput: 'password123',
        payloads: ['password123', 'admin123', 'qwerty2026'],
        explanation:
          'Weak password terjadi ketika aplikasi memperbolehkan password umum, pendek, atau mudah ditebak.',
        objectives: [
          'Menguji kebijakan password terhadap common password.',
          'Memahami pentingnya blocklist password lemah.',
          'Melihat response policy saat password ditolak.',
        ],
        normalOutput: 'Password acak yang kuat diterima oleh policy.',
        vulnerableOutput:
          'Vulnerable response: password umum diterima sehingga akun mudah ditebak.',
        secureOutput:
          'Secure response: password masuk blocklist dan harus diganti dengan passphrase lebih kuat.',
        successReason:
          'Payload berhasil karena policy hanya mengecek panjang minimum tanpa blocklist dan entropy.',
        failureReason:
          'Payload gagal jika aplikasi memakai blocklist password bocor dan validasi kekuatan password.',
        mitigation: [
          'Gunakan blocklist common password dan password yang pernah bocor.',
          'Dorong passphrase panjang dibanding aturan simbol yang membingungkan.',
          'Hash password dengan Argon2id atau bcrypt.',
          'Tambahkan MFA untuk mengurangi risiko credential stuffing.',
        ],
      },
      {
        slug: 'session-management',
        title: 'Session Management',
        difficulty: 'Intermediate',
        status: 'Ready',
        icon: FaShieldAlt,
        attackType: 'Authentication Attack',
        detector: /(session=|token=|jwt=|remember_me|fixation|httponly=false)/i,
        inputLabel: 'Session token or cookie',
        placeholder: 'Coba: session=abc123&httponly=false',
        defaultInput: 'session=abc123&httponly=false',
        payloads: ['session=abc123&httponly=false', 'token=old-token-after-login', 'remember_me=true; Secure=false'],
        explanation:
          'Session management lemah dapat menyebabkan session fixation, token reuse, atau pencurian cookie.',
        objectives: [
          'Menguji cookie flag dan token lifecycle.',
          'Memahami regenerasi session setelah login.',
          'Melihat dampak token yang tidak expired.',
        ],
        normalOutput: 'Session valid, memiliki expiry, dan cookie flag aman.',
        vulnerableOutput:
          'Vulnerable response: token lama tetap diterima dan cookie tidak memiliki HttpOnly atau Secure flag.',
        secureOutput:
          'Secure response: session lama diregenerasi, token expired, dan cookie dilindungi flag aman.',
        successReason:
          'Payload berhasil jika server menerima token lama atau cookie dapat diakses script client.',
        failureReason:
          'Payload gagal jika session diregenerasi, dibatasi masa aktif, dan cookie memakai HttpOnly, Secure, SameSite.',
        mitigation: [
          'Regenerate session ID setelah login dan privilege change.',
          'Gunakan HttpOnly, Secure, dan SameSite pada cookie.',
          'Batasi lifetime session dan implement logout server-side.',
          'Monitor reuse token dari device atau lokasi tidak biasa.',
        ],
      },
    ],
  },
  {
    slug: 'file-upload',
    title: 'File Upload Lab',
    shortTitle: 'File Upload Vulnerability',
    icon: FaFileUpload,
    accent: '#22c55e',
    difficulty: 'Beginner - Intermediate',
    status: 'Ready',
    description:
      'Latihan validasi upload file, MIME type bypass, extension bypass, dan storage aman untuk file dari user.',
    scenarios: [
      {
        slug: 'unrestricted-file-upload',
        title: 'Unrestricted File Upload',
        difficulty: 'Beginner',
        status: 'Ready',
        icon: FaFileUpload,
        attackType: 'Suspicious Upload',
        detector: /(\.php|\.jsp|\.asp|\.exe|\.sh|\.bat)/i,
        inputLabel: 'File name',
        placeholder: 'Coba: shell.php',
        defaultInput: 'shell.php',
        payloads: ['shell.php', 'cmd.jsp', 'reverse-shell.sh'],
        explanation:
          'Unrestricted file upload terjadi ketika aplikasi menerima file berbahaya tanpa validasi tipe, ukuran, dan lokasi penyimpanan.',
        objectives: [
          'Menguji ekstensi file berbahaya.',
          'Memahami risiko menyimpan upload di web root.',
          'Melihat bagaimana WAF mencatat file name mencurigakan.',
        ],
        normalOutput: 'File gambar aman diterima dan disimpan sebagai objek non-eksekusi.',
        vulnerableOutput:
          'Vulnerable response: file script diterima dan berpotensi dieksekusi dari folder public.',
        secureOutput:
          'Secure response: ekstensi berbahaya ditolak dan file disimpan di storage non-eksekusi.',
        successReason:
          'Payload berhasil karena aplikasi hanya menerima nama file tanpa validasi server-side.',
        failureReason:
          'Payload gagal jika server mengecek MIME, magic bytes, ekstensi allowlist, dan storage non-eksekusi.',
        mitigation: [
          'Gunakan allowlist ekstensi dan validasi magic bytes.',
          'Rename file upload dengan nama random.',
          'Simpan file di luar web root atau object storage private.',
          'Scan file dan batasi ukuran upload.',
        ],
      },
      {
        slug: 'mime-type-bypass',
        title: 'MIME Type Bypass',
        difficulty: 'Intermediate',
        status: 'Ready',
        icon: FaFileUpload,
        attackType: 'Suspicious Upload',
        detector: /(content-type=image\/png.*\.php|application\/x-httpd-php|image\/svg|\.php)/i,
        inputLabel: 'Upload metadata',
        placeholder: 'Coba: filename=shell.php; content-type=image/png',
        defaultInput: 'filename=shell.php; content-type=image/png',
        payloads: [
          'filename=shell.php; content-type=image/png',
          'filename=avatar.svg; content-type=image/svg+xml',
          'filename=payload.php; content-type=image/jpeg',
        ],
        explanation:
          'MIME type bypass memalsukan Content-Type agar file script terlihat seperti gambar.',
        objectives: [
          'Membedakan Content-Type dari client dan validasi file sebenarnya.',
          'Menguji upload SVG atau file script yang menyamar.',
          'Melihat kenapa validasi harus dilakukan di server.',
        ],
        normalOutput: 'MIME dan isi file konsisten dengan file gambar aman.',
        vulnerableOutput:
          'Vulnerable response: aplikasi percaya Content-Type dari client dan menerima script sebagai gambar.',
        secureOutput:
          'Secure response: magic bytes tidak cocok dengan allowlist sehingga upload ditolak.',
        successReason:
          'Payload berhasil karena aplikasi mempercayai header Content-Type dari browser.',
        failureReason:
          'Payload gagal jika backend memeriksa signature file dan melakukan content validation.',
        mitigation: [
          'Jangan percaya Content-Type dari client.',
          'Validasi magic bytes dan parse file sesuai tipe yang diizinkan.',
          'Konversi ulang gambar ke format aman jika memungkinkan.',
          'Blok SVG jika tidak benar-benar dibutuhkan.',
        ],
      },
      {
        slug: 'extension-bypass',
        title: 'Extension Bypass',
        difficulty: 'Intermediate',
        status: 'Ready',
        icon: FaFileUpload,
        attackType: 'Suspicious Upload',
        detector: /(\.php\.jpg|\.jpg\.php|%00|\.phtml|\.phar|double extension)/i,
        inputLabel: 'File name variant',
        placeholder: 'Coba: avatar.php.jpg',
        defaultInput: 'avatar.php.jpg',
        payloads: ['avatar.php.jpg', 'avatar.jpg.php', 'shell.phtml'],
        explanation:
          'Extension bypass memanfaatkan double extension, null byte, atau ekstensi alternatif agar file berbahaya lolos filter.',
        objectives: [
          'Menguji filter ekstensi yang hanya membaca bagian terakhir nama file.',
          'Memahami risiko ekstensi alternatif seperti phtml atau phar.',
          'Membuat aturan upload yang konsisten dan tidak ambigu.',
        ],
        normalOutput: 'Ekstensi gambar valid diterima setelah nama file dinormalisasi.',
        vulnerableOutput:
          'Vulnerable response: filter keliru membaca file sebagai gambar, padahal masih mengandung ekstensi script.',
        secureOutput:
          'Secure response: nama file dinormalisasi, ekstensi ganda ditolak, dan file di-rename.',
        successReason:
          'Payload berhasil karena filter ekstensi rapuh dan tidak menormalisasi nama file.',
        failureReason:
          'Payload gagal jika server memakai allowlist ketat, normalisasi path, dan nama file random.',
        mitigation: [
          'Normalize filename sebelum validasi.',
          'Gunakan allowlist satu ekstensi final yang jelas.',
          'Rename semua file upload.',
          'Matikan eksekusi script di direktori upload.',
        ],
      },
    ],
  },
  {
    slug: 'mini-waf',
    title: 'Mini WAF Lab',
    shortTitle: 'Security Misconfiguration',
    icon: FaShieldAlt,
    accent: '#f59e0b',
    difficulty: 'Beginner - Advanced',
    status: 'Ready',
    description:
      'Menguji mode WAF, logging, blocking, dan monitoring untuk melihat bagaimana kontrol defensif bekerja di aplikasi.',
    scenarios: [
      {
        slug: 'detection-only-mode',
        title: 'Detection Only Mode',
        difficulty: 'Beginner',
        status: 'Ready',
        icon: FaShieldAlt,
        attackType: 'WAF Detection',
        detector: /('|<script|onerror\s*=|\.php|\/admin|debug=true)/i,
        inputLabel: 'Request payload',
        placeholder: "Coba: q=' OR '1'='1' --",
        defaultInput: "q=' OR '1'='1' --",
        payloads: ["q=' OR '1'='1' --", "comment=<script>alert(1)</script>", 'file=shell.php'],
        explanation:
          'Detection Only Mode mencatat request mencurigakan tetapi tetap meneruskan request ke aplikasi.',
        objectives: [
          'Melihat perbedaan deteksi dan blokir.',
          'Memahami kenapa mode deteksi cocok untuk tuning rule.',
          'Membaca event WAF tanpa mengganggu user flow.',
        ],
        normalOutput: 'Request normal diteruskan tanpa event keamanan.',
        vulnerableOutput:
          'Detection response: request diteruskan ke aplikasi, tetapi event dicatat sebagai suspicious.',
        secureOutput:
          'Secure response: request tetap diteruskan, namun aplikasi sudah punya mitigasi sehingga payload tidak berdampak.',
        successReason:
          'Payload masih sampai ke aplikasi karena mode deteksi memang tidak memblokir.',
        failureReason:
          'Payload tidak berdampak jika aplikasi sudah aman walaupun WAF hanya mendeteksi.',
        mitigation: [
          'Gunakan detection mode untuk tuning dan mengurangi false positive.',
          'Kirim event WAF ke dashboard monitoring.',
          'Naikkan rule yang stabil ke blocking mode.',
          'Tetap perbaiki root cause di aplikasi.',
        ],
      },
      {
        slug: 'blocking-mode',
        title: 'Blocking Mode',
        difficulty: 'Intermediate',
        status: 'Ready',
        icon: FaExclamationTriangle,
        attackType: 'WAF Blocking',
        detector: /('|<script|onerror\s*=|\.php|\/admin|debug=true|union\s+select)/i,
        inputLabel: 'Request payload',
        placeholder: "Coba: union select username,password from users --",
        defaultInput: 'union select username,password from users --',
        payloads: ['union select username,password from users --', '<img src=x onerror=alert(1)>', 'filename=shell.php'],
        explanation:
          'Blocking Mode menolak request yang cocok dengan rule WAF sebelum mencapai fitur aplikasi.',
        objectives: [
          'Melihat response 403 pada request berbahaya.',
          'Mengenali false positive dan kebutuhan tuning rule.',
          'Mencatat request yang diblokir untuk investigasi.',
        ],
        normalOutput: 'Request aman diteruskan ke aplikasi.',
        vulnerableOutput:
          'Blocking response: request ditahan oleh WAF dan aplikasi tidak memproses payload.',
        secureOutput:
          'Secure response: WAF memblokir payload dan aplikasi tetap memiliki validasi server-side sebagai lapisan kedua.',
        successReason:
          'Blocking berhasil saat rule cocok dengan pola payload dan mode WAF diset ke Blocking Mode.',
        failureReason:
          'Blocking dapat gagal jika rule terlalu sempit atau payload menggunakan encoding yang belum dicover.',
        mitigation: [
          'Tuning rule berdasarkan log detection mode.',
          'Gunakan canonicalization sebelum matching rule.',
          'Jangan jadikan WAF satu-satunya kontrol keamanan.',
          'Buat allowlist untuk endpoint yang sering false positive.',
        ],
      },
      {
        slug: 'logging-monitoring',
        title: 'Logging & Monitoring',
        difficulty: 'Intermediate',
        status: 'Ready',
        icon: FaTerminal,
        attackType: 'Security Monitoring',
        detector: /('|<script|onerror\s*=|\.php|\/admin|debug=true|failed login|brute)/i,
        inputLabel: 'Security event',
        placeholder: 'Coba: failed login attempt=6 username=admin',
        defaultInput: 'failed login attempt=6 username=admin',
        payloads: ['failed login attempt=6 username=admin', 'GET /admin from guest', 'upload shell.php blocked'],
        explanation:
          'Logging dan monitoring membantu melihat pola serangan, prioritas triage, dan efektivitas kontrol keamanan.',
        objectives: [
          'Mencatat event keamanan dengan context yang cukup.',
          'Mengelompokkan severity dan surface serangan.',
          'Membedakan noise, suspicious event, dan incident candidate.',
        ],
        normalOutput: 'Event informasional dicatat dengan severity rendah.',
        vulnerableOutput:
          'Monitoring response: event mencurigakan masuk dashboard, tetapi perlu triage manual.',
        secureOutput:
          'Secure response: event diperkaya dengan severity, source, action, dan status mitigasi.',
        successReason:
          'Monitoring berhasil jika event penting punya waktu, endpoint, payload ringkas, severity, dan action.',
        failureReason:
          'Monitoring gagal jika log terlalu minim, tidak terstruktur, atau berisi data sensitif mentah.',
        mitigation: [
          'Gunakan structured logging dengan field konsisten.',
          'Masking credential, token, dan data pribadi.',
          'Buat alert untuk event high confidence.',
          'Review log secara berkala untuk tuning kontrol.',
        ],
      },
    ],
  },
];

const categoryMap = Object.fromEntries(labCategories.map((category) => [category.slug, category]));

function nowTime() {
  return new Date().toLocaleTimeString('en-US', { hour12: false });
}

function detectPayload(value, scenario) {
  const rules = wafRules.filter((rule) => rule.pattern.test(value));
  const scenarioMatched = scenario?.detector?.test(value);

  if (scenarioMatched && !rules.some((rule) => rule.type === scenario.attackType)) {
    return [
      ...rules,
      {
        type: scenario.attackType,
        severity: scenario.attackType.includes('WAF') || scenario.attackType.includes('Monitoring') ? 'Medium' : 'High',
      },
    ];
  }

  return rules;
}

function buildSimulationResult({ scenario, input, wafMode, secureMode }) {
  const findings = detectPayload(input, scenario);
  const attackMatched = findings.length > 0;
  const blocked = wafMode === 'block' && attackMatched;

  if (!input.trim()) {
    return {
      status: 'idle',
      title: 'Input masih kosong',
      output: 'Masukkan payload atau pilih salah satu contoh payload untuk mulai menguji sub-lab ini.',
      explanation: 'Belum ada request yang diproses.',
      findings: [],
      blocked: false,
    };
  }

  if (blocked) {
    return {
      status: 'blocked',
      title: 'Request diblokir Mini WAF',
      output: 'HTTP 403 simulated. Payload cocok dengan rule WAF dan tidak diteruskan ke fitur aplikasi.',
      explanation:
        'Payload gagal karena WAF berada di Blocking Mode. Event tetap masuk monitoring agar dapat dianalisis.',
      findings,
      blocked: true,
    };
  }

  if (attackMatched && secureMode) {
    return {
      status: 'mitigated',
      title: 'Payload terdeteksi, dampak berhasil dicegah',
      output: scenario.secureOutput,
      explanation: scenario.failureReason,
      findings,
      blocked: false,
    };
  }

  if (attackMatched) {
    return {
      status: wafMode === 'detect' ? 'detected' : 'vulnerable',
      title: wafMode === 'detect' ? 'Payload terdeteksi dan tetap diproses' : 'Vulnerable response',
      output: scenario.vulnerableOutput,
      explanation: scenario.successReason,
      findings,
      blocked: false,
    };
  }

  return {
    status: 'normal',
    title: 'Normal response',
    output: scenario.normalOutput,
    explanation:
      'Input tidak cocok dengan pola serangan pada lab ini. Request diproses sebagai aktivitas normal.',
    findings: [],
    blocked: false,
  };
}

function getStatusLabel(status) {
  const labels = {
    idle: 'Idle',
    normal: 'Normal',
    vulnerable: 'Vulnerable',
    detected: 'Detected',
    mitigated: 'Mitigated',
    blocked: 'Blocked',
  };

  return labels[status] || status;
}

function LabStyles() {
  return (
    <style>{`
      .lab-page {
        min-height: 100vh;
        padding: 5.25rem 0 6rem;
        color: var(--text-main);
      }

      .lab-container {
        width: min(1180px, calc(100% - 2rem));
        margin: 0 auto;
        position: relative;
        z-index: 2;
      }

      .lab-breadcrumb {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.55rem;
        margin-bottom: 1.25rem;
        color: var(--text-soft);
        font-size: 0.86rem;
        font-weight: 700;
      }

      .lab-breadcrumb a {
        color: #93c5fd;
        text-decoration: none;
      }

      .lab-hero {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        margin-bottom: 1.25rem;
      }

      @media (min-width: 900px) {
        .lab-hero {
          grid-template-columns: 1.2fr 0.8fr;
        }
      }

      .lab-hero-card,
      .lab-panel,
      .lab-category-card,
      .lab-scenario-card {
        background: var(--surface);
        border: 1px solid var(--line);
        box-shadow: var(--shadow-card);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
      }

      .lab-hero-card {
        border-radius: 24px;
        padding: clamp(1.35rem, 4vw, 2.4rem);
        overflow: hidden;
        position: relative;
      }

      .lab-hero-card::before,
      .lab-category-card::before,
      .lab-scenario-card::before {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          radial-gradient(circle at 10% 0%, color-mix(in srgb, var(--accent, #38bdf8) 24%, transparent), transparent 18rem),
          linear-gradient(135deg, color-mix(in srgb, var(--accent, #38bdf8) 10%, transparent), transparent 42%);
        opacity: 0.9;
      }

      .lab-hero-content,
      .lab-card-content {
        position: relative;
        z-index: 1;
      }

      .lab-kicker,
      .lab-pill,
      .lab-status,
      .lab-mode {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        border-radius: 999px;
        border: 1px solid rgba(147, 197, 253, 0.22);
        background: rgba(37, 99, 235, 0.13);
        color: #bfdbfe;
        font-size: 0.76rem;
        font-weight: 900;
        line-height: 1;
        padding: 0.46rem 0.7rem;
      }

      .lab-title {
        margin: 1rem 0 0.85rem;
        max-width: 780px;
        font-size: clamp(2.25rem, 6vw, 4.8rem);
        line-height: 1.02;
        font-weight: 950;
        letter-spacing: 0;
        background: linear-gradient(135deg, #60a5fa, #38bdf8 46%, #a78bfa);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .lab-subtitle {
        max-width: 820px;
        color: #c6d3e6;
        line-height: 1.75;
        font-size: 1rem;
      }

      .lab-overview {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.75rem;
      }

      @media (min-width: 520px) {
        .lab-overview {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }
      }

      @media (min-width: 900px) {
        .lab-overview {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      .lab-stat {
        border-radius: 18px;
        border: 1px solid var(--line);
        background: rgba(15, 23, 42, 0.48);
        padding: 1rem;
      }

      .lab-stat strong {
        display: block;
        color: var(--text-main);
        font-size: 1.55rem;
        line-height: 1;
      }

      .lab-stat span {
        display: block;
        color: var(--text-soft);
        margin-top: 0.45rem;
        font-size: 0.76rem;
        font-weight: 800;
      }

      .lab-section-head {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 1rem;
        margin: 2rem 0 1rem;
      }

      .lab-section-head h2 {
        color: var(--text-main);
        font-size: clamp(1.45rem, 3vw, 2.1rem);
        font-weight: 950;
      }

      .lab-section-head p {
        margin-top: 0.35rem;
        max-width: 650px;
        color: var(--text-soft);
        line-height: 1.6;
      }

      .lab-dashboard-grid,
      .lab-scenario-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      @media (min-width: 760px) {
        .lab-dashboard-grid,
        .lab-scenario-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (min-width: 1120px) {
        .lab-dashboard-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }

      .lab-category-card,
      .lab-scenario-card {
        position: relative;
        overflow: hidden;
        border-radius: 22px;
        padding: 1.15rem;
        min-height: 100%;
        transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
      }

      .lab-category-card:hover,
      .lab-scenario-card:hover {
        transform: translateY(-3px);
        border-color: color-mix(in srgb, var(--accent, #38bdf8) 40%, var(--line));
        box-shadow: 0 28px 82px rgba(15, 23, 42, 0.62), 0 0 0 1px color-mix(in srgb, var(--accent, #38bdf8) 15%, transparent);
      }

      .lab-card-top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
      }

      .lab-card-icon {
        width: 48px;
        height: 48px;
        flex: 0 0 auto;
        display: grid;
        place-items: center;
        border-radius: 16px;
        color: var(--accent, #38bdf8);
        background: color-mix(in srgb, var(--accent, #38bdf8) 16%, rgba(15, 23, 42, 0.7));
        border: 1px solid color-mix(in srgb, var(--accent, #38bdf8) 26%, transparent);
      }

      .lab-card-title {
        margin: 1rem 0 0.55rem;
        color: var(--text-main);
        font-size: 1.12rem;
        font-weight: 950;
      }

      .lab-card-desc {
        color: var(--text-soft);
        line-height: 1.62;
        font-size: 0.92rem;
      }

      .lab-meta-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 0.6rem;
        margin: 1rem 0;
      }

      .lab-meta-box {
        min-width: 0;
        border-radius: 14px;
        border: 1px solid var(--line);
        background: rgba(15, 23, 42, 0.48);
        padding: 0.72rem;
      }

      .lab-meta-box span {
        display: block;
        color: var(--text-muted);
        font-size: 0.68rem;
        font-weight: 900;
        text-transform: uppercase;
      }

      .lab-meta-box strong {
        display: block;
        color: var(--text-main);
        margin-top: 0.28rem;
        font-size: 0.82rem;
        line-height: 1.25;
      }

      .lab-btn-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.65rem;
        align-items: center;
      }

      .lab-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        min-height: 42px;
        border-radius: 14px;
        border: 0;
        padding: 0.78rem 0.95rem;
        background: linear-gradient(135deg, #2563eb, #38bdf8);
        color: #fff;
        font: inherit;
        font-weight: 900;
        text-decoration: none;
        cursor: pointer;
        box-shadow: 0 12px 30px rgba(37, 99, 235, 0.28);
      }

      .lab-btn.secondary {
        color: #bfdbfe;
        background: rgba(15, 23, 42, 0.72);
        border: 1px solid rgba(96, 165, 250, 0.24);
        box-shadow: none;
      }

      .lab-btn.ghost {
        color: var(--text-soft);
        background: transparent;
        border: 1px solid var(--line);
        box-shadow: none;
      }

      .lab-detail-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      @media (min-width: 960px) {
        .lab-detail-grid {
          grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
          align-items: start;
        }
      }

      .lab-panel {
        border-radius: 22px;
        padding: 1.15rem;
      }

      .lab-panel + .lab-panel {
        margin-top: 1rem;
      }

      .lab-panel-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        margin-bottom: 0.95rem;
      }

      .lab-panel-title {
        display: flex;
        align-items: center;
        gap: 0.7rem;
        color: var(--text-main);
      }

      .lab-panel-icon {
        width: 40px;
        height: 40px;
        display: grid;
        place-items: center;
        border-radius: 13px;
        color: #93c5fd;
        background: rgba(37, 99, 235, 0.15);
        border: 1px solid rgba(96, 165, 250, 0.2);
      }

      .lab-panel h2,
      .lab-panel h3 {
        color: var(--text-main);
        font-weight: 950;
      }

      .lab-panel h2 {
        font-size: 1.08rem;
      }

      .lab-panel p,
      .lab-panel li {
        color: var(--text-soft);
        line-height: 1.68;
      }

      .lab-list {
        display: grid;
        gap: 0.65rem;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .lab-list li {
        display: flex;
        gap: 0.55rem;
        align-items: flex-start;
        border-radius: 14px;
        border: 1px solid var(--line);
        background: rgba(15, 23, 42, 0.38);
        padding: 0.72rem;
      }

      .lab-list svg {
        flex: 0 0 auto;
        margin-top: 0.28rem;
        color: #38bdf8;
      }

      .lab-form {
        display: grid;
        gap: 0.85rem;
      }

      .lab-label {
        color: var(--text-main);
        font-size: 0.84rem;
        font-weight: 900;
      }

      .lab-input,
      .lab-textarea,
      .lab-select {
        width: 100%;
        box-sizing: border-box;
        border-radius: 14px;
        border: 1px solid var(--line);
        background: rgba(15, 23, 42, 0.74);
        color: var(--text-main);
        padding: 0.82rem 0.9rem;
        font: inherit;
        outline: none;
      }

      .lab-textarea {
        min-height: 132px;
        resize: vertical;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
        font-size: 0.9rem;
      }

      .lab-input:focus,
      .lab-textarea:focus,
      .lab-select:focus {
        border-color: rgba(56, 189, 248, 0.6);
        box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.12);
      }

      .lab-options {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.75rem;
      }

      @media (min-width: 640px) {
        .lab-options {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      .payload-grid {
        display: grid;
        gap: 0.55rem;
      }

      .payload-btn {
        width: 100%;
        text-align: left;
        border: 1px solid var(--line);
        border-radius: 14px;
        padding: 0.75rem;
        color: #cbd5e1;
        background: rgba(15, 23, 42, 0.48);
        cursor: pointer;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
        font-size: 0.82rem;
        overflow-wrap: anywhere;
      }

      .payload-btn:hover {
        border-color: rgba(56, 189, 248, 0.38);
        color: #e0f2fe;
      }

      .lab-output {
        border-radius: 18px;
        border: 1px solid var(--line);
        background: rgba(2, 6, 23, 0.58);
        padding: 1rem;
      }

      .lab-output-top {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 0.7rem;
        margin-bottom: 0.75rem;
      }

      .lab-output h3 {
        color: var(--text-main);
        font-size: 1rem;
        font-weight: 950;
      }

      .lab-output pre {
        margin: 0;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        color: #dbeafe;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
        font-size: 0.88rem;
        line-height: 1.65;
      }

      .result-pill {
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        padding: 0.36rem 0.7rem;
        font-size: 0.72rem;
        font-weight: 950;
        border: 1px solid var(--line);
      }

      .status-idle,
      .status-normal {
        color: #bfdbfe;
        background: rgba(37, 99, 235, 0.14);
        border-color: rgba(96, 165, 250, 0.22);
      }

      .status-detected {
        color: #fde68a;
        background: rgba(245, 158, 11, 0.14);
        border-color: rgba(245, 158, 11, 0.24);
      }

      .status-vulnerable,
      .status-blocked {
        color: #fecaca;
        background: rgba(239, 68, 68, 0.14);
        border-color: rgba(239, 68, 68, 0.24);
      }

      .status-mitigated {
        color: #bbf7d0;
        background: rgba(34, 197, 94, 0.14);
        border-color: rgba(34, 197, 94, 0.24);
      }

      .finding-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.45rem;
        margin-top: 0.75rem;
      }

      .finding-pill {
        display: inline-flex;
        border-radius: 999px;
        padding: 0.34rem 0.62rem;
        font-size: 0.72rem;
        font-weight: 950;
        border: 1px solid var(--line);
      }

      .finding-high {
        color: #fecaca;
        background: rgba(239, 68, 68, 0.15);
        border-color: rgba(239, 68, 68, 0.28);
      }

      .finding-medium {
        color: #fed7aa;
        background: rgba(245, 158, 11, 0.15);
        border-color: rgba(245, 158, 11, 0.28);
      }

      .lab-log-list {
        display: grid;
        gap: 0.65rem;
        max-height: 430px;
        overflow: auto;
        padding-right: 0.25rem;
      }

      .lab-log-item {
        border: 1px solid var(--line);
        border-radius: 16px;
        background: rgba(15, 23, 42, 0.48);
        padding: 0.82rem;
      }

      .lab-log-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.7rem;
        margin-bottom: 0.42rem;
      }

      .lab-log-title {
        color: var(--text-main);
        font-weight: 950;
        font-size: 0.86rem;
      }

      .lab-log-meta,
      .lab-log-payload {
        color: var(--text-soft);
        font-size: 0.78rem;
        overflow-wrap: anywhere;
      }

      .lab-note {
        border-radius: 16px;
        border: 1px solid rgba(96, 165, 250, 0.2);
        background: rgba(37, 99, 235, 0.1);
        color: #c6d3e6;
        line-height: 1.65;
        padding: 0.85rem;
      }

      .not-found-lab {
        min-height: 60vh;
        display: grid;
        place-items: center;
      }

      .not-found-lab .lab-panel {
        max-width: 620px;
      }

      html[data-theme='light'] .lab-subtitle,
      html[data-theme='light'] .lab-note,
      html[data-theme='light'] .payload-btn,
      html[data-theme='light'] .lab-output pre {
        color: #475569;
      }

      html[data-theme='light'] .lab-stat,
      html[data-theme='light'] .lab-meta-box,
      html[data-theme='light'] .lab-list li,
      html[data-theme='light'] .lab-input,
      html[data-theme='light'] .lab-textarea,
      html[data-theme='light'] .lab-select,
      html[data-theme='light'] .payload-btn,
      html[data-theme='light'] .lab-output,
      html[data-theme='light'] .lab-log-item,
      html[data-theme='light'] .lab-btn.secondary {
        background: rgba(248, 250, 252, 0.9);
      }

      html[data-theme='light'] .status-vulnerable,
      html[data-theme='light'] .status-blocked,
      html[data-theme='light'] .finding-high {
        color: #b91c1c;
      }

      html[data-theme='light'] .status-detected,
      html[data-theme='light'] .finding-medium {
        color: #b45309;
      }

      html[data-theme='light'] .status-mitigated {
        color: #15803d;
      }
    `}</style>
  );
}

function Breadcrumb({ category, scenario }) {
  return (
    <nav className="lab-breadcrumb" aria-label="Lab breadcrumb">
      <Link to="/abasecurity-lab">Lab Dashboard</Link>
      {category && (
        <>
          <FaChevronRight />
          <Link to={`/abasecurity-lab/${category.slug}`}>{category.title}</Link>
        </>
      )}
      {scenario && (
        <>
          <FaChevronRight />
          <span>{scenario.title}</span>
        </>
      )}
    </nav>
  );
}

function HeroStats() {
  const scenarioCount = labCategories.reduce((total, category) => total + category.scenarios.length, 0);

  return (
    <aside className="lab-hero-card" style={{ '--accent': '#38bdf8' }}>
      <div className="lab-hero-content">
        <div className="lab-overview">
          <div className="lab-stat">
            <strong>{labCategories.length}</strong>
            <span>Vulnerability</span>
          </div>
          <div className="lab-stat">
            <strong>{scenarioCount}</strong>
            <span>Sub-lab</span>
          </div>
          <div className="lab-stat">
            <strong>3</strong>
            <span>WAF mode</span>
          </div>
          <div className="lab-stat">
            <strong>100%</strong>
            <span>Simulasi aman</span>
          </div>
        </div>
        <p className="lab-note" style={{ marginTop: '1rem' }}>
          Semua payload diproses sebagai simulasi lokal di halaman portfolio. Gunakan ini untuk belajar,
          dokumentasi, dan demo kemampuan offensive serta defensive security.
        </p>
      </div>
    </aside>
  );
}

function DashboardPage() {
  return (
    <>
      <Breadcrumb />
      <section className="lab-hero">
        <div className="lab-hero-card" style={{ '--accent': '#38bdf8' }}>
          <div className="lab-hero-content">
            <span className="lab-kicker"><FaShieldAlt /> OWASP Top 10 Learning Lab</span>
            <h1 className="lab-title">AbaSecurity Lab Dashboard</h1>
            <p className="lab-subtitle">
              Pilih kategori kerentanan untuk masuk ke sub-lab yang lebih fokus. Setiap lab punya payload,
              response, alasan teknis, mitigasi, dan log monitoring agar pengunjung bisa benar-benar mencoba alurnya.
            </p>
          </div>
        </div>
        <HeroStats />
      </section>

      <div className="lab-section-head">
        <div>
          <h2>Daftar Kategori Vulnerability</h2>
          <p>Card ini menjadi pintu masuk utama sebelum pengunjung memilih skenario pengujian yang lebih spesifik.</p>
        </div>
      </div>

      <section className="lab-dashboard-grid">
        {labCategories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </section>
    </>
  );
}

function CategoryCard({ category }) {
  const Icon = category.icon;

  return (
    <article className="lab-category-card" style={{ '--accent': category.accent }}>
      <div className="lab-card-content">
        <div className="lab-card-top">
          <span className="lab-card-icon"><Icon /></span>
          <span className="lab-status">{category.status}</span>
        </div>
        <h3 className="lab-card-title">{category.title}</h3>
        <p className="lab-card-desc">{category.description}</p>
        <div className="lab-meta-grid">
          <div className="lab-meta-box">
            <span>Level</span>
            <strong>{category.difficulty}</strong>
          </div>
          <div className="lab-meta-box">
            <span>Status</span>
            <strong>{category.status}</strong>
          </div>
          <div className="lab-meta-box">
            <span>Skenario</span>
            <strong>{category.scenarios.length}</strong>
          </div>
        </div>
        <Link className="lab-btn" to={`/abasecurity-lab/${category.slug}`}>
          Open Lab <FaChevronRight />
        </Link>
      </div>
    </article>
  );
}

function CategoryPage({ category }) {
  const Icon = category.icon;

  return (
    <>
      <Breadcrumb category={category} />
      <section className="lab-hero">
        <div className="lab-hero-card" style={{ '--accent': category.accent }}>
          <div className="lab-hero-content">
            <span className="lab-kicker"><Icon /> {category.shortTitle}</span>
            <h1 className="lab-title">{category.title}</h1>
            <p className="lab-subtitle">{category.description}</p>
            <div className="lab-btn-row" style={{ marginTop: '1.2rem' }}>
              <Link className="lab-btn secondary" to="/abasecurity-lab"><FaArrowLeft /> Back to Dashboard</Link>
            </div>
          </div>
        </div>
        <aside className="lab-hero-card" style={{ '--accent': category.accent }}>
          <div className="lab-hero-content">
            <div className="lab-overview">
              <div className="lab-stat">
                <strong>{category.scenarios.length}</strong>
                <span>Sub-lab</span>
              </div>
              <div className="lab-stat">
                <strong>{category.status}</strong>
                <span>Status</span>
              </div>
              <div className="lab-stat">
                <strong>{category.difficulty.split(' ')[0]}</strong>
                <span>Level awal</span>
              </div>
              <div className="lab-stat">
                <strong>Logs</strong>
                <span>Monitoring</span>
              </div>
            </div>
            <p className="lab-note" style={{ marginTop: '1rem' }}>
              Masuk ke salah satu sub-lab agar halaman tetap fokus dan tidak terlalu padat.
            </p>
          </div>
        </aside>
      </section>

      <div className="lab-section-head">
        <div>
          <h2>Sub-lab {category.shortTitle}</h2>
          <p>Setiap sub-lab punya halaman sendiri dengan payload, response, analisis, mitigasi, dan mini monitoring.</p>
        </div>
      </div>

      <section className="lab-scenario-grid">
        {category.scenarios.map((scenario) => (
          <ScenarioCard key={scenario.slug} category={category} scenario={scenario} />
        ))}
      </section>
    </>
  );
}

function ScenarioCard({ category, scenario }) {
  const Icon = scenario.icon;

  return (
    <article className="lab-scenario-card" style={{ '--accent': category.accent }}>
      <div className="lab-card-content">
        <div className="lab-card-top">
          <span className="lab-card-icon"><Icon /></span>
          <span className="lab-status">{scenario.status}</span>
        </div>
        <h3 className="lab-card-title">{scenario.title}</h3>
        <p className="lab-card-desc">{scenario.explanation}</p>
        <div className="lab-meta-grid">
          <div className="lab-meta-box">
            <span>Level</span>
            <strong>{scenario.difficulty}</strong>
          </div>
          <div className="lab-meta-box">
            <span>Payload</span>
            <strong>{scenario.payloads.length}</strong>
          </div>
          <div className="lab-meta-box">
            <span>Status</span>
            <strong>{scenario.status}</strong>
          </div>
        </div>
        <Link className="lab-btn" to={`/abasecurity-lab/${category.slug}/${scenario.slug}`}>
          Open Sub-lab <FaChevronRight />
        </Link>
      </div>
    </article>
  );
}

function Panel({ title, icon: Icon, children, action }) {
  return (
    <section className="lab-panel">
      <div className="lab-panel-head">
        <div className="lab-panel-title">
          <span className="lab-panel-icon"><Icon /></span>
          <h2>{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function FindingPill({ finding }) {
  return (
    <span className={`finding-pill finding-${finding.severity.toLowerCase()}`}>
      {finding.type}
    </span>
  );
}

function ScenarioPlayground({ scenario }) {
  const [wafMode, setWafMode] = useState('detect');
  const [secureMode, setSecureMode] = useState(false);
  const [input, setInput] = useState(scenario.defaultInput);
  const [result, setResult] = useState({
    status: 'idle',
    title: 'Belum diuji',
    output: 'Pilih payload atau masukkan input manual, lalu klik Run Simulation.',
    explanation: 'Output, alasan teknis, dan log aktivitas akan muncul setelah simulasi dijalankan.',
    findings: [],
    blocked: false,
  });
  const [logs, setLogs] = useState([
    {
      id: 1,
      time: nowTime(),
      mode: wafModes.detect,
      status: 'idle',
      title: 'Lab initialized',
      payload: scenario.defaultInput,
      findings: [],
      blocked: false,
    },
  ]);

  const handleRun = (event) => {
    event.preventDefault();
    const nextResult = buildSimulationResult({ scenario, input, wafMode, secureMode });

    setResult(nextResult);
    setLogs((current) => [
      {
        id: Date.now(),
        time: nowTime(),
        mode: wafModes[wafMode],
        status: nextResult.status,
        title: nextResult.title,
        payload: input,
        findings: nextResult.findings,
        blocked: nextResult.blocked,
      },
      ...current,
    ].slice(0, 9));
  };

  return (
    <>
      <Panel
        title="Form Simulasi Serangan"
        icon={FaTerminal}
        action={<span className="lab-mode">{wafModes[wafMode]}</span>}
      >
        <form className="lab-form" onSubmit={handleRun}>
          <div className="lab-options">
            <label>
              <span className="lab-label">Mini WAF Mode</span>
              <select
                className="lab-select"
                value={wafMode}
                onChange={(event) => setWafMode(event.target.value)}
              >
                {Object.entries(wafModes).map(([value, label]) => (
                  <option value={value} key={value}>{label}</option>
                ))}
              </select>
            </label>
            <label>
              <span className="lab-label">Application Mode</span>
              <select
                className="lab-select"
                value={secureMode ? 'secure' : 'vulnerable'}
                onChange={(event) => setSecureMode(event.target.value === 'secure')}
              >
                <option value="vulnerable">Vulnerable Mode</option>
                <option value="secure">Secure Mode</option>
              </select>
            </label>
          </div>

          <label>
            <span className="lab-label">{scenario.inputLabel}</span>
            <textarea
              className="lab-textarea"
              placeholder={scenario.placeholder}
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </label>

          <div className="lab-btn-row">
            <button className="lab-btn" type="submit">Run Simulation</button>
            <button className="lab-btn ghost" type="button" onClick={() => setInput('normal-user-input')}>
              Fill Normal Input
            </button>
          </div>
        </form>
      </Panel>

      <Panel title="Contoh Payload" icon={FaCode}>
        <div className="payload-grid">
          {scenario.payloads.map((payload) => (
            <button
              className="payload-btn"
              type="button"
              key={payload}
              onClick={() => setInput(payload)}
            >
              {payload}
            </button>
          ))}
        </div>
      </Panel>

      <Panel title="Hasil Response / Output" icon={FaServer}>
        <div className="lab-output">
          <div className="lab-output-top">
            <h3>{result.title}</h3>
            <span className={`result-pill status-${result.status}`}>
              {getStatusLabel(result.status)}
            </span>
          </div>
          <pre>{result.output}</pre>
          {result.findings.length > 0 && (
            <div className="finding-row">
              {result.findings.map((finding) => (
                <FindingPill key={`${finding.type}-${finding.severity}`} finding={finding} />
              ))}
            </div>
          )}
        </div>
      </Panel>

      <Panel title="Kenapa Payload Berhasil atau Gagal" icon={FaBookOpen}>
        <p>{result.explanation}</p>
      </Panel>

      <Panel title="Log Aktivitas / Mini Monitoring" icon={FaTerminal}>
        <div className="lab-log-list">
          {logs.map((log) => (
            <article className="lab-log-item" key={log.id}>
              <div className="lab-log-top">
                <span className="lab-log-title">{log.title}</span>
                <span className={`result-pill status-${log.status}`}>{getStatusLabel(log.status)}</span>
              </div>
              <p className="lab-log-meta">{log.time} - {log.mode}</p>
              <p className="lab-log-payload">{log.payload}</p>
              {log.findings.length > 0 && (
                <div className="finding-row">
                  {log.findings.map((finding) => (
                    <FindingPill key={`${log.id}-${finding.type}`} finding={finding} />
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </Panel>
    </>
  );
}

function ScenarioPage({ category, scenario }) {
  const Icon = scenario.icon;

  return (
    <>
      <Breadcrumb category={category} scenario={scenario} />
      <section className="lab-hero">
        <div className="lab-hero-card" style={{ '--accent': category.accent }}>
          <div className="lab-hero-content">
            <span className="lab-kicker"><Icon /> {category.title}</span>
            <h1 className="lab-title">{scenario.title}</h1>
            <p className="lab-subtitle">{scenario.explanation}</p>
            <div className="lab-btn-row" style={{ marginTop: '1.2rem' }}>
              <Link className="lab-btn secondary" to={`/abasecurity-lab/${category.slug}`}>
                <FaArrowLeft /> Back to {category.shortTitle}
              </Link>
              <Link className="lab-btn ghost" to="/abasecurity-lab">
                Lab Dashboard
              </Link>
            </div>
          </div>
        </div>
        <aside className="lab-hero-card" style={{ '--accent': category.accent }}>
          <div className="lab-hero-content">
            <div className="lab-overview">
              <div className="lab-stat">
                <strong>{scenario.difficulty}</strong>
                <span>Difficulty</span>
              </div>
              <div className="lab-stat">
                <strong>{scenario.status}</strong>
                <span>Status</span>
              </div>
              <div className="lab-stat">
                <strong>{scenario.payloads.length}</strong>
                <span>Payload</span>
              </div>
              <div className="lab-stat">
                <strong>Safe</strong>
                <span>Client-side lab</span>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <div className="lab-detail-grid">
        <div>
          <Panel title="Penjelasan Singkat Vulnerability" icon={FaBookOpen}>
            <p>{scenario.explanation}</p>
          </Panel>

          <Panel title="Tujuan Pembelajaran" icon={FaClipboardList}>
            <ul className="lab-list">
              {scenario.objectives.map((objective) => (
                <li key={objective}><FaCheckCircle /> <span>{objective}</span></li>
              ))}
            </ul>
          </Panel>

          <ScenarioPlayground key={scenario.slug} scenario={scenario} />
        </div>

        <aside>
          <Panel title="Mitigasi / Cara Pencegahan" icon={FaShieldAlt}>
            <ul className="lab-list">
              {scenario.mitigation.map((item) => (
                <li key={item}><FaCheckCircle /> <span>{item}</span></li>
              ))}
            </ul>
          </Panel>

          <Panel title="Catatan Keamanan Lab" icon={FaExclamationTriangle}>
            <p>
              Lab ini dibuat untuk pembelajaran dan portfolio offensive security. Payload hanya dipakai
              untuk simulasi di halaman ini, bukan untuk menyerang sistem pihak lain.
            </p>
          </Panel>
        </aside>
      </div>
    </>
  );
}

function NotFoundLab({ message }) {
  return (
    <div className="not-found-lab">
      <section className="lab-panel">
        <div className="lab-panel-head">
          <div className="lab-panel-title">
            <span className="lab-panel-icon"><FaExclamationTriangle /></span>
            <h2>Lab tidak ditemukan</h2>
          </div>
        </div>
        <p>{message}</p>
        <div className="lab-btn-row" style={{ marginTop: '1rem' }}>
          <Link className="lab-btn" to="/abasecurity-lab">Kembali ke Lab Dashboard</Link>
        </div>
      </section>
    </div>
  );
}

export default function AbaSecurityLab() {
  const { categorySlug, scenarioSlug } = useParams();
  const category = categorySlug ? categoryMap[categorySlug] : null;
  const scenario = category && scenarioSlug
    ? category.scenarios.find((item) => item.slug === scenarioSlug)
    : null;

  let content = <DashboardPage />;

  if (categorySlug && !category) {
    content = <NotFoundLab message="Kategori vulnerability yang kamu buka belum tersedia di AbaSecurity Lab." />;
  } else if (category && scenarioSlug && !scenario) {
    content = <NotFoundLab message="Sub-lab yang kamu buka belum tersedia pada kategori ini." />;
  } else if (category && scenario) {
    content = <ScenarioPage category={category} scenario={scenario} />;
  } else if (category) {
    content = <CategoryPage category={category} />;
  }

  return (
    <>
      <LabStyles />
      <main className="lab-page">
        <div className="lab-container">
          {content}
        </div>
      </main>
    </>
  );
}
