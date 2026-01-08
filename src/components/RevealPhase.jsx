import React, { forwardRef } from 'react';
import RevealCard from './RevealCard';

// Използваме forwardRef, защото трябва да подадем refs надолу към RevealCard
const RevealPhase = forwardRef(({ showResult, selectedRole, onBackToLobby }, ref) => {
  const { mainCardRef, frontSideRef } = ref;

  return (
    <div className="reveal-overlay">
      <RevealCard 
        ref={{ mainCardRef, frontSideRef }} 
        showResult={showResult} 
        resultText={`Тази нощ си "${selectedRole?.name}"`} 
        roleImage={selectedRole?.image}
      />
      {showResult && (
        <button className="back-lobby-btn" onClick={onBackToLobby}>
          ОБРАТНО В ЛОБИТО
        </button>
      )}
    </div>
  );
});

export default RevealPhase;