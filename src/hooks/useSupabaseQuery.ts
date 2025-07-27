import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface UseSupabaseQueryOptions {
  enabled?: boolean;
  refetchOnMount?: boolean;
}

export const useSupabaseQuery = <T>(
  table: string,
  options: UseSupabaseQueryOptions = {}
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { enabled = true, refetchOnMount = true } = options;

  const fetchData = async () => {
    if (!enabled) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Mock data for now - replace with actual query when tables are ready
      setData([]);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (refetchOnMount) {
      fetchData();
    }
  }, [enabled, refetchOnMount]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
};