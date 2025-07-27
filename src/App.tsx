import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/ui/protected-route";
import { Layout } from "@/components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import InitialisationPage from "./pages/InitialisationPage";
import { useState, useEffect } from 'react';

const queryClient = new QueryClient();

const App = () => {
  const [showInitialSetup, setShowInitialSetup] = useState(false);

  useEffect(() => {
    // Check if initial setup is needed
    const setupComplete = localStorage.getItem('setup_complete');
    if (!setupComplete) {
      setShowInitialSetup(true);
    }
  }, []);

  if (showInitialSetup) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="*" element={<InitialisationPage />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/" element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/vehicles" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-8">
                        <h1 className="text-3xl font-bold">Véhicules</h1>
                        <p className="text-muted-foreground">Gestion des véhicules - À venir</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/interventions" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-8">
                        <h1 className="text-3xl font-bold">Interventions</h1>
                        <p className="text-muted-foreground">Gestion des interventions - À venir</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
