import React, { forwardRef } from 'react';
import cardBack from '../assets/cards.png';
import cardFront from '../assets/cards1.png';

const RevealCard = forwardRef(({ showResult, resultText }, ref) => {
  return (
    <div id="main-card-viewport">
      <div className={`result-text ${showResult ? 'visible' : ''}`}>
        {resultText}
      </div>
      <div className="card" ref={ref.mainCardRef}>
        <div className="side front" ref={ref.frontSideRef}>
          <img src={cardFront} alt="Front" />
        </div>
        <div className="side back">
          <img src={cardBack} alt="Back" />
        </div>
      </div>
    </div>
  );
});

export default RevealCard;