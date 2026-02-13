import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="font-bold text-xl text-gray-800">DevSec</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a href="#home" className="hover:text-blue-600 transition font-medium">Home</a>
            <a href="#about" className="hover:text-blue-600 transition font-medium">About</a>
            <a href="#projects" className="hover:text-blue-600 transition font-medium">Projects</a>
            <a href="#contact" className="hover:text-blue-600 transition font-medium">Contact</a>
          </div>

          {/* Mobile Button */}
          <button 
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 flex flex-col space-y-3 pb-4 border-t">
            <a href="#home" className="hover:text-blue-600 font-medium">Home</a>
            <a href="#about" className="hover:text-blue-600 font-medium">About</a>
            <a href="#projects" className="hover:text-blue-600 font-medium">Projects</a>
            <a href="#contact" className="hover:text-blue-600 font-medium">Contact</a>
          </div>
        )}
      </div>
    </nav>
  );
}