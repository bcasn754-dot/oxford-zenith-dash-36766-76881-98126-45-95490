export interface ScheduleEvent {
  id: string;
  type: "class" | "exam" | "assignment";
  title: string;
  date: string;
  time: string;
  teacher?: string;
  course: string;
}
