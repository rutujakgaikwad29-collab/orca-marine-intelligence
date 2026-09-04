import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { ArrowUpRight, Clock, Anchor, CheckCircle } from 'lucide-react';
import { mockWeatherData } from '../../data/mockWeatherData';

export const TideForecast = () => {
  const { tideDetails } = mockWeatherData;

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-soft-white">
          <Anchor className="h-4 w-4 text-electric-lavender" />
          TIDE & TIDAL CURVE FORECAST
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          {tideDetails.state}
        </span>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-5">
        {/* Current Tide & Next High/Low */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-[9px] font-bold text-cool-gray uppercase tracking-wider block">Current Tide Height</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold font-mono text-soft-white">{tideDetails.currentHeight}</span>
              <span className="text-xs text-bio-mint font-mono">m</span>
            </div>
            <span className="text-[9px] text-bio-mint font-bold uppercase mt-1 block">Flooding (Rising)</span>
          </div>

          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-[9px] font-bold text-cool-gray uppercase tracking-wider block">Next High Tide</span>
            <p className="text-sm font-bold font-mono text-solar-amber mt-1">{tideDetails.nextHigh}</p>
            <span className="text-[9px] text-cool-gray">Optimal depth window</span>
          </div>

          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-[9px] font-bold text-cool-gray uppercase tracking-wider block">Next Low Tide</span>
            <p className="text-sm font-bold font-mono text-cool-gray mt-1">{tideDetails.nextLow}</p>
            <span className="text-[9px] text-cool-gray">Shoal clearance caution</span>
          </div>
        </div>

        {/* Smooth Sinusoidal Tide Curve Graph */}
        <div>
          <p className="text-[10px] font-bold text-cool-gray uppercase tracking-widest mb-2">Astronomical Tide Cycle (24h)</p>

          <div className="relative h-24 bg-black/40 border border-white/10 rounded-xl p-3 flex items-end justify-between">
            {/* SVG Sinusoid path */}
            <svg className="absolute inset-0 w-full h-full p-2 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 40">
              <path
                d="M 0 30 Q 15 5, 30 20 T 60 5 T 90 35 T 100 20"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2"
                className="drop-shadow-[0_0_6px_rgba(139,92,246,0.8)]"
              />
            </svg>

            {tideDetails.curve.map((node, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center gap-1 group/tide">
                {node.type === 'Current' && (
                  <div className="absolute -top-6 px-1.5 py-0.5 rounded bg-bio-mint text-[8px] font-bold text-black font-mono shadow-[0_0_8px_rgba(62,240,181,0.8)]">
                    NOW
                  </div>
                )}
                <div
                  className={`w-2 h-2 rounded-full border border-white/40 ${
                    node.type === 'Current'
                      ? 'bg-bio-mint shadow-[0_0_8px_rgba(62,240,181,1)] scale-125'
                      : node.type === 'High'
                      ? 'bg-solar-amber'
                      : 'bg-cool-gray'
                  }`}
                ></div>
                <span className="text-[8px] font-mono text-cool-gray">{node.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Fishing Window */}
        <div className="bg-bio-mint/10 border border-bio-mint/30 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-bio-mint shrink-0" />
            <div>
              <span className="text-[10px] font-bold text-bio-mint uppercase tracking-widest block">Recommended Tidal Window</span>
              <span className="text-xs font-bold text-soft-white font-mono">{tideDetails.recommendedWindow}</span>
            </div>
          </div>
          <span className="text-[9px] font-mono text-cool-gray hidden sm:block">Max Current Mixing</span>
        </div>
      </CardContent>
    </Card>
  );
};
