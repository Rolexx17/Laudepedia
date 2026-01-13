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

  // Mencari produk berdasarkan ID dari URL
  const product = products.find(item => item.id === id);

  // Scroll ke atas otomatis saat halaman dibuka
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="error-container">
        <h2>Product Not Found</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  // --- LOGIKA ADD TO CART ---
  const handleAddToCart = () => {
    // 1. Ambil data keranjang lama dari localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // 2. Cek apakah produk ini sudah ada di keranjang
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
      // Jika sudah ada, update jumlahnya
      existingCart[existingItemIndex].qty += parseInt(quantity);
    } else {
      // Jika belum ada, masukkan sebagai objek baru
      existingCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: parseInt(quantity)
      });
    }

    // 3. Simpan kembali ke localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));

    // 4. Feedback Visual: Ganti teks tombol sementara
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);

    // 5. Konfirmasi navigasi ke halaman Cart
    const goToCart = window.confirm("Berhasil ditambahkan ke keranjang! Lihat keranjang sekarang?");
    if (goToCart) {
      navigate('/cart');
    }
  };

  return (
    <div className="product-detail-page">
      <Navbar />

      {/* Tombol Back Melayang */}
      <button className="floating-back-btn" onClick={() => navigate(-1)}>
        &#8592; Back
      </button>

      <main className="item-container">
        <div className="item-layout">
          
          {/* Bagian Kiri: Gambar */}
          <div className="item-image-section">
            <div className="main-img-wrapper">
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          {/* Bagian Kanan: Detail & Aksi */}
          <div className="item-info-section">
            <nav className="breadcrumb">
              Home / Shop / {product.category || 'Beauty'}
            </nav>
            
            <h1 className="item-title">{product.name}</h1>
            
            <div className="item-rating-row">
              <span className="stars">★★★★★</span>
              <span className="rating-text">{product.rating}/5</span>
              <span className="review-count">({product.reviews} reviews)</span>
            </div>

            <p className="item-price-large">
              Rp {product.price.toLocaleString('id-ID')}
            </p>

            <div className="item-description">
              <h3>Description</h3>
              <p>
                {product.description || "Indulge in the ultimate luxury with this curated selection. Designed for those who appreciate the finer things in beauty and wellness."}
              </p>
            </div>

            <div className="purchase-controls">
              <div className="qty-picker">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <button 
                className={`add-to-cart-btn ${isAdded ? 'success' : ''}`}
                onClick={handleAddToCart}
              >
                {isAdded ? '✓ Added to Bag' : 'Add to Cart'}
              </button>
            </div>

            <div className="item-features">
              <div className="feature">
                <span>🚚</span> Free Shipping
              </div>
              <div className="feature">
                <span>✨</span> 100% Authentic
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="detail-footer">
        <p>© 2026 Laudepedia — Elegance in Every Choice.</p>
      </footer>

      <BottomNav />
    </div>
  );
};

export default ProductDetail;