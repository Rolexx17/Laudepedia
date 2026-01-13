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
import ViewCart from './pages/ViewCart'; // Kita gunakan ini sebagai halaman keranjang

const ProtectedRoute = ({ children }) => {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

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
          
          {/* === PUBLIC ROUTES === */}
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
          <Route path="/about" element={<AboutUsPage />} />

          {/* === PROTECTED ROUTES === */}
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
          
          {/* Detail Produk - Cukup satu rute saja */}
          <Route path="/product/:id" element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          } />

          {/* HALAMAN KERANJANG - Pastikan path ini sesuai dengan navigate('/cart') di ProductDetail */}
          <Route path="/cart" element={
            <ProtectedRoute>
              <ViewCart />
            </ProtectedRoute>
          } />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;