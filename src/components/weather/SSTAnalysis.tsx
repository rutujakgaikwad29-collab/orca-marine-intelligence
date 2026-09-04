import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { ThermometerSun, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';
import { mockWeatherData } from '../../data/mockWeatherData';

export const SSTAnalysis = () => {
  const { sstDetails } = mockWeatherData;

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-solar-amber">
          <ThermometerSun className="h-4 w-4" />
          SEA SURFACE TEMPERATURE (SST)
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          {sstDetails.trend}
        </span>
      </CardHeader>
      
      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-5">
        {/* Main Metric & Range comparison */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-cool-gray uppercase tracking-widest mb-1">Current Sea Surface Temp</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-soft-white font-mono">{sstDetails.current}</span>
              <span className="text-lg font-bold text-solar-amber">°C</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-right">
            <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
              <span className="text-[9px] text-cool-gray uppercase tracking-wider block">24h Min</span>
              <span className="text-xs font-mono font-bold text-soft-white">{sstDetails.min24h}°C</span>
            </div>
            <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
              <span className="text-[9px] text-cool-gray uppercase tracking-wider block">24h Max</span>
              <span className="text-xs font-mono font-bold text-soft-white">{sstDetails.max24h}°C</span>
            </div>
          </div>
        </div>

        {/* 24-Hour SST Curve visualization */}
        <div>
          <div className="flex justify-between items-center text-[10px] text-cool-gray font-mono mb-2">
            <span>24-Hour SST Variation</span>
            <span className="text-bio-mint">Optimal Range: {sstDetails.optimalMin}°C — {sstDetails.optimalMax}°C</span>
          </div>

          <div className="h-20 flex items-end justify-between gap-2 pt-2 px-1 border-b border-white/10">
            {sstDetails.history24h.map((pt, i) => {
              const height = Math.round(((pt.temp - 27.0) / (29.5 - 27.0)) * 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group/bar">
                  <span className="text-[9px] font-mono text-cool-gray opacity-0 group-hover/bar:opacity-100 transition-opacity">
                    {pt.temp}°
                  </span>
                  <div
                    className="w-full rounded-t-sm bg-gradient-to-t from-solar-amber/30 to-solar-amber hover:to-bio-mint transition-colors relative"
                    style={{ height: `${height}%` }}
                  >
                    {i === sstDetails.history24h.length - 1 && (
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-bio-mint shadow-[0_0_8px_rgba(62,240,181,0.8)]"></div>
                    )}
                  </div>
                  <span className="text-[8px] font-mono text-cool-gray/70">{pt.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Interpretation & Suitability Contribution */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-electric-lavender uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> AI Interpretation
            </span>
            <span className="text-[10px] font-bold text-bio-mint font-mono">
              Suitability Contribution: {sstDetails.contribution}%
            </span>
          </div>
          <p className="text-xs text-soft-white/90 leading-relaxed">
            {sstDetails.interpretation}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
