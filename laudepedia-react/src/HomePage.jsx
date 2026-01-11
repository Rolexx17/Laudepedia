import React from 'react';
import './css/Fashion.css';

const HomePage = ({ onProductClick, onCategoryClick }) => {
  // Fungsi untuk fitur yang belum diimplementasikan
  const handleAlert = (e) => {
    e.preventDefault();
    alert('Coming Soon!');
  };

  return (
    <div className="home-page" style={{ paddingBottom: '80px' }}>
      {/* 1. HEADER & SEARCH BAR */}
      <header className="p-3 d-flex align-items-center justify-content-between sticky-top" style={{ backgroundColor: '#bfa76a', zIndex: 1000 }}>
        <div className="input-group w-75 shadow-sm">
          <span className="input-group-text border-0 bg-white">
            <i className="bi bi-search" style={{ color: '#bfa76a' }}></i>
          </span>
          <input type="text" className="form-control border-0" placeholder="Cari di Laudepedia..." />
        </div>
        <i className="bi bi-cart-fill ms-3 text-white fs-4" style={{ cursor: 'pointer' }} onClick={handleAlert}></i>
      </header>

      {/* 2. FEATURE ICONS (VIP, Games, Fashion, dll) */}
      <section className="bg-light py-3 border-bottom overflow-auto">
  <div className="d-flex justify-content-start px-3 gap-4 flex-nowrap text-center">
    {/* VIP - Masih Alert */}
    <div className="feature-item" onClick={handleAlert} style={{ cursor: 'pointer', minWidth: '60px' }}>
      <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-1 shadow-sm" style={{ width: '50px', height: '50px', backgroundColor: '#fcf4e0', border: '1px solid #bfa76a' }}>
        <i className="bi bi-stars fs-4" style={{ color: '#bfa76a' }}></i>
      </div>
      <span style={{ fontSize: '12px', fontWeight: '500' }}>VIP</span>
    </div>

    {/* GAMES - Masih Alert */}
    <div className="feature-item" onClick={handleAlert} style={{ cursor: 'pointer', minWidth: '60px' }}>
      <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-1 shadow-sm" style={{ width: '50px', height: '50px', backgroundColor: '#fcf4e0', border: '1px solid #bfa76a' }}>
        <i className="bi bi-controller fs-4" style={{ color: '#bfa76a' }}></i>
      </div>
      <span style={{ fontSize: '12px', fontWeight: '500' }}>Games</span>
    </div>

    {/* FASHION - Terhubung ke FashionPage */}
    <div className="feature-item" onClick={() => onCategoryClick('fashion')} style={{ cursor: 'pointer', minWidth: '60px' }}>
      <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-1 shadow-sm" style={{ width: '50px', height: '50px', backgroundColor: '#fcf4e0', border: '1px solid #bfa76a' }}>
        <i className="bi bi-bag-heart fs-4" style={{ color: '#bfa76a' }}></i>
      </div>
      <span style={{ fontSize: '12px', fontWeight: '500' }}>Fashion</span>
    </div>

    {/* BEAUTY - Terhubung ke BeautyPage */}
    <div className="feature-item" onClick={() => onCategoryClick('beauty')} style={{ cursor: 'pointer', minWidth: '60px' }}>
      <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-1 shadow-sm" style={{ width: '50px', height: '50px', backgroundColor: '#fcf4e0', border: '1px solid #bfa76a' }}>
        <i className="bi bi-magic fs-4" style={{ color: '#bfa76a' }}></i>
      </div>
      <span style={{ fontSize: '12px', fontWeight: '500' }}>Beauty</span>
    </div>
    
    {/* TECH - Terhubung ke TechPage */}
    <div className="feature-item" onClick={() => onCategoryClick('tech')} style={{ cursor: 'pointer', minWidth: '60px' }}>
      <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-1 shadow-sm" style={{ width: '50px', height: '50px', backgroundColor: '#fcf4e0', border: '1px solid #bfa76a' }}>
        <i className="bi bi-cpu fs-4" style={{ color: '#bfa76a' }}></i>
      </div>
      <span style={{ fontSize: '12px', fontWeight: '500' }}>Tech</span>
    </div>

    {/* MORE - Masih Alert */}
    <div className="feature-item" onClick={handleAlert} style={{ cursor: 'pointer', minWidth: '60px' }}>
      <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-1 shadow-sm" style={{ width: '50px', height: '50px', backgroundColor: '#fcf4e0', border: '1px solid #bfa76a' }}>
        <i className="bi bi-grid fs-4" style={{ color: '#bfa76a' }}></i>
      </div>
      <span style={{ fontSize: '12px', fontWeight: '500' }}>More</span>
    </div>
  </div>
</section>



      {/* 3. BANNER PROMOSI (Horizontal Scroll) */}
      <section className="banner-scroll py-3 overflow-auto">
        <div className="d-flex px-3 gap-3 flex-nowrap">
          <img src="resources/128453e1-1e18-4c8f-b631-713a198eec59.jpg" className="rounded-4 shadow-sm" style={{ width: '280px', height: '140px', objectFit: 'cover' }} alt="B1" />
          <img src="resources/16ac2a31-1777-4bb4-be25-b752342d9e8c.jpg" className="rounded-4 shadow-sm" style={{ width: '280px', height: '140px', objectFit: 'cover' }} alt="B2" />
          <img src="resources/832817ec-0a21-4b18-a15c-befa0921fe77.jpg" className="rounded-4 shadow-sm" style={{ width: '280px', height: '140px', objectFit: 'cover' }} alt="B3" />
        </div>
      </section>

      {/* 4. LAUDEVIDEO SECTION */}
      <section className="container my-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="fw-bold mb-0" style={{ color: '#bfa76a' }}>LaudeVideo</h5>
          <span className="text-muted small" style={{ cursor: 'pointer' }} onClick={handleAlert}>See All →</span>
        </div>
        <div className="row g-2">
          <div className="col-6">
            <video src="resources/Oakley_-_Just_dropped_Oakley_Meta_Vanguard._These_new_Performance_AI_glasses_..._268NR0.mp4" className="w-100 rounded-4 shadow-sm" autoPlay muted loop style={{ height: '220px', objectFit: 'cover' }}></video>
          </div>
          <div className="col-6">
            <video src="resources/New_Balance_-_Josh_Allen_Professional_QB1._JoshAllenQB_FBFpeG.mp4" className="w-100 rounded-4 shadow-sm" autoPlay muted loop style={{ height: '220px', objectFit: 'cover' }}></video>
          </div>
        </div>
      </section>

      {/* 5. PRODUK PILIHAN (GRID DISPLAY) */}
      <section className="container my-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0" style={{ color: '#bfa76a' }}>Produk Pilihan</h5>
          <span className="text-muted small" style={{ cursor: 'pointer' }} onClick={handleAlert}>See All →</span>
        </div>

        <div className="row row-cols-2 row-cols-md-4 g-3">
          {/* Card B9 */}
          <div className="col" onClick={() => onProductClick('B9')} style={{ cursor: 'pointer' }}>
            <div className="card h-100 border-0 rounded-4 shadow-sm overflow-hidden">
              <img src="resources/B9.jpg" className="card-img-top" alt="B9" style={{ height: '180px', objectFit: 'cover' }} />
              <div className="p-2 text-center text-white fw-bold" style={{ backgroundColor: '#bfa76a' }}>Rp 550.000</div>
            </div>
          </div>

          {/* Card T2 */}
          <div className="col" onClick={() => onProductClick('T2')} style={{ cursor: 'pointer' }}>
            <div className="card h-100 border-0 rounded-4 shadow-sm overflow-hidden">
              <img src="resources/T2.jpg" className="card-img-top" alt="T2" style={{ height: '180px', objectFit: 'cover' }} />
              <div className="p-2 text-center text-white fw-bold" style={{ backgroundColor: '#bfa76a' }}>Rp 180.000</div>
            </div>
          </div>

          {/* Card B10 */}
          <div className="col" onClick={() => onProductClick('B10')} style={{ cursor: 'pointer' }}>
            <div className="card h-100 border-0 rounded-4 shadow-sm overflow-hidden">
              <img src="resources/B10.jpg" className="card-img-top" alt="B10" style={{ height: '180px', objectFit: 'cover' }} />
              <div className="p-2 text-center text-white fw-bold" style={{ backgroundColor: '#bfa76a' }}>Rp 226.000</div>
            </div>
          </div>

          {/* Card S1 */}
          <div className="col" onClick={() => onProductClick('S1')} style={{ cursor: 'pointer' }}>
            <div className="card h-100 border-0 rounded-4 shadow-sm overflow-hidden">
              <img src="resources/S1.jpg" className="card-img-top" alt="S1" style={{ height: '180px', objectFit: 'cover' }} />
              <div className="p-2 text-center text-white fw-bold" style={{ backgroundColor: '#bfa76a' }}>Rp 350.000</div>
            </div>
          </div>

          {/* Card B3 */}
          <div className="col" onClick={() => onProductClick('B3')} style={{ cursor: 'pointer' }}>
            <div className="card h-100 border-0 rounded-4 shadow-sm overflow-hidden">
              <img src="resources/B3.jpg" className="card-img-top" alt="B3" style={{ height: '180px', objectFit: 'cover' }} />
              <div className="p-2 text-center text-white fw-bold" style={{ backgroundColor: '#bfa76a' }}>Rp 2.500.000</div>
            </div>
          </div>

          {/* Card B2 */}
          <div className="col" onClick={() => onProductClick('B2')} style={{ cursor: 'pointer' }}>
            <div className="card h-100 border-0 rounded-4 shadow-sm overflow-hidden">
              <img src="resources/B2.jpg" className="card-img-top" alt="B2" style={{ height: '180px', objectFit: 'cover' }} />
              <div className="p-2 text-center text-white fw-bold" style={{ backgroundColor: '#bfa76a' }}>Rp 950.000</div>
            </div>
          </div>

          {/* Card C1 */}
          <div className="col" onClick={() => onProductClick('C1')} style={{ cursor: 'pointer' }}>
            <div className="card h-100 border-0 rounded-4 shadow-sm overflow-hidden">
              <img src="resources/C1.jpg" className="card-img-top" alt="C1" style={{ height: '180px', objectFit: 'cover' }} />
              <div className="p-2 text-center text-white fw-bold" style={{ backgroundColor: '#bfa76a' }}>Rp 159.000</div>
            </div>
          </div>

          {/* Card T1 */}
          <div className="col" onClick={() => onProductClick('T1')} style={{ cursor: 'pointer' }}>
            <div className="card h-100 border-0 rounded-4 shadow-sm overflow-hidden">
              <img src="resources/T1.jpg" className="card-img-top" alt="T1" style={{ height: '180px', objectFit: 'cover' }} />
              <div className="p-2 text-center text-white fw-bold" style={{ backgroundColor: '#bfa76a' }}>Rp 125.000</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM NAVIGATION BAR */}
      <nav className="fixed-bottom bg-white border-top d-flex justify-content-around align-items-center py-2 shadow-lg" style={{ height: '65px' }}>
        <div className="text-center" style={{ color: '#bfa76a' }}>
          <i className="bi bi-house-fill fs-4"></i>
          <div style={{ fontSize: '10px' }}>Beranda</div>
        </div>
        <div className="text-center text-muted" onClick={handleAlert} style={{ cursor: 'pointer' }}>
          <i className="bi bi-fire fs-4"></i>
          <div style={{ fontSize: '10px' }}>Trending</div>
        </div>
        <div className="text-center text-muted" onClick={handleAlert} style={{ cursor: 'pointer' }}>
          <i className="bi bi-play-btn-fill fs-4"></i>
          <div style={{ fontSize: '10px' }}>Live</div>
        </div>
        <div className="text-center text-muted" onClick={handleAlert} style={{ cursor: 'pointer' }}>
          <i className="bi bi-bell fs-4"></i>
          <div style={{ fontSize: '10px' }}>Notifikasi</div>
        </div>
        <div className="text-center text-muted" onClick={handleAlert} style={{ cursor: 'pointer' }}>
          <i className="bi bi-person-fill fs-4"></i>
          <div style={{ fontSize: '10px' }}>Saya</div>
        </div>
      </nav>
    </div>
  );
};

export default HomePage;