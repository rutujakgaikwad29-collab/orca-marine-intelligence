import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Compass, Navigation, Fuel, Fish, ArrowDownRight } from 'lucide-react';
import { mockWeatherData } from '../../data/mockWeatherData';

export const OceanCurrent = () => {
  const { currentDetails } = mockWeatherData;

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-bio-mint">
          <Navigation className="h-4 w-4" />
          OCEAN CURRENT DYNAMICS
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          {currentDetails.stability}
        </span>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-5">
        {/* Metric & Animated Flow Field */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold text-cool-gray uppercase tracking-widest mb-1">Surface Current Drift</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-soft-white font-mono">{currentDetails.speed}</span>
              <span className="text-xs text-cool-gray font-mono">m/s (1.36 kt)</span>
            </div>
            <p className="text-xs font-bold text-bio-mint font-mono mt-1 flex items-center gap-1">
              <ArrowDownRight className="w-3.5 h-3.5" /> {currentDetails.direction}
            </p>
          </div>

          {/* Animated visual flow simulation box */}
          <div className="w-36 h-20 bg-black/40 border border-white/10 rounded-xl relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-40">
              <svg width="100%" height="100%">
                <pattern id="flowLines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 0 20 Q 10 10 20 20 T 40 20" fill="none" stroke="#3EF0B5" strokeWidth="1.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#flowLines)" />
              </svg>
            </div>
            <div className="relative z-10 text-[9px] font-mono text-soft-white uppercase text-center">
              West Coast Drift
              <span className="block text-[8px] text-bio-mint font-bold animate-pulse">Flow Active →</span>
            </div>
          </div>
        </div>

        {/* Current Impact Analysis */}
        <div className="border-t border-white/5 pt-3 space-y-2.5">
          <p className="text-[10px] font-bold text-cool-gray uppercase tracking-widest">Operational Current Impact</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg flex flex-col justify-between">
              <span className="text-[9px] font-bold text-cool-gray uppercase tracking-wider flex items-center gap-1">
                <Fish className="w-3 h-3 text-solar-amber" /> Fisheries
              </span>
              <span className="text-[10px] font-bold text-bio-mint mt-1">Positive</span>
              <span className="text-[9px] text-cool-gray leading-tight mt-0.5">High nutrient retention</span>
            </div>

            <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg flex flex-col justify-between">
              <span className="text-[9px] font-bold text-cool-gray uppercase tracking-wider flex items-center gap-1">
                <Navigation className="w-3 h-3 text-electric-lavender" /> Navigation
              </span>
              <span className="text-[10px] font-bold text-solar-amber mt-1">Moderate</span>
              <span className="text-[9px] text-cool-gray leading-tight mt-0.5">1.2 kt counter-drift</span>
            </div>

            <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg flex flex-col justify-between">
              <span className="text-[9px] font-bold text-cool-gray uppercase tracking-wider flex items-center gap-1">
                <Fuel className="w-3 h-3 text-bio-mint" /> Fuel Econ
              </span>
              <span className="text-[10px] font-bold text-bio-mint mt-1">Favorable</span>
              <span className="text-[9px] text-cool-gray leading-tight mt-0.5">Outbound tail-current</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
