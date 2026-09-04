import { Card, CardContent } from '../ui/Card';
import { Sparkles, Navigation, Play, HelpCircle, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface OrcaRecommendationProps {
  onStartSimulation: () => void;
  onViewWhy: () => void;
  onNavigateToLiveMap: () => void;
}

export const OrcaRecommendation = ({
  onStartSimulation,
  onViewWhy,
  onNavigateToLiveMap,
}: OrcaRecommendationProps) => {
  return (
    <Card className="glass-card border-bio-mint/30 relative overflow-hidden bg-gradient-to-r from-bio-mint/10 via-[#11111A] to-aurora-violet/10 p-6 shadow-[0_0_30px_rgba(62,240,181,0.15)]">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        {/* Left Recommendation Brief */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-bio-mint/20 border border-bio-mint/50 shadow-[0_0_15px_rgba(62,240,181,0.4)]">
              <Sparkles className="w-5 h-5 text-bio-mint" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-soft-white uppercase tracking-widest">
                  ORCA RECOMMENDS: ROUTE D (BALANCED SHELF PASSAGE)
                </h3>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-bio-mint/20 text-bio-mint border border-bio-mint/40">
                  SCORE 96 / 100
                </span>
              </div>
              <span className="text-[10px] text-cool-gray font-mono">
                CONVERGENT MULTI-AGENT PARETO SELECTION
              </span>
            </div>
          </div>

          <p className="text-xs text-soft-white/95 leading-relaxed">
            "Route D avoids the dangerous 2.4m wave swell sector by maintaining a 3.8 NM eastward leeward buffer, while harnessing a favorable <strong className="text-bio-mint">+0.7 m/s southwest ocean current</strong> for 8 km. This achieves a <strong className="text-bio-mint">12% fuel savings</strong> compared to the direct line with negligible travel time penalty."
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-[9px] font-bold uppercase">
            <span className="px-2.5 py-1 rounded-full bg-bio-mint/15 border border-bio-mint/30 text-bio-mint flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Low Risk (21/100)
            </span>
            <span className="px-2.5 py-1 rounded-full bg-electric-lavender/15 border border-electric-lavender/30 text-electric-lavender flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Favorable Current Vector
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-soft-white flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Zero Geofence Conflicts
            </span>
            <span className="px-2.5 py-1 rounded-full bg-solar-amber/15 border border-solar-amber/30 text-solar-amber flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Destination PFZ: 89% Suitability
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:w-56 shrink-0">
          <button
            onClick={onStartSimulation}
            className="w-full py-2.5 px-3 bg-bio-mint hover:bg-bio-mint/90 text-black font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(62,240,181,0.4)]"
          >
            <Play className="w-4 h-4 fill-black" /> SIMULATE JOURNEY
          </button>

          <button
            onClick={onViewWhy}
            className="w-full py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-soft-white uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5 text-electric-lavender" /> View Why ORCA Chose This
          </button>

          <button
            onClick={onNavigateToLiveMap}
            className="w-full py-2 px-3 bg-white/5 hover:bg-electric-lavender/20 border border-white/10 hover:border-electric-lavender/40 rounded-lg text-xs font-bold text-soft-white hover:text-electric-lavender uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
          >
            <Navigation className="w-3.5 h-3.5" /> View on Live Marine Map
          </button>
        </div>

      </div>
    </Card>
  );
};
