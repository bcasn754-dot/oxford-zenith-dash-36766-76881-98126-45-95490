import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Download,
  Volume2,
  BookOpen,
  Video,
  FileText,
  ExternalLink,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { lessonService } from "@/services/lesson.service";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

const LessonViewer = () => {
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams();
  const { toast } = useToast();
  const [currentLesson, setCurrentLesson] = useState(
    lessonService.getById(lessonId || "")
  );

  if (!currentLesson) {
    navigate("/courses");
    return null;
  }

  const courseLessons = lessonService.getByCourseId(courseId || "");
  const currentIndex = courseLessons.findIndex((l) => l.id === currentLesson.id);
  const progress = ((currentIndex + 1) / courseLessons.length) * 100;

  const handleMarkComplete = () => {
    lessonService.markAsCompleted(currentLesson.id);
    toast({
      title: "Lesson Completed!",
      description: "Great job! Keep up the good work.",
    });
    const nextLesson = lessonService.getNextLesson(currentLesson.id);
    if (nextLesson) {
      setCurrentLesson(nextLesson);
      navigate(`/courses/${courseId}/lessons/${nextLesson.id}`);
    }
  };

  const handleDownloadPDF = () => {
    toast({
      title: "Downloading PDF",
      description: "Your lesson material is being prepared...",
    });
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-5 h-5" />;
      case "audio":
        return <Volume2 className="w-5 h-5" />;
      case "vocabulary":
        return <BookOpen className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate(`/courses/${courseId}`)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Course
          </Button>
          <Badge variant="secondary" className="gap-2">
            {getLessonIcon(currentLesson.type)}
            {currentLesson.type.charAt(0).toUpperCase() + currentLesson.type.slice(1)}
          </Badge>
        </div>

        {/* Progress */}
        <Card className="p-6 shadow-elegant">
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-muted-foreground">Course Progress</span>
            <span className="text-accent font-semibold">{Math.round(progress)}%</span>
          </div>
          <ProgressBar progress={progress} />
          <p className="text-sm text-muted-foreground mt-2">
            Lesson {currentIndex + 1} of {courseLessons.length}
          </p>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lesson Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 sm:p-8 shadow-elegant">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                    {currentLesson.title}
                  </h1>
                  <p className="text-muted-foreground">{currentLesson.moduleName}</p>
                </div>
                {currentLesson.isCompleted && (
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                )}
              </div>

              {/* Video Content */}
              {currentLesson.type === "video" && currentLesson.content.videoUrl && (
                <div className="mb-6">
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <iframe
                      src={currentLesson.content.videoUrl}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Audio Content */}
              {currentLesson.type === "audio" && (
                <div className="mb-6">
                  <Card className="p-6 bg-gradient-oxford">
                    <Volume2 className="w-12 h-12 text-primary-foreground mb-4" />
                    <audio
                      controls
                      className="w-full mb-4"
                      src={currentLesson.content.audioUrl}
                    >
                      Your browser does not support the audio element.
                    </audio>
                    {currentLesson.content.story && (
                      <div className="mt-4 p-4 bg-primary-foreground/10 rounded-lg">
                        <h3 className="font-semibold text-primary-foreground mb-2">
                          Story Transcript
                        </h3>
                        <p className="text-primary-foreground/90 whitespace-pre-line">
                          {currentLesson.content.story}
                        </p>
                      </div>
                    )}
                  </Card>
                </div>
              )}

              {/* Text Content */}
              {currentLesson.content.textContent && currentLesson.type !== "vocabulary" && (
                <div className="prose prose-sm sm:prose max-w-none dark:prose-invert mb-6">
                  <ReactMarkdown>{currentLesson.content.textContent}</ReactMarkdown>
                </div>
              )}

              {/* Vocabulary Content */}
              {currentLesson.type === "vocabulary" && currentLesson.content.vocabulary && (
                <>
                  <h2 className="text-xl font-bold text-foreground mb-4">مفردات الدرس</h2>
                  <div className="space-y-4 mb-6">
                    {currentLesson.content.vocabulary.map((item, index) => (
                      <Card key={index} className="p-6 hover:shadow-hover transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-1">
                              {item.word}
                            </h3>
                            <p className="text-sm text-muted-foreground">{item.pronunciation}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              if (item.audioUrl && item.audioUrl !== "#") {
                                const audio = new Audio(item.audioUrl);
                                audio.play();
                              }
                            }}
                          >
                            <Volume2 className="w-5 h-5" />
                          </Button>
                        </div>
                        <p className="text-lg text-accent mb-2">{item.translation}</p>
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm text-foreground italic">
                            <span className="font-semibold">Example:</span> {item.example}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </>
              )}

              {/* References Section */}
              {currentLesson.content.pdfUrl && (
                <Card className="p-6 bg-accent/5 mb-6">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    مراجع الدرس
                  </h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                      onClick={handleDownloadPDF}
                    >
                      <Download className="w-4 h-4" />
                      تحميل ملف PDF للدرس
                    </Button>
                    {currentLesson.content.videoUrl && (
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2"
                        onClick={() => window.open(currentLesson.content.videoUrl, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4" />
                        فتح الفيديو في نافذة جديدة
                      </Button>
                    )}
                  </div>
                </Card>
              )}

            </Card>

            {/* Navigation */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                disabled={currentIndex === 0}
                onClick={() => {
                  const prevLesson = courseLessons[currentIndex - 1];
                  if (prevLesson) {
                    setCurrentLesson(prevLesson);
                    navigate(`/courses/${courseId}/lessons/${prevLesson.id}`);
                  }
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              {!currentLesson.isCompleted && (
                <Button variant="gold" className="flex-1" onClick={handleMarkComplete}>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Mark as Complete
                </Button>
              )}
              <Button
                variant={currentLesson.isCompleted ? "oxford" : "outline"}
                className="flex-1"
                disabled={currentIndex === courseLessons.length - 1}
                onClick={() => {
                  const nextLesson = courseLessons[currentIndex + 1];
                  if (nextLesson) {
                    setCurrentLesson(nextLesson);
                    navigate(`/courses/${courseId}/lessons/${nextLesson.id}`);
                  }
                }}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Sidebar - Lesson List */}
          <div>
            <Card className="p-6 shadow-elegant sticky top-24">
              <h3 className="text-lg font-bold text-foreground mb-4">Course Lessons</h3>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {courseLessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setCurrentLesson(lesson);
                      navigate(`/courses/${courseId}/lessons/${lesson.id}`);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      lesson.id === currentLesson.id
                        ? "bg-gradient-oxford text-primary-foreground"
                        : "hover:bg-accent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex-shrink-0 ${
                          lesson.isCompleted ? "text-green-500" : "text-muted-foreground"
                        }`}
                      >
                        {lesson.isCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <span className="text-sm font-semibold">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium truncate ${
                            lesson.id === currentLesson.id
                              ? "text-primary-foreground"
                              : "text-foreground"
                          }`}
                        >
                          {lesson.title}
                        </p>
                        <p
                          className={`text-xs ${
                            lesson.id === currentLesson.id
                              ? "text-primary-foreground/80"
                              : "text-muted-foreground"
                          }`}
                        >
                          {lesson.duration}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LessonViewer;
