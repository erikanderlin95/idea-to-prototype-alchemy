import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ClinicProfile from "./pages/ClinicProfile";
import Booking from "./pages/Booking";
import BookingTriage from "./pages/BookingTriage";
import Appointments from "./pages/Appointments";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./pages/Chatbot";
import Queue from "./pages/Queue";
import DoctorProfile from "./pages/DoctorProfile";
import Analytics from "./pages/Analytics";
import StaffDashboard from "./pages/StaffDashboard";
import Consultants from "./pages/Consultants";
import ConsultantProfile from "./pages/ConsultantProfile";
import AdminConsultants from "./pages/AdminConsultants";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
