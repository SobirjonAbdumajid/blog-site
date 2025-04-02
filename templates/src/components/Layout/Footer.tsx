
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Github, Send } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Idrok</h3>
            <p className="text-gray-300 mb-4">
              A minimalist blog platform built with React and styled with Tailwind CSS.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white">Blog</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">About</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/categories/web-development" className="text-gray-300 hover:text-white">Web Development</Link></li>
              <li><Link to="/categories/ai-machine-learning" className="text-gray-300 hover:text-white">AI & Machine Learning</Link></li>
              <li><Link to="/categories/ux-ui-design" className="text-gray-300 hover:text-white">UX/UI Design</Link></li>
              <li><Link to="/categories/mobile-development" className="text-gray-300 hover:text-white">Mobile Development</Link></li>
            </ul>
          </div>
          
          {/* Follow Us section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <Instagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <Github size={24} />
              </a>
              <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <Send size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {currentYear} Idrok. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
