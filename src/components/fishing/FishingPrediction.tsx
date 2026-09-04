import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { BrainCircuit } from 'lucide-react';

export const FishingPrediction = () => {
  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-electric-lavender">
          <BrainCircuit className="h-4 w-4" />
          AI FISHING PREDICTION
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-5 flex flex-col gap-5 overflow-y-auto">
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-cool-gray uppercase tracking-widest mb-1">Predicted Suitability</p>
            <p className="text-3xl font-bold text-bio-mint">89%</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-cool-gray uppercase tracking-widest mb-1">Model Status</p>
            <div className="flex items-center gap-1.5 justify-end">
              <span className="w-2 h-2 rounded-full bg-bio-mint animate-pulse"></span>
              <span className="text-xs font-bold text-soft-white uppercase tracking-widest">Active</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-4">
          <p className="text-[10px] font-bold text-cool-gray uppercase tracking-widest mb-3">Weighted Feature Importance</p>
          
          <div className="space-y-3">
            {[
              { label: 'Chlorophyll', val: 92 },
              { label: 'SST', val: 90 },
              { label: 'Historical Data', val: 84 },
              { label: 'Ocean Conditions', val: 81 },
              { label: 'Weather', val: 74 },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-cool-gray w-28 truncate">{feature.label}</span>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-electric-lavender" style={{ width: `${feature.val}%` }}></div>
                  </div>
                  <span className="text-[9px] font-mono text-soft-white w-6 text-right">{feature.val}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4">
          <div className="bg-aurora-violet/10 border border-aurora-violet/30 rounded-lg p-3">
            <p className="text-[9px] font-bold text-electric-lavender uppercase tracking-widest mb-1">ML Model</p>
            <p className="text-xs font-bold text-soft-white mb-1">XGBoost Gradient Predictor</p>
            <p className="text-[10px] text-cool-gray">Fuses 8 environmental and historical features to classify zone productivity likelihood.</p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
