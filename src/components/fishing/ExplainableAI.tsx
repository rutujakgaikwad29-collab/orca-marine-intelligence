import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Lightbulb, ArrowRight } from 'lucide-react';

export const ExplainableAI = () => {
  return (
    <Card className="flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-cool-gray">
          <Lightbulb className="h-4 w-4 text-solar-amber" />
          Why ORCA Recommends PFZ-03
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 overflow-x-auto hide-scrollbar">
        
        <div className="flex items-center gap-4 min-w-max">
          {[
            { step: 1, title: 'SST', val: '28.4°C', desc: 'Favorable for target species' },
            { step: 2, title: 'CHLOROPHYLL', val: '1.82 mg/m³', desc: 'Indicates productive waters' },
            { step: 3, title: 'OCEAN CONDITIONS', val: 'Moderate', desc: 'Supports productivity' },
            { step: 4, title: 'HISTORICAL DATA', val: 'High', desc: 'Above-average catch' },
            { step: 5, title: 'SAFETY', val: 'Safe', desc: 'No major hazard detected' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 relative">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 w-48 flex flex-col relative z-10 hover:border-white/30 transition-colors">
                <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-electric-lavender flex items-center justify-center text-[10px] font-bold text-black border-2 border-[#11111A]">
                  {item.step}
                </div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-cool-gray mb-1">{item.title}</p>
                <p className="text-sm font-bold text-soft-white mb-2">{item.val}</p>
                <p className="text-[10px] text-cool-gray leading-tight">{item.desc}</p>
              </div>
              {i < 4 && <ArrowRight className="w-5 h-5 text-white/20 relative z-0" />}
            </div>
          ))}
          
          <ArrowRight className="w-5 h-5 text-white/20 relative z-0" />

          <div className="bg-bio-mint/10 border border-bio-mint/30 rounded-xl p-4 w-48 flex flex-col relative z-10 shadow-[0_0_20px_rgba(62,240,181,0.15)]">
             <p className="text-[10px] font-bold tracking-widest uppercase text-bio-mint mb-1">FINAL DECISION</p>
             <p className="text-sm font-bold text-soft-white">PFZ-03 Recommended</p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
