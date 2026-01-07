import React, { forwardRef } from 'react';

const Carousel = forwardRef((props, ref) => {
  return (
    <div id="carousel-wrapper">
      <div className="carousel-viewport">
        <div className="carousel" ref={ref}>
          {[...Array(150)].map((_, i) => (
            <div key={i} className="carousel-card"></div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Carousel;