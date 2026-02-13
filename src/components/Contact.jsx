export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Mari Bekerja Sama!</h2>
        <p className="text-gray-700 mb-8">
          Terbuka untuk proyek pengembangan web, audit keamanan, atau kolaborasi edukasi.
        </p>
        
        <div className="bg-gray-50 p-6 rounded-2xl">
          <p className="font-medium text-lg mb-2">📧 Email</p>
          <a href="mailto:hello@namakamu.com" className="text-blue-600 hover:underline">
            hello@namakamu.com
          </a>
        </div>

        <p className="mt-8 text-gray-600">
          Atau langsung kirim pesan via form (coming soon).
        </p>
      </div>
    </section>
  );
}