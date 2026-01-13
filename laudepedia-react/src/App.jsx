import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layout
import MainLayout from './layouts/MainLayout';

// Pages
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import GamePage from './pages/GamePage';
import FashionPage from './pages/FashionPage';
import BeautyPage from './pages/BeautyPage';
import TechPage from './pages/TechPage';
import ProductDetail from './pages/ProductDetail';
import AboutUsPage from './pages/AboutUsPage';

/**
 * 1. PROTECTED ROUTE:
 * Mencegah akses ke halaman internal (Home, Profile, dll) jika belum login.
 */
const ProtectedRoute = ({ children }) => {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

/**
 * 2. PUBLIC ROUTE:
 * Mencegah user yang SUDAH LOGIN untuk kembali ke halaman Register/Login.
 * Jika mereka mencoba ke sana, akan otomatis dilempar ke /home.
 */
const PublicRoute = ({ children }) => {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          
          {/* === ROUTE PUBLIK KHUSUS (Gak bisa diakses kalau sudah login) === */}
          <Route path="/" element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />

          {/* === ROUTE UMUM === */}
          <Route path="/about" element={<AboutUsPage />} />

          {/* === ROUTE TERPROTEKSI (Harus login dulu) === */}
          <Route path="/home" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          
          <Route path="/game" element={
            <ProtectedRoute>
              <GamePage />
            </ProtectedRoute>
          } />
          
          <Route path="/fashion" element={
            <ProtectedRoute>
              <FashionPage />
            </ProtectedRoute>
          } />
          
          <Route path="/beauty" element={
            <ProtectedRoute>
              <BeautyPage />
            </ProtectedRoute>
          } />
          
          <Route path="/tech" element={
            <ProtectedRoute>
              <TechPage />
            </ProtectedRoute>
          } />
          
          <Route path="/product/:id" element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          } />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;