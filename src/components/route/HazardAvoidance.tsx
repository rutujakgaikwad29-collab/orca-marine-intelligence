import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { ShieldAlert, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { mockRouteData } from '../../data/mockRouteData';

export const HazardAvoidance = () => {
  const { hazardAvoidanceList } = mockRouteData;

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-bio-mint">
          <ShieldCheck className="h-4 w-4" />
          ACTIVE HAZARD & NO-GO ZONE AVOIDANCE
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          5 / 5 HAZARDS SKIRTED
        </span>
      </CardHeader>

      <CardContent className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div className="space-y-2">
          {hazardAvoidanceList.map((haz, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 p-2.5 rounded-xl flex items-center justify-between text-xs hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-bio-mint shrink-0" />
                <div>
                  <span className="font-bold text-soft-white block">{haz.title}</span>
                  <span className="text-[10px] text-cool-gray">{haz.clearance}</span>
                </div>
              </div>

              <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded bg-black/40 ${haz.color} border border-bio-mint/30`}>
                {haz.status}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-cool-gray leading-tight italic pt-2 border-t border-white/5">
          * Dynamic Rerouting Engine: ORCA constantly recalculates safety polygons every 60 seconds against real-time satellite radar feeds.
        </p>
      </CardContent>
    </Card>
  );
};
