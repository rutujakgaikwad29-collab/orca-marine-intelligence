import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { ShieldCheck, Zap, Fuel, Star, ArrowRight, Check } from 'lucide-react';
import { mockRouteData } from '../../data/mockRouteData';
import type { RouteOption } from '../../data/mockRouteData';

interface RouteComparisonProps {
  selectedRouteId: string;
  onSelectRoute: (routeId: string) => void;
}

export const RouteComparison = ({ selectedRouteId, onSelectRoute }: RouteComparisonProps) => {
  const { routes } = mockRouteData;

  const getIcon = (key: string) => {
    switch (key) {
      case 'safest': return ShieldCheck;
      case 'fastest': return Zap;
      case 'fuel': return Fuel;
      case 'recommended':
      default:
        return Star;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-cool-gray tracking-widest uppercase flex items-center gap-2">
          <Star className="w-3.5 h-3.5 text-solar-amber" /> COMPARE CANDIDATE NAVIGATION PATHWAYS
        </h2>
        <span className="text-[10px] font-mono text-cool-gray">Multi-Objective Tradeoff Matrix</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {routes.map((r) => {
          const isSelected = selectedRouteId === r.id;
          const isRecommended = r.key === 'recommended';
          const Icon = getIcon(r.key);

          return (
            <Card
              key={r.id}
              onClick={() => onSelectRoute(r.id)}
              className={`p-4 flex flex-col justify-between transition-all cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? 'glass-card border-2 shadow-[0_0_25px_rgba(62,240,181,0.15)] bg-white/5'
                  : 'glass-card border-white/5 hover:border-white/20'
              }`}
              style={{ borderColor: isSelected ? r.strokeColor : undefined }}
            >
              {/* Highlight ribbon for recommended */}
              {isRecommended && (
                <div className="absolute -top-1 -right-1">
                  <span className="bg-bio-mint text-black font-bold text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-mono shadow-sm">
                    TOP MATCH (96/100)
                  </span>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center border"
                      style={{
                        backgroundColor: `${r.strokeColor}15`,
                        borderColor: `${r.strokeColor}40`,
                        color: r.strokeColor,
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-soft-white">{r.name.split('—')[1] || r.name}</h4>
                      <span className="text-[8px] font-mono text-cool-gray uppercase block">{r.tag}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                  <div className="bg-[#0B0B12] p-2 rounded-lg border border-white/5">
                    <span className="text-[8px] text-cool-gray uppercase block">Distance</span>
                    <span className="font-mono font-bold text-soft-white">{r.distanceKm} km</span>
                  </div>
                  <div className="bg-[#0B0B12] p-2 rounded-lg border border-white/5">
                    <span className="text-[8px] text-cool-gray uppercase block">Est. Time</span>
                    <span className="font-mono font-bold text-soft-white">{r.etaFormatted}</span>
                  </div>
                  <div className="bg-[#0B0B12] p-2 rounded-lg border border-white/5">
                    <span className="text-[8px] text-cool-gray uppercase block">Fuel Burn</span>
                    <span className="font-mono font-bold text-bio-mint">{r.fuelLiters} L</span>
                  </div>
                  <div className="bg-[#0B0B12] p-2 rounded-lg border border-white/5">
                    <span className="text-[8px] text-cool-gray uppercase block">Risk Score</span>
                    <span
                      className={`font-mono font-bold ${
                        r.riskScore > 40 ? 'text-solar-amber' : 'text-bio-mint'
                      }`}
                    >
                      {r.riskScore}/100
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-cool-gray leading-tight pt-1">
                  {r.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs mt-3">
                <span className="text-[10px] font-mono font-bold text-electric-lavender">
                  Score: {r.orcaScore}/100
                </span>
                <span
                  className={`text-[10px] font-bold uppercase flex items-center gap-1 ${
                    isSelected ? 'text-bio-mint' : 'text-cool-gray group-hover:text-soft-white'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3 h-3" /> Selected
                    </>
                  ) : (
                    <>
                      Inspect <ArrowRight className="w-2.5 h-2.5" />
                    </>
                  )}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
