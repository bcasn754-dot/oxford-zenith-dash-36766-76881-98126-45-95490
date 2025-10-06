import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Clock } from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Exam } from "@/models/exam.model";

interface ExamCardProps {
  exam: Exam;
  onViewDetails?: (examId: string) => void;
}

export const ExamCard = ({ exam, onViewDetails }: ExamCardProps) => {
  return (
    <Card className="p-6 shadow-elegant hover:shadow-hover transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-accent" />
            <h3 className="font-bold text-foreground">{exam.title}</h3>
            <Badge
              className={
                exam.status === "upcoming"
                  ? "bg-destructive/20 text-destructive"
                  : "bg-success/20 text-success"
              }
            >
              {exam.status === "upcoming" ? "Upcoming" : "Completed"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{exam.course}</p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {exam.date && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(exam.date).toLocaleDateString()}
              </div>
            )}
            {exam.duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {exam.duration}
              </div>
            )}
          </div>

          {exam.grade !== undefined && (
            <>
              <div className="flex items-center gap-4 mt-4 mb-3">
                <span className="text-2xl font-bold text-accent">{exam.grade}%</span>
                {exam.totalQuestions && exam.correctAnswers && (
                  <span className="text-sm text-muted-foreground">
                    {exam.correctAnswers}/{exam.totalQuestions} correct
                  </span>
                )}
              </div>
              <ProgressBar progress={exam.grade} className="max-w-md" />
            </>
          )}
        </div>
        {exam.status === "upcoming" && onViewDetails && (
          <Button variant="oxford" onClick={() => onViewDetails(exam.id)}>
            View Details
          </Button>
        )}
      </div>
    </Card>
  );
};
