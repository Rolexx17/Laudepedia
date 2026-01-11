import React from 'react';
import './css/Item.css';

const S1 = ({ onBack }) => {
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
          {/* Bagian Gambar Produk S1 */}
          <div className="col-md-6 item-image text-center">
            <img 
              src="resources/S1.jpg" 
              alt="The Classic Black Double Monk Strap Shoes" 
              className="img-fluid rounded shadow"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>

          {/* Bagian Informasi Produk S1 */}
          <div className="col-md-6 item-info mt-4 mt-md-0">
            <h2 className="item-title fw-bold">The Classic Black Double Monk Strap Shoes</h2>
            <p className="item-price fs-3 fw-bold" style={{ color: '#bfa76a' }}>Rp 350.000</p>
            
            <div className="item-description my-4 text-muted">
              These classic black double monk strap shoes combine timeless elegance with modern sophistication.<br /><br />
              Made from smooth leather, they feature two adjustable buckle straps and decorative perforations on the toe for a refined touch.<br /><br />
              The sturdy sole offers both comfort and durability, making them perfect for formal occasions, office wear, or smart-casual outfits.
            </div>

            <div className="item-rating mb-4">
              <span className="text-warning">★★★★☆</span> 
              <span className="ms-2">4.5/5 (2.0k reviews)</span>
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
                onClick={() => alert('Sepatu S1 berhasil ditambahkan ke keranjang!')}
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

export default S1;