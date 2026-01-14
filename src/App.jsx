// src/App.jsx
import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Глобални Компоненти
import Explosion from './components/Explosion';

// Страници
import Home from './components/Home.jsx';
import GamePage from './pages/GamePage';
import ShopPage from './pages/ShopPage';
import InventoryPage from './pages/InventoryPage';
import RolesPage from './pages/RolesPage';
import GuildPage from './pages/GuildPage';

function App() {
  // --- ГЛОБАЛЕН STATE ---
  const [isLoading, setIsLoading] = useState(true);
  const particleContainerRef = useRef(null);

  // User State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mafia_user');
    return saved ? JSON.parse(saved) : { name: 'Играч 1', level: 1, xp: 0, totalSpins: 0, gold: 500, diamonds: 50 };
  });

  // Avatar State
  const [avatar, setAvatar] = useState({
    body: '/assets/tqlo.png',
    lowerFace: '/assets/dolnachast.png',
    eyes: '/assets/ochi.png',
    eyebrows: '/assets/vejdi.png',
    nose: '/assets/nos.png',
    mouth: '/assets/usta.png',
    hair: '/assets/kosa.png'
  });

  // --- ЛОГИКА ЗА ЗАРЕЖДАНЕ (Loader) ---
  useEffect(() => {
    const img = new Image();
    img.src = '/assets/fon.png';
    img.onload = () => setIsLoading(false);
    img.onerror = () => setIsLoading(false);
  }, []);

  // --- ГЛОБАЛНИ ФУНКЦИИ ---
  const addXP = (amount) => {
    setUser(prev => {
      let newXP = prev.xp + amount;
      let newLevel = prev.level;
      if (newXP >= prev.level * 200) { newXP -= prev.level * 200; newLevel++; }
      const updated = { ...prev, xp: newXP, level: newLevel, totalSpins: prev.totalSpins + 1 };
      localStorage.setItem('mafia_user', JSON.stringify(updated));
      return updated;
    });
  };


  return (
    <Router>
      <div className="App">
        {/* Експлозията е извън Routes, за да е винаги заредена в DOM-а */}
        <Explosion ref={particleContainerRef} />

        {/* --- НОВО: Image Preloader (Скрит) (ОПЦИЯ 1) --- */}
        {/* Това принуждава браузъра да държи картинките на текущия аватар в кеша,
            дори когато сме на друга страница. */}
        <div style={{ display: 'none', width: 0, height: 0, overflow: 'hidden' }}>
            {Object.values(avatar).map((url, index) => (
                // Рендерираме img таг само ако има URL (за да избегнем грешки с null)
                url ? <img key={`preload-${index}`} src={url} alt="preload" /> : null
            ))}
            {/* Добавяме и логото, защото е важно за Home страницата */}
            <img src="/assets/logobg2.png" alt="preload-logo" />
        </div>
        {/* ------------------------------------- */}

        <Routes>
          <Route path="/" element={<Home user={user} avatar={avatar} />} />

          <Route
            path="/game"
            element={<GamePage addXP={addXP} particleCtrlRef={particleContainerRef} />}
          />

          <Route
            path="/inventory"
            element={
              <InventoryPage
                user={user}
                savedAvatar={avatar}
                onSave={setAvatar}
              />
            }
          />

          {/* Подаваме user и на ролите, за да се вижда TopBar */}
          <Route path="/roles" element={<RolesPage user={user} />} />

         <Route path="/shop" element={<ShopPage user={user} />} />
          <Route path="/guild" element={<GuildPage user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;