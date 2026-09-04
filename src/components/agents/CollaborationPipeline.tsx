import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { GitCommit, ArrowRight, User, Fish, CloudRain, Waves, ShieldAlert, Navigation, Fuel, Brain, Bot } from 'lucide-react';

export const CollaborationPipeline = () => {
  const stages = [
    { title: 'User Request', desc: '"Find safest PFZ & route"', icon: User, color: 'text-soft-white', bg: 'bg-white/10' },
    { title: 'Fishing Agent', desc: 'Identifies PFZ-03 (89%)', icon: Fish, color: 'text-bio-mint', bg: 'bg-bio-mint/10' },
    { title: 'Weather Agent', desc: 'Forecasts afternoon wind', icon: CloudRain, color: 'text-solar-amber', bg: 'bg-solar-amber/10' },
    { title: 'Ocean Agent', desc: 'Identifies 0.7 m/s current', icon: Waves, color: 'text-bio-mint', bg: 'bg-bio-mint/10' },
    { title: 'Safety Agent', desc: 'Sets 2.4m swell buffer', icon: ShieldAlert, color: 'text-coral-red', bg: 'bg-coral-red/10' },
    { title: 'Route Agent', desc: 'Computes Route D', icon: Navigation, color: 'text-electric-lavender', bg: 'bg-electric-lavender/10' },
    { title: 'Fuel Agent', desc: 'Estimates 12% savings', icon: Fuel, color: 'text-soft-white', bg: 'bg-white/10' },
    { title: 'Decision Agent', desc: 'Synthesizes consensus', icon: Brain, color: 'text-electric-lavender', bg: 'bg-electric-lavender/10' },
    { title: 'ORCA Recommendation', desc: 'Depart via Route D', icon: Bot, color: 'text-bio-mint', bg: 'bg-bio-mint/20 border-bio-mint' },
  ];

  return (
    <Card className="glass-card border-white/5 relative overflow-hidden">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-bio-mint">
          <GitCommit className="h-4 w-4" />
          END-TO-END MULTI-AGENT DECISION PIPELINE
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          SYNCHRONIZED STEP EXECUTION
        </span>
      </CardHeader>

      <CardContent className="p-5 overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-3 min-w-[980px]">
          {stages.map((st, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 w-36 flex flex-col justify-between h-32 hover:border-white/30 transition-all relative group">
                <div className="flex items-center justify-between">
                  <div className={`p-1.5 rounded-lg border border-white/10 ${st.bg}`}>
                    <st.icon className={`w-4 h-4 ${st.color}`} />
                  </div>
                  <span className="text-[8px] font-mono text-cool-gray">0{i + 1}</span>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-soft-white uppercase tracking-wider">{st.title}</h4>
                  <p className="text-[9px] text-cool-gray leading-tight mt-0.5">{st.desc}</p>
                </div>
              </div>

              {i < stages.length - 1 && (
                <ArrowRight className="w-4 h-4 text-bio-mint/40 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
