import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useBrandCheck = () => {
  const [hasBrand, setHasBrand] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkBrand = async () => {
      try {
        // Mock check - replace with actual Supabase query when tables are ready
        const stored = localStorage.getItem('brand_configured');
        setHasBrand(stored === 'true');
      } catch (error) {
        console.error('Error checking brand:', error);
        setHasBrand(false);
      } finally {
        setLoading(false);
      }
    };

    checkBrand();
  }, []);

  return { hasBrand, loading };
};