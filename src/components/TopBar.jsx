// src/components/TopBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './TopBar.css';

const TopBar = ({ user }) => {
  // Изчисляване на XP процента
  const xpPercentage = user.level > 0 ? (user.xp / (user.level * 200)) * 100 : 0;

  return (
    <div className="top-bar">
      {/* --- ЛЯВА ЧАСТ: ВАЛУТИ --- */}
      <div className="top-bar-section left">
        <div className="currency-item gold">
          <span className="currency-icon">💰</span> {/* Замени с <img> по-късно */}
          <span className="currency-amount">{user.gold}</span>
        </div>
        <div className="currency-item diamonds">
          <span className="currency-icon">💎</span> {/* Замени с <img> по-късно */}
          <span className="currency-amount">{user.diamonds}</span>
        </div>
      </div>

      {/* --- ЦЕНТРАЛНА ЧАСТ: ЛЕВЪЛ И XP --- */}
      <div className="top-bar-section center">
        <div className="level-indicator">LEVEL {user.level}</div>
        <div className="top-xp-bar-outer">
            <div 
                className="top-xp-bar-inner" 
                style={{width: `${xpPercentage}%`}}
            ></div>
             <span className="top-xp-text">{user.xp} / {user.level * 200} XP</span>
        </div>
      </div>

      {/* --- ДЯСНА ЧАСТ: МЕНЮ ИКОНКИ --- */}
      <div className="top-bar-section right">
        {/* Засега са просто div-ове, по-късно ще ги направим Линкове */}
        <Link to="/friends" className="icon-btn" title="Приятели">
            👥
        </Link>
        <Link to="/help" className="icon-btn" title="Помощ и Контакти">
            ❓
        </Link>
        <Link to="/settings" className="icon-btn" title="Настройки">
            ⚙️
        </Link>
      </div>
    </div>
  );
};

export default TopBar;