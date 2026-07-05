import { useState, useEffect } from "react";

/**
 * Custom hook to detect window scroll position.
 * @param {number} threshold - The scroll-y value to trigger the 'scrolled' state.
 * @returns {boolean} Whether the window has been scrolled past the threshold.
 */
export const useScroll = (threshold = 50) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > threshold;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled, threshold]);

  return scrolled;
};

export default useScroll;
