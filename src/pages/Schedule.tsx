import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScheduleEventCard } from "@/components/ScheduleEventCard";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { scheduleService } from "@/services/schedule.service";

const Schedule = () => {
  const [selectedDate] = useState(new Date());
  const events = scheduleService.getAll();
  const sortedEvents = scheduleService.getSortedByDate();
  const eventCounts = scheduleService.getCountByType();

  return (
    <MainLayout>
      <div className="p-8 space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Schedule</h1>
          <p className="text-muted-foreground">View your upcoming classes, exams, and deadlines</p>
        </div>

        {/* Calendar Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mini Calendar */}
          <Card className="p-6 shadow-elegant lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-accent" />
              <h2 className="font-bold text-foreground">
                {selectedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </h2>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-accent mb-2">
                {selectedDate.getDate()}
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedDate.toLocaleDateString("en-US", { weekday: "long" })}
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Upcoming Events</span>
                <Badge variant="secondary">{events.length}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Live Classes</span>
                <Badge className="bg-accent/20 text-accent">
                  {eventCounts.class}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Exams</span>
                <Badge className="bg-destructive/20 text-destructive">
                  {eventCounts.exam}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Events List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-foreground">Upcoming Events</h2>
            {sortedEvents.map((event) => (
              <ScheduleEventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Schedule;
