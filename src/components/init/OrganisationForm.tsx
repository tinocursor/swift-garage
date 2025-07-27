import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Logo from '../ui/Logo';

interface OrganisationFormProps {
  onSubmit: (data: any) => void;
}

export default function OrganisationForm({ onSubmit }: OrganisationFormProps) {
  const [form, setForm] = useState({
    name: '',
    code: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name) {
      setError("Le nom de l'organisation est obligatoire");
      return;
    }
    if (!form.code) {
      form.code = form.name.replace(/\s+/g, '').toUpperCase().slice(0, 12);
    }
    setLoading(true);
    try {
      await onSubmit(form);
    } catch (e: any) {
      setError(e.message || 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow min-w-[350px] animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">Organisation</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {logoPreview || form.logo_url ? (
        <Logo size={96} animated={false} src={logoPreview || form.logo_url} className="mb-2" />
      ) : null}
      <div className="mb-2">
        <label>Nom de l'organisation *</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} className="input w-full" required />
      </div>
      <div className="mb-4">
        <label>Code (optionnel)</label>
        <input type="text" name="code" value={form.code} onChange={handleChange} className="input w-full" placeholder="ex: GARAGE2024" />
      </div>
      <button type="submit" className="garage-button-primary w-full flex items-center justify-center" disabled={loading}>
        {loading && <Loader2 className="animate-spin h-5 w-5 mr-2" />}Suivant
      </button>
    </form>
  );
}
