import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { History, CheckCircle2 } from 'lucide-react';
import { mockRouteData } from '../../data/mockRouteData';

export const RouteHistory = () => {
  const { recentHistory } = mockRouteData;

  return (
    <Card className="glass-card border-white/5 relative overflow-hidden">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-cool-gray">
          <History className="h-4 w-4 text-electric-lavender" />
          RECENT VOYAGE LOGS & OPTIMIZATION AUDIT
        </CardTitle>
        <span className="text-[10px] font-mono text-cool-gray">4 Logged Transits</span>
      </CardHeader>

      <CardContent className="p-4 overflow-x-auto hide-scrollbar">
        <table className="w-full text-left text-xs min-w-[500px]">
          <thead>
            <tr className="text-[9px] font-bold text-cool-gray uppercase tracking-wider border-b border-white/10">
              <th className="pb-2">Date / Time</th>
              <th className="pb-2">Leg Departure</th>
              <th className="pb-2">Target Destination</th>
              <th className="pb-2">Route Chosen</th>
              <th className="pb-2">Risk</th>
              <th className="pb-2">Fuel Used</th>
              <th className="pb-2">Outcome</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono">
            {recentHistory.map((item, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition-colors">
                <td className="py-2.5 text-soft-white">{item.date}</td>
                <td className="py-2.5 text-cool-gray">{item.start}</td>
                <td className="py-2.5 text-soft-white font-bold">{item.dest}</td>
                <td className="py-2.5 text-bio-mint font-bold">{item.route}</td>
                <td className="py-2.5 text-solar-amber">{item.risk}/100</td>
                <td className="py-2.5 text-soft-white">{item.fuel}</td>
                <td className="py-2.5 text-bio-mint text-[10px] uppercase font-bold">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};
