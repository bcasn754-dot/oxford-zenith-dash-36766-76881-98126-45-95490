import { MainLayout } from "@/components/layout/MainLayout";
import { CourseCard } from "@/components/CourseCard";
import { BadgeLevel } from "@/components/ui/badge-level";
import { Clock, TrendingUp, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { courseService } from "@/services/course.service";
import { useLocalStorageCache } from "@/hooks/use-local-storage-cache";
import { useMemo, useCallback } from "react";

const recentActivities = [
  { icon: BookOpen, text: "Completed Lesson 5: Modal Verbs", time: "2 hours ago" },
  { icon: TrendingUp, text: "Achieved 90% on Quiz 3", time: "1 day ago" },
  { icon: Clock, text: "Attended Live Session", time: "2 days ago" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Cache courses data with 10 minute expiration
  const [cachedActiveCourses] = useLocalStorageCache(
    "active_courses",
    courseService.getActive(),
    { expirationTime: 10 * 60 * 1000, version: "1.0" }
  );
  
  const [cachedLockedCourses] = useLocalStorageCache(
    "locked_courses",
    courseService.getLocked().slice(0, 2),
    { expirationTime: 10 * 60 * 1000, version: "1.0" }
  );

  const activeCourse = useMemo(() => cachedActiveCourses[0], [cachedActiveCourses]);
  const lockedCourses = useMemo(() => cachedLockedCourses, [cachedLockedCourses]);

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
        {/* Welcome Section */}
        <div className="bg-gradient-oxford rounded-xl p-6 sm:p-8 text-primary-foreground shadow-elegant">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{t("welcome.back")}, Alex!</h1>
              <p className="text-sm sm:text-base text-primary-foreground/80">{t("continue.journey")}</p>
            </div>
            <BadgeLevel level={`${t("current.level")}: B1`} className="text-base sm:text-lg px-4 sm:px-6 py-2" />
          </div>
        </div>

        {/* Active Course */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">{t("active.course")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <CourseCard {...activeCourse} onClick={() => handleCourseClick(activeCourse.id, false)} />
          </div>
        </section>

        {/* Locked Courses */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">{t("explore.courses")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {lockedCourses.map((course) => (
              <CourseCard key={course.id} {...course} onClick={() => handleCourseClick(course.id, true)} />
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">{t("recent.activity")}</h2>
          <div className="bg-card rounded-xl p-4 sm:p-6 shadow-elegant">
            <div className="space-y-3 sm:space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm sm:text-base">{activity.text}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
