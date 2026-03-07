// src/components/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="font-bold text-xl text-gray-800 hover:text-blue-600 transition">
            Ahmat Sembiring
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            <Link to="/experience" className="font-medium text-gray-700 hover:text-blue-600 transition">
              Pengalaman
            </Link>
            <Link to="/projects" className="font-medium text-gray-700 hover:text-blue-600 transition">
              Projects
            </Link>
            <Link to="/contact" className="font-medium text-gray-700 hover:text-blue-600 transition">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 flex flex-col space-y-3 pb-4 border-t border-gray-200">
            <Link 
              to="/" 
              className="font-medium text-gray-700 hover:text-blue-600 transition" 
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/experience" 
              className="font-medium text-gray-700 hover:text-blue-600 transition" 
              onClick={() => setIsOpen(false)}
            >
              Pengalaman
            </Link>
            <Link 
              to="/projects" 
              className="font-medium text-gray-700 hover:text-blue-600 transition" 
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
            <Link 
              to="/contact" 
              className="font-medium text-gray-700 hover:text-blue-600 transition" 
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}