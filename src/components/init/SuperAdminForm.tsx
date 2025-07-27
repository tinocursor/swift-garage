import React, { useState } from 'react';
import { Mail, Lock, User, Smartphone, Briefcase, Loader2 } from 'lucide-react';

interface SuperAdminFormProps {
  onSubmit: (data: any) => void;
}

export default function SuperAdminForm({ onSubmit }: SuperAdminFormProps) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    full_name: '',
    phone: '',
    title: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.email || !form.password || !form.full_name) {
      setError('Tous les champs obligatoires doivent être remplis');
      return;
    }
    if (form.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    setLoading(true);
    try {
      await onSubmit({ ...form, role: 'super_admin' });
    } catch (e: any) {
      setError(e.message || 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white rounded-2xl shadow-xl min-w-[350px] max-w-md mx-auto animate-fade-in">
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg mb-2">
          <User className="h-12 w-12 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-1 text-[#25D366]">Super-Admin</h2>
        <p className="text-muted-foreground text-sm">Créez votre compte administrateur principal</p>
      </div>
      {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
      <div className="mb-3 relative">
        <Mail className="absolute left-3 top-3 h-4 w-4 text-[#25D366]" />
        <input type="email" name="email" value={form.email} onChange={handleChange} className="input w-full pl-10 rounded-full border-[#25D366] focus:ring-[#25D366]" placeholder="Email *" required />
      </div>
      <div className="mb-3 relative">
        <Lock className="absolute left-3 top-3 h-4 w-4 text-[#25D366]" />
        <input type="password" name="password" value={form.password} onChange={handleChange} className="input w-full pl-10 rounded-full border-[#25D366] focus:ring-[#25D366]" placeholder="Mot de passe *" required />
      </div>
      <div className="mb-3 relative">
        <User className="absolute left-3 top-3 h-4 w-4 text-[#25D366]" />
        <input type="text" name="full_name" value={form.full_name} onChange={handleChange} className="input w-full pl-10 rounded-full border-[#25D366] focus:ring-[#25D366]" placeholder="Nom complet *" required />
      </div>
      <div className="mb-3 relative">
        <Smartphone className="absolute left-3 top-3 h-4 w-4 text-[#25D366]" />
        <input type="text" name="phone" value={form.phone} onChange={handleChange} className="input w-full pl-10 rounded-full border-[#25D366] focus:ring-[#25D366]" placeholder="Téléphone" />
      </div>
      <div className="mb-6 relative">
        <Briefcase className="absolute left-3 top-3 h-4 w-4 text-[#25D366]" />
        <input type="text" name="title" value={form.title} onChange={handleChange} className="input w-full pl-10 rounded-full border-[#25D366] focus:ring-[#25D366]" placeholder="Titre (ex: Gérant)" />
      </div>
      <button type="submit" className="w-full py-3 rounded-full bg-[#25D366] text-white font-bold text-lg shadow-lg hover:bg-[#1ebe57] transition-all flex items-center justify-center disabled:opacity-60" disabled={loading}>
        {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : null}
        Suivant
      </button>
    </form>
  );
}
