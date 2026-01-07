import React, { forwardRef } from 'react';
import zadna from '/assets/zadna.png';

const RevealCard = forwardRef(({ showResult, resultText, roleImage }, ref) => (
  <div id="main-card-viewport">
    <div className={`result-text ${showResult ? 'visible' : ''}`}>{resultText}</div>
    <div className="card" ref={ref.mainCardRef}>
      
      <div className="side front" ref={ref.frontSideRef}>
        <img src={roleImage} alt="Role" />
      </div>

      <div className="side back">
        <img src={zadna} alt="Back" />
      </div>

    </div>
  </div>
));

export default RevealCard;