import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { ShieldCheck, MapPin, AlertTriangle } from 'lucide-react';
import { mockRouteData } from '../../data/mockRouteData';

export const RouteRiskBreakdown = () => {
  const { routeRiskFactors } = mockRouteData;

  const spatialWaypoints = [
    { km: '0 km', label: 'Port Outbound', status: 'SAFE', color: 'text-bio-mint', bg: 'bg-bio-mint' },
    { km: '8 km', label: 'Coastal Junction', status: 'MODERATE WIND (28 km/h)', color: 'text-solar-amber', bg: 'bg-solar-amber' },
    { km: '15 km', label: 'Swell Bypass Corridor', status: 'CURRENT ASSIST (+0.7 m/s)', color: 'text-bio-mint', bg: 'bg-bio-mint' },
    { km: '23 km', label: 'PFZ-03 Arrival', status: 'SAFE (89% SUITABILITY)', color: 'text-bio-mint', bg: 'bg-bio-mint' },
  ];

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-bio-mint">
          <ShieldCheck className="h-4 w-4" />
          ROUTE D RISK DECOMPOSITION & TIMELINE
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          TOTAL RISK: 21 / 100
        </span>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-5">
        {/* Spatial Progression Bar along the 23.4 km route */}
        <div>
          <span className="text-[10px] font-bold text-cool-gray uppercase tracking-widest block mb-3">
            Spatial Hazard Timeline Along Voyage Leg
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {spatialWaypoints.map((wp, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-2.5 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-soft-white font-bold">{wp.km}</span>
                  <span className={`w-2 h-2 rounded-full ${wp.bg}`}></span>
                </div>
                <span className="text-[10px] font-bold text-soft-white block truncate">{wp.label}</span>
                <span className={`text-[8px] font-mono font-bold block truncate ${wp.color}`}>{wp.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Factor Breakdown Bars */}
        <div>
          <span className="text-[10px] font-bold text-cool-gray uppercase tracking-widest block mb-2">
            Multi-Hazard Weighted Risk Attribution
          </span>

          <div className="space-y-2">
            {routeRiskFactors.map((rf, i) => {
              const percent = Math.round((rf.score / rf.max) * 100);

              return (
                <div key={i} className="space-y-0.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-cool-gray">{rf.name}</span>
                    <span className="font-mono font-bold text-soft-white">{rf.score}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${percent > 50 ? 'bg-solar-amber' : 'bg-bio-mint'}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
