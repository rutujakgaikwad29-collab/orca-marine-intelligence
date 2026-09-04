import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Database, ShieldCheck, CheckCircle2, Server } from 'lucide-react';

export const DataQualityTrust = () => {
  const sources = [
    { name: 'INSAT-3DR Rapid Satellite Feed', quality: 'Verified (Good)', latency: '3 min ago', confidence: 94 },
    { name: 'INCOIS Wave Watch III Hydro Model', quality: 'High Confidence', latency: '15 min ago', confidence: 91 },
    { name: 'IMD High-Resolution Cyclone Bulletins', quality: 'Official Authority', latency: 'Real-time', confidence: 96 },
    { name: 'Indian Coast Guard Geofence Limits', quality: 'Verified Legal EEZ', latency: 'Active Sync', confidence: 98 },
    { name: 'Ground Radar & Lightning Sensors', quality: 'Operational Network', latency: '5 min ago', confidence: 88 },
  ];

  return (
    <Card className="glass-card border-white/5 relative overflow-hidden">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-electric-lavender">
          <Database className="h-4 w-4" />
          DATA QUALITY, SENSOR PROVENANCE & TRUST
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          SYSTEM HEALTH: 91% TRUST
        </span>
      </CardHeader>

      <CardContent className="p-5 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sources.map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-soft-white block truncate max-w-[220px]">{s.name}</span>
                <span className="text-[10px] text-bio-mint font-medium">{s.quality}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-cool-gray block">{s.latency}</span>
                <span className="text-xs font-mono font-bold text-soft-white">{s.confidence}%</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-cool-gray leading-tight pt-2 border-t border-white/5 italic">
          * Transparent evidence architecture: ORCA cross-validates satellite, numerical models, and terrestrial telemetry to prevent false alarms.
        </p>
      </CardContent>
    </Card>
  );
};
