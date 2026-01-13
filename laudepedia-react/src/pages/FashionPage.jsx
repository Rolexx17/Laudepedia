import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

/* ================= REUSABLE SEARCH CARD ================= */
const SearchResultCard = ({ item, onClick }) => {
  return (
    <div className="col-6 col-md-3 mb-4">
      <div
        className="card h-100 shadow-sm border-0"
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      >
        <div style={{ height: '220px', overflow: 'hidden' }}>
          <img 
            src={item.img} 
            className="card-img-top" 
            alt={item.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
        <div className="card-body">
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
  const [sortType, setSortType] = useState('default'); // State untuk Sorting

  /* ================= DATA TRENDING (Ditambah priceNum) ================= */
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

  const stores = ['GAUDI', 'HUGO', 'LOONY', 'EXIT', 'MONOGRAM', 'NEWWAVE', 'LAUFE', 'PHOEBES', 'ZASTIN', 'CHOMA', 'SIXSEVEN', 'SILENE'];

  /* ================= DATA RECOMMENDATION (Ditambah priceNum) ================= */
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

  /* ================= LOGIKA SEARCH & SORT ================= */
  const allProducts = [...trendingFashion, ...recommendations];

  const getProcessedProducts = () => {
    // 1. Filter Search
    let filtered = allProducts.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 2. Sort Logic
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
      <div className="fashion-page" style={{ paddingBottom: '80px' }}>
        
        {/* ================= HERO, SEARCH & SORT ================= */}
        <section className="hero-section text-center py-5">
          <div className="container">
            <h1 className="fw-bold text-gold">Fashion Collection</h1>
            <p className="text-muted">Stay trendy this season with our monthly picks</p>
            
            <div className="row justify-content-center mt-4 g-2">
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control form-control-lg shadow-sm"
                  placeholder="Search jackets, dresses, bags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ borderRadius: '30px', border: '2px solid #D4AF37' }}
                />
              </div>
              <div className="col-md-2">
                <select 
                  className="form-select form-select-lg shadow-sm"
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                  style={{ borderRadius: '30px', border: '2px solid #D4AF37', fontSize: '1rem' }}
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
          /* ================= TAMPILAN HASIL SEARCH / SORT ================= */
          <section className="search-results py-5 bg-light min-vh-100">
            <div className="container">
              <h3 className="mb-4">
                {searchTerm ? `Results for: "${searchTerm}"` : "All Fashion Items"}
              </h3>
              {displayProducts.length > 0 ? (
                <div className="row">
                  {displayProducts.map((item) => (
                    <SearchResultCard 
                      key={item.id} 
                      item={item} 
                      onClick={() => navigate(`/product/${item.id}`)} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-5">
                  <p className="text-muted">No items found.</p>
                </div>
              )}
            </div>
          </section>
        ) : (
          /* ================= TAMPILAN DEFAULT ================= */
          <>
            <section className="trending py-5 bg-light">
              <div className="container">
                <h2 className="fw-semibold text-gold mb-3">Trending Fashion</h2>
                <div className="d-flex flex-nowrap overflow-auto pb-3">
                  {trendingFashion.map((item) => (
                    <div
                      key={item.id}
                      className="card me-3 flex-shrink-0"
                      style={{ width: '180px', cursor: 'pointer' }}
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      <div style={{ height: '180px', overflow: 'hidden' }}>
                        <img src={item.img} className="card-img-top h-100 w-100" alt={item.name} style={{ objectFit: 'cover' }} />
                      </div>
                      <div className="card-body">
                        <h6 className="card-title small text-truncate">{item.name}</h6>
                        <p className="fw-bold text-gold mb-0">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="stores py-5">
              <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="fw-semibold text-gold mb-0">Popular Stores</h2>
                  <span className="text-gold small" style={{ cursor: 'pointer' }}>See All →</span>
                </div>
                <div className="d-flex flex-nowrap overflow-auto pb-3">
                  {stores.map((store, index) => (
                    <div key={index} className="text-center p-4 me-3 rounded bg-light border flex-shrink-0" style={{ minWidth: '120px', fontWeight: '500' }}>
                      {store}
                    </div>
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
                        <div style={{ height: '250px', overflow: 'hidden' }}>
                          <img src={item.img} className="card-img-top h-100 w-100" alt={item.name} style={{ objectFit: 'cover' }} />
                        </div>
                        <div className="card-body">
                          <h6 className="card-title small fw-bold">{item.name}</h6>
                          <p className="fw-bold text-gold mb-0">{item.price}</p>
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
          <p className="mb-0 text-muted">© 2025 Laudepedia Fashion. All Rights Reserved.</p>
        </footer>
      </div>
      <BottomNav />
    </>
  );
};

export default FashionPage;