import React from 'react';

const TechPage = ({ onBack, onProductClick }) => {
  const trendingTech = [
  // Pastikan pakai tanda kutip pada id dan link!
  { id: 'B1', name: "EDWIN Classic Faded Denim Jacket", price: "Rp 1.200.000", img: "resources/B1.jpg", link: "B1" },
  { id: 'B2', name: "Abstract Teal Oversized Knit Sweater", price: "Rp 950.000", img: "resources/B2.jpg", link: "B2" },
  { id: 'B3', name: "Virgil Abloh™ Black Varsity Jacket", price: "Rp 2.500.000", img: "resources/B3.jpg", link: "B3" },
  { id: 'B4', name: "Dark Denim Jacket with Faux Fur Lining", price: "Rp 1.800.000", img: "resources/B4.jpg", link: "B4" },
  { id: 'B5', name: "Street Graphic Black Long-Sleeve Tee", price: "Rp 600.000", img: "resources/B5.jpg", link: "B5" },
  { id: 'B6', name: "Stüssy Cream Knit Logo Vest", price: "Rp 1.400.000", img: "resources/B6.jpg", link: "B6" },
  { id: 'B7', name: "Romantic Floral Cropped Top with Lace Trim", price: "Rp 500.000", img: "resources/B7.jpg", link: "B7" },
  { id: 'B8', name: "Vintage-Inspired White Lace Dress with Bell Sleeves", price: "Rp 1.700.000", img: "resources/B8.jpg", link: "B8" },
];

  // 2. Data untuk Popular Stores
  const stores = ["GAUDI", "HUGO", "LOONY", "EXIT", "MONOGRAM", "NEWWAVE", "LAUFE", "PHOEBES", "ZASTIN", "CHOMA", "SIXSEVEN", "SILENE", "PLOPHIRE"];

  // 3. Data untuk Recommendations
  const recommendations = [
  { id: 'B9', name: "White Puff-Sleeve Ribbon Mini Dress", price: "Rp 550.000", img: "resources/B9.jpg", link: "B9" },
  { id: 'B10', name: "Gothic Cross Halter Crop", price: "Rp 226.000", img: "resources/B10.jpg", link: "B10" },
  { id: 'C1', name: "Pinstripe Buttoned Tailored Shorts", price: "Rp 159.000", img: "resources/C1.jpg", link: "C1" },
  { id: 'C2', name: "Black Denim Graphic Shorts", price: "Rp 115.000", img: "resources/C2.jpg", link: "C2" },
  { id: 'C3', name: "The Classic Blue Denim Mini Skirt", price: "Rp 96.000", img: "resources/C3.jpg", link: "C3" },
  { id: 'S1', name: "The Classic Black Double Monk Strap Shoes", price: "Rp 350.000", img: "resources/S1.jpg", link: "S1" },
  { id: 'T1', name: "Black Urban Leather Shoulder Bag", price: "Rp 125.000", img: "resources/T1.jpg", link: "T1" },
  { id: 'T2', name: "Coach Fashionable Vintage Handbag", price: "Rp 180.000", img: "resources/T2.jpg", link: "T2" },
];

  return (
    <div className="fashion-page">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
        <div className="container d-flex align-items-center">
          {/* Tambahkan Icon Panah ini untuk Tes */}
          <i 
            className="bi bi-arrow-left fs-4 me-3 text-gold" 
            style={{ cursor: 'pointer' }} 
            onClick={onBack}
          ></i>

          <span 
            className="navbar-brand fw-bold text-gold fs-3 mb-0" 
            style={{ cursor: 'pointer' }} 
            onClick={onBack}
          >
            Laudepedia
          </span>

          {/* Tombol Toggler (Hanya muncul di HP) */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav"></div>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <form className="d-flex me-3">
              <input className="form-control me-2" type="search" placeholder="Search fashion items..." aria-label="Search" />
              <button className="btn btn-gold" type="submit">Search</button>
            </form>
            <a href="#" className="btn btn-outline-gold me-2">Login</a>
            <a href="#" className="btn btn-gold">Register</a>
          </div>
        </div>
      </nav>

      {/* Trending Section */}
      <section className="trending py-5 bg-light">
        <div className="container">
          <h2 className="fw-semibold text-gold mb-3">Trending Gadgets</h2>
          <div className="scroll-container d-flex flex-nowrap overflow-auto pb-3">
            {trendingTech.map((product) => (
              <div key={product.id} className="card product-card me-3 flex-shrink-0" style={{ width: '180px', cursor: 'pointer' }} onClick={() => onProductClick(product.id)}>
                <img src={product.img} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h6 className="card-title">{product.name}</h6>
                  <p className="card-text text-gold fw-bold">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Stores Section */}
      <section className="stores py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fw-semibold text-gold mb-0">Popular Stores</h2>
            <button className="btn btn-link text-gold small text-decoration-none" onClick={() => alert('Coming Soon!')}>See All →</button>
          </div>
          <div className="scroll-container d-flex flex-nowrap overflow-auto pb-3">
            {stores.map((store, index) => (
              <div key={index} className="store-card text-center p-4 me-3 flex-shrink-0 rounded bg-light" style={{ cursor: 'pointer', minWidth: '120px' }} onClick={() => alert('Coming Soon!')}>
                {store}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="recommendations py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4 fw-semibold text-gold">Recommended for You</h2>
          <div className="row">
            {recommendations.map((product) => (
              <div key={product.id} className="col-6 col-md-3 mb-4">
                <div 
                  className="card product-card h-100" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => onProductClick(product.id)} // Memanggil ID produk (B9, T1, dst)
                >
                  <img src={product.img} className="card-img-top" alt={product.name} />
                  <div className="card-body">
                    <h6 className="card-title">{product.name}</h6>
                    <p className="card-text text-gold fw-bold">{product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 bg-white border-top">
        <p className="mb-0 text-muted">© 2025 Laudepedia Fashion. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default TechPage;