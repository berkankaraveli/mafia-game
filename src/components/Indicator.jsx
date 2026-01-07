import React from 'react';

const Indicator = ({ phase }) => {
  return (
    <div 
      className={`indicator ${phase === 'selected' ? 'active' : ''}`} 
      id="main-indicator"
    >
      ▼
    </div>
  );
};

export default Indicator;