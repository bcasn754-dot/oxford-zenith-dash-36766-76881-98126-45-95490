import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssignmentsTabContent } from "@/components/AssignmentsTabContent";
import { ResourceTabContent } from "@/components/ResourceTabContent";
import { useToast } from "@/hooks/use-toast";
import { assignmentService } from "@/services/assignment.service";
import { resourceService } from "@/services/resource.service";
import { courseService } from "@/services/course.service";
import { useResourceFilter } from "@/hooks/use-resource-filter";
import {
  Upload,
  FileAudio,
  BookOpen,
  FolderKanban,
  BookMarked,
  FileText,
} from "lucide-react";
import { useState, useMemo, useCallback } from "react";

const Assignments = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "submitted" | "graded"
  >("all");
  const [activeTab, setActiveTab] = useState("assignments");
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  const activeAssignments = useMemo(
    () => assignmentService.getActive(),
    []
  );
  const gradedAssignments = useMemo(
    () => assignmentService.getGraded(),
    []
  );
  const allCourses = useMemo(() => courseService.getAll(), []);

  // Get unique levels
  const uniqueLevels = useMemo(
    () => Array.from(new Set(allCourses.map((c) => c.level))),
    [allCourses]
  );

  // Get resources by type
  const audioResources = useResourceFilter({
    resources: resourceService.getByType("audio"),
    selectedCourse,
    selectedLevel,
    allCourses,
  });

  const storyResources = useResourceFilter({
    resources: resourceService.getByType("story"),
    selectedCourse,
    selectedLevel,
    allCourses,
  });

  const projectResources = useResourceFilter({
    resources: resourceService.getByType("project"),
    selectedCourse,
    selectedLevel,
    allCourses,
  });

  const workbookResources = useResourceFilter({
    resources: resourceService.getByType("workbook"),
    selectedCourse,
    selectedLevel,
    allCourses,
  });

  const testResources = useResourceFilter({
    resources: resourceService.getByType("test"),
    selectedCourse,
    selectedLevel,
    allCourses,
  });

  const handleFileUpload = useCallback(
    (assignmentId: string) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".pdf,.doc,.docx,.ppt,.pptx";
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          toast({
            title: "File Uploaded Successfully",
            description: `${file.name} has been submitted for grading.`,
          });
        }
      };
      input.click();
    },
    [toast]
  );

  const getStatusCount = useCallback(
    (status: "pending" | "submitted" | "graded") => {
      return assignmentService.getByStatus(status).length;
    },
    []
  );

  const handleCourseChange = useCallback((value: string) => {
    setSelectedCourse(value);
  }, []);

  const handleLevelChange = useCallback((value: string) => {
    setSelectedLevel(value);
  }, []);

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Course Materials
          </h1>
          <p className="text-muted-foreground">
            Access assignments and learning resources
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid">
            <TabsTrigger value="assignments" className="gap-2">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Assignments</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="gap-2">
              <FileAudio className="w-4 h-4" />
              <span className="hidden sm:inline">Audio</span>
            </TabsTrigger>
            <TabsTrigger value="story" className="gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Story</span>
            </TabsTrigger>
            <TabsTrigger value="project" className="gap-2">
              <FolderKanban className="w-4 h-4" />
              <span className="hidden sm:inline">Project</span>
            </TabsTrigger>
            <TabsTrigger value="workbook" className="gap-2">
              <BookMarked className="w-4 h-4" />
              <span className="hidden sm:inline">Workbook</span>
            </TabsTrigger>
            <TabsTrigger value="tests" className="gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Tests</span>
            </TabsTrigger>
          </TabsList>

          {/* Assignments Tab */}
          <TabsContent value="assignments">
            <AssignmentsTabContent
              searchQuery={searchQuery}
              filterStatus={filterStatus}
              activeAssignments={activeAssignments}
              gradedAssignments={gradedAssignments}
              pendingCount={getStatusCount("pending")}
              submittedCount={getStatusCount("submitted")}
              gradedCount={getStatusCount("graded")}
              onSearchChange={setSearchQuery}
              onFilterChange={setFilterStatus}
              onFileUpload={handleFileUpload}
            />
          </TabsContent>

          {/* Audio Tab */}
          <TabsContent value="audio">
            <ResourceTabContent
              title="Audio Resources"
              resources={audioResources}
              icon={FileAudio}
              emptyMessage="لم يتم العثور على موارد صوتية للكورس والمستوى المحدد"
              selectedCourse={selectedCourse}
              selectedLevel={selectedLevel}
              allCourses={allCourses}
              uniqueLevels={uniqueLevels}
              onCourseChange={handleCourseChange}
              onLevelChange={handleLevelChange}
            />
          </TabsContent>

          {/* Story Tab */}
          <TabsContent value="story">
            <ResourceTabContent
              title="Story Resources"
              resources={storyResources}
              icon={BookOpen}
              emptyMessage="لم يتم العثور على قصص للكورس والمستوى المحدد"
              selectedCourse={selectedCourse}
              selectedLevel={selectedLevel}
              allCourses={allCourses}
              uniqueLevels={uniqueLevels}
              onCourseChange={handleCourseChange}
              onLevelChange={handleLevelChange}
            />
          </TabsContent>

          {/* Project Tab */}
          <TabsContent value="project">
            <ResourceTabContent
              title="Project Resources"
              resources={projectResources}
              icon={FolderKanban}
              emptyMessage="لم يتم العثور على مشاريع للكورس والمستوى المحدد"
              selectedCourse={selectedCourse}
              selectedLevel={selectedLevel}
              allCourses={allCourses}
              uniqueLevels={uniqueLevels}
              onCourseChange={handleCourseChange}
              onLevelChange={handleLevelChange}
            />
          </TabsContent>

          {/* Workbook Tab */}
          <TabsContent value="workbook">
            <ResourceTabContent
              title="Workbook Resources"
              resources={workbookResources}
              icon={BookMarked}
              emptyMessage="لم يتم العثور على كتب عمل للكورس والمستوى المحدد"
              selectedCourse={selectedCourse}
              selectedLevel={selectedLevel}
              allCourses={allCourses}
              uniqueLevels={uniqueLevels}
              onCourseChange={handleCourseChange}
              onLevelChange={handleLevelChange}
            />
          </TabsContent>

          {/* Tests Tab */}
          <TabsContent value="tests">
            <ResourceTabContent
              title="Test Resources"
              resources={testResources}
              icon={FileText}
              emptyMessage="لم يتم العثور على اختبارات للكورس والمستوى المحدد"
              selectedCourse={selectedCourse}
              selectedLevel={selectedLevel}
              allCourses={allCourses}
              uniqueLevels={uniqueLevels}
              onCourseChange={handleCourseChange}
              onLevelChange={handleLevelChange}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Assignments;
