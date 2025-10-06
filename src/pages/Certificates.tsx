import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Award, Share2, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { certificateService } from "@/services/certificate.service";
import { CertificateGenerator } from "@/components/CertificateGenerator";

const Certificates = () => {
  const { toast } = useToast();
  const certificates = certificateService.getAll();
  const studentName = "Ahmed Mohammed"; // يمكن استبداله بالبيانات الفعلية للطالب

  const handleShare = (certificateId: string) => {
    toast({
      title: "Share Certificate",
      description: "Certificate link copied to clipboard!",
    });
  };

  return (
    <MainLayout>
      <div className="p-8 space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Certificates</h1>
          <p className="text-muted-foreground">View and download your earned certificates</p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((certificate) => (
            <Card
              key={certificate.id}
              className="p-8 shadow-elegant hover:shadow-hover transition-all animate-scale-in bg-gradient-oxford text-primary-foreground"
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center mb-4 shadow-lg">
                  <Award className="w-10 h-10 text-accent-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Certificate of Completion</h2>
                <div className="w-16 h-1 bg-gradient-gold rounded-full mb-4"></div>
                <p className="text-lg font-semibold mb-2">{certificate.title}</p>
                <p className="text-sm opacity-80">{certificate.course}</p>
              </div>

              <div className="space-y-3 mb-6 bg-primary-foreground/10 rounded-lg p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="opacity-80">Issue Date:</span>
                  <span className="font-medium flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(certificate.issueDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="opacity-80">Grade:</span>
                  <span className="font-bold text-lg text-accent">{certificate.grade}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="opacity-80">Certificate No:</span>
                  <span className="font-mono text-xs">{certificate.certificateNumber}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <CertificateGenerator
                  certificate={certificate}
                  studentName={studentName}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare(certificate.id)}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State for More Certificates */}
        <Card className="p-12 shadow-elegant text-center border-dashed">
          <Award className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Keep Learning to Earn More Certificates
          </h3>
          <p className="text-muted-foreground mb-6">
            Complete your courses with excellent grades to unlock new certificates
          </p>
          <Button variant="gold">Browse Courses</Button>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Certificates;
