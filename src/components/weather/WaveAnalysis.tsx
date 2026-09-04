import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Waves, Timer, Compass, Zap } from 'lucide-react';
import { mockWeatherData } from '../../data/mockWeatherData';

export const WaveAnalysis = () => {
  const { waveDetails } = mockWeatherData;

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-electric-lavender">
          <Waves className="h-4 w-4" />
          WAVE CONDITIONS & SWELL
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          {waveDetails.energy}
        </span>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-5">
        {/* Metric Overview */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-[9px] font-bold text-cool-gray uppercase tracking-wider block">Significant Height</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold font-mono text-soft-white">{waveDetails.height}</span>
              <span className="text-xs text-electric-lavender font-mono">m</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-[9px] font-bold text-cool-gray uppercase tracking-wider block">Dominant Period</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold font-mono text-soft-white">{waveDetails.period}</span>
              <span className="text-xs text-cool-gray font-mono">sec</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-[9px] font-bold text-cool-gray uppercase tracking-wider block">Swell Direction</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-bold font-mono text-bio-mint">{waveDetails.direction}</span>
            </div>
          </div>
        </div>

        {/* Animated Wave SVG Simulation */}
        <div className="relative h-20 w-full bg-black/40 border border-white/10 rounded-xl overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-40">
            <svg className="w-[200%] h-full animate-[driftClouds_10s_linear_infinite]" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path
                d="M 0,60 C 150,90 350,30 500,60 C 650,90 850,30 1000,60 C 1150,90 1350,30 1500,60 L 1500,120 L 0,120 Z"
                fill="rgba(139,92,246,0.3)"
              />
              <path
                d="M 0,70 C 200,40 400,100 600,70 C 800,40 1000,100 1200,70 L 1200,120 L 0,120 Z"
                fill="rgba(62,240,181,0.25)"
              />
            </svg>
          </div>
          <div className="relative z-10 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-soft-white">Primary Ocean Swell State: Calm</p>
            <p className="text-[9px] text-cool-gray font-mono">Simulated Wave Frequency: 0.12 Hz</p>
          </div>
        </div>

        {/* Wave Height Forecast Timeline */}
        <div>
          <p className="text-[10px] font-bold text-cool-gray uppercase tracking-widest mb-2">Wave Forecast Progression</p>
          <div className="grid grid-cols-5 gap-2 text-center">
            {waveDetails.forecast.map((fc, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-2 rounded-lg">
                <span className="text-[9px] font-mono text-cool-gray block">{fc.time}</span>
                <span className={`text-xs font-bold font-mono ${fc.height > 1.5 ? 'text-solar-amber' : 'text-bio-mint'}`}>
                  {fc.height}m
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
