import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Award,
  Calendar,
  FileText,
  CreditCard
} from "lucide-react";

interface Notification {
  id: string;
  type: "success" | "info" | "warning" | "achievement";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Assignment Graded",
    message: "Your essay 'Business Communication Strategies' has been graded. Score: 90%",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "info",
    title: "New Live Class Scheduled",
    message: "A new live session 'Modal Verbs' has been scheduled for October 5th at 10:00 AM",
    timestamp: "5 hours ago",
    read: false,
  },
  {
    id: "3",
    type: "warning",
    title: "Assignment Due Soon",
    message: "Essay: Business Communication Strategies is due in 2 days (October 10th)",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: "4",
    type: "achievement",
    title: "Certificate Earned!",
    message: "Congratulations! You've earned your B1 Level Certificate with a grade of 90%",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: "5",
    type: "info",
    title: "Payment Successful",
    message: "Your subscription payment of $199 has been processed successfully",
    timestamp: "3 days ago",
    read: true,
  },
  {
    id: "6",
    type: "warning",
    title: "Upcoming Exam",
    message: "Mid-term Exam is scheduled for October 15th at 2:00 PM. Duration: 2 hours",
    timestamp: "4 days ago",
    read: true,
  },
];

const Notifications = () => {
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "info":
        return <Info className="w-5 h-5 text-accent" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      case "achievement":
        return <Award className="w-5 h-5 text-accent" />;
    }
  };

  const getTypeIcon = (title: string) => {
    if (title.includes("Assignment") || title.includes("Graded")) return FileText;
    if (title.includes("Class") || title.includes("Scheduled")) return Calendar;
    if (title.includes("Payment") || title.includes("Subscription")) return CreditCard;
    if (title.includes("Certificate") || title.includes("Achievement")) return Award;
    return Bell;
  };

  return (
    <MainLayout>
      <div className="p-8 space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with important announcements</p>
          </div>
          {unreadCount > 0 && (
            <Badge className="bg-accent text-accent-foreground px-4 py-2 text-sm">
              {unreadCount} Unread
            </Badge>
          )}
        </div>

        <div className="flex gap-3">
          <Button variant="oxford">Mark All as Read</Button>
          <Button variant="outline">Clear All</Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => {
            const TypeIcon = getTypeIcon(notification.title);
            return (
              <Card
                key={notification.id}
                className={`p-6 shadow-elegant hover:shadow-hover transition-all ${
                  !notification.read ? "border-l-4 border-l-accent" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      {getIcon(notification.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <TypeIcon className="w-4 h-4 text-muted-foreground" />
                        <h3 className="font-bold text-foreground">{notification.title}</h3>
                      </div>
                      {!notification.read && (
                        <Badge variant="secondary" className="flex-shrink-0">New</Badge>
                      )}
                    </div>
                    <p className="text-sm text-foreground mb-2">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default Notifications;
