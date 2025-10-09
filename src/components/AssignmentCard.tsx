import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FileText, Upload, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Assignment } from "@/models/assignment.model";

interface AssignmentCardProps {
  assignment: Assignment;
  onUpload?: (assignmentId: string) => void;
}

/**
 * Optimized assignment card component
 * Memoized to prevent unnecessary re-renders
 */
export const AssignmentCard = memo(({ assignment, onUpload }: AssignmentCardProps) => {
  const getStatusIcon = (status: Assignment["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "submitted":
        return <CheckCircle className="w-4 h-4" />;
      case "graded":
        return <CheckCircle className="w-4 h-4" />;
      case "late":
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Assignment["status"]) => {
    switch (status) {
      case "pending":
        return "bg-muted text-muted-foreground";
      case "submitted":
        return "bg-accent/20 text-accent";
      case "graded":
        return "bg-success/20 text-success";
      case "late":
        return "bg-destructive/20 text-destructive";
    }
  };

  return (
    <Card className="p-6 shadow-elegant hover:shadow-hover transition-all animate-scale-in">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-accent" />
            <h3 className="font-bold text-foreground">{assignment.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{assignment.course}</p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Due: {new Date(assignment.dueDate).toLocaleDateString()}
            </span>
            <Badge className={getStatusColor(assignment.status)}>
              {getStatusIcon(assignment.status)}
              <span className="ml-1 capitalize">{assignment.status}</span>
            </Badge>
          </div>
          {assignment.submittedFile && (
            <p className="text-sm text-success mt-2">
              Submitted: {assignment.submittedFile}
            </p>
          )}
          {assignment.grade !== undefined && (
            <span className="text-lg font-bold text-accent mt-2 block">
              Grade: {assignment.grade}%
            </span>
          )}
          {assignment.feedback && (
            <div className="bg-secondary/50 rounded-lg p-3 mt-3">
              <p className="text-sm font-medium text-foreground mb-1">Teacher Feedback:</p>
              <p className="text-sm text-muted-foreground">{assignment.feedback}</p>
            </div>
          )}
        </div>
        {assignment.status === "pending" && onUpload && (
          <Button variant="gold" onClick={() => onUpload(assignment.id)}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Answer
          </Button>
        )}
      </div>
    </Card>
  );
});

AssignmentCard.displayName = "AssignmentCard";
