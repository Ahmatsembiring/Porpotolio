# OWASP Top 10 Web Security Notes

Materi ini berisi ringkasan pembelajaran untuk memahami risiko umum pada aplikasi web.
Gunakan catatan ini hanya untuk pembelajaran, lab pribadi, dan sistem yang memang kamu miliki izin untuk uji.

## Fokus Materi

- Broken Access Control
- Cryptographic Failures
- Injection
- Insecure Design
- Security Misconfiguration
- Vulnerable and Outdated Components
- Identification and Authentication Failures
- Software and Data Integrity Failures
- Security Logging and Monitoring Failures
- Server-Side Request Forgery

## Pola Analisis

1. Pahami fitur aplikasi dan alur data.
2. Identifikasi input user dan boundary trust.
3. Periksa validasi, authorization, session, dan logging.
4. Dokumentasikan risiko dengan dampak bisnis.
5. Tulis mitigasi yang dapat diterapkan developer.

## Mitigasi Umum

- Gunakan parameterized query.
- Terapkan output encoding.
- Validasi authorization di sisi server.
- Batasi error detail di production.
- Aktifkan audit log untuk aktivitas sensitif.
- Review dependency secara berkala.
