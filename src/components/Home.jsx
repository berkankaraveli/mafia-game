// src/components/Home.jsx

import React, { useState } from 'react';
import AvatarCreator from './AvatarCreator';
import TopBar from './TopBar';
import './Home.css';

const Home = ({ user, avatar }) => {
  const [isScrollOpen, setIsScrollOpen] = useState(false);

  const toggleScroll = () => {
    setIsScrollOpen(!isScrollOpen);
  };

  return (
    <div className="home-screen" style={{position: 'relative'}}>
      <TopBar user={user} />

      {/* ЛЯТЯЩО ЛОГО */}
      <img 
          src="/assets/logobg2.png" 
          alt="Заговорът Лого" 
          className="floating-logo" 
      />

      {/* --- ЛЯВ ПАНЕЛ --- */}
      <div className="home-panel left-panel">
        {/* АНИМИРАН СВИТЪК */}
        {/* Тъй като вече е абсолютно позициониран, няма значение в кой панел е,
            но го оставяме тук за структура. */}
        <div 
            // Махнахме title атрибута, защото ще ползваме къстъм tooltip
            className={`scroll-container ${isScrollOpen ? 'open' : 'closed'}`}
            onClick={toggleScroll}
        >
            {isScrollOpen ? (
                // --- СЪДЪРЖАНИЕ КОГАТО Е ОТВОРЕН (Без промяна) ---
                <div className="scroll-content open-content">
                    <h4>МИСИИ ЗА ДЕНЯ</h4>
                    <div className="mission-item">1. Изиграй 1 игра</div>
                    <div className="mission-item">2. Промени аватара си</div>
                    <div className="mission-item">3. Посети оръжейния магазин</div>
                    <div className="mission-item">4. Разгледай новите роли</div>
                    <div className="mission-item">5. Влез в гилдия</div>
                </div>
            ) : (
                // --- СЪДЪРЖАНИЕ КОГАТО Е ЗАТВОРЕН (СЕГА Е ПРАЗНО) ---
                // Този div остава, но е празен. Текстът ще идва от CSS при hover.
                <div className="scroll-content closed-content"></div>
            )}
        </div>
      </div>

      {/* --- ЦЕНТРАЛЕН ПАНЕЛ (АВАТАР) --- */}
      <div className="home-panel center-panel">
        <AvatarCreator selections={avatar} />
      </div>

      {/* --- ДЕСЕН ПАНЕЛ --- */}
      <div className="home-panel right-panel"></div>
    </div>
  );
};

export default Home;