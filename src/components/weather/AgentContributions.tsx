import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Bot, Network, CheckCircle2 } from 'lucide-react';
import { mockWeatherData } from '../../data/mockWeatherData';

export const AgentContributions = () => {
  const { agentContributions } = mockWeatherData;

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-cool-gray">
          <Network className="h-4 w-4 text-bio-mint" />
          ACTIVE AGENT PIPELINE CONTRIBUTION
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint uppercase tracking-widest flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-bio-mint animate-pulse"></span> 6 Agents Online
        </span>
      </CardHeader>

      <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 flex-1">
        {agentContributions.map((ag, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-3 rounded-xl flex flex-col justify-between hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-soft-white">{ag.name}</span>
              <span className={`text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-black/40 ${ag.color}`}>
                {ag.status}
              </span>
            </div>
            <p className="text-[10px] text-cool-gray leading-tight">
              {ag.desc}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
