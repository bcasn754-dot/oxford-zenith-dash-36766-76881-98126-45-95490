import { useState, useEffect } from "react";
import { useDebounce } from "./use-debounce";

interface ViewportSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

/**
 * Hook to track viewport size with optimized performance
 * Debounces resize events and provides responsive breakpoints
 * 
 * @example
 * const { width, isMobile, isTablet, isDesktop } = useViewportSize();
 * 
 * return (
 *   <div>
 *     {isMobile && <MobileView />}
 *     {isDesktop && <DesktopView />}
 *   </div>
 * );
 */
export const useViewportSize = (debounceTime = 150): ViewportSize => {
  const [size, setSize] = useState<ViewportSize>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
    isMobile: typeof window !== "undefined" ? window.innerWidth < 768 : false,
    isTablet: typeof window !== "undefined" ? window.innerWidth >= 768 && window.innerWidth < 1024 : false,
    isDesktop: typeof window !== "undefined" ? window.innerWidth >= 1024 : false,
  });

  const debouncedSize = useDebounce(size, debounceTime);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      });
    };

    // Use ResizeObserver if available for better performance
    if (typeof ResizeObserver !== "undefined") {
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(document.documentElement);
      
      return () => resizeObserver.disconnect();
    } else {
      // Fallback to window resize event
      window.addEventListener("resize", handleResize, { passive: true });
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return debouncedSize;
};
