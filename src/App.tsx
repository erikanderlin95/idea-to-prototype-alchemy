import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { JoinQueueProvider } from "@/contexts/JoinQueueContext";
import { JoinQueueModal } from "@/components/JoinQueueModal";
import Index from "./pages/Index";
import ClinicProfile from "./pages/ClinicProfile";
import Queue from "./pages/Queue";
import ThankYou from "./pages/ThankYou";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <JoinQueueProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/clinic/:id" element={<ClinicProfile />} />
              <Route path="/queue" element={<Queue />} />
              <Route path="/thank-you" element={<ThankYou />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <JoinQueueModal />
        </TooltipProvider>
      </JoinQueueProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
