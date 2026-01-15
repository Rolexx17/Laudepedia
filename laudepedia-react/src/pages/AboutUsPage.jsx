import React from 'react';
import '../css/About.css';

const AboutUsPage = () => {
  return (
    <div className="about-container d-flex flex-column align-items-center justify-content-center">

      <h1 className="brand">Laudepedia</h1>
      <h2 className="tagline">Where Elegance Meets Technology</h2>

      <p className="desc">
        Laudepedia is an e-commerce platform that blends sophistication with simplicity.
        We believe true beauty lies in details — from product presentation to user experience.
        Every interaction is designed to evoke a sense of warmth, exclusivity, and modern comfort.
      </p>

      <div className="mission-box">
        <h3>Our Mission</h3>
        <p>
          To become the most trusted online destination for premium lifestyle products —
          where quality, design, and comfort come together seamlessly, accessible to everyone.
        </p>
        <ul className="detail-list">
          <li>Deliver premium quality with integrity.</li>
          <li>Ensure accessibility for all modern consumers.</li>
          <li>Promote sustainability in lifestyle choices.</li>
        </ul>
      </div>

      <div className="vision-box">
        <h3>Our Vision</h3>
        <p>
          To elevate digital shopping into an experience of grace and confidence,
          combining aesthetic pleasure with effortless usability.
        </p>
        <ul className="detail-list">
          <li>Redefine online elegance through technology.</li>
          <li>Create a harmonious balance between beauty and function.</li>
          <li>Inspire confidence in every customer interaction.</li>
        </ul>
      </div>

      <table className="info-table">
        <tbody>
          <tr>
            <td>Founded By</td>
            <td>Cumlaude Soon Team</td>
          </tr>
          <tr>
            <td>Core Values</td>
            <td>Elegance, Innovation, and Trust</td>
          </tr>
          <tr>
            <td>Main Service</td>
            <td>Curated Premium Lifestyle Products</td>
          </tr>
        </tbody>
      </table>

      <footer className="footer">
        <p>© 2025 Laudepedia. Crafted with elegance.</p>
      </footer>

    </div>
  );
};

export default AboutUsPage;
    