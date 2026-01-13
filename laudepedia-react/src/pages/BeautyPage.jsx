import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

/* ================= REUSABLE CARD (SAMA SEPERTI SEBELUMNYA) ================= */
const TrendingProductCard = ({ item, onClick }) => (
  <div className="card me-3 flex-shrink-0" style={{ width: '180px', cursor: 'pointer' }} onClick={onClick}>
    <div style={{ height: '180px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
    <div className="card-body text-center">
      <h6 className="card-title small">{item.name}</h6>
      <p className="fw-bold text-gold mb-0">{item.price}</p>
    </div>
  </div>
);

const SearchResultCard = ({ item, onClick }) => (
  <div className="col-6 col-md-3 mb-4">
    <div className="card h-100 shadow-sm border-0" style={{ cursor: 'pointer' }} onClick={onClick}>
      <div style={{ height: '200px', overflow: 'hidden' }}>
        <img src={item.img} className="card-img-top" alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div className="card-body">
        <h6 className="card-title text-truncate">{item.name}</h6>
        <p className="fw-bold text-gold mb-0">{item.price}</p>
      </div>
    </div>
  </div>
);

const BeautyPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('default'); // State untuk Sorting

  /* ================= DATA SUMBER ================= */
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

  const brands = ['DIOR', 'CHANEL', 'YSL', 'RARE BEAUTY', 'SK-II', 'ESTÉE LAUDER', 'LANEIGE', 'MAC', 'FENTY BEAUTY', 'NARS'];

  /* ================= LOGIKA SEARCH & SORT ================= */
  const allProducts = [...trendingBeauty, ...recommendations];

  const getProcessedProducts = () => {
    // 1. Filter dulu berdasarkan search
    let filtered = allProducts.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 2. Kemudian Sort berdasarkan pilihan
    if (sortType === 'low') {
      filtered.sort((a, b) => a.priceNum - b.priceNum);
    } else if (sortType === 'high') {
      filtered.sort((a, b) => b.priceNum - a.priceNum);
    }
    return filtered;
  };

  const displayProducts = getProcessedProducts();

  return (
    <>
      <Navbar />
      <div className="beauty-page">
        {/* ================= HERO & SEARCH & SORT ================= */}
        <section className="hero-section text-center py-5 bg-white">
          <div className="container">
            <h1 className="fw-bold text-gold">Beauty Collection</h1>
            <p className="text-muted mb-4">Discover premium beauty & skincare essentials</p>

            <div className="row justify-content-center g-2">
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control form-control-lg border-2 shadow-sm"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ borderRadius: '30px' }}
                />
              </div>
              <div className="col-md-2">
                <select 
                  className="form-select form-select-lg border-2 shadow-sm"
                  style={{ borderRadius: '30px', fontSize: '1rem', cursor: 'pointer' }}
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

        {/* ================= HASIL SEARCH / SORT ================= */}
        {searchTerm || sortType !== 'default' ? (
          <section className="search-results py-5 bg-light min-vh-100">
            <div className="container">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>
                  {searchTerm ? `Results for "${searchTerm}"` : 'All Products'}
                </h3>
                <span className="badge bg-gold text-dark p-2">Total: {displayProducts.length} items</span>
              </div>
              
              <div className="row">
                {displayProducts.length > 0 ? (
                  displayProducts.map((item) => (
                    <SearchResultCard key={item.id} item={item} onClick={() => navigate(`/product/${item.id}`)} />
                  ))
                ) : (
                  <div className="text-center py-5 w-100">
                    <h5 className="text-muted">No products found.</h5>
                  </div>
                )}
              </div>
            </div>
          </section>
        ) : (
          /* ================= TAMPILAN NORMAL ================= */
          <>
            <section className="trending py-5 bg-light">
              <div className="container">
                <h2 className="fw-semibold text-gold mb-3">Trending Beauty</h2>
                <div className="d-flex flex-nowrap overflow-auto pb-3">
                  {trendingBeauty.map((item) => (
                    <TrendingProductCard key={item.id} item={item} onClick={() => navigate(`/product/${item.id}`)} />
                  ))}
                </div>
              </div>
            </section>

            <section className="brands py-5">
              <div className="container">
                <h2 className="fw-semibold text-gold mb-3">Top Beauty Brands</h2>
                <div className="d-flex flex-nowrap overflow-auto pb-3">
                  {brands.map((brand, index) => (
                    <div key={index} className="text-center p-4 me-3 rounded bg-light border flex-shrink-0" style={{ minWidth: '120px' }}>{brand}</div>
                  ))}
                </div>
              </div>
            </section>

            <section className="recommendations py-5 bg-light">
              <div className="container">
                <h2 className="text-center mb-4 fw-semibold text-gold">Recommended for You</h2>
                <div className="row">
                  {recommendations.map((item) => (
                    <div key={item.id} className="col-6 col-md-3 mb-4">
                      <div className="card h-100 border-0 shadow-sm" style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${item.id}`)}>
                        <img src={item.img} className="card-img-top" alt={item.name} />
                        <div className="card-body">
                          <h6 className="card-title">{item.name}</h6>
                          <p className="fw-bold text-gold">{item.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        <footer className="text-center py-4 bg-white border-top">
          <p className="mb-0 text-muted">© 2025 Laudepedia Beauty. All Rights Reserved.</p>
        </footer>
      </div>
      <BottomNav />
    </>
  );
};

export default BeautyPage;