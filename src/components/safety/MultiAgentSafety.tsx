import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Network, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const MultiAgentSafety = () => {
  const agents = [
    { name: 'Safety Agent', role: 'Marine Hazard Detection', status: 'Completed', result: 'No critical hazard within 12 NM', color: 'text-bio-mint' },
    { name: 'Weather Agent', role: 'Atmospheric & Storm Evaluation', status: 'Completed', result: 'Afternoon wind gust alert (38 km/h)', color: 'text-solar-amber' },
    { name: 'Ocean Agent', role: 'Wave & Current Dynamics', status: 'Completed', result: '2.4m swell detected at shelf edge', color: 'text-solar-amber' },
    { name: 'Geofence Agent', role: 'Boundary & IMBL Verification', status: 'Completed', result: 'Vessel inside safe zone (18.4 NM from IMBL)', color: 'text-bio-mint' },
    { name: 'Route Agent', role: 'Safe Alternative Waypoints', status: 'Completed', result: 'Inshore sheltered Route B computed', color: 'text-bio-mint' },
    { name: 'Risk Agent', role: 'Synthesis & Consensus Scoring', status: 'Completed', result: 'Overall Score: 42/100 (Moderate)', color: 'text-electric-lavender' },
  ];

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-bio-mint">
          <Network className="h-4 w-4" />
          MULTI-AGENT SAFETY REASONING PIPELINE
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint uppercase tracking-widest flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Consensus Verified
        </span>
      </CardHeader>

      <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 flex-1">
        {agents.map((ag, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-3 rounded-xl flex flex-col justify-between hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-soft-white">{ag.name}</span>
              <span className="text-[9px] font-bold text-bio-mint bg-bio-mint/10 border border-bio-mint/30 px-1.5 py-0.2 rounded">
                ✓ {ag.status}
              </span>
            </div>
            <span className="text-[9px] text-cool-gray font-mono uppercase block mb-1.5">{ag.role}</span>
            <p className={`text-[10px] font-mono font-medium leading-tight ${ag.color}`}>
              {ag.result}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
