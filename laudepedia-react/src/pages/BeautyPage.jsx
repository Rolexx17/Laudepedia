import React from 'react';
import { useNavigate } from 'react-router-dom';

/* ================= REUSABLE PRODUCT CARD (KHUSUS TRENDING) ================= */
const TrendingProductCard = ({ item, onClick }) => {
  return (
    <div
      className="card me-3 flex-shrink-0"
      style={{ width: '180px', cursor: 'pointer' }}
      onClick={onClick}
    >
      {/* IMAGE WRAPPER FIX */}
      <div
        style={{
          height: '180px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff'
        }}
      >
        <img
          src={item.img}
          alt={item.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>

      <div className="card-body text-center">
        <h6 className="card-title small">{item.name}</h6>
        <p className="fw-bold text-gold mb-0">{item.price}</p>
      </div>
    </div>
  );
};

const BeautyPage = () => {
  const navigate = useNavigate();

  /* ================= TRENDING BEAUTY ================= */
  const trendingBeauty = [
    { id: 'y1', name: 'Dior Forever Skin Glow', price: 'Rp 950.000', img: '/resources/Y1.jpg' },
    { id: 'y2', name: 'Chanel Rouge Allure Velvet', price: 'Rp 720.000', img: '/resources/Y2.jpg' },
    { id: 'y3', name: 'SK-II Facial Treatment Essence', price: 'Rp 2.350.000', img: '/resources/Y3.jpg' },
    { id: 'y4', name: 'Estée Lauder Advanced Night Repair', price: 'Rp 1.850.000', img: '/resources/Y4.jpg' },
    { id: 'y5', name: 'Rare Beauty Soft Pinch Blush', price: 'Rp 420.000', img: '/resources/Y5.jpg' },
    { id: 'y6', name: 'YSL Libre Eau de Parfum', price: 'Rp 1.750.000', img: '/resources/Y6.jpg' },
  ];

  /* ================= BEAUTY BRANDS ================= */
  const brands = [
    'DIOR', 'CHANEL', 'YSL', 'RARE BEAUTY',
    'SK-II', 'ESTÉE LAUDER', 'LANEIGE',
    'MAC', 'FENTY BEAUTY', 'NARS'
  ];

  /* ================= RECOMMENDATION (TIDAK DIUBAH) ================= */
  const recommendations = [
    { id: 'y7', name: 'Laneige Lip Sleeping Mask', price: 'Rp 320.000', img: '/resources/Y7.jpg' },
    { id: 'y8', name: 'MAC Studio Fix Powder Plus', price: 'Rp 580.000', img: '/resources/Y8.jpg' },
    { id: 'y9', name: 'Fenty Beauty Gloss Bomb', price: 'Rp 390.000', img: '/resources/Y9.jpg' },
    { id: 'y10', name: 'NARS Radiant Creamy Concealer', price: 'Rp 520.000', img: '/resources/Y10.jpg' },
    { id: 'y11', name: 'La Roche-Posay Effaclar Duo+', price: 'Rp 450.000', img: '/resources/Y11.jpg' },
    { id: 'y12', name: 'The Ordinary Niacinamide 10%', price: 'Rp 180.000', img: '/resources/Y12.jpg' },
    { id: 'y13', name: 'Drunk Elephant Protini Cream', price: 'Rp 1.250.000', img: '/resources/Y13.jpg' },
    { id: 'y14', name: 'Charlotte Tilbury Airbrush Powder', price: 'Rp 750.000', img: '/resources/Y14.jpg' },
  ];

  return (
    <div className="beauty-page">

      {/* ================= HERO ================= */}
      <section className="hero-section text-center py-5">
        <div className="container">
          <h1 className="fw-bold text-gold">Beauty Collection</h1>
          <p className="text-muted">
            Discover premium beauty & skincare essentials
          </p>
        </div>
      </section>

      {/* ================= TRENDING (FIXED) ================= */}
      <section className="trending py-5 bg-light">
        <div className="container">
          <h2 className="fw-semibold text-gold mb-3">Trending Beauty</h2>

          <div className="d-flex flex-nowrap overflow-auto pb-3">
            {trendingBeauty.map((item) => (
              <TrendingProductCard
                key={item.id}
                item={item}
                onClick={() => navigate(`/product/${item.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= BRANDS ================= */}
      <section className="brands py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fw-semibold text-gold mb-0">Top Beauty Brands</h2>
            <span className="text-gold small">See All →</span>
          </div>

          <div className="d-flex flex-nowrap overflow-auto pb-3">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="text-center p-4 me-3 rounded bg-light flex-shrink-0"
                style={{ minWidth: '120px' }}
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RECOMMENDATION (ASLI, TIDAK DIUBAH) ================= */}
      <section className="recommendations py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4 fw-semibold text-gold">
            Recommended for You
          </h2>

          <div className="row">
            {recommendations.map((item) => (
              <div key={item.id} className="col-6 col-md-3 mb-4">
                <div
                  className="card h-100"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <img src={item.img} className="card-img-top" alt={item.name} />
                  <div className="card-body">
                    <h6 className="card-title">{item.name}</h6>
                    <p className="fw-bold text-gold">{item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="text-center py-4 bg-white border-top">
        <p className="mb-0 text-muted">
          © 2025 Laudepedia Beauty. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
};

export default BeautyPage;
