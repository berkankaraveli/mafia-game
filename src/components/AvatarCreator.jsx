import React, { useState } from 'react';
import './AvatarCreator.css';

// --- БАЗА ДАННИ С ДРЕХИ (Временно тук) ---
const ASSETS = {
  // Цветове за кожата
  skinColors: ['#FCD7B8', '#E0B184', '#A97C50', '#5C3E25'],
  // Видове коси (като компоненти, за да са гъвкави)
  hair: [
    { id: 'none', name: 'Без коса', component: null },
    { id: 'short', name: 'Къса', color: '#4A3121', component: (color) => (
      <svg className="avatar-layer hair" viewBox="0 0 200 300">
        <path d="M60,50 Q100,10 140,50 Q150,80 140,100 L60,100 Q50,80 60,50 Z" fill={color} />
      </svg>
    )},
    { id: 'long', name: 'Дълга', color: '#D4AF37', component: (color) => (
      <svg className="avatar-layer hair" viewBox="0 0 200 300">
         <path d="M60,50 Q100,10 140,50 L150,180 Q100,200 50,180 L60,50 Z" fill={color} />
      </svg>
    )},
  ],
  // Видове тениски
  shirts: [
    { id: 'none', name: 'Без тениска', component: null },
    { id: 'basic', name: 'Тениска', color: '#FF5733', component: (color) => (
      <svg className="avatar-layer shirt" viewBox="0 0 200 300">
         <path d="M65,100 L135,100 L150,130 L135,130 L135,190 L65,190 L65,130 L50,130 Z" fill={color} />
      </svg>
    )},
  ],
  // Видове панталони
  pants: [
    { id: 'basic', name: 'Панталон', color: '#3498DB', component: (color) => (
       <svg className="avatar-layer pants" viewBox="0 0 200 300">
         <path d="M65,190 L135,190 L130,280 L105,280 L100,220 L95,280 L70,280 Z" fill={color} />
       </svg>
    )}
  ]
};

// --- БАЗОВО ТЯЛО (Винаги най-отдолу) ---
const BaseBody = ({ skinColor }) => (
  <svg className="avatar-layer base" viewBox="0 0 200 300">
    {/* Глава */}
    <circle cx="100" cy="70" r="30" fill={skinColor} />
    {/* Врат */}
    <rect x="90" y="95" width="20" height="15" fill={skinColor}/>
    {/* Торс */}
    <rect x="70" y="110" width="60" height="90" rx="10" fill={skinColor} />
    {/* Крака */}
    <rect x="75" y="200" width="20" height="80" fill={skinColor} />
    <rect x="105" y="200" width="20" height="80" fill={skinColor} />
    {/* Ръце */}
    <rect x="45" y="115" width="20" height="70" rx="5" fill={skinColor} />
    <rect x="135" y="115" width="20" height="70" rx="5" fill={skinColor} />
  </svg>
);


// --- ГЛАВЕН КОМПОНЕНТ ---
const AvatarCreator = () => {
  // State за текущия вид на човечето
  const [character, setCharacter] = useState({
    skinColor: ASSETS.skinColors[0],
    hairIdx: 1, // Избрана Къса коса по подразбиране
    shirtIdx: 1, // Избрана Тениска по подразбиране
    pantsIdx: 0  // Избран Панталон
  });

  // Взимаме актуалните компоненти базирани на индексите
  const activeHair = ASSETS.hair[character.hairIdx];
  const activeShirt = ASSETS.shirts[character.shirtIdx];
  const activePants = ASSETS.pants[character.pantsIdx];

  // Функция за смяна на цвят/модел
  const updateChar = (key, value) => {
    setCharacter(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="creator-container">
      {/* --- ЗОНА ЗА ВИЗУАЛИЗАЦИЯ (Куклата) --- */}
      <div className="avatar-stage">
        <div className="avatar-layers-container">
          {/* СЛОЙ 1: База */}
          <BaseBody skinColor={character.skinColor} />
          
          {/* СЛОЙ 2: Панталони (слагаме ги преди тениската) */}
          {activePants.component && activePants.component(activePants.color)}

          {/* СЛОЙ 3: Тениска */}
          {activeShirt.component && activeShirt.component(activeShirt.color)}
          
          {/* СЛОЙ 4: Коса (най-отгоре) */}
          {activeHair.component && activeHair.component(activeHair.color)}
        </div>
      </div>

      {/* --- КОНТРОЛЕН ПАНЕЛ --- */}
      <div className="controls-panel">
        <h3>Създай Герой</h3>
        
        <div className="control-group">
          <label>Цвят на кожата:</label>
          <div className="color-picker">
            {ASSETS.skinColors.map(color => (
              <button 
                key={color}
                style={{ backgroundColor: color }}
                className={`color-btn ${character.skinColor === color ? 'active' : ''}`}
                onClick={() => updateChar('skinColor', color)}
              />
            ))}
          </div>
        </div>

        <div className="control-group">
          <label>Коса:</label>
          <select 
            value={character.hairIdx}
            onChange={(e) => updateChar('hairIdx', Number(e.target.value))}
          >
            {ASSETS.hair.map((h, idx) => (
              <option key={h.id} value={idx}>{h.name}</option>
            ))}
          </select>
        </div>

         <div className="control-group">
          <label>Дрехи (Горнище):</label>
           <select 
            value={character.shirtIdx}
            onChange={(e) => updateChar('shirtIdx', Number(e.target.value))}
          >
            {ASSETS.shirts.map((s, idx) => (
              <option key={s.id} value={idx}>{s.name}</option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
};

export default AvatarCreator;