import { MainLayout } from "@/components/layout/MainLayout";
import { AssignmentCard } from "@/components/AssignmentCard";
import { ResourceCard } from "@/components/ResourceCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { assignmentService } from "@/services/assignment.service";
import { resourceService } from "@/services/resource.service";
import { Upload, Search, FileAudio, BookOpen, FolderKanban, BookMarked, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Assignments = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "submitted" | "graded">("all");
  const [activeTab, setActiveTab] = useState("assignments");
  
  const activeAssignments = assignmentService.getActive();
  const gradedAssignments = assignmentService.getGraded();
  
  const audioResources = resourceService.getByType("audio");
  const storyResources = resourceService.getByType("story");
  const projectResources = resourceService.getByType("project");
  const workbookResources = resourceService.getByType("workbook");
  const testResources = resourceService.getByType("test");

  const handleFileUpload = (assignmentId: string) => {
    // في التطبيق الحقيقي، هنا سيتم فتح نافذة اختيار الملف
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
        // هنا يمكن إضافة منطق رفع الملف
      }
    };
    input.click();
  };

  const getStatusCount = (status: "pending" | "submitted" | "graded") => {
    return assignmentService.getByStatus(status).length;
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Course Materials</h1>
          <p className="text-muted-foreground">Access assignments and learning resources</p>
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
          <TabsContent value="assignments" className="space-y-6 mt-6">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-6 shadow-elegant hover:shadow-hover transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending</p>
                <p className="text-3xl font-bold text-foreground">{getStatusCount("pending")}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Upload className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
          </Card>
          <Card className="p-6 shadow-elegant hover:shadow-hover transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Submitted</p>
                <p className="text-3xl font-bold text-foreground">{getStatusCount("submitted")}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Upload className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </Card>
          <Card className="p-6 shadow-elegant hover:shadow-hover transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Graded</p>
                <p className="text-3xl font-bold text-foreground">{getStatusCount("graded")}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Badge className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="p-6 shadow-elegant">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search assignments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("all")}
              >
                All
              </Button>
              <Button
                variant={filterStatus === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("pending")}
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === "submitted" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("submitted")}
              >
                Submitted
              </Button>
              <Button
                variant={filterStatus === "graded" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("graded")}
              >
                Graded
              </Button>
            </div>
          </div>
        </Card>

        {/* Active Assignments */}
        {(filterStatus === "all" || filterStatus === "pending" || filterStatus === "submitted") && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">Active Assignments</h2>
              <Badge variant="secondary">{activeAssignments.length}</Badge>
            </div>
            <div className="space-y-4">
              {activeAssignments.length > 0 ? (
                activeAssignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    onUpload={handleFileUpload}
                  />
                ))
              ) : (
                <Card className="p-12 text-center shadow-elegant">
                  <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No Active Assignments
                  </h3>
                  <p className="text-muted-foreground">
                    You're all caught up! Check back later for new assignments.
                  </p>
                </Card>
              )}
            </div>
          </section>
        )}

        {/* Graded Assignments */}
        {(filterStatus === "all" || filterStatus === "graded") && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">Graded Assignments</h2>
              <Badge variant="secondary">{gradedAssignments.length}</Badge>
            </div>
            <div className="space-y-4">
              {gradedAssignments.length > 0 ? (
                gradedAssignments.map((assignment) => (
                  <AssignmentCard key={assignment.id} assignment={assignment} />
                ))
              ) : (
                <Card className="p-12 text-center shadow-elegant">
                  <Badge className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No Graded Assignments Yet
                  </h3>
                  <p className="text-muted-foreground">
                    Complete and submit your assignments to see your grades here.
                  </p>
                </Card>
              )}
            </div>
          </section>
        )}

            {/* Tips Card */}
            <Card className="p-6 bg-gradient-oxford text-primary-foreground shadow-elegant">
              <h3 className="text-lg font-bold mb-3">📝 Assignment Tips</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• Submit your assignments before the deadline to avoid penalties</li>
                <li>• Accepted formats: PDF, DOC, DOCX, PPT, PPTX</li>
                <li>• Maximum file size: 10MB</li>
                <li>• Check feedback carefully to improve future submissions</li>
                <li>• Contact your instructor if you need an extension</li>
              </ul>
            </Card>
          </TabsContent>

          {/* Audio Tab */}
          <TabsContent value="audio" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Audio Resources</h2>
              <Badge variant="secondary">{audioResources.length}</Badge>
            </div>
            <div className="space-y-4">
              {audioResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>

          {/* Story Tab */}
          <TabsContent value="story" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Story Resources</h2>
              <Badge variant="secondary">{storyResources.length}</Badge>
            </div>
            <div className="space-y-4">
              {storyResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>

          {/* Project Tab */}
          <TabsContent value="project" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Project Resources</h2>
              <Badge variant="secondary">{projectResources.length}</Badge>
            </div>
            <div className="space-y-4">
              {projectResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>

          {/* Workbook Tab */}
          <TabsContent value="workbook" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Workbook Resources</h2>
              <Badge variant="secondary">{workbookResources.length}</Badge>
            </div>
            <div className="space-y-4">
              {workbookResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>

          {/* Tests Tab */}
          <TabsContent value="tests" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Test Resources</h2>
              <Badge variant="secondary">{testResources.length}</Badge>
            </div>
            <div className="space-y-4">
              {testResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Assignments;
