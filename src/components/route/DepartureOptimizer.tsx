import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Clock, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { mockRouteData } from '../../data/mockRouteData';

export const DepartureOptimizer = () => {
  const { departureTimeComparison } = mockRouteData;

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-solar-amber">
          <Clock className="h-4 w-4" />
          OPTIMAL DEPARTURE WINDOW CALCULATOR
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          RECOMMENDATION: DEPART NOW
        </span>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-4">
        <p className="text-xs text-cool-gray leading-tight">
          Comparing temporal weather progression over the next 6 hours to identify the safest and most fuel-efficient departure slot.
        </p>

        <div className="space-y-2">
          {departureTimeComparison.map((slot, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs transition-all ${
                i === 0
                  ? 'bg-bio-mint/10 border-bio-mint/40 text-soft-white shadow-[0_0_15px_rgba(62,240,181,0.15)]'
                  : 'bg-white/5 border-white/10 text-cool-gray'
              }`}
            >
              <div className="space-y-0.5">
                <span className="font-bold text-soft-white block font-mono">{slot.window}</span>
                <span className={`text-[10px] font-bold uppercase ${i === 0 ? 'text-bio-mint' : 'text-cool-gray'}`}>
                  {slot.status}
                </span>
              </div>

              <div className="flex items-center gap-4 text-[10px] font-mono">
                <span>Wave: <strong className="text-soft-white">{slot.wave}</strong></span>
                <span>Fuel: <strong className="text-bio-mint">{slot.fuel}</strong></span>
                <span>Risk: <strong className={slot.risk > 40 ? 'text-solar-amber' : 'text-bio-mint'}>{slot.risk}/100</strong></span>
                <span className="text-electric-lavender font-bold">Score: {slot.score}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-solar-amber/10 border border-solar-amber/30 rounded-xl p-3 flex items-start gap-2.5 text-xs text-soft-white">
          <AlertTriangle className="w-4 h-4 text-solar-amber shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            <strong className="text-solar-amber">AFTERNOON ADVISORY: </strong>
            Wind and wave conditions cross operational thresholds past 14:00 hrs. Departing before 11:00 AM avoids a 35% increase in transit fuel and hull fatigue.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
