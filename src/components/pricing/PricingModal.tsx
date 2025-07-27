import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Check, Zap, Crown, Star } from 'lucide-react';

interface PricingModalProps {
  open: boolean;
  onClose: () => void;
  onSelectPlan: (plan: 'free' | 'monthly' | 'lifetime') => void;
}

export function PricingModal({ open, onClose, onSelectPlan }: PricingModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Choisissez votre abonnement GarageManager
          </DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-3 gap-6 p-6">
          {/* Plan Free */}
          <Card className="relative border-green-600 shadow-lg">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                ESSAI GRATUIT 1 SEMAINE
              </span>
            </div>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-green-600" />
                <CardTitle>Plan Free</CardTitle>
              </div>
              <div className="text-3xl font-bold text-green-600">0 FCFA<span className="text-sm text-muted-foreground"> /1 semaine</span></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {['Gestion véhicules limitée', '1 seul utilisateur', 'Pas de facturation', 'Pas d’export', 'Pas de support prioritaire'].map((feature) => (
                  <li key={feature} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={() => onSelectPlan('free')} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold rounded-full py-2">
                Commencer l'essai gratuit
              </Button>
            </CardContent>
          </Card>

          {/* Plan Mensuel */}
          <Card className="relative">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-orange-500" />
                <CardTitle>Plan Mensuel</CardTitle>
              </div>
              <div className="text-3xl font-bold">20,000 FCFA<span className="text-sm text-muted-foreground">/mois</span></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {['Gestion complète des véhicules', 'Workflow de réparation', 'Facturation PDF', 'Stock et pièces', 'Support technique'].map((feature) => (
                  <li key={feature} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={() => onSelectPlan('monthly')} className="w-full">
                Choisir le plan mensuel
              </Button>
            </CardContent>
          </Card>

          {/* Plan À Vie */}
          <Card className="relative border-primary">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                RECOMMANDÉ
              </span>
            </div>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Crown className="h-5 w-5 text-primary" />
                <CardTitle>Plan À Vie</CardTitle>
              </div>
              <div className="text-3xl font-bold">200,000 FCFA<span className="text-sm text-muted-foreground"> une fois</span></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {['Toutes les fonctionnalités mensuelles', 'Fonctions premium', 'Support prioritaire', 'Mises à jour à vie', 'Formation incluse'].map((feature) => (
                  <li key={feature} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={() => onSelectPlan('lifetime')} className="w-full garage-button-primary">
                Choisir le plan à vie
              </Button>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
