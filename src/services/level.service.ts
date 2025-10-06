import { Level, LearningPathStep } from "@/models/level.model";

const levelsData: Level[] = [
  {
    id: "1",
    name: "Beginner",
    level: "A1",
    description: "Start your English learning journey with basic vocabulary and simple phrases",
    isCurrentLevel: false,
    isUnlocked: true,
    progress: 100,
    totalPoints: 1000,
    earnedPoints: 1000,
    skills: [
      {
        id: "s1",
        name: "Basic Vocabulary",
        description: "Learn essential everyday words",
        progress: 100,
        isCompleted: true,
      },
      {
        id: "s2",
        name: "Simple Grammar",
        description: "Understand basic sentence structures",
        progress: 100,
        isCompleted: true,
      },
      {
        id: "s3",
        name: "Pronunciation",
        description: "Practice basic English sounds",
        progress: 100,
        isCompleted: true,
      },
    ],
    requirements: [
      {
        id: "r1",
        title: "Complete Beginner Course",
        description: "Finish all lessons in the beginner course",
        currentValue: 10,
        targetValue: 10,
        isCompleted: true,
        type: "course",
      },
      {
        id: "r2",
        title: "Pass Level Test",
        description: "Score at least 70% in the A1 level test",
        currentValue: 85,
        targetValue: 70,
        isCompleted: true,
        type: "exam",
      },
    ],
    tests: [
      {
        id: "t1",
        title: "A1 Level Test",
        level: "A1",
        duration: 30,
        questions: 20,
        passingScore: 70,
        attempts: 2,
        bestScore: 85,
        isCompleted: true,
        isPassed: true,
      },
    ],
  },
  {
    id: "2",
    name: "Elementary",
    level: "A2",
    description: "Build on your basics with more complex sentences and everyday conversations",
    isCurrentLevel: false,
    isUnlocked: true,
    progress: 100,
    totalPoints: 1500,
    earnedPoints: 1500,
    skills: [
      {
        id: "s4",
        name: "Conversational Skills",
        description: "Engage in basic conversations",
        progress: 100,
        isCompleted: true,
      },
      {
        id: "s5",
        name: "Reading Comprehension",
        description: "Understand simple texts",
        progress: 100,
        isCompleted: true,
      },
      {
        id: "s6",
        name: "Writing Skills",
        description: "Write simple paragraphs",
        progress: 100,
        isCompleted: true,
      },
    ],
    requirements: [
      {
        id: "r3",
        title: "Complete Elementary Course",
        description: "Finish all lessons in the elementary course",
        currentValue: 15,
        targetValue: 15,
        isCompleted: true,
        type: "course",
      },
      {
        id: "r4",
        title: "Pass Level Test",
        description: "Score at least 70% in the A2 level test",
        currentValue: 78,
        targetValue: 70,
        isCompleted: true,
        type: "exam",
      },
    ],
    tests: [
      {
        id: "t2",
        title: "A2 Level Test",
        level: "A2",
        duration: 40,
        questions: 25,
        passingScore: 70,
        attempts: 1,
        bestScore: 78,
        isCompleted: true,
        isPassed: true,
      },
    ],
  },
  {
    id: "3",
    name: "Intermediate",
    level: "B1",
    description: "Master intermediate English with professional communication skills",
    isCurrentLevel: true,
    isUnlocked: true,
    progress: 67,
    totalPoints: 2000,
    earnedPoints: 1340,
    skills: [
      {
        id: "s7",
        name: "Business Communication",
        description: "Professional email and presentations",
        progress: 80,
        isCompleted: false,
      },
      {
        id: "s8",
        name: "Advanced Grammar",
        description: "Complex sentence structures",
        progress: 65,
        isCompleted: false,
      },
      {
        id: "s9",
        name: "Fluency",
        description: "Speak confidently in various situations",
        progress: 55,
        isCompleted: false,
      },
    ],
    requirements: [
      {
        id: "r5",
        title: "Complete Business Course",
        description: "Finish Business English Communication course",
        currentValue: 26,
        targetValue: 48,
        isCompleted: false,
        type: "course",
      },
      {
        id: "r6",
        title: "Submit 10 Assignments",
        description: "Complete and submit 10 assignments",
        currentValue: 7,
        targetValue: 10,
        isCompleted: false,
        type: "assignment",
      },
      {
        id: "r7",
        title: "Pass Level Test",
        description: "Score at least 75% in the B1 level test",
        currentValue: 0,
        targetValue: 75,
        isCompleted: false,
        type: "exam",
      },
    ],
    tests: [
      {
        id: "t3",
        title: "B1 Level Test",
        level: "B1",
        duration: 60,
        questions: 40,
        passingScore: 75,
        attempts: 0,
        isCompleted: false,
        isPassed: false,
      },
    ],
  },
  {
    id: "4",
    name: "Upper Intermediate",
    level: "B2",
    description: "Achieve fluency in complex topics and professional contexts",
    isCurrentLevel: false,
    isUnlocked: false,
    progress: 0,
    totalPoints: 2500,
    earnedPoints: 0,
    skills: [
      {
        id: "s10",
        name: "Academic Writing",
        description: "Write essays and research papers",
        progress: 0,
        isCompleted: false,
      },
      {
        id: "s11",
        name: "Critical Thinking",
        description: "Analyze and discuss complex topics",
        progress: 0,
        isCompleted: false,
      },
      {
        id: "s12",
        name: "Advanced Vocabulary",
        description: "Master sophisticated expressions",
        progress: 0,
        isCompleted: false,
      },
    ],
    requirements: [
      {
        id: "r8",
        title: "Complete B1 Level",
        description: "Successfully complete B1 level requirements",
        currentValue: 0,
        targetValue: 1,
        isCompleted: false,
        type: "course",
      },
    ],
    tests: [
      {
        id: "t4",
        title: "B2 Level Test",
        level: "B2",
        duration: 75,
        questions: 50,
        passingScore: 75,
        attempts: 0,
        isCompleted: false,
        isPassed: false,
      },
    ],
  },
  {
    id: "5",
    name: "Advanced",
    level: "C1",
    description: "Master advanced English for academic and professional excellence",
    isCurrentLevel: false,
    isUnlocked: false,
    progress: 0,
    totalPoints: 3000,
    earnedPoints: 0,
    skills: [
      {
        id: "s13",
        name: "IELTS Preparation",
        description: "Prepare for IELTS examination",
        progress: 0,
        isCompleted: false,
      },
      {
        id: "s14",
        name: "Professional Presentations",
        description: "Deliver compelling presentations",
        progress: 0,
        isCompleted: false,
      },
      {
        id: "s15",
        name: "Debate Skills",
        description: "Argue and defend positions effectively",
        progress: 0,
        isCompleted: false,
      },
    ],
    requirements: [
      {
        id: "r9",
        title: "Complete B2 Level",
        description: "Successfully complete B2 level requirements",
        currentValue: 0,
        targetValue: 1,
        isCompleted: false,
        type: "course",
      },
    ],
    tests: [
      {
        id: "t5",
        title: "C1 Level Test",
        level: "C1",
        duration: 90,
        questions: 60,
        passingScore: 80,
        attempts: 0,
        isCompleted: false,
        isPassed: false,
      },
    ],
  },
  {
    id: "6",
    name: "Proficiency",
    level: "C2",
    description: "Achieve native-like proficiency in English",
    isCurrentLevel: false,
    isUnlocked: false,
    progress: 0,
    totalPoints: 3500,
    earnedPoints: 0,
    skills: [
      {
        id: "s16",
        name: "Native-like Fluency",
        description: "Speak like a native speaker",
        progress: 0,
        isCompleted: false,
      },
      {
        id: "s17",
        name: "Literary Analysis",
        description: "Analyze complex literature",
        progress: 0,
        isCompleted: false,
      },
      {
        id: "s18",
        name: "Expert Communication",
        description: "Communicate in any situation",
        progress: 0,
        isCompleted: false,
      },
    ],
    requirements: [
      {
        id: "r10",
        title: "Complete C1 Level",
        description: "Successfully complete C1 level requirements",
        currentValue: 0,
        targetValue: 1,
        isCompleted: false,
        type: "course",
      },
    ],
    tests: [
      {
        id: "t6",
        title: "C2 Level Test",
        level: "C2",
        duration: 120,
        questions: 80,
        passingScore: 85,
        attempts: 0,
        isCompleted: false,
        isPassed: false,
      },
    ],
  },
];

