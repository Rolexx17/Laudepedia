import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { 
  calculateShipping, 
  saveTransactionToHistory, 
  updateUserBalance 
} from '../js/cartService';
import '../css/Cart.css';

/**
 * VIEW CART PAGE COMPONENT
 * Halaman pengelola keranjang belanja (Shopping Bag) dan proses Checkout.
 * Mengintegrasikan sistem manajemen item, kalkulasi biaya pengiriman, dan transaksi saldo.
 * * * State:
 * - cartItems: Array - Menyimpan daftar produk yang diambil dari LocalStorage 'cart'.
 * - isCheckout: Boolean - Status untuk beralih antara tampilan daftar item dan formulir checkout.
 * - balance: Number - Saldo koin user yang aktif.
 * - currentUser: Object - Data user yang sedang login untuk keperluan identifikasi transaksi.
 * - showConfirmModal: Boolean - Mengontrol visibilitas modal konfirmasi final pembayaran.
 * - statusMsg: Object - Pesan feedback sistem { type: 'success/error', text: string }.
 * - pendingAction: Object - Menyimpan data item yang akan dihapus untuk konfirmasi modal.
 * - formData: Object - Menyimpan data pengiriman (address, courier, payment).
 * * * Functions:
 * - updateQty: Mengubah jumlah produk dan memperbarui LocalStorage secara sinkron.
 * - executeDelete: Menghapus item tertentu atau mengosongkan seluruh keranjang.
 * - handleOpenPaymentModal: Validasi kelengkapan data alamat dan kecukupan saldo.
 * - processPayment: Memotong saldo, mencatat riwayat transaksi, dan mengosongkan keranjang.
 */

const ViewCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);
  const [balance, setBalance] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [pendingAction, setPendingAction] = useState(null); 
  
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

  const showFeedback = (type, text) => {
    setStatusMsg({ type, text });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (type === 'success') {
      setTimeout(() => setStatusMsg({ type: '', text: '' }), 3000);
    }
  };

  const updateQty = (id, delta) => {
    const updated = cartItems.map(item => 
      String(item.id) === String(id) 
      ? { ...item, qty: Math.max(1, item.qty + delta) } 
      : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const confirmRemove = (id) => setPendingAction({ type: 'SINGLE', id });
  const confirmRemoveAll = () => setPendingAction({ type: 'ALL' });

  const executeDelete = () => {
    let updatedItems = [];
    if (pendingAction.type === 'SINGLE') {
      updatedItems = cartItems.filter(item => String(item.id) !== String(pendingAction.id));
      localStorage.setItem('cart', JSON.stringify(updatedItems));
    } else {
      localStorage.removeItem('cart');
    }
    
    setCartItems(updatedItems);
    if (updatedItems.length === 0) setIsCheckout(false);
    setPendingAction(null);
    showFeedback('success', 'Berhasil dihapus dari keranjang');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shippingCost = isCheckout ? calculateShipping(formData.courier) : 0;
  const grandTotal = subtotal + shippingCost;

  const handleOpenPaymentModal = () => {
    if (!formData.address) {
      showFeedback('error', 'Alamat pengiriman wajib diisi sebelum membayar!');
      return;
    }
    if (balance < grandTotal) return;
    setShowConfirmModal(true);
  };

  const processPayment = () => {
    const newBalance = balance - grandTotal;
    
    // Gunakan fungsi dari cartService.js
    updateUserBalance(currentUser.email, newBalance);
    
    const newTransaction = {
      id: "TRX-" + Date.now(),
      date: new Date().toLocaleString('id-ID'),
      items: [...cartItems],
      total: grandTotal,
      address: formData.address,
      courier: formData.courier.toUpperCase()
    };
    
    saveTransactionToHistory(currentUser.email, newTransaction);

    setShowConfirmModal(false);
    localStorage.removeItem('cart');
    
    showFeedback('success', 'Pembayaran Berhasil! Mengalihkan ke riwayat...');
    setTimeout(() => navigate('/history'), 2000);
  };

  return (
    <>
      <Navbar />
      <div className="cart-page-wrapper">
        <div className="cart-container">
          {statusMsg.text && (
            <div className={`onpage-alert ${statusMsg.type}`}>
              {statusMsg.text}
            </div>
          )}

          <div className="cart-header-row">
            <h1 className="cart-header-title">My Cart</h1>
            {cartItems.length > 0 && (
              <button className="btn-remove-all" onClick={confirmRemoveAll}>Remove All Item(s)</button>
            )}
          </div>
          
          {cartItems.length === 0 ? (
            <div className="cart-empty-box">
              <p>Your shopping cart is empty.</p>
              <button className="btn-checkout" style={{width: 'auto', padding: '12px 30px'}} onClick={() => navigate('/home')}>Show Collection</button>
            </div>
          ) : (
            <div className="cart-content-row">
              <div className="cart-items-panel">
                {cartItems.map(item => (
                  <div className="cart-card" key={item.id}>
                    <button className="btn-remove" onClick={() => confirmRemove(item.id)}>&times;</button>
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
                <h3 className="summary-title">Receipt</h3>
                <div className="summary-line balance-highlight">
                  <span>Your Balance</span>
                  <span>Rp {balance.toLocaleString('id-ID')}</span>
                </div>
                <div className="summary-line">
                  <span>Grand Total</span>
                  <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>

                {isCheckout && (
                  <div className="checkout-form">
                    <div className="form-group">
                      <label>Address</label>
                      <textarea rows="2" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Shipper</label>
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
                  <span>Grand Total</span>
                  <span>Rp {grandTotal.toLocaleString('id-ID')}</span>
                </div>

                {isCheckout && balance < grandTotal && (
                  <div className="balance-error-msg">
                    Insufficient balance for this transaction.
                  </div>
                )}

                {!isCheckout ? (
                  <button className="btn-checkout" onClick={() => setIsCheckout(true)}>Continue to Checkout</button>
                ) : (
                  <>
                    <button 
                      className="btn-checkout confirm" 
                      onClick={handleOpenPaymentModal}
                      disabled={balance < grandTotal}
                      style={{ opacity: balance < grandTotal ? 0.5 : 1, cursor: balance < grandTotal ? 'not-allowed' : 'pointer' }}
                    >
                      Pay Now
                    </button>
                    <button className="btn-cancel-text" onClick={() => setIsCheckout(false)}>Back</button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{fontFamily: 'Playfair Display'}}>Payment Confirmation</h3>
            <p>Continue deducting balance for this order?</p>
            <div className="modal-details">
              <div className="modal-line"><span>Grand Total:</span> <strong>Rp {grandTotal.toLocaleString('id-ID')}</strong></div>
              <div className="modal-line"><span>Remaining Balance:</span> <span>Rp {(balance - grandTotal).toLocaleString('id-ID')}</span></div>
            </div>
            <div className="modal-actions">
              <button className="btn-modal-cancel" onClick={() => setShowConfirmModal(false)}>No</button>
              <button className="btn-modal-confirm" onClick={processPayment}>Yes</button>
            </div>
          </div>
        </div>
      )}

      {pendingAction && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{fontFamily: 'Playfair Display'}}>Delete Item?</h3>
            <p>{pendingAction.type === 'ALL' ? 'Apakah Anda yakin ingin mengosongkan seluruh keranjang?' : 'Hapus item ini dari daftar belanja Anda?'}</p>
            <div className="modal-actions">
              <button className="btn-modal-cancel" onClick={() => setPendingAction(null)}>Cancel</button>
              <button className="btn-modal-confirm" style={{background: '#ff6b6b'}} onClick={executeDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </>
  );
};

export default ViewCart;