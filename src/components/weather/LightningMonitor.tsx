import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Zap, ShieldCheck, AlertCircle } from 'lucide-react';
import { mockWeatherData } from '../../data/mockWeatherData';

export const LightningMonitor = () => {
  const { lightningDetails } = mockWeatherData;

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-solar-amber">
          <Zap className="h-4 w-4" />
          LIGHTNING & CONVECTIVE MONITOR
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint uppercase tracking-widest bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          Risk: {lightningDetails.riskLevel}
        </span>
      </CardHeader>

      <CardContent className="p-4 flex-1 flex flex-col justify-between gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest block">Activity Level</span>
            <span className="text-xl font-bold text-bio-mint font-mono mt-1 block">{lightningDetails.activity}</span>
          </div>

          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest block">Detected Strike Cells</span>
            <span className="text-xl font-bold text-soft-white font-mono mt-1 block">{lightningDetails.detectedCells}</span>
          </div>
        </div>

        <div className="bg-[#0B0B12] border border-white/10 p-3 rounded-xl flex items-center justify-between">
          <span className="text-[10px] text-cool-gray uppercase tracking-widest">Nearest Convective Cell</span>
          <span className="text-xs font-mono font-bold text-bio-mint">{lightningDetails.nearestLightning}</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-cool-gray">
          <ShieldCheck className="w-4 h-4 text-bio-mint shrink-0" />
          <span>{lightningDetails.warning}</span>
        </div>
      </CardContent>
    </Card>
  );
};
