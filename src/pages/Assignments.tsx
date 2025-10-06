import { MainLayout } from "@/components/layout/MainLayout";
import { AssignmentCard } from "@/components/AssignmentCard";
import { useToast } from "@/hooks/use-toast";
import { assignmentService } from "@/services/assignment.service";

const Assignments = () => {
  const { toast } = useToast();
  const activeAssignments = assignmentService.getActive();
  const gradedAssignments = assignmentService.getGraded();

  const handleFileUpload = (assignmentId: string) => {
    toast({
      title: "File Upload",
      description: "File upload functionality ready. Select your file to submit.",
    });
  };

  return (
    <MainLayout>
      <div className="p-8 space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Assignments</h1>
          <p className="text-muted-foreground">View and submit your course assignments</p>
        </div>

        {/* Active Assignments */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Active Assignments</h2>
          <div className="space-y-4">
            {activeAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                onUpload={handleFileUpload}
              />
            ))}
          </div>
        </section>

        {/* Graded Assignments */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Graded Assignments</h2>
          <div className="space-y-4">
            {gradedAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Assignments;
