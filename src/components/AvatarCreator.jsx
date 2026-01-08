// AvatarCreator.jsx
import React from 'react';
import './AvatarCreator.css';

const AvatarCreator = ({ selections }) => {
  // Ако няма подадени селекции, не рендирай нищо или покажи зареждане
  if (!selections) {
    return <div className="hero-card empty">No Avatar Data</div>;
  }

  // Помощна функция: Рендира слой само ако има път (src) към картинката.
  const renderLayer = (src, layerClass) => {
    if (!src) return null;
    return <img src={src} className={`alayer ${layerClass}`} alt="" />;
  };

  return (
    <div className="hero-card">
      <div className="card-layers">
        {/*
          РЕД НА НАСЛОЯВАНЕ (Z-Index):
          Елементите по-надолу в кода застават върху горните.
        */}

        {/* 1. Най-отзад: Основа на главата/Тяло */}
        {renderLayer(selections.body, 'layer-body')}

        {/* --- НОВО: Долна част на лицето --- */}
        {/* Ще очакваме ново пропърти 'lowerFace' в обекта selections */}
        {renderLayer(selections.lowerFace, 'layer-lower-face')}

        {/* 2. Среда: Лицеви черти */}
        {renderLayer(selections.eyes, 'layer-eyes')}
        {renderLayer(selections.nose, 'layer-nose')}
        {renderLayer(selections.mouth, 'layer-mouth')}
        {renderLayer(selections.eyebrows, 'layer-eyebrows')}

        {/* 3. Най-отпред: Коса */}
        {renderLayer(selections.hair, 'layer-hair')}
      </div>
      
      {/* Декоративна рамка (опционално) */}
      <div className="gold-frame"></div>
    </div>
  );
};

export default AvatarCreator;