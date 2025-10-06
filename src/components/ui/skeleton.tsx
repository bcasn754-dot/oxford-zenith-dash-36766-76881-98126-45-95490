import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}

// Reusable Skeleton Components
const SkeletonCard = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("rounded-xl border border-border bg-card p-6 shadow-elegant", className)} {...props}>
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex gap-2 pt-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  </div>
);

const SkeletonAvatar = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <Skeleton className={cn("rounded-full w-10 h-10", className)} {...props} />
);

const SkeletonButton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <Skeleton className={cn("h-10 w-24 rounded-lg", className)} {...props} />
);

const SkeletonText = ({ 
  lines = 3, 
  className,
  ...props 
}: React.HTMLAttributes<HTMLDivElement> & { lines?: number }) => (
  <div className={cn("space-y-2", className)} {...props}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton 
        key={i} 
        className={cn(
          "h-4",
          i === lines - 1 ? "w-4/6" : "w-full"
        )} 
      />
    ))}
  </div>
);

const SkeletonTable = ({ 
  rows = 5,
  columns = 4,
  className,
  ...props 
}: React.HTMLAttributes<HTMLDivElement> & { rows?: number; columns?: number }) => (
  <div className={cn("space-y-3", className)} {...props}>
    {/* Header */}
    <div className="flex gap-4">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} className="h-8 flex-1" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="flex gap-4">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton key={colIndex} className="h-12 flex-1" />
        ))}
      </div>
    ))}
  </div>
);

const SkeletonList = ({ 
  items = 5,
  className,
  ...props 
}: React.HTMLAttributes<HTMLDivElement> & { items?: number }) => (
  <div className={cn("space-y-3", className)} {...props}>
    {Array.from({ length: items }).map((_, i) => (
      <div key={i} className="flex items-center gap-4">
        <SkeletonAvatar />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export { 
  Skeleton,
  SkeletonCard,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonText,
  SkeletonTable,
  SkeletonList,
};
