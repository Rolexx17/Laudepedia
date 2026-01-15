import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import BottomNav from '../components/BottomNav';
import '../css/Cart.css'; // Kita pakai CSS baru agar rapi

/**
 * ADD TO CART / CART PAGE COMPONENT
 * Halaman keranjang belanja yang menampilkan daftar produk yang dipilih user,
 * kalkulasi total harga (subtotal + ongkir), serta formulir checkout.
 * * State:
 * - cartItems: Array - Menyimpan daftar objek produk (id, name, price, qty, image) dari LocalStorage.
 * - address: String - Menyimpan input alamat pengiriman user.
 * - courier: String - Menyimpan opsi kurir yang dipilih (jne, jnt, sicepat, instant).
 * - payment: String - Menyimpan metode pembayaran yang dipilih (bca, cod, gopay).
 * * Functions:
 * - updateQuantity: Function (id, delta) - Menambah atau mengurangi jumlah item dalam keranjang.
 * - removeItem: Function (id) - Menghapus item spesifik dari keranjang setelah konfirmasi.
 * - getShippingCost: Function - Mengembalikan nilai ongkir (int) berdasarkan kurir yang dipilih.
 * - handleCheckout: Function - Memvalidasi form, menampilkan alert sukses, menghapus data cart, dan redirect ke home.
 */

const AddToCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  
  // State Form Checkout
  const [address, setAddress] = useState('');
  const [courier, setCourier] = useState('jne');
  const [payment, setPayment] = useState('bca');

  // Load data saat halaman dibuka
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  // Update LocalStorage tiap kali cart berubah
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Fungsi Tambah/Kurang Qty
  const updateQuantity = (id, delta) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return { ...item, qty: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  // Fungsi Hapus Item
  const removeItem = (id) => {
    const confirmDelete = window.confirm("Remove this item?");
    if (confirmDelete) {
      const updatedCart = cartItems.filter(item => item.id !== id);
      setCartItems(updatedCart);
    }
  };

  // Hitung Total
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  
  const getShippingCost = () => {
    switch(courier) {
      case 'jne': return 15000;
      case 'jnt': return 18000;
      case 'sicepat': return 20000;
      case 'instant': return 50000;
      default: return 0;
    }
  };
  
  const shippingCost = cartItems.length > 0 ? getShippingCost() : 0;
  const grandTotal = subtotal + shippingCost;

  // Fungsi Checkout
  const handleCheckout = () => {
    if (!address) {
      alert("Please fill in your shipping address!");
      return;
    }
    
    alert(`Checkout Successful!\n\nTotal: Rp ${grandTotal.toLocaleString('id-ID')}\nSent to: ${address}\nVia: ${courier.toUpperCase()}`);
    
    // Kosongkan keranjang setelah beli
    setCartItems([]);
    localStorage.removeItem('cart');
    navigate('/'); // Balik ke home
  };

  return (
    <>
      <Navbar />
      <div className="cart-page-wrapper">
        <div className="cart-container">
          
          {/* List Produk */}
          <div className="cart-items-section">
            <h2 className="cart-header">Shopping Cart</h2>
            
            {cartItems.length === 0 ? (
              <p className="empty-cart-msg">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <div className="cart-img-wrapper">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">Rp {item.price.toLocaleString('id-ID')}</div>
                  </div>
                  <div className="cart-controls">
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>x</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Form Checkout */}
          {cartItems.length > 0 && (
            <div className="checkout-section">
              <h3 className="checkout-title">Checkout Details</h3>
              
              <div className="form-group">
                <label className="form-label">Address</label>
                <textarea 
                  className="form-input" 
                  rows="3" 
                  placeholder="Full Address..."
                  value={address} 
                  onChange={e => setAddress(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Shipping</label>
                <select className="form-select" value={courier} onChange={e => setCourier(e.target.value)}>
                  <option value="jne">JNE (15k)</option>
                  <option value="jnt">J&T (18k)</option>
                  <option value="sicepat">SiCepat (20k)</option>
                  <option value="instant">Instant (50k)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Payment</label>
                <select className="form-select" value={payment} onChange={e => setPayment(e.target.value)}>
                  <option value="bca">BCA Transfer</option>
                  <option value="cod">COD</option>
                  <option value="gopay">GoPay</option>
                </select>
              </div>

              <div className="total-row">
                <span>Total Payment:</span>
                <span>Rp {grandTotal.toLocaleString('id-ID')}</span>
              </div>

              <button className="checkout-btn" onClick={handleCheckout}>Order Now</button>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default AddToCart;