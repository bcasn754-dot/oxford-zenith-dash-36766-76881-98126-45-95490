import { MainLayout } from "@/components/layout/MainLayout";
import { CourseCard } from "@/components/CourseCard";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { courseService } from "@/services/course.service";
import { useLocalStorageCache } from "@/hooks/use-local-storage-cache";
import { useCallback, useMemo } from "react";

const MyCourses = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Cache all courses with 10 minute expiration
  const [cachedCourses] = useLocalStorageCache(
    "all_courses",
    courseService.getAll(),
    { expirationTime: 10 * 60 * 1000, version: "1.0" }
  );

  const allCourses = useMemo(() => cachedCourses, [cachedCourses]);

  const handleCourseClick = useCallback((courseId: string, isLocked: boolean) => {
    if (isLocked) {
      navigate("/payments");
    } else {
      navigate(`/courses/${courseId}`);
    }
  }, [navigate]);

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 animate-fade-in">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{t("my.courses.title")}</h1>
          <p className="text-sm sm:text-base text-muted-foreground">{t("my.courses.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {allCourses.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              onClick={() => handleCourseClick(course.id, course.isLocked)}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default MyCourses;
