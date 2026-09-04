import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Droplets, Wind, Waves, ThermometerSun, Map, Navigation } from 'lucide-react';
import { mockFishingData } from '../../data/mockFishingData';

export const EnvironmentalFactors = () => {
  const { environmental } = mockFishingData;

  const factors = [
    { label: 'Sea Surface Temperature', value: `${environmental.sst.value}°C`, optimal: environmental.sst.optimal, suit: environmental.sst.suitability, icon: ThermometerSun, color: 'text-solar-amber' },
    { label: 'Chlorophyll', value: `${environmental.chlorophyll.value} mg/m³`, optimal: environmental.chlorophyll.optimal, suit: environmental.chlorophyll.suitability, icon: Droplets, color: 'text-bio-mint' },
    { label: 'Sea Surface Height', value: `${environmental.ssh.value} m`, optimal: environmental.ssh.optimal, suit: environmental.ssh.suitability, icon: Map, color: 'text-electric-lavender' },
    { label: 'Ocean Current', value: `${environmental.current.value} m/s`, optimal: environmental.current.optimal, suit: environmental.current.suitability, icon: Navigation, color: 'text-soft-white' },
    { label: 'Wave Height', value: `${environmental.wave.value} m`, optimal: environmental.wave.optimal, suit: environmental.wave.suitability, icon: Waves, color: 'text-cool-gray' },
    { label: 'Wind Speed', value: `${environmental.wind.value} km/h`, optimal: environmental.wind.optimal, suit: environmental.wind.suitability, icon: Wind, color: 'text-soft-white' },
  ];

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-cool-gray">
          ENVIRONMENTAL INTELLIGENCE
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {factors.map((f, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
             <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                 <f.icon className={`w-4 h-4 ${f.color}`} />
                 <span className="text-[10px] font-bold text-cool-gray uppercase tracking-widest">{f.label}</span>
               </div>
               <span className="text-[10px] font-bold text-bio-mint">{f.suit}%</span>
             </div>
             
             <div>
               <p className="text-xl font-bold text-soft-white font-mono">{f.value}</p>
               <p className="text-[9px] text-cool-gray font-mono mt-0.5">Optimal: {f.optimal}</p>
             </div>

             {/* Gauge */}
             <div className="w-full bg-[#0B0B12] h-1.5 rounded-full overflow-hidden">
               <div className="h-full bg-bio-mint" style={{ width: `${f.suit}%` }}></div>
             </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
