import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BadgeLevel } from "@/components/ui/badge-level";
import { Camera, Mail, Phone, MapPin, Calendar, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  return (
    <MainLayout>
      <div className="p-8 space-y-8 animate-fade-in max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
          <p className="text-muted-foreground">Manage your personal information</p>
        </div>

        {/* Profile Header */}
        <Card className="p-8 shadow-elegant">
          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-gold flex items-center justify-center text-3xl font-bold text-accent-foreground shadow-elegant">
                A
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-2">Alex Johnson</h2>
              <p className="text-muted-foreground mb-4">Student since September 2024</p>
              <div className="flex gap-3">
                <BadgeLevel level="Level B1" />
                <BadgeLevel level="Active Student" className="bg-success/20 text-success" />
              </div>
            </div>
          </div>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 shadow-elegant text-center">
            <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-accent" />
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">2</p>
            <p className="text-sm text-muted-foreground">Certificates Earned</p>
          </Card>
          
          <Card className="p-6 shadow-elegant text-center">
            <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-success" />
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">45</p>
            <p className="text-sm text-muted-foreground">Days Active</p>
          </Card>
          
          <Card className="p-6 shadow-elegant text-center">
            <div className="w-12 h-12 rounded-lg bg-destructive/20 flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-destructive" />
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">88%</p>
            <p className="text-sm text-muted-foreground">Average Grade</p>
          </Card>
        </div>

        {/* Personal Information */}
        <Card className="p-8 shadow-elegant">
          <h3 className="text-xl font-bold text-foreground mb-6">Personal Information</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="Alex" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Johnson" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input id="email" type="email" defaultValue="alex.johnson@email.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </Label>
              <Input id="location" defaultValue="New York, USA" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthdate" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date of Birth
              </Label>
              <Input id="birthdate" type="date" defaultValue="1995-06-15" />
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="oxford" onClick={handleSave}>Save Changes</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Profile;
