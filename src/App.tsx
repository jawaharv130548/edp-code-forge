
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import QuickLaunch from "./pages/QuickLaunch";
import CodeGeneration from "./pages/CodeGeneration";
import CodeComparison from "./pages/CodeComparison";
import UseCaseGeneration from "./pages/UseCaseGeneration";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./hooks/useTheme";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><QuickLaunch /></Layout>} />
            <Route path="/code-generation" element={<Layout><CodeGeneration /></Layout>} />
            <Route path="/code-comparison" element={<Layout><CodeComparison /></Layout>} />
            <Route path="/usecase-generation" element={<Layout><UseCaseGeneration /></Layout>} />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
