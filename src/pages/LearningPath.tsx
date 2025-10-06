import { MainLayout } from "@/components/layout/MainLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { levelService } from "@/services/level.service";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Lock, Trophy, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const LearningPath = () => {
  const { t } = useLanguage();
  const learningPath = levelService.getLearningPath();

  return (
    <MainLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-3">{t("learning.path")}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("learning.path.intro")}
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          <div className="space-y-8">
            {learningPath.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-0 w-16 h-16 rounded-full border-4 border-background bg-card shadow-lg hidden md:flex items-center justify-center z-10">
                  {step.status === "completed" ? (
                    <CheckCircle2 className="w-8 h-8 text-success" />
                  ) : step.status === "current" ? (
                    <Trophy className="w-8 h-8 text-accent" />
                  ) : (
                    <Lock className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>

                {/* Content Card */}
                <Card
                  className={`md:ml-24 transition-all hover:shadow-elegant ${
                    step.status === "current"
                      ? "border-primary shadow-lg ring-2 ring-primary/20"
                      : step.status === "completed"
                      ? "border-success/50"
                      : "opacity-75"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Badge
                            className={`text-lg px-3 py-1 ${
                              step.status === "current"
                                ? "bg-accent text-accent-foreground"
                                : step.status === "completed"
                                ? "bg-success text-success-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {step.level}
                          </Badge>
                          {step.status === "current" && (
                            <Badge className="bg-primary text-primary-foreground">
                              {t("current")}
                            </Badge>
                          )}
                          {step.status === "completed" && (
                            <Badge className="bg-success/10 text-success border-success">
                              {t("completed")}
                            </Badge>
                          )}
                        </div>
                        <h2 className="text-2xl font-bold mb-2">{step.title}</h2>
                        <p className="text-muted-foreground mb-3">{step.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>
                            {t("estimated.duration")}: {step.estimatedDuration}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">{t("key.skills")}:</p>
                      <div className="flex flex-wrap gap-2">
                        {step.skills.map((skill, idx) => (
                          <Badge key={idx} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Progress */}
                    {step.status !== "locked" && (
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{t("progress")}</span>
                          <span className="font-medium">{step.progress}%</span>
                        </div>
                        <Progress value={step.progress} className="h-2" />
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="flex justify-end">
                      {step.status === "current" ? (
                        <Link to="/level">
                          <Button className="gap-2">
                            {t("continue.learning")}
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      ) : step.status === "completed" ? (
                        <Link to="/level">
                          <Button variant="outline" className="gap-2">
                            {t("review.level")}
                          </Button>
                        </Link>
                      ) : (
                        <Button variant="ghost" disabled className="gap-2">
                          <Lock className="w-4 h-4" />
                          {t("locked")}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Arrow between steps */}
                {index < learningPath.length - 1 && (
                  <div className="hidden md:flex justify-center my-4">
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <Card className="max-w-4xl mx-auto mt-12 bg-gradient-oxford border-none">
          <CardContent className="p-8 text-center">
            <Trophy className="w-16 h-16 text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              {t("path.cta.title")}
            </h2>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              {t("path.cta.description")}
            </p>
            <Link to="/courses">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                {t("explore.courses")}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default LearningPath;
