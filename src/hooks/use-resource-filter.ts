import { useMemo } from "react";
import { Resource } from "@/models/resource.model";
import { Course } from "@/models/course.model";

interface UseResourceFilterProps {
  resources: Resource[];
  selectedCourse: string;
  selectedLevel: string;
  allCourses: Course[];
}

/**
 * Custom hook for filtering resources by course and level
 * Memoized to prevent unnecessary recalculations
 */
export const useResourceFilter = ({
  resources,
  selectedCourse,
  selectedLevel,
  allCourses,
}: UseResourceFilterProps) => {
  return useMemo(() => {
    return resources.filter((resource) => {
      const courseMatch =
        selectedCourse === "all" || resource.courseId === selectedCourse;
      const levelMatch =
        selectedLevel === "all" ||
        allCourses.find((c) => c.id === resource.courseId)?.level ===
          selectedLevel;
      return courseMatch && levelMatch;
    });
  }, [resources, selectedCourse, selectedLevel, allCourses]);
};
