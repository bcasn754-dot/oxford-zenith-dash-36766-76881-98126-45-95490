import { Loader2 } from "lucide-react";
import logo from "@/assets/logo.png";

export const LoadingPage = () => {
  return (
    <div className="fixed inset-0 bg-gradient-oxford flex items-center justify-center z-50">
      <div className="text-center space-y-6 animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center mb-8 animate-scale-in">
          <img 
            src={logo} 
            alt="Cambridge" 
            className="w-24 h-auto drop-shadow-2xl"
          />
        </div>

        {/* Loading Spinner */}
        <div className="relative">
          <div className="w-16 h-16 mx-auto">
            <Loader2 className="w-16 h-16 text-accent animate-spin" />
          </div>
          <div className="absolute inset-0 w-16 h-16 mx-auto rounded-full bg-accent/20 animate-pulse" />
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-primary-foreground">
            Loading Your Learning Portal
          </h2>
          <p className="text-primary-foreground/70 text-sm">
            Preparing your personalized experience...
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 pt-4">
          <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
