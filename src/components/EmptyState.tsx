import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
      <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4 animate-bounce-in">
        <Icon className="w-10 h-10 text-muted-foreground" />
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2 animate-fade-in">
        {title}
      </h3>
      
      <p className="text-muted-foreground max-w-md mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
        {description}
      </p>
      
      {actionLabel && onAction && (
        <Button 
          onClick={onAction}
          className="animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
