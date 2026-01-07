export const createExplosion = (containerRef) => {
  if (!containerRef.current) return;

  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    containerRef.current.appendChild(p);

    const angle = Math.random() * Math.PI * 2;
    const dist = 500 + Math.random() * 900;

    p.animate([
      { transform: 'translate(-50%, -50%) rotate(0deg) scale(1.2)', opacity: 1 },
      { 
        transform: `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px)) rotate(${Math.random() * 1000}deg) scale(0)`, 
        opacity: 0 
      }
    ], { 
      duration: 1800, 
      easing: 'ease-out' 
    });

    setTimeout(() => p.remove(), 1800);
  }
};