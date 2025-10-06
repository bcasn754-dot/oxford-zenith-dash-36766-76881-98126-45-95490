import { Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { BadgeLevel } from "@/components/ui/badge-level";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { LazyImage } from "@/components/LazyImage";
import { memo, useCallback } from "react";

interface CourseCardProps {
  id: string;
  title: string;
  level: string;
  teacher: string;
  price?: number;
  progress?: number;
  isLocked?: boolean;
  image: string;
  onClick?: () => void;
}

export const CourseCard = memo(({
  id,
  title,
  level,
  teacher,
  price,
  progress = 0,
  isLocked = false,
  image,
  onClick,
}: CourseCardProps) => {
  const { t } = useLanguage();
  
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLocked) {
      window.location.href = `/payments?courseId=${id}`;
    } else {
      onClick?.();
    }
  }, [isLocked, id, onClick]);

  return (
    <div
      className={cn(
        "group relative bg-card rounded-xl overflow-hidden shadow-elegant hover:shadow-hover transition-all duration-300 animate-scale-in",
        isLocked && "opacity-80"
      )}
    >
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <LazyImage
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {isLocked && (
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              <Lock className="w-12 h-12 text-primary-foreground mx-auto mb-2" />
              <p className="text-primary-foreground font-semibold">{t("locked.course")}</p>
            </div>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <BadgeLevel level={level} />
        </div>
      </div>

      {/* Course Content */}
      <div className="p-5">
        <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{t("teacher")}: {teacher}</p>

        {!isLocked && progress !== undefined && (
          <div className="mb-4">
            <ProgressBar progress={progress} />
          </div>
        )}

        {isLocked && price && (
          <p className="text-xl font-bold text-accent mb-4">${price}</p>
        )}

        <Button
          variant={isLocked ? "gold" : "oxford"}
          className="w-full text-sm sm:text-base"
          onClick={handleClick}
        >
          {isLocked ? (
            <>
              {t("subscribe.now")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              {t("continue.learning")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
});

CourseCard.displayName = "CourseCard";
