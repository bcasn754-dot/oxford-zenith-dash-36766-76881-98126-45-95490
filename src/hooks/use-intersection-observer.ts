import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

/**
 * Hook for lazy loading elements using Intersection Observer
 * Perfect for images, components, and infinite scroll
 * 
 * @param options - Intersection Observer options
 * @returns [ref, isIntersecting] - Ref to attach and visibility state
 * 
 * @example
 * const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
 * 
 * return (
 *   <div ref={ref}>
 *     {isVisible && <ExpensiveComponent />}
 *   </div>
 * );
 */
export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<HTMLDivElement>, boolean] => {
  const {
    threshold = 0,
    root = null,
    rootMargin = "0px",
    freezeOnceVisible = false,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If already visible and freezeOnceVisible is true, don't observe again
    if (freezeOnceVisible && isIntersecting) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, root, rootMargin, freezeOnceVisible, isIntersecting]);

  return [ref, isIntersecting];
};
