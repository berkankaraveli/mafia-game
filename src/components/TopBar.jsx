// src/components/TopBar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './TopBar.css';

// --- ИМПОРТВАНЕ НА СНИМКИТЕ ЗА БУТОНИТЕ ---
import swordImg from '/assets/orujiq.png';
import chestImg from '/assets/sanduk.png';
import armorImg from '/assets/bronq.png';
import bookImg from '/assets/kniga.png';
import sealImg from '/assets/pechat.png';


const TopBar = ({ user }) => {
  const xpPercentage = user.level > 0 ? (user.xp / (user.level * 200)) * 100 : 0;

  return (
    <div className="top-bar">
      {/* --- ЛЯВА СЕКЦИЯ (БИВША ЦЕНТРАЛНА): ЛЕВЪЛ И XP --- */}
      <div className="top-bar-section left level-xp-section">
        <div className="level-indicator">НИВО {user.level}</div>
        <div className="top-xp-bar-outer">
            <div 
                className="top-xp-bar-inner" 
                style={{width: `${xpPercentage}%`}}
            ></div>
             <span className="top-xp-text">{user.xp} / {user.level * 200} XP</span>
        </div>
      </div>

      {/* --- ЦЕНТРАЛНА СЕКЦИЯ (БИВША ЛЯВА): НАВИГАЦИОННИ БУТОНИ --- */}
      <div className="top-bar-section center nav-buttons">
        <NavLink to="/game" className="nav-btn">
            <img src={swordImg} alt="Играй" className="nav-icon-img" />
            <span className="nav-text">ИГРАЙ</span>
        </NavLink>
        <NavLink to="/shop" className="nav-btn">
            <img src={chestImg} alt="Магазин" className="nav-icon-img" />
            <span className="nav-text">МАГАЗИН</span>
        </NavLink>
        <NavLink to="/inventory" className="nav-btn">
            <img src={armorImg} alt="Инвентар" className="nav-icon-img" />
            <span className="nav-text">ИНВЕНТАР</span>
        </NavLink>
        <NavLink to="/roles" className="nav-btn">
            <img src={bookImg} alt="Роли" className="nav-icon-img" />
            <span className="nav-text">РОЛИ</span>
        </NavLink>
        <NavLink to="/guild" className="nav-btn">
            <img src={sealImg} alt="Гилдия" className="nav-icon-img" />
            <span className="nav-text">ГИЛДИЯ</span>
        </NavLink>
      </div>

      {/* --- ДЯСНА СЕКЦИЯ: ВАЛУТИ + ИКОНКИ (Без промяна) --- */}
      <div className="top-bar-section right">
        <div className="currency-container">
            <div className="currency-item gold">
            <span className="currency-icon">💰</span>
            <span className="currency-amount">{user.gold}</span>
            </div>
            <div className="currency-item diamonds">
            <span className="currency-icon">💎</span>
            <span className="currency-amount">{user.diamonds}</span>
            </div>
        </div>

        <div className="icons-container">
            <Link to="/friends" className="icon-btn" title="Приятели">👥</Link>
            <Link to="/help" className="icon-btn" title="Помощ">❓</Link>
            <Link to="/settings" className="icon-btn" title="Настройки">⚙️</Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;