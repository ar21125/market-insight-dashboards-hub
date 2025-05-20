
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Industries from "./pages/Industries";
import NotFound from "./pages/NotFound";
import AIModelsPage from "./pages/AIModelsPage";
import AnalysisCapabilitiesPage from "./pages/AnalysisCapabilitiesPage";
import AgricultureImplementation from "./pages/AgricultureImplementation";
import EnergyImplementation from "./pages/EnergyImplementation";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard/:industry" element={<Dashboard />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/analysis-capabilities" element={<AnalysisCapabilitiesPage />} />
          <Route path="/ai-models" element={<AIModelsPage />} />
          <Route path="/implementation/agricultura" element={<AgricultureImplementation />} />
          <Route path="/implementation/energia" element={<EnergyImplementation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
