import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Zap, AlertTriangle, ShieldCheck, Activity } from 'lucide-react';

export const LightningSafetyPanel = () => {
  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-solar-amber">
          <Zap className="h-4 w-4" />
          LIGHTNING & CONVECTIVE HAZARD MONITOR
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          ACTIVITY: LOW
        </span>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-4">
        {/* Core telemetry */}
        <div className="grid grid-cols-3 gap-2.5 text-center">
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
            <span className="text-[8px] text-cool-gray uppercase block font-bold">Strikes in Radius</span>
            <span className="text-xl font-bold font-mono text-soft-white mt-0.5 block">12</span>
            <span className="text-[8px] text-cool-gray">Within 20 km</span>
          </div>

          <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
            <span className="text-[8px] text-cool-gray uppercase block font-bold">Nearest Strike</span>
            <span className="text-xl font-bold font-mono text-bio-mint mt-0.5 block">18.4 km</span>
            <span className="text-[8px] text-cool-gray">Bearing: 045° NE</span>
          </div>

          <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
            <span className="text-[8px] text-cool-gray uppercase block font-bold">Activity Trend</span>
            <span className="text-xl font-bold font-mono text-solar-amber mt-0.5 block">→ Stable</span>
            <span className="text-[8px] text-cool-gray">Dissipating</span>
          </div>
        </div>

        {/* Animated Lightning Intensity Pulse */}
        <div className="bg-[#0B0B12] border border-white/10 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-solar-amber/15 border border-solar-amber/40 flex items-center justify-center text-solar-amber">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-bold text-soft-white block">Convective Cloud Cluster AS-04</span>
              <span className="text-[10px] text-cool-gray font-mono">Cell Altitude: 11,200m • Cloud-to-Ground: 28%</span>
            </div>
          </div>
          <span className="text-[9px] font-mono text-bio-mint font-bold uppercase">Corridor Clear</span>
        </div>

        {/* Advisory safety rule */}
        <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-start gap-2.5 text-xs text-soft-white/90">
          <ShieldCheck className="w-4 h-4 text-bio-mint shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            <strong className="text-bio-mint">SAFETY PROTOCOL: </strong>
            Threshold rule: If strike radius approaches &lt;10 km, immediately lower long-line radio antennae and avoid exposed wet deck rigging.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
