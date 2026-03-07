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
import Footer from './components/Footer.jsx'; // ✅ Sudah diimpor

// Helper: Scroll ke atas & refresh AOS saat ganti halaman
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();
  }, [pathname]);

  return null;
}

function initAOS() {
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out',
  });
}

function App() {
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

        {/* ✅ GUNAKAN KOMPONEN FOOTER BARU DI SINI */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;