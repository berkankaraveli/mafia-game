// src/components/Home.jsx

import React from 'react';
// Увери се, че AvatarCreator е импортиран правилно според твоята структура
// Ако дава грешка, провери дали файлът е .jsx или .js и къде се намира
import AvatarCreator from './AvatarCreator'; 
import './Home.css';

const Home = ({ user, avatar, onStartGame }) => {
  const xpPercentage = user.level > 0 ? (user.xp / (user.level * 200)) * 100 : 0;

  return (
    <div className="home-screen">
      {/* --- ЛЯВ ПАНЕЛ --- */}
      <div className="home-panel left-panel">
        {/* Главен бутон ИГРАЙ */}
        <button className="big-play-btn" onClick={onStartGame}>
          ИГРАЙ
        </button>

          <button className="big-play-btn">МАГАЗИН</button>
          <button className="big-play-btn">ИНВЕНТАР</button>
          <button className="big-play-btn">РОЛИ</button>
          <button className="big-play-btn">ГИЛДИЯ</button>

      </div>

      {/* --- ЦЕНТРАЛЕН ПАНЕЛ (Аватар) --- */}
      <div className="home-panel center-panel">
         {/* Увери се, че този компонент съществува и работи */}
        <AvatarCreator selections={avatar} />
      </div>

      {/* --- ДЕСЕН ПАНЕЛ (Профил) --- */}
      <div className="home-panel right-panel">
        <div className="profile-card">
          <h3>{user.name}</h3>
          <div className="lvl-info">LEVEL {user.level}</div>
          <div className="xp-bar-outer">
            <div 
                className="xp-bar-inner" 
                style={{width: `${xpPercentage}%`}}
            ></div>
          </div>
          <p className="xp-text">{user.xp} / {user.level * 200} XP</p>
        </div>
        <div className="missions-list">
          <h4>МИСИИ</h4>
          <div className="mission-item">Изиграй 1 игра (+50 XP)</div>
          <div className="mission-item">Промени аватара (+20 XP)</div>
        </div>
      </div>
    </div>
  );
};

export default Home;