import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { ShieldAlert, AlertTriangle, RefreshCw, CheckCircle2, ShieldCheck } from 'lucide-react';

export const AgentFailureFallback = () => {
  const [isFailed, setIsFailed] = useState(false);

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-coral-red">
          <ShieldAlert className="h-4 w-4" />
          FAULT TOLERANCE & AGENT FALLBACK DEMO
        </CardTitle>
        <button
          onClick={() => setIsFailed(!isFailed)}
          className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border transition-colors ${
            isFailed
              ? 'bg-coral-red/20 border-coral-red/40 text-coral-red'
              : 'bg-white/5 border-white/10 text-cool-gray hover:text-soft-white'
          }`}
        >
          {isFailed ? 'Restore Weather Agent' : 'Simulate Weather Agent Crash'}
        </button>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-4">
        {isFailed ? (
          <div className="space-y-3">
            <div className="bg-coral-red/15 border border-coral-red/40 rounded-xl p-3 flex items-center gap-2 text-xs">
              <AlertTriangle className="w-5 h-5 text-coral-red shrink-0 animate-pulse" />
              <div>
                <span className="font-bold text-coral-red uppercase block">
                  ⚠️ WEATHER AGENT OFFLINE (SIMULATED NODE FAILURE)
                </span>
                <span className="text-[10px] text-cool-gray">
                  Heartbeat timeout (&gt;5000ms). Activating Autonomous Degradation Protocol.
                </span>
              </div>
            </div>

            <div className="bg-[#0B0B12] border border-white/10 rounded-xl p-3 space-y-2 text-xs">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-cool-gray">Active Fallback Mode:</span>
                <span className="text-solar-amber font-mono font-bold">Cached ECMWF 6h Grid + In Situ Buoys</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-cool-gray">Cluster Confidence Penalty:</span>
                <span className="text-coral-red font-mono font-bold">91% &rarr; 73%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cool-gray">System Availability:</span>
                <span className="text-bio-mint font-bold">DEGRADED OPERATIONAL (STILL RUNNING)</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3 text-xs">
            <ShieldCheck className="w-6 h-6 text-bio-mint shrink-0" />
            <div>
              <span className="font-bold text-soft-white uppercase block">
                All 8 Agents Operating in High-Availability Consensus
              </span>
              <span className="text-[10px] text-cool-gray">
                Click "Simulate Weather Agent Crash" above to observe how ORCA gracefully falls back to cached climatology and in-situ buoy feeds without crashing the core decision pipeline.
              </span>
            </div>
          </div>
        )}

        <p className="text-[10px] text-cool-gray italic pt-2 border-t border-white/5">
          * Fault-Tolerant Actor Architecture: Circuit-breaker pattern prevents cascading failures.
        </p>
      </CardContent>
    </Card>
  );
};
