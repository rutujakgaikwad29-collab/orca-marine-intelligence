import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Database, CheckCircle2, Layers } from 'lucide-react';
import { mockAgentData } from '../../data/mockAgentData';

export const SharedStatePanel = () => {
  const { sharedState } = mockAgentData;

  return (
    <Card className="glass-card border-white/5 relative overflow-hidden">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-bio-mint">
          <Database className="h-4 w-4" />
          ORCA SHARED KNOWLEDGE BLACKBOARD (CENTRAL STATE)
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          REAL-TIME SYNCHRONIZED
        </span>
      </CardHeader>

      <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs font-mono">
        <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
          <span className="text-[8px] text-cool-gray uppercase block">Vessel GPS Position</span>
          <span className="text-soft-white font-bold">{sharedState.location}</span>
        </div>

        <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
          <span className="text-[8px] text-cool-gray uppercase block">Weather Condition State</span>
          <span className="text-solar-amber font-bold">{sharedState.weatherState}</span>
        </div>

        <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
          <span className="text-[8px] text-cool-gray uppercase block">Ocean Hydrodynamic State</span>
          <span className="text-bio-mint font-bold">{sharedState.oceanState}</span>
        </div>

        <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
          <span className="text-[8px] text-cool-gray uppercase block">Primary Fishing Objective</span>
          <span className="text-soft-white font-bold">{sharedState.fishingTarget}</span>
        </div>

        <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
          <span className="text-[8px] text-cool-gray uppercase block">Active Marine Risk</span>
          <span className="text-solar-amber font-bold">{sharedState.safetyRisk}</span>
        </div>

        <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
          <span className="text-[8px] text-cool-gray uppercase block">Selected Route Plan</span>
          <span className="text-bio-mint font-bold">{sharedState.activeRoute}</span>
        </div>
      </CardContent>
    </Card>
  );
};
