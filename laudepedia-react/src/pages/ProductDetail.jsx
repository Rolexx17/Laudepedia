import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import '../css/Item.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const product = products.find(item => item.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) return <div style={{paddingTop: '100px', textAlign: 'center'}}>Produk Tidak Ditemukan</div>;

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].qty += parseInt(quantity);
    } else {
      existingCart.push({ ...product, qty: parseInt(quantity) });
    }
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    if (window.confirm("Berhasil! Lihat keranjang sekarang?")) navigate('/cart');
  };

  return (
    <div className="product-page-root">
      <Navbar />

      <main className="main-content-scrollable">
        <button className="back-btn-fixed" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span>Back</span>
        </button>

        <div className="detail-grid">
          <section className="image-panel">
            <div className="image-wrapper-card">
              <img src={product.image} alt={product.name} />
              {product.rating >= 4.8 && <span className="exclusive-badge">PREMIUM</span>}
            </div>
          </section>

          <section className="info-panel">
            <p className="cat-text">{product.category}</p>
            <h1 className="item-name-display">{product.name}</h1>
            
            <div className="price-box">
              <span className="rp">Rp</span>
              <span className="nominal">{product.price.toLocaleString('id-ID')}</span>
            </div>

            <div className="desc-box">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="action-row">
              <div className="qty-picker-container">
                <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                     <line x1="5" y1="12" x2="19" y2="12"></line>
                   </svg>
                </button>
                
                <input type="number" value={quantity} readOnly className="qty-number-input" />
                
                <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                     <line x1="12" y1="5" x2="12" y2="19"></line>
                     <line x1="5" y1="12" x2="19" y2="12"></line>
                   </svg>
                </button>
              </div>
              
              <button className={`btn-add-cart ${isAdded ? 'success' : ''}`} onClick={handleAddToCart}>
                {isAdded ? '✓ Added' : 'Add to Cart'}
              </button>
            </div>
          </section>
        </div>
      </main>

      <footer className="item-footer">
        <p>© 2026 Laudepedia — Elegance in Every Choice.</p>
      </footer>

      <BottomNav />
    </div>
  );
};

export default ProductDetail;