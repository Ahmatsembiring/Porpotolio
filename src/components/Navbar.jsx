// src/components/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="font-bold text-xl text-gray-800">
            DevSec
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-600 transition font-medium">
              Home
            </Link>
            <Link to="/projects" className="hover:text-blue-600 transition font-medium">
              Projects
            </Link>
            <Link to="/contact" className="hover:text-blue-600 transition font-medium">
              Contact
            </Link>
          </div>

          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 flex flex-col space-y-3 pb-4 border-t">
            <Link to="/" className="hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link to="/projects" className="hover:text-blue-600 font-medium">
              Projects
            </Link>
            <Link to="/contact" className="hover:text-blue-600 font-medium">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}