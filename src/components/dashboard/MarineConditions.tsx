import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { ThermometerSun, Wind, Waves, Compass, Eye, Droplets } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const MarineConditions = () => {
  const { marineData } = useAppStore();

  const conditions = [
    { label: 'Sea Surface Temp', value: `${marineData.seaSurfaceTemperature.toFixed(1)}°C`, icon: ThermometerSun, color: 'text-bio-mint' },
    { label: 'Wind Speed', value: `${marineData.windSpeed} km/h`, icon: Wind, color: 'text-bio-mint', sub: 'SW' },
    { label: 'Wave Height', value: `${marineData.waveHeight.toFixed(1)} m`, icon: Waves, color: 'text-electric-lavender' },
    { label: 'Tide', value: marineData.tide, icon: Droplets, color: 'text-bio-mint' },
    { label: 'Ocean Current', value: `${marineData.oceanCurrent.toFixed(1)} knots`, icon: Compass, color: 'text-cool-gray' },
    { label: 'Visibility', value: `${marineData.visibility} km`, icon: Eye, color: 'text-aurora-violet' },
  ];

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-cool-gray">
          <ThermometerSun className="h-4 w-4 text-electric-lavender drop-shadow-[0_0_8px_rgba(183,148,246,0.6)]" />
          Marine Conditions
        </CardTitle>
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bio-mint opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-bio-mint"></span>
          </span>
          <span className="text-[9px] font-bold text-bio-mint uppercase tracking-widest">Live</span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-4">
        <div className="grid grid-cols-2 gap-4 gap-y-6">
          {conditions.map((cond) => (
            <div key={cond.label} className="flex items-start gap-3">
              <cond.icon className={`h-5 w-5 mt-0.5 ${cond.color}`} />
              <div>
                <p className="text-[10px] font-medium text-cool-gray uppercase tracking-widest mb-0.5">{cond.label}</p>
                <p className="text-sm font-bold text-soft-white tracking-wide">{cond.value}</p>
                {cond.sub && <p className="text-xs text-cool-gray mt-0.5 font-mono">{cond.sub}</p>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
