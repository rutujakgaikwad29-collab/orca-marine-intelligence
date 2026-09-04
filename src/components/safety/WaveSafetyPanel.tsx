import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Waves, AlertTriangle, Ship, Info } from 'lucide-react';
import type { VesselTypeProfile } from '../../data/mockSafetyData';

interface WaveSafetyPanelProps {
  selectedVessel: VesselTypeProfile;
}

export const WaveSafetyPanel = ({ selectedVessel }: WaveSafetyPanelProps) => {
  const waveHeight = 2.4; // Current observed wave height

  // Dynamic impact calculation based on current vessel tolerance
  const getImpact = (vessel: VesselTypeProfile) => {
    const ratio = waveHeight / vessel.maxWaveTolerance;
    if (ratio > 1.2) return { level: 'CRITICAL HAZARD', color: 'text-coral-red bg-coral-red/10 border-coral-red/30' };
    if (ratio > 0.9) return { level: 'MODERATE / CAUTION', color: 'text-solar-amber bg-solar-amber/10 border-solar-amber/30' };
    return { level: 'LOW / SAFE', color: 'text-bio-mint bg-bio-mint/10 border-bio-mint/30' };
  };

  const impact = getImpact(selectedVessel);

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-electric-lavender">
          <Waves className="h-4 w-4" />
          WAVE HYDRODYNAMICS & VESSEL SEAKEEPING
        </CardTitle>
        <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded border ${impact.color}`}>
          {impact.level}
        </span>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-5">
        {/* Core Parameters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
            <span className="text-[9px] text-cool-gray block uppercase">Signif. Wave (Hs)</span>
            <span className="font-mono font-bold text-soft-white text-lg">2.4 m</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
            <span className="text-[9px] text-cool-gray block uppercase">Peak Period (Tp)</span>
            <span className="font-mono font-bold text-soft-white text-lg">8.4 s</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
            <span className="text-[9px] text-cool-gray block uppercase">Primary Swell</span>
            <span className="font-mono font-bold text-electric-lavender text-lg">2.1 m</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
            <span className="text-[9px] text-cool-gray block uppercase">Swell Angle</span>
            <span className="font-mono font-bold text-bio-mint text-lg">SW (220°)</span>
          </div>
        </div>

        {/* Dynamic Wave-Risk Scale Meter */}
        <div>
          <div className="flex justify-between items-center text-[10px] text-cool-gray font-mono mb-2">
            <span>Wave Hazard Scale</span>
            <span className="text-solar-amber font-bold">Observed: 2.4m (Caution Zone)</span>
          </div>

          <div className="h-4 w-full bg-black/40 rounded-full overflow-hidden flex p-0.5 border border-white/10 relative">
            <div className="flex-1 bg-bio-mint/60 rounded-l-full" title="0-1m Safe"></div>
            <div className="flex-1 bg-bio-mint/90" title="1-2m Normal"></div>
            <div className="flex-1 bg-solar-amber shadow-[0_0_10px_rgba(255,181,71,0.8)]" title="2-3m Caution"></div>
            <div className="flex-1 bg-coral-red/70" title="3-5m Dangerous"></div>
            <div className="flex-1 bg-coral-red rounded-r-full" title=">5m Extreme"></div>

            {/* Indicator Marker at 2.4m */}
            <div
              className="absolute top-0 bottom-0 w-1.5 bg-soft-white shadow-[0_0_6px_white] -translate-x-1/2 rounded"
              style={{ left: '52%' }}
            ></div>
          </div>

          <div className="flex justify-between text-[8px] font-mono text-cool-gray mt-1 px-1">
            <span>0m (Safe)</span>
            <span>1m</span>
            <span>2m</span>
            <span>3m</span>
            <span>5m+ (Extreme)</span>
          </div>
        </div>

        {/* Dynamic Vessel Seakeeping Impact */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-soft-white flex items-center gap-1.5">
              <Ship className="w-3.5 h-3.5 text-bio-mint" /> Selected Vessel Profile: {selectedVessel.name}
            </span>
            <span className="text-[10px] font-mono text-cool-gray">Max Tolerance: {selectedVessel.maxWaveTolerance}m</span>
          </div>

          <p className="text-xs text-cool-gray leading-tight">
            Current wave height of 2.4m represents <strong className="text-solar-amber">{Math.round((2.4 / selectedVessel.maxWaveTolerance) * 100)}%</strong> of this vessel's operational stability threshold. Moderate beam-sea roll expected.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
