import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Fuel, TrendingDown, Gauge, Sparkles, CheckCircle2 } from 'lucide-react';
import { mockRouteData } from '../../data/mockRouteData';

export const FuelIntelligence = () => {
  const { fuelCalculations } = mockRouteData;

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-bio-mint">
          <Fuel className="h-4 w-4" />
          HYDRODYNAMIC FUEL CONSUMPTION MODEL
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          {fuelCalculations.efficiencyScore}
        </span>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-5">
        {/* Top Numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
            <span className="text-[8px] text-cool-gray block uppercase">Base Fuel Needed</span>
            <span className="font-mono font-bold text-soft-white text-base">{fuelCalculations.baseFuelNeeded} L</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
            <span className="text-[8px] text-cool-gray block uppercase">Current Assist</span>
            <span className="font-mono font-bold text-bio-mint text-base">{fuelCalculations.currentBenefit} L</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
            <span className="text-[8px] text-cool-gray block uppercase">Wave Drag</span>
            <span className="font-mono font-bold text-solar-amber text-base">+{fuelCalculations.waveDragImpact} L</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
            <span className="text-[8px] text-cool-gray block uppercase">Final Estimate</span>
            <span className="font-mono font-bold text-bio-mint text-base">{fuelCalculations.finalEstimatedFuel} L</span>
          </div>
        </div>

        {/* Fuel Gauge & Reserve Level */}
        <div className="bg-[#0B0B12] border border-white/10 rounded-xl p-3.5 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-cool-gray">Bunker Fuel Remaining at Destination:</span>
            <span className="font-mono font-bold text-soft-white">{fuelCalculations.remainingReservePercent}% Reserve</span>
          </div>

          <div className="h-3 w-full bg-black/50 rounded-full overflow-hidden flex p-0.5 border border-white/10">
            <div
              className="h-full bg-bio-mint rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(62,240,181,0.6)]"
              style={{ width: `${fuelCalculations.remainingReservePercent}%` }}
            />
          </div>

          <div className="flex justify-between text-[8px] font-mono text-cool-gray pt-1">
            <span>0% (Empty)</span>
            <span className="text-solar-amber">Safe Reserve Minimum: 25%</span>
            <span>100% (Full Tank)</span>
          </div>
        </div>

        <p className="text-[10px] text-cool-gray leading-tight italic">
          * Engine physics equation: Fuel rate = Base RPM + Displacement Drag &times; Swell Superposition &minus; Vector Current Thrust.
        </p>
      </CardContent>
    </Card>
  );
};
