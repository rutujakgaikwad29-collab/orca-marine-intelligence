import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Fish, Navigation, ShieldAlert, ArrowRight } from 'lucide-react';
import { mockWeatherData } from '../../data/mockWeatherData';

interface WeatherImpactProps {
  onNavigate?: (tab: string) => void;
}

export const WeatherImpact = ({ onNavigate }: WeatherImpactProps) => {
  const { impacts } = mockWeatherData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 1. Fishing Impact */}
      <Card className="glass-card border-white/5 flex flex-col justify-between p-5 relative overflow-hidden group">
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <span className="text-xs font-bold text-soft-white uppercase tracking-wider flex items-center gap-2">
              <Fish className="w-4 h-4 text-bio-mint" /> IMPACT ON FISHING
            </span>
            <span className="text-[9px] font-bold text-bio-mint uppercase bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
              {impacts.fishing.status}
            </span>
          </div>

          <div className="space-y-1.5">
            {impacts.fishing.factors.map((f, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0">
                <span className="text-cool-gray">{f.label}</span>
                <span className={`font-mono font-bold flex items-center gap-1 ${f.pos ? 'text-bio-mint' : 'text-solar-amber'}`}>
                  <span>{f.icon}</span> {f.state}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => onNavigate && onNavigate('fishing')}
          className="mt-4 w-full py-2 bg-white/5 hover:bg-bio-mint/20 border border-white/10 hover:border-bio-mint/40 rounded-lg text-xs font-bold text-soft-white hover:text-bio-mint uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
        >
          Open Fishing Intelligence <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </Card>

      {/* 2. Navigation Impact */}
      <Card className="glass-card border-white/5 flex flex-col justify-between p-5 relative overflow-hidden group">
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <span className="text-xs font-bold text-soft-white uppercase tracking-wider flex items-center gap-2">
              <Navigation className="w-4 h-4 text-electric-lavender" /> NAVIGATION & ROUTE IMPACT
            </span>
            <span className="text-[9px] font-bold text-solar-amber uppercase bg-solar-amber/10 border border-solar-amber/30 px-2 py-0.5 rounded">
              Risk: {impacts.route.risk}
            </span>
          </div>

          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-2">
            <p className="text-xs text-soft-white font-medium">{impacts.route.reason}</p>
            <div className="text-[10px] text-bio-mint font-bold uppercase tracking-wider pt-1 border-t border-white/10">
              Guidance: {impacts.route.action}
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigate && onNavigate('route')}
          className="mt-4 w-full py-2 bg-white/5 hover:bg-electric-lavender/20 border border-white/10 hover:border-electric-lavender/40 rounded-lg text-xs font-bold text-soft-white hover:text-electric-lavender uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
        >
          Plan Safe Route <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </Card>

      {/* 3. Safety Impact */}
      <Card className="glass-card border-white/5 flex flex-col justify-between p-5 relative overflow-hidden group">
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <span className="text-xs font-bold text-soft-white uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-solar-amber" /> MARINE SAFETY IMPACT
            </span>
            <span className="text-[9px] font-bold text-bio-mint uppercase bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
              {impacts.safety.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
              <span className="text-[9px] text-cool-gray block">Wind Force</span>
              <span className="font-bold text-soft-white">{impacts.safety.wind}</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
              <span className="text-[9px] text-cool-gray block">Wave Swell</span>
              <span className="font-bold text-soft-white">{impacts.safety.wave}</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
              <span className="text-[9px] text-cool-gray block">Lightning</span>
              <span className="font-bold text-bio-mint">{impacts.safety.lightning}</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
              <span className="text-[9px] text-cool-gray block">Visibility</span>
              <span className="font-bold text-bio-mint">{impacts.safety.visibility}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigate && onNavigate('safety')}
          className="mt-4 w-full py-2 bg-white/5 hover:bg-solar-amber/20 border border-white/10 hover:border-solar-amber/40 rounded-lg text-xs font-bold text-soft-white hover:text-solar-amber uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
        >
          Open Safety Center <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </Card>
    </div>
  );
};
