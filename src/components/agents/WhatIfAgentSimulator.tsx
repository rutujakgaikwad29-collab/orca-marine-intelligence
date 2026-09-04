import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { SlidersHorizontal, Brain, AlertTriangle, RefreshCw } from 'lucide-react';

export const WhatIfAgentSimulator = () => {
  const [wind, setWind] = useState(28);
  const [wave, setWave] = useState(2.4);
  const [pfzSuitability, setPfzSuitability] = useState(89);
  const [fuelAvailable, setFuelAvailable] = useState(72);

  // Dynamic reactive agent state derivations
  const weatherState = wind > 35 ? 'WARNING: Gale Force Wind' : 'STABLE';
  const oceanState = wave > 3.0 ? 'CRITICAL SWELL (>3.0m)' : wave > 2.0 ? 'MODERATE SWELL' : 'CALM';
  const safetyRisk = Math.min(100, Math.round(21 + Math.max(0, wind - 25) * 1.8 + Math.max(0, wave - 2.0) * 22));
  const routeChoice = safetyRisk > 55 ? 'Route A (Inshore Sheltered)' : 'Route D (ORCA ⭐)';

  const resetValues = () => {
    setWind(28);
    setWave(2.4);
    setPfzSuitability(89);
    setFuelAvailable(72);
  };

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-electric-lavender">
          <SlidersHorizontal className="h-4 w-4" />
          WHAT-IF MULTI-AGENT PROPAGATION SIMULATOR
        </CardTitle>
        <button
          onClick={resetValues}
          className="flex items-center gap-1 text-[9px] font-bold text-cool-gray hover:text-soft-white uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-0.5 rounded transition-colors"
        >
          <RefreshCw className="w-2.5 h-2.5" /> Reset
        </button>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-5">
        <p className="text-xs text-cool-gray leading-tight">
          Adjust environmental parameters to observe how individual agents alter their status and trigger cascading state updates across the network.
        </p>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cool-gray uppercase text-[9px] font-bold tracking-wider">Wind Force</span>
              <span className={`font-mono font-bold ${wind > 35 ? 'text-coral-red' : 'text-soft-white'}`}>{wind} km/h</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              value={wind}
              onChange={(e) => setWind(Number(e.target.value))}
              className="w-full accent-bio-mint cursor-pointer"
            />
          </div>

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

          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cool-gray uppercase text-[9px] font-bold tracking-wider">PFZ Suitability</span>
              <span className="font-mono font-bold text-bio-mint">{pfzSuitability}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={pfzSuitability}
              onChange={(e) => setPfzSuitability(Number(e.target.value))}
              className="w-full accent-bio-mint cursor-pointer"
            />
          </div>

          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cool-gray uppercase text-[9px] font-bold tracking-wider">Fuel Bunker</span>
              <span className="font-mono font-bold text-solar-amber">{fuelAvailable}%</span>
            </div>
            <input
              type="range"
              min="15"
              max="100"
              value={fuelAvailable}
              onChange={(e) => setFuelAvailable(Number(e.target.value))}
              className="w-full accent-solar-amber cursor-pointer"
            />
          </div>
        </div>

        {/* Dynamic Agent Reactions */}
        <div className="bg-[#0B0B12] border border-white/10 rounded-xl p-4 space-y-2.5 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
            <div className="p-2 rounded bg-white/5 border border-white/5">
              <span className="text-[8px] text-cool-gray block uppercase">Weather Agent</span>
              <span className={`text-[10px] font-bold ${wind > 35 ? 'text-solar-amber' : 'text-soft-white'}`}>{weatherState}</span>
            </div>
            <div className="p-2 rounded bg-white/5 border border-white/5">
              <span className="text-[8px] text-cool-gray block uppercase">Ocean Agent</span>
              <span className={`text-[10px] font-bold ${wave > 2.5 ? 'text-coral-red' : 'text-soft-white'}`}>{oceanState}</span>
            </div>
            <div className="p-2 rounded bg-white/5 border border-white/5">
              <span className="text-[8px] text-cool-gray block uppercase">Safety Agent</span>
              <span className={`text-[10px] font-bold ${safetyRisk > 50 ? 'text-coral-red' : 'text-bio-mint'}`}>{safetyRisk}/100 Risk</span>
            </div>
            <div className="p-2 rounded bg-white/5 border border-white/5">
              <span className="text-[8px] text-cool-gray block uppercase">Decision Agent</span>
              <span className="text-[10px] font-bold text-electric-lavender truncate block">{routeChoice}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
