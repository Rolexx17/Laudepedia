import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import '../css/Cart.css';

const ViewCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);
  
  const [formData, setFormData] = useState({
    address: '',
    courier: 'jne',
    payment: 'bca'
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(data);
  }, []);

  const updateQty = (id, delta) => {
    const updated = cartItems.map(item => 
      String(item.id) === String(id) 
      ? { ...item, qty: Math.max(1, item.qty + delta) } 
      : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const remove = (id) => {
    if (window.confirm("Hapus item ini?")) {
      const filtered = cartItems.filter(item => String(item.id) !== String(id));
      setCartItems(filtered);
      localStorage.setItem('cart', JSON.stringify(filtered));
      if (filtered.length === 0) setIsCheckout(false);
    }
  };

  // FITUR: REMOVE ALL
  const removeAll = () => {
    if (window.confirm("Kosongkan semua isi keranjang?")) {
      setCartItems([]);
      localStorage.removeItem('cart');
      setIsCheckout(false);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shippingCost = isCheckout ? { jne: 15000, jnt: 18000, sicepat: 20000, instant: 50000 }[formData.courier] || 0 : 0;
  const grandTotal = subtotal + shippingCost;

  return (
    <>
      <Navbar />
      <div className="cart-page-wrapper">
        <div className="cart-container">
          
          <div className="cart-header-row">
            <h1 className="cart-header-title">Shopping Bag</h1>
            {cartItems.length > 0 && (
              <button className="btn-remove-all" onClick={removeAll}>
                Clear All Bag
              </button>
            )}
          </div>
          
          {cartItems.length === 0 ? (
            <div style={{textAlign: 'center', padding: '60px', background: 'white', borderRadius: '15px', border: '1px solid #eee'}}>
              <p>Keranjang belanja Anda kosong.</p>
              <button className="btn-checkout" style={{width: 'auto', padding: '12px 30px'}} onClick={() => navigate('/home')}>Lihat Koleksi</button>
            </div>
          ) : (
            <div className="cart-content-row">
              
              <div className="cart-items-panel">
                {cartItems.map(item => (
                  <div className="cart-card" key={item.id}>
                    <button className="btn-remove" onClick={() => remove(item.id)}>&times;</button>
                    
                    <img src={item.image} alt={item.name} />

                    <div className="cart-card-info">
                      <span className="cart-card-name">{item.name}</span>
                      {/* HARGA PER BARIS: Otomatis update (Harga x Qty) */}
                      <span className="cart-card-price-update">
                        Rp {(item.price * item.qty).toLocaleString('id-ID')}
                      </span>
                      <div style={{fontSize: '0.75rem', color: '#aaa'}}>
                        (Rp {item.price.toLocaleString('id-ID')} / pc)
                      </div>
                    </div>

                    <div className="qty-box">
                      <button onClick={() => updateQty(item.id, -1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary-panel">
                <h3 style={{fontFamily: 'Playfair Display'}}>Ringkasan</h3>
                <div className="summary-line">
                  <span>Total Harga</span>
                  <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>

                {isCheckout && (
                  <div className="checkout-form">
                    <div className="form-group">
                      <label>Alamat Pengiriman</label>
                      <textarea 
                        rows="2"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Kurir</label>
                      <select value={formData.courier} onChange={(e) => setFormData({...formData, courier: e.target.value})}>
                        <option value="jne">JNE (Rp 15.000)</option>
                        <option value="jnt">J&T (Rp 18.000)</option>
                        <option value="sicepat">SiCepat (Rp 20.000)</option>
                        <option value="instant">Instant (Rp 50.000)</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="summary-line total">
                  <span>Total Bayar</span>
                  <span>Rp {grandTotal.toLocaleString('id-ID')}</span>
                </div>

                {!isCheckout ? (
                  <button className="btn-checkout" onClick={() => setIsCheckout(true)}>Lanjut Ke Checkout</button>
                ) : (
                  <>
                    <button className="btn-checkout confirm" onClick={() => {
                      if(!formData.address) return alert("Alamat wajib diisi!");
                      alert("Pesanan Dibuat!");
                      localStorage.removeItem('cart');
                      navigate('/home');
                    }}>Bayar Sekarang</button>
                    <button style={{background:'none', border:'none', width:'100%', color:'#999', marginTop:'10px', cursor:'pointer'}} onClick={() => setIsCheckout(false)}>Kembali</button>
                  </>
                )}
              </div>

            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default ViewCart;