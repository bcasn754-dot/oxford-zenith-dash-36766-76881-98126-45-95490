export interface LevelSkill {
  id: string;
  name: string;
  description: string;
  progress: number;
  isCompleted: boolean;
}

export interface LevelRequirement {
  id: string;
  title: string;
  description: string;
  currentValue: number;
  targetValue: number;
  isCompleted: boolean;
  type: "course" | "exam" | "assignment" | "practice";
}

export interface LevelTest {
  id: string;
  title: string;
  level: string;
  duration: number; // in minutes
  questions: number;
  passingScore: number;
  attempts: number;
  bestScore?: number;
  isCompleted: boolean;
  isPassed: boolean;
}

export interface Level {
  id: string;
  name: string;
  level: string; // A1, A2, B1, B2, C1, C2
  description: string;
  isCurrentLevel: boolean;
  isUnlocked: boolean;
  progress: number;
  skills: LevelSkill[];
  requirements: LevelRequirement[];
  tests: LevelTest[];
  totalPoints: number;
  earnedPoints: number;
}

export interface LearningPathStep {
  id: string;
  level: string;
  title: string;
  description: string;
  status: "completed" | "current" | "locked";
  progress: number;
  estimatedDuration: string;
  skills: string[];
}
