import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Globe, 
  Lock, 
  Mail,
  Moon,
  Sun
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [language, setLanguage] = useState("en");

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
    toast({
      title: "Theme Updated",
      description: `Switched to ${!isDark ? "dark" : "light"} mode`,
    });
  };

  const handleLanguageChange = () => {
    const newLang = language === "en" ? "ar" : "en";
    setLanguage(newLang);
    toast({
      title: "Language Updated",
      description: `Language changed to ${newLang === "en" ? "English" : "Arabic"}`,
    });
  };

  const handleSavePassword = () => {
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
  };

  return (
    <MainLayout>
      <div className="p-8 space-y-8 animate-fade-in max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Configure your account preferences</p>
        </div>

        {/* Appearance */}
        <Card className="p-6 shadow-elegant">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Appearance</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isDark ? <Moon className="w-5 h-5 text-muted-foreground" /> : <Sun className="w-5 h-5 text-muted-foreground" />}
                <div>
                  <Label htmlFor="theme" className="text-base font-medium">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Toggle between light and dark theme</p>
                </div>
              </div>
              <Switch id="theme" checked={isDark} onCheckedChange={handleThemeToggle} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="language" className="text-base font-medium">Language</Label>
                  <p className="text-sm text-muted-foreground">Current: {language === "en" ? "English" : "Arabic"}</p>
                </div>
              </div>
              <Button variant="outline" onClick={handleLanguageChange}>
                Change Language
              </Button>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6 shadow-elegant">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <Bell className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Notifications</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="email-notif" className="text-base font-medium">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
              </div>
              <Switch 
                id="email-notif" 
                checked={emailNotifications} 
                onCheckedChange={setEmailNotifications} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="push-notif" className="text-base font-medium">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get notified about classes and exams</p>
                </div>
              </div>
              <Switch 
                id="push-notif" 
                checked={pushNotifications} 
                onCheckedChange={setPushNotifications} 
              />
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card className="p-6 shadow-elegant">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <Lock className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Security</h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" placeholder="••••••••" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="••••••••" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" placeholder="••••••••" />
            </div>

            <Button variant="oxford" onClick={handleSavePassword}>
              Update Password
            </Button>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 shadow-elegant border-destructive/50">
          <h3 className="text-xl font-bold text-destructive mb-4">Danger Zone</h3>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Settings;
