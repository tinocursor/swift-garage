import AdminSetupWizard from '@/components/AdminSetupWizardV2';

export default function InitialisationPage() {
  return <AdminSetupWizard onComplete={() => window.location.replace('/')} />;
}
