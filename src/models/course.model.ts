export interface CourseModule {
  title: string;
  lessons: number;
  completed: number;
}

export interface Course {
  id: string;
  title: string;
  level: string;
  teacher: string;
  progress?: number;
  price?: number;
  isLocked: boolean;
  image: string;
  duration?: string;
  lessons?: number;
  students?: number;
  description?: string;
  learningPoints?: string[];
  modules?: CourseModule[];
}
