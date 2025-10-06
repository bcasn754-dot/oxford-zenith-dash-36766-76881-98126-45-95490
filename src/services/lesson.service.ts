import { Lesson } from "@/models/lesson.model";

// Mock data - بيانات ثابتة للتجريب
const lessonsData: Lesson[] = [
  {
    id: "1",
    title: "Introduction to Business Communication",
    moduleId: "1",
    moduleName: "Introduction to Business English",
    courseId: "1",
    courseName: "Business English Communication",
    type: "video",
    duration: "15 mins",
    isCompleted: true,
    content: {
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      textContent: "Welcome to the Business English Communication course. In this lesson, we'll cover the fundamentals of professional communication in English.",
      pdfUrl: "/sample-lesson.pdf",
    },
  },
  {
    id: "2",
    title: "Business Vocabulary - Part 1",
    moduleId: "1",
    moduleName: "Introduction to Business English",
    courseId: "1",
    courseName: "Business English Communication",
    type: "vocabulary",
    duration: "20 mins",
    isCompleted: true,
    content: {
      vocabulary: [
        {
          word: "Negotiate",
          translation: "يتفاوض",
          pronunciation: "/nɪˈɡəʊʃieɪt/",
          audioUrl: "#",
          example: "We need to negotiate the terms of the contract.",
        },
        {
          word: "Meeting",
          translation: "اجتماع",
          pronunciation: "/ˈmiːtɪŋ/",
          audioUrl: "#",
          example: "The meeting is scheduled for 10 AM tomorrow.",
        },
        {
          word: "Deadline",
          translation: "موعد نهائي",
          pronunciation: "/ˈdedlaɪn/",
          audioUrl: "#",
          example: "We must finish the project before the deadline.",
        },
        {
          word: "Presentation",
          translation: "عرض تقديمي",
          pronunciation: "/ˌpreznˈteɪʃn/",
          audioUrl: "#",
          example: "She gave an excellent presentation to the board.",
        },
        {
          word: "Revenue",
          translation: "إيرادات",
          pronunciation: "/ˈrevənjuː/",
          audioUrl: "#",
          example: "Our revenue increased by 20% this quarter.",
        },
      ],
    },
  },
  {
    id: "3",
    title: "Professional Email Writing",
    moduleId: "2",
    moduleName: "Professional Email Writing",
    courseId: "1",
    courseName: "Business English Communication",
    type: "text",
    duration: "25 mins",
    isCompleted: false,
    content: {
      textContent: `# Professional Email Writing

## Introduction
Writing professional emails is a crucial skill in the business world. A well-written email can make a positive impression and achieve your communication goals effectively.

## Key Elements of a Professional Email

### 1. Subject Line
- Keep it clear and concise
- Reflect the email's content
- Use action words when appropriate

### 2. Greeting
- Use appropriate salutations (Dear, Hello, Hi)
- Include the recipient's name
- Be mindful of formality level

### 3. Body
- Start with the purpose
- Use clear, concise language
- Break text into paragraphs
- Use bullet points for lists

### 4. Closing
- Summarize action items
- Use professional sign-offs
- Include contact information

## Examples

### Formal Email
\`\`\`
Dear Mr. Johnson,

I am writing to follow up on our meeting last week regarding the marketing proposal.

As discussed, I have prepared the detailed budget breakdown and timeline for your review. Please find the attached document for your consideration.

Would you be available for a brief call next Tuesday to discuss any questions you might have?

Best regards,
Sarah Mitchell
Marketing Manager
\`\`\`

### Semi-Formal Email
\`\`\`
Hi James,

Thanks for your email about the project update.

I've reviewed the latest changes and everything looks great! Just a couple of quick thoughts:
- The timeline seems tight for Phase 2
- We might need additional resources for testing

Let me know when you're free to discuss.

Best,
Sarah
\`\`\`

## Best Practices
1. **Proofread** before sending
2. **Use appropriate tone** for your audience
3. **Keep it concise** - respect people's time
4. **Respond promptly** within 24 hours
5. **Use CC and BCC** appropriately

## Common Mistakes to Avoid
- Using all caps (SHOUTING)
- Too casual language in formal contexts
- Missing attachments
- Reply all when not necessary
- Unclear subject lines`,
      pdfUrl: "/email-writing-guide.pdf",
    },
  },
  {
    id: "4",
    title: "Business Story: A Day at the Office",
    moduleId: "2",
    moduleName: "Professional Email Writing",
    courseId: "1",
    courseName: "Business English Communication",
    type: "audio",
    duration: "10 mins",
    isCompleted: false,
    content: {
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      story: `Sarah walked into the office at 8:30 AM, ready for another busy day. Her first task was to respond to several urgent emails from international clients. She carefully crafted each response, making sure her tone was professional yet friendly.

At 10 AM, she had a video conference with the Tokyo team. Despite the language barriers, they managed to communicate effectively using clear, simple English and visual aids.

During lunch, Sarah reviewed a proposal her colleague had written. She made some suggestions to improve the clarity and structure of the document.

The afternoon was spent preparing a presentation for tomorrow's board meeting. Sarah knew that clear communication would be key to getting approval for her project.

By 6 PM, Sarah felt satisfied with her day's work. She had successfully navigated various communication challenges, from emails to presentations, all using her business English skills.`,
      textContent: "Listen to this story about a typical day in a business environment and note how professional English is used in different situations.",
    },
  },
];

class LessonService {
  // Get all lessons
  getAll(): Lesson[] {
    return lessonsData;
  }

  // Get lesson by ID
  getById(id: string): Lesson | undefined {
    return lessonsData.find((lesson) => lesson.id === id);
  }

  // Get lessons by course ID
  getByCourseId(courseId: string): Lesson[] {
    return lessonsData.filter((lesson) => lesson.courseId === courseId);
  }

  // Get lessons by module ID
  getByModuleId(moduleId: string): Lesson[] {
    return lessonsData.filter((lesson) => lesson.moduleId === moduleId);
  }

  // Get next lesson
  getNextLesson(currentLessonId: string): Lesson | undefined {
    const currentIndex = lessonsData.findIndex((l) => l.id === currentLessonId);
    if (currentIndex !== -1 && currentIndex < lessonsData.length - 1) {
      return lessonsData[currentIndex + 1];
    }
    return undefined;
  }

  // Mark lesson as completed
  markAsCompleted(id: string): Lesson | undefined {
    const lesson = lessonsData.find((l) => l.id === id);
    if (lesson) {
      lesson.isCompleted = true;
      return lesson;
    }
    return undefined;
  }
}

export const lessonService = new LessonService();
