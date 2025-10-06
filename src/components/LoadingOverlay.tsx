import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
  message?: string;
  className?: string;
}

export const LoadingOverlay = ({ message, className }: LoadingOverlayProps) => {
  return (
    <div className={cn(
      "absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in",
      className
    )}>
      <div className="text-center space-y-4">
        <Loader2 className="w-10 h-10 mx-auto text-primary animate-spin" />
        {message && (
          <p className="text-sm text-muted-foreground animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