const learningPathData: LearningPathStep[] = [
  {
    id: "1",
    level: "A1",
    title: "Beginner",
    description: "Master basic vocabulary and simple phrases",
    status: "completed",
    progress: 100,
    estimatedDuration: "3 months",
    skills: ["Basic Vocabulary", "Simple Grammar", "Pronunciation"],
  },
  {
    id: "2",
    level: "A2",
    title: "Elementary",
    description: "Build conversational skills and reading comprehension",
    status: "completed",
    progress: 100,
    estimatedDuration: "4 months",
    skills: ["Conversational Skills", "Reading Comprehension", "Writing Skills"],
  },
  {
    id: "3",
    level: "B1",
    title: "Intermediate",
    description: "Develop professional communication skills",
    status: "current",
    progress: 67,
    estimatedDuration: "6 months",
    skills: ["Business Communication", "Advanced Grammar", "Fluency"],
  },
  {
    id: "4",
    level: "B2",
    title: "Upper Intermediate",
    description: "Achieve fluency in complex topics",
    status: "locked",
    progress: 0,
    estimatedDuration: "6 months",
    skills: ["Academic Writing", "Critical Thinking", "Advanced Vocabulary"],
  },
  {
    id: "5",
    level: "C1",
    title: "Advanced",
    description: "Master advanced English for professional excellence",
    status: "locked",
    progress: 0,
    estimatedDuration: "8 months",
    skills: ["IELTS Preparation", "Professional Presentations", "Debate Skills"],
  },
  {
    id: "6",
    level: "C2",
    title: "Proficiency",
    description: "Achieve native-like proficiency",
    status: "locked",
    progress: 0,
    estimatedDuration: "12 months",
    skills: ["Native-like Fluency", "Literary Analysis", "Expert Communication"],
  },
];

class LevelService {
  getAll(): Level[] {
    return levelsData;
  }

  getCurrentLevel(): Level | undefined {
    return levelsData.find((level) => level.isCurrentLevel);
  }

  getById(id: string): Level | undefined {
    return levelsData.find((level) => level.id === id);
  }

  getByLevelCode(levelCode: string): Level | undefined {
    return levelsData.find((level) => level.level === levelCode);
  }

  getLearningPath(): LearningPathStep[] {
    return learningPathData;
  }

  getUnlockedLevels(): Level[] {
    return levelsData.filter((level) => level.isUnlocked);
  }
}

export const levelService = new LevelService();
