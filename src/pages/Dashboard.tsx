import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Car, 
  Wrench, 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  Clock,
  DollarSign,
  Users
} from 'lucide-react';

const Dashboard = () => {
  const { garageUser } = useAuth();

  const stats = [
    {
      title: "Véhicules",
      value: "42",
      description: "+12% ce mois",
      icon: Car,
      color: "text-blue-600"
    },
    {
      title: "Interventions",
      value: "18",
      description: "7 en cours",
      icon: Wrench,
      color: "text-orange-600"
    },
    {
      title: "Factures",
      value: "235K FCFA",
      description: "Ce mois",
      icon: FileText,
      color: "text-green-600"
    },
    {
      title: "Revenus",
      value: "1.2M FCFA",
      description: "+8% vs mois dernier",
      icon: DollarSign,
      color: "text-purple-600"
    }
  ];

  const recentInterventions = [
    {
      id: "1",
      vehicle: "Toyota Camry - AB 123 CD",
      status: "diagnostic",
      priority: "high",
      technician: "Jean Kouassi",
      date: "2024-01-15"
    },
    {
      id: "2",
      vehicle: "Mercedes C200 - EF 456 GH",
      status: "reparation",
      priority: "medium",
      technician: "Marie Traoré",
      date: "2024-01-14"
    },
    {
      id: "3",
      vehicle: "BMW X3 - IJ 789 KL",
      status: "devis",
      priority: "low",
      technician: "Paul Diabaté",
      date: "2024-01-13"
    }
  ];

  const alerts = [
    {
      id: "1",
      type: "stock",
      message: "Stock faible: Plaquettes de frein",
      priority: "high"
    },
    {
      id: "2",
      type: "maintenance",
      message: "Entretien programmé: Toyota Corolla",
      priority: "medium"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'diagnostic': return 'bg-yellow-100 text-yellow-800';
      case 'reparation': return 'bg-blue-100 text-blue-800';
      case 'devis': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Bonjour {garageUser?.full_name?.split(' ')[0]} 👋
        </h2>
        <div className="flex items-center space-x-2">
          <Button>Nouvelle intervention</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="garage-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Interventions */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Interventions Récentes</CardTitle>
            <CardDescription>
              Vous avez {recentInterventions.length} interventions en cours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInterventions.map((intervention) => (
                <div key={intervention.id} className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-none">
                      {intervention.vehicle}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Technicien: {intervention.technician}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(intervention.status)}>
                      {intervention.status}
                    </Badge>
                    <Badge className={getPriorityColor(intervention.priority)}>
                      {intervention.priority}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {intervention.date}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts and Notifications */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Alertes & Notifications</CardTitle>
            <CardDescription>
              {alerts.length} alertes nécessitent votre attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-4">
                  <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                    alert.priority === 'high' ? 'text-red-500' : 'text-orange-500'
                  }`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      Priorité: {alert.priority}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      {garageUser?.role !== 'technicien' && (
        <Card>
          <CardHeader>
            <CardTitle>Actions Rapides</CardTitle>
            <CardDescription>
              Raccourcis vers les fonctions les plus utilisées
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-20 flex-col">
                <Car className="h-6 w-6 mb-2" />
                Ajouter véhicule
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Wrench className="h-6 w-6 mb-2" />
                Nouvelle intervention
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <FileText className="h-6 w-6 mb-2" />
                Créer facture
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Users className="h-6 w-6 mb-2" />
                Gérer équipe
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;