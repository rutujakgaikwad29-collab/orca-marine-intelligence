import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Zap, MessageSquare, Map, Fish, Navigation, ShieldCheck } from 'lucide-react';

export const QuickActions = () => {
  const actions = [
    { label: 'Ask ORCA', icon: MessageSquare, color: 'text-bio-mint', bg: 'hover:bg-bio-mint/10 hover:border-bio-mint/30' },
    { label: 'Open Live Map', icon: Map, color: 'text-electric-lavender', bg: 'hover:bg-electric-lavender/10 hover:border-electric-lavender/30' },
    { label: 'Check Fishing Zones', icon: Fish, color: 'text-solar-amber', bg: 'hover:bg-solar-amber/10 hover:border-solar-amber/30' },
    { label: 'Plan Safe Route', icon: Navigation, color: 'text-bio-mint', bg: 'hover:bg-bio-mint/10 hover:border-bio-mint/30' },
    { label: 'View Safety Status', icon: ShieldCheck, color: 'text-coral-red', bg: 'hover:bg-coral-red/10 hover:border-coral-red/30' },
  ];

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-cool-gray">
          <Zap className="h-4 w-4 text-solar-amber" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-4 flex flex-col gap-2">
        {actions.map((act, i) => (
          <button key={i} className={`flex items-center gap-3 w-full bg-white/5 border border-white/10 rounded-lg p-3 text-left transition-all ${act.bg}`}>
            <act.icon className={`w-4 h-4 ${act.color}`} />
            <span className="text-xs font-bold text-soft-white uppercase tracking-widest">{act.label}</span>
          </button>
        ))}
      </CardContent>
    </Card>
  );
};
