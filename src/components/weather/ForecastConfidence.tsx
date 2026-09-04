import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Database, ShieldCheck, CheckCircle2, Server } from 'lucide-react';
import { mockWeatherData } from '../../data/mockWeatherData';

export const ForecastConfidence = () => {
  const { forecastConfidence, dataSources } = mockWeatherData;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. Forecast Reliability */}
      <Card className="glass-card border-white/5 flex flex-col justify-between p-5 relative overflow-hidden">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
            <span className="text-xs font-bold text-soft-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-bio-mint" /> FORECAST RELIABILITY & CONFIDENCE
            </span>
            <span className="text-xs font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
              Overall: {forecastConfidence.overall}%
            </span>
          </div>

          <div className="space-y-3">
            {forecastConfidence.sources.map((s, i) => (
              <div key={i} className="flex items-center gap-3 text-xs">
                <span className="text-cool-gray font-mono w-36 truncate">{s.name}</span>
                <div className="flex-1 bg-black/40 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-bio-mint rounded-full" style={{ width: `${s.score}%` }}></div>
                </div>
                <span className="text-[10px] font-mono font-bold text-soft-white w-8 text-right">{s.score}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-cool-gray mt-4">
          <span>Ensemble Standard Deviation: &plusmn;0.14</span>
          <span className="text-bio-mint font-bold">High Precision Grid (0.05°)</span>
        </div>
      </Card>

      {/* 2. Data Sources Health */}
      <Card className="glass-card border-white/5 flex flex-col justify-between p-5 relative overflow-hidden">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
            <span className="text-xs font-bold text-soft-white uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-electric-lavender" /> METEOROLOGICAL DATA INGESTION
            </span>
            <span className="text-[9px] font-bold text-bio-mint uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-bio-mint animate-pulse"></span> 5 Feeds Ingested
            </span>
          </div>

          <div className="space-y-2">
            {dataSources.map((ds, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-2.5 rounded-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Server className="w-3.5 h-3.5 text-cool-gray" />
                  <span className="font-bold text-soft-white truncate max-w-[200px]">{ds.name}</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono text-cool-gray">{ds.latency}</span>
                  <span className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded bg-black/40 text-solar-amber border border-solar-amber/20">
                    {ds.mode}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[9px] text-cool-gray italic pt-2 mt-2 border-t border-white/5">
          * Simulated live ingest adapter for INCOIS, IMD, and NOAA GFS numerical outputs.
        </p>
      </Card>
    </div>
  );
};
