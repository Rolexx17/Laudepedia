import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import '../css/Item.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(item => item.id === id);

  if (!product) {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>Product not found</div>;
  }

  return (
    <div className="product-detail-page">
      {/* BACK BUTTON */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        &#8592;
      </button>

      {/* HEADER */}
      <header className="lp-header">
        <h1>Laudepedia</h1>
      </header>

      {/* MAIN CONTENT */}
      <main className="item-container">
        {/* IMAGE */}
        <div className="item-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        {/* INFO */}
        <div className="item-info">
          <h2 className="item-title">{product.name}</h2>

          <p className="item-price">
            Rp {product.price.toLocaleString('id-ID')}
          </p>

          <p className="item-description">
            {product.description.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>

          <div className="item-rating">
            ★★★★★ <span>{product.rating}/5 ({(product.reviews / 1000).toFixed(1)}k reviews)</span>
          </div>

          <div className="item-action">
            <label htmlFor="amount">Quantity:</label>
            <input type="number" id="amount" min="1" defaultValue="1" />
            <button className="buy-btn">Buy Now</button>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="lp-footer">
        © 2025 Laudepedia — Elegance in Every Choice.
      </footer>
    </div>
  );
};

export default ProductDetail;
