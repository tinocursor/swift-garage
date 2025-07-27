import { supabase } from '@/integrations/supabase/client';

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export async function createSuperAdminAndOrg(plan, superAdminData, orgData, brandData) {
  // 1. Créer le super-admin (Supabase Auth)
  const { email, password, full_name, phone, role, title } = superAdminData;
  const { error: signUpError, data: signUpData } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name, phone, role, title }
    }
  });
  if (signUpError) throw new Error('Erreur création super-admin: ' + signUpError.message);
  const userId = signUpData.user?.id;
  if (!userId) throw new Error('Utilisateur super-admin non créé');

  // 2. Créer l'organisation
  const { name, code } = orgData;
  let subscription_type = plan;
  let subscription_end = null;
  if (plan === 'free') {
    subscription_type = 'free';
    subscription_end = addDays(new Date(), 7).toISOString();
  }
  const { data: orgInsert, error: orgError } = await supabase.from('organisations').insert([
    {
      name,
      code,
      subscription_type,
      subscription_end,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ]).select().single();
  if (orgError) throw new Error('Erreur création organisation: ' + orgError.message);
  const organisation_id = orgInsert.id;

  // 3. Créer la config brand
  const brandPayload = {
    ...brandData,
    organisation_id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  const { error: brandError } = await supabase.from('brand_config').insert([brandPayload]);
  if (brandError) throw new Error('Erreur création brand: ' + brandError.message);

  // 4. (Optionnel) Mettre à jour le user avec l'organisation
  const { error: userUpdateError } = await supabase.from('users').update({
    organisation_id,
    is_active: true,
    role: 'super_admin',
    updated_at: new Date().toISOString(),
  }).eq('id', userId);
  if (userUpdateError) throw new Error('Erreur update user: ' + userUpdateError.message);

  return true;
}
