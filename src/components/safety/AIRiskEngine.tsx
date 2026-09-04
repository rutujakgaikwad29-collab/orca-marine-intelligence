import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Brain, Sparkles, CheckCircle2 } from 'lucide-react';
import { mockSafetyData } from '../../data/mockSafetyData';

interface AIRiskEngineProps {
  riskScore: number;
}

export const AIRiskEngine = ({ riskScore }: AIRiskEngineProps) => {
  const { riskFactors } = mockSafetyData;

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-electric-lavender">
          <Brain className="h-4 w-4" />
          ORCA AI MULTI-FACTOR RISK ENGINE
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          DECOMPOSED SCORE: {riskScore}/100
        </span>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-cool-gray uppercase tracking-widest block mb-3">
            Weighted Factor Contribution Breakdown
          </span>

          <div className="space-y-3">
            {riskFactors.map((rf, i) => {
              const percent = Math.round((rf.score / rf.max) * 100);

              return (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-soft-white font-medium">{rf.name}</span>
                      <span className="text-[9px] text-cool-gray font-mono">({rf.weight})</span>
                    </div>
                    <span className="font-mono font-bold text-soft-white">
                      {rf.score} / {rf.max} pts
                    </span>
                  </div>

                  <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        percent > 60 ? 'bg-solar-amber' : 'bg-bio-mint'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <span className="text-[9px] text-cool-gray block leading-none">{rf.desc}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-bio-mint shrink-0" />
            <span className="text-soft-white">Fuzzy Multi-Attribute Utility Function (MAUF)</span>
          </div>
          <span className="text-[10px] font-mono text-bio-mint font-bold uppercase">XGBoost Safety Model</span>
        </div>
      </CardContent>
    </Card>
  );
};
