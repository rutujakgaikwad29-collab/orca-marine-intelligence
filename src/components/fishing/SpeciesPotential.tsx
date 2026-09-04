import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Fish, Info } from 'lucide-react';
import { mockFishingData } from '../../data/mockFishingData';

export const SpeciesPotential = () => {
  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      {/* Background Holographic Fish Visual */}
      <img
        src="/holographic_fish.jpg"
        alt="3D Holographic Marine Species"
        className="absolute right-0 bottom-0 h-48 w-48 object-cover opacity-20 pointer-events-none rounded-full blur-[1px] group-hover:opacity-30 group-hover:scale-110 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#11111A] via-transparent to-transparent pointer-events-none"></div>

      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 relative z-10">
        <CardTitle className="text-sm font-semibold flex items-center justify-between uppercase tracking-widest text-cool-gray">
          <div className="flex items-center gap-2"><Fish className="h-4 w-4 text-solar-amber" /> Species Potential</div>
          <Info className="h-3 w-3 text-cool-gray" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-4 flex flex-col gap-3">
        
        {mockFishingData.species.map((sp, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-soft-white">{sp.name}</span>
              <span className="text-[10px] text-cool-gray flex items-center gap-1 mt-0.5">
                Likelihood: <span className={sp.potential === 'HIGH' ? 'text-bio-mint font-bold' : 'text-solar-amber font-bold'}>{sp.potential}</span>
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest text-cool-gray mb-1">Confidence</span>
              <span className="text-sm font-mono text-soft-white font-bold">{sp.confidence}%</span>
            </div>
          </div>
        ))}
        
        <div className="mt-2 text-[9px] text-cool-gray italic text-center opacity-70">
          Species predictions represent likelihood, not guaranteed presence.
        </div>
      </CardContent>
    </Card>
  );
};
