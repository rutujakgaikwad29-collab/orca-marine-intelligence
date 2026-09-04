import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { SlidersHorizontal, AlertTriangle, ShieldCheck, RefreshCw, Brain } from 'lucide-react';

export const WhatIfSafetySimulator = () => {
  const [wind, setWind] = useState(28);
  const [wave, setWave] = useState(2.4);
  const [rain, setRain] = useState(4.2);
  const [lightning, setLightning] = useState(12);
  const [cycloneDist, setCycloneDist] = useState(380);
  const [currentSpeed, setCurrentSpeed] = useState(1.2);

  // Dynamic risk score calculation model
  const waveScore = Math.min(30, (wave / 4.0) * 30);
  const windScore = Math.min(25, (wind / 50) * 25);
  const cycloneScore = cycloneDist < 200 ? ((200 - cycloneDist) / 200) * 25 : 5;
  const lightningScore = Math.min(15, (lightning / 30) * 15);
  const rainScore = Math.min(10, (rain / 25) * 10);
  const currentScore = Math.min(10, (currentSpeed / 2.5) * 10);

  const totalScore = Math.min(100, Math.round(waveScore + windScore + cycloneScore + lightningScore + rainScore + currentScore));

  let riskCategory = 'SAFE';
  let categoryColor = 'text-bio-mint';
  let routeStatus = 'OPTIMAL';
  let orcaAdvisory = 'Conditions are safe for all vessel classes. Normal navigation recommended.';

  if (totalScore >= 75) {
    riskCategory = 'CRITICAL';
    categoryColor = 'text-coral-red';
    routeStatus = 'HARBOUR SNOOZE / SUSPENDED';
    orcaAdvisory = 'Extreme hazard alert! Abort all outer navigation immediately. Head to nearest safe harbour.';
  } else if (totalScore >= 55) {
    riskCategory = 'HIGH';
    categoryColor = 'text-coral-red';
    routeStatus = 'RESTRICTED (INSHORE ONLY)';
    orcaAdvisory = 'High wave swell and gale force winds. Delay departure and utilize sheltered coastal route.';
  } else if (totalScore >= 35) {
    riskCategory = 'MODERATE';
    categoryColor = 'text-solar-amber';
    routeStatus = 'CAUTION ADVISED';
    orcaAdvisory = 'Moderate swell and wind developing in afternoon. Complete operations before 14:00 hrs.';
  }

  const resetValues = () => {
    setWind(28);
    setWave(2.4);
    setRain(4.2);
    setLightning(12);
    setCycloneDist(380);
    setCurrentSpeed(1.2);
  };

  return (
    <Card id="safety-simulator" className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-electric-lavender">
          <SlidersHorizontal className="h-4 w-4" />
          WHAT-IF MARINE SAFETY SIMULATOR
        </CardTitle>
        <button
          onClick={resetValues}
          className="flex items-center gap-1 text-[9px] font-bold text-cool-gray hover:text-soft-white uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-0.5 rounded transition-colors"
        >
          <RefreshCw className="w-2.5 h-2.5" /> Reset Values
        </button>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-5">
        <p className="text-xs text-cool-gray leading-tight">
          Adjust environmental stress parameters below to evaluate how ORCA's real-time risk classification and adaptive routing engine respond.
        </p>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Wave Height */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cool-gray uppercase text-[9px] font-bold tracking-wider">Significant Wave</span>
              <span className={`font-mono font-bold ${wave > 2.5 ? 'text-coral-red' : 'text-soft-white'}`}>
                {wave.toFixed(1)} m
              </span>
            </div>
            <input
              type="range"
              min="0.2"
              max="5.5"
              step="0.1"
              value={wave}
              onChange={(e) => setWave(Number(e.target.value))}
              className="w-full accent-electric-lavender cursor-pointer"
            />
          </div>

          {/* Wind Speed */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cool-gray uppercase text-[9px] font-bold tracking-wider">Wind Speed</span>
              <span className={`font-mono font-bold ${wind > 35 ? 'text-coral-red' : 'text-soft-white'}`}>
                {wind} km/h
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="65"
              value={wind}
              onChange={(e) => setWind(Number(e.target.value))}
              className="w-full accent-bio-mint cursor-pointer"
            />
          </div>

          {/* Cyclone Distance */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cool-gray uppercase text-[9px] font-bold tracking-wider">Cyclone Proximity</span>
              <span className={`font-mono font-bold ${cycloneDist < 200 ? 'text-coral-red' : 'text-soft-white'}`}>
                {cycloneDist} km
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="600"
              step="10"
              value={cycloneDist}
              onChange={(e) => setCycloneDist(Number(e.target.value))}
              className="w-full accent-solar-amber cursor-pointer"
            />
          </div>

          {/* Lightning Strikes */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cool-gray uppercase text-[9px] font-bold tracking-wider">Lightning Strikes</span>
              <span className="font-mono font-bold text-soft-white">{lightning} / 10km</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={lightning}
              onChange={(e) => setLightning(Number(e.target.value))}
              className="w-full accent-bio-mint cursor-pointer"
            />
          </div>

          {/* Precipitation */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cool-gray uppercase text-[9px] font-bold tracking-wider">Rain Rate</span>
              <span className="font-mono font-bold text-soft-white">{rain.toFixed(1)} mm/h</span>
            </div>
            <input
              type="range"
              min="0"
              max="35"
              step="0.5"
              value={rain}
              onChange={(e) => setRain(Number(e.target.value))}
              className="w-full accent-electric-lavender cursor-pointer"
            />
          </div>

          {/* Current Speed */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cool-gray uppercase text-[9px] font-bold tracking-wider">Current Drift</span>
              <span className="font-mono font-bold text-soft-white">{currentSpeed.toFixed(1)} kt</span>
            </div>
            <input
              type="range"
              min="0"
              max="3.0"
              step="0.1"
              value={currentSpeed}
              onChange={(e) => setCurrentSpeed(Number(e.target.value))}
              className="w-full accent-bio-mint cursor-pointer"
            />
          </div>
        </div>

        {/* Dynamic Simulated Output Dashboard */}
        <div className="bg-[#0B0B12] border border-white/10 rounded-xl p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-white/10">
            <div>
              <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest block">
                Simulated Risk Score
              </span>
              <span className={`text-3xl font-bold font-mono ${categoryColor}`}>{totalScore}</span>
              <span className="text-xs text-cool-gray font-mono"> / 100</span>
            </div>

            <div>
              <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest block">
                Risk Classification
              </span>
              <span className={`text-lg font-bold uppercase font-mono ${categoryColor}`}>{riskCategory} RISK</span>
            </div>

            <div className="text-right">
              <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest block">
                Route Clearance Status
              </span>
              <span className="text-xs font-bold text-soft-white font-mono bg-white/5 px-2 py-1 rounded border border-white/10 block mt-0.5">
                {routeStatus}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Brain className="w-4 h-4 text-electric-lavender shrink-0 mt-0.5" />
            <div className="text-xs text-soft-white/90 leading-relaxed">
              <strong className="text-electric-lavender">ADAPTIVE REASONING: </strong>
              {orcaAdvisory}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
