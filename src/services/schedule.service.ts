import { ScheduleEvent } from "@/models/schedule.model";

// Mock data - can be easily replaced with API calls later
const eventsData: ScheduleEvent[] = [
  {
    id: "1",
    type: "class",
    title: "Live Session: Modal Verbs",
    date: "2025-10-05",
    time: "10:00 AM - 11:30 AM",
    teacher: "Dr. Sarah Johnson",
    course: "Business English Communication",
  },
  {
    id: "2",
    type: "assignment",
    title: "Essay Due: Business Communication",
    date: "2025-10-10",
    time: "11:59 PM",
    course: "Business English Communication",
  },
  {
    id: "3",
    type: "exam",
    title: "Mid-term Exam",
    date: "2025-10-15",
    time: "2:00 PM - 4:00 PM",
    teacher: "Dr. Sarah Johnson",
    course: "Business English Communication",
  },
  {
    id: "4",
    type: "class",
    title: "Live Session: Presentation Skills",
    date: "2025-10-08",
    time: "10:00 AM - 11:30 AM",
    teacher: "Dr. Sarah Johnson",
    course: "Business English Communication",
  },
];

class ScheduleService {
  // Get all events
  getAll(): ScheduleEvent[] {
    return eventsData;
  }

  // Get event by ID
  getById(id: string): ScheduleEvent | undefined {
    return eventsData.find((event) => event.id === id);
  }

  // Get events by type
  getByType(type: ScheduleEvent["type"]): ScheduleEvent[] {
    return eventsData.filter((event) => event.type === type);
  }

  // Get events sorted by date
  getSortedByDate(): ScheduleEvent[] {
    return [...eventsData].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  // Get upcoming events (future dates)
  getUpcoming(): ScheduleEvent[] {
    const now = new Date();
    return eventsData.filter((event) => new Date(event.date) >= now);
  }

  // Get events count by type
  getCountByType(): Record<ScheduleEvent["type"], number> {
    return {
      class: eventsData.filter((e) => e.type === "class").length,
      exam: eventsData.filter((e) => e.type === "exam").length,
      assignment: eventsData.filter((e) => e.type === "assignment").length,
    };
  }

  // Add a new event (for future use with API)
  add(event: ScheduleEvent): ScheduleEvent {
    eventsData.push(event);
    return event;
  }

  // Update an event (for future use with API)
  update(id: string, updatedEvent: Partial<ScheduleEvent>): ScheduleEvent | undefined {
    const index = eventsData.findIndex((event) => event.id === id);
    if (index !== -1) {
      eventsData[index] = { ...eventsData[index], ...updatedEvent };
      return eventsData[index];
    }
    return undefined;
  }

  // Delete an event (for future use with API)
  delete(id: string): boolean {
    const index = eventsData.findIndex((event) => event.id === id);
    if (index !== -1) {
      eventsData.splice(index, 1);
      return true;
    }
    return false;
  }
}

export const scheduleService = new ScheduleService();
