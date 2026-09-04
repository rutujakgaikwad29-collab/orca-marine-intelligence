import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Database, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { mockRouteData } from '../../data/mockRouteData';

export const RouteDataConfidence = () => {
  const { routeDataConfidence } = mockRouteData;

  const metrics = [
    { label: 'Weather Forecast Feed', score: routeDataConfidence.weather },
    { label: 'Ocean Current & Swell (ROMS)', score: routeDataConfidence.ocean },
    { label: 'Safety Hazard Radar', score: routeDataConfidence.safety },
    { label: 'Geospatial Geofence Limits', score: routeDataConfidence.geospatial },
    { label: 'Vessel Hydrodynamic Model', score: routeDataConfidence.vessel },
  ];

  return (
    <Card className="glass-card border-white/5 relative overflow-hidden">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-bio-mint">
          <Database className="h-4 w-4" />
          ROUTE ENGINE DATA PROVENANCE & RELIABILITY
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          OVERALL: {routeDataConfidence.overall}% TRUST
        </span>
      </CardHeader>

      <CardContent className="p-5 space-y-3">
        <div className="space-y-2.5">
          {metrics.map((m, i) => (
            <div key={i} className="flex items-center gap-3 text-xs">
              <span className="text-cool-gray font-mono w-48 truncate">{m.label}</span>
              <div className="flex-1 bg-black/40 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-bio-mint rounded-full" style={{ width: `${m.score}%` }}></div>
              </div>
              <span className="text-[10px] font-mono font-bold text-soft-white w-8 text-right">{m.score}%</span>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-cool-gray">
          <span>Freshness: {routeDataConfidence.lastUpdate}</span>
          <span className="text-solar-amber font-mono font-bold">{routeDataConfidence.dataFreshness}</span>
        </div>
      </CardContent>
    </Card>
  );
};
