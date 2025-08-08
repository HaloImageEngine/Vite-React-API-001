import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const baseStyle = {
    marginRight: '20px',
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold'
  };

  const activeStyle = { color: '#007BFF' };

  const dropdownWrapper = {
    position: 'relative',
    display: 'inline-block',
    marginRight: '20px'
  };

  const dropdownContent = {
    display: 'none',
    position: 'absolute',
    top: '100%',
    left: '0',
    backgroundColor: '#f9f9f9',
    padding: '10px',
    boxShadow: '0px 8px 16px rgba(0,0,0,0.2)',
    zIndex: 1,
    minWidth: '180px',
    flexDirection: 'column'
  };

  const navContainer = { padding: '1rem', backgroundColor: '#eaeaea' };

  const linkItem = {
    display: 'block',
    padding: '6px 10px',
    color: '#333',
    textDecoration: 'none'
  };

  return (
    <nav style={navContainer}>
      {/* Home */}
      <NavLink to="/" style={({ isActive }) => (isActive ? { ...baseStyle, ...activeStyle } : baseStyle)} end>
        Home
      </NavLink>

      {/* Products Dropdown */}
      <div
        style={dropdownWrapper}
        onMouseEnter={(e) => (e.currentTarget.querySelector('.dropdown-content').style.display = 'block')}
        onMouseLeave={(e) => (e.currentTarget.querySelector('.dropdown-content').style.display = 'none')}
      >
        <span style={{ ...baseStyle, cursor: 'pointer' }}>Products ▾</span>
        <div className="dropdown-content" style={{ ...dropdownContent }}>
          <NavLink to="/products" style={({ isActive }) => (isActive ? { ...linkItem, ...activeStyle } : linkItem)}>
            Products
          </NavLink>
          <NavLink to="/carts" style={({ isActive }) => (isActive ? { ...linkItem, ...activeStyle } : linkItem)}>
            Carts
          </NavLink>
          <NavLink to="/products-search" style={({ isActive }) => (isActive ? { ...linkItem, ...activeStyle } : linkItem)}>
            Products Search
          </NavLink>
        </div>
      </div>

      {/* Users Dropdown — FIXED WRAPPER */}
      <div
        style={dropdownWrapper}
        onMouseEnter={(e) => (e.currentTarget.querySelector('.dropdown-content').style.display = 'block')}
        onMouseLeave={(e) => (e.currentTarget.querySelector('.dropdown-content').style.display = 'none')}
      >
        <span style={{ ...baseStyle, cursor: 'pointer' }}>Users ▾</span>
        <div className="dropdown-content" style={{ ...dropdownContent }}>
          <NavLink to="/users" style={({ isActive }) => (isActive ? { ...linkItem, ...activeStyle } : linkItem)}>
            Get All Users
          </NavLink>
          {/* Optional dev/test links for param routes */}
          <NavLink to="/carts-by-user/1" style={({ isActive }) => (isActive ? { ...linkItem, ...activeStyle } : linkItem)}>
            Carts by User (ex: #1)
          </NavLink>
          <NavLink to="/user-cart/1" style={({ isActive }) => (isActive ? { ...linkItem, ...activeStyle } : linkItem)}>
            User Cart Detail (ex: #1)
          </NavLink>
        </div>
      </div>

      {/* External Link Dropdown */}
      <div
        style={dropdownWrapper}
        onMouseEnter={(e) => (e.currentTarget.querySelector('.dropdown-content').style.display = 'block')}
        onMouseLeave={(e) => (e.currentTarget.querySelector('.dropdown-content').style.display = 'none')}
      >
        <span style={{ ...baseStyle, cursor: 'pointer' }}>External ▾</span>
        <div className="dropdown-content" style={{ ...dropdownContent }}>
          <a
            href="https://dummyjson.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            style={linkItem}
          >
            DummyJSON Docs
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
