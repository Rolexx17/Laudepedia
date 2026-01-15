import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header
      style={{ 
        backgroundColor: '#bfa76a', 
        zIndex: 3000, 
        padding: '0 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}
    >
      <h4
        className="fw-bold text-white m-0"
        style={{ cursor: 'pointer', letterSpacing: '1px' }}
        onClick={() => navigate('/')}
      >
        Laudepedia
      </h4>

      <div className="d-flex align-items-center gap-4">
        <span
          className="text-white fw-semibold d-none d-md-block"
          style={{ cursor: 'pointer', fontSize: '0.9rem' }}
          onClick={() => navigate('/about')}
        >
          About Us
        </span>

        <div style={{ cursor: 'pointer' }} onClick={() => navigate('/cart')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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