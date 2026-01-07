// Home.jsx
import React from 'react';
import AvatarCreator from './AvatarCreator.jsx'; // Увери се, че пътят е верен
import './Home.css';

const Home = ({ user, avatar, onStartGame }) => {
  // Изчисляване на процента за XP бара
  const xpPercentage = user.level > 0 ? (user.xp / (user.level * 200)) * 100 : 0;

  return (
    <div className="home-screen">
      {/* ЛЯВО: БУТОН ИГРАЙ */}
      <div className="home-panel left-panel">
        <button className="big-play-btn" onClick={onStartGame}>
          ИГРАЙ
        </button>
      </div>

      {/* ЦЕНТЪР: ГЕРОЙ КАРТА */}
      <div className="home-panel center-panel">
        {/* Подаваме обекта avatar към компонента */}
        <AvatarCreator selections={avatar} />
      </div>

      {/* ДЯСНО: ПРОФИЛ */}
      <div className="home-panel right-panel">
        <div className="profile-card">
          <h3>{user.name}</h3>
          <div className="lvl-info">LEVEL {user.level}</div>
          
          {/* XP BAR */}
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