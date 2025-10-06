import { SkeletonCard, SkeletonText, Skeleton } from "@/components/ui/skeleton";

export const DashboardSkeleton = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 animate-fade-in">
      {/* Welcome Section Skeleton */}
      <div className="bg-gradient-oxford rounded-xl p-6 sm:p-8 shadow-elegant">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-3 flex-1">
            <Skeleton className="h-8 w-64 bg-primary-foreground/20" />
            <Skeleton className="h-5 w-48 bg-primary-foreground/10" />
          </div>
          <Skeleton className="h-10 w-32 bg-primary-foreground/20 rounded-full" />
        </div>
      </div>

      {/* Active Course Section Skeleton */}
      <section>
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <SkeletonCard />
        </div>
      </section>

      {/* Locked Courses Section Skeleton */}
      <section>
        <Skeleton className="h-8 w-56 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </section>

      {/* Recent Activity Section Skeleton */}
      <section>
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="bg-card rounded-xl p-4 sm:p-6 shadow-elegant">
          <div className="space-y-3 sm:space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-secondary/50 rounded-lg"
              >
                <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
