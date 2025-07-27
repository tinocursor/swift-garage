import React, { useState } from 'react';
import { OrganisationOnboarding as OnboardingModal } from '@/components/OrganisationOnboarding';
import { useNavigate } from 'react-router-dom';

const OrganisationOnboardingPage: React.FC = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleComplete = (organisationId: string) => {
    setOpen(false);
    // Rediriger vers le dashboard ou autre page après onboarding
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <OnboardingModal isOpen={open} onComplete={handleComplete} />
    </div>
  );
};

export default OrganisationOnboardingPage;
