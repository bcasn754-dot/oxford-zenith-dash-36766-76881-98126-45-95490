import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Common
    "welcome.back": "Welcome back",
    "continue.journey": "Continue your learning journey",
    "current.level": "Current Level",
    
    // Sidebar
    "dashboard": "Dashboard",
    "my.courses": "My Courses",
    "assignments": "Assignments",
    "schedule": "Schedule",
    "live.class": "Live Class",
    "payments": "Payments",
    "exams": "Exams",
    "certificates": "Certificates",
    "messages": "Messages",
    "notifications": "Notifications",
    "profile": "Profile",
    "settings": "Settings",
    
    // Dashboard
    "active.course": "Active Course",
    "explore.courses": "Explore More Courses",
    "recent.activity": "Recent Activity",
    
    // Courses
    "my.courses.title": "My Courses",
    "my.courses.subtitle": "Explore and manage your English learning courses",
    "teacher": "Teacher",
    "subscribe.now": "Subscribe Now",
    "continue.learning": "Continue Learning",
    "locked.course": "Locked Course",
    "course.details": "Course Details",
    "course.overview": "Course Overview",
    "what.you.learn": "What You'll Learn",
    "course.content": "Course Content",
    "instructor": "Instructor",
    "enroll.now": "Enroll Now",
    "start.learning": "Start Learning",
    "back.to.courses": "Back to Courses",
    
    // Header
    "welcome.student": "Welcome back, Student!",
    
    // Level & Learning Path
    "my.level": "My Level",
    "level": "Level",
    "level.subtitle": "Track your progress and level requirements",
    "overall.progress": "Overall Progress",
    "points": "Points",
    "skills.progress": "Skills Progress",
    "skills.description": "Develop these skills to advance to the next level",
    "next.level.requirements": "Requirements to Next Level",
    "requirements.description": "Complete these requirements to unlock the next level",
    "level.tests": "Level Tests",
    "tests.description": "Test your knowledge and earn your level certificate",
    "minutes": "minutes",
    "questions": "questions",
    "passing.score": "Passing Score",
    "passed": "Passed",
    "best.score": "Best Score",
    "attempts": "Attempts",
    "start.test": "Start Test",
    "retake.test": "Retake Test",
    "all.levels": "All Levels",
    "levels.overview": "Your complete learning journey from beginner to proficiency",
    "progress": "Progress",
    "view.learning.path": "View Your Learning Path",
    "learning.path.description": "See your complete journey from beginner to proficiency",
    "view.path": "View Path",
    "learning.path": "Learning Path",
    "learning.path.intro": "Your personalized journey to English proficiency. Track your progress through each level and unlock new skills.",
    "current": "Current",
    "completed": "Completed",
    "locked": "Locked",
    "estimated.duration": "Estimated Duration",
    "key.skills": "Key Skills",
    "review.level": "Review Level",
    "path.cta.title": "Keep Learning, Keep Growing!",
    "path.cta.description": "Every step brings you closer to fluency. Stay consistent and you'll achieve your goals.",
    "level.notfound": "No level information found",
  },
  ar: {
    // Common
    "welcome.back": "مرحباً بعودتك",
    "continue.journey": "تابع رحلتك التعليمية",
    "current.level": "المستوى الحالي",
    
    // Sidebar
    "dashboard": "لوحة التحكم",
    "my.courses": "دوراتي",
    "assignments": "الواجبات",
    "schedule": "الجدول",
    "live.class": "الحصة المباشرة",
    "payments": "المدفوعات",
    "exams": "الاختبارات",
    "certificates": "الشهادات",
    "messages": "الرسائل",
    "notifications": "الإشعارات",
    "profile": "الملف الشخصي",
    "settings": "الإعدادات",
    
    // Dashboard
    "active.course": "الدورة النشطة",
    "explore.courses": "استكشف المزيد من الدورات",
    "recent.activity": "النشاط الأخير",
    
    // Courses
    "my.courses.title": "دوراتي",
    "my.courses.subtitle": "استكشف وإدارة دورات تعلم اللغة الإنجليزية الخاصة بك",
    "teacher": "المعلم",
    "subscribe.now": "اشترك الآن",
    "continue.learning": "متابعة التعلم",
    "locked.course": "دورة مغلقة",
    "course.details": "تفاصيل الدورة",
    "course.overview": "نظرة عامة على الدورة",
    "what.you.learn": "ما ستتعلمه",
    "course.content": "محتوى الدورة",
    "instructor": "المدرس",
    "enroll.now": "سجل الآن",
    "start.learning": "ابدأ التعلم",
    "back.to.courses": "العودة إلى الدورات",
    
    // Header
    "welcome.student": "مرحباً بعودتك، طالب!",
    
    // Level & Learning Path
    "my.level": "مستواي",
    "level": "المستوى",
    "level.subtitle": "تتبع تقدمك ومتطلبات المستوى",
    "overall.progress": "التقدم الإجمالي",
    "points": "نقطة",
    "skills.progress": "تقدم المهارات",
    "skills.description": "قم بتطوير هذه المهارات للانتقال إلى المستوى التالي",
    "next.level.requirements": "متطلبات المستوى التالي",
    "requirements.description": "أكمل هذه المتطلبات لفتح المستوى التالي",
    "level.tests": "اختبارات المستوى",
    "tests.description": "اختبر معرفتك واحصل على شهادة مستواك",
    "minutes": "دقيقة",
    "questions": "سؤال",
    "passing.score": "درجة النجاح",
    "passed": "ناجح",
    "best.score": "أفضل درجة",
    "attempts": "المحاولات",
    "start.test": "ابدأ الاختبار",
    "retake.test": "إعادة الاختبار",
    "all.levels": "جميع المستويات",
    "levels.overview": "رحلتك التعليمية الكاملة من المبتدئ إلى الاحتراف",
    "progress": "التقدم",
    "view.learning.path": "عرض مسار التعلم",
    "learning.path.description": "شاهد رحلتك الكاملة من المبتدئ إلى الاحتراف",
    "view.path": "عرض المسار",
    "learning.path": "مسار التعلم",
    "learning.path.intro": "رحلتك الشخصية لإتقان اللغة الإنجليزية. تتبع تقدمك في كل مستوى وافتح مهارات جديدة.",
    "current": "الحالي",
    "completed": "مكتمل",
    "locked": "مغلق",
    "estimated.duration": "المدة المقدرة",
    "key.skills": "المهارات الأساسية",
    "review.level": "مراجعة المستوى",
    "path.cta.title": "استمر في التعلم، استمر في النمو!",
    "path.cta.description": "كل خطوة تقربك من الطلاقة. كن منتظماً وستحقق أهدافك.",
    "level.notfound": "لم يتم العثور على معلومات المستوى",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};