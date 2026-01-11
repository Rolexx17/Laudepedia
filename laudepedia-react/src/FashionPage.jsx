import React from 'react';

const FashionPage = ({ onBack }) => {
  // 1. Data untuk Produk Trending
  const trendingProducts = [
    { id: 1, name: "EDWIN Classic Faded Denim Jacket", price: "Rp 1.200.000", img: "resources/B1.jpg", link: "B1.html" },
    { id: 2, name: "Abstract Teal Oversized Knit Sweater", price: "Rp 950.000", img: "resources/B2.jpg", link: "B2.html" },
    { id: 3, name: "Virgil Abloh™ Black Varsity Jacket", price: "Rp 2.500.000", img: "resources/B3.jpg", link: "B3.html" },
    { id: 4, name: "Dark Denim Jacket with Faux Fur Lining", price: "Rp 1.800.000", img: "resources/B4.jpg", link: "B4.html" },
    { id: 5, name: "Street Graphic Black Long-Sleeve Tee", price: "Rp 600.000", img: "resources/B5.jpg", link: "B5.html" },
    { id: 6, name: "Stüssy Cream Knit Logo Vest", price: "Rp 1.400.000", img: "resources/B6.jpg", link: "B6.html" },
    { id: 7, name: "Romantic Floral Cropped Top with Lace Trim", price: "Rp 500.000", img: "resources/B7.jpg", link: "B7.html" },
    { id: 8, name: "Vintage-Inspired White Lace Dress with Bell Sleeves", price: "Rp 1.700.000", img: "resources/B8.jpg", link: "B8.html" },
  ];

  // 2. Data untuk Popular Stores
  const stores = ["GAUDI", "HUGO", "LOONY", "EXIT", "MONOGRAM", "NEWWAVE", "LAUFE", "PHOEBES", "ZASTIN", "CHOMA", "SIXSEVEN", "SILENE", "PLOPHIRE"];

  // 3. Data untuk Recommendations
  const recommendations = [
    { id: 9, name: "White Puff-Sleeve Ribbon Mini Dress", price: "Rp 550.000", img: "resources/B9.jpg", link: "B9.html" },
    { id: 10, name: "Gothic Cross Halter Crop", price: "Rp 226.000", img: "resources/B10.jpg", link: "B10.html" },
    { id: 11, name: "Pinstripe Buttoned Tailored Shorts", price: "Rp 159.000", img: "resources/C1.jpg", link: "C1.html" },
    { id: 12, name: "Black Denim Graphic Shorts", price: "Rp 115.000", img: "resources/C2.jpg", link: "C2.html" },
    { id: 13, name: "The Classic Blue Denim Mini Skirt", price: "Rp 96.000", img: "resources/C3.jpg", link: "C3.html" },
    { id: 14, name: "The Classic Black Double Monk Strap Shoes", price: "Rp 350.000", img: "resources/S1.jpg", link: "S1.html" },
    { id: 15, name: "Black Urban Leather Shoulder Bag", price: "Rp 125.000", img: "resources/T1.jpg", link: "T1.html" },
    { id: 16, name: "Coach Fashionable Vintage Handbag", price: "Rp 180.000", img: "resources/T2.jpg", link: "T2.html" },
  ];

  return (
    <div className="fashion-page">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
        <div className="container">
          
          <a className="navbar-brand fw-bold text-gold fs-3" href="#" onClick={(e) => {
            e.preventDefault();
            onBack(); // Ini akan memanggil fungsi kembali ke Home
            }}>Laudepedia</a>
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

      {/* Hero Section */}
      <section className="hero-section text-center py-5">
        <div className="container">
          <h1 className="fw-bold text-gold">Fashion Collection</h1>
          <p className="text-muted">Stay trendy this season with our Monthly Trending</p>
        </div>
      </section>

      {/* Trending Section */}
      <section className="trending py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fw-semibold text-gold mb-0">Trending November</h2>
            <button className="btn btn-link text-gold small text-decoration-none" onClick={() => alert('Coming Soon!')}>See All →</button>
          </div>
          <div className="scroll-container d-flex flex-nowrap overflow-auto pb-3">
            {trendingProducts.map((product) => (
              <div key={product.id} className="card product-card me-3 flex-shrink-0" style={{ width: '180px' }}>
                <a href={product.link} className="item text-decoration-none text-dark">
                  <img src={product.img} className="card-img-top" alt={product.name} />
                  <div className="card-body">
                    <h6 className="card-title" style={{ fontSize: '14px' }}>{product.name}</h6>
                    <p className="card-text text-gold fw-bold">{product.price}</p>
                  </div>
                </a>
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
                <a href={product.link} className="item text-decoration-none text-dark">
                  <div className="card product-card h-100">
                    <img src={product.img} className="card-img-top" alt={product.name} />
                    <div className="card-body">
                      <h6 className="card-title">{product.name}</h6>
                      <p className="card-text text-gold fw-bold">{product.price}</p>
                    </div>
                  </div>
                </a>
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

export default FashionPage;