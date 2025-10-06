import { cn } from "@/lib/utils";

interface BadgeLevelProps {
  level: string;
  className?: string;
}

export const BadgeLevel = ({ level, className }: BadgeLevelProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-gold text-accent-foreground shadow-elegant",
        className
      )}
    >
      {level}
    </div>
  );
};
