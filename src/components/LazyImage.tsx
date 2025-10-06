import { useState, useEffect, memo } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
}

/**
 * Optimized lazy loading image component
 * Only loads images when they enter the viewport
 * Shows blur placeholder while loading
 */
export const LazyImage = memo(({ 
  src, 
  alt, 
  className, 
  placeholderClassName,
  ...props 
}: LazyImageProps) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    if (isVisible && !imageSrc) {
      setImageSrc(src);
    }
  }, [isVisible, src, imageSrc]);

  return (
    <div ref={ref} className="relative overflow-hidden">
      {!isLoaded && (
        <div
          className={cn(
            "absolute inset-0 bg-muted animate-shimmer",
            placeholderClassName
          )}
          style={{
            backgroundImage: "linear-gradient(90deg, hsl(var(--muted)) 0%, hsl(var(--muted-foreground) / 0.1) 50%, hsl(var(--muted)) 100%)",
            backgroundSize: "1000px 100%",
          }}
        />
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={cn(
            "transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
});

LazyImage.displayName = "LazyImage";
