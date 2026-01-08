import { createExplosion } from './effects';

const cardStep = 230;

// --- Анимация на карусела ---
export const runCarouselAnimation = (carouselRef, onAnimationComplete) => {
  let currentX = 0;
  const duration = 8000;
  const initialSpeed = 22;
  const startTime = Date.now();

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = elapsed / duration;

    if (progress < 1) {
      const easeOut = 1 - Math.pow(progress, 2);
      const speed = easeOut * initialSpeed + 1.5;
      currentX -= speed;
      if (carouselRef.current) {
        carouselRef.current.style.transform = `translateX(${currentX - 115}px)`;
      }
      requestAnimationFrame(animate);
    } else {
      // Край на въртенето, "залепване" на карта
      const snappedX = Math.round(currentX / cardStep) * cardStep;
      if (carouselRef.current) {
        carouselRef.current.style.transition = "transform 1.5s cubic-bezier(0.1, 1, 0.1, 1)";
        carouselRef.current.style.transform = `translateX(${snappedX - 115}px)`;
        
        // Добавяне на светене
        setTimeout(() => {
          const cards = carouselRef.current.querySelectorAll('.carousel-card');
          const centerIndex = Math.abs(snappedX / cardStep) % cards.length;
          if (cards[centerIndex]) cards[centerIndex].classList.add('active-glow');
        }, 1000);
      }
      // Извикване на callback функцията, когато всичко приключи
      setTimeout(() => {
          onAnimationComplete();
      }, 3000); // Изчакваме светенето и малко пауза преди следващата фаза
    }
  };
  animate();
};


// --- Анимация на въртенето на картата (Reveal) ---
export const startCardSpin = (mainCardRef, frontSideRef, onRevealComplete) => {
    let angle = 0;
    let rotationSpeed = 65;
    let blurVal = 25;
    let brightVal = 4;
  
    const spin = () => {
      angle += rotationSpeed;
      rotationSpeed *= 0.982;
      if (blurVal > 0) blurVal -= 0.22;
      if (brightVal > 1) brightVal -= 0.035;
  
      if (mainCardRef.current && frontSideRef.current) {
        mainCardRef.current.style.transform = `rotateY(${angle}deg)`;
        frontSideRef.current.style.filter = `brightness(${brightVal}) blur(${Math.max(0, blurVal)}px)`;
      }
  
      if (rotationSpeed > 0.2) {
        requestAnimationFrame(spin);
      } else {
        // Финално завъртане
        const finalAngle = Math.round(angle / 360) * 360;
        if (mainCardRef.current) {
          mainCardRef.current.style.transition = "transform 1.2s cubic-bezier(0.2, 0.5, 0.3, 1)";
          mainCardRef.current.style.transform = `rotateY(${finalAngle}deg)`;
        }
        if (frontSideRef.current) frontSideRef.current.style.filter = `brightness(1) blur(0px)`;
        
        // Извикване на callback за показване на резултата и XP
        setTimeout(() => {
            onRevealComplete();
        }, 1000);
      }
    };
    spin();
  };

// --- Помощна функция за стартиране на експлозия и въртене ---
export const triggerRevealSequence = (particleContainerRef, mainCardRef, frontSideRef, onRevealComplete) => {
     createExplosion(particleContainerRef);
     startCardSpin(mainCardRef, frontSideRef, onRevealComplete);
}