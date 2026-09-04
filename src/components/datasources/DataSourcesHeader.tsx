import { Database, RefreshCw, Activity, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';
import { mockDataSources } from '../../data/mockDataSources';

interface DataSourcesHeaderProps {
  onRefresh: () => void;
  refreshing: boolean;
}

export const DataSourcesHeader = ({ onRefresh, refreshing }: DataSourcesHeaderProps) => {
  const { kpis } = mockDataSources;

  return (
    <Card className="glass-card border-white/10 relative overflow-hidden bg-gradient-to-r from-[#11111A] via-[#161B28] to-[#11111A] p-6 shadow-2xl">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-bio-mint/10 blur-3xl pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-bio-mint/20 border border-bio-mint/40 text-bio-mint shadow-[0_0_25px_rgba(62,240,181,0.3)]">
              <Database className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-soft-white uppercase tracking-wider">
                  DATA SOURCES & INGESTION HUB 🛰️
                </h1>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-bio-mint/15 border border-bio-mint/30 text-bio-mint uppercase">
                  ALL 6 FEEDS LIVE
                </span>
              </div>
              <p className="text-xs text-cool-gray">
                "Real-Time Ingestion, Earth Observation Satellites, Hydrodynamic Models & Vessel IoT Feeds"
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-cool-gray">
            <span className="text-bio-mint font-bold font-mono">ISRO & Copernicus Satellites Linked</span>
            <span className="text-white/20">•</span>
            <span className="text-electric-lavender font-mono">INCOIS ROMS High-Res Active</span>
            <span className="text-white/20">•</span>
            <span className="text-solar-amber font-mono">IMD WRF 3km Weather Matrix</span>
            <span className="text-white/20">•</span>
            <span className="text-soft-white font-mono">Overall Trust: 94%</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 w-full lg:w-auto shrink-0">
          <div className="bg-[#0B0B12] border border-white/10 px-3 py-2 rounded-xl text-center font-mono text-xs">
            <span className="text-[8px] text-cool-gray block uppercase">Ingestion Throughput</span>
            <span className="font-bold text-bio-mint">{kpis.ingestRate}</span>
          </div>

          <button
            onClick={onRefresh}
            className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-soft-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-bio-mint' : ''}`} />
            Sync Feeds
          </button>
        </div>
      </div>
    </Card>
  );
};
