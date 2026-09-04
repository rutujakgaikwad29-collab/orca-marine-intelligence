import { Navigation, Compass, Sparkles, RefreshCw } from 'lucide-react';
import { Card } from '../ui/Card';

interface RouteHeaderProps {
  onRefresh: () => void;
  refreshing: boolean;
}

export const RouteHeader = ({ onRefresh, refreshing }: RouteHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-bio-mint/10 border border-bio-mint/30 shadow-[0_0_15px_rgba(62,240,181,0.2)]">
            <Compass className="w-6 h-6 text-bio-mint animate-[spin_12s_linear_infinite]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-soft-white uppercase tracking-wider">
                ROUTE PLANNER 🧭
              </h1>
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-solar-amber/15 border border-solar-amber/30 text-solar-amber uppercase">
                SIMULATION MODE
              </span>
            </div>
            <p className="text-xs text-cool-gray">
              "Not just the shortest route. The smartest route for the ocean ahead."
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-cool-gray">
          <span className="w-2 h-2 rounded-full bg-bio-mint animate-pulse"></span>
          <span className="text-soft-white font-mono font-bold">ROUTE INTELLIGENCE ACTIVE</span>
        </div>

        <button
          onClick={onRefresh}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-xl text-xs font-bold text-soft-white uppercase tracking-wider transition-all shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-bio-mint' : ''}`} />
          Recalculate Routes
        </button>
      </div>
    </div>
  );
};
