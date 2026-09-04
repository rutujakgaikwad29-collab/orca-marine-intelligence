import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { History, CheckCircle2, ShieldCheck } from 'lucide-react';

export const AlertHistoryLog = () => {
  const history = [
    { id: 'HIST-104', time: 'Yesterday 16:42', title: 'High Wave Swell (2.6m)', location: 'Shelf Outer', action: 'Vessel altered course to Jaigad', outcome: 'Safely Resolved' },
    { id: 'HIST-103', time: 'Yesterday 11:20', title: 'Lightning Discharge Buffer', location: '12 km Inland', action: 'Antenna lowered, fairway clear', outcome: 'Cell Dissipated' },
    { id: 'HIST-102', time: 'Aug 30 09:15', title: 'Naval Sector 4 Standoff Alert', location: '6.2 NM West', action: '+15° course correction applied', outcome: 'Compliant' },
    { id: 'HIST-101', time: 'Aug 28 14:05', title: 'Low Fuel Warning (<25%)', location: 'Devgad Bay', action: 'Direct transit to Mirkarwada bunker', outcome: 'Refueled' },
  ];

  return (
    <Card className="glass-card border-white/5 relative overflow-hidden">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-cool-gray">
          <History className="h-4 w-4 text-electric-lavender" />
          HISTORICAL INCIDENT & DISPATCH AUDIT TRAIL
        </CardTitle>
        <span className="text-[10px] font-mono text-cool-gray">Audit Log (SHA-256 Verified)</span>
      </CardHeader>

      <CardContent className="p-4 overflow-x-auto hide-scrollbar">
        <table className="w-full text-left text-xs min-w-[500px]">
          <thead>
            <tr className="text-[9px] font-bold text-cool-gray uppercase tracking-wider border-b border-white/10">
              <th className="pb-2">Incident ID</th>
              <th className="pb-2">Timestamp</th>
              <th className="pb-2">Alert Title</th>
              <th className="pb-2">Location</th>
              <th className="pb-2">Counter-Action Executed</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono">
            {history.map((h) => (
              <tr key={h.id} className="hover:bg-white/5 transition-colors">
                <td className="py-2.5 text-soft-white font-bold">{h.id}</td>
                <td className="py-2.5 text-cool-gray">{h.time}</td>
                <td className="py-2.5 text-soft-white font-bold">{h.title}</td>
                <td className="py-2.5 text-cool-gray">{h.location}</td>
                <td className="py-2.5 text-bio-mint">{h.action}</td>
                <td className="py-2.5 text-bio-mint text-[10px] uppercase font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-bio-mint" /> {h.outcome}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};
