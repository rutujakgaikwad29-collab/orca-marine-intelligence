import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { AlertTriangle, ShieldCheck, Scale, CheckCircle2, ArrowRight } from 'lucide-react';
import { mockAgentData } from '../../data/mockAgentData';

export const ConflictResolutionPanel = () => {
  const { conflictExample } = mockAgentData;

  return (
    <Card className="h-full flex flex-col group border-solar-amber/40 relative overflow-hidden glass-card bg-gradient-to-r from-solar-amber/5 via-[#11111A] to-coral-red/5">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-solar-amber">
          <Scale className="h-4 w-4 text-solar-amber" />
          AUTONOMOUS AGENT CONFLICT RESOLUTION
        </CardTitle>
        <span className="text-[10px] font-bold text-coral-red font-mono bg-coral-red/10 border border-coral-red/30 px-2 py-0.5 rounded animate-pulse">
          CONFLICT ARBITRATED
        </span>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-4">
        {/* Opposing Agent Claims */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Agent A Claim */}
          <div className="bg-bio-mint/10 border border-bio-mint/30 rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-bio-mint uppercase tracking-widest block">
                {conflictExample.agentA} (Fisheries)
              </span>
              <span className="text-[8px] font-mono text-bio-mint font-bold px-1.5 py-0.2 rounded bg-bio-mint/20">
                OPPORTUNITY: HIGH
              </span>
            </div>
            <p className="text-soft-white font-medium">{conflictExample.claimA}</p>
          </div>

          {/* Agent B Claim */}
          <div className="bg-coral-red/10 border border-coral-red/30 rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-coral-red uppercase tracking-widest block">
                {conflictExample.agentB} (Safety)
              </span>
              <span className="text-[8px] font-mono text-coral-red font-bold px-1.5 py-0.2 rounded bg-coral-red/20">
                HAZARD: HIGH
              </span>
            </div>
            <p className="text-soft-white font-medium">{conflictExample.claimB}</p>
          </div>
        </div>

        {/* Arbitration Outcome */}
        <div className="bg-[#0B0B12] border border-white/10 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-electric-lavender flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-bio-mint" /> Decision Agent Resolution Protocol
            </span>
            <span className="text-[9px] font-mono text-bio-mint font-bold uppercase">
              {conflictExample.winningAgent}
            </span>
          </div>

          <p className="text-xs text-soft-white/95 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
            "{conflictExample.resolution}"
          </p>
        </div>

        <p className="text-[10px] text-cool-gray leading-tight italic">
          * SIH Core Innovation: The system does not crash or stall upon conflicting inputs; it autonomously enforces domain-specific hierarchical safety mandates.
        </p>
      </CardContent>
    </Card>
  );
};
