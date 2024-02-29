import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo-2.svg';
import { getFutsalByName } from '../services/futsalHelper';


const NavBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();
  const handleSearch = async () => {
    try {
      const futsal = await getFutsalByName(searchQuery);
      if (futsal) {
        navigate(`/booking/${futsal.id}`);
      } else {
        console.log('Futsal not found');
      }
    } catch (error) {
      console.error('Error searching for futsal:', error);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <nav className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-10 w-10" src={Logo} alt="Logo" />
            </div>
            <div className="ml-2 text-lg font-bold text-white">FutsalFever</div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              HOME
            </Link>
            <button
              onClick={handleLoginClick}
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              LOGIN
            </button>
            <Link
              to="/login"
              onClick={handleLogout}
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              LOGOUT
            </Link>
          </div>

          <div className="hidden md:flex items-center ml-4">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 text-white px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-black p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
