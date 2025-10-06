import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import LoadingPage from "./pages/Loading";

// Lazy load pages for better performance
const Dashboard = lazy(() => import("./pages/Dashboard"));
const MyCourses = lazy(() => import("./pages/MyCourses"));
const CourseDetails = lazy(() => import("./pages/CourseDetails"));
const Assignments = lazy(() => import("./pages/Assignments"));
const Schedule = lazy(() => import("./pages/Schedule"));
const LiveClass = lazy(() => import("./pages/LiveClass"));
const Payments = lazy(() => import("./pages/Payments"));
const Exams = lazy(() => import("./pages/Exams"));
const Certificates = lazy(() => import("./pages/Certificates"));
const Messages = lazy(() => import("./pages/Messages"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));
const LevelDetails = lazy(() => import("./pages/LevelDetails"));
const LearningPath = lazy(() => import("./pages/LearningPath"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<LoadingPage />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/courses" element={<MyCourses />} />
                <Route path="/courses/:courseId" element={<CourseDetails />} />
                <Route path="/assignments" element={<Assignments />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/live-class" element={<LiveClass />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/exams" element={<Exams />} />
                <Route path="/certificates" element={<Certificates />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/level" element={<LevelDetails />} />
                <Route path="/learning-path" element={<LearningPath />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
