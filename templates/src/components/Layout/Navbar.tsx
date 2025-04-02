
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <nav className="border-b border-gray-200 bg-white py-3 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">Idrok</Link>
        </div>
        
        <div className="hidden md:flex relative max-w-md w-full mx-8">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10 py-2 pr-4 bg-gray-100 rounded-full w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/search" className="md:hidden">
            <Search className="w-5 h-5 text-gray-600" />
          </Link>
          
          {/* <Link to="/notifications" className="hidden sm:block">
            <Bell className="w-5 h-5 text-gray-600" />
          </Link> */}
          
          <Link to="/write" className="hidden sm:flex border border-gray-300 rounded-full px-4 py-1.5 text-sm hover:border-gray-900">
            Write
          </Link>
          
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <Link to="/login" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Login</Link>
              <span className="text-gray-400">|</span>
              <Link to="/register" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Register</Link>
            </div>
            
            <Link to="/profile">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://i.pravatar.cc/150?u=john" />
                <AvatarFallback className="bg-blue-600 text-white">S</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
