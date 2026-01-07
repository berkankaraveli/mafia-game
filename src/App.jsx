import React, { useState, useRef } from 'react';
import './App.css';
import cardBack from './assets/cards.png';
import cardFront from './assets/cards1.png';

function App() {
  // Състояния (State)
  const [phase, setPhase] = useState('idle'); // idle, spinning, selected, reveal
  const [resultText, setResultText] = useState('');
  const [showResult, setShowResult] = useState(false);

  // Референции (Refs) за анимациите
  const carouselRef = useRef(null);
  const indicatorRef = useRef(null);
  const mainCardRef = useRef(null);
  const frontSideRef = useRef(null);
  const particleContainerRef = useRef(null);

  const cardStep = 180; // 150px + 30px gap

  const startSequence = () => {
    setPhase('spinning');
    setShowResult(false);
    setResultText('');
    
    let currentX = 0;
    const duration = 8000;
    const initialSpeed = 16;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;

      if (progress < 1) {
        const easeOut = 1 - Math.pow(progress, 2);
        const speed = easeOut * initialSpeed + 1.5;
        currentX -= speed;
        if (carouselRef.current) {
          carouselRef.current.style.transform = `translateX(${currentX - 90}px)`;
        }
        requestAnimationFrame(animate);
      } else {
        const snappedX = Math.round(currentX / cardStep) * cardStep;
        if (carouselRef.current) {
          carouselRef.current.style.transition = "transform 1.5s cubic-bezier(0.1, 1, 0.1, 1)";
          carouselRef.current.style.transform = `translateX(${snappedX - 90}px)`;
        }

        setTimeout(() => {
          setPhase('selected');
          // Glow ефект чрез референция
          const centerIndex = Math.abs(snappedX / cardStep);
          const cards = carouselRef.current.children;
          if (cards[centerIndex]) {
            cards[centerIndex].style.boxShadow = "0 0 50px #ff0000";
            cards[centerIndex].style.border = "3px solid #ff0000";
          }

          setTimeout(() => {
            setPhase('reveal');
            createExplosion();
            startCardSpin();
          }, 1500);
        }, 1000);
      }
    };
    animate();
  };

  const startCardSpin = () => {
    let angle = 0;
    let rotationSpeed = 60;
    let blur = 25;
    let bright = 4;

    const spin = () => {
      angle += rotationSpeed;
      rotationSpeed *= 0.982;
      if (blur > 0) blur -= 0.18;
      if (bright > 1) bright -= 0.03;

      if (mainCardRef.current && frontSideRef.current) {
        mainCardRef.current.style.transform = `rotateY(${angle}deg)`;
        frontSideRef.current.style.filter = `brightness(${bright}) blur(${Math.max(0, blur)}px)`;
      }

      if (rotationSpeed > 0.2) {
        requestAnimationFrame(spin);
      } else {
        const finalAngle = Math.round(angle / 360) * 360;
        mainCardRef.current.style.transition = "transform 1.2s cubic-bezier(0.2, 0.5, 0.3, 1)";
        mainCardRef.current.style.transform = `rotateY(${finalAngle}deg)`;
        frontSideRef.current.style.filter = `brightness(1) blur(0px)`;

        setTimeout(() => {
          setResultText('Тази нощ си "СТРАЖ"');
          setShowResult(true);
        }, 1000);
      }
    };
    spin();
  };

  const createExplosion = () => {
    for (let i = 0; i < 50; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      particleContainerRef.current.appendChild(p);

      const angle = Math.random() * Math.PI * 2;
      const dist = 500 + Math.random() * 900;

      p.animate([
        { transform: 'translate(-50%, -50%) rotate(0deg) scale(1.2)', opacity: 1 },
        { transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) rotate(${Math.random() * 1000}deg) scale(0)`, opacity: 0 }
      ], { duration: 1800, easing: 'ease-out' });

      setTimeout(() => p.remove(), 1800);
    }
  };

  return (
    <div className="App">
      <div id="particle-container" ref={particleContainerRef}></div>

      {/* Индикаторът се показва само при въртене и избор */}
      {(phase === 'spinning' || phase === 'selected') && (
        <div className={`indicator ${phase === 'selected' ? 'active' : ''}`} id="main-indicator">▼</div>
      )}

      {/* Карусел */}
      {(phase === 'spinning' || phase === 'selected') && (
        <div id="carousel-wrapper">
          <div className="carousel-viewport">
            <div className="carousel" ref={carouselRef}>
              {[...Array(150)].map((_, i) => (
                <div key={i} className="carousel-card"></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Резултатна карта */}
      {phase === 'reveal' && (
        <div id="main-card-viewport">
          <div className={`result-text ${showResult ? 'visible' : ''}`}>{resultText}</div>
          <div className="card" ref={mainCardRef}>
            <div className="side front" ref={frontSideRef}>
              <img src={cardFront} alt="Front" />
            </div>
            <div className="side back">
              <img src={cardBack} alt="Back" />
            </div>
          </div>
        </div>
      )}

      {phase === 'idle' && (
        <button id="play-button" onClick={startSequence}>ИГРАЙ</button>
      )}
    </div>
  );
}

export default App;