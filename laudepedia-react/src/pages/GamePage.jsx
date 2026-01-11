import React, { useState, useEffect, useRef } from 'react';
import '../css/Game.css';

const Game = () => {
  const [spinning, setSpinning] = useState(false);
  const [prize, setPrize] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [balance, setBalance] = useState(100);
  const [isFlicking, setIsFlicking] = useState(false);
  
  const wheelRef = useRef(null);
  const lastNailRef = useRef(0);

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

  // REAL-TIME NAIL COLLISION DETECTION
  useEffect(() => {
    let frameId;
    
    const checkPhysics = () => {
      if (!wheelRef.current) return;

      // Get current rotation angle from the CSS animation
      const style = window.getComputedStyle(wheelRef.current);
      const matrix = new WebKitCSSMatrix(style.transform);
      const angle = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);
      const normalizedAngle = angle < 0 ? angle + 360 : angle;

      // 20 nails = one nail every 18 degrees
      const currentNail = Math.floor(normalizedAngle / 18);
      
      if (currentNail !== lastNailRef.current) {
        setIsFlicking(true);
        // Instant flick duration
        setTimeout(() => setIsFlicking(false), 40); 
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

    // Calculate a target that is at least 8 full spins away
    const extraRotation = (360 * 8) + Math.floor(Math.random() * 360);
    const newRotation = rotation + extraRotation;
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      const finalAngle = newRotation % 360;
      // Reverse calculation to find which slice landed at the top (arrow is at 0 degrees)
      const index = Math.floor(((360 - finalAngle) % 360) / 18);
      setPrize(options[index]);
      setBalance(prev => prev + options[index].value);
    }, 5000);
  };

  return (
    <div className="game-page">
      <div className="game-card">
        <h1 className="logo">LAUDEPEDIA</h1>
        <div className="balance-pill">💰 <strong>{balance} Coins</strong></div>

        <div className="wheel-container">
          {/* POINTER: snap-flick class triggers the physical 'kick' */}
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
                <div className="wheel-label" style={{ transform: `rotate(${i * 18 + 9}deg)` }}>
                  <span>{opt.label}</span>
                </div>
                {/* Visual nails placed exactly between slices */}
                <div className="wheel-nail" style={{ transform: `rotate(${i * 18}deg)` }}></div>
              </React.Fragment>
            ))}
          </div>
          <div className="wheel-center"></div>
        </div>

        <button onClick={handleSpin} className="spin-btn" disabled={spinning}>
          {spinning ? 'GOOD LUCK...' : 'SPIN (10 COINS)'}
        </button>

        <div className="prize-area">
          {prize && (
            <h2 className={prize.value > 0 ? 'win' : 'lose'}>
              {prize.value > 0 ? `+${prize.value} Coins!` : 'Bust!'}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;