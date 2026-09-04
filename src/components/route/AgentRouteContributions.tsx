import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Network, CheckCircle2 } from 'lucide-react';
import { mockRouteData } from '../../data/mockRouteData';

export const AgentRouteContributions = () => {
  const { agentContributions } = mockRouteData;

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-bio-mint">
          <Network className="h-4 w-4" />
          ROUTE INTELLIGENCE AGENTS COLLABORATION
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint uppercase tracking-widest flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> 8 Agents Evaluated
        </span>
      </CardHeader>

      <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 flex-1">
        {agentContributions.map((ag, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 p-3 rounded-xl flex flex-col justify-between hover:bg-white/10 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-soft-white">{ag.name}</span>
                <span className="text-[8px] font-bold text-bio-mint bg-bio-mint/10 border border-bio-mint/30 px-1 py-0.2 rounded font-mono">
                  ✓ Done
                </span>
              </div>
              <span className="text-[9px] text-cool-gray font-mono uppercase block mb-1">
                {ag.role}
              </span>
            </div>

            <p className="text-[10px] text-soft-white/90 leading-tight pt-2 border-t border-white/5">
              {ag.detail}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
