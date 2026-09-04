import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Clock, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';
import { mockSafetyData } from '../../data/mockSafetyData';

export const SafetyForecastTimeline = () => {
  const { safetyTimeline } = mockSafetyData;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentStep = safetyTimeline[selectedIndex];

  return (
    <Card className="glass-card border-white/5 relative overflow-hidden">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-wrap items-center justify-between gap-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-soft-white">
          <Clock className="h-4 w-4 text-electric-lavender" />
          24-HOUR SAFETY RISK FORECAST & TEMPORAL SCRUBBER
        </CardTitle>
        <span className="text-[10px] font-bold text-solar-amber font-mono bg-solar-amber/10 border border-solar-amber/30 px-2 py-0.5 rounded">
          Peak Risk Horizon: +6 Hours (16:00 hrs)
        </span>
      </CardHeader>

      <CardContent className="p-5 space-y-6">
        {/* Scrubber timeline buttons */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto hide-scrollbar pb-2">
          {safetyTimeline.map((step, idx) => {
            const isSelected = selectedIndex === idx;
            const isHigh = step.riskScore > 60;
            const isMod = step.riskScore > 40;

            return (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`flex-1 min-w-[100px] p-3 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'bg-white/10 border-bio-mint text-soft-white shadow-[0_0_15px_rgba(62,240,181,0.2)]'
                    : 'bg-white/5 border-white/10 text-cool-gray hover:text-soft-white hover:bg-white/10'
                }`}
              >
                <span className="text-[9px] font-mono block mb-1">{step.time}</span>
                <span
                  className={`text-lg font-bold font-mono ${
                    isHigh ? 'text-coral-red' : isMod ? 'text-solar-amber' : 'text-bio-mint'
                  }`}
                >
                  {step.riskScore}
                </span>
                <span className="text-[8px] uppercase block font-bold mt-0.5">{step.status}</span>
              </button>
            );
          })}
        </div>

        {/* Temporal Risk Graph Visualization */}
        <div className="bg-[#0B0B12] border border-white/10 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-soft-white">
              Selected Forecast Window: <strong className="text-bio-mint font-mono">{currentStep.time}</strong>
            </span>
            <div className="flex items-center gap-4 text-[10px] font-mono text-cool-gray">
              <span>Wind: <strong className="text-soft-white">{currentStep.wind} km/h</strong></span>
              <span>Wave: <strong className="text-soft-white">{currentStep.wave} m</strong></span>
              <span>Lightning: <strong className="text-bio-mint">{currentStep.lightning}</strong></span>
            </div>
          </div>

          {/* Visual Step Curve */}
          <div className="h-24 flex items-end justify-between gap-4 px-4 pt-4 border-b border-white/10">
            {safetyTimeline.map((item, i) => {
              const height = (item.riskScore / 80) * 100;
              const isSelected = selectedIndex === i;

              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className={`text-[9px] font-mono font-bold ${isSelected ? 'text-bio-mint' : 'text-cool-gray'}`}>
                    {item.riskScore}
                  </span>
                  <div
                    className={`w-full max-w-[28px] rounded-t-sm transition-all duration-500 ${
                      item.riskScore > 60
                        ? 'bg-coral-red shadow-[0_0_8px_rgba(255,92,119,0.8)]'
                        : item.riskScore > 40
                        ? 'bg-solar-amber'
                        : 'bg-bio-mint'
                    } ${isSelected ? 'ring-2 ring-soft-white ring-offset-2 ring-offset-black' : 'opacity-70'}`}
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-[8px] font-mono text-cool-gray">{item.time.split(' ')[0]}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-cool-gray">
            <span className="flex items-center gap-1.5 text-solar-amber">
              <TrendingUp className="w-3.5 h-3.5" /> Temporal Risk Gradient: Risk intensifies towards late afternoon (+6h).
            </span>
            <span className="font-mono text-[10px]">Model Horizon: 24 Hours</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
