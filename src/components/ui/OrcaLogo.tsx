import React from 'react';
import orcaLogoAsset from '../../assets/orca_logo.png';

interface OrcaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'auto';
}

export const OrcaLogo: React.FC<OrcaLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'auto',
}) => {
  const heightClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-11 sm:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-20 sm:h-24',
  };

  // If variant is dark background, apply crisp light glow filter so dark text pops
  const filterStyle =
    variant === 'dark'
      ? { filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.9)) drop-shadow(0 2px 12px rgba(0,242,254,0.5))' }
      : { filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={orcaLogoAsset}
        alt="ORCA - Ocean Risk & Catch Advisory"
        style={filterStyle}
        className={`${heightClasses[size]} w-auto object-contain transition-all duration-300 hover:scale-[1.03]`}
      />
    </div>
  );
};
