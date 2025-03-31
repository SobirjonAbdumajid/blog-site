import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">Minimalist Blog</Link>
        <div className="flex gap-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <Link to="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
          <Link to="/categories" className="text-gray-600 hover:text-gray-900">Categories</Link>
          <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
          <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;