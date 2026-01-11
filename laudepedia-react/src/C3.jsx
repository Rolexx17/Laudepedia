import React from 'react';
import './css/Item.css';

const C3 = ({ onBack }) => {
  return (
    <div className="product-detail-page">
      {/* Tombol Back */}
      <button 
        className="back-btn" 
        onClick={onBack} 
        style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer', padding: '10px' }}
      >
        &#8592;
      </button>

      <header className="lp-header text-center py-3">
        <h1 className="text-gold fw-bold" style={{ color: '#bfa76a' }}>Laudepedia</h1>
      </header>

      <main className="item-container container mt-4">
        <div className="row">
          {/* Bagian Gambar Produk C3 */}
          <div className="col-md-6 item-image text-center">
            <img 
              src="resources/C3.jpg" 
              alt="The Classic Blue Denim Mini Skirt" 
              className="img-fluid rounded shadow"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>

          {/* Bagian Informasi Produk C3 */}
          <div className="col-md-6 item-info mt-4 mt-md-0">
            <h2 className="item-title fw-bold">The Classic Blue Denim Mini Skirt</h2>
            <p className="item-price fs-3 fw-bold" style={{ color: '#bfa76a' }}>Rp 96.000</p>
            
            <div className="item-description my-4 text-muted">
              The classic blue denim mini skirt offers a timeless casual look perfect for everyday wear.<br /><br />
              Made from durable denim fabric, it features front and back pockets, belt loops, and a button-and-zip closure for a comfortable fit.<br /><br />
              Pair it easily with t-shirts, blouses, or crop tops for a chic and effortless style.
            </div>

            <div className="item-rating mb-4">
              <span className="text-warning">★★★★★</span> 
              <span className="ms-2">4.8/5 (5.9k reviews)</span>
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
                onClick={() => alert('Skirt C3 berhasil ditambahkan!')}
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

export default C3;