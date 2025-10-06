export interface Lesson {
  id: string;
  title: string;
  moduleId: string;
  moduleName: string;
  courseId: string;
  courseName: string;
  type: "video" | "text" | "audio" | "quiz" | "vocabulary";
  duration: string;
  isCompleted: boolean;
  content: {
    videoUrl?: string;
    textContent?: string;
    audioUrl?: string;
    vocabulary?: VocabularyItem[];
    story?: string;
    pdfUrl?: string;
  };
}

export interface VocabularyItem {
  word: string;
  translation: string;
  pronunciation: string;
  audioUrl: string;
  example: string;
}
