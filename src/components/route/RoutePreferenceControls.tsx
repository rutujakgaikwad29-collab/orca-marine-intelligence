import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Sliders, ShieldCheck, Zap, Fuel, Sparkles } from 'lucide-react';

interface RoutePreferenceControlsProps {
  safetyWeight: number;
  speedWeight: number;
  fuelWeight: number;
  onSafetyChange: (val: number) => void;
  onSpeedChange: (val: number) => void;
  onFuelChange: (val: number) => void;
}

export const RoutePreferenceControls = ({
  safetyWeight,
  speedWeight,
  fuelWeight,
  onSafetyChange,
  onSpeedChange,
  onFuelChange,
}: RoutePreferenceControlsProps) => {
  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-cool-gray">
          <Sliders className="h-4 w-4 text-electric-lavender" />
          CUSTOM ROUTE OPTIMIZATION PRIORITIES
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          DYNAMIC PARETO WEIGHTING
        </span>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-4">
        <p className="text-xs text-cool-gray leading-tight">
          Adjust the multi-objective utility weights below to calibrate ORCA's route recommendation score toward maximum safety, speed, or fuel conservation.
        </p>

        <div className="space-y-3">
          {/* Safety Weight Slider */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cool-gray uppercase text-[9px] font-bold tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-bio-mint" /> Safety Priority
              </span>
              <span className="font-mono font-bold text-bio-mint">{safetyWeight}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              value={safetyWeight}
              onChange={(e) => onSafetyChange(Number(e.target.value))}
              className="w-full accent-bio-mint cursor-pointer"
            />
          </div>

          {/* Speed Weight Slider */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cool-gray uppercase text-[9px] font-bold tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-solar-amber" /> Speed / ETA Priority
              </span>
              <span className="font-mono font-bold text-solar-amber">{speedWeight}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              value={speedWeight}
              onChange={(e) => onSpeedChange(Number(e.target.value))}
              className="w-full accent-solar-amber cursor-pointer"
            />
          </div>

          {/* Fuel Efficiency Slider */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cool-gray uppercase text-[9px] font-bold tracking-wider flex items-center gap-1.5">
                <Fuel className="w-3.5 h-3.5 text-electric-lavender" /> Fuel Conservation
              </span>
              <span className="font-mono font-bold text-electric-lavender">{fuelWeight}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              value={fuelWeight}
              onChange={(e) => onFuelChange(Number(e.target.value))}
              className="w-full accent-electric-lavender cursor-pointer"
            />
          </div>
        </div>

        <div className="bg-[#0B0B12] border border-white/10 p-2.5 rounded-lg flex items-center justify-between text-[10px] font-mono">
          <span className="text-cool-gray">Utility Weight Balance:</span>
          <span className="text-soft-white font-bold">{safetyWeight}S : {speedWeight}T : {fuelWeight}F</span>
        </div>
      </CardContent>
    </Card>
  );
};
