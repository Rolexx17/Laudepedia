import React from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../js/products';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { useTechLogic } from '../js/tech'; // Import logic
import '../css/Tech.css'; // Import animasi

const SearchResultCard = ({ item, onClick, index }) => {
  return (
    <div className="col-6 col-md-3 mb-4 animate-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div
        className="card h-100 shadow-sm border-0 tech-card-hover"
        style={{ cursor: 'pointer', borderRadius: '15px' }}
        onClick={onClick}
      >
        <div style={{ height: '180px', overflow: 'hidden', backgroundColor: '#f8f9fa', borderRadius: '15px 15px 0 0' }}>
          <img 
            src={item.image} 
            className="card-img-top" 
            alt={item.name} 
            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '15px' }} 
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
  const {
    searchTerm, setSearchTerm,
    sortType, setSortType,
    displayProducts, trendingTech, recommendations
  } = useTechLogic(products);

  return (
    <>
      <Navbar />
      <div className="tech-page" style={{ paddingBottom: '80px', paddingTop: '100px' }}>
        
        <section className="hero-section text-center py-5 animate-card">
          <div className="container">
            <h1 className="fw-bold text-gold mb-2">Tech Collection</h1>
            <p className="text-muted px-3">Discover the latest technology and innovation</p>
            
            <div className="row justify-content-center mt-4 g-2 px-3">
              <div className="col-12 col-md-5">
                <input
                  type="text"
                  className="form-control form-control-lg shadow-sm"
                  placeholder="Search gadgets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ borderRadius: '30px', border: '2px solid #D4AF37', fontSize: '0.9rem' }}
                />
              </div>
              <div className="col-12 col-md-2">
                <select 
                  className="form-select form-select-lg shadow-sm"
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                  style={{ borderRadius: '30px', border: '2px solid #D4AF37', fontSize: '0.9rem' }}
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
          <section className="search-results py-5 bg-light min-vh-100">
            <div className="container">
              <h3 className="mb-4 px-2">
                {searchTerm ? `Results for: "${searchTerm}"` : "All Tech Products"}
              </h3>
              {displayProducts.length > 0 ? (
                <div className="row g-3 px-2">
                  {displayProducts.map((item, index) => (
                    <SearchResultCard 
                      key={item.id} 
                      item={item} 
                      index={index}
                      onClick={() => navigate(`/product/${item.id}`)} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-5 animate-card">
                  <h5 className="text-muted">No tech products found.</h5>
                </div>
              )}
            </div>
          </section>
        ) : (
          <>
            <section className="trending py-5 bg-light">
              <div className="container">
                <h2 className="fw-semibold text-gold mb-3 px-2">Trending Tech</h2>
                <div className="d-flex flex-nowrap overflow-auto pb-3 px-2">
                  {trendingTech.map((item, index) => (
                    <div
                      key={item.id}
                      className="card me-3 flex-shrink-0 shadow-sm tech-card-hover animate-card"
                      style={{ width: '160px', cursor: 'pointer', borderRadius: '12px', animationDelay: `${index * 0.1}s` }}
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      <div style={{ height: '140px', overflow: 'hidden', padding: '10px' }}>
                        <img src={item.image} className="card-img-top h-100 w-100" alt={item.name} style={{ objectFit: 'contain' }} />
                      </div>
                      <div className="card-body text-center p-2 pb-3">
                        <h6 className="card-title small text-truncate mb-1">{item.name}</h6>
                        <p className="fw-bold text-gold mb-0 small">Rp {item.price.toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="recommendations py-5 bg-light">
              <div className="container">
                <h2 className="text-center mb-4 fw-semibold text-gold">Recommended for You</h2>
                <div className="row g-3 px-2">
                  {recommendations.map((item, index) => (
                    <div key={item.id} className="col-6 col-md-3 mb-4 animate-card" style={{ animationDelay: `${index * 0.05}s` }}>
                      <div className="card h-100 border-0 shadow-sm tech-card-hover" style={{ cursor: 'pointer', borderRadius: '15px' }} onClick={() => navigate(`/product/${item.id}`)}>
                        <div style={{ height: '180px', padding: '15px' }}>
                          <img src={item.image} className="card-img-top h-100 w-100" alt={item.name} style={{ objectFit: 'contain' }} />
                        </div>
                        <div className="card-body">
                          <h6 className="card-title small fw-bold text-truncate">{item.name}</h6>
                          <p className="fw-bold text-gold mb-0">Rp {item.price.toLocaleString('id-ID')}</p>
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
          <p className="mb-0 text-muted small">© 2025 Laudepedia Tech. All Rights Reserved.</p>
        </footer>
      </div>
      <BottomNav />
    </>
  );
};

export default TechPage;