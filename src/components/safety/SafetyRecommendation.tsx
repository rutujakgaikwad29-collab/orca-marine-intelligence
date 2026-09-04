import { Card, CardContent } from '../ui/Card';
import { ShieldCheck, Navigation, SlidersHorizontal, MessageSquare, MapPin, ArrowRight } from 'lucide-react';

interface SafetyRecommendationProps {
  onNavigate?: (tab: string) => void;
  onScrollToSimulator?: () => void;
}

export const SafetyRecommendation = ({ onNavigate, onScrollToSimulator }: SafetyRecommendationProps) => {
  return (
    <Card className="glass-card border-white/10 relative overflow-hidden bg-gradient-to-r from-coral-red/10 via-[#11111A] to-bio-mint/10 p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        {/* Left Operational Synthesis */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-solar-amber/20 border border-solar-amber/40">
              <ShieldCheck className="w-5 h-5 text-solar-amber" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-soft-white uppercase tracking-widest">
                ORCA STRATEGIC SAFETY ADVISORY
              </h3>
              <span className="text-[10px] text-bio-mint font-mono font-bold">
                ADAPTIVE DECISION SUPPORT • ACTIVE MONITORING
              </span>
            </div>
          </div>

          <p className="text-xs text-soft-white/90 leading-relaxed">
            "Current conditions indicate a <strong className="text-solar-amber">MODERATE RISK (42/100)</strong> profile for your vessel class. Significant wave heights will rise past 2.4m after 14:00 hrs. Consider executing an early morning departure window or selecting the sheltered inshore coastal route to minimize roll amplitude."
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-[9px] font-bold uppercase">
            <span className="px-2.5 py-1 rounded-full bg-bio-mint/10 border border-bio-mint/30 text-bio-mint">
              Departure Window: 06:00 — 11:30 AM
            </span>
            <span className="px-2.5 py-1 rounded-full bg-solar-amber/10 border border-solar-amber/30 text-solar-amber">
              Return Transit: Before 14:00 hrs
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-soft-white">
              Recommended Route: Inshore Passage Bravo
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:w-56 shrink-0">
          <button
            onClick={() => onNavigate && onNavigate('route')}
            className="w-full py-2.5 px-3 bg-bio-mint/20 hover:bg-bio-mint/30 border border-bio-mint/50 rounded-lg text-xs font-bold text-bio-mint uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(62,240,181,0.2)]"
          >
            <Navigation className="w-3.5 h-3.5" /> View Safe Route
          </button>

          <button
            onClick={onScrollToSimulator}
            className="w-full py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-soft-white uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-electric-lavender" /> Open Simulator
          </button>

          <button
            onClick={() => onNavigate && onNavigate('ask')}
            className="w-full py-2 px-3 bg-white/5 hover:bg-electric-lavender/20 border border-white/10 hover:border-electric-lavender/40 rounded-lg text-xs font-bold text-soft-white hover:text-electric-lavender uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5 text-electric-lavender" /> Ask ORCA Reasoning
          </button>
        </div>

      </div>
    </Card>
  );
};
