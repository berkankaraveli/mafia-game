import React, { useState, useRef, useCallback, useEffect } from 'react';
// ВАЖНО: Импортираме useNavigate за навигация
import { useNavigate } from 'react-router-dom';

// Данни (внимавай с пътя, вече сме в папка pages)
import { ROLES } from '../data/roles';

// Утилити за анимации
import { runCarouselAnimation, triggerRevealSequence } from '../utils/gameAnimations';

// Компоненти
import Indicator from '../components/Indicator';
import Carousel from '../components/Carousel';
import RevealPhase from '../components/RevealPhase';

// Този компонент приема функцията addXP и реф-а за частиците от App.jsx
const GamePage = ({ addXP, particleCtrlRef }) => {
  const navigate = useNavigate(); // Хук за смяна на страниците

  // --- STATE ЗА ИГРАТА ---
  // Започваме директно с въртене, защото сме влезли в страницата за игра
  const [phase, setPhase] = useState('spinning');
  const [selectedRole, setSelectedRole] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // --- REFS ЗА ИГРАТА ---
  const carouselRef = useRef(null);
  const mainCardRef = useRef(null);
  const frontSideRef = useRef(null);
  // particleContainerRef ГО НЯМА ТУК, той идва като проп (particleCtrlRef)

  // --- GAME FLOW LOGIC ---

  // Използваме useEffect, за да стартираме играта веднага щом компонентът се зареди
  useEffect(() => {
    startGameSequence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startGameSequence = () => {
    const randomRole = ROLES[Math.floor(Math.random() * ROLES.length)];
    setSelectedRole(randomRole);
    setPhase('spinning');
    setShowResult(false);

    if (carouselRef.current) {
        carouselRef.current.querySelectorAll('.carousel-card').forEach(c => c.classList.remove('active-glow'));
    }

    // Стартиране на анимацията
    setTimeout(() => {
        runCarouselAnimation(carouselRef, handleCarouselComplete);
    }, 100);
  };

  // Каруселът е спрял
  const handleCarouselComplete = useCallback(() => {
      setPhase('selected');
      setTimeout(() => {
        setPhase('reveal');
        // Стартираме експлозията (чрез подадения ref) и въртенето
        triggerRevealSequence(
            particleCtrlRef, // Използваме проп-а от App.jsx
            mainCardRef,
            frontSideRef,
            handleRevealComplete
        );
      }, 1000);
  }, [particleCtrlRef]);

  // Картата се е завъртяла
  const handleRevealComplete = useCallback(() => {
      setShowResult(true);
      // Тук викаме функцията, подадена от App.jsx
      addXP(50);
  }, [addXP]);

  // Функция за бутона "ОБРАТНО В ЛОБИТО"
  const handleBackToLobby = () => {
      // Използваме react-router за връщане към началната страница (/)
      navigate('/');
  };

  return (
    <>
      {/* Показваме индикатор и карусел докато се върти */}
      {(phase === 'spinning' || phase === 'selected') && (
        <>
          <Indicator phase={phase} />
          <Carousel ref={carouselRef} />
        </>
      )}

      {/* Показваме резултата накрая */}
      {phase === 'reveal' && (
        <RevealPhase
            ref={{ mainCardRef, frontSideRef }}
            showResult={showResult}
            selectedRole={selectedRole}
            onBackToLobby={handleBackToLobby}
        />
      )}
    </>
  );
};

export default GamePage;