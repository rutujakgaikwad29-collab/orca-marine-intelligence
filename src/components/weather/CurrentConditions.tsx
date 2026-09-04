import { Card, CardContent } from '../ui/Card';
import { ThermometerSun, Wind, Waves, Timer, Compass, ArrowUpRight, Gauge, Eye, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { MarineConditionMetric } from '../../data/mockWeatherData';

interface CurrentConditionsProps {
  metrics: MarineConditionMetric[];
}

export const CurrentConditions = ({ metrics }: CurrentConditionsProps) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'sst': return ThermometerSun;
      case 'wind': return Wind;
      case 'wave_height': return Waves;
      case 'wave_period': return Timer;
      case 'current': return Compass;
      case 'tide': return ArrowUpRight;
      case 'pressure': return Gauge;
      case 'visibility': return Eye;
      default: return Waves;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((m) => {
        const IconComponent = getIcon(m.id);
        const minVal = Math.min(...m.sparkline);
        const maxVal = Math.max(...m.sparkline) || 1;
        const range = maxVal - minVal || 1;

        return (
          <Card
            key={m.id}
            className="glass-card border-white/5 p-4 flex flex-col justify-between h-[140px] hover:border-white/20 transition-all group relative overflow-hidden"
          >
            {/* Ambient subtle glow based on metric color */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none group-hover:bg-white/10 transition-colors"></div>

            <div className="flex items-center justify-between relative z-10">
              <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest truncate max-w-[130px]">
                {m.label}
              </span>
              <IconComponent className={`w-4 h-4 ${m.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
            </div>

            <div className="flex items-baseline justify-between relative z-10 my-1">
              <div className="flex items-baseline gap-1">
                <span className={`text-2xl font-bold font-mono ${m.color}`}>{m.value}</span>
                <span className="text-xs text-cool-gray font-mono">{m.unit}</span>
              </div>

              {/* Sparkline mini-graph */}
              <div className="w-16 h-6 flex items-end gap-[3px] opacity-60 group-hover:opacity-100 transition-opacity">
                {m.sparkline.map((val, idx) => {
                  const heightPercent = Math.max(15, Math.round(((val - minVal) / range) * 100));
                  return (
                    <div
                      key={idx}
                      className={`flex-1 rounded-t-sm ${
                        idx === m.sparkline.length - 1 ? 'bg-bio-mint shadow-[0_0_6px_rgba(62,240,181,0.6)]' : 'bg-white/20'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] relative z-10 pt-2 border-t border-white/5">
              <span className="text-soft-white font-medium truncate max-w-[100px]">{m.status}</span>
              <span
                className={`flex items-center gap-0.5 font-mono text-[9px] ${
                  m.trendDir === 'up'
                    ? 'text-bio-mint'
                    : m.trendDir === 'down'
                    ? 'text-solar-amber'
                    : 'text-cool-gray'
                }`}
              >
                {m.trendDir === 'up' && <TrendingUp className="w-2.5 h-2.5" />}
                {m.trendDir === 'down' && <TrendingDown className="w-2.5 h-2.5" />}
                {m.trendDir === 'stable' && <Minus className="w-2.5 h-2.5" />}
                {m.trend}
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
