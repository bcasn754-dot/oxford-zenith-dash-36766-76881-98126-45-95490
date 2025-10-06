import { useEffect, useRef, useCallback } from "react";

interface TouchOptimizationOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number; // minimum distance for swipe
}

/**
 * Hook for optimized touch interactions
 * Handles swipe gestures with performance optimizations
 * 
 * @example
 * const touchRef = useTouchOptimization({
 *   onSwipeLeft: () => console.log("Swiped left"),
 *   onSwipeRight: () => console.log("Swiped right"),
 *   threshold: 50,
 * });
 * 
 * return <div ref={touchRef}>Swipeable content</div>;
 */
export const useTouchOptimization = <T extends HTMLElement = HTMLDivElement>(
  options: TouchOptimizationOptions = {}
) => {
  const { onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold = 50 } = options;
  const touchRef = useRef<T>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const touchEndY = useRef(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const deltaX = touchEndX.current - touchStartX.current;
    const deltaY = touchEndY.current - touchStartY.current;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Horizontal swipe
    if (absDeltaX > absDeltaY && absDeltaX > threshold) {
      if (deltaX > 0) {
        onSwipeRight?.();
      } else {
        onSwipeLeft?.();
      }
    }

    // Vertical swipe
    if (absDeltaY > absDeltaX && absDeltaY > threshold) {
      if (deltaY > 0) {
        onSwipeDown?.();
      } else {
        onSwipeUp?.();
      }
    }
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold]);

  useEffect(() => {
    const element = touchRef.current;
    if (!element) return;

    // Use passive listeners for better scroll performance
    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchmove", handleTouchMove, { passive: true });
    element.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return touchRef;
};
