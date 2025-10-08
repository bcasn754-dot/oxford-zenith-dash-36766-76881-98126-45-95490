import { Resource } from "@/models/resource.model";

// Mock data - بيانات تجريبية
const resourcesData: Resource[] = [
  {
    id: "1",
    title: "Business Conversation Practice",
    type: "audio",
    courseId: "1",
    courseName: "Business English Communication",
    description: "Professional dialogue practice",
    googleDriveUrl: "https://drive.google.com/file/d/sample-audio-1",
    duration: "15 mins",
    uploadDate: "2025-09-15",
  },
  {
    id: "2",
    title: "Pronunciation Training - Module 1",
    type: "audio",
    courseId: "1",
    courseName: "Business English Communication",
    description: "English pronunciation exercises",
    googleDriveUrl: "https://drive.google.com/file/d/sample-audio-2",
    duration: "20 mins",
    uploadDate: "2025-09-10",
  },
  {
    id: "3",
    title: "The Success Story",
    type: "story",
    courseId: "1",
    courseName: "Business English Communication",
    description: "Inspiring business success story",
    googleDriveUrl: "https://drive.google.com/file/d/sample-story-1",
    uploadDate: "2025-09-20",
  },
  {
    id: "4",
    title: "Entrepreneurship Journey",
    type: "story",
    courseId: "1",
    courseName: "Business English Communication",
    description: "Learn from successful entrepreneurs",
    googleDriveUrl: "https://drive.google.com/file/d/sample-story-2",
    uploadDate: "2025-09-18",
  },
  {
    id: "5",
    title: "Final Project - Business Plan",
    type: "project",
    courseId: "1",
    courseName: "Business English Communication",
    description: "Complete business plan template",
    googleDriveUrl: "https://drive.google.com/file/d/sample-project-1",
    uploadDate: "2025-09-25",
  },
  {
    id: "6",
    title: "Marketing Campaign Project",
    type: "project",
    courseId: "1",
    courseName: "Business English Communication",
    description: "Design a marketing campaign",
    googleDriveUrl: "https://drive.google.com/file/d/sample-project-2",
    uploadDate: "2025-09-22",
  },
  {
    id: "7",
    title: "Level B1 Workbook",
    type: "workbook",
    courseId: "1",
    courseName: "Business English Communication",
    description: "Practice exercises and activities",
    googleDriveUrl: "https://drive.google.com/file/d/sample-workbook-1",
    uploadDate: "2025-09-01",
  },
  {
    id: "8",
    title: "Grammar Practice Workbook",
    type: "workbook",
    courseId: "1",
    courseName: "Business English Communication",
    description: "Comprehensive grammar exercises",
    googleDriveUrl: "https://drive.google.com/file/d/sample-workbook-2",
    uploadDate: "2025-09-05",
  },
  {
    id: "9",
    title: "Mid-term Test",
    type: "test",
    courseId: "1",
    courseName: "Business English Communication",
    description: "Comprehensive mid-term assessment",
    googleDriveUrl: "https://drive.google.com/file/d/sample-test-1",
    uploadDate: "2025-09-12",
  },
  {
    id: "10",
    title: "Vocabulary Test - Unit 3",
    type: "test",
    courseId: "1",
    courseName: "Business English Communication",
    description: "Business vocabulary assessment",
    googleDriveUrl: "https://drive.google.com/file/d/sample-test-2",
    uploadDate: "2025-09-08",
  },
];

class ResourceService {
  // Get all resources
  getAll(): Resource[] {
    return resourcesData;
  }

  // Get resources by type
  getByType(type: string): Resource[] {
    return resourcesData.filter((resource) => resource.type === type);
  }

  // Get resource by ID
  getById(id: string): Resource | undefined {
    return resourcesData.find((resource) => resource.id === id);
  }

  // Get resources by course ID
  getByCourseId(courseId: string): Resource[] {
    return resourcesData.filter((resource) => resource.courseId === courseId);
  }

  // Search resources
  search(query: string): Resource[] {
    const lowercaseQuery = query.toLowerCase();
    return resourcesData.filter(
      (resource) =>
        resource.title.toLowerCase().includes(lowercaseQuery) ||
        resource.description?.toLowerCase().includes(lowercaseQuery)
    );
  }
}

export const resourceService = new ResourceService();
