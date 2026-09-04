import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { SlidersHorizontal, AlertTriangle, ShieldCheck, RefreshCw, Sparkles, Brain } from 'lucide-react';

export const WeatherSimulator = () => {
  const [wind, setWind] = useState(14);
  const [wave, setWave] = useState(1.2);
  const [rain, setRain] = useState(12);
  const [visibility, setVisibility] = useState(8.2);
  const [current, setCurrent] = useState(0.7);
  const [cycloneDist, setCycloneDist] = useState(450);

  // Real-time calculation based on simulated environmental variables
  const windPenalty = Math.max(0, wind - 18) * 2.2;
  const wavePenalty = Math.max(0, wave - 1.4) * 16;
  const rainPenalty = Math.max(0, rain - 30) * 0.4;
  const cyclonePenalty = cycloneDist < 200 ? (200 - cycloneDist) * 0.35 : 0;
  const visPenalty = visibility < 4 ? (4 - visibility) * 6 : 0;

  const totalDeduction = windPenalty + wavePenalty + rainPenalty + cyclonePenalty + visPenalty;
  const calculatedSuitability = Math.max(10, Math.min(95, Math.round(89 - totalDeduction)));

  let marineRisk = 'LOW';
  let riskColor = 'text-bio-mint';
  let recommendedZone = 'PFZ-03 (Nearshore Shelf)';
  let recommendationNote = 'Conditions optimal. Proceed with standard departure at 06:00 AM.';

  if (wind > 32 || wave > 2.2 || cycloneDist < 160) {
    marineRisk = 'HIGH';
    riskColor = 'text-coral-red';
    recommendedZone = 'PFZ-02 (Inshore Protected Zone)';
    recommendationNote = 'Severe marine turbulence detected. ORCA recommends aborting outer shelf transit and utilizing sheltered PFZ-02 or returning to port before 12:00 PM.';
  } else if (wind > 20 || wave > 1.6 || rain > 40 || cycloneDist < 280) {
    marineRisk = 'MODERATE';
    riskColor = 'text-solar-amber';
    recommendedZone = 'PFZ-03 (Shift window to early morning)';
    recommendationNote = 'Moderate chop developing. Conclude fishing operations prior to 01:30 PM.';
  }

  const resetValues = () => {
    setWind(14);
    setWave(1.2);
    setRain(12);
    setVisibility(8.2);
    setCurrent(0.7);
    setCycloneDist(450);
  };

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-electric-lavender">
          <SlidersHorizontal className="h-4 w-4" />
          WHAT-IF OCEAN & WEATHER SIMULATOR
        </CardTitle>
        <button
          onClick={resetValues}
          className="flex items-center gap-1 text-[9px] font-bold text-cool-gray hover:text-soft-white uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-0.5 rounded transition-colors"
        >
          <RefreshCw className="w-2.5 h-2.5" /> Reset Defaults
        </button>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-5">
        <p className="text-xs text-cool-gray leading-tight">
          Simulate rapid weather deterioration and observe how ORCA recalculates fishing suitability, risk thresholds, and active navigation guidance in real time.
        </p>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Wind Slider */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cool-gray uppercase text-[9px] font-bold tracking-wider">Wind Speed</span>
              <span className={`font-mono font-bold ${wind > 25 ? 'text-solar-amber' : 'text-soft-white'}`}>{wind} km/h</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              value={wind}
              onChange={(e) => setWind(Number(e.target.value))}
              className="w-full accent-bio-mint cursor-pointer"
            />
          </div>

          {/* Wave Height Slider */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cool-gray uppercase text-[9px] font-bold tracking-wider">Wave Height</span>
              <span className={`font-mono font-bold ${wave > 1.8 ? 'text-coral-red' : 'text-soft-white'}`}>{wave.toFixed(1)} m</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="5.0"
              step="0.1"
              value={wave}
              onChange={(e) => setWave(Number(e.target.value))}
              className="w-full accent-electric-lavender cursor-pointer"
            />
          </div>

          {/* Rain Probability Slider */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cool-gray uppercase text-[9px] font-bold tracking-wider">Precipitation Chance</span>
              <span className="font-mono font-bold text-soft-white">{rain}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={rain}
              onChange={(e) => setRain(Number(e.target.value))}
              className="w-full accent-bio-mint cursor-pointer"
            />
          </div>

          {/* Cyclone Proximity Slider */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cool-gray uppercase text-[9px] font-bold tracking-wider">Storm Center Distance</span>
              <span className={`font-mono font-bold ${cycloneDist < 250 ? 'text-coral-red' : 'text-soft-white'}`}>{cycloneDist} km</span>
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
        </div>

        {/* Real-time Recalculated Output Box */}
        <div className="bg-[#0B0B12] border border-white/10 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div>
              <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest block">Recalculated Suitability</span>
              <span className={`text-2xl font-bold font-mono ${calculatedSuitability < 60 ? 'text-coral-red' : 'text-bio-mint'}`}>
                {calculatedSuitability}%
              </span>
            </div>

            <div>
              <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest block">Simulated Marine Risk</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <AlertTriangle className={`w-4 h-4 ${riskColor}`} />
                <span className={`text-lg font-bold font-mono ${riskColor}`}>{marineRisk}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest block">Recommended Zone</span>
              <span className="text-xs font-bold text-soft-white">{recommendedZone}</span>
            </div>
          </div>

          {/* ORCA Adaptive Intelligence Response */}
          <div className="flex items-start gap-2.5 pt-1">
            <Brain className="w-4 h-4 text-electric-lavender shrink-0 mt-0.5" />
            <div className="text-xs text-soft-white/90 leading-relaxed">
              <span className="font-bold text-electric-lavender">ORCA ADAPTIVE REASONING: </span>
              {recommendationNote}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
