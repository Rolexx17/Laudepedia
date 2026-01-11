import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Fashion.css';
import { products } from '../data/products'
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';



const HomePage = () => {
  const navigate = useNavigate();

  const handleAlert = () => {
    alert('Coming Soon!');
  };

  return (
    <>
    <Navbar />
    <div className="home-page" style={{ paddingBottom: '80px' }}>



      {/* 2. FEATURE ICONS */}
      <section className="bg-light py-3 border-bottom overflow-auto">
        <div className="d-flex justify-content-start px-3 gap-4 flex-nowrap text-center">

          <Feature icon="stars" label="VIP" onClick={handleAlert} />
          <Feature icon="controller" label="Game" onClick={() => navigate('/game')} />

          <Feature icon="bag-heart" label="Fashion" onClick={() => navigate('/fashion')} />
          <Feature icon="magic" label="Beauty" onClick={() => navigate('/beauty')} />
          <Feature icon="cpu" label="Tech" onClick={() => navigate('/tech')} />

          <Feature icon="grid" label="More" onClick={handleAlert} />
        </div>
      </section>

      {/* 3. BANNER */}
      <section className="banner-scroll py-3 overflow-auto">
        <div className="d-flex px-3 gap-3 flex-nowrap">
          <img src="/resources/128453e1-1e18-4c8f-b631-713a198eec59.jpg" className="rounded-4 shadow-sm"
            style={{ width: '280px', height: '140px', objectFit: 'cover' }} />
          <img src="/resources/16ac2a31-1777-4bb4-be25-b752342d9e8c.jpg" className="rounded-4 shadow-sm"
            style={{ width: '280px', height: '140px', objectFit: 'cover' }} />
          <img src="/resources/832817ec-0a21-4b18-a15c-befa0921fe77.jpg" className="rounded-4 shadow-sm"
            style={{ width: '280px', height: '140px', objectFit: 'cover' }} />
          <img src="/resources/9e819acf-3670-4ad3-b49b-563e272d022a.jpg" className="rounded-4 shadow-sm"
            style={{ width: '280px', height: '140px', objectFit: 'cover' }} />
          <img src="/resources/7ab3d36d-b872-4ee4-8264-32bed5b6d568.jpg" className="rounded-4 shadow-sm"
            style={{ width: '280px', height: '140px', objectFit: 'cover' }} />
          
        </div>
      </section>

      {/* 4. LAUDEVIDEO */}
      <section className="container-fluid my-3 px-3">
        <h5 className="fw-bold" style={{ color: '#bfa76a' }}>LaudeVideo</h5>
        <div className="row g-2">
          <div className="col-6">
            <video src="/resources/Oakley_-_Just_dropped_Oakley_Meta_Vanguard._These_new_Performance_AI_glasses_..._268NR0.mp4" autoPlay muted loop controls
              className="w-100 rounded-4" />
          </div>
          <div className="col-6">
            <video src="resources/New_Balance_-_Josh_Allen_Professional_QB1._JoshAllenQB_FBFpeG.mp4" autoPlay muted loop controls
              className="w-100 rounded-4" />
          </div>
        </div>
      </section>

      {/* 5. PRODUK PILIHAN */}
      <section className="container-fluid my-4 px-3">
        <h5 className="fw-bold" style={{ color: '#bfa76a' }}>Produk Pilihan</h5>

        <div className="row row-cols-2 row-cols-md-4 g-3">
          <Product img="B9.jpg" price="Rp 550.000" onClick={() => navigate('/product/b9')} />
          <Product img="T2.jpg" price="Rp 180.000" onClick={() => navigate('/product/t2')} />
          <Product img="B10.jpg" price="Rp 226.000" onClick={() => navigate('/product/b10')} />
          <Product img="S1.jpg" price="Rp 350.000" onClick={() => navigate('/product/s1')} />
          <Product img="B3.jpg" price="Rp 2.500.000" onClick={() => navigate('/product/b3')} />
          <Product img="B2.jpg" price="Rp 950.000" onClick={() => navigate('/product/b2')} />
          <Product img="C1.jpg" price="Rp 159.000" onClick={() => navigate('/product/c1')} />
          <Product img="T1.jpg" price="Rp 125.000" onClick={() => navigate('/product/t1')} />
        </div>
      </section>

    </div>
    <BottomNav />
    </>
  );
};

/* ==== COMPONENT KECIL ==== */

const Feature = ({ icon, label, onClick }) => (
  <div onClick={onClick} style={{ cursor: 'pointer', minWidth: '60px' }}>
    <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-1 shadow-sm"
      style={{ width: '50px', height: '50px', backgroundColor: '#fcf4e0', border: '1px solid #bfa76a' }}>
      <i className={`bi bi-${icon} fs-4`} style={{ color: '#bfa76a' }}></i>
    </div>
    <span style={{ fontSize: '12px', fontWeight: '500' }}>{label}</span>
  </div>
);

const Product = ({ img, price, onClick }) => (
  <div className="col" onClick={onClick} style={{ cursor: 'pointer' }}>
    <div className="card h-100 border-0 rounded-4 shadow-sm overflow-hidden">
      <img src={`/resources/${img}`} className="card-img-top"
        style={{ height: '180px', objectFit: 'cover' }} />
      <div className="p-2 text-center text-white fw-bold"
        style={{ backgroundColor: '#bfa76a' }}>{price}</div>
    </div>
  </div>
);

export default HomePage;
