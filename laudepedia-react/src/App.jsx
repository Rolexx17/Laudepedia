import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/fashion" element={<FashionPage />} />
          <Route path="/beauty" element={<BeautyPage />} />
          <Route path="/tech" element={<TechPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<AboutUsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
