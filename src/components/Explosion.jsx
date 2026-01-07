// src/components/Explosion.jsx
import React, { forwardRef } from 'react';

const Explosion = forwardRef((props, ref) => {
  return <div id="particle-container" ref={ref}></div>;
});

export default Explosion;