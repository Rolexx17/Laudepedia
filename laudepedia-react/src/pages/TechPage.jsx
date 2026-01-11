import React from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';

const TechPage = () => {
  const navigate = useNavigate();

  // ambil hanya produk tech
  const techProducts = products.filter(item => item.category === 'tech');

  // bagi data
  const trendingTech = techProducts.slice(0, 6);
  const recommendations = techProducts.slice(6, 14);

  const brands = [
    'APPLE', 'SAMSUNG', 'SONY', 'ASUS', 'LENOVO',
    'DELL', 'HP', 'LOGITECH', 'RAZER',
    'XIAOMI', 'INTEL', 'NVIDIA'
  ];

  return (
    <div className="tech-page">

      {/* ================= HERO ================= */}
      <section className="hero-section text-center py-5">
        <div className="container">
          <h1 className="fw-bold text-gold">Tech Collection</h1>
          <p className="text-muted">
            Discover the latest technology and innovation
          </p>
        </div>
      </section>

      {/* ================= TRENDING ================= */}
      <section className="trending py-5 bg-light">
        <div className="container">
          <h2 className="fw-semibold text-gold mb-3">Trending Tech</h2>

          <div className="d-flex flex-nowrap overflow-auto pb-3">
            {trendingTech.map(item => (
              <div
                key={item.id}
                className="card me-3 flex-shrink-0"
                style={{ width: '180px', cursor: 'pointer' }}
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.name}
                />
                <div className="card-body">
                  <h6 className="card-title">{item.name}</h6>
                  <p className="fw-bold text-gold">
                    Rp {item.price.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= BRANDS ================= */}
      <section className="brands py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fw-semibold text-gold mb-0">Top Brands</h2>
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

      {/* ================= RECOMMENDATION ================= */}
      <section className="recommendations py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4 fw-semibold text-gold">
            Recommended for You
          </h2>

          <div className="row">
            {recommendations.map(item => (
              <div key={item.id} className="col-6 col-md-3 mb-4">
                <div
                  className="card h-100"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.name}
                  />
                  <div className="card-body">
                    <h6 className="card-title">{item.name}</h6>
                    <p className="fw-bold text-gold">
                      Rp {item.price.toLocaleString('id-ID')}
                    </p>
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
          © 2025 Laudepedia Tech. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
};

export default TechPage;
