// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';      // ✅ tambah .jsx
import Home from './pages/Home.jsx';              // ✅
import ProjectsList from './pages/ProjectsList.jsx'; // ✅
import ProjectDetail from './pages/ProjectDetail.jsx'; // ✅
import Contact from './pages/Contact.jsx';        // ✅

function App() {
  return (
    <Router>
      <div className="font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <footer className="py-8 text-center text-gray-600 bg-gray-50 border-t">
          © {new Date().getFullYear()} Nama Kamu. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;