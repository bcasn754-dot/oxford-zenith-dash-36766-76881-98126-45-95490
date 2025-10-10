import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { ExamCard } from "@/components/ExamCard";
import { SkillTestCard } from "@/components/SkillTestCard";
import { TrendingUp, Award, Clock } from "lucide-react";
import { examService } from "@/services/exam.service";

const Exams = () => {
  const upcomingExams = examService.getUpcoming();
  const completedExams = examService.getCompleted();
  const averageGrade = examService.getAverageGrade();
  const skillTests = examService.getSkillTests();

  return (
    <MainLayout>
      <div className="p-8 space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Tests & Exams</h1>
          <p className="text-muted-foreground">View your exam schedule and results</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 shadow-elegant">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Grade</p>
                <p className="text-2xl font-bold text-accent">{averageGrade}%</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-elegant">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-foreground">{completedExams.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-elegant">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-lg bg-destructive/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold text-foreground">{upcomingExams.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Skills Tests */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Skills Assessment Tests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillTests.map((skillTest) => (
              <SkillTestCard 
                key={skillTest.id} 
                skillTest={skillTest}
                onStartTest={(id) => console.log('Start test:', id)}
              />
            ))}
          </div>
        </section>

        {/* Upcoming Exams */}
        {upcomingExams.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">Upcoming Exams</h2>
            <div className="space-y-4">
              {upcomingExams.map((exam) => (
                <ExamCard 
                  key={exam.id} 
                  exam={exam} 
                  onViewDetails={(id) => console.log('View exam:', id)} 
                />
              ))}
            </div>
          </section>
        )}

        {/* Completed Exams */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Exam History</h2>
          <div className="space-y-4">
            {completedExams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Exams;
