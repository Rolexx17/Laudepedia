import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

/* ================= REUSABLE SEARCH CARD (GRID STYLE) ================= */
const SearchResultCard = ({ item, onClick }) => {
  return (
    <div className="col-6 col-md-3 mb-4">
      <div
        className="card h-100 shadow-sm border-0"
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      >
        <div style={{ height: '180px', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
          <img 
            src={item.image} 
            className="card-img-top" 
            alt={item.name} 
            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '10px' }} 
          />
        </div>
        <div className="card-body">
          <h6 className="card-title text-truncate small fw-bold">{item.name}</h6>
          <p className="fw-bold text-gold mb-0">
            Rp {item.price.toLocaleString('id-ID')}
          </p>
        </div>
      </div>
    </div>
  );
};

const TechPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('default'); // State untuk Sorting

  // 1. Ambil semua produk kategori tech
  const techProducts = products.filter(item => item.category === 'tech');

  // 2. Filter produk berdasarkan pencarian
  const filteredSearch = techProducts.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 3. Logika Sorting
  const getSortedProducts = (data) => {
    let sortedData = [...data];
    if (sortType === 'low') {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high') {
      sortedData.sort((a, b) => b.price - a.price);
    }
    return sortedData;
  };

  const displayProducts = getSortedProducts(filteredSearch);

  // Data untuk tampilan awal (Default)
  const trendingTech = techProducts.slice(0, 6);
  const recommendations = techProducts.slice(6, 14);

  const brands = [
    'APPLE', 'SAMSUNG', 'SONY', 'ASUS', 'LENOVO',
    'DELL', 'HP', 'LOGITECH', 'RAZER',
    'XIAOMI', 'INTEL', 'NVIDIA'
  ];

  return (
    <>
      <Navbar />
      
      <div className="tech-page" style={{ paddingBottom: '80px' }}>

        {/* ================= HERO, SEARCH & SORT ================= */}
        <section className="hero-section text-center py-5">
          <div className="container">
            <h1 className="fw-bold text-gold">Tech Collection</h1>
            <p className="text-muted">Discover the latest technology and innovation</p>
            
            <div className="row justify-content-center mt-4 g-2">
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control form-control-lg shadow-sm"
                  placeholder="Search gadgets, laptops, or accessories..."
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
                {searchTerm ? `Results for: "${searchTerm}"` : "All Tech Products"}
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
                  <h5 className="text-muted">No tech products found.</h5>
                </div>
              )}
            </div>
          </section>
        ) : (
          /* ================= TAMPILAN DEFAULT ================= */
          <>
            <section className="trending py-5 bg-light">
              <div className="container">
                <h2 className="fw-semibold text-gold mb-3">Trending Tech</h2>
                <div className="d-flex flex-nowrap overflow-auto pb-3">
                  {trendingTech.map(item => (
                    <div
                      key={item.id}
                      className="card me-3 flex-shrink-0 shadow-sm"
                      style={{ width: '180px', cursor: 'pointer' }}
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      <div style={{ height: '150px', overflow: 'hidden', padding: '10px' }}>
                        <img 
                          src={item.image} 
                          className="card-img-top h-100 w-100" 
                          alt={item.name} 
                          style={{ objectFit: 'contain' }} 
                        />
                      </div>
                      <div className="card-body text-center">
                        <h6 className="card-title small text-truncate">{item.name}</h6>
                        <p className="fw-bold text-gold mb-0">
                          Rp {item.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="brands py-5">
              <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="fw-semibold text-gold mb-0">Top Tech Brands</h2>
                  <span className="text-gold small" style={{ cursor: 'pointer' }}>See All →</span>
                </div>
                <div className="d-flex flex-nowrap overflow-auto pb-3">
                  {brands.map((brand, index) => (
                    <div
                      key={index}
                      className="text-center p-4 me-3 rounded bg-light border flex-shrink-0"
                      style={{ minWidth: '120px', fontWeight: 'bold', fontSize: '0.9rem' }}
                    >
                      {brand}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="recommendations py-5 bg-light">
              <div className="container">
                <h2 className="text-center mb-4 fw-semibold text-gold">Recommended for You</h2>
                <div className="row">
                  {recommendations.map(item => (
                    <div key={item.id} className="col-6 col-md-3 mb-4">
                      <div
                        className="card h-100 border-0 shadow-sm"
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        <div style={{ height: '200px', padding: '15px' }}>
                          <img src={item.image} className="card-img-top h-100 w-100" alt={item.name} style={{ objectFit: 'contain' }} />
                        </div>
                        <div className="card-body">
                          <h6 className="card-title small fw-bold">{item.name}</h6>
                          <p className="fw-bold text-gold mb-0">
                            Rp {item.price.toLocaleString('id-ID')}
                          </p>
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
          <p className="mb-0 text-muted">© 2025 Laudepedia Tech. All Rights Reserved.</p>
        </footer>
      </div>
      <BottomNav />
    </>
  );
};

export default TechPage;