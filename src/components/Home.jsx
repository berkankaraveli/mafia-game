// src/components/Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import AvatarCreator from './AvatarCreator';
import TopBar from './TopBar';
import './Home.css';

const Home = ({ user, avatar }) => {
  return (
    // Трябва да добавим position: relative тук, за да може логото да се позиционира спрямо този контейнер
    <div className="home-screen" style={{position: 'relative'}}> 
      <TopBar user={user} />

      {/* --- НОВО: ЛОГОТО Е ТУК, ИЗВЪН ПАНЕЛИТЕ --- */}
      <img 
          src="/assets/logobg2.png" 
          alt="Заговорът Лого" 
          className="floating-logo" 
      />
      {/* ------------------------------------------ */}


      {/* --- ЛЯВ ПАНЕЛ --- */}
      <div className="home-panel left-panel">
        {/* ... (кодът си е същия) ... */}
          <Link to="/game" className="big-play-btn" style={{textDecoration: 'none'}}>ИГРАЙ</Link>
          <div className="menu-buttons-container">
            <Link to="/shop" className="big-play-btn" style={{textDecoration: 'none'}}>МАГАЗИН</Link>
            <Link to="/inventory" className="big-play-btn" style={{textDecoration: 'none'}}>ИНВЕНТАР</Link>
            <Link to="/roles" className="big-play-btn" style={{textDecoration: 'none'}}>РОЛИ</Link>
            <Link to="/guild" className="big-play-btn" style={{textDecoration: 'none'}}>ГИЛДИЯ</Link>
        </div>
      </div>

      {/* --- ЦЕНТРАЛЕН ПАНЕЛ (НЕ ГО ПИПАМЕ!) --- */}
      <div className="home-panel center-panel">
        <AvatarCreator selections={avatar} />
      </div>

      {/* --- ДЕСЕН ПАНЕЛ --- */}
      <div className="home-panel right-panel">
         {/* ... (кодът си е същия) ... */}
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