import { Bell, Siren, ShieldAlert, Radio, Volume2, RefreshCw } from 'lucide-react';
import { Card } from '../ui/Card';
import { mockAlertsData } from '../../data/mockAlertsData';

interface AlertHeaderProps {
  onTriggerMockEmergency: () => void;
  onRefresh: () => void;
  refreshing: boolean;
  activeCount: number;
  criticalCount: number;
}

export const AlertHeader = ({
  onTriggerMockEmergency,
  onRefresh,
  refreshing,
  activeCount,
  criticalCount,
}: AlertHeaderProps) => {
  const { kpis } = mockAlertsData;

  return (
    <Card className="glass-card border-white/10 relative overflow-hidden bg-gradient-to-r from-[#11111A] via-[#1A1424] to-[#11111A] p-6 shadow-2xl">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-coral-red/15 blur-3xl pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
        {/* Left Title & Status */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-coral-red/20 border border-coral-red/40 text-coral-red shadow-[0_0_25px_rgba(255,92,119,0.3)] animate-pulse">
              <Bell className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-soft-white uppercase tracking-wider">
                  ALERTS & EARLY WARNING CENTER 🔔
                </h1>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-solar-amber/15 border border-solar-amber/30 text-solar-amber uppercase">
                  SIMULATION ACTIVE
                </span>
              </div>
              <p className="text-xs text-cool-gray">
                "Real-Time Emergency Broadcast, Multi-Device Alert Dispatch & Maritime Distress System"
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-cool-gray">
            <span className="text-coral-red font-bold font-mono flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-coral-red animate-ping"></span>
              {criticalCount} CRITICAL ALERTS
            </span>
            <span className="text-white/20">•</span>
            <span className="text-soft-white font-mono">{activeCount} Total Unresolved</span>
            <span className="text-white/20">•</span>
            <span className="text-bio-mint font-mono">{kpis.broadcastHealth}</span>
            <span className="text-white/20">•</span>
            <span className="text-electric-lavender font-mono">Channel: Coast Guard VHF 16 / DSC</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-2.5 w-full lg:w-auto shrink-0">
          <button
            onClick={onTriggerMockEmergency}
            className="py-2.5 px-4 rounded-xl bg-coral-red/20 hover:bg-coral-red/30 border border-coral-red/60 text-coral-red font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,92,119,0.3)] animate-pulse"
          >
            <Siren className="w-4 h-4" /> 🚨 TRIGGER SIH EMERGENCY DEMO
          </button>

          <button
            onClick={onRefresh}
            className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-soft-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-bio-mint' : ''}`} />
            Sync Feeds
          </button>
        </div>
      </div>
    </Card>
  );
};
