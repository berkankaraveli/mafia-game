import React, { useState, useRef, useCallback } from 'react';
import './App.css';

// Данни
import { ROLES } from './data/roles';

// Утилити за анимации
import { runCarouselAnimation, triggerRevealSequence } from './utils/gameAnimations';

// Компоненти
import Home from './components/Home.jsx';
import Indicator from './components/Indicator';
import Carousel from './components/Carousel';
import Explosion from './components/Explosion';
import RevealPhase from './components/RevealPhase'; // Новият компонент

function App() {
  // --- STATE ---
  const [phase, setPhase] = useState('home'); 
  const [selectedRole, setSelectedRole] = useState(null);
  const [showResult, setShowResult] = useState(false);
  
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mafia_user');
    return saved ? JSON.parse(saved) : { name: 'Играч 1', level: 1, xp: 0, totalSpins: 0 };
  });

  const [avatar, setAvatar] = useState({
    body: '/assets/tqlo.png',
    lowerFace: '/assets/dolnachast.png',
    eyes: '/assets/ochi.png',
    eyebrows: '/assets/vejdi.png',
    nose: '/assets/nos.png',
    mouth: '/assets/usta.png',
    hair: '/assets/kosa.png'
  });

  // --- REFS ---
  const carouselRef = useRef(null);
  const mainCardRef = useRef(null);
  const frontSideRef = useRef(null);
  const particleContainerRef = useRef(null);

  // --- USER LOGIC ---
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

  // --- GAME FLOW LOGIC ---

  // 1. Начало на играта
  const handleStartGame = () => {
    const randomRole = ROLES[Math.floor(Math.random() * ROLES.length)];
    setSelectedRole(randomRole);
    setPhase('spinning');
    setShowResult(false);
    
    // Зачистване на предишно светене
    if (carouselRef.current) {
        carouselRef.current.querySelectorAll('.carousel-card').forEach(c => c.classList.remove('active-glow'));
    }

    // Стартиране на анимацията на карусела (от външния файл)
    // Подаваме ref-а и функция, която да се изпълни при приключване
    setTimeout(() => {
        runCarouselAnimation(carouselRef, handleCarouselComplete);
    }, 100);
  };

  // 2. Каруселът е спрял, преминаваме към фаза "selected" и после "reveal"
  const handleCarouselComplete = useCallback(() => {
      setPhase('selected');
      // Малка пауза преди експлозията
      setTimeout(() => {
        setPhase('reveal');
        // Стартиране на експлозия и въртене на карта (от външния файл)
        triggerRevealSequence(
            particleContainerRef, 
            mainCardRef, 
            frontSideRef, 
            handleRevealComplete // Callback при край на въртенето
        );
      }, 1000);
  }, []);

  // 3. Картата се е завъртяла, показваме резултата и даваме XP
  const handleRevealComplete = useCallback(() => {
      setShowResult(true);
      addXP(50);
  }, []);

  const handleBackToLobby = () => {
      setPhase('home');
  };


  // --- RENDER ---
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
        <RevealPhase 
            ref={{ mainCardRef, frontSideRef }}
            showResult={showResult}
            selectedRole={selectedRole}
            onBackToLobby={handleBackToLobby}
        />
      )}
    </div>
  );
}

export default App;