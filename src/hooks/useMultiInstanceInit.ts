import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { PricingModal } from "@/components/pricing/PricingModal";
import { createSuperAdminAndOrg } from "@/services/multiInstanceInit";

export function useMultiInstanceInit() {
  const [showPricing, setShowPricing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkOrgs() {
      const { count, error } = await supabase
        .from("organisations")
        .select("*", { count: "exact", head: true });
      if (error) {
        setError("Erreur lors de la vérification des organisations");
        setLoading(false);
        return;
      }
      if (count === 0) setShowPricing(true);
      setLoading(false);
    }
    checkOrgs();
  }, []);

  const handlePlanSelect = async (plan: "monthly" | "lifetime", superAdminData: any, orgData: any, brandData: any) => {
    setLoading(true);
    setError(null);
    try {
      await createSuperAdminAndOrg(plan, superAdminData, orgData, brandData);
      setShowPricing(false);
      navigate("/auth");
    } catch (e: any) {
      setError(e.message || "Erreur lors de l'initialisation");
    } finally {
      setLoading(false);
    }
  };

  return { showPricing, handlePlanSelect, loading, error };
}
