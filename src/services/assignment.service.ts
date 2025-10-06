import { Assignment } from "@/models/assignment.model";

// Mock data - can be easily replaced with API calls later
const assignmentsData: Assignment[] = [
  {
    id: "1",
    title: "Essay: Business Communication Strategies",
    course: "Business English Communication",
    dueDate: "2025-10-10",
    status: "pending",
  },
  {
    id: "2",
    title: "Grammar Exercise: Modal Verbs",
    course: "Business English Communication",
    dueDate: "2025-10-08",
    status: "submitted",
    submittedFile: "modal-verbs-exercise.pdf",
  },
  {
    id: "3",
    title: "Presentation: Company Introduction",
    course: "Business English Communication",
    dueDate: "2025-09-30",
    status: "graded",
    grade: 90,
    feedback: "Excellent work! Your presentation was clear and well-structured.",
    submittedFile: "company-intro.pptx",
  },
  {
    id: "4",
    title: "Vocabulary Quiz Unit 3",
    course: "Business English Communication",
    dueDate: "2025-09-25",
    status: "graded",
    grade: 85,
    feedback: "Good job! Review phrasal verbs for next quiz.",
  },
];

class AssignmentService {
  // Get all assignments
  getAll(): Assignment[] {
    return assignmentsData;
  }

  // Get assignment by ID
  getById(id: string): Assignment | undefined {
    return assignmentsData.find((assignment) => assignment.id === id);
  }

  // Get assignments by status
  getByStatus(status: Assignment["status"]): Assignment[] {
    return assignmentsData.filter((assignment) => assignment.status === status);
  }

  // Get active assignments (pending or submitted)
  getActive(): Assignment[] {
    return assignmentsData.filter(
      (a) => a.status === "pending" || a.status === "submitted"
    );
  }

  // Get graded assignments
  getGraded(): Assignment[] {
    return assignmentsData.filter((a) => a.status === "graded");
  }

  // Submit an assignment (for future use with API)
  submit(id: string, file: string): Assignment | undefined {
    const index = assignmentsData.findIndex((a) => a.id === id);
    if (index !== -1) {
      assignmentsData[index].status = "submitted";
      assignmentsData[index].submittedFile = file;
      return assignmentsData[index];
    }
    return undefined;
  }

  // Add a new assignment (for future use with API)
  add(assignment: Assignment): Assignment {
    assignmentsData.push(assignment);
    return assignment;
  }

  // Update an assignment (for future use with API)
  update(id: string, updatedAssignment: Partial<Assignment>): Assignment | undefined {
    const index = assignmentsData.findIndex((a) => a.id === id);
    if (index !== -1) {
      assignmentsData[index] = { ...assignmentsData[index], ...updatedAssignment };
      return assignmentsData[index];
    }
    return undefined;
  }

  // Delete an assignment (for future use with API)
  delete(id: string): boolean {
    const index = assignmentsData.findIndex((a) => a.id === id);
    if (index !== -1) {
      assignmentsData.splice(index, 1);
      return true;
    }
    return false;
  }
}

export const assignmentService = new AssignmentService();
