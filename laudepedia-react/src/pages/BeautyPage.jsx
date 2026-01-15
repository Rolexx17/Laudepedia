import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { getProcessedBeauty, animationSettings } from '../js/beauty';
import '../css/Beauty.css';

/**
 * BEAUTY CARD COMPONENT
 * Komponen reusable untuk menampilkan ringkasan informasi produk kecantikan.
 * * Props:
 * - item: Object - Data produk { id, name, price, img }.
 * - onClick: Function - Handler untuk navigasi ke detail produk.
 * - index: Number - Urutan item untuk menentukan delay animasi.
 * - isTrending: Boolean - Flag untuk mengubah layout menjadi horizontal scroll.
 */

const BeautyCard = ({ item, onClick, index, isTrending = false }) => (
  <div 
    className={`${isTrending ? 'me-3 flex-shrink-0' : 'col-6 col-md-3 mb-4'} reveal-item`} 
    style={{ ...animationSettings(index), width: isTrending ? '160px' : '' }}
    onClick={onClick}
  >
    <div className="card h-100 border-0 shadow-sm beauty-card-animated">
      <div className="beauty-img-container">
        <img src={item.img} className="card-img-top" alt={item.name} />
      </div>
      <div className="card-body p-2 p-md-3 text-center">
        <h6 className="card-title small text-truncate fw-bold">{item.name}</h6>
        <p className="fw-bold text-gold mb-0 small">{item.price}</p>
      </div>
    </div>
  </div>
);

const BeautyPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('default');

  const trendingBeauty = [
    { id: 'y1', name: 'Dior Forever Skin Glow', priceNum: 950000, price: 'Rp 950.000', img: '/resources/Y1.jpg' },
    { id: 'y2', name: 'Chanel Rouge Allure Velvet', priceNum: 720000, price: 'Rp 720.000', img: '/resources/Y2.jpg' },
    { id: 'y3', name: 'SK-II Facial Treatment Essence', priceNum: 2350000, price: 'Rp 2.350.000', img: '/resources/Y3.jpg' },
    { id: 'y4', name: 'Estée Lauder Advanced Night Repair', priceNum: 1850000, price: 'Rp 1.850.000', img: '/resources/Y4.jpg' },
    { id: 'y5', name: 'Rare Beauty Soft Pinch Blush', priceNum: 420000, price: 'Rp 420.000', img: '/resources/Y5.jpg' },
    { id: 'y6', name: 'YSL Libre Eau de Parfum', priceNum: 1750000, price: 'Rp 1.750.000', img: '/resources/Y6.jpg' },
  ];

  const recommendations = [
    { id: 'y7', name: 'Laneige Lip Sleeping Mask', priceNum: 320000, price: 'Rp 320.000', img: '/resources/Y7.jpg' },
    { id: 'y8', name: 'MAC Studio Fix Powder Plus', priceNum: 580000, price: 'Rp 580.000', img: '/resources/Y8.jpg' },
    { id: 'y9', name: 'Fenty Beauty Gloss Bomb', priceNum: 390000, price: 'Rp 390.000', img: '/resources/Y9.jpg' },
    { id: 'y10', name: 'NARS Radiant Creamy Concealer', priceNum: 520000, price: 'Rp 520.000', img: '/resources/Y10.jpg' },
    { id: 'y11', name: 'La Roche-Posay Effaclar Duo+', priceNum: 450000, price: 'Rp 450.000', img: '/resources/Y11.jpg' },
    { id: 'y12', name: 'The Ordinary Niacinamide 10%', priceNum: 180000, price: 'Rp 180.000', img: '/resources/Y12.jpg' },
    { id: 'y13', name: 'Drunk Elephant Protini Cream', priceNum: 1250000, price: 'Rp 1.250.000', img: '/resources/Y13.jpg' },
    { id: 'y14', name: 'Charlotte Tilbury Airbrush Powder', priceNum: 750000, price: 'Rp 750.000', img: '/resources/Y14.jpg' },
  ];

  const displayProducts = useMemo(() => 
    getProcessedBeauty([...trendingBeauty, ...recommendations], searchTerm, sortType),
    [searchTerm, sortType]
  );

  return (
    <>
      <Navbar />
      <div className="beauty-page">
        <section className="hero-section text-center py-5 bg-white reveal-item">
          <div className="container px-4">
            <h1 className="fw-bold text-gold display-6">Beauty Collection</h1>
            <p className="text-muted mb-4 small">Premium beauty & skincare essentials</p>

            <div className="row justify-content-center g-2">
              <div className="col-12 col-md-5">
                <input
                  type="text"
                  className="form-control form-control-lg beauty-input"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-3">
                <select 
                  className="form-select form-select-lg beauty-input"
                  onChange={(e) => setSortType(e.target.value)}
                >
                  <option value="default">Sort: Default</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <section className="content-area py-4 bg-light min-vh-100">
          <div className="container px-3">
            {searchTerm || sortType !== 'default' ? (
              <div className="row g-2 g-md-4">
                <h5 className="mb-3 px-2">Results ({displayProducts.length})</h5>
                {displayProducts.map((item, idx) => (
                  <BeautyCard key={item.id} item={item} index={idx} onClick={() => navigate(`/product/${item.id}`)} />
                ))}
              </div>
            ) : (
              <>
                <h4 className="fw-semibold text-gold mb-3 reveal-item">Trending Beauty</h4>
                <div className="d-flex flex-nowrap overflow-auto pb-4 custom-scroll mb-4">
                  {trendingBeauty.map((item, idx) => (
                    <BeautyCard key={item.id} item={item} index={idx} isTrending onClick={() => navigate(`/product/${item.id}`)} />
                  ))}
                </div>

                <h4 className="fw-semibold text-gold mb-3 text-center reveal-item">For You</h4>
                <div className="row g-2 g-md-4">
                  {recommendations.map((item, idx) => (
                    <BeautyCard key={item.id} item={item} index={idx} onClick={() => navigate(`/product/${item.id}`)} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <footer className="text-center py-4 bg-white border-top">
          <p className="mb-0 text-muted small">© 2025 Laudepedia Beauty.</p>
        </footer>
      </div>
      <BottomNav />
    </>
  );
};

export default BeautyPage;