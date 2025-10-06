import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, FileText } from "lucide-react";
import { ScheduleEvent } from "@/models/schedule.model";

interface ScheduleEventCardProps {
  event: ScheduleEvent;
}

export const ScheduleEventCard = ({ event }: ScheduleEventCardProps) => {
  const getEventIcon = (type: ScheduleEvent["type"]) => {
    switch (type) {
      case "class":
        return <Video className="w-4 h-4" />;
      case "exam":
        return <FileText className="w-4 h-4" />;
      case "assignment":
        return <FileText className="w-4 h-4" />;
    }
  };

  const getEventColor = (type: ScheduleEvent["type"]) => {
    switch (type) {
      case "class":
        return "bg-accent/20 text-accent";
      case "exam":
        return "bg-destructive/20 text-destructive";
      case "assignment":
        return "bg-success/20 text-success";
    }
  };

  return (
    <Card className="p-6 shadow-elegant hover:shadow-hover transition-all animate-scale-in">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-lg bg-gradient-gold flex items-center justify-center">
            {getEventIcon(event.type)}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="font-bold text-foreground">{event.title}</h3>
            <Badge className={getEventColor(event.type)}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{event.course}</p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(event.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {event.time}
            </div>
            {event.teacher && (
              <div className="text-sm">
                Teacher: <span className="font-medium">{event.teacher}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
