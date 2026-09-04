import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { SlidersHorizontal, Brain, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';

export const WhatIfRouteSimulator = () => {
  const [wind, setWind] = useState(28);
  const [wave, setWave] = useState(2.4);
  const [current, setCurrent] = useState(0.7);
  const [vesselSpeed, setVesselSpeed] = useState(18);

  // Dynamic simulation equations
  const calculatedRisk = Math.min(100, Math.round(21 + Math.max(0, wind - 25) * 1.8 + Math.max(0, wave - 2.0) * 22));
  const calculatedFuel = (7.8 + Math.max(0, wave - 2.0) * 1.5 - (current - 0.7) * 0.8).toFixed(1);
  const calculatedEtaMinutes = Math.round((23.4 / vesselSpeed) * 60 + (wave > 2.0 ? 12 : 0));

  let recommendedRoute = 'Route D — ORCA Recommended ⭐';
  let advice = 'Conditions remain balanced. Route D is the Pareto-optimal path.';
  let badgeColor = 'text-bio-mint border-bio-mint/40 bg-bio-mint/10';

  if (calculatedRisk >= 60 || wave > 3.0) {
    recommendedRoute = 'Route A — Safest Inshore Passage 🛡️';
    advice = 'Severe outer sea turbulence detected. ORCA switches recommendation from Route D to sheltered Inshore Route A.';
    badgeColor = 'text-coral-red border-coral-red/40 bg-coral-red/10';
  } else if (wind > 35) {
    recommendedRoute = 'Route A — Safest Passage 🛡️';
    advice = 'Strong gale crosswinds on shelf corridor. Diverting to sheltered inshore contour.';
    badgeColor = 'text-solar-amber border-solar-amber/40 bg-solar-amber/10';
  }

  const resetValues = () => {
    setWind(28);
    setWave(2.4);
    setCurrent(0.7);
    setVesselSpeed(18);
  };

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-electric-lavender">
          <SlidersHorizontal className="h-4 w-4" />
          WHAT-IF DYNAMIC ROUTE RECALCULATION SIMULATOR
        </CardTitle>
        <button
          onClick={resetValues}
          className="flex items-center gap-1 text-[9px] font-bold text-cool-gray hover:text-soft-white uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-0.5 rounded transition-colors"
        >
          <RefreshCw className="w-2.5 h-2.5" /> Reset Variables
        </button>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-5">
        <p className="text-xs text-cool-gray leading-tight">
          Simulate changing sea state variables below to watch ORCA dynamically shift its recommended candidate route, fuel burn, and arrival ETA in real time.
        </p>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Wind Slider */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cool-gray uppercase text-[9px] font-bold tracking-wider">Wind Speed</span>
              <span className={`font-mono font-bold ${wind > 35 ? 'text-coral-red' : 'text-soft-white'}`}>{wind} km/h</span>
            </div>
            <input
              type="range"
              min="10"
              max="65"
              value={wind}
              onChange={(e) => setWind(Number(e.target.value))}
              className="w-full accent-bio-mint cursor-pointer"
            />
          </div>

          {/* Wave Slider */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cool-gray uppercase text-[9px] font-bold tracking-wider">Wave Swell</span>
              <span className={`font-mono font-bold ${wave > 2.5 ? 'text-coral-red' : 'text-soft-white'}`}>{wave.toFixed(1)} m</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5.0"
              step="0.1"
              value={wave}
              onChange={(e) => setWave(Number(e.target.value))}
              className="w-full accent-electric-lavender cursor-pointer"
            />
          </div>

          {/* Current Assist Slider */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cool-gray uppercase text-[9px] font-bold tracking-wider">Current Jet Assist</span>
              <span className="font-mono font-bold text-bio-mint">{current.toFixed(1)} m/s</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="2.5"
              step="0.1"
              value={current}
              onChange={(e) => setCurrent(Number(e.target.value))}
              className="w-full accent-bio-mint cursor-pointer"
            />
          </div>

          {/* Vessel Speed Slider */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cool-gray uppercase text-[9px] font-bold tracking-wider">Cruising Speed</span>
              <span className="font-mono font-bold text-solar-amber">{vesselSpeed} km/h</span>
            </div>
            <input
              type="range"
              min="10"
              max="30"
              value={vesselSpeed}
              onChange={(e) => setVesselSpeed(Number(e.target.value))}
              className="w-full accent-solar-amber cursor-pointer"
            />
          </div>
        </div>

        {/* Dynamic Simulated Output Bar */}
        <div className="bg-[#0B0B12] border border-white/10 rounded-xl p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-white/10 text-xs">
            <div>
              <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest block">
                Active Recommended Pathway
              </span>
              <span className={`text-sm font-bold font-mono px-2 py-0.5 rounded border inline-block mt-0.5 ${badgeColor}`}>
                {recommendedRoute}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div>
                <span className="text-[8px] text-cool-gray block uppercase">Dynamic Risk</span>
                <span className={`text-lg font-bold ${calculatedRisk > 50 ? 'text-coral-red' : 'text-bio-mint'}`}>
                  {calculatedRisk}/100
                </span>
              </div>
              <div>
                <span className="text-[8px] text-cool-gray block uppercase">Estimated Fuel</span>
                <span className="text-lg font-bold text-soft-white">{calculatedFuel} L</span>
              </div>
              <div>
                <span className="text-[8px] text-cool-gray block uppercase">Transit Time</span>
                <span className="text-lg font-bold text-electric-lavender">{calculatedEtaMinutes} min</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Brain className="w-4 h-4 text-electric-lavender shrink-0 mt-0.5" />
            <div className="text-xs text-soft-white/90 leading-relaxed">
              <strong className="text-electric-lavender">ADAPTIVE REPLANNING ADVICE: </strong>
              {advice}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
