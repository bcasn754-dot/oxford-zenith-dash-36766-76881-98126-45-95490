import { memo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AssignmentCard } from "@/components/AssignmentCard";
import { AssignmentStats } from "@/components/AssignmentStats";
import { Assignment } from "@/models/assignment.model";
import { Upload, Search } from "lucide-react";

interface AssignmentsTabContentProps {
  searchQuery: string;
  filterStatus: "all" | "pending" | "submitted" | "graded";
  activeAssignments: Assignment[];
  gradedAssignments: Assignment[];
  pendingCount: number;
  submittedCount: number;
  gradedCount: number;
  onSearchChange: (value: string) => void;
  onFilterChange: (status: "all" | "pending" | "submitted" | "graded") => void;
  onFileUpload: (assignmentId: string) => void;
}

/**
 * Assignments tab content component
 * Memoized for performance
 */
export const AssignmentsTabContent = memo(
  ({
    searchQuery,
    filterStatus,
    activeAssignments,
    gradedAssignments,
    pendingCount,
    submittedCount,
    gradedCount,
    onSearchChange,
    onFilterChange,
    onFileUpload,
  }: AssignmentsTabContentProps) => {
    return (
      <div className="space-y-6 mt-6">
        <AssignmentStats
          pendingCount={pendingCount}
          submittedCount={submittedCount}
          gradedCount={gradedCount}
        />

        {/* Search and Filter */}
        <Card className="p-6 shadow-elegant">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search assignments..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => onFilterChange("all")}
              >
                All
              </Button>
              <Button
                variant={filterStatus === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => onFilterChange("pending")}
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === "submitted" ? "default" : "outline"}
                size="sm"
                onClick={() => onFilterChange("submitted")}
              >
                Submitted
              </Button>
              <Button
                variant={filterStatus === "graded" ? "default" : "outline"}
                size="sm"
                onClick={() => onFilterChange("graded")}
              >
                Graded
              </Button>
            </div>
          </div>
        </Card>

        {/* Active Assignments */}
        {(filterStatus === "all" ||
          filterStatus === "pending" ||
          filterStatus === "submitted") && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">
                Active Assignments
              </h2>
              <Badge variant="secondary">{activeAssignments.length}</Badge>
            </div>
            <div className="space-y-4">
              {activeAssignments.length > 0 ? (
                activeAssignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    onUpload={onFileUpload}
                  />
                ))
              ) : (
                <Card className="p-12 text-center shadow-elegant">
                  <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No Active Assignments
                  </h3>
                  <p className="text-muted-foreground">
                    You're all caught up! Check back later for new assignments.
                  </p>
                </Card>
              )}
            </div>
          </section>
        )}

        {/* Graded Assignments */}
        {(filterStatus === "all" || filterStatus === "graded") && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">
                Graded Assignments
              </h2>
              <Badge variant="secondary">{gradedAssignments.length}</Badge>
            </div>
            <div className="space-y-4">
              {gradedAssignments.length > 0 ? (
                gradedAssignments.map((assignment) => (
                  <AssignmentCard key={assignment.id} assignment={assignment} />
                ))
              ) : (
                <Card className="p-12 text-center shadow-elegant">
                  <Badge className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No Graded Assignments Yet
                  </h3>
                  <p className="text-muted-foreground">
                    Complete and submit your assignments to see your grades
                    here.
                  </p>
                </Card>
              )}
            </div>
          </section>
        )}

        {/* Tips Card */}
        <Card className="p-6 bg-gradient-oxford text-primary-foreground shadow-elegant">
          <h3 className="text-lg font-bold mb-3">📝 Assignment Tips</h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li>
              • Submit your assignments before the deadline to avoid penalties
            </li>
            <li>• Accepted formats: PDF, DOC, DOCX, PPT, PPTX</li>
            <li>• Maximum file size: 10MB</li>
            <li>
              • Check feedback carefully to improve future submissions
            </li>
            <li>• Contact your instructor if you need an extension</li>
          </ul>
        </Card>
      </div>
    );
  }
);

AssignmentsTabContent.displayName = "AssignmentsTabContent";
