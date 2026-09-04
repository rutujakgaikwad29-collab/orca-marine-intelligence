import { Card } from '../ui/Card';
import { Siren, AlertTriangle, Compass, Navigation, ArrowRight, ShieldCheck } from 'lucide-react';
import type { AlertItem } from '../../data/mockAlertsData';

interface CriticalEmergencyBannerProps {
  alert: AlertItem;
  onNavigateSafeRoute?: () => void;
}

export const CriticalEmergencyBanner = ({ alert, onNavigateSafeRoute }: CriticalEmergencyBannerProps) => {
  return (
    <Card className="glass-card border-coral-red/60 relative overflow-hidden bg-gradient-to-r from-coral-red/20 via-[#11111A] to-solar-amber/10 p-5 shadow-[0_0_35px_rgba(255,92,119,0.25)] animate-pulse-slow">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        
        {/* Left emergency info */}
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-coral-red/30 text-coral-red border border-coral-red shadow-[0_0_15px_rgba(255,92,119,0.6)] animate-ping">
              <Siren className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-coral-red uppercase tracking-wider">
                  {alert.title}
                </h3>
                <span className="text-[9px] font-bold font-mono px-2 py-0.5 rounded bg-coral-red/30 text-coral-red border border-coral-red/50 uppercase">
                  IMMEDIATE ACTION REQUIRED
                </span>
              </div>
              <span className="text-[10px] text-cool-gray font-mono">
                Location: {alert.location} • Source: {alert.source}
              </span>
            </div>
          </div>

          <p className="text-xs text-soft-white/95 leading-relaxed">
            {alert.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono pt-1">
            {alert.metrics.map((m, idx) => (
              <div key={idx} className="bg-black/60 border border-white/10 p-2 rounded-lg">
                <span className="text-[8px] text-cool-gray block uppercase">{m.label}</span>
                <span className="font-bold text-coral-red">{m.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action button */}
        <div className="w-full lg:w-56 shrink-0 flex flex-col gap-2">
          <button
            onClick={onNavigateSafeRoute}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-coral-red to-solar-amber text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,92,119,0.5)] transition-all hover:scale-105"
          >
            <Navigation className="w-4 h-4" /> 🧭 NAVIGATE TO SAFE ZONE <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <span className="text-[9px] font-mono text-center text-cool-gray">
            Calculated Evasion: Mirkarwada Port (22 min)
          </span>
        </div>

      </div>
    </Card>
  );
};
