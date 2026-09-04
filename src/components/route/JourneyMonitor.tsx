import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Navigation, Anchor, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';

interface JourneyMonitorProps {
  onDivertToHarbour: () => void;
}

export const JourneyMonitor = ({ onDivertToHarbour }: JourneyMonitorProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Active Navigation HUD */}
      <Card className="glass-card border-white/5 flex flex-col justify-between p-5 relative overflow-hidden">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
            <span className="text-xs font-bold text-soft-white uppercase tracking-wider flex items-center gap-2">
              <Navigation className="w-4 h-4 text-bio-mint" /> ACTIVE JOURNEY TELEMETRY HUD
            </span>
            <span className="text-[9px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
              GPS FIX: 3D DGPS ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono mb-3">
            <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
              <span className="text-[8px] text-cool-gray block uppercase">Next Waypoint</span>
              <span className="font-bold text-soft-white">WP2 (Coastal Jet)</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
              <span className="text-[8px] text-cool-gray block uppercase">Distance to Next</span>
              <span className="font-bold text-bio-mint">3.8 km</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
              <span className="text-[8px] text-cool-gray block uppercase">Cross-Track Error</span>
              <span className="font-bold text-soft-white">&plusmn; 4.2 m (Normal)</span>
            </div>
          </div>

          <div className="bg-[#0B0B12] border border-white/10 p-3 rounded-xl flex items-center justify-between text-xs">
            <div>
              <span className="text-[9px] text-cool-gray uppercase block font-bold">Upcoming Environmental Hazard</span>
              <span className="text-solar-amber font-bold">Moderate Crosswind (28 km/h at KM 8.0)</span>
            </div>
            <span className="text-[10px] font-mono text-cool-gray">ETA to Event: 12 min</span>
          </div>
        </div>

        <p className="text-[10px] text-cool-gray pt-2 mt-2 border-t border-white/5 italic">
          * Integrated with NMEA 0183 & AIS Marine Transponder Simulator.
        </p>
      </Card>

      {/* Safe Harbour Diversion Quick Action */}
      <Card className="glass-card border-solar-amber/30 flex flex-col justify-between p-5 relative overflow-hidden bg-gradient-to-r from-solar-amber/5 to-transparent">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
            <span className="text-xs font-bold text-soft-white uppercase tracking-wider flex items-center gap-2">
              <Anchor className="w-4 h-4 text-solar-amber" /> CONTINGENCY SAFE HARBOUR DIVERSION
            </span>
            <span className="text-[9px] font-bold text-solar-amber font-mono bg-solar-amber/15 border border-solar-amber/30 px-2 py-0.5 rounded">
              STANDBY READY
            </span>
          </div>

          <p className="text-xs text-soft-white/90 leading-relaxed mb-3">
            If conditions deteriorate past configured thresholds, ORCA automatically calculates a safe evasion vector to the nearest sheltered basin.
          </p>

          <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-soft-white block">Mirkarwada Port (Ratnagiri Safe Basin)</span>
              <span className="text-[10px] text-cool-gray">Distance: 4.2 NM • ETA: 22 min • Keel Clearance: 4.8m</span>
            </div>
            <span className="text-xs font-bold font-mono text-bio-mint">Safety: 96/100</span>
          </div>
        </div>

        <button
          onClick={onDivertToHarbour}
          className="mt-4 w-full py-2.5 px-3 bg-solar-amber/20 hover:bg-solar-amber/30 border border-solar-amber/50 rounded-lg text-xs font-bold text-solar-amber uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(255,181,71,0.2)]"
        >
          <Anchor className="w-4 h-4" /> INITIATE EMERGENCY DIVERSION ROUTE <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </Card>
    </div>
  );
};
