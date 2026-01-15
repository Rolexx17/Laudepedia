import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

const History = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      const savedHistory = JSON.parse(localStorage.getItem(`history_${currentUser.email}`)) || [];
      setTransactions(savedHistory);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: '100px 20px', maxWidth: '600px', margin: '0 auto', minHeight: '100vh' }}>
        <h2 style={{ fontFamily: 'Playfair Display', fontWeight: 'bold', marginBottom: '30px' }}>Riwayat Transaksi</h2>

        {transactions.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', marginTop: '50px' }}>
            <p>Belum ada transaksi</p>
          </div>
        ) : (
          transactions.map((trx) => (
            <div key={trx.id} style={{ 
              background: 'white', border: '1px solid #eee', borderRadius: '15px', 
              padding: '20px', marginBottom: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '0.85rem' }}>
                <span style={{ fontWeight: 'bold', color: '#bfa76a' }}>{trx.id}</span>
                <span style={{ color: '#aaa' }}>{trx.date}</span>
              </div>

              {trx.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
                  <img src={item.image} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>{item.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#777' }}>{item.qty} x Rp {item.price.toLocaleString('id-ID')}</div>
                  </div>
                </div>
              ))}

              <div style={{ borderTop: '1px dashed #eee', marginTop: '15px', paddingTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.9rem' }}>Total Bayar</span>
                <span style={{ fontWeight: 'bold', color: '#000' }}>Rp {trx.total.toLocaleString('id-ID')}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '5px' }}>Dikirim ke: {trx.address}</div>
            </div>
          ))
        )}
      </div>
      <BottomNav />
    </>
  );
};

export default History;