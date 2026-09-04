import React from 'react';
import { Card } from './Card';
import { cn } from '../../utils/cn';

interface CinematicVideoCardProps {
  imageSrc: string;
  title: string;
  subtitle: string;
  status: string;
  icon: React.ReactNode;
  height?: string;
  statusColor?: string;
}

export const CinematicVideoCard: React.FC<CinematicVideoCardProps> = ({
  imageSrc,
  title,
  subtitle,
  status,
  icon,
  height = 'h-48',
  statusColor = 'text-bio-mint'
}) => {
  return (
    <Card className={cn("relative overflow-hidden group border-white/5", height)}>
      {/* Background Image with Slow Pan Animation */}
      <div 
        className="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%] bg-cover opacity-60 mix-blend-screen transition-transform duration-[20s] ease-linear"
        style={{ 
          backgroundImage: `url(${imageSrc})`,
          animation: 'panSlow 30s ease-in-out infinite'
        }}
      />
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12] via-[#0B0B12]/60 to-transparent"></div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 p-5 w-full">
        <h3 className="text-lg font-bold text-soft-white mb-1 flex items-center gap-2">
          <span className="p-1.5 bg-white/10 rounded-md backdrop-blur-md border border-white/10 shadow-[0_0_12px_rgba(255,255,255,0.1)]">
            {icon}
          </span>
          {title}
        </h3>
        <p className="text-sm text-cool-gray mb-3">{subtitle}</p>
        
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", statusColor.replace('text-', 'bg-'))}></span>
            <span className={cn("relative inline-flex rounded-full h-2 w-2", statusColor.replace('text-', 'bg-'))}></span>
          </span>
          <span className={cn("text-[10px] font-bold tracking-widest uppercase", statusColor)}>
            {status}
          </span>
        </div>
      </div>
    </Card>
  );
};
