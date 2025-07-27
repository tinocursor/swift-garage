import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Image as ImageIcon } from 'lucide-react';
import Logo from '../ui/Logo';

const ACTIVITIES = ['Garage', 'Lavage', 'Buvette', 'Carrosserie', 'Peinture'];

interface BrandFormProps {
  onSubmit: (data: any) => void;
}

export default function BrandForm({ onSubmit }: BrandFormProps) {
  const [form, setForm] = useState({
    company_name: '',
    owner_name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    rccm: '',
    nif: '',
    activities: [],
    primary_color: '#1e293b',
    secondary_color: '#f59e42',
    currency: 'FCFA',
    tax_rate: 18,
    logo_url: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleActivityChange = (activity: string) => {
    setForm((prev) => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter((a) => a !== activity)
        : [...prev.activities, activity],
    }));
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      // Preview
      const reader = new FileReader();
      reader.onload = (ev) => {
        setLogoPreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `logo-${Date.now()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage.from('brand-logos').upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
      });
      if (uploadError) throw uploadError;
      // Get public URL
      const { data: publicUrlData } = supabase.storage.from('brand-logos').getPublicUrl(fileName);
      setForm((prev) => ({ ...prev, logo_url: publicUrlData.publicUrl }));
    } catch (err: any) {
      setError('Erreur upload logo : ' + (err.message || err.error_description || 'Inconnue'));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.company_name || !form.owner_name) {
      setError("Nom entreprise et propriétaire obligatoires");
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow min-w-[350px] max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Configuration Brand</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="mb-4 flex flex-col items-center">
        <div className="relative w-24 h-24 mb-2">
          {logoPreview || form.logo_url ? (
            <Logo size={96} animated={false} src={logoPreview || form.logo_url} className="mb-2" />
          ) : (
            <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-100 shadow-lg border-4 border-white">
              <ImageIcon className="h-10 w-10 text-gray-400" />
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-full">
              <Loader2 className="animate-spin h-8 w-8 text-primary" />
            </div>
          )}
        </div>
        <label className="block">
          <span className="sr-only">Choisir un logo</span>
          <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" id="logo-upload" />
          <label htmlFor="logo-upload" className="cursor-pointer px-4 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all">
            {uploading ? 'Upload...' : 'Choisir un logo'}
          </label>
        </label>
      </div>
      <div className="mb-2">
        <label>Nom entreprise *</label>
        <input type="text" name="company_name" value={form.company_name} onChange={handleChange} className="input w-full" required />
      </div>
      <div className="mb-2">
        <label>Propriétaire *</label>
        <input type="text" name="owner_name" value={form.owner_name} onChange={handleChange} className="input w-full" required />
      </div>
      <div className="mb-2">
        <label>Téléphone</label>
        <input type="text" name="phone" value={form.phone} onChange={handleChange} className="input w-full" />
      </div>
      <div className="mb-2">
        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} className="input w-full" />
      </div>
      <div className="mb-2">
        <label>Adresse</label>
        <input type="text" name="address" value={form.address} onChange={handleChange} className="input w-full" />
      </div>
      <div className="mb-2">
        <label>Ville</label>
        <input type="text" name="city" value={form.city} onChange={handleChange} className="input w-full" />
      </div>
      <div className="mb-2">
        <label>RCCM</label>
        <input type="text" name="rccm" value={form.rccm} onChange={handleChange} className="input w-full" />
      </div>
      <div className="mb-2">
        <label>NIF</label>
        <input type="text" name="nif" value={form.nif} onChange={handleChange} className="input w-full" />
      </div>
      <div className="mb-2">
        <label>Activités</label>
        <div className="flex flex-wrap gap-2">
          {ACTIVITIES.map((activity) => (
            <label key={activity} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={form.activities.includes(activity)}
                onChange={() => handleActivityChange(activity)}
              />
              {activity}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-2">
        <label>Couleur principale</label>
        <input type="color" name="primary_color" value={form.primary_color} onChange={handleChange} className="w-12 h-8 p-0 border-none" />
      </div>
      <div className="mb-2">
        <label>Couleur secondaire</label>
        <input type="color" name="secondary_color" value={form.secondary_color} onChange={handleChange} className="w-12 h-8 p-0 border-none" />
      </div>
      <div className="mb-2">
        <label>Devise</label>
        <select name="currency" value={form.currency} onChange={handleChange} className="input w-full">
          <option value="FCFA">FCFA</option>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
        </select>
      </div>
      <div className="mb-2">
        <label>Taux TVA (%)</label>
        <input type="number" name="tax_rate" value={form.tax_rate} onChange={handleChange} className="input w-full" min={0} max={100} />
      </div>
      <button type="submit" className="garage-button-primary w-full mt-4 flex items-center justify-center" disabled={uploading}>
        {uploading && <Loader2 className="animate-spin h-5 w-5 mr-2" />}Terminer
      </button>
    </form>
  );
}
