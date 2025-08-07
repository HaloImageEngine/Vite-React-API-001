import React from 'react';
import viteLogo from '/vite.svg';
import reactLogo from './assets/react.svg';
import Navbar from './components/Navbar.jsx'; // adjust path as needed

function Header() {
  return (
    
    <header style={{ background: '#f0f0f0' }}>
      <div style={{
          width: '100vw',           // Full screen width
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        color: '#333'
      }}>
        <img src={viteLogo} alt="Vite Logo" style={{ height: '40px', marginRight: '10px' }} />
        <img src={reactLogo} alt="React Logo" style={{ height: '40px', marginRight: '10px' }} />
        <h1 style={{ margin: 0 }}>Dummyjson.com API </h1>
      </div>
  
    </header>
  );
}

export default Header;

