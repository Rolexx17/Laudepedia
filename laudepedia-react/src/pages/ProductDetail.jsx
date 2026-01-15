import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../js/products';
import { addToCartLogic } from '../js/cart';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import '../css/Item.css';

/**
 * PRODUCT DETAIL COMPONENT
 * Halaman rincian produk yang menampilkan informasi mendalam, harga, 
 * serta fitur pemilihan kuantitas untuk dimasukkan ke dalam keranjang.
 * * * State:
 * - id: String (from Params) - ID unik produk yang diambil dari URL.
 * - quantity: Number - Jumlah produk yang ingin ditambahkan (minimal 1).
 * - isAdded: Boolean - State untuk memicu animasi perubahan teks/warna pada tombol Add to Cart.
 * - showRedirectModal: Boolean - Mengontrol visibilitas modal navigasi setelah produk berhasil ditambah.
 * - statusMsg: String - Pesan konfirmasi yang muncul pada banner bagian atas.
 * * * Functions:
 * - useEffect: Mengatur posisi scroll ke paling atas (0,0) saat halaman pertama kali dibuka.
 * - handleAddToCart: Mengambil logika dari cart.js, memperbarui state UI, dan memicu timeout untuk modal.
 * - setQuantity: Mengatur jumlah produk dengan batasan minimal angka 1.
 */

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const product = products.find(item => item.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) return <div style={{paddingTop: '100px', textAlign: 'center'}}>Produk Tidak Ditemukan</div>;

  const handleAddToCart = () => {
    addToCartLogic(product, quantity); // Menggunakan fungsi dari file JS terpisah
    
    setIsAdded(true);
    setStatusMsg('Berhasil ditambahkan ke keranjang!');
    
    setTimeout(() => {
      setIsAdded(false);
      setShowRedirectModal(true);
    }, 800);

    setTimeout(() => setStatusMsg(''), 4000);
  };

  return (
    <div className="product-page-root">
      <Navbar />

      <main className="main-content-scrollable">
        {statusMsg && (
          <div className="status-banner-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '10px'}}>
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            {statusMsg}
          </div>
        )}

        <button className="back-btn-fixed" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span>Back</span>
        </button>

        <div className="detail-grid">
          <section className="image-panel">
            <div className="image-wrapper-card" style={{position: 'relative'}}>
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

      {showRedirectModal && (
        <div className="modal-overlay-item">
          <div className="modal-content-item">
            <div className="success-icon-circle">✓</div>
            <h3 style={{color: '#111'}}>Berhasil Ditambahkan!</h3>
            <p>Produk telah masuk ke keranjang belanja Anda.</p>
            <div className="modal-actions-item">
              <button className="btn-stay" onClick={() => setShowRedirectModal(false)}>Lanjut Belanja</button>
              <button className="btn-go-cart" onClick={() => navigate('/cart')}>Lihat Keranjang</button>
            </div>
          </div>
        </div>
      )}

      <footer className="item-footer">
        <p>© 2026 Laudepedia — Elegance in Every Choice.</p>
      </footer>

      <BottomNav />
    </div>
  );
};

export default ProductDetail;