import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/garage';
import { supabase } from '@/integrations/supabase/client';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
}

export function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
  const { user, garageUser, loading } = useAuth();
  const [noOrganisation, setNoOrganisation] = useState(false);
  const [checkingOrg, setCheckingOrg] = useState(true);

  useEffect(() => {
    async function checkOrgs() {
      const { count, error } = await supabase
        .from('organisations')
        .select('*', { count: 'exact', head: true });
      if (!error && count === 0) setNoOrganisation(true);
      setCheckingOrg(false);
    }
    checkOrgs();
  }, []);

  if (loading || checkingOrg) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (noOrganisation) {
    return <Navigate to="/init" replace />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requiredRoles && garageUser && !requiredRoles.includes(garageUser.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Accès refusé</h2>
          <p className="text-muted-foreground">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
