import React, { useState } from 'react';
import UnifiedHeader from './UnifiedHeader';
import UnifiedFooter from './UnifiedFooter';
import Logo from './ui/Logo';

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
    <div className={`min-h-screen flex flex-col ${currentBg} transition-colors duration-500`}>
      <UnifiedHeader />
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <Logo size={64} animated className="mb-4" />
        {/* Navigation par étapes */}
        {step === 'plan' && (
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Choisissez votre plan</h2>
            <div className="flex flex-col gap-4">
              <button className="py-3 rounded-full bg-green-500 text-white font-bold text-lg shadow hover:bg-green-600 transition-all" onClick={() => { setPlan('free'); setStep('admin'); }}>Plan Gratuit</button>
              <button className="py-3 rounded-full bg-orange-500 text-white font-bold text-lg shadow hover:bg-orange-600 transition-all" onClick={() => { setPlan('monthly'); setStep('admin'); }}>Plan Mensuel</button>
              <button className="py-3 rounded-full bg-blue-600 text-white font-bold text-lg shadow hover:bg-blue-700 transition-all" onClick={() => { setPlan('lifetime'); setStep('admin'); }}>Plan Vie</button>
            </div>
          </div>
        )}
        {step === 'admin' && (
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Création du compte administrateur</h2>
            {/* TODO: Formulaire admin (nom, email, téléphone, mot de passe, etc) */}
            <button className="mt-6 w-full py-3 rounded-full bg-primary text-white font-bold" onClick={() => setStep('organisation')}>Suivant</button>
          </div>
        )}
        {step === 'organisation' && (
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Organisation</h2>
            {/* TODO: Formulaire organisation (nom, code, logo, etc) */}
            <button className="mt-6 w-full py-3 rounded-full bg-primary text-white font-bold" onClick={() => setStep('brand')}>Suivant</button>
          </div>
        )}
        {step === 'brand' && (
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Configuration du garage</h2>
            {/* TODO: Formulaire brand (infos, logo, couleurs, etc) */}
            <button className="mt-6 w-full py-3 rounded-full bg-primary text-white font-bold" onClick={() => setStep('done')}>Terminer</button>
          </div>
        )}
        {step === 'done' && (
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Initialisation terminée !</h2>
            <p>Votre espace est prêt. Vous pouvez maintenant vous connecter.</p>
            <button className="mt-6 w-full py-3 rounded-full bg-primary text-white font-bold" onClick={onComplete}>Aller au Dashboard</button>
          </div>
        )}
      </main>
      <UnifiedFooter />
    </div>
  );
};

export default AdminSetupWizard;
