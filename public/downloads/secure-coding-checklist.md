# Secure Coding Checklist

Checklist ini membantu developer membangun aplikasi dengan praktik keamanan dasar.

## Authentication

- Hash password dengan algoritma modern.
- Tambahkan rate limiting pada login.
- Regenerasi session setelah login.

## Authorization

- Validasi akses di sisi server.
- Jangan percaya role dari client.
- Gunakan prinsip least privilege.

## Input and Output

- Validasi input berdasarkan allowlist.
- Gunakan parameterized query.
- Lakukan output encoding sesuai konteks.

## Secrets and Dependency

- Jangan commit secret ke repository.
- Gunakan environment variable.
- Update dependency dan pantau advisory keamanan.

## Logging

- Log aktivitas sensitif.
- Jangan log password atau token.
- Buat alert untuk pola anomali.
