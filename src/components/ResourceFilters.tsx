import { memo } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Course } from "@/models/course.model";

interface ResourceFiltersProps {
  selectedCourse: string;
  selectedLevel: string;
  allCourses: Course[];
  uniqueLevels: string[];
  onCourseChange: (value: string) => void;
  onLevelChange: (value: string) => void;
}

/**
 * Reusable resource filters component
 * Memoized for performance
 */
export const ResourceFilters = memo(
  ({
    selectedCourse,
    selectedLevel,
    allCourses,
    uniqueLevels,
    onCourseChange,
    onLevelChange,
  }: ResourceFiltersProps) => {
    return (
      <Card className="p-6 shadow-elegant">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-foreground mb-2 block">
              الكورس
            </label>
            <Select value={selectedCourse} onValueChange={onCourseChange}>
              <SelectTrigger>
                <SelectValue placeholder="اختر الكورس" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الكورسات</SelectItem>
                {allCourses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-foreground mb-2 block">
              المستوى
            </label>
            <Select value={selectedLevel} onValueChange={onLevelChange}>
              <SelectTrigger>
                <SelectValue placeholder="اختر المستوى" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المستويات</SelectItem>
                {uniqueLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    Level {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
    );
  }
);

ResourceFilters.displayName = "ResourceFilters";
