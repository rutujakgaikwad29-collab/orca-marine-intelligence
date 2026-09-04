import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Waves, ArrowDownRight, Compass, Sparkles } from 'lucide-react';

export const CurrentAssistance = () => {
  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-bio-mint">
          <Waves className="h-4 w-4" />
          CURRENT-AWARE HYDRODYNAMIC DRIFT
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          +0.7 M/S JET ASSIST
        </span>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest block">
              Surface Jet Vector
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold font-mono text-soft-white">0.7 m/s</span>
              <span className="text-xs text-bio-mint font-bold uppercase">(1.36 kt SW)</span>
            </div>
            <p className="text-xs text-cool-gray mt-1">
              Alignment: <strong className="text-bio-mint">FAVORABLE (8 km Tail-Drift)</strong>
            </p>
          </div>

          {/* Visual Vector Flow representation */}
          <div className="w-36 h-20 bg-black/40 border border-white/10 rounded-xl relative overflow-hidden flex items-center justify-center p-2">
            <div className="flex items-center gap-1.5 text-bio-mint">
              <span className="text-xs font-mono font-bold animate-pulse">FLOW →→→</span>
              <ArrowDownRight className="w-5 h-5 text-bio-mint animate-bounce" />
            </div>
            <span className="absolute bottom-1 text-[8px] font-mono text-cool-gray">
              West Coast Current Jet
            </span>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl text-xs space-y-1">
          <span className="font-bold text-soft-white flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-bio-mint" /> Net Operational Yield:
          </span>
          <p className="text-cool-gray leading-relaxed">
            By aligning waypoint Leg 2 directly with the shelf counter-current, ORCA reduces engine strain, shaving <strong className="text-bio-mint">11 minutes</strong> off transit time and delivering <strong className="text-bio-mint">0.8 Liters</strong> in fuel conservation.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
