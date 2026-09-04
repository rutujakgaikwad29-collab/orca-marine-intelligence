import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Compass, Sparkles, Check, ShieldCheck, Zap, Fuel, Fish } from 'lucide-react';
import { routeStrategies } from '../../data/mockSettingsData';
import type { RouteStrategy } from '../../data/mockSettingsData';

interface RoutePreferenceSelectorProps {
  selectedStrategy: RouteStrategy;
  onSelectStrategy: (strat: RouteStrategy) => void;
}

export const RoutePreferenceSelector = ({
  selectedStrategy,
  onSelectStrategy,
}: RoutePreferenceSelectorProps) => {
  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-bio-mint">
          <Compass className="h-4 w-4" />
          DEFAULT ROUTE OPTIMIZATION STRATEGY
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          PARETO SOLVER
        </span>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-3">
        <p className="text-xs text-cool-gray leading-tight">
          Choose the default navigation objective ORCA will prioritize when synthesizing marine candidate routes.
        </p>

        <div className="space-y-2.5">
          {routeStrategies.map((strat) => {
            const isSelected = selectedStrategy === strat.id;

            return (
              <div
                key={strat.id}
                onClick={() => onSelectStrategy(strat.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-bio-mint/15 border-bio-mint/60 text-soft-white shadow-[0_0_15px_rgba(62,240,181,0.2)]'
                    : 'bg-white/5 border-white/10 text-cool-gray hover:text-soft-white hover:bg-white/10'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-soft-white">{strat.title}</h4>
                    <span className={`text-[8px] font-mono font-bold px-1.5 py-0.2 rounded border ${strat.color}`}>
                      {strat.badge}
                    </span>
                  </div>
                  <p className="text-[10px] text-cool-gray leading-tight">{strat.desc}</p>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? 'bg-bio-mint border-bio-mint text-black shadow-[0_0_8px_rgba(62,240,181,0.5)]'
                      : 'bg-transparent border-white/20'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-bio-mint/10 border border-bio-mint/30 rounded-xl p-3 flex items-center gap-2 text-xs text-soft-white">
          <Sparkles className="w-4 h-4 text-bio-mint shrink-0" />
          <p className="text-[11px] leading-relaxed">
            <strong className="text-bio-mint">ORCA SMART MODE: </strong>
            Dynamically shifts weights in real-time. If weather worsens, Safety increases to 80%; in calm seas, Catch & Fuel conservation dominate.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
