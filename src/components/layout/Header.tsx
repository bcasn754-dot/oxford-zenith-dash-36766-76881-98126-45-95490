import { Bell, Moon, Sun, Globe, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/hooks/use-theme";
import { MobileSidebar } from "./MobileSidebar";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <>
      <MobileSidebar open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
      <header className="fixed top-0 left-0 right-0 md:left-64 h-16 bg-card border-b border-border flex items-center justify-between px-4 sm:px-6 z-40 animate-fade-in">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden rounded-full hover:bg-secondary"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-foreground">{t("welcome.student")}</h2>
            <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">{t("continue.journey")}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
        {/* Language Switcher */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleLanguage}
          className="rounded-full hover:bg-secondary"
        >
          <Globe className="w-5 h-5" />
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full hover:bg-secondary"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </Button>

        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground font-semibold shadow-elegant cursor-pointer hover:shadow-hover transition-all">
          S
        </div>
        </div>
      </header>
    </>
  );
};
