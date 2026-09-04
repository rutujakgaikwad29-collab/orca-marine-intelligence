import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Activity, CheckCircle2, ShieldCheck } from 'lucide-react';
import { mockDataSources } from '../../data/mockDataSources';

export const DataHealthTable = () => {
  const { healthTable } = mockDataSources;

  return (
    <Card className="glass-card border-white/5 relative overflow-hidden">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-bio-mint">
          <Activity className="h-4 w-4" />
          LIVE DATA STREAM HEALTH & INGESTION STATUS
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          ALL 6 FEEDS HEALTHY
        </span>
      </CardHeader>

      <CardContent className="p-4 overflow-x-auto hide-scrollbar">
        <table className="w-full text-left text-xs min-w-[620px]">
          <thead>
            <tr className="text-[9px] font-bold text-cool-gray uppercase tracking-wider border-b border-white/10">
              <th className="pb-2">Data Source Stream</th>
              <th className="pb-2">Institutional Provider</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Latency</th>
              <th className="pb-2">Reliability / Trust</th>
              <th className="pb-2">Data Protocol</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono">
            {healthTable.map((row, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition-colors">
                <td className="py-2.5 text-soft-white font-bold">{row.source}</td>
                <td className="py-2.5 text-cool-gray">{row.provider}</td>
                <td className="py-2.5">
                  <span className="text-bio-mint font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-bio-mint animate-pulse"></span>
                    {row.status}
                  </span>
                </td>
                <td className="py-2.5 text-soft-white">{row.latency}</td>
                <td className="py-2.5 text-bio-mint font-bold">{row.reliability}</td>
                <td className="py-2.5 text-electric-lavender text-[10px]">{row.protocol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};
