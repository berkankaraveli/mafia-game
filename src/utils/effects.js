// src/utils/effects.js
export const createExplosion = (containerRef) => {
  if (!containerRef.current) {
    console.error("Particle container not found!");
    return;
  }

  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    containerRef.current.appendChild(p);

    // Случайни посоки
    const angle = Math.random() * Math.PI * 2;
    const dist = 400 + Math.random() * 600; // Разстояние на разхвърчане
    const rotation = Math.random() * 720; // Въртене

    p.animate([
      { 
        transform: 'translate(-50%, -50%) rotate(0deg) scale(0)', 
        opacity: 0 
      },
      { 
        transform: 'translate(-50%, -50%) rotate(0deg) scale(1.2)', 
        opacity: 1,
        offset: 0.1 // Светкавично показване в началото
      },
      { 
        transform: `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px)) rotate(${rotation}deg) scale(0)`, 
        opacity: 0 
      }
    ], {
      duration: 2000,
      easing: 'ease-out',
      fill: 'forwards'
    });

    // Изчистване на DOM елемента след анимацията
    setTimeout(() => p.remove(), 2000);
  }
};