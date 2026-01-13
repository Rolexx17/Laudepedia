import React from 'react';
import { Link } from 'react-router-dom';

const BottomNav = () => {
  return (
    <nav
      className="position-fixed bottom-0 w-100 bg-white border-top d-flex justify-content-around py-2"
      style={{ zIndex: 1000 }}
    >
      <NavItem icon="house" label="Beranda" to="/home" />
      {/* <NavItem icon="fire" label="Trending" />
      <NavItem icon="camera-video" label="Live" />
      <NavItem icon="bell" label="Notifikasi" /> */}
      <NavItem icon="person" label="Saya" to="/profile"/>
    </nav>
  );
};


const NavItem = ({ icon, label, to }) => (
  <Link to={to} className="text-center text-decoration-none">
    <i className={`bi bi-${icon} fs-5`} style={{ color: '#bfa76a' }}></i>
    <div style={{ fontSize: '12px', color: '#bfa76a' }}>{label}</div>
  </Link>
);

// const NavItem = ({ icon, label }) => (
//   <div className="text-center">
//     <i className={`bi bi-${icon} fs-5`} style={{ color: '#bfa76a' }}></i>
//     <div style={{ fontSize: '12px', color: '#bfa76a' }}>{label}</div>
//   </div>
// );

export default BottomNav;
