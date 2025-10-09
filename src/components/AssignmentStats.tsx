import { memo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload } from "lucide-react";

interface AssignmentStatsProps {
  pendingCount: number;
  submittedCount: number;
  gradedCount: number;
}

/**
 * Displays assignment statistics in cards
 * Memoized for performance
 */
export const AssignmentStats = memo(
  ({ pendingCount, submittedCount, gradedCount }: AssignmentStatsProps) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-6 shadow-elegant hover:shadow-hover transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pending</p>
              <p className="text-3xl font-bold text-foreground">
                {pendingCount}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <Upload className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-elegant hover:shadow-hover transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Submitted</p>
              <p className="text-3xl font-bold text-foreground">
                {submittedCount}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Upload className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-elegant hover:shadow-hover transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Graded</p>
              <p className="text-3xl font-bold text-foreground">
                {gradedCount}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <Badge className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </Card>
      </div>
    );
  }
);

AssignmentStats.displayName = "AssignmentStats";
