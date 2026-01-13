import React, { useState, useEffect, useRef } from 'react';
import '../css/Game.css';

const Game = () => {
  // 1. Ambil User Data untuk kunci penyimpanan saldo
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // 2. Inisialisasi State Balance dengan Logic LocalStorage
  const [balance, setBalance] = useState(() => {
    if (!currentUser) return 100; // Default jika belum login (fallback)
    const savedBalance = localStorage.getItem(`balance_${currentUser.email}`);
    // Jika ada savedBalance, pakai itu. Jika tidak, modal awal 100.
    return savedBalance !== null ? parseInt(savedBalance, 10) : 100;
  });

  const [spinning, setSpinning] = useState(false);
  const [prize, setPrize] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [isFlicking, setIsFlicking] = useState(false);
  
  const wheelRef = useRef(null);
  const lastNailRef = useRef(0);

  // List Hadiah
  const options = [
    { label: '500 Coins', value: 500 }, { label: '5 Coins', value: 5 },
    { label: '50 Coins', value: 50 }, { label: '0', value: 0 },
    { label: '100 Coins', value: 100 }, { label: '10 Coins', value: 10 },
    { label: '20 Coins', value: 20 }, { label: '2 Coins', value: 2 },
    { label: '250 Coins', value: 250 }, { label: '0', value: 0 },
    { label: '75 Coins', value: 75 }, { label: '5 Coins', value: 5 },
    { label: '150 Coins', value: 150 }, { label: '10 Coins', value: 10 },
    { label: '20 Coins', value: 20 }, { label: '0', value: 0 },
    { label: '300 Coins', value: 300 }, { label: '5 Coins', value: 5 },
    { label: '40 Coins', value: 40 }, { label: 'Lucky 7', value: 77 },
  ];

  // 3. Effect: Cek Login (Security)
  useEffect(() => {
    if (!currentUser) {
      window.location.href = '/login';
    }
  }, [currentUser]);

  // 4. Effect: Auto-Save Balance setiap berubah
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`balance_${currentUser.email}`, balance.toString());
    }
  }, [balance, currentUser]);

  // 5. Effect: Real-time Physics (Deteksi paku menabrak jarum)
  useEffect(() => {
    let frameId;
    
    const checkPhysics = () => {
      if (!wheelRef.current) return;

      // Ambil sudut rotasi saat ini dari CSS transform
      const style = window.getComputedStyle(wheelRef.current);
      const matrix = new WebKitCSSMatrix(style.transform);
      const angle = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);
      const normalizedAngle = angle < 0 ? angle + 360 : angle;

      // Ada 20 paku, berarti 1 paku setiap 18 derajat
      const currentNail = Math.floor(normalizedAngle / 18);
      
      // Jika berpindah segmen, trigger animasi 'flick' pada jarum
      if (currentNail !== lastNailRef.current) {
        setIsFlicking(true);
        setTimeout(() => setIsFlicking(false), 40); 
        lastNailRef.current = currentNail;
      }

      frameId = requestAnimationFrame(checkPhysics);
    };

    if (spinning) frameId = requestAnimationFrame(checkPhysics);
    return () => cancelAnimationFrame(frameId);
  }, [spinning]);

  // 6. Logic Putaran Roda
  const handleSpin = () => {
    if (spinning || balance < 10) return;
    
    setSpinning(true);
    setPrize(null);
    setBalance(prev => prev - 10); // Bayar 10 koin

    // Kalkulasi target putaran (minimal 8 putaran penuh + random landing)
    const extraRotation = (360 * 8) + Math.floor(Math.random() * 360);
    const newRotation = rotation + extraRotation;
    setRotation(newRotation);

    // Tunggu animasi CSS selesai (5 detik)
    setTimeout(() => {
      setSpinning(false);
      const finalAngle = newRotation % 360;
      
      // Hitung slice mana yang ada di posisi jam 12 (0 derajat)
      // Karena roda berputar searah jarum jam, indeks dihitung mundur
      const index = Math.floor(((360 - finalAngle) % 360) / 18);
      
      const wonPrize = options[index];
      setPrize(wonPrize);
      setBalance(prev => prev + wonPrize.value); // Tambah hadiah ke saldo
    }, 5000);
  };

  return (
    <div className="game-page">
      <div className="game-card">
        <h1 className="logo">LAUDEPEDIA</h1>
        
        {/* Balance Display */}
        <div className="balance-pill">
          💰 <strong>{balance} Coins</strong>
        </div>

        <div className="wheel-container">
          {/* JARUM PENUNJUK: class snap-flick mentrigger animasi fisik */}
          <div className={`wheel-arrow ${isFlicking ? 'snap-flick' : ''}`}>▼</div>
          
          <div 
            ref={wheelRef}
            className="wheel-body" 
            style={{ 
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 5s cubic-bezier(0.15, 0, 0.05, 1)' : 'none'
            }}
          >
            <div className="wheel-surface"></div>
            {options.map((opt, i) => (
              <React.Fragment key={i}>
                {/* Label Slice */}
                <div className="wheel-label" style={{ transform: `rotate(${i * 18 + 9}deg)` }}>
                  <span>{opt.label}</span>
                </div>
                {/* Paku Visual di antara slice */}
                <div className="wheel-nail" style={{ transform: `rotate(${i * 18}deg)` }}></div>
              </React.Fragment>
            ))}
          </div>
          <div className="wheel-center"></div>
        </div>

        {/* Tombol Spin */}
        <button 
            onClick={handleSpin} 
            className="spin-btn" 
            disabled={spinning || balance < 10}
            style={{ opacity: balance < 10 ? 0.6 : 1 }}
        >
          {spinning ? 'GOOD LUCK...' : (balance < 10 ? 'INSUFFICIENT FUNDS' : 'SPIN (10 COINS)')}
        </button>

        {/* Pengumuman Hadiah */}
        <div className="prize-area" style={{ minHeight: '50px' }}>
          {prize && !spinning && (
            <h2 className={prize.value > 0 ? 'win' : 'lose'} style={{ animation: 'popIn 0.5s' }}>
              {prize.value > 0 ? `+${prize.value} Coins!` : 'ZONK! Try Again.'}
            </h2>
          )}
        </div>
      </div>

    </div>
  );
};

export default Game;