import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ui/protected-route";
import { Layout } from "@/components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import InitialisationPage from "./pages/InitialisationPage";
import UnifiedSplashScreen from './components/UnifiedSplashScreen';
import { useState } from 'react';

const queryClient = new QueryClient();

const App = () => {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {!splashDone && <UnifiedSplashScreen onComplete={() => setSplashDone(true)} />}
            {splashDone && (
              <Routes>
                <Route path="/init" element={<InitialisationPage />} />
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
            )}
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
