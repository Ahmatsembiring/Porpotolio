import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import SocialMedia from './components/SocialMedia';
import Contact from './components/Contact';

function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <SocialMedia />
      <Contact />
      
      <footer className="py-8 text-center text-gray-600 bg-gray-50 border-t">
        © {new Date().getFullYear()} Nama Kamu. All rights reserved.
      </footer>
    </div>
  );
}

export default App;