import { Course } from "@/models/course.model";
import course2A from "@/assets/courses/2A.jpg";
import courseBA from "@/assets/courses/BA.jpg";
import courseBB from "@/assets/courses/BB.jpg";
import courseVentureB from "@/assets/courses/venture-book-B.jpg";
import courseVentureA from "@/assets/courses/ventures-A.jpg";

// Mock data - can be easily replaced with API calls later
const coursesData: Course[] = [
  {
    id: "1",
    title: "Business English Communication",
    level: "B1",
    teacher: "Dr. Sarah Johnson",
    progress: 67,
    isLocked: false,
    image: course2A,
    duration: "12 weeks",
    lessons: 48,
    students: 1250,
    description: "Master professional English communication skills for the business world. This comprehensive course covers email writing, presentations, meetings, and professional networking.",
    learningPoints: [
      "Write professional emails and reports",
      "Deliver compelling business presentations",
      "Participate effectively in meetings",
      "Build professional relationships",
      "Master business vocabulary and phrases"
    ],
    modules: [
      { title: "Introduction to Business English", lessons: 8, completed: 8 },
      { title: "Professional Email Writing", lessons: 10, completed: 10 },
      { title: "Business Presentations", lessons: 12, completed: 8 },
      { title: "Meeting Skills", lessons: 10, completed: 0 },
      { title: "Networking & Communication", lessons: 8, completed: 0 }
    ]
  },
  {
    id: "2",
    title: "Advanced English Grammar",
    level: "B2",
    teacher: "Prof. Michael Brown",
    price: 149,
    isLocked: true,
    image: courseBA,
  },
  {
    id: "3",
    title: "IELTS Preparation Course",
    level: "C1",
    teacher: "Dr. Emily White",
    price: 199,
    isLocked: true,
    image: courseBB,
  },
  {
    id: "4",
    title: "English for Academic Writing",
    level: "B2",
    teacher: "Prof. David Lee",
    price: 169,
    isLocked: true,
    image: courseVentureB,
  },
  {
    id: "5",
    title: "Conversational English Mastery",
    level: "A2",
    teacher: "Ms. Jennifer Smith",
    price: 129,
    isLocked: true,
    image: courseVentureA,
  },
  {
    id: "6",
    title: "English Pronunciation Workshop",
    level: "B1",
    teacher: "Dr. Robert Wilson",
    price: 139,
    isLocked: true,
    image: course2A,
  },
];

class CourseService {
  // Get all courses
  getAll(): Course[] {
    return coursesData;
  }

  // Get course by ID
  getById(id: string): Course | undefined {
    return coursesData.find((course) => course.id === id);
  }

  // Get active courses (unlocked)
  getActive(): Course[] {
    return coursesData.filter((course) => !course.isLocked);
  }

  // Get locked courses
  getLocked(): Course[] {
    return coursesData.filter((course) => course.isLocked);
  }

  // Add a new course (for future use with API)
  add(course: Course): Course {
    coursesData.push(course);
    return course;
  }

  // Update a course (for future use with API)
  update(id: string, updatedCourse: Partial<Course>): Course | undefined {
    const index = coursesData.findIndex((course) => course.id === id);
    if (index !== -1) {
      coursesData[index] = { ...coursesData[index], ...updatedCourse };
      return coursesData[index];
    }
    return undefined;
  }

  // Delete a course (for future use with API)
  delete(id: string): boolean {
    const index = coursesData.findIndex((course) => course.id === id);
    if (index !== -1) {
      coursesData.splice(index, 1);
      return true;
    }
    return false;
  }
}

export const courseService = new CourseService();
