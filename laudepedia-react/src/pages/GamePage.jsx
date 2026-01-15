import React, { useState, useEffect, useRef } from 'react';
import { calculateNewRotation, getWinningPrize } from '../js/gameLogic'; 
import '../css/Game.css';

/**
 * GAME COMPONENT (Lucky Wheel)
 * Fitur permainan roda keberuntungan untuk memenangkan coin dengan sistem taruhan.
 * * * State:
 * - balance: Number - Saldo coin user yang disimpan per-email di LocalStorage.
 * - spinning: Boolean - Status apakah roda sedang dalam proses berputar.
 * - prize: Object - Menyimpan data hadiah yang didapat { label: string, value: number }.
 * - rotation: Number - Total derajat rotasi CSS untuk memutar roda.
 * - isFlicking: Boolean - Trigger animasi visual jarum (flicker) saat menyentuh paku roda.
 * * * Functions & Logic:
 * - checkPhysics: Menggunakan requestAnimationFrame untuk mendeteksi posisi paku terhadap jarum secara real-time.
 * - handleSpin: Mengurangi saldo (10 coins), menghitung rotasi baru, dan menentukan pemenang setelah 5 detik.
 * - useEffect (Balance): Melakukan sinkronisasi otomatis antara state balance dan LocalStorage.
 */

const Game = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const [balance, setBalance] = useState(() => {
    if (!currentUser) return 10000000;
    const savedBalance = localStorage.getItem(`balance_${currentUser.email}`);
    return savedBalance !== null ? parseInt(savedBalance, 10) : 10000000;
  });

  const [spinning, setSpinning] = useState(false);
  const [prize, setPrize] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [isFlicking, setIsFlicking] = useState(false);
  
  const wheelRef = useRef(null);
  const lastNailRef = useRef(0);

  const options = [
    { label: '500k', value: 500000 }, { label: '5k', value: 5000 },
    { label: '50k', value: 50000 }, { label: '0', value: 0 },
    { label: '100k', value: 100000 }, { label: '10k', value: 10000 },
    { label: '20k', value: 20000 }, { label: '2k', value: 2000 },
    { label: '250k', value: 250000 }, { label: '0', value: 0 },
    { label: '75k', value: 75000 }, { label: '5k', value: 5000 },
    { label: '150k', value: 150000 }, { label: '10k', value: 10000 },
    { label: '20k', value: 20000 }, { label: '0', value: 0 },
    { label: '300k', value: 300000 }, { label: '5k', value: 5000 },
    { label: '40k', value: 40000 }, { label: 'Lucky 7', value: 7777777 },
  ];

  useEffect(() => {
    if (!currentUser) window.location.href = '/login';
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`balance_${currentUser.email}`, balance.toString());
    }
  }, [balance, currentUser]);

  // PHYSICS: Animasi Jarum (Flicker)
  useEffect(() => {
    let frameId;
    const checkPhysics = () => {
      if (!wheelRef.current) return;
      const style = window.getComputedStyle(wheelRef.current);
      const matrix = new WebKitCSSMatrix(style.transform);
      const angle = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);
      const normalizedAngle = angle < 0 ? angle + 360 : angle;

      const currentNail = Math.floor(normalizedAngle / 18);
      if (currentNail !== lastNailRef.current) {
        setIsFlicking(true);
        setTimeout(() => setIsFlicking(false), 30); // Flick lebih cepat & tajam
        lastNailRef.current = currentNail;
      }
      frameId = requestAnimationFrame(checkPhysics);
    };

    if (spinning) frameId = requestAnimationFrame(checkPhysics);
    return () => cancelAnimationFrame(frameId);
  }, [spinning]);

  const handleSpin = () => {
    if (spinning || balance < 10) return;
    
    setSpinning(true);
    setPrize(null);
    setBalance(prev => prev - 10);

    const newRotation = calculateNewRotation(rotation);
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      const wonPrize = getWinningPrize(newRotation, options);
      setPrize(wonPrize);
      setBalance(prev => prev + wonPrize.value);
    }, 5000);
  };

  return (
    <div className="game-page" style={{ paddingTop: '80px' }}>
      <div className={`game-card ${spinning ? 'card-shake' : ''}`}>
        <h1 className="logo">LAUDEPEDIA</h1>
        
        <div className="balance-pill">
          💰 <strong>{balance.toLocaleString()} Coins</strong>
        </div>

        <div className="wheel-container">
          <div className={`wheel-arrow ${isFlicking ? 'snap-flick' : ''}`}>▼</div>
          
          <div 
            ref={wheelRef}
            className="wheel-body" 
            style={{ 
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 5s cubic-bezier(0.15, 0, 0, 1)' : 'none'
            }}
          >
            <div className="wheel-surface"></div>
            {options.map((opt, i) => (
              <React.Fragment key={i}>
                <div className="wheel-label" style={{ transform: `rotate(${i * 18 + 9}deg)` }}>
                  <span>{opt.label}</span>
                </div>
                <div className="wheel-nail" style={{ transform: `rotate(${i * 18}deg)` }}></div>
              </React.Fragment>
            ))}
          </div>
          <div className="wheel-center"></div>
        </div>

        <button 
            onClick={handleSpin} 
            className={`spin-btn ${spinning ? 'btn-active' : ''}`} 
            disabled={spinning || balance < 10}
        >
          {spinning ? 'GOOD LUCK...' : (balance < 10 ? 'INSUFFICIENT FUNDS' : 'SPIN (10 COINS)')}
        </button>

        <div className="prize-area">
          {prize && !spinning && (
            <h2 className={`prize-text ${prize.value > 0 ? 'win' : 'lose'}`}>
              {prize.value > 0 ? `+${prize.value.toLocaleString()} Coins!` : 'ZONK! Try Again.'}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;