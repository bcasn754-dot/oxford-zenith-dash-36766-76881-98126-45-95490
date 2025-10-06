import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { BadgeLevel } from "@/components/ui/badge-level";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ArrowLeft, Clock, BookOpen, Award, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { courseService } from "@/services/course.service";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { t } = useLanguage();
  
  const course = courseService.getById(courseId || "");
  
  if (!course) {
    navigate("/courses");
    return null;
  }

  const completedLessons = course.modules?.reduce((acc, module) => acc + module.completed, 0) || 0;

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 animate-fade-in">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/courses")}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("back.to.courses")}
        </Button>

        {/* Course Header */}
        <div className="bg-card rounded-xl overflow-hidden shadow-elegant">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Course Image */}
            <div className="relative h-64 sm:h-80 lg:h-full">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Course Info */}
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <BadgeLevel level={course.level} className="mb-4" />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {course.title}
              </h1>
              <p className="text-muted-foreground mb-6">{course.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-semibold text-foreground">{course.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Lessons</p>
                    <p className="font-semibold text-foreground">{course.lessons}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Students</p>
                    <p className="font-semibold text-foreground">{course.students}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Certificate</p>
                    <p className="font-semibold text-foreground">Yes</p>
                  </div>
                </div>
              </div>

              {/* Progress */}
              {!course.isLocked && (
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      {completedLessons} of {course.lessons} lessons completed
                    </span>
                    <span className="text-sm font-semibold text-accent">{course.progress}%</span>
                  </div>
                  <ProgressBar progress={course.progress} />
                </div>
              )}

              <Button
                variant={course.isLocked ? "gold" : "oxford"}
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => {
                  if (!course.isLocked) {
                    // الانتقال لأول درس في الكورس
                    navigate(`/courses/${course.id}/lessons/1`);
                  }
                }}
              >
                {course.isLocked ? t("enroll.now") : t("continue.learning")}
              </Button>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* What You'll Learn */}
            <div className="bg-card rounded-xl p-6 sm:p-8 shadow-elegant">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                {t("what.you.learn")}
              </h2>
              <ul className="space-y-3">
                {course.learningPoints?.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                    <span className="text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Course Modules */}
            <div className="bg-card rounded-xl p-6 sm:p-8 shadow-elegant">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
                {t("course.content")}
              </h2>
              <div className="space-y-4">
                {course.modules?.map((module, index) => (
                  <div
                    key={index}
                    className="border border-border rounded-lg p-4 hover:shadow-hover transition-shadow"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">
                        {index + 1}. {module.title}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {module.lessons} lessons
                      </span>
                    </div>
                    {module.completed > 0 && (
                      <div className="mt-3">
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="text-muted-foreground">
                            {module.completed} of {module.lessons} completed
                          </span>
                          <span className="text-accent font-semibold">
                            {Math.round((module.completed / module.lessons) * 100)}%
                          </span>
                        </div>
                        <ProgressBar progress={(module.completed / module.lessons) * 100} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-card rounded-xl p-6 shadow-elegant sticky top-24">
              <h3 className="text-lg font-bold text-foreground mb-4">{t("instructor")}</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground font-bold text-xl">
                  {course.teacher.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{course.teacher}</p>
                  <p className="text-sm text-muted-foreground">English Language Expert</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Expert educator with over 15 years of experience in teaching business English
                to professionals worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CourseDetails;