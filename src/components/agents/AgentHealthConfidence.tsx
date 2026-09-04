import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Activity, ShieldCheck, AlertCircle } from 'lucide-react';
import { mockAgentData } from '../../data/mockAgentData';

export const AgentHealthConfidence = () => {
  const { agents } = mockAgentData;

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-bio-mint">
          <Activity className="h-4 w-4" />
          AGENT SYSTEM HEALTH & TRUST MATRIX
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          CLUSTER HEALTH: 100%
        </span>
      </CardHeader>

      <CardContent className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div className="space-y-2">
          {agents.map((ag) => (
            <div
              key={ag.id}
              className="bg-white/5 border border-white/10 p-2.5 rounded-xl flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{ag.icon}</span>
                <div>
                  <span className="font-bold text-soft-white block">{ag.name}</span>
                  <span className="text-[9px] text-cool-gray font-mono">
                    Latency: {ag.health.latency} • CPU: {ag.health.cpu}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-24 bg-black/40 h-1.5 rounded-full overflow-hidden hidden sm:block">
                  <div className="h-full bg-bio-mint rounded-full" style={{ width: `${ag.confidence}%` }}></div>
                </div>
                <span className="text-xs font-mono font-bold text-bio-mint w-8 text-right">
                  {ag.confidence}%
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-solar-amber/10 border border-solar-amber/30 p-2.5 rounded-lg flex items-start gap-2 text-[10px] text-soft-white">
          <AlertCircle className="w-3.5 h-3.5 text-solar-amber shrink-0 mt-0.5" />
          <p>
            <strong className="text-solar-amber">Data Uncertainty Model: </strong>
            Confidence scales dynamically with cloud cover obscuration on optical satellite sensors.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
