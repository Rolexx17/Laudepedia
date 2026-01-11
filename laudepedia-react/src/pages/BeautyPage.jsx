import React from 'react';
import { useNavigate } from 'react-router-dom';

const FashionPage = () => {
  const navigate = useNavigate();

  /* ================= TRENDING ================= */
  const trendingFashion = [
    { id: 'b1', name: 'EDWIN Classic Faded Denim Jacket', price: 'Rp 1.200.000', img: '/resources/B1.jpg' },
    { id: 'b2', name: 'Abstract Teal Oversized Knit Sweater', price: 'Rp 950.000', img: '/resources/B2.jpg' },
    { id: 'b3', name: 'Virgil Abloh™ Black Varsity Jacket', price: 'Rp 2.500.000', img: '/resources/B3.jpg' },
    { id: 'b4', name: 'Dark Denim Jacket with Faux Fur Lining', price: 'Rp 1.800.000', img: '/resources/B4.jpg' },
    { id: 'b5', name: 'Street Graphic Black Long-Sleeve Tee', price: 'Rp 600.000', img: '/resources/B5.jpg' },
    { id: 'b6', name: 'Stüssy Cream Knit Logo Vest', price: 'Rp 1.400.000', img: '/resources/B6.jpg' },
  ];

  /* ================= STORES ================= */
  const stores = [
    'GAUDI', 'HUGO', 'LOONY', 'EXIT', 'MONOGRAM',
    'NEWWAVE', 'LAUFE', 'PHOEBES', 'ZASTIN',
    'CHOMA', 'SIXSEVEN', 'SILENE'
  ];

  /* ================= RECOMMENDATION ================= */
  const recommendations = [
    { id: 'b9', name: 'White Puff-Sleeve Ribbon Mini Dress', price: 'Rp 550.000', img: '/resources/B9.jpg' },
    { id: 'b10', name: 'Gothic Cross Halter Crop', price: 'Rp 226.000', img: '/resources/B10.jpg' },
    { id: 'c1', name: 'Pinstripe Tailored Shorts', price: 'Rp 159.000', img: '/resources/C1.jpg' },
    { id: 'c2', name: 'Black Denim Graphic Shorts', price: 'Rp 115.000', img: '/resources/C2.jpg' },
    { id: 'c3', name: 'Classic Blue Denim Mini Skirt', price: 'Rp 96.000', img: '/resources/C3.jpg' },
    { id: 's1', name: 'Double Monk Strap Shoes', price: 'Rp 350.000', img: '/resources/S1.jpg' },
    { id: 't1', name: 'Urban Leather Shoulder Bag', price: 'Rp 125.000', img: '/resources/T1.jpg' },
    { id: 't2', name: 'Coach Vintage Handbag', price: 'Rp 180.000', img: '/resources/T2.jpg' },
  ];

  return (
    <div className="fashion-page">

      {/* ================= HERO ================= */}
      <section className="hero-section text-center py-5">
        <div className="container">
          <h1 className="fw-bold text-gold">Fashion Collection</h1>
          <p className="text-muted">Stay trendy this season with our monthly picks</p>
        </div>
      </section>

      {/* ================= TRENDING ================= */}
      <section className="trending py-5 bg-light">
        <div className="container">
          <h2 className="fw-semibold text-gold mb-3">Trending Fashion</h2>

          <div className="d-flex flex-nowrap overflow-auto pb-3">
            {trendingFashion.map((item) => (
              <div
                key={item.id}
                className="card me-3 flex-shrink-0"
                style={{ width: '180px', cursor: 'pointer' }}
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img src={item.img} className="card-img-top" alt={item.name} />
                <div className="card-body">
                  <h6 className="card-title">{item.name}</h6>
                  <p className="fw-bold text-gold">{item.price}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= STORES ================= */}
      <section className="stores py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fw-semibold text-gold mb-0">Popular Stores</h2>
            <span className="text-gold small">See All →</span>
          </div>

          <div className="d-flex flex-nowrap overflow-auto pb-3">
            {stores.map((store, index) => (
              <div
                key={index}
                className="text-center p-4 me-3 rounded bg-light flex-shrink-0"
                style={{ minWidth: '120px' }}
              >
                {store}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RECOMMENDATION ================= */}
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
          © 2025 Laudepedia Fashion. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
};

export default FashionPage;
