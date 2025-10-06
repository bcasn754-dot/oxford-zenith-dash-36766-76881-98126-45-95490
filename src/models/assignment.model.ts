export interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded" | "late";
  grade?: number;
  feedback?: string;
  submittedFile?: string;
}
