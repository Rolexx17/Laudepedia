import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import '../css/Cart.css';

const ViewCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);
  const [balance, setBalance] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  
  const [formData, setFormData] = useState({
    address: '',
    courier: 'jne',
    payment: 'bca'
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(data);

    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setCurrentUser(user);
      const savedBalance = localStorage.getItem(`balance_${user.email}`);
      setBalance(savedBalance ? parseInt(savedBalance) : 100);
    }
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

  const handlePayment = () => {
    if (!formData.address) return alert("Alamat wajib diisi!");
    if (balance < grandTotal) return;

    const confirmPay = window.confirm(
      `Konfirmasi Pembayaran\n\nTotal: Rp ${grandTotal.toLocaleString('id-ID')}\nSaldo Anda: Rp ${balance.toLocaleString('id-ID')}\n\nLanjutkan pemotongan saldo?`
    );

    if (confirmPay) {
      const newBalance = balance - grandTotal;
      
      // 1. Update Saldo
      localStorage.setItem(`balance_${currentUser.email}`, newBalance);

      // 2. Simpan ke History (Konek ke HistoryPage.jsx)
      const historyKey = `history_${currentUser.email}`;
      const existingHistory = JSON.parse(localStorage.getItem(historyKey)) || [];
      const newTransaction = {
        id: "TRX-" + Date.now(),
        date: new Date().toLocaleString('id-ID'),
        items: [...cartItems],
        total: grandTotal,
        address: formData.address,
        courier: formData.courier.toUpperCase()
      };
      localStorage.setItem(historyKey, JSON.stringify([newTransaction, ...existingHistory]));

      // 3. Bersihkan Keranjang & Redirect
      alert("Pembayaran Berhasil!");
      localStorage.removeItem('cart');
      navigate('/history'); 
    }
  };

  return (
    <>
      <Navbar />
      <div className="cart-page-wrapper">
        <div className="cart-container">
          <div className="cart-header-row">
            <h1 className="cart-header-title">Shopping Bag</h1>
            {cartItems.length > 0 && (
              <button className="btn-remove-all" onClick={removeAll}>Clear All Bag</button>
            )}
          </div>
          
          {cartItems.length === 0 ? (
            <div className="cart-empty-box">
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
                      <span className="cart-card-price-update">Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                      <div className="price-per-pc">(Rp {item.price.toLocaleString('id-ID')} / pc)</div>
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
                <h3 className="summary-title">Ringkasan</h3>
                <div className="summary-line balance-highlight">
                  <span>Saldo Anda</span>
                  <span>Rp {balance.toLocaleString('id-ID')}</span>
                </div>
                <div className="summary-line">
                  <span>Total Harga</span>
                  <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>

                {isCheckout && (
                  <div className="checkout-form">
                    <div className="form-group">
                      <label>Alamat Pengiriman</label>
                      <textarea rows="2" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
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

                {/* Pesan Error Saldo dalam Page */}
                {isCheckout && balance < grandTotal && (
                  <div className="balance-error-msg">
                    Saldo tidak mencukupi untuk transaksi ini.
                  </div>
                )}

                {!isCheckout ? (
                  <button className="btn-checkout" onClick={() => setIsCheckout(true)}>Lanjut Ke Checkout</button>
                ) : (
                  <>
                    <button 
                      className="btn-checkout confirm" 
                      onClick={handlePayment}
                      disabled={balance < grandTotal}
                      style={{ 
                        opacity: balance < grandTotal ? 0.5 : 1, 
                        cursor: balance < grandTotal ? 'not-allowed' : 'pointer' 
                      }}
                    >
                      Bayar Sekarang
                    </button>
                    <button className="btn-cancel-text" onClick={() => setIsCheckout(false)}>Kembali</button>
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