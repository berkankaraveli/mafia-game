// src/components/Home.jsx

import React from 'react';
// Махнахме Link, защото вече не се използва тук
import AvatarCreator from './AvatarCreator';
import TopBar from './TopBar';
import './Home.css';

const Home = ({ user, avatar }) => {
  return (
    // Added position: relative for the logo positioning
    <div className="home-screen" style={{position: 'relative'}}>
      <TopBar user={user} />

      {/* --- ЛЯТЯЩО ЛОГО --- */}
      <img 
          src="/assets/logobg2.png" 
          alt="Заговорът Лого" 
          className="floating-logo" 
      />

      {/* --- ЛЯВ ПАНЕЛ (СЕГА Е ПРАЗЕН) --- */}
      <div className="home-panel left-panel">
         {/* Бутоните (Играй, Магазин и т.н.) вече са в TopBar.
             Този панел стои празен за баланс на структурата. */}
      </div>

      {/* --- ЦЕНТРАЛЕН ПАНЕЛ (АВАТАР) --- */}
      <div className="home-panel center-panel">
        <AvatarCreator selections={avatar} />
      </div>

      {/* --- ДЕСЕН ПАНЕЛ (СВИТЪК С МИСИИ) --- */}
      <div className="home-panel right-panel">
        <div className="missions-list">
            <h4>МИСИИ ЗА ДЕНЯ</h4>
            <div className="mission-item">1. Изиграй 1 игра</div>
            <div className="mission-item">2. Промени аватара си</div>
            <div className="mission-item">3. Посети оръжейния магазин</div>
            <div className="mission-item">4. Разгледай новите роли</div>
            <div className="mission-item">5. Влез в гилдия</div>
        </div>
      </div>
    </div>
  );
};

export default Home;