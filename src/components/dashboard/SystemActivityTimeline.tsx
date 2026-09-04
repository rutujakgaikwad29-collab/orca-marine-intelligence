import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Activity, Satellite, CloudRain, MapPin, ShieldAlert, Navigation, Brain } from 'lucide-react';

export const SystemActivityTimeline = () => {
  const activities = [
    { time: '11:29:12', text: 'Satellite dataset synchronized', icon: Satellite, color: 'text-bio-mint' },
    { time: '11:29:35', text: 'Weather Agent updated forecast', icon: CloudRain, color: 'text-electric-lavender' },
    { time: '11:30:01', text: 'PFZ-03 identified', icon: MapPin, color: 'text-solar-amber' },
    { time: '11:30:15', text: 'Safety Agent recalculated risk', icon: ShieldAlert, color: 'text-coral-red' },
    { time: '11:30:28', text: 'Route optimization completed', icon: Navigation, color: 'text-bio-mint' },
    { time: '11:30:35', text: 'ORCA generated recommendation', icon: Brain, color: 'text-aurora-violet' },
  ];

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-cool-gray">
          <Activity className="h-4 w-4 text-bio-mint" />
          System Activity
        </CardTitle>
        <span className="text-[10px] font-bold text-electric-lavender uppercase tracking-widest cursor-pointer hover:text-soft-white transition-colors">View All Activity</span>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4">
        <div className="relative border-l border-white/10 ml-3 space-y-4">
          {activities.map((act, i) => (
            <div key={i} className="relative pl-6">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#11111A] border border-white/20 flex items-center justify-center">
                <act.icon className={`w-2.5 h-2.5 ${act.color}`} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-cool-gray/70">{act.time}</span>
                <span className="text-xs text-soft-white mt-0.5">{act.text}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
