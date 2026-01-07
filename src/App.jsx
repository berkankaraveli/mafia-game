// App.jsx
import React, { useState, useRef } from 'react';
import './App.css';

// Компоненти
import Home from './components/Home.jsx'; // Добавено .jsx разширение за яснота
import Indicator from './components/Indicator';
import Carousel from './components/Carousel';
import RevealCard from './components/RevealCard';
import Explosion from './components/Explosion';
import { createExplosion } from './utils/effects';

// Роли - ИМПОРТИ (Без промяна)
import chernostraj from '/assets/chernostraj.png';
import chumar from '/assets/chumar.png';
import gadatelka from '/assets/gadatelka.png';
import glavorez from '/assets/glavorez.png';
import kasapin from '/assets/kasapin.png';
import kovach from '/assets/kovach.png';
import lechitel from '/assets/lechitel.png';
import nadziratel from '/assets/nadziratel.png';
import naslednik from '/assets/naslednik.png';
import omainik from '/assets/omainik.png';
import otrovitel from '/assets/otrovitel.png';
import palach from '/assets/palach.png';
import pastir from '/assets/pastir.png';
import piroman from '/assets/piroman.png';
import prelomnik from '/assets/prelomnik.png';
import sledotursach from '/assets/sledotursach.png';
import stareishina from '/assets/stareishina.png';
import straj from '/assets/straj.png';
import strelec from '/assets/strelec.png';
import svatovnik from '/assets/svatovnik.png';
import tumnichar from '/assets/tumnichar.png';

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
  const [phase, setPhase] = useState('home'); 
  const [selectedRole, setSelectedRole] = useState(null);
  const [showResult, setShowResult] = useState(false);
  
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mafia_user');
    return saved ? JSON.parse(saved) : { name: 'Играч 1', level: 1, xp: 0, totalSpins: 0 };
  });

  // --- АКТУАЛИЗИРАН АВАТАР СТЕЙТ ---
  // Това са данните, които AvatarCreator.jsx очаква.
  // ЗАМЕНИ ПЪТИЩАТА С ТВОИТЕ РЕАЛНИ PNG ФАЙЛОВЕ!
  const [avatar, setAvatar] = useState({
    body: '/assets/tqlo.png', // Основа на главата
    eyes: '/assets/ochi.png',       // Очи
    eyebrows: '/assets/vejdi.png', // Вежди
    nose: '/assets/nos.png',   // Нос
    mouth: '/assets/usta.png',        // Уста
    hair: '/assets/kosa.png'      // Коса
  });

  const carouselRef = useRef(null);
  const mainCardRef = useRef(null);
  const frontSideRef = useRef(null);
  const particleContainerRef = useRef(null);

  const cardStep = 230;

  const addXP = (amount) => {
    setUser(prev => {
      let newXP = prev.xp + amount;
      let newLevel = prev.level;
      if (newXP >= prev.level * 200) { newXP -= prev.level * 200; newLevel++; }
      const updated = { ...prev, xp: newXP, level: newLevel, totalSpins: prev.totalSpins + 1 };
      localStorage.setItem('mafia_user', JSON.stringify(updated));
      return updated;
    });
  };

  // --- ЛОГИКА ЗА ИГРАТА (Без промяна) ---
  const handleStartGame = () => {
    const randomRole = ROLES[Math.floor(Math.random() * ROLES.length)];
    setSelectedRole(randomRole);
    setPhase('spinning');
    setShowResult(false);
    
    setTimeout(() => {
      if (carouselRef.current) {
        carouselRef.current.querySelectorAll('.carousel-card').forEach(c => c.classList.remove('active-glow'));
      }
      runCarouselAnimation();
    }, 100);
  };

  const runCarouselAnimation = () => {
    let currentX = 0;
    const duration = 8000;
    const initialSpeed = 22; 
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;

      if (progress < 1) {
        const easeOut = 1 - Math.pow(progress, 2);
        const speed = easeOut * initialSpeed + 1.5;
        currentX -= speed;
        if (carouselRef.current) carouselRef.current.style.transform = `translateX(${currentX - 115}px)`;
        requestAnimationFrame(animate);
      } else {
        const snappedX = Math.round(currentX / cardStep) * cardStep;
        if (carouselRef.current) {
          carouselRef.current.style.transition = "transform 1.5s cubic-bezier(0.1, 1, 0.1, 1)";
          carouselRef.current.style.transform = `translateX(${snappedX - 115}px)`;
          setTimeout(() => {
            const cards = carouselRef.current.querySelectorAll('.carousel-card');
            const centerIndex = Math.abs(snappedX / cardStep) % cards.length;
            if (cards[centerIndex]) cards[centerIndex].classList.add('active-glow');
          }, 1000);
        }
        setTimeout(() => {
          setPhase('selected');
          setTimeout(() => {
            setPhase('reveal');
            createExplosion(particleContainerRef);
            startCardSpin();
          }, 1000);
        }, 2000);
      }
    };
    animate();
  };

  const startCardSpin = () => {
    let angle = 0;
    let rotationSpeed = 65;
    let blurVal = 25;
    let brightVal = 4;

    const spin = () => {
      angle += rotationSpeed;
      rotationSpeed *= 0.982;
      if (blurVal > 0) blurVal -= 0.22;
      if (brightVal > 1) brightVal -= 0.035;

      if (mainCardRef.current && frontSideRef.current) {
        mainCardRef.current.style.transform = `rotateY(${angle}deg)`;
        frontSideRef.current.style.filter = `brightness(${brightVal}) blur(${Math.max(0, blurVal)}px)`;
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
        setTimeout(() => { setShowResult(true); addXP(50); }, 1000);
      }
    };
    spin();
  };

  return (
    <div className="App">
      <Explosion ref={particleContainerRef} />

      {phase === 'home' && (
        <Home user={user} avatar={avatar} onStartGame={handleStartGame} />
      )}

      {(phase === 'spinning' || phase === 'selected') && (
        <>
          <Indicator phase={phase} />
          <Carousel ref={carouselRef} />
        </>
      )}

      {phase === 'reveal' && (
        <div className="reveal-overlay">
          <RevealCard 
            ref={{ mainCardRef, frontSideRef }} 
            showResult={showResult} 
            resultText={`Тази нощ си "${selectedRole?.name}"`} 
            roleImage={selectedRole?.image}
          />
          {showResult && (
            <button className="back-lobby-btn" onClick={() => setPhase('home')}>
              ОБРАТНО В ЛОБИТО
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;