import { Card, CardContent } from '../ui/Card';
import { Brain, MessageSquare, Fish, Navigation, ShieldCheck, CheckCircle, ArrowRight } from 'lucide-react';

interface MarineBriefProps {
  onNavigate?: (tab: string) => void;
}

export const MarineBrief = ({ onNavigate }: MarineBriefProps) => {
  return (
    <Card className="glass-card border-white/10 relative overflow-hidden bg-gradient-to-r from-aurora-violet/10 via-[#11111A] to-bio-mint/10 p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left Brief Info */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-aurora-violet/20 border border-aurora-violet/40">
              <Brain className="w-5 h-5 text-electric-lavender" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-soft-white uppercase tracking-widest">
                ORCA EXECUTIVE MARINE OPERATIONAL BRIEF
              </h2>
              <span className="text-[10px] text-bio-mint font-mono font-bold">
                MULTI-AGENT CONSENSUS REACHED • CONFIDENCE 91%
              </span>
            </div>
          </div>

          <p className="text-xs text-soft-white/90 leading-relaxed">
            <span className="font-bold text-bio-mint">Current Situation: </span>
            Marine conditions along the Ratnagiri shelf are highly favorable for pelagic operations throughout the morning window. Moderate SW winds will intensify past 14:00 hrs with significant wave heights reaching 2.1m.
          </p>

          <p className="text-xs text-soft-white/90 leading-relaxed">
            <span className="font-bold text-solar-amber">Recommended Operational Action: </span>
            Execute departure during the 06:00 AM — 07:30 AM tidal flood. Target PFZ-03 and initiate inbound transit prior to 02:00 PM to avoid heightened chop.
          </p>

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[9px] font-bold uppercase px-2.5 py-1 rounded-full bg-bio-mint/10 border border-bio-mint/30 text-bio-mint">
              Fishing: FAVORABLE
            </span>
            <span className="text-[9px] font-bold uppercase px-2.5 py-1 rounded-full bg-solar-amber/10 border border-solar-amber/30 text-solar-amber">
              Navigation: SAFE WITH CAUTION
            </span>
            <span className="text-[9px] font-bold uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-soft-white">
              Weather: STABLE
            </span>
            <span className="text-[9px] font-bold uppercase px-2.5 py-1 rounded-full bg-electric-lavender/10 border border-electric-lavender/30 text-electric-lavender">
              Waves: MODERATE (1.2m)
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:w-56 shrink-0">
          <button
            onClick={() => onNavigate && onNavigate('ask')}
            className="w-full py-2.5 px-3 bg-gradient-to-r from-aurora-violet/30 to-electric-lavender/30 hover:from-aurora-violet/50 hover:to-electric-lavender/50 border border-electric-lavender/40 rounded-lg text-xs font-bold text-soft-white uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)]"
          >
            <MessageSquare className="w-3.5 h-3.5 text-electric-lavender" /> Ask ORCA Reasoning
          </button>

          <button
            onClick={() => onNavigate && onNavigate('fishing')}
            className="w-full py-2 px-3 bg-white/5 hover:bg-bio-mint/20 border border-white/10 hover:border-bio-mint/40 rounded-lg text-xs font-bold text-soft-white hover:text-bio-mint uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
          >
            <Fish className="w-3.5 h-3.5" /> View Fishing Zones
          </button>

          <button
            onClick={() => onNavigate && onNavigate('route')}
            className="w-full py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-soft-white uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
          >
            <Navigation className="w-3.5 h-3.5" /> Plan Safe Route
          </button>

          <button
            onClick={() => onNavigate && onNavigate('safety')}
            className="w-full py-2 px-3 bg-white/5 hover:bg-solar-amber/20 border border-white/10 hover:border-solar-amber/40 rounded-lg text-xs font-bold text-soft-white hover:text-solar-amber uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Open Safety Center
          </button>
        </div>
      </div>
    </Card>
  );
};
