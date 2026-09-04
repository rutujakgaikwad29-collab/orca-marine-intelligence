import { ShieldAlert, AlertTriangle, Siren, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/Card';

interface SafetyHeaderProps {
  riskScore: number;
  riskLevel: string;
  statusLabel: string;
  lastUpdated: string;
  confidence: number;
  onEmergencyClick: () => void;
  onRefresh: () => void;
  refreshing: boolean;
}

export const SafetyHeader = ({
  riskScore,
  riskLevel,
  statusLabel,
  lastUpdated,
  confidence,
  onEmergencyClick,
  onRefresh,
  refreshing,
}: SafetyHeaderProps) => {
  // Gauge color mapping
  const getRiskTheme = (score: number) => {
    if (score <= 20) return { text: 'text-bio-mint', bg: 'bg-bio-mint', border: 'border-bio-mint', stroke: '#3EF0B5' };
    if (score <= 40) return { text: 'text-bio-mint', bg: 'bg-bio-mint', border: 'border-bio-mint', stroke: '#3EF0B5' };
    if (score <= 60) return { text: 'text-solar-amber', bg: 'bg-solar-amber', border: 'border-solar-amber', stroke: '#FFB547' };
    if (score <= 80) return { text: 'text-coral-red', bg: 'bg-coral-red', border: 'border-coral-red', stroke: '#FF5C77' };
    return { text: 'text-coral-red', bg: 'bg-coral-red', border: 'border-coral-red', stroke: '#FF5C77' };
  };

  const theme = getRiskTheme(riskScore);
  const circumference = 2 * Math.PI * 48;
  const strokeDashoffset = circumference - (riskScore / 100) * circumference;

  return (
    <Card className="glass-card border-white/10 relative overflow-hidden bg-gradient-to-r from-[#11111A] via-[#161522] to-[#11111A] p-6 shadow-2xl">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        {/* Left Title & Status */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-coral-red/10 border border-coral-red/30 shadow-[0_0_15px_rgba(255,92,119,0.2)]">
              <ShieldAlert className="w-7 h-7 text-coral-red animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-soft-white uppercase tracking-wider">
                  SAFETY COMMAND CENTER
                </h1>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-solar-amber/15 border border-solar-amber/30 text-solar-amber uppercase">
                  SIMULATION ACTIVE
                </span>
              </div>
              <p className="text-xs text-cool-gray">
                "AI-Powered Marine Risk Monitoring, Hazard Detection & Safe Navigation"
              </p>
            </div>
          </div>

          {/* Sub-telemetry pills */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
            <div className="flex items-center gap-1.5 text-cool-gray">
              <span className="w-2 h-2 rounded-full bg-bio-mint animate-pulse"></span>
              <span>Data Confidence: <strong className="text-soft-white font-mono">{confidence}%</strong></span>
            </div>
            <span className="text-white/20">•</span>
            <span className="text-cool-gray">Ratnagiri Operational Sector AS-04</span>
            <span className="text-white/20">•</span>
            <span className="text-cool-gray font-mono">Last Ingest: {lastUpdated}</span>
          </div>
        </div>

        {/* Center: Circular Animated Risk Gauge */}
        <div className="flex items-center gap-6 bg-black/40 border border-white/10 px-5 py-3.5 rounded-2xl">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="44"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="48"
                cy="48"
                r="44"
                stroke={theme.stroke}
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out drop-shadow-[0_0_10px_currentColor]"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`text-2xl font-bold font-mono ${theme.text}`}>{riskScore}</span>
              <span className="text-[8px] text-cool-gray uppercase font-mono tracking-widest">/ 100</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest block">OVERALL MARINE RISK</span>
            <div className="flex items-center gap-2">
              <AlertTriangle className={`w-4 h-4 ${theme.text}`} />
              <span className={`text-lg font-bold uppercase tracking-wider ${theme.text}`}>
                {riskLevel} RISK
              </span>
            </div>
            <span className="text-[10px] font-bold text-soft-white block font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10">
              {statusLabel}
            </span>
          </div>
        </div>

        {/* Right CTA Actions */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:w-48 shrink-0">
          <button
            onClick={onEmergencyClick}
            className="w-full py-2.5 px-4 rounded-xl bg-coral-red/20 hover:bg-coral-red/30 border border-coral-red/60 text-coral-red font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,92,119,0.3)] animate-pulse"
          >
            <Siren className="w-4 h-4" /> 🚨 EMERGENCY SOS
          </button>

          <button
            onClick={onRefresh}
            className="w-full py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-soft-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-bio-mint' : ''}`} />
            Recalculate Risk
          </button>
        </div>

      </div>
    </Card>
  );
};
