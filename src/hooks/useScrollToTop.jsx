import { useEffect } from 'react';

const easeInOutQuad = (t) => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

const smoothScrollToTop = (duration = 800) => {
  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  const scroll = () => {
    const currentTime = 'now' in window.performance ? performance.now() : new Date().getTime();
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    const easeProgress = easeInOutQuad(progress);
    const scrollPosition = start * (1 - easeProgress);

    window.scrollTo(0, scrollPosition);

    if (timeElapsed < duration) {
      requestAnimationFrame(scroll);
    }
  };

  requestAnimationFrame(scroll);
};

const useScrollToTop = (dependency) => {
  useEffect(() => {
    if (window.pageYOffset > 0) {
      smoothScrollToTop();
    }
  }, [dependency]);
};

export default useScrollToTop; 