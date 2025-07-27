import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Building2, User, Palette, CreditCard, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export type PlanType = 'monthly' | 'lifetime';

interface AdminData {
  email: string;
  password: string;
  fullName: string;
  phone: string;
}

interface OrganisationData {
  name: string;
  code: string;
  address: string;
  rccm?: string;
}

interface BrandData {
  logo?: File;
  primaryColor: string;
  activities: string[];
}

interface AdminSetupWizardProps {
  onComplete: () => void;
}

const STEPS = ['plan', 'admin', 'organisation', 'brand', 'done'] as const;
type Step = typeof STEPS[number];

const PLAN_COLORS: Record<PlanType, string> = {
  monthly: 'hsl(var(--orange))',
  lifetime: 'hsl(var(--blue))',
};

const ACTIVITY_OPTIONS = [
  'Mécanique générale',
  'Carrosserie',
  'Peinture',
  'Électricité auto',
  'Climatisation',
  'Lavage',
  'Vente pièces'
];

const AdminSetupWizard: React.FC<AdminSetupWizardProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<Step>('plan');
  const [plan, setPlan] = useState<PlanType>('monthly');
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [orgData, setOrgData] = useState<OrganisationData | null>(null);
  const [brandData, setBrandData] = useState<BrandData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const currentStepIndex = STEPS.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  const adminForm = useForm<AdminData>();
  const orgForm = useForm<OrganisationData>();
  const brandForm = useForm<BrandData>();

  const nextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex]);
    }
  };

  const handlePlanSelect = (selectedPlan: PlanType) => {
    setPlan(selectedPlan);
    nextStep();
  };

  const handleAdminSubmit = async (data: AdminData) => {
    setIsLoading(true);
    try {
      // Simulate admin creation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAdminData(data);
      toast({
        title: "Compte administrateur configuré",
        description: "Les informations ont été enregistrées."
      });
      nextStep();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer le compte administrateur.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrgSubmit = async (data: OrganisationData) => {
    setIsLoading(true);
    try {
      // Simulate organisation creation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOrgData(data);
      toast({
        title: "Organisation créée",
        description: `${data.name} a été configurée avec succès.`
      });
      nextStep();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer l'organisation.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBrandSubmit = async (data: BrandData) => {
    setIsLoading(true);
    try {
      // Simulate brand configuration
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBrandData(data);
      
      // Mark setup as complete
      localStorage.setItem('setup_complete', 'true');
      localStorage.setItem('brand_configured', 'true');
      
      toast({
        title: "Configuration terminée",
        description: "Votre garage est maintenant prêt à être utilisé!"
      });
      nextStep();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder la configuration.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const currentBgColor = currentStep === 'plan' ? 'hsl(var(--background))' : PLAN_COLORS[plan];

  return (
    <div 
      className="min-h-screen flex flex-col transition-all duration-500"
      style={{ backgroundColor: currentStep === 'plan' ? undefined : currentBgColor }}
    >
      {/* Header with progress */}
      <div className="p-6">
        <div className="max-w-md mx-auto">
          <Progress value={progress} className="h-2 mb-4" />
          <p className="text-center text-sm text-muted-foreground">
            Étape {currentStepIndex + 1} sur {STEPS.length}
          </p>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          
          {/* Plan Selection */}
          {currentStep === 'plan' && (
            <Card className="border-2">
              <CardHeader className="text-center">
                <CreditCard className="mx-auto h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Choisissez votre plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full h-16 text-lg justify-between"
                  style={{ borderColor: PLAN_COLORS.monthly }}
                  onClick={() => handlePlanSelect('monthly')}
                >
                  <div>
                    <div className="font-bold">Plan Mensuel</div>
                    <div className="text-sm text-muted-foreground">20 000 FCFA/mois</div>
                  </div>
                  <Badge style={{ backgroundColor: PLAN_COLORS.monthly }}>
                    Populaire
                  </Badge>
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full h-16 text-lg justify-between"
                  style={{ borderColor: PLAN_COLORS.lifetime }}
                  onClick={() => handlePlanSelect('lifetime')}
                >
                  <div>
                    <div className="font-bold">Plan À Vie</div>
                    <div className="text-sm text-muted-foreground">200 000 FCFA unique</div>
                  </div>
                  <Badge style={{ backgroundColor: PLAN_COLORS.lifetime }}>
                    Économie
                  </Badge>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Admin Form */}
          {currentStep === 'admin' && (
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center">
                <User className="mx-auto h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Compte Administrateur</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={adminForm.handleSubmit(handleAdminSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Nom complet</Label>
                    <Input
                      id="fullName"
                      {...adminForm.register('fullName', { required: 'Le nom est requis' })}
                      placeholder="Thierry Gogo"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...adminForm.register('email', { required: 'Email requis' })}
                      placeholder="admin@garage.ci"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      {...adminForm.register('phone', { required: 'Téléphone requis' })}
                      placeholder="+225 07 58 96 61 56"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                      id="password"
                      type="password"
                      {...adminForm.register('password', { 
                        required: 'Mot de passe requis',
                        minLength: { value: 6, message: 'Minimum 6 caractères' }
                      })}
                      placeholder="Mot de passe sécurisé"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Création...' : 'Créer le compte'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Organisation Form */}
          {currentStep === 'organisation' && (
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Building2 className="mx-auto h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Votre Organisation</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={orgForm.handleSubmit(handleOrgSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nom du garage</Label>
                    <Input
                      id="name"
                      {...orgForm.register('name', { required: 'Nom requis' })}
                      placeholder="Garage Central Abidjan"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="code">Code garage</Label>
                    <Input
                      id="code"
                      {...orgForm.register('code', { required: 'Code requis' })}
                      placeholder="GCA-01"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      {...orgForm.register('address', { required: 'Adresse requise' })}
                      placeholder="Adjamé, Abidjan"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="rccm">RCCM (optionnel)</Label>
                    <Input
                      id="rccm"
                      {...orgForm.register('rccm')}
                      placeholder="CI-ABJ-01-2024-B12-00123"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Enregistrement...' : 'Continuer'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Brand Configuration */}
          {currentStep === 'brand' && (
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Palette className="mx-auto h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Identité Visuelle</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={brandForm.handleSubmit(handleBrandSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="primaryColor">Couleur principale</Label>
                    <Input
                      id="primaryColor"
                      type="color"
                      {...brandForm.register('primaryColor')}
                      defaultValue="#3b82f6"
                    />
                  </div>
                  
                  <div>
                    <Label>Activités du garage</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {ACTIVITY_OPTIONS.map((activity) => (
                        <label key={activity} className="flex items-center space-x-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            {...brandForm.register('activities')}
                            value={activity}
                            className="rounded"
                          />
                          <span className="text-sm">{activity}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Finalisation...' : 'Terminer la configuration'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Completion */}
          {currentStep === 'done' && (
            <Card className="bg-white/95 backdrop-blur-sm text-center">
              <CardContent className="pt-8">
                <Check className="mx-auto h-16 w-16 text-green-500 mb-6" />
                <h2 className="text-2xl font-bold mb-4">Configuration terminée !</h2>
                <p className="text-muted-foreground mb-6">
                  Votre garage {orgData?.name} est maintenant prêt à fonctionner.
                </p>
                
                <div className="space-y-2 text-sm text-left mb-6">
                  <div className="flex justify-between">
                    <span>Plan:</span>
                    <Badge>{plan === 'monthly' ? 'Mensuel' : 'À vie'}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Admin:</span>
                    <span>{adminData?.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Organisation:</span>
                    <span>{orgData?.name}</span>
                  </div>
                </div>
                
                <Button onClick={onComplete} className="w-full">
                  Accéder au tableau de bord
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminSetupWizard;