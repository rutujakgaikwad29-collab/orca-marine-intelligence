import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Activity, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';
import type { DataSourcePillar } from '../../data/mockDataSources';

interface DataPillarCardProps {
  pillar: DataSourcePillar;
}

export const DataPillarCard = ({ pillar }: DataPillarCardProps) => {
  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card hover:border-white/20 transition-all">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-wrap items-center justify-between gap-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-soft-white">
          {pillar.title}
        </CardTitle>
        <span className="text-[9px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-bio-mint animate-pulse"></span>
          {pillar.status} • {pillar.lastUpdated}
        </span>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          <span className="text-[9px] font-mono text-cool-gray block mb-1">
            Provider / Agency: <strong className="text-soft-white">{pillar.agency}</strong>
          </span>
          <p className="text-xs text-soft-white/90 leading-relaxed mb-3">
            {pillar.description}
          </p>

          {/* Metric Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
            {pillar.metrics.map((m, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-2.5 rounded-xl space-y-0.5">
                <span className="text-[8px] text-cool-gray uppercase block truncate">{m.label}</span>
                <span className={`text-base font-bold ${m.color || 'text-soft-white'}`}>{m.value}</span>
                {m.subtext && <span className="text-[8px] text-cool-gray block truncate">{m.subtext}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Quality and Latency Footer */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-cool-gray">
          <span>Reliability: <strong className="text-bio-mint">{pillar.dataQuality}% Quality Score</strong></span>
          <span className="text-electric-lavender font-bold">Latency: &lt; {pillar.latencySec}s</span>
        </div>
      </CardContent>
    </Card>
  );
};
