export type ResourceType = "audio" | "story" | "project" | "workbook" | "test";

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  courseId: string;
  courseName: string;
  description?: string;
  googleDriveUrl: string;
  duration?: string;
  uploadDate: string;
}
