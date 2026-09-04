import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { ShieldAlert, Siren, Ship, Radio, MapPin, Anchor, ArrowRight } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

export const CoastGuardDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-12 fade-in">
      <Card className="glass-card border-coral-red/40 p-6 relative overflow-hidden bg-gradient-to-r from-[#11111A] via-[#1F1424] to-[#11111A] shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛟</span>
              <h1 className="text-2xl font-bold text-soft-white tracking-wide">
                Maritime Search, Rescue & Border Operations Command
              </h1>
            </div>
            <p className="text-xs text-cool-gray">
              Duty Officer: <strong className="text-soft-white">{user?.name}</strong> • Station: {user?.organization}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
              <span className="text-bio-mint font-bold">● SAR Fast Interceptor Ready (ICGS Varad)</span>
              <span className="text-white/20">•</span>
              <span className="text-solar-amber font-bold">IMBL Standoff Radar: Active</span>
              <span className="text-white/20">•</span>
              <span className="text-coral-red font-bold">VHF DSC 2187.5 kHz Guarded</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/alerts')}
            className="py-2.5 px-4 rounded-xl bg-coral-red/30 hover:bg-coral-red/40 border border-coral-red text-coral-red font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,92,119,0.4)] animate-pulse shrink-0"
          >
            <Siren className="w-4 h-4" /> 🚨 Emergency Response Mode
          </button>
        </div>
      </Card>

      {/* Coast Guard Telemetry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card border-white/5 p-4 flex flex-col justify-between">
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest">Active Monitored Vessels</span>
          <span className="text-3xl font-extrabold text-soft-white font-mono my-1">342</span>
          <span className="text-[9px] text-bio-mint font-mono">AIS Class B Telemetry 100%</span>
        </Card>

        <Card className="glass-card border-white/5 p-4 flex flex-col justify-between">
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest">Active Distress / SOS</span>
          <span className="text-3xl font-extrabold text-bio-mint font-mono my-1">0</span>
          <span className="text-[9px] text-bio-mint font-mono">All Sectors All-Clear</span>
        </Card>

        <Card className="glass-card border-white/5 p-4 flex flex-col justify-between">
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest">Boundary Proximity Flag</span>
          <span className="text-3xl font-extrabold text-solar-amber font-mono my-1">1 Vessel</span>
          <span className="text-[9px] text-solar-amber font-mono">1.8 NM from Naval Sector 4</span>
        </Card>

        <Card className="glass-card border-white/5 p-4 flex flex-col justify-between">
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest">SAR Interceptor Readiness</span>
          <span className="text-3xl font-extrabold text-electric-lavender font-mono my-1">&lt; 15 min</span>
          <span className="text-[9px] text-soft-white font-mono">Ratnagiri Coast Guard Base</span>
        </Card>
      </div>

      {/* Action Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card border-white/5 p-5 space-y-3">
          <h3 className="text-xs font-bold text-soft-white uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-solar-amber" /> Boundary & Geofence Breach Monitor
          </h3>
          <p className="text-xs text-soft-white/90 leading-relaxed">
            Automatic exclusion enforcement for Naval Gunnery Sector 4 and international boundary buffer (18.4 NM to IMBL).
          </p>
          <button
            onClick={() => navigate('/safety')}
            className="w-full py-2 bg-solar-amber/20 hover:bg-solar-amber/30 border border-solar-amber/50 rounded-xl text-xs font-bold text-solar-amber uppercase tracking-wider transition-colors"
          >
            Open Safety & Geofence Center &rarr;
          </button>
        </Card>

        <Card className="glass-card border-white/5 p-5 space-y-3">
          <h3 className="text-xs font-bold text-soft-white uppercase tracking-wider flex items-center gap-2">
            <Radio className="w-4 h-4 text-coral-red" /> Distress Broadcast & Siren Control
          </h3>
          <p className="text-xs text-soft-white/90 leading-relaxed">
            Transmit high-priority DSC distress alerts and synchronized LoRa/SMS alerts to all registered fishing craft.
          </p>
          <button
            onClick={() => navigate('/alerts')}
            className="w-full py-2 bg-coral-red/20 hover:bg-coral-red/30 border border-coral-red/50 rounded-xl text-xs font-bold text-coral-red uppercase tracking-wider transition-colors"
          >
            Open Emergency Broadcast Suite &rarr;
          </button>
        </Card>
      </div>
    </div>
  );
};
