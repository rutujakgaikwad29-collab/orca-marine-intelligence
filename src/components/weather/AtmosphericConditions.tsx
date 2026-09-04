import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Cloud, CloudRain, Droplets, Gauge, Eye, Thermometer } from 'lucide-react';
import { mockWeatherData } from '../../data/mockWeatherData';

export const AtmosphericConditions = () => {
  const { atmosphericDetails } = mockWeatherData;

  const stats = [
    { label: 'Ambient Temp', val: `${atmosphericDetails.temp}°C`, icon: Thermometer, color: 'text-solar-amber' },
    { label: 'Relative Humidity', val: `${atmosphericDetails.humidity}%`, icon: Droplets, color: 'text-bio-mint' },
    { label: 'Rain Probability', val: `${atmosphericDetails.rainProb}%`, icon: CloudRain, color: 'text-electric-lavender' },
    { label: 'Barometric Pressure', val: `${atmosphericDetails.pressure} hPa`, icon: Gauge, color: 'text-soft-white' },
    { label: 'Optical Visibility', val: `${atmosphericDetails.visibility} km`, icon: Eye, color: 'text-bio-mint' },
    { label: 'Cloud Cover', val: `${atmosphericDetails.cloudCover}%`, icon: Cloud, color: 'text-cool-gray' },
  ];

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-cool-gray">
          <Cloud className="h-4 w-4 text-electric-lavender" />
          ATMOSPHERIC & WEATHER TELEMETRY
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint uppercase tracking-widest">Normal</span>
      </CardHeader>

      <CardContent className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
        {stats.map((item, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-3 rounded-xl flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest">{item.label}</span>
              <item.icon className={`w-3.5 h-3.5 ${item.color} opacity-80`} />
            </div>
            <p className={`text-xl font-bold font-mono ${item.color} mt-2`}>{item.val}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
