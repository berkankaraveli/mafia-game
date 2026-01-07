import React from 'react';
import AvatarCreator from './AvatarCreator';
import './Home.css';

const Home = ({ user, onStartGame }) => {
  // Примерни мисии
  const missions = [
    { id: 1, text: "Завърти 3 пъти", goal: 3, current: user.totalSpins || 0, reward: 100 },
    { id: 2, text: "Достигни ниво 5", goal: 5, current: user.level, reward: 500 }
  ];

  return (
    <div className="home-screen">
      {/* ЛЯВО: ДЕЙСТВИЯ */}
      <div className="home-panel left">
        <div className="menu-container">
          <button className="big-play-btn" onClick={onStartGame}>ИГРАЙ</button>
          <div className="sub-menu">
            <button className="menu-item">МАГАЗИН</button>
            <button className="menu-item">КОЛЕКЦИЯ</button>
          </div>
        </div>
      </div>

      {/* ЦЕНТЪР: ЧОВЕКЪТ */}
      <div className="home-panel center">
        <AvatarCreator />
      </div>

      {/* ДЯСНО: ПРОФИЛ И МИСИИ */}
      <div className="home-panel right">
        <div className="profile-box">
          <div className="profile-header">
            <h3>{user.name}</h3>
            <span className="lvl-badge">LVL {user.level}</span>
          </div>
          <div className="xp-container">
            <div className="xp-bar" style={{ width: `${(user.xp / (user.level * 200)) * 100}%` }}></div>
          </div>
          <small>{user.xp} / {user.level * 200} XP</small>
        </div>

        <div className="missions-box">
          <h4>МИСИИ</h4>
          {missions.map(m => (
            <div key={m.id} className={`mission-item ${m.current >= m.goal ? 'done' : ''}`}>
              <p>{m.text}</p>
              <div className="mission-progress">{m.current}/{m.goal}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;