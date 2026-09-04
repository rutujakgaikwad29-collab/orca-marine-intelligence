import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Shield, ListOrdered, CheckCircle2 } from 'lucide-react';
import { mockAgentData } from '../../data/mockAgentData';

export const DecisionPriorityHierarchy = () => {
  const { decisionPriorities } = mockAgentData;

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-electric-lavender">
          <ListOrdered className="h-4 w-4" />
          ORCA DECISION ARBITRATION HIERARCHY
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          7-TIER PRIORITY POLICY
        </span>
      </CardHeader>

      <CardContent className="p-4 flex-1 flex flex-col justify-between gap-2.5">
        <div className="space-y-1.5">
          {decisionPriorities.map((item) => (
            <div
              key={item.rank}
              className="bg-white/5 border border-white/10 p-2 rounded-xl flex items-center justify-between text-xs hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-black/50 border border-white/20 text-[9px] font-mono font-bold text-soft-white flex items-center justify-center shrink-0">
                  {item.rank}
                </span>
                <span className="font-bold text-soft-white">{item.title}</span>
              </div>

              <span className={`text-[9px] font-mono font-bold ${item.color}`}>
                {item.weight}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-cool-gray leading-tight italic pt-1 border-t border-white/5">
          * Hard ethical & maritime legal constraints always override economic fuel or fishing opportunity.
        </p>
      </CardContent>
    </Card>
  );
};
