import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Certificate } from "@/models/certificate.model";

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
  },
  container: {
    border: "10px solid #002147",
    padding: 40,
    height: "100%",
    position: "relative",
  },
  innerBorder: {
    border: "2px solid #D4AF37",
    padding: 30,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    textAlign: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#002147",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 5,
  },
  divider: {
    width: 100,
    height: 3,
    backgroundColor: "#D4AF37",
    margin: "10px auto",
  },
  body: {
    textAlign: "center",
    marginVertical: 20,
  },
  bodyText: {
    fontSize: 12,
    color: "#333333",
    marginBottom: 15,
  },
  studentName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#002147",
    marginVertical: 15,
    textDecoration: "underline",
  },
  courseTitle: {
    fontSize: 18,
    color: "#002147",
    fontWeight: "bold",
    marginVertical: 10,
  },
  gradeSection: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
  },
  gradeText: {
    fontSize: 16,
    color: "#002147",
    fontWeight: "bold",
    marginBottom: 5,
  },
  performanceText: {
    fontSize: 14,
    color: "#D4AF37",
    fontStyle: "italic",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    paddingTop: 20,
    borderTop: "1px solid #cccccc",
  },
  footerSection: {
    textAlign: "center",
    flex: 1,
  },
  footerLabel: {
    fontSize: 10,
    color: "#666666",
    marginBottom: 5,
  },
  footerValue: {
    fontSize: 11,
    color: "#002147",
    fontWeight: "bold",
  },
  signatureLine: {
    width: 150,
    height: 1,
    backgroundColor: "#002147",
    margin: "10px auto",
  },
  certificateNumber: {
    fontSize: 9,
    color: "#999999",
    textAlign: "center",
    marginTop: 20,
  },
});

// Get performance text based on grade
const getPerformanceText = (grade: number): string => {
  if (grade >= 95) {
    return "Outstanding Performance - Excellent Mastery";
  } else if (grade >= 90) {
    return "Exceptional Achievement - High Distinction";
  } else if (grade >= 85) {
    return "Excellent Performance - Distinction";
  } else if (grade >= 80) {
    return "Very Good Achievement - Merit";
  } else if (grade >= 75) {
    return "Good Performance - Above Average";
  } else {
    return "Satisfactory Completion";
  }
};

// PDF Document Component
const CertificatePDF: React.FC<{ certificate: Certificate; studentName: string }> = ({
  certificate,
  studentName,
}) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.container}>
        <View style={styles.innerBorder}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>CERTIFICATE OF COMPLETION</Text>
            <View style={styles.divider} />
            <Text style={styles.subtitle}>This is to certify that</Text>
          </View>

          {/* Body */}
          <View style={styles.body}>
            <Text style={styles.studentName}>{studentName}</Text>
            <Text style={styles.bodyText}>
              has successfully completed the course
            </Text>
            <Text style={styles.courseTitle}>{certificate.title}</Text>
            <Text style={styles.bodyText}>
              Course: {certificate.course}
            </Text>

            {/* Grade Section */}
            <View style={styles.gradeSection}>
              <Text style={styles.gradeText}>
                Final Grade: {certificate.grade}%
              </Text>
              <Text style={styles.performanceText}>
                {getPerformanceText(certificate.grade)}
              </Text>
            </View>

            <Text style={styles.bodyText}>
              Demonstrating proficiency and dedication in mastering the English language
              and achieving the required competencies.
            </Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerSection}>
              <Text style={styles.footerLabel}>Issue Date</Text>
              <Text style={styles.footerValue}>
                {new Date(certificate.issueDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </View>
            <View style={styles.footerSection}>
              <View style={styles.signatureLine} />
              <Text style={styles.footerLabel}>Director Signature</Text>
              <Text style={styles.footerValue}>LTOX Platform</Text>
            </View>
            <View style={styles.footerSection}>
              <Text style={styles.footerLabel}>Certificate Level</Text>
              <Text style={styles.footerValue}>B1 - Intermediate</Text>
            </View>
          </View>

          <Text style={styles.certificateNumber}>
            Certificate No: {certificate.certificateNumber}
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

interface CertificateGeneratorProps {
  certificate: Certificate;
  studentName?: string;
}

export const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({
  certificate,
  studentName = "Student Name",
}) => {
  return (
    <PDFDownloadLink
      document={<CertificatePDF certificate={certificate} studentName={studentName} />}
      fileName={`certificate-${certificate.certificateNumber}.pdf`}
    >
      {({ loading }) => (
        <Button variant="secondary" className="flex-1" disabled={loading}>
          <Download className="w-4 h-4 mr-2" />
          {loading ? "Preparing PDF..." : "Download PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
};
