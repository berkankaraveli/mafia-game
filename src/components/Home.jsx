// src/components/Home.jsx
import React from 'react';
// Увери се, че пътят е верен спрямо твоята структура
import AvatarCreator from './AvatarCreator'; 
import './Home.css';

const Home = ({ user, avatar, onStartGame }) => {
  // (XP изчисленията вече не ни трябват тук, но ги оставяме, ако потрябват другаде)
  // const xpPercentage = user.level > 0 ? (user.xp / (user.level * 200)) * 100 : 0;

  return (
    <div className="home-screen">
      {/* --- ЛЯВ ПАНЕЛ (БУТОНИ) --- */}
      <div className="home-panel left-panel">
        <button className="big-play-btn" onClick={onStartGame}>
          ИГРАЙ
        </button>

        <div className="menu-buttons-container">
          <button className="big-play-btn">МАГАЗИН</button>
          <button className="big-play-btn">ИНВЕНТАР</button>
          <button className="big-play-btn">РОЛИ</button>
          <button className="big-play-btn">ГИЛДИЯ</button>
        </div>
      </div>

      {/* --- ЦЕНТРАЛЕН ПАНЕЛ (АВАТАР) --- */}
      <div className="home-panel center-panel">
        <AvatarCreator selections={avatar} />
      </div>

      {/* --- ДЕСЕН ПАНЕЛ (САМО МИСИИ ВЪРХУ СВИТЪК) --- */}
      <div className="home-panel right-panel">
        {/* ИЗТРИХМЕ .profile-card ОТ ТУК */}

        <div className="missions-list">
          <h4>МИСИИ ЗА ДЕНЯ</h4>
          {/* Добавих още малко примерни, за да запълним свитъка */}
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