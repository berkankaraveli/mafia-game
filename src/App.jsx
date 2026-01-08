import React, { useState, useRef, useEffect } from 'react';
// ВАЖНИ ИМПОРТИ ЗА РУТИРАНЕТО
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
  // Държим реф-а за експлозията тук, защото тя е глобална
  const particleContainerRef = useRef(null);

  // User State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mafia_user');
    // ПРОМЯНА ТУК: Добавяме diamonds
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



  // 2. Ако е заредило, покажи приложението с Рутера
  return (
    // Router обвива всичко
    <Router>
      <div className="App">
        {/* Експлозията е извън Routes, за да е винаги заредена в DOM-а */}
        <Explosion ref={particleContainerRef} />

        {/* Тук дефинираме кой адрес коя страница отваря */}
        <Routes>
          {/* Главна страница (Лоби) - подаваме user и avatar */}
          <Route path="/" element={<Home user={user} avatar={avatar} />} />

          {/* Страница за Игра - подаваме функцията за XP и реф-а за експлозията */}
          <Route
            path="/game"
            element={<GamePage addXP={addXP} particleCtrlRef={particleContainerRef} />}
          />

          {/* Останалите страници */}
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route path="/guild" element={<GuildPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;