import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ROUTES from '../app/routes'; 
import './Navbar.css'; 

function Navbar() {
  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate(); 

  const handleSearch = (e) => { 
    e.preventDefault(); 
    navigate(`${ROUTES.searchRoute()}?q=${encodeURIComponent(searchTerm)}`);
  };


  return (
    <nav className="navbar">
      <div className="container">
        <Link to={'/'} className="navbar-brand">
          RedditMini App
        </Link>
        <ul className="navbar-links">
          <li>
            <Link to={ROUTES.allSubredditRoute()}>All Subreddits</Link>
          </li>
          <div className="navbar-search input-group">
            <form onSubmit={handleSearch} className="d-flex align-items-center">
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="Search if you dare..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="btn btn-primary rounded-circle ms-2">
                🔎
              </button>
            </form>
          </div>
        </ul>
      </div>
    </nav>
  );
}


export default Navbar;