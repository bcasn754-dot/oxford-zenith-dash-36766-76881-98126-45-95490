import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  ClipboardList, 
  Calendar, 
  CreditCard, 
  FileText, 
  Award, 
  MessageSquare, 
  Bell, 
  User, 
  Settings,
  Video,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const menuItems = [
  { icon: LayoutDashboard, labelKey: "dashboard", path: "/" },
  { icon: BookOpen, labelKey: "my.courses", path: "/courses" },
  { icon: TrendingUp, labelKey: "my.level", path: "/level" },
  { icon: ClipboardList, labelKey: "assignments", path: "/assignments" },
  { icon: Calendar, labelKey: "schedule", path: "/schedule" },
  { icon: Video, labelKey: "live.class", path: "/live-class" },
  { icon: CreditCard, labelKey: "payments", path: "/payments" },
  { icon: FileText, labelKey: "exams", path: "/exams" },
  { icon: Award, labelKey: "certificates", path: "/certificates" },
  { icon: MessageSquare, labelKey: "messages", path: "/messages" },
  { icon: Bell, labelKey: "notifications", path: "/notifications" },
];

const bottomItems = [
  { icon: User, labelKey: "profile", path: "/profile" },
  { icon: Settings, labelKey: "settings", path: "/settings" },
];

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MobileSidebar = ({ open, onOpenChange }: MobileSidebarProps) => {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 p-0 bg-sidebar border-sidebar-border">
        <SheetHeader className="p-6 border-b border-sidebar-border">
          <SheetTitle className="text-2xl font-bold text-sidebar-foreground text-left">
            LT <span className="text-sidebar-primary">OXFORD</span>
          </SheetTitle>
          <p className="text-xs text-sidebar-foreground/70 mt-1 text-left">English Learning</p>
        </SheetHeader>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-lg"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{t(item.labelKey)}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Navigation */}
        <div className="p-3 border-t border-sidebar-border">
          <div className="space-y-1">
            {bottomItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{t(item.labelKey)}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
