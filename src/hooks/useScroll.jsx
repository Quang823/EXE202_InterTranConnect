import { useState, useEffect } from "react";

const useScroll = (threshold = 50) => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrolling(window.scrollY > threshold);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [threshold]);

  return scrolling;
};

export default useScroll;
