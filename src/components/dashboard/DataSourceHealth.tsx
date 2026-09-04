import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Database, Satellite, CloudSun, Waves, Map, Ship, History } from 'lucide-react';

export const DataSourceHealth = () => {
  const sources = [
    { name: 'Satellite', status: 'Connected', latency: '2.1s', icon: Satellite, color: 'text-bio-mint', bg: 'bg-bio-mint' },
    { name: 'Weather', status: 'Connected', latency: '1.3s', icon: CloudSun, color: 'text-bio-mint', bg: 'bg-bio-mint' },
    { name: 'Ocean', status: 'Syncing', latency: '4.8s', icon: Waves, color: 'text-solar-amber', bg: 'bg-solar-amber' },
    { name: 'GIS', status: 'Connected', latency: '0.8s', icon: Map, color: 'text-bio-mint', bg: 'bg-bio-mint' },
    { name: 'Vessel', status: 'Connected', latency: '0.3s', icon: Ship, color: 'text-bio-mint', bg: 'bg-bio-mint' },
    { name: 'Historical', status: 'Available', latency: 'Yesterday', icon: History, color: 'text-cool-gray', bg: 'bg-cool-gray' },
  ];

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-cool-gray">
          <Database className="h-4 w-4 text-electric-lavender" />
          Data Source Health
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-bio-mint shadow-[0_0_5px_currentColor]"></span> 91% Reliable
        </span>
      </CardHeader>
      <CardContent className="flex-1 p-4 grid grid-cols-2 gap-3">
        {sources.map((src, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-2.5 flex flex-col justify-between hover:bg-white/10 transition-colors cursor-pointer">
             <div className="flex items-center gap-2 mb-2">
               <src.icon className={`w-3.5 h-3.5 ${src.color}`} />
               <span className="text-[10px] font-bold uppercase tracking-widest text-soft-white">{src.name}</span>
             </div>
             <div className="flex items-center justify-between">
               <div className="flex items-center gap-1.5">
                 <span className={`w-1.5 h-1.5 rounded-full ${src.bg} ${src.status === 'Syncing' ? 'animate-ping' : ''}`}></span>
                 <span className={`text-[9px] font-medium ${src.color}`}>{src.status}</span>
               </div>
               <span className="text-[9px] font-mono text-cool-gray">{src.latency}</span>
             </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
