import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { SlidersHorizontal, AlertTriangle } from 'lucide-react';

export const WhatIfSimulator = () => {
  const [wind, setWind] = useState(14);
  const [wave, setWave] = useState(1.1);

  // Simple simulated prediction based on sliders
  const suitability = Math.max(0, 89 - (Math.max(0, wind - 20) * 1.5) - (Math.max(0, wave - 1.5) * 10)).toFixed(0);
  const risk = wind > 35 || wave > 2.5 ? 'HIGH' : wind > 25 || wave > 1.8 ? 'MODERATE' : 'LOW';
  const riskColor = risk === 'HIGH' ? 'text-coral-red' : risk === 'MODERATE' ? 'text-solar-amber' : 'text-bio-mint';

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40">
        <CardTitle className="text-sm font-semibold flex items-center justify-between uppercase tracking-widest text-cool-gray">
          <div className="flex items-center gap-2"><SlidersHorizontal className="h-4 w-4 text-electric-lavender" /> What-If Simulator</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-5 flex flex-col gap-5">
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-cool-gray">Wind Speed (km/h)</span>
              <span className="text-xs font-mono text-soft-white font-bold">{wind}</span>
            </div>
            <input type="range" min="0" max="60" value={wind} onChange={(e) => setWind(Number(e.target.value))} className="w-full accent-electric-lavender" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-cool-gray">Wave Height (m)</span>
              <span className="text-xs font-mono text-soft-white font-bold">{wave.toFixed(1)}</span>
            </div>
            <input type="range" min="0" max="6" step="0.1" value={wave} onChange={(e) => setWave(Number(e.target.value))} className="w-full accent-electric-lavender" />
          </div>
        </div>

        <div className="mt-auto border-t border-white/5 pt-4 grid grid-cols-2 gap-4">
           <div>
             <span className="text-[10px] font-bold uppercase tracking-widest text-cool-gray">New Suitability</span>
             <p className={`text-3xl font-bold ${Number(suitability) < 50 ? 'text-coral-red' : 'text-bio-mint'} mt-1`}>{suitability}%</p>
           </div>
           <div>
             <span className="text-[10px] font-bold uppercase tracking-widest text-cool-gray">New Safety Risk</span>
             <div className="flex items-center gap-1.5 mt-2">
               <AlertTriangle className={`w-5 h-5 ${riskColor}`} />
               <p className={`text-xl font-bold ${riskColor}`}>{risk}</p>
             </div>
           </div>
        </div>

        {risk === 'HIGH' && (
          <div className="bg-coral-red/10 border border-coral-red/30 rounded p-2 text-center text-[10px] font-bold text-coral-red tracking-wide uppercase">
            ORCA recommends PFZ-02 instead.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
