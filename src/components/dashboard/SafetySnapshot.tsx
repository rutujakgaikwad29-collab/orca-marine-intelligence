import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Wind, Waves, Tornado, Map, ShieldCheck } from 'lucide-react';

export const SafetySnapshot = () => {
  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-cool-gray">
          <ShieldCheck className="h-4 w-4 text-bio-mint" />
          Safety Snapshot
        </CardTitle>
        <span className="text-[10px] font-bold text-electric-lavender uppercase tracking-widest cursor-pointer hover:text-soft-white transition-colors">Open Center</span>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
             <div className="flex items-center gap-2 mb-1">
               <Wind className="w-3.5 h-3.5 text-solar-amber" />
               <p className="text-[9px] font-bold tracking-widest uppercase text-cool-gray">Wind</p>
             </div>
             <p className="text-sm font-bold text-solar-amber mb-0.5">MODERATE</p>
             <p className="text-xs text-soft-white font-mono">14 km/h</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
             <div className="flex items-center gap-2 mb-1">
               <Waves className="w-3.5 h-3.5 text-bio-mint" />
               <p className="text-[9px] font-bold tracking-widest uppercase text-cool-gray">Waves</p>
             </div>
             <p className="text-sm font-bold text-bio-mint mb-0.5">LOW</p>
             <p className="text-xs text-soft-white font-mono">1.1 m</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
             <div className="flex items-center gap-2 mb-1">
               <Tornado className="w-3.5 h-3.5 text-bio-mint" />
               <p className="text-[9px] font-bold tracking-widest uppercase text-cool-gray">Cyclone</p>
             </div>
             <p className="text-sm font-bold text-bio-mint mb-0.5">SAFE</p>
             <p className="text-[10px] text-cool-gray mt-1">No Activity</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
             <div className="flex items-center gap-2 mb-1">
               <Map className="w-3.5 h-3.5 text-bio-mint" />
               <p className="text-[9px] font-bold tracking-widest uppercase text-cool-gray">Boundary</p>
             </div>
             <p className="text-sm font-bold text-bio-mint mb-0.5">CLEAR</p>
             <p className="text-[10px] text-cool-gray mt-1">No Restrictions</p>
          </div>
        </div>

        <div className="mt-2 pt-4 border-t border-white/5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-cool-gray mb-1">Overall Safety Score</p>
            <p className="text-2xl font-bold text-bio-mint flex items-baseline gap-1">
              82 <span className="text-xs text-cool-gray font-normal">/ 100</span>
            </p>
          </div>
          <div className="text-right">
             <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-bio-mint/10 border border-bio-mint/30 rounded-full text-[10px] font-bold text-bio-mint uppercase tracking-widest">
               <span className="w-1.5 h-1.5 rounded-full bg-bio-mint animate-pulse"></span> Safe with Caution
             </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
