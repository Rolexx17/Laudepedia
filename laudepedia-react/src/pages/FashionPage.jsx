import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { filterAndSortProducts, getStaggerDelay } from '../js/fashion';
import '../css/Fashion.css';

/**
 * SEARCH RESULT CARD COMPONENT
 * Komponen kartu produk individual yang digunakan dalam grid hasil pencarian dan rekomendasi.
 * * Props:
 * - item: Object - Data produk { id, name, price, img }.
 * - onClick: Function - Navigasi ke halaman detail produk.
 * - index: Number - Digunakan untuk menghitung delay animasi stagger.
 */

const SearchResultCard = ({ item, onClick, index }) => {
  return (
    <div className="col-6 col-md-3 mb-4 reveal-item" style={getStaggerDelay(index)}>
      <div className="card h-100 shadow-sm border-0 product-card-animated" onClick={onClick}>
        <div className="img-wrapper">
          <img src={item.img} className="card-img-top" alt={item.name} />
        </div>
        <div className="card-body p-2 p-md-3">
          <h6 className="card-title text-truncate small fw-bold">{item.name}</h6>
          <p className="fw-bold text-gold mb-0">{item.price}</p>
        </div>
      </div>
    </div>
  );
};

const FashionPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('default');

  const trendingFashion = [
    { id: 'b1', name: 'EDWIN Classic Faded Denim Jacket', priceNum: 1200000, price: 'Rp 1.200.000', img: '/resources/B1.jpg' },
    { id: 'b2', name: 'Abstract Teal Oversized Knit Sweater', priceNum: 950000, price: 'Rp 950.000', img: '/resources/B2.jpg' },
    { id: 'b3', name: 'Virgil Abloh™ Black Varsity Jacket', priceNum: 2500000, price: 'Rp 2.500.000', img: '/resources/B3.jpg' },
    { id: 'b4', name: 'Dark Denim Jacket with Faux Fur Lining', priceNum: 1800000, price: 'Rp 1.800.000', img: '/resources/B4.jpg' },
    { id: 'b5', name: 'Street Graphic Black Long-Sleeve Tee', priceNum: 600000, price: 'Rp 600.000', img: '/resources/B5.jpg' },
    { id: 'b6', name: 'Stüssy Cream Knit Logo Vest', priceNum: 1400000, price: 'Rp 1.400.000', img: '/resources/B6.jpg' },
    { id: 'b7', name: 'Romantic Floral Cropped Top', priceNum: 500000, price: 'Rp 500.000', img: '/resources/B7.jpg' },
    { id: 'b8', name: 'Vintage White Lace Dress', priceNum: 1700000, price: 'Rp 1.700.000', img: '/resources/B8.jpg' },
  ];

  const recommendations = [
    { id: 'b9', name: 'White Puff-Sleeve Ribbon Mini Dress', priceNum: 550000, price: 'Rp 550.000', img: '/resources/B9.jpg' },
    { id: 'b10', name: 'Gothic Cross Halter Crop', priceNum: 226000, price: 'Rp 226.000', img: '/resources/B10.jpg' },
    { id: 'c1', name: 'Pinstripe Tailored Shorts', priceNum: 159000, price: 'Rp 159.000', img: '/resources/C1.jpg' },
    { id: 'c2', name: 'Black Denim Graphic Shorts', priceNum: 115000, price: 'Rp 115.000', img: '/resources/C2.jpg' },
    { id: 'c3', name: 'Classic Blue Denim Mini Skirt', priceNum: 96000, price: 'Rp 96.000', img: '/resources/C3.jpg' },
    { id: 's1', name: 'Double Monk Strap Shoes', priceNum: 350000, price: 'Rp 350.000', img: '/resources/S1.jpg' },
    { id: 't1', name: 'Urban Leather Shoulder Bag', priceNum: 125000, price: 'Rp 125.000', img: '/resources/T1.jpg' },
    { id: 't2', name: 'Coach Vintage Handbag', priceNum: 180000, price: 'Rp 180.000', img: '/resources/T2.jpg' },
  ];

  const displayProducts = useMemo(() => 
    filterAndSortProducts([...trendingFashion, ...recommendations], searchTerm, sortType),
    [searchTerm, sortType]
  );

  return (
    <>
      <Navbar />
      <div className="fashion-page">
        <section className="hero-section text-center py-5 reveal-item">
          <div className="container">
            <h1 className="fw-bold text-gold hero-title">Fashion Collection</h1>
            <p className="text-muted hero-subtitle">Stay trendy this season with our monthly picks</p>
            
            <div className="row justify-content-center mt-4 g-2 px-3">
              <div className="col-12 col-md-5">
                <input
                  type="text"
                  className="form-control form-control-lg search-input-animated"
                  placeholder="Search jackets, dresses, bags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-2">
                <select 
                  className="form-select form-select-lg sort-select-animated"
                  value={sortType}
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

        {searchTerm || sortType !== 'default' ? (
          <section className="search-results py-4 bg-light min-vh-100">
            <div className="container">
              <h3 className="mb-4 px-2">
                {searchTerm ? `Results for: "${searchTerm}"` : "All Fashion Items"}
              </h3>
              <div className="row g-2 g-md-4">
                {displayProducts.map((item, index) => (
                  <SearchResultCard key={item.id} item={item} index={index} onClick={() => navigate(`/product/${item.id}`)} />
                ))}
              </div>
            </div>
          </section>
        ) : (
          <>
            <section className="trending py-5 bg-light">
              <div className="container px-3">
                <h2 className="fw-semibold text-gold mb-3 reveal-item">Trending Fashion</h2>
                <div className="d-flex flex-nowrap overflow-auto pb-3 custom-scrollbar">
                  {trendingFashion.map((item, index) => (
                    <div
                      key={item.id}
                      className="card me-3 flex-shrink-0 product-card-animated reveal-item"
                      style={{ ...getStaggerDelay(index), width: '180px' }}
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      <div className="img-wrapper" style={{ height: '180px' }}>
                        <img src={item.img} className="card-img-top" alt={item.name} />
                      </div>
                      <div className="card-body p-2">
                        <h6 className="card-title small text-truncate">{item.name}</h6>
                        <p className="fw-bold text-gold mb-0">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="recommendations py-5 bg-light">
              <div className="container px-3">
                <h2 className="text-center mb-4 fw-semibold text-gold reveal-item">Recommended for You</h2>
                <div className="row g-2 g-md-4">
                  {recommendations.map((item, index) => (
                    <SearchResultCard key={item.id} item={item} index={index} onClick={() => navigate(`/product/${item.id}`)} />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        <footer className="text-center py-4 bg-white border-top">
          <p className="mb-0 text-muted">© 2025 Laudepedia Fashion.</p>
        </footer>
      </div>
      <BottomNav />
    </>
  );
};

export default FashionPage;