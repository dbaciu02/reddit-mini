import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'; 
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 
import './AppLayout.css';

function AppLayout() {
  const location = useLocation();

  return (
    <div>
      <Navbar />
      <main>
        <Outlet />  
        {location.pathname === '/' && (
          <>
          <div className='card'>
            <div className='card-body'>
              <h1 className='card-title'>Welcome to RedditMini!</h1>
              <p className='card-text'>Click on all subreddits to find your people or search for a specific reddit! 
              <br /><span>*All Subreddits changes daily so check in to find a new one!*</span></p>
            </div>
          </div>  
          <div style={{ width: '100%', height: 0, paddingBottom: '56%', position: 'relative' }}> 
            <iframe src="https://giphy.com/embed/ubh3VFjesM5ZZ6FaqE" width="100%" height="50%" 
            style={{ position: 'absolute' }} allowFullScreen title="Giphy GIF" >
            </iframe> 
          </div>
          </>
         )}
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;