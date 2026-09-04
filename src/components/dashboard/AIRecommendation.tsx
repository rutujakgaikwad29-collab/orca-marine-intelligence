import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Clock, ChevronRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { t } from '../../utils/translations';

export const AIRecommendation = () => {
  const { marineData, language } = useAppStore();
  
  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <div className="absolute inset-0 bg-[#0B0B12] z-0"></div>
      <img src="/media_1788276783295.png" className="absolute right-0 top-0 h-full w-2/3 object-cover opacity-60 mix-blend-screen pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B12] via-[#0B0B12]/80 to-transparent z-0 pointer-events-none"></div>
      
      <CardHeader className="pb-3 border-b border-white/5 relative z-10 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-cool-gray">
          <div className="p-1 rounded bg-aurora-violet/20 border border-aurora-violet/30">
             <span className="text-[10px] font-bold text-electric-lavender">AI</span>
          </div>
          {t('ORCA AI Recommendation', language)}
        </CardTitle>
        <span className="text-[10px] text-cool-gray">Updated 2 min ago <span className="ml-1">⋮</span></span>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-5 sm:p-6 relative z-10">
        <p className="text-sm sm:text-base text-soft-white leading-relaxed mb-6">
          High fishing potential detected 18 km southwest. 
          Marine conditions are favorable this morning. 
          Wind speed expected to increase after 2 PM.
        </p>

        <div className="mb-6 inline-flex items-center gap-3 border border-bio-mint/30 rounded-lg p-3 bg-bio-mint/5 self-start">
          <Clock className="h-5 w-5 text-bio-mint drop-shadow-[0_0_8px_rgba(62,240,181,0.6)]" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-bio-mint">Recommended Window</p>
            <p className="text-lg font-mono font-bold text-soft-white tracking-wide">06:00 AM – 11:30 AM</p>
          </div>
        </div>

        <div className="mt-auto grid grid-cols-3 gap-4 border-t border-white/5 pt-5 relative z-10 mb-5">
          <div>
            <p className="text-[10px] font-medium text-cool-gray mb-1">{t('Fishing Score', language)}</p>
            <p className="text-2xl font-bold text-bio-mint">{marineData.fishingScore}%</p>
          </div>
          <div>
            <p className="text-[10px] font-medium text-cool-gray mb-1">{t('Safety Risk', language)}</p>
            <p className={`text-xl font-bold ${marineData.riskScore < 50 ? 'text-solar-amber' : 'text-coral-red'}`}>
              {marineData.riskScore < 50 ? 'MODERATE' : 'HIGH'}
            </p>
          </div>
          <div className="flex flex-col items-start relative">
            <p className="text-[10px] font-medium text-cool-gray mb-1">{t('Confidence', language)}</p>
            <div className="flex items-center gap-3">
              <p className="text-2xl font-bold text-electric-lavender">{marineData.confidence}%</p>
              
              <div className="relative w-8 h-8">
                <svg className="w-8 h-8 transform -rotate-90">
                  <circle cx="16" cy="16" r="14" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="none" />
                  <circle 
                    cx="16" cy="16" r="14" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    fill="none" 
                    className="text-electric-lavender drop-shadow-[0_0_5px_rgba(183,148,246,0.8)]"
                    strokeDasharray="88" 
                    strokeDashoffset={88 - (88 * marineData.confidence) / 100}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Why ORCA Recommends This */}
        <div className="relative z-10 border-t border-white/5 pt-4 mb-4">
          <p className="text-[9px] font-bold tracking-widest text-cool-gray uppercase mb-2">Why ORCA Recommends This:</p>
          <ul className="space-y-1.5">
            <li className="text-xs text-soft-white flex items-start gap-2"><span className="text-bio-mint">✓</span> Favorable sea surface temperature</li>
            <li className="text-xs text-soft-white flex items-start gap-2"><span className="text-bio-mint">✓</span> High chlorophyll concentration</li>
            <li className="text-xs text-soft-white flex items-start gap-2"><span className="text-solar-amber">⚠</span> Wind expected to increase after 2 PM</li>
          </ul>
        </div>

        <div className="mt-auto flex justify-between items-center relative z-10">
          <button className="px-3 py-1.5 border border-aurora-violet/50 rounded bg-aurora-violet/10 text-[10px] font-bold text-electric-lavender uppercase tracking-widest hover:bg-aurora-violet/20 transition-colors">
            Ask Why
          </button>
          <span className="text-[10px] font-bold uppercase tracking-widest text-cool-gray flex items-center gap-1 cursor-pointer hover:text-soft-white transition-colors">
            View Analysis <ChevronRight className="h-3 w-3" />
          </span>
        </div>

      </CardContent>
    </Card>
  );
};
