
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Industries from "./pages/Industries";
import Dashboard from "./pages/Dashboard";
import AnalysisCapabilitiesPage from "./pages/AnalysisCapabilitiesPage";
import AIModelsPage from "./pages/AIModelsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/dashboard/:industry" element={<Dashboard />} />
          <Route path="/analysis-capabilities" element={<AnalysisCapabilitiesPage />} />
          <Route path="/ai-models" element={<AIModelsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
