// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ onSearch, searchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false); // Tambahkan state untuk theme
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleResultClick = (id) => {
    navigate(`/movie/${id}`);
    setSearchQuery('');
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark'); // Toggle kelas 'dark' di root HTML
  };

  return (
    <div className={`navbar backdrop-blur-lg dark:backdrop-blur-lg dark:bg-opacity-30 bg-opacity-30 text-black dark:text-white dark:bg-black sticky top-0 z-50`}>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-opacity-30 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link to="/">HomePage</Link></li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">YORMOVIE</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">HomePage</Link></li>
      
          <li><Link to="/rated">Rated</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="form-control relative">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto dark:bg-slate-500"
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery && searchResults.length > 0 && (
            <div className="absolute mt-10 z-10 bg-white dark:bg-slate-500 dark:border-black border  rounded mt-1 w-full max-h-60 overflow-y-auto">
              <ul>
                {searchResults.map(movie => (
                  <li
                    key={movie.id}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer"
                    onClick={() => handleResultClick(movie.id)}
                  >
                    {movie.title} ({movie.release_date ? movie.release_date.split('-')[0] : 'TBA'})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button onClick={toggleTheme} className="ml-4 btn btn-ghost">
          {darkMode ? '🌙' : '🌞'} {/* Ikon untuk switcher */}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
