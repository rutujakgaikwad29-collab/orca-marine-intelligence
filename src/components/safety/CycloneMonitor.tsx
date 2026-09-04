import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Disc, ShieldCheck, Navigation, Gauge, Wind, AlertCircle } from 'lucide-react';
import { mockSafetyData } from '../../data/mockSafetyData';

export const CycloneMonitor = () => {
  const { cycloneDetails } = mockSafetyData;

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-coral-red">
          <Disc className="h-4 w-4 animate-spin text-coral-red" />
          CYCLONE & TROPICAL STORM RADAR
        </CardTitle>
        <span className="text-[10px] font-bold text-solar-amber font-mono bg-solar-amber/10 border border-solar-amber/30 px-2 py-0.5 rounded">
          {cycloneDetails.category}
        </span>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-5">
        {/* System Name and Primary Coordinates */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest block">Active Tropical Disturbance</span>
            <h3 className="text-lg font-bold text-soft-white font-mono mt-0.5">{cycloneDetails.name}</h3>
            <p className="text-xs text-bio-mint font-bold mt-0.5">Distance from Vessel: {cycloneDetails.vesselDistance}</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl text-right">
            <span className="text-[9px] text-cool-gray uppercase block">Closest Approach</span>
            <span className="text-xs font-mono font-bold text-soft-white">{cycloneDetails.nearestApproachETA}</span>
          </div>
        </div>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
            <span className="text-[9px] text-cool-gray block uppercase">Center Wind</span>
            <span className="font-mono font-bold text-coral-red">{cycloneDetails.windSpeed}</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
            <span className="text-[9px] text-cool-gray block uppercase">Central Pressure</span>
            <span className="font-mono font-bold text-soft-white">{cycloneDetails.pressure}</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
            <span className="text-[9px] text-cool-gray block uppercase">Vortex Motion</span>
            <span className="font-mono font-bold text-solar-amber">{cycloneDetails.movement}</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
            <span className="text-[9px] text-cool-gray block uppercase">Gale Radius</span>
            <span className="font-mono font-bold text-bio-mint">{cycloneDetails.radiusOfMaxWind}</span>
          </div>
        </div>

        {/* Forecast Cone Track Sequence */}
        <div>
          <span className="text-[10px] font-bold text-cool-gray uppercase tracking-widest block mb-2">
            Multi-Model Forecast Track & Uncertainty Cone
          </span>
          <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
            {cycloneDetails.coneOfUncertainty.map((cone, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-2 rounded-lg">
                <span className="font-mono text-cool-gray block text-[9px]">{cone.step}</span>
                <span className="font-bold text-soft-white block mt-0.5">{cone.lat}°N, {cone.lng}°E</span>
                <span className="text-[8px] text-electric-lavender font-mono">Cone: &plusmn;{cone.radius}km</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-bio-mint/10 border border-bio-mint/30 rounded-xl p-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-bio-mint shrink-0" />
            <span className="text-soft-white font-medium">
              Vessel position is outside the primary 48-hour danger cone.
            </span>
          </div>
          <span className="text-[9px] font-mono text-bio-mint font-bold uppercase hidden sm:block">NO HARBOUR CLOSURE</span>
        </div>
      </CardContent>
    </Card>
  );
};
