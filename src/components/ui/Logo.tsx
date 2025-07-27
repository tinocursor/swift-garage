import React from 'react';

interface LogoProps {
  src?: string;
  size?: number;
  animated?: boolean;
  className?: string;
  alt?: string;
}

const DEFAULT_LOGO = '/Logo01.png';

const Logo: React.FC<LogoProps> = ({
  src = DEFAULT_LOGO,
  size = 48,
  animated = true,
  className = '',
  alt = 'Logo Garage Pro',
}) => {
  return (
    <div
      className={`inline-flex items-center justify-center ${animated ? 'animate-logo-spin' : ''} ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: size, height: size, objectFit: 'contain' }}
        className="select-none pointer-events-none"
        draggable={false}
      />
    </div>
  );
};

export default Logo;

// Animation CSS à ajouter dans le global CSS ou tailwind.config.js :
// .animate-logo-spin { animation: logo-spin 2.5s linear infinite; }
// @keyframes logo-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
