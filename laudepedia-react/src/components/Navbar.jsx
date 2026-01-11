import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header
      className="p-3 d-flex align-items-center justify-content-between sticky-top"
      style={{ backgroundColor: '#bfa76a', zIndex: 1000 }}
    >
      {/* LOGO */}
      <h4
        className="fw-bold text-white m-0"
        style={{ cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        Laudepedia
      </h4>

      {/* SEARCH */}
      <div className="input-group w-50 shadow-sm">
        <span className="input-group-text border-0 bg-white">
          <i className="bi bi-search" style={{ color: '#bfa76a' }}></i>
        </span>
        <input
          type="text"
          className="form-control border-0"
          placeholder="Cari di Laudepedia..."
        />
      </div>

      {/* RIGHT MENU */}
      <div className="d-flex align-items-center gap-3">
        <span
          className="text-white fw-semibold"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/about')}
        >
          About Us
        </span>

        <i
          className="bi bi-cart-fill text-white fs-4"
          style={{ cursor: 'pointer' }}
          onClick={() => alert('Coming Soon!')}
        ></i>
      </div>
    </header>
  );
};

export default Navbar;
