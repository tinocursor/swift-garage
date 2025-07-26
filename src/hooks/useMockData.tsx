// Hooks temporaires avec données mockées pour faire fonctionner l'app avant la création des tables
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export function useMockVehicles() {
  const [vehicles] = useState([]);
  const [loading] = useState(false);

  const createVehicle = async () => {
    toast({ title: "Info", description: "Fonctionnalité disponible après création des tables DB" });
    return { data: null, error: null };
  };

  return {
    vehicles,
    loading,
    error: null,
    createVehicle,
    updateVehicle: createVehicle,
    deleteVehicle: createVehicle,
    searchVehicles: async () => [],
    refetch: () => {}
  };
}

export function useMockInterventions() {
  const [interventions] = useState([]);
  const [loading] = useState(false);

  const createIntervention = async () => {
    toast({ title: "Info", description: "Fonctionnalité disponible après création des tables DB" });
    return { data: null, error: null };
  };

  return {
    interventions,
    loading,
    error: null,
    createIntervention,
    updateIntervention: createIntervention,
    updateStatus: createIntervention,
    addPhotos: createIntervention,
    addSignature: createIntervention,
    getInterventionsByStatus: () => [],
    getInterventionsByVehicle: () => [],
    refetch: () => {}
  };
}