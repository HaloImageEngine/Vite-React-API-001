import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const baseStyle = {
    marginRight: '20px',
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold'
  };

  const activeStyle = {
    color: '#007BFF'
  };

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

  const navContainer = {
    padding: '1rem',
    backgroundColor: '#eaeaea'
  };

  const linkItem = {
    display: 'block',
    padding: '6px 10px',
    color: '#333',
    textDecoration: 'none'
  };

  return (
    <nav style={navContainer}>
      {/* Home */}
      <NavLink to="/" style={({ isActive }) => isActive ? { ...baseStyle, ...activeStyle } : baseStyle} end>
        Home
      </NavLink>

      {/* DummyJson Dropdown */}
      <div
        style={dropdownWrapper}
        onMouseEnter={(e) => e.currentTarget.querySelector('.dropdown-content').style.display = 'block'}
        onMouseLeave={(e) => e.currentTarget.querySelector('.dropdown-content').style.display = 'none'}
      >
        
      </div>

       {/* Products Dropdown */}
      <div
        style={dropdownWrapper}
        onMouseEnter={(e) => e.currentTarget.querySelector('.dropdown-content').style.display = 'block'}
        onMouseLeave={(e) => e.currentTarget.querySelector('.dropdown-content').style.display = 'none'}
      >
        <span style={{ ...baseStyle, cursor: 'pointer' }}>Products ▾</span>
        <div className="dropdown-content" style={{ ...dropdownContent }}>
          <NavLink to="/products" style={({ isActive }) => isActive ? { ...linkItem, ...activeStyle } : linkItem}>
            Products
          </NavLink>
          <NavLink to="/carts" style={({ isActive }) => isActive ? { ...linkItem, ...activeStyle } : linkItem}>
            Carts
          </NavLink>
          <NavLink to="/products-search" style={({ isActive }) => isActive ? { ...linkItem, ...activeStyle } : linkItem}>
            ProductsSearch
          </NavLink>
          <NavLink to="/productdetail" style={({ isActive }) => isActive ? { ...linkItem, ...activeStyle } : linkItem}>
            ProductDetail
          </NavLink>
        </div>
      </div>



      {/* Examples Dropdown (Vertical Stack) */}
      
    </nav>
  );
}

export default Navbar;
