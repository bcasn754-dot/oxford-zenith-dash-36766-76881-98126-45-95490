import { memo, useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  overscan?: number; // number of items to render outside viewport
}

/**
 * Virtual scrolling list for rendering large lists efficiently
 * Only renders visible items + overscan buffer
 * 
 * @example
 * <VirtualList
 *   items={messages}
 *   itemHeight={80}
 *   containerHeight={600}
 *   renderItem={(message) => <MessageItem {...message} />}
 *   overscan={3}
 * />
 */
export const VirtualList = memo(<T,>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  className,
  overscan = 3,
}: VirtualListProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);

  const handleScroll = useCallback((e: Event) => {
    const target = e.target as HTMLDivElement;
    setScrollTop(target.scrollTop);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Use passive listener for better scroll performance
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      ref={containerRef}
      className={cn("overflow-auto", className)}
      style={{ height: containerHeight }}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        {visibleItems.map((item, index) => (
          <div
            key={startIndex + index}
            style={{
              position: "absolute",
              top: (startIndex + index) * itemHeight,
              height: itemHeight,
              width: "100%",
            }}
          >
            {renderItem(item, startIndex + index)}
          </div>
        ))}
      </div>
    </div>
  );
}) as <T>(props: VirtualListProps<T>) => JSX.Element;
