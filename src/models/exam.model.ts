export interface Exam {
  id: string;
  title: string;
  course: string;
  date?: string;
  duration?: string;
  status: "upcoming" | "completed";
  grade?: number;
  totalQuestions?: number;
  correctAnswers?: number;
}
