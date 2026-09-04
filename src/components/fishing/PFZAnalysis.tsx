import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Target, Clock, ShieldCheck, Fish, Activity } from 'lucide-react';
import { mockFishingData } from '../../data/mockFishingData';

export const PFZAnalysis = () => {
  const selectedZone = mockFishingData.zones.find(z => z.id === 'PFZ-03')!;

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-soft-white">
          <Target className="h-4 w-4 text-bio-mint" />
          {selectedZone.id} Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-5 flex flex-col gap-6 overflow-y-auto">
        
        {/* Main Scores */}
        <div className="flex items-center gap-6">
           <div className="flex-1 text-center bg-white/5 border border-white/10 rounded-xl py-4 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-bio-mint"></div>
             <p className="text-[10px] font-bold text-cool-gray uppercase tracking-widest mb-1">Suitability Score</p>
             <p className="text-3xl font-bold text-bio-mint">{selectedZone.suitability}<span className="text-sm text-cool-gray">/100</span></p>
           </div>
           <div className="flex-1 text-center bg-white/5 border border-white/10 rounded-xl py-4 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-electric-lavender"></div>
             <p className="text-[10px] font-bold text-cool-gray uppercase tracking-widest mb-1">AI Confidence</p>
             <p className="text-3xl font-bold text-electric-lavender">91%</p>
           </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#0B0B12] border border-white/5 rounded-lg p-3">
            <p className="text-[9px] font-bold text-cool-gray uppercase tracking-widest mb-1 flex items-center gap-1.5"><MapPinIcon className="w-3 h-3 text-soft-white" /> Distance</p>
            <p className="text-sm font-mono text-soft-white">{selectedZone.distance} km</p>
          </div>
          <div className="bg-[#0B0B12] border border-white/5 rounded-lg p-3">
            <p className="text-[9px] font-bold text-cool-gray uppercase tracking-widest mb-1 flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 text-soft-white" /> Risk</p>
            <p className="text-sm font-bold text-bio-mint uppercase">{selectedZone.risk}</p>
          </div>
          <div className="bg-[#0B0B12] border border-white/5 rounded-lg p-3 col-span-2">
            <p className="text-[9px] font-bold text-cool-gray uppercase tracking-widest mb-1 flex items-center gap-1.5"><Clock className="w-3 h-3 text-soft-white" /> Recommended Window</p>
            <p className="text-sm font-mono text-bio-mint">06:00 AM — 11:30 AM</p>
          </div>
        </div>

        {/* Why this zone */}
        <div className="border-t border-white/5 pt-4">
          <p className="text-[10px] font-bold tracking-widest text-cool-gray uppercase mb-3">Why This Zone?</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-bio-mint bg-bio-mint/10 rounded-full p-0.5 mt-0.5"><Fish className="w-3 h-3" /></span>
              <div>
                 <p className="text-xs font-medium text-soft-white">Favorable SST (28.4°C)</p>
                 <p className="text-[10px] text-cool-gray">Optimal for target pelagic species.</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bio-mint bg-bio-mint/10 rounded-full p-0.5 mt-0.5"><Activity className="w-3 h-3" /></span>
              <div>
                 <p className="text-xs font-medium text-soft-white">High Chlorophyll (1.82 mg/m³)</p>
                 <p className="text-[10px] text-cool-gray">Strong phytoplankton presence detected.</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bio-mint bg-bio-mint/10 rounded-full p-0.5 mt-0.5"><ShieldCheck className="w-3 h-3" /></span>
              <div>
                 <p className="text-xs font-medium text-soft-white">Low Hazard Level</p>
                 <p className="text-[10px] text-cool-gray">Currents and winds are well within safe operating limits.</p>
              </div>
            </li>
          </ul>
        </div>

      </CardContent>
    </Card>
  );
};

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
