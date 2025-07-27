import AdminSetupWizard from '@/components/AdminSetupWizard';

export default function InitialisationPage() {
  return <AdminSetupWizard onComplete={() => window.location.replace('/dashboard')} />;
}
