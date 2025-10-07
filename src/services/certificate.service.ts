import { Certificate } from "@/models/certificate.model";

// Mock data - can be easily replaced with API calls later
const certificatesData: Certificate[] = [
  {
    id: "1",
    title: "Business English Communication - Level B1",
    course: "Business English Communication",
  issueDate: "2025-09-30",
  grade: 90,
  certificateNumber: "CAMBRIDGE-2025-BEC-B1-001234",
},
{
  id: "2",
  title: "English Grammar Fundamentals",
  course: "Grammar Essentials",
  issueDate: "2025-08-15",
  grade: 85,
  certificateNumber: "CAMBRIDGE-2025-GRM-A2-001156",
  },
];

class CertificateService {
  // Get all certificates
  getAll(): Certificate[] {
    return certificatesData;
  }

  // Get certificate by ID
  getById(id: string): Certificate | undefined {
    return certificatesData.find((cert) => cert.id === id);
  }

  // Get certificate by course
  getByCourse(courseName: string): Certificate[] {
    return certificatesData.filter((cert) => cert.course === courseName);
  }

  // Add a new certificate (for future use with API)
  add(certificate: Certificate): Certificate {
    certificatesData.push(certificate);
    return certificate;
  }

  // Delete a certificate (for future use with API)
  delete(id: string): boolean {
    const index = certificatesData.findIndex((cert) => cert.id === id);
    if (index !== -1) {
      certificatesData.splice(index, 1);
      return true;
    }
    return false;
  }
}

export const certificateService = new CertificateService();
