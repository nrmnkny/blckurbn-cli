import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-30 bg-black bg-opacity-80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="text-yellow-500 text-2xl tracking-widest font-bebas uppercase">
            Black Urban Records
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 text-sm font-bebas text-yellow-400 uppercase">
            <Link to="/" className="hover:text-yellow-200">Home</Link>
            <Link to="/artists" className="hover:text-yellow-200">Artists</Link>
            <Link to="/videos" className="hover:text-yellow-200">Videos</Link>
            <Link to="/contact" className="hover:text-yellow-200">Contact</Link>
            <Link to="/reviews" className="hover:text-yellow-200">Reviews</Link>
          </nav>

          {/* Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-yellow-500 focus:outline-none text-2xl"
              aria-label="Toggle menu"
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className={`md:hidden px-4 pb-4 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0 overflow-hidden'}`}>
        <nav className="flex flex-col space-y-2 text-yellow-300 text-sm font-bebas uppercase">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/artists" onClick={() => setIsOpen(false)}>Artists</Link>
          <Link to="/videos" onClick={() => setIsOpen(false)}>Videos</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link to="/reviews" onClick={() => setIsOpen(false)}>Reviews</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
