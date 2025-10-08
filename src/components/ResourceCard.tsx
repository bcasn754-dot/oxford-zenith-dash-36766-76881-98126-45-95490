import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Resource } from "@/models/resource.model";
import { ExternalLink, FileAudio, BookOpen, FolderKanban, BookMarked, FileText } from "lucide-react";

interface ResourceCardProps {
  resource: Resource;
}

const getResourceIcon = (type: Resource["type"]) => {
  switch (type) {
    case "audio":
      return FileAudio;
    case "story":
      return BookOpen;
    case "project":
      return FolderKanban;
    case "workbook":
      return BookMarked;
    case "test":
      return FileText;
    default:
      return FileText;
  }
};

const getResourceColor = (type: Resource["type"]) => {
  switch (type) {
    case "audio":
      return "text-blue-500 bg-blue-500/10";
    case "story":
      return "text-purple-500 bg-purple-500/10";
    case "project":
      return "text-green-500 bg-green-500/10";
    case "workbook":
      return "text-orange-500 bg-orange-500/10";
    case "test":
      return "text-red-500 bg-red-500/10";
    default:
      return "text-muted-foreground bg-muted";
  }
};

export const ResourceCard = ({ resource }: ResourceCardProps) => {
  const Icon = getResourceIcon(resource.type);
  const colorClass = getResourceColor(resource.type);

  const handleOpenResource = () => {
    window.open(resource.googleDriveUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Card className="p-6 shadow-elegant hover:shadow-hover transition-all duration-300 group">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-lg ${colorClass} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                {resource.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {resource.courseName}
              </p>
            </div>
            <Badge variant="secondary" className="flex-shrink-0">
              {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
            </Badge>
          </div>

          {resource.description && (
            <p className="text-sm text-muted-foreground mb-3">
              {resource.description}
            </p>
          )}

          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {resource.duration && (
                <span className="flex items-center gap-1">
                  ⏱️ {resource.duration}
                </span>
              )}
              <span>
                📅 {new Date(resource.uploadDate).toLocaleDateString('ar-YE')}
              </span>
            </div>

            <Button
              onClick={handleOpenResource}
              size="sm"
              className="gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Open in Drive
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
