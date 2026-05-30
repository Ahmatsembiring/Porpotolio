// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Navbar from './components/Navbar.jsx';
import SpiderWebBackground from './components/SpiderWebBackground.jsx';
import Home from './pages/Home.jsx';
import ProjectsList from './pages/ProjectsList.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import DownloadCenter from './pages/DownloadCenter.jsx';
import Blog from './pages/Blog.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import Contact from './pages/Contact.jsx';
import Experience from './pages/Experience.jsx';
import AbaSecurityLab from './pages/AbaSecurityLab.jsx';
import CV from './pages/CV.jsx';               // ✅ BARU
import Sertifikasi from './pages/Sertifikasi.jsx'; // ✅ BARU
import Footer from './components/Footer.jsx';

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark';
  return window.localStorage.getItem('portfolio-theme') || 'dark';
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();
  }, [pathname]);
  return null;
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-out',
    });
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="site-shell font-sans" data-theme={theme}>
        <SpiderWebBackground />
        <div className="site-content">
          <Navbar theme={theme} onToggleTheme={toggleTheme} />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/projects/download" element={<DownloadCenter />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/abasecurity-lab" element={<AbaSecurityLab />} />
          <Route path="/cv" element={<CV />} />               {/* ✅ BARU */}
          <Route path="/sertifikasi" element={<Sertifikasi />} /> {/* ✅ BARU */}
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
