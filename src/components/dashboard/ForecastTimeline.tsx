import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Clock, Sun, CloudRain, Wind } from 'lucide-react';

export const ForecastTimeline = () => {
  const forecast = [
    { time: '06:00', icon: Sun, temp: '26°C', wind: '8 km/h', wave: '0.8m', color: 'text-solar-amber' },
    { time: '09:00', icon: Sun, temp: '28°C', wind: '10 km/h', wave: '1.0m', color: 'text-solar-amber' },
    { time: '12:00', icon: Sun, temp: '30°C', wind: '14 km/h', wave: '1.2m', color: 'text-solar-amber' },
    { time: '15:00', icon: Wind, temp: '29°C', wind: '21 km/h', wave: '1.8m', color: 'text-cool-gray' },
    { time: '18:00', icon: CloudRain, temp: '27°C', wind: '18 km/h', wave: '1.5m', color: 'text-bio-mint' },
  ];

  return (
    <Card className="flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 flex flex-row items-center justify-between bg-[#1C1B2B]/40">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-cool-gray">
          <Clock className="h-4 w-4 text-electric-lavender" />
          Next 24 Hours
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-6 min-w-max">
          {forecast.map((f, i) => (
            <div key={i} className="flex flex-col items-center gap-2 relative">
              <span className="text-xs font-mono font-bold text-soft-white">{f.time}</span>
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <f.icon className={`w-5 h-5 ${f.color}`} />
              </div>
              <span className="text-sm font-bold text-soft-white">{f.temp}</span>
              <div className="flex flex-col items-center text-[9px] text-cool-gray font-mono space-y-0.5">
                <span>W: {f.wind}</span>
                <span>V: {f.wave}</span>
              </div>
              
              {/* Connector line */}
              {i !== forecast.length - 1 && (
                <div className="absolute top-10 left-[calc(50%+20px)] w-[calc(100%-10px)] h-px bg-white/10"></div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
