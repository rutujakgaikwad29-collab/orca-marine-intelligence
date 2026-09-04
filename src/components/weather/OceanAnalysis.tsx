import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Brain, Sparkles, CheckCircle2 } from 'lucide-react';
import { mockWeatherData } from '../../data/mockWeatherData';

export const OceanAnalysis = () => {
  const { oceanAnalysis } = mockWeatherData;

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-electric-lavender">
          <Brain className="h-4 w-4" />
          ORCA MULTI-AGENT OCEAN REASONING
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          Confidence: {oceanAnalysis.confidence}%
        </span>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-bio-mint" />
            <span className="text-[10px] font-bold text-cool-gray uppercase tracking-widest">Synthesized Ocean State Analysis</span>
          </div>
          <p className="text-xs text-soft-white/95 leading-relaxed bg-white/5 border border-white/10 p-3.5 rounded-xl">
            "{oceanAnalysis.stateText}"
          </p>
        </div>

        {/* Factors Breakdown */}
        <div>
          <p className="text-[10px] font-bold text-cool-gray uppercase tracking-widest mb-3">Model Confidence Weighting</p>
          <div className="space-y-2.5">
            {oceanAnalysis.factors.map((f, i) => (
              <div key={i} className="flex items-center gap-3 text-xs">
                <span className="text-cool-gray font-mono w-20 truncate">{f.name}</span>
                <div className="flex-1 bg-black/40 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-electric-lavender rounded-full" style={{ width: `${f.score}%` }}></div>
                </div>
                <span className="text-[10px] font-mono font-bold text-soft-white w-8 text-right">{f.score}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-cool-gray">
          <span className="flex items-center gap-1 text-bio-mint font-medium">
            <CheckCircle2 className="w-3 h-3" /> Fused from 4 Real-Time Ocean Models
          </span>
          <span className="font-mono">SIMULATION INFERENCE</span>
        </div>
      </CardContent>
    </Card>
  );
};
