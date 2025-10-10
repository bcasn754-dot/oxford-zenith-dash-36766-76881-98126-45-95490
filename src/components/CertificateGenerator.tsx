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
import platformLogo from "@/assets/platform-logo.png";
import logoWatermark from "@/assets/logo-watermark.png";

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
  watermark: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 400,
    height: 400,
    marginLeft: -200,
    marginTop: -200,
    opacity: 0.12,
    zIndex: 0,
  },
  innerBorder: {
    border: "2px solid #D4AF37",
    padding: 30,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    zIndex: 1,
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  platformHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 25,
    paddingLeft: 20,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  platformName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#002147",
    letterSpacing: 2,
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#002147",
    marginBottom: 10,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 13,
    color: "#666666",
    marginBottom: 10,
  },
  divider: {
    width: 120,
    height: 3,
    backgroundColor: "#D4AF37",
    margin: "15px auto",
  },
  body: {
    textAlign: "center",
    marginVertical: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bodyText: {
    fontSize: 11,
    color: "#333333",
    marginBottom: 10,
    lineHeight: 1.5,
  },
  studentName: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#002147",
    marginVertical: 15,
    textDecoration: "underline",
    letterSpacing: 1,
  },
  courseTitle: {
    fontSize: 22,
    color: "#002147",
    fontWeight: "bold",
    marginVertical: 10,
    letterSpacing: 0.8,
  },
  gradeSection: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: "transparent",
  },
  gradeText: {
    fontSize: 20,
    color: "#002147",
    fontWeight: "bold",
    marginBottom: 5,
  },
  performanceText: {
    fontSize: 14,
    color: "#D4AF37",
    fontStyle: "italic",
    marginTop: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 10,
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
    marginTop: 10,
  },
});

// Get performance text based on grade
const getPerformanceText = (grade: number): string => {
  if (grade >= 100) {
    return "Perfect Score - Outstanding Mastery";
  } else if (grade >= 90 && grade <= 99) {
    return "Excellent Achievement - High Distinction";
  } else if (grade >= 80 && grade <= 89) {
    return "Very Good Achievement - Merit";
  } else if (grade >= 70 && grade <= 79) {
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
        <Image src={logoWatermark} style={styles.watermark} />
        <View style={styles.innerBorder}>
          {/* Platform Header */}
          <View style={styles.platformHeader}>
            <Image src={logoWatermark} style={styles.logo} />
            <Text style={styles.platformName}>CAMBRIDGE</Text>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>CERTIFICATE OF COMPLETION</Text>
            <View style={styles.divider} />
            <Text style={styles.subtitle}>This is to certify that</Text>
          </View>

          {/* Body */}
          <View style={styles.body}>
            <Text style={styles.studentName}>{studentName}</Text>
            <Text style={{ ...styles.bodyText, marginTop: 8 }}>
              has successfully completed the course
            </Text>
            <Text style={styles.courseTitle}>{certificate.title}</Text>

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
              <Text style={styles.footerValue}>CAMBRIDGE Platform</Text>
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
