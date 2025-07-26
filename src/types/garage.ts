export type UserRole = 'super_admin' | 'admin' | 'technicien';

export interface Organisation {
  id: string;
  name: string;
  code: string;
  subscription_type: 'monthly' | 'lifetime';
  subscription_end?: Date;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: UserRole;
  organisation_id?: string;
  avatar_url?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Vehicle {
  id: string;
  organisation_id: string;
  plate_number: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  owner_name: string;
  owner_phone: string;
  owner_email?: string;
  vin?: string;
  engine_number?: string;
  fuel_type: 'essence' | 'diesel' | 'hybrid' | 'electric';
  photos: string[];
  documents: string[];
  qr_code?: string;
  next_maintenance?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Intervention {
  id: string;
  organisation_id: string;
  vehicle_id: string;
  technician_id: string;
  status: 'reception' | 'diagnostic' | 'devis' | 'reparation' | 'livraison' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  description: string;
  diagnostic?: string;
  estimated_cost: number;
  final_cost?: number;
  start_date: Date;
  end_date?: Date;
  client_signature?: string;
  photos_before: string[];
  photos_after: string[];
  parts_used: InterventionPart[];
  labor_hours: number;
  labor_rate: number;
  created_at: Date;
  updated_at: Date;
}

export interface InterventionPart {
  id: string;
  part_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Part {
  id: string;
  organisation_id: string;
  name: string;
  reference: string;
  brand?: string;
  category: string;
  stock_quantity: number;
  min_stock: number;
  unit_price: number;
  supplier_id?: string;
  location?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Invoice {
  id: string;
  organisation_id: string;
  intervention_id: string;
  invoice_number: string;
  client_name: string;
  client_phone: string;
  client_email?: string;
  total_amount: number;
  tax_amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  payment_method?: 'cash' | 'card' | 'mobile_money' | 'bank_transfer';
  due_date: Date;
  paid_date?: Date;
  pdf_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface BrandConfig {
  id: string;
  organisation_id: string;
  logo_url?: string;
  primary_color: string;
  secondary_color: string;
  company_name: string;
  owner_name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  rccm?: string;
  nif?: string;
  activities: string[];
  currency: string;
  tax_rate: number;
  created_at: Date;
  updated_at: Date;
}

export interface DashboardStats {
  total_vehicles: number;
  active_interventions: number;
  pending_invoices: number;
  monthly_revenue: number;
  completed_interventions: number;
  pending_parts: number;
}

export interface NotificationSettings {
  email_notifications: boolean;
  sms_notifications: boolean;
  maintenance_alerts: boolean;
  stock_alerts: boolean;
  payment_reminders: boolean;
}

export type InterventionStatus = Intervention['status'];
export type VehicleFuelType = Vehicle['fuel_type'];
export type InvoiceStatus = Invoice['status'];
export type PaymentMethod = Invoice['payment_method'];
export type Priority = Intervention['priority'];