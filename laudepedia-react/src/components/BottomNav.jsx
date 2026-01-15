import React from 'react';
import { Link } from 'react-router-dom';

/**
 * BOTTOM NAVIGATION COMPONENT
 * Bar navigasi bawah yang dirancang khusus untuk tampilan perangkat seluler (Mobile-first).
 * * * * Components:
 * * 1. BottomNav (Parent)
 * - Kontainer utama yang diposisikan secara absolut di bagian bawah layar.
 * - Variables:
 * - className: String - Bootstrap classes (position-fixed, bottom-0) untuk menahan navigasi di dasar layar.
 * - style (zIndex): Number - Memastikan bar navigasi tetap berada di atas konten halaman lainnya.
 * * 2. NavItem (Child)
 * - Komponen reusable untuk setiap tombol navigasi.
 * - Props:
 * - icon: String - Nama ikon Bootstrap Icons (misal: 'house', 'person').
 * - label: String - Teks keterangan di bawah ikon.
 * - to: String - Alamat URL tujuan navigasi menggunakan React Router Link.
 * * * * Visual Logic:
 * - Menggunakan Flexbox (justify-content-around) untuk membagi ruang tombol secara merata.
 * - Warna tema: #bfa76a (Gold/Elegance) diterapkan pada ikon dan teks.
 */

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
