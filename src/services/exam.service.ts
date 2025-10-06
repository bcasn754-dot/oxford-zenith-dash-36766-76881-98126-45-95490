import { Exam } from "@/models/exam.model";

// Mock data - can be easily replaced with API calls later
const examsData: Exam[] = [
  {
    id: "1",
    title: "Mid-term Exam",
    course: "Business English Communication",
    date: "2025-10-15",
    duration: "2 hours",
    status: "upcoming",
  },
  {
    id: "2",
    title: "Unit 3 Quiz: Modal Verbs",
    course: "Business English Communication",
    status: "completed",
    grade: 90,
    totalQuestions: 20,
    correctAnswers: 18,
  },
  {
    id: "3",
    title: "Unit 2 Quiz: Present Perfect",
    course: "Business English Communication",
    status: "completed",
    grade: 85,
    totalQuestions: 15,
    correctAnswers: 13,
  },
  {
    id: "4",
    title: "Unit 1 Quiz: Business Vocabulary",
    course: "Business English Communication",
    status: "completed",
    grade: 95,
    totalQuestions: 25,
    correctAnswers: 24,
  },
];

class ExamService {
  // Get all exams
  getAll(): Exam[] {
    return examsData;
  }

  // Get exam by ID
  getById(id: string): Exam | undefined {
    return examsData.find((exam) => exam.id === id);
  }

  // Get upcoming exams
  getUpcoming(): Exam[] {
    return examsData.filter((exam) => exam.status === "upcoming");
  }

  // Get completed exams
  getCompleted(): Exam[] {
    return examsData.filter((exam) => exam.status === "completed");
  }

  // Calculate average grade
  getAverageGrade(): number {
    const completed = this.getCompleted();
    if (completed.length === 0) return 0;
    const sum = completed.reduce((acc, exam) => acc + (exam.grade || 0), 0);
    return Math.round(sum / completed.length);
  }

  // Add a new exam (for future use with API)
  add(exam: Exam): Exam {
    examsData.push(exam);
    return exam;
  }

  // Update an exam (for future use with API)
  update(id: string, updatedExam: Partial<Exam>): Exam | undefined {
    const index = examsData.findIndex((exam) => exam.id === id);
    if (index !== -1) {
      examsData[index] = { ...examsData[index], ...updatedExam };
      return examsData[index];
    }
    return undefined;
  }

  // Delete an exam (for future use with API)
  delete(id: string): boolean {
    const index = examsData.findIndex((exam) => exam.id === id);
    if (index !== -1) {
      examsData.splice(index, 1);
      return true;
    }
    return false;
  }
}

export const examService = new ExamService();
