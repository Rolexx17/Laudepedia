import React from 'react';
import './css/Item.css';

const B1 = ({ onBack }) => {
  return (
    <div className="product-detail-page">
      {/* Tombol Back - Menggunakan fungsi onBack dari App.jsx */}
      <button className="back-btn" onClick={onBack} style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }}>
        &#8592;
      </button>

      <header className="lp-header text-center py-3">
        <h1 className="text-gold fw-bold" style={{ color: '#bfa76a' }}>Laudepedia</h1>
      </header>

      <main className="item-container container mt-4">
        <div className="row">
          {/* Bagian Gambar */}
          <div className="col-md-6 item-image text-center">
            <img 
              src="resources/B1.jpg" 
              alt="EDWIN Classic Faded Denim Jacket" 
              className="img-fluid rounded shadow"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>

          {/* Bagian Informasi */}
          <div className="col-md-6 item-info mt-4 mt-md-0">
            <h2 className="item-title fw-bold">EDWIN Classic Faded Denim Jacket</h2>
            <p className="item-price fs-3 fw-bold" style={{ color: '#bfa76a' }}>Rp 1.200.000</p>
            
            <div className="item-description my-4 text-muted">
              Timeless rugged denim, redefined.<br />
              Crafted from premium cotton with a slightly faded wash, this classic EDWIN jacket offers a vintage-inspired look with modern edge.<br />
              It features a pointed collar, button-down front, dual chest flap pockets, and signature red tab branding. Vertical seam detailing adds structure, 
              making it the perfect layering piece for any season.
            </div>

            <div className="item-rating mb-4">
              <span className="text-warning">★★★★★</span> 
              <span className="ms-2">4.9/5 (2.3k reviews)</span>
            </div>

            <div className="item-action d-flex align-items-center gap-3 flex-wrap">
              <div className="d-flex align-items-center gap-2">
                <label htmlFor="amount" className="mb-0">Quantity:</label>
                <input 
                  type="number" 
                  id="amount" 
                  className="form-control"
                  min="1" 
                  defaultValue="1" 
                  style={{ width: '70px' }}
                />
              </div>
              <button 
                className="btn btn-gold flex-grow-1" 
                style={{ backgroundColor: '#bfa76a', color: 'white', border: 'none', padding: '10px 20px' }}
                onClick={() => alert('Barang berhasil dibeli!')}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="lp-footer text-center py-5 mt-5 border-top text-muted">
        © 2025 Laudepedia — Elegance in Every Choice.
      </footer>
    </div>
  );
};

export default B1;