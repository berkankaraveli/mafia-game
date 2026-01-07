import React, { useState, useRef } from 'react';
import './App.css';

// Импорт на компоненти
import Indicator from './components/Indicator';
import Carousel from './components/Carousel';
import RevealCard from './components/RevealCard';
import Explosion from './components/Explosion';
import { createExplosion } from './utils/effects';

// Импорт на всички роли
import chernostraj from './assets/chernostraj.png';
import chumar from './assets/chumar.png';
import gadatelka from './assets/gadatelka.png';
import glavorez from './assets/glavorez.png';
import kasapin from './assets/kasapin.png';
import kovach from './assets/kovach.png';
import lechitel from './assets/lechitel.png';
import nadziratel from './assets/nadziratel.png';
import naslednik from './assets/naslednik.png';
import omainik from './assets/omainik.png';
import otrovitel from './assets/otrovitel.png';
import palach from './assets/palach.png';
import pastir from './assets/pastir.png';
import piroman from './assets/piroman.png';
import prelomnik from './assets/prelomnik.png';
import sledotursach from './assets/sledotursach.png';
import stareishina from './assets/stareishina.png';
import straj from './assets/straj.png';
import strelec from './assets/strelec.png';
import svatovnik from './assets/svatovnik.png';
import tumnichar from './assets/tumnichar.png';

const ROLES = [
  { id: 'chernostraj', name: 'Черностраж', image: chernostraj },
  { id: 'chumar', name: 'Чумар', image: chumar },
  { id: 'gadatelka', name: 'Гадателка', image: gadatelka },
  { id: 'glavorez', name: 'Главорез', image: glavorez },
  { id: 'kasapin', name: 'Касапин', image: kasapin },
  { id: 'kovach', name: 'Ковач', image: kovach },
  { id: 'lechitel', name: 'Лечител', image: lechitel },
  { id: 'nadziratel', name: 'Надзирател', image: nadziratel },
  { id: 'naslednik', name: 'Наследник', image: naslednik },
  { id: 'omainik', name: 'Омайник', image: omainik },
  { id: 'otrovitel', name: 'Отровител', image: otrovitel },
  { id: 'palach', name: 'Палач', image: palach },
  { id: 'pastir', name: 'Пастир', image: pastir },
  { id: 'piroman', name: 'Пироман', image: piroman },
  { id: 'prelomnik', name: 'Преломник', image: prelomnik },
  { id: 'sledotursach', name: 'Следотърсач', image: sledotursach },
  { id: 'stareishina', name: 'Старейшина', image: stareishina },
  { id: 'straj', name: 'Страж', image: straj },
  { id: 'strelec', name: 'Стрелец', image: strelec },
  { id: 'svatovnik', name: 'Сватовник', image: svatovnik },
  { id: 'tumnichar', name: 'Тъмничар', image: tumnichar },
];

function App() {
  const [phase, setPhase] = useState('idle');
  const [selectedRole, setSelectedRole] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const carouselRef = useRef(null);
  const mainCardRef = useRef(null);
  const frontSideRef = useRef(null);
  const particleContainerRef = useRef(null);

  const cardStep = 230; // 200px ширина + 15px ляв маржин + 15px десен маржин

  const startSequence = () => {
    const randomRole = ROLES[Math.floor(Math.random() * ROLES.length)];
    setSelectedRole(randomRole);
    setPhase('spinning');
    setShowResult(false);
    
    // Премахваме старото светене, ако има такова
    if (carouselRef.current) {
      const allCards = carouselRef.current.querySelectorAll('.carousel-card');
      allCards.forEach(c => c.classList.remove('active-glow'));
    }

    let currentX = 0;
    const duration = 8000;
    const initialSpeed = 20; 
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;

      if (progress < 1) {
        const easeOut = 1 - Math.pow(progress, 2);
        const speed = easeOut * initialSpeed + 1.5;
        currentX -= speed;
        if (carouselRef.current) {
          carouselRef.current.style.transform = `translateX(${currentX - 115}px)`;
        }
        requestAnimationFrame(animate);
      } else {
        // Изчисляваме крайната позиция (snapping)
        const snappedX = Math.round(currentX / cardStep) * cardStep;
        
        if (carouselRef.current) {
          carouselRef.current.style.transition = "transform 1.5s cubic-bezier(0.1, 1, 0.1, 1)";
          carouselRef.current.style.transform = `translateX(${snappedX - 115}px)`;

          // ЛОГИКА ЗА СВЕТВАНЕТО
          setTimeout(() => {
            const cards = carouselRef.current.querySelectorAll('.carousel-card');
            // Намираме коя карта е точно под индикатора
            const centerIndex = Math.abs(snappedX / cardStep);
            if (cards[centerIndex]) {
              cards[centerIndex].classList.add('active-glow');
            }
          }, 1000); // Изчакваме спирането на прехода
        }

        setTimeout(() => {
          setPhase('selected');
          setTimeout(() => {
            setPhase('reveal');
            createExplosion(particleContainerRef);
            startCardSpin();
          }, 1000);
        }, 2000); // Малко повече време, за да се види светлинния ефект
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
        setTimeout(() => setShowResult(true), 1000);
      }
    };
    spin();
  };

  return (
    <div className="App">
      <Explosion ref={particleContainerRef} />
      {(phase === 'spinning' || phase === 'selected') && <Indicator phase={phase} />}
      {(phase === 'spinning' || phase === 'selected') && <Carousel ref={carouselRef} />}
      {phase === 'reveal' && (
        <RevealCard 
          ref={{ mainCardRef, frontSideRef }} 
          showResult={showResult} 
          resultText={`Тази нощ си "${selectedRole?.name}"`} 
          roleImage={selectedRole?.image}
        />
      )}
      {phase === 'idle' && <button id="play-button" onClick={startSequence}>ИГРАЙ</button>}
    </div>
  );
}

export default App;