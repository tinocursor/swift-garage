import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Car,
  Wrench,
  FileText,
  Package,
  Users,
  Settings,
  Building2,
  BarChart3,
  AlertTriangle,
  History
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  roles?: string[];
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    roles: ['super_admin', 'admin', 'technicien']
  },
  {
    title: 'Véhicules',
    href: '/vehicles',
    icon: Car,
    roles: ['super_admin', 'admin', 'technicien']
  },
  {
    title: 'Interventions',
    href: '/interventions',
    icon: Wrench,
    badge: '3',
    roles: ['super_admin', 'admin', 'technicien']
  },
  {
    title: 'Facturation',
    href: '/invoices',
    icon: FileText,
    roles: ['super_admin', 'admin']
  },
  {
    title: 'Stock & Pièces',
    href: '/inventory',
    icon: Package,
    roles: ['super_admin', 'admin', 'technicien']
  },
  {
    title: 'Équipe',
    href: '/team',
    icon: Users,
    roles: ['super_admin', 'admin']
  },
  {
    title: 'Organisations',
    href: '/organisations',
    icon: Building2,
    roles: ['super_admin']
  },
  {
    title: 'Rapports',
    href: '/reports',
    icon: BarChart3,
    roles: ['super_admin', 'admin']
  },
  {
    title: 'Alertes',
    href: '/alerts',
    icon: AlertTriangle,
    badge: '2',
    roles: ['super_admin', 'admin']
  },
  {
    title: 'Historique',
    href: '/history',
    icon: History,
    roles: ['super_admin', 'admin', 'technicien']
  },
  {
    title: 'Paramètres',
    href: '/settings',
    icon: Settings,
    roles: ['super_admin', 'admin']
  }
];

export function Sidebar() {
  const { garageUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const filteredNavItems = navItems.filter(item => 
    !item.roles || item.roles.includes(garageUser?.role || '')
  );

  return (
    <div className="pb-12 w-64">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {filteredNavItems.map((item) => (
              <Button
                key={item.href}
                variant={location.pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  location.pathname === item.href && "bg-primary/10 text-primary hover:bg-primary/20"
                )}
                onClick={() => navigate(item.href)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
                {item.badge && (
                  <Badge 
                    variant="secondary" 
                    className="ml-auto h-5 w-5 p-0 text-xs bg-primary text-primary-foreground"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}