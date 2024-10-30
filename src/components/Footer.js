import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../app/routes'; 
import '../components/Footer.css'; 

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <ul className="footer-links">
          <li>
            <Link to={ROUTES.allSubredditRoute()}>All Subreddits</Link>
          </li>
        </ul>
        <p className="footer-text">
          © {new Date().getFullYear()} RedditMini App. All rights reserved.
        </p>
        <button className="back-to-top" onClick={scrollToTop}>
          Back to Top
        </button>
      </div>
    </footer>
  );
}

export default Footer;