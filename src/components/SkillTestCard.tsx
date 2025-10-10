import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Headphones, Mic, PenTool, Trophy, Target } from "lucide-react";
import { SkillTest } from "@/services/exam.service";

interface SkillTestCardProps {
  skillTest: SkillTest;
  onStartTest?: (id: string) => void;
}

export const SkillTestCard = ({ skillTest, onStartTest }: SkillTestCardProps) => {
  const getSkillIcon = (skill: SkillTest["skill"]) => {
    switch (skill) {
      case "reading":
        return <BookOpen className="w-6 h-6" />;
      case "listening":
        return <Headphones className="w-6 h-6" />;
      case "speaking":
        return <Mic className="w-6 h-6" />;
      case "writing":
        return <PenTool className="w-6 h-6" />;
    }
  };

  const getSkillColor = (skill: SkillTest["skill"]) => {
    switch (skill) {
      case "reading":
        return "bg-blue-500/20 text-blue-500";
      case "listening":
        return "bg-purple-500/20 text-purple-500";
      case "speaking":
        return "bg-orange-500/20 text-orange-500";
      case "writing":
        return "bg-green-500/20 text-green-500";
    }
  };

  const getSkillName = (skill: SkillTest["skill"]) => {
    return skill.charAt(0).toUpperCase() + skill.slice(1);
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getSkillColor(skillTest.skill)}`}>
            {getSkillIcon(skillTest.skill)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{getSkillName(skillTest.skill)} Test</h3>
            <p className="text-sm text-muted-foreground">Level {skillTest.level}</p>
          </div>
        </div>
        <Badge variant="outline" className="text-xs">
          {skillTest.attempts} {skillTest.attempts === 1 ? "Attempt" : "Attempts"}
        </Badge>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-muted-foreground flex items-center gap-1">
              <Target className="w-4 h-4" />
              Progress
            </span>
            <span className="font-medium text-foreground">{skillTest.progress}%</span>
          </div>
          <Progress value={skillTest.progress} className="h-2" />
        </div>

        {skillTest.bestScore && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              Best Score
            </span>
            <span className="font-semibold text-accent">{skillTest.bestScore}%</span>
          </div>
        )}
      </div>

      {onStartTest && skillTest.isAvailable && (
        <Button
          onClick={() => onStartTest(skillTest.id)}
          className="w-full"
          variant="default"
        >
          Start Test
        </Button>
      )}
    </Card>
  );
};
