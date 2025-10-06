import { MainLayout } from "@/components/layout/MainLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { levelService } from "@/services/level.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, Lock, Trophy, Target, BookOpen, FileText, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const LevelDetails = () => {
  const { t } = useLanguage();
  const currentLevel = levelService.getCurrentLevel();
  const allLevels = levelService.getAll();

  if (!currentLevel) {
    return (
      <MainLayout>
        <div className="p-6">
          <p>{t("level.notfound")}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{t("my.level")}</h1>
          <p className="text-muted-foreground">{t("level.subtitle")}</p>
        </div>

        {/* Current Level Overview */}
        <Card className="bg-gradient-oxford shadow-elegant border-none">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-white">{currentLevel.name}</CardTitle>
                <CardDescription className="text-white/80">
                  {t("level")} {currentLevel.level}
                </CardDescription>
              </div>
              <Badge className="bg-accent text-accent-foreground text-lg px-4 py-2">
                {currentLevel.level}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-white/90">{currentLevel.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-white/90">
                <span>{t("overall.progress")}</span>
                <span>{currentLevel.progress}%</span>
              </div>
              <Progress value={currentLevel.progress} className="h-3" />
            </div>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-accent" />
                <span>
                  {currentLevel.earnedPoints} / {currentLevel.totalPoints} {t("points")}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Progress */}
        <Card>
          <CardHeader>
            <CardTitle>{t("skills.progress")}</CardTitle>
            <CardDescription>{t("skills.description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentLevel.skills.map((skill) => (
              <div key={skill.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {skill.isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-medium">{skill.name}</p>
                      <p className="text-sm text-muted-foreground">{skill.description}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{skill.progress}%</span>
                </div>
                <Progress value={skill.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Requirements to Next Level */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              {t("next.level.requirements")}
            </CardTitle>
            <CardDescription>{t("requirements.description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentLevel.requirements.map((req) => (
              <div
                key={req.id}
                className={`p-4 rounded-lg border ${
                  req.isCompleted ? "bg-success/5 border-success" : "bg-muted"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-3">
                    {req.type === "course" && <BookOpen className="w-5 h-5 mt-1" />}
                    {req.type === "exam" && <FileText className="w-5 h-5 mt-1" />}
                    {req.type === "assignment" && <FileText className="w-5 h-5 mt-1" />}
                    <div>
                      <p className="font-medium">{req.title}</p>
                      <p className="text-sm text-muted-foreground">{req.description}</p>
                    </div>
                  </div>
                  {req.isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  ) : (
                    <span className="text-sm font-medium">
                      {req.currentValue}/{req.targetValue}
                    </span>
                  )}
                </div>
                {!req.isCompleted && (
                  <Progress
                    value={(req.currentValue / req.targetValue) * 100}
                    className="h-2 mt-2"
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Level Tests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {t("level.tests")}
            </CardTitle>
            <CardDescription>{t("tests.description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentLevel.tests.map((test) => (
              <div key={test.id} className="p-4 rounded-lg border bg-card">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{test.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {test.duration} {t("minutes")}
                      </span>
                      <span>{test.questions} {t("questions")}</span>
                      <span>{t("passing.score")}: {test.passingScore}%</span>
                    </div>
                  </div>
                  {test.isCompleted && test.isPassed && (
                    <Badge className="bg-success text-success-foreground">
                      {t("passed")}
                    </Badge>
                  )}
                </div>
                {test.bestScore && (
                  <div className="mb-3">
                    <p className="text-sm text-muted-foreground mb-1">{t("best.score")}</p>
                    <div className="flex items-center gap-2">
                      <Progress value={test.bestScore} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{test.bestScore}%</span>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {t("attempts")}: {test.attempts}
                  </p>
                  {!test.isCompleted || !test.isPassed ? (
                    <Button>{t("start.test")}</Button>
                  ) : (
                    <Button variant="outline">{t("retake.test")}</Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* All Levels Overview */}
        <Card>
          <CardHeader>
            <CardTitle>{t("all.levels")}</CardTitle>
            <CardDescription>{t("levels.overview")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allLevels.map((level) => (
                <div
                  key={level.id}
                  className={`p-4 rounded-lg border transition-all ${
                    level.isCurrentLevel
                      ? "border-primary bg-primary/5"
                      : level.isUnlocked
                      ? "border-border bg-card hover:shadow-md"
                      : "border-border bg-muted opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant={level.isCurrentLevel ? "default" : "outline"}
                      className={level.isCurrentLevel ? "bg-accent text-accent-foreground" : ""}
                    >
                      {level.level}
                    </Badge>
                    {!level.isUnlocked && <Lock className="w-4 h-4 text-muted-foreground" />}
                    {level.isCurrentLevel && <Trophy className="w-4 h-4 text-accent" />}
                  </div>
                  <h3 className="font-semibold mb-1">{level.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{level.description}</p>
                  {level.isUnlocked && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{t("progress")}</span>
                        <span>{level.progress}%</span>
                      </div>
                      <Progress value={level.progress} className="h-1.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Path CTA */}
        <Card className="bg-gradient-gold border-none">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("view.learning.path")}
                </h3>
                <p className="text-muted-foreground">
                  {t("learning.path.description")}
                </p>
              </div>
              <Link to="/learning-path">
                <Button size="lg">{t("view.path")}</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default LevelDetails;
