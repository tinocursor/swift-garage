import React from 'react';
import UnifiedLayout from '@/layout/UnifiedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const APropos: React.FC = () => (
  <UnifiedLayout>
    <div className="py-8 w-full max-w-2xl mx-auto">
      <Card className="shadow-soft animate-fade-in">
        <CardHeader>
          <CardTitle>À propos de GarageManager</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">GarageManager est une application moderne pour la gestion de garages automobiles.</p>
          <p className="text-muted-foreground">Gérez vos clients, véhicules, réparations et stocks facilement, avec une interface inspirée de WhatsApp.</p>
        </CardContent>
      </Card>
    </div>
      </UnifiedLayout>
  );

export default APropos;
