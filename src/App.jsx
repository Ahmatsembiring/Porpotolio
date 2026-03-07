// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';

// Import CSS untuk AOS dan Swiper (global styles)
import 'aos/dist/aos.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Komponen
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import ProjectsList from './pages/ProjectsList.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Contact from './pages/Contact.jsx';
import Experience from './pages/Experience.jsx';

// Helper: Scroll ke atas & refresh AOS saat ganti halaman
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh(); // Refresh AOS jika konten dinamis berubah
  }, [pathname]);

  return null;
}

// Inisialisasi AOS sekali saat app pertama kali load
function initAOS() {
  AOS.init({
    duration: 800,
    once: true,        // Hanya animasi sekali per elemen
    offset: 100,       // Jarak dari viewport sebelum animasi jalan
    easing: 'ease-out', // Jenis easing animasi
  });
}

function App() {
  // Jalankan AOS.init hanya sekali di client
  useEffect(() => {
    initAOS();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <footer className="py-8 text-center text-gray-600 bg-gray-50 border-t">
          © {new Date().getFullYear()} AhmatSembiring. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;