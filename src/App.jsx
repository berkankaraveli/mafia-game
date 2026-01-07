import React, { useState, useRef } from 'react';
import './App.css';

// Компоненти
import Indicator from './components/Indicator';
import Carousel from './components/Carousel';
import RevealCard from './components/RevealCard';
import Explosion from './components/Explosion'; // <-- Новият компонент

// Логика
import { createExplosion } from './utils/effects'; // <-- Изнесената логика

function App() {
  const [phase, setPhase] = useState('idle');
  const [resultText, setResultText] = useState('');
  const [showResult, setShowResult] = useState(false);

  const carouselRef = useRef(null);
  const mainCardRef = useRef(null);
  const frontSideRef = useRef(null);
  const particleContainerRef = useRef(null);

  const cardStep = 180;

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
          const centerIndex = Math.abs(snappedX / cardStep);
          const cards = carouselRef.current.children;
          if (cards[centerIndex]) {
            cards[centerIndex].style.boxShadow = "0 0 50px #ff0000";
            cards[centerIndex].style.border = "3px solid #ff0000";
          }

          setTimeout(() => {
            setPhase('reveal');
            // Използваме функцията от utils
            createExplosion(particleContainerRef); 
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
        if (mainCardRef.current) {
          mainCardRef.current.style.transition = "transform 1.2s cubic-bezier(0.2, 0.5, 0.3, 1)";
          mainCardRef.current.style.transform = `rotateY(${finalAngle}deg)`;
        }
        if (frontSideRef.current) frontSideRef.current.style.filter = `brightness(1) blur(0px)`;

        setTimeout(() => {
          setResultText('Тази нощ си "СТРАЖ"');
          setShowResult(true);
        }, 1000);
      }
    };
    spin();
  };

  return (
    <div className="App">
      {/* Контейнер за частици */}
      <Explosion ref={particleContainerRef} />

      {(phase === 'spinning' || phase === 'selected') && (
        <Indicator phase={phase} />
      )}

      {(phase === 'spinning' || phase === 'selected') && (
        <Carousel ref={carouselRef} />
      )}

      {phase === 'reveal' && (
        <RevealCard 
          ref={{ mainCardRef, frontSideRef }} 
          showResult={showResult} 
          resultText={resultText} 
        />
      )}

      {phase === 'idle' && (
        <button id="play-button" onClick={startSequence}>ИГРАЙ</button>
      )}
    </div>
  );
}

export default App;