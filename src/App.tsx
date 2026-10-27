import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
const Auth = lazy(() => import("./pages/Auth"));
import ClinicProfile from "./pages/ClinicProfile";
const Booking = lazy(() => import("./pages/Booking"));
const BookingTriage = lazy(() => import("./pages/BookingTriage"));
const Appointments = lazy(() => import("./pages/Appointments"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Chatbot = lazy(() => import("./pages/Chatbot"));
import Queue from "./pages/Queue";
const DoctorProfile = lazy(() => import("./pages/DoctorProfile"));
const Analytics = lazy(() => import("./pages/Analytics"));
const StaffDashboard = lazy(() => import("./pages/StaffDashboard"));
const Consultants = lazy(() => import("./pages/Consultants"));
const ConsultantProfile = lazy(() => import("./pages/ConsultantProfile"));
const AdminConsultants = lazy(() => import("./pages/AdminConsultants"));
import GPClinics from "./pages/GPClinics";
import TCMClinics from "./pages/TCMClinics";
import WellnessClinics from "./pages/WellnessClinics";
const ManagedCareRequest = lazy(() => import("./pages/ManagedCareRequest"));
const OrganizationProfile = lazy(() => import("./pages/OrganizationProfile"));


const SpeakersTrainers = lazy(() => import("./pages/SpeakersTrainers"));
const SpeakerProfile = lazy(() => import("./pages/SpeakerProfile"));
const CaringForLifeProfile = lazy(() => import("./pages/CaringForLifeProfile"));
const AfterlifeServicesPage = lazy(() => import("./pages/AfterlifeServices"));
const AfterlifeProfile = lazy(() => import("./pages/AfterlifeProfile"));
const ForClinics = lazy(() => import("./pages/ForClinics"));
const BMICalculator = lazy(() => import("./pages/BMICalculator"));
const HealthTools = lazy(() => import("./pages/HealthTools"));
const SugarHabit = lazy(() => import("./pages/SugarHabit"));
const Privacy = lazy(() => import("./pages/Privacy"));
import NotFound from "./pages/NotFound";
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const BlogEyecare = lazy(() => import("./pages/BlogEyecare"));
const WellnessTalksPage = lazy(() => import("./pages/WellnessTalksPage"));
const BeyondClinicPage = lazy(() => import("./pages/BeyondClinicPage"));
const ClinicOwnersPage = lazy(() => import("./pages/ClinicOwnersPage"));
const MyClynicQPage = lazy(() => import("./pages/MyClynicQPage"));
const HoviCare = lazy(() => import("./pages/HoviCare"));
const About = lazy(() => import("./pages/About"));
const TwentyFourHourClinics = lazy(() => import("./pages/TwentyFourHourClinics"));

import { SectionSidebar } from "@/components/SectionSidebar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { RouteLoading } from "@/components/RouteLoading";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true }}>
          <SectionSidebar />
          <Suspense fallback={<RouteLoading />} >
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/clinic/:id" element={<ClinicProfile />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/queue" element={<Queue />} />
            <Route path="/doctor/:id" element={<DoctorProfile />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/staff" element={<StaffDashboard />} />
            <Route path="/booking-triage" element={<BookingTriage />} />
            <Route path="/consultants" element={<Consultants />} />
            <Route path="/consultant/:id" element={<ConsultantProfile />} />
            <Route path="/admin/consultants" element={<AdminConsultants />} />
            <Route path="/gp" element={<GPClinics />} />
            <Route path="/tcm" element={<TCMClinics />} />
            <Route path="/wellness" element={<WellnessClinics />} />
            <Route path="/managed-care-request/:id" element={<ManagedCareRequest />} />
            
            <Route path="/organization/nymg" element={<OrganizationProfile />} />
            <Route path="/speakers" element={<SpeakersTrainers />} />
            <Route path="/speakers/ouch-pte-ltd" element={<SpeakerProfile />} />
            <Route path="/speakers/caring-for-life-sg" element={<CaringForLifeProfile />} />
            <Route path="/afterlife" element={<AfterlifeServicesPage />} />
            <Route path="/afterlife/nirvana" element={<AfterlifeProfile />} />
            <Route path="/for-clinics" element={<ForClinics />} />
            <Route path="/explore-health" element={<HealthTools />} />
            <Route path="/explore-health/bmi-calculator" element={<BMICalculator />} />
            <Route path="/explore-health/sugar-habit" element={<SugarHabit />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/wellness-talks" element={<WellnessTalksPage />} />
            <Route path="/senior-day-care" element={<HoviCare />} />
            <Route path="/hovi-care" element={<HoviCare />} />
            <Route path="/beyond-clinic" element={<BeyondClinicPage />} />
            <Route path="/clinic-owners" element={<ClinicOwnersPage />} />
            <Route path="/myclynicq" element={<MyClynicQPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/24-hour-clinics-singapore" element={<TwentyFourHourClinics />} />

            <Route path="/blog/eye-health-guide-dr-philemon-huang" element={<BlogEyecare />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
