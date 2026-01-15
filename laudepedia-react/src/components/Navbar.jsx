import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleNavigation } from '../js/navService';
import '../css/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="navbar-fixed animate-slide-down">
      <h4
        className="brand-logo animate-text-focus"
        onClick={() => handleNavigation(navigate, '/')}
      >
        Laudepedia
      </h4>

      <div className="nav-actions">
        {/* Class d-none dihapus agar tetap muncul di HP */}
        <span
          className="nav-link-item"
          onClick={() => handleNavigation(navigate, '/about')}
        >
          About Us
        </span>

        <div className="cart-icon-wrapper" onClick={() => handleNavigation(navigate, '/cart')}>
          <svg className="cart-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Navbar;