import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Anchor, Navigation, ShieldCheck, Clock, MapPin, ArrowRight } from 'lucide-react';
import { mockSafetyData } from '../../data/mockSafetyData';

interface SafeHarboursProps {
  onNavigateToRoute?: (harbourName: string) => void;
}

export const SafeHarbours = ({ onNavigateToRoute }: SafeHarboursProps) => {
  const { safeHarbours } = mockSafetyData;

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-bio-mint">
          <Anchor className="h-4 w-4" />
          NEAREST EMERGENCY SAFE HARBOURS & REFUGE
        </CardTitle>
        <span className="text-[10px] font-bold text-soft-white font-mono">
          3 Designated Refuges Identified
        </span>
      </CardHeader>

      <CardContent className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div className="space-y-2.5">
          {safeHarbours.map((h) => (
            <div
              key={h.id}
              className="bg-white/5 border border-white/10 hover:border-bio-mint/40 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all group/h"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-soft-white">{h.name}</h4>
                  <span className="text-[9px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-1.5 py-0.2 rounded">
                    Score: {h.safetyScore}/100
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[10px] text-cool-gray font-mono">
                  <span>Distance: <strong className="text-soft-white">{h.distance}</strong></span>
                  <span>•</span>
                  <span>ETA: <strong className="text-solar-amber">{h.eta}</strong></span>
                  <span>•</span>
                  <span>Channel Depth: {h.depth}</span>
                  <span>•</span>
                  <span>VHF: {h.vhfChannel}</span>
                </div>

                <p className="text-[10px] text-cool-gray">{h.facilities}</p>
              </div>

              <button
                onClick={() => onNavigateToRoute && onNavigateToRoute(h.name)}
                className="w-full sm:w-auto py-2 px-3 rounded-lg bg-bio-mint/15 hover:bg-bio-mint/25 border border-bio-mint/40 text-bio-mint font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shrink-0"
              >
                <Navigation className="w-3 h-3" /> Navigate <ArrowRight className="w-2.5 h-2.5" />
              </button>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-cool-gray italic pt-2 border-t border-white/5">
          * Port depths calibrated with hydrographic survey tidal curves for keel safety.
        </p>
      </CardContent>
    </Card>
  );
};
