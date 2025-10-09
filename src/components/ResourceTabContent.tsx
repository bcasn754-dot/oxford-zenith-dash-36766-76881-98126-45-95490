import { memo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResourceCard } from "@/components/ResourceCard";
import { ResourceFilters } from "@/components/ResourceFilters";
import { Resource, ResourceType } from "@/models/resource.model";
import { Course } from "@/models/course.model";
import { LucideIcon } from "lucide-react";

interface ResourceTabContentProps {
  title: string;
  resources: Resource[];
  icon: LucideIcon;
  emptyMessage: string;
  selectedCourse: string;
  selectedLevel: string;
  allCourses: Course[];
  uniqueLevels: string[];
  onCourseChange: (value: string) => void;
  onLevelChange: (value: string) => void;
}

/**
 * Reusable resource tab content component
 * Handles display of filtered resources with filters
 * Memoized for performance
 */
export const ResourceTabContent = memo(
  ({
    title,
    resources,
    icon: Icon,
    emptyMessage,
    selectedCourse,
    selectedLevel,
    allCourses,
    uniqueLevels,
    onCourseChange,
    onLevelChange,
  }: ResourceTabContentProps) => {
    return (
      <div className="space-y-6 mt-6">
        <ResourceFilters
          selectedCourse={selectedCourse}
          selectedLevel={selectedLevel}
          allCourses={allCourses}
          uniqueLevels={uniqueLevels}
          onCourseChange={onCourseChange}
          onLevelChange={onLevelChange}
        />

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <Badge variant="secondary">{resources.length}</Badge>
        </div>

        <div className="space-y-4">
          {resources.length > 0 ? (
            resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))
          ) : (
            <Card className="p-12 text-center shadow-elegant">
              <Icon className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                لا توجد موارد
              </h3>
              <p className="text-muted-foreground">{emptyMessage}</p>
            </Card>
          )}
        </div>
      </div>
    );
  }
);

ResourceTabContent.displayName = "ResourceTabContent";
