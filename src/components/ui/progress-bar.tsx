import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  className?: string;
  showLabel?: boolean;
}

export const ProgressBar = ({ progress, className, showLabel = true }: ProgressBarProps) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-2">
        {showLabel && (
          <span className="text-sm font-medium text-foreground">{progress}%</span>
        )}
      </div>
      <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-gold rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
