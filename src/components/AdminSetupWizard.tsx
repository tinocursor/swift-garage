import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Types pour chaque étape
export type PlanType = 'free' | 'monthly' | 'lifetime';

interface AdminSetupWizardProps {
  onComplete: () => void;
}

const PLAN_COLORS: Record<PlanType, string> = {
  free: 'bg-green-500',
  monthly: 'bg-orange-500',
  lifetime: 'bg-blue-600',
};

const AdminSetupWizard: React.FC<AdminSetupWizardProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'plan' | 'admin' | 'organisation' | 'brand' | 'done'>('plan');
  const [plan, setPlan] = useState<PlanType>('free');
  // TODO: Ajouter les états pour les données de chaque étape

  // Gestion de la couleur dynamique
  const currentBg = PLAN_COLORS[plan];

  // TODO: Ajouter la logique de validation et de soumission

  return (
    <div className={`min-h-screen flex flex-col ${currentBg} transition-colors duration-500 p-8`}>
      <main className="flex-1 flex flex-col items-center justify-center">
        {step === 'plan' && (
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Choisissez votre plan</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button 
                variant="default" 
                onClick={() => { setPlan('free'); setStep('admin'); }}
                className="py-3 text-lg"
              >
                Plan Gratuit
              </Button>
              <Button 
                variant="default" 
                onClick={() => { setPlan('monthly'); setStep('admin'); }}
                className="py-3 text-lg"
              >
                Plan Mensuel
              </Button>
              <Button 
                variant="default" 
                onClick={() => { setPlan('lifetime'); setStep('admin'); }}
                className="py-3 text-lg"
              >
                Plan Vie
              </Button>
            </CardContent>
          </Card>
        )}
        {step === 'admin' && (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl">Compte administrateur</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">Configuration du compte admin en cours...</p>
              <Button 
                onClick={() => setStep('organisation')}
                className="w-full"
              >
                Suivant
              </Button>
            </CardContent>
          </Card>
        )}
        {step === 'organisation' && (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl">Organisation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">Configuration de l'organisation en cours...</p>
              <Button 
                onClick={() => setStep('brand')}
                className="w-full"
              >
                Suivant
              </Button>
            </CardContent>
          </Card>
        )}
        {step === 'brand' && (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl">Configuration du garage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">Configuration de l'identité visuelle en cours...</p>
              <Button 
                onClick={() => setStep('done')}
                className="w-full"
              >
                Terminer
              </Button>
            </CardContent>
          </Card>
        )}
        {step === 'done' && (
          <Card className="w-full max-w-md text-center">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Initialisation terminée !</h2>
              <p className="mb-6 text-muted-foreground">Votre espace est prêt. Vous pouvez maintenant vous connecter.</p>
              <Button 
                onClick={() => {
                  localStorage.setItem('setup_complete', 'true');
                  onComplete();
                }}
                className="w-full"
              >
                Aller au Dashboard
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default AdminSetupWizard;
