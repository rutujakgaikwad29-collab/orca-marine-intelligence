import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Wind, Compass, AlertTriangle, ArrowUp } from 'lucide-react';
import { mockWeatherData } from '../../data/mockWeatherData';

export const WindAnalysis = () => {
  const { windDetails } = mockWeatherData;

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-bio-mint">
          <Wind className="h-4 w-4" />
          WIND & VECTOR INTELLIGENCE
        </CardTitle>
        <span className="text-[10px] font-bold text-soft-white font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded">
          Gust: {windDetails.gust} km/h
        </span>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-5">
        {/* Top: Stats + Animated Compass */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div>
              <p className="text-[10px] font-bold text-cool-gray uppercase tracking-widest mb-0.5">Sustained Wind Speed</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-soft-white font-mono">{windDetails.speed}</span>
                <span className="text-sm text-cool-gray font-mono">km/h (7.6 kt)</span>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-cool-gray uppercase tracking-widest mb-0.5">Direction</p>
              <p className="text-sm font-bold text-bio-mint font-mono">{windDetails.direction}</p>
            </div>
          </div>

          {/* Animated Compass Graphic */}
          <div className="relative w-28 h-28 rounded-full border border-white/15 bg-black/40 flex items-center justify-center shadow-inner">
            {/* Compass Cardinals */}
            <span className="absolute top-1 text-[8px] font-bold font-mono text-coral-red">N</span>
            <span className="absolute bottom-1 text-[8px] font-bold font-mono text-cool-gray">S</span>
            <span className="absolute left-1.5 text-[8px] font-bold font-mono text-cool-gray">W</span>
            <span className="absolute right-1.5 text-[8px] font-bold font-mono text-cool-gray">E</span>
            
            {/* Rotating Arrow Indicator pointing 225 deg (SW) */}
            <div
              className="w-full h-full absolute inset-0 flex items-center justify-center transition-transform duration-1000 ease-out"
              style={{ transform: `rotate(${windDetails.headingAngle}deg)` }}
            >
              <div className="flex flex-col items-center">
                <ArrowUp className="w-5 h-5 text-bio-mint drop-shadow-[0_0_8px_rgba(62,240,181,0.9)] animate-bounce" />
                <div className="w-0.5 h-6 bg-gradient-to-t from-transparent to-bio-mint"></div>
              </div>
            </div>

            <div className="w-2.5 h-2.5 rounded-full bg-soft-white shadow-[0_0_6px_white] z-10"></div>
          </div>
        </div>

        {/* 12-Hour Wind Forecast Chart */}
        <div>
          <div className="flex justify-between items-center text-[10px] text-cool-gray font-mono mb-2">
            <span>12-Hour Wind & Gust Forecast</span>
            <span className="text-solar-amber">Peak: {windDetails.expectedIncrease}</span>
          </div>

          <div className="h-16 flex items-end justify-between gap-2 border-b border-white/10 pb-1">
            {windDetails.forecast12h.map((f, i) => {
              const speedHeight = Math.round((f.speed / 30) * 100);
              const gustHeight = Math.round((f.gust / 30) * 100);

              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group/wf">
                  <div className="w-full flex items-end justify-center gap-1 h-12">
                    {/* Sustained bar */}
                    <div
                      className={`w-2 rounded-t-sm ${
                        f.speed >= 20 ? 'bg-solar-amber' : 'bg-bio-mint'
                      }`}
                      style={{ height: `${speedHeight}%` }}
                    ></div>
                    {/* Gust bar */}
                    <div
                      className="w-1.5 rounded-t-sm bg-white/20"
                      style={{ height: `${gustHeight}%` }}
                    ></div>
                  </div>
                  <span className="text-[8px] font-mono text-cool-gray">{f.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wind Warning Banner */}
        <div className="bg-solar-amber/10 border border-solar-amber/30 rounded-lg p-2.5 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-solar-amber shrink-0 mt-0.5" />
          <div className="text-[11px] text-soft-white leading-tight">
            <span className="font-bold text-solar-amber">EXPECTED WIND INCREASE: </span>
            Fishing suitability may decrease after 02:00 PM as gusts cross 25 km/h. Plan morning operations.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
