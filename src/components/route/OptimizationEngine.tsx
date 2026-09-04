import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Cpu, Code, Network, ArrowRight } from 'lucide-react';

export const OptimizationEngine = () => {
  return (
    <Card className="glass-card border-white/5 relative overflow-hidden">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-electric-lavender">
          <Cpu className="h-4 w-4" />
          TECHNICAL ARCHITECTURE: HOW ORCA OPTIMIZES MARINE PATHS
        </CardTitle>
        <span className="text-[10px] font-bold text-soft-white font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded">
          A* + MULTI-OBJECTIVE PARETO SOLVER
        </span>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        <p className="text-xs text-cool-gray leading-relaxed">
          ORCA formulates route optimization not as a single shortest-distance problem, but as a continuous multi-criteria graph search over dynamic oceanographic cost fields:
        </p>

        {/* Math/Algorithm Equation Box */}
        <div className="bg-[#0B0B12] border border-white/10 p-4 rounded-xl font-mono text-xs text-soft-white space-y-1.5">
          <div className="text-bio-mint font-bold">
            Cost(Route) = &alpha; &times; Distance + &beta; &times; SwellDrag(Hs) + &gamma; &times; WindPenalty(W) &minus; &delta; &times; CurrentAssist(v&#773;) + BoundaryPenalty
          </div>
          <p className="text-[10px] text-cool-gray">
            where &alpha;, &beta;, &gamma;, &delta; represent dynamic preference weights dynamically tuned by the Multi-Agent Reasoning Engine.
          </p>
        </div>

        {/* Pipeline Diagram */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto hide-scrollbar text-[10px] text-center pt-2">
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg min-w-[120px]">
            <span className="font-bold text-soft-white block">GPS & Target</span>
            <span className="text-cool-gray">Start / Destination</span>
          </div>
          <ArrowRight className="w-4 h-4 text-cool-gray shrink-0" />
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg min-w-[120px]">
            <span className="font-bold text-solar-amber block">No-Go Polygon Mask</span>
            <span className="text-cool-gray">Naval & IMBL Geofence</span>
          </div>
          <ArrowRight className="w-4 h-4 text-cool-gray shrink-0" />
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg min-w-[120px]">
            <span className="font-bold text-electric-lavender block">Cost Grid Mesh</span>
            <span className="text-cool-gray">Waves, Wind & Currents</span>
          </div>
          <ArrowRight className="w-4 h-4 text-cool-gray shrink-0" />
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg min-w-[120px]">
            <span className="font-bold text-bio-mint block">Multi-Agent Consensus</span>
            <span className="text-cool-gray">Pareto Frontier Selection</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
