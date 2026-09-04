import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Lightbulb, ArrowDown, ArrowRight, Brain, CheckCircle2 } from 'lucide-react';

export const RouteReasoning = () => {
  const steps = [
    {
      agent: 'Weather Agent',
      action: 'Wind Forecast Ingestion',
      detail: 'Detected increasing wind (38 km/h) on direct Route B after 14:00 hrs.',
      color: 'text-solar-amber',
    },
    {
      agent: 'Ocean Agent',
      action: 'Wave Swell Analysis',
      detail: 'Identified elevated wave heights (2.8m) on Route B outer corridor.',
      color: 'text-coral-red',
    },
    {
      agent: 'Safety Agent',
      action: 'Risk Classification',
      detail: 'Classified direct route as Moderate/High risk for medium craft class.',
      color: 'text-solar-amber',
    },
    {
      agent: 'Geofence Agent',
      action: 'Spatial Buffer Check',
      detail: 'Verified Route D maintains 6.2 NM clearance from Naval Sector 4.',
      color: 'text-bio-mint',
    },
    {
      agent: 'Current Agent',
      action: 'Drift Velocity Matching',
      detail: 'Detected +0.7 m/s southwest current alignment along Route D leg 2.',
      color: 'text-bio-mint',
    },
    {
      agent: 'Fuel Agent',
      action: 'Hydrodynamic Drag Modeling',
      detail: 'Calculated 12% lower fuel consumption due to current vector assist.',
      color: 'text-bio-mint',
    },
  ];

  return (
    <Card id="route-reasoning" className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-solar-amber">
          <Lightbulb className="h-4 w-4" />
          EXPLAINABLE AI: WHY ORCA CHOSE ROUTE D
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          6-STAGE REASONING PIPELINE
        </span>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex flex-col justify-between hover:border-white/20 transition-all relative group/step"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-mono font-bold text-cool-gray">
                  STEP 0{idx + 1}
                </span>
                <span className={`text-[10px] font-bold font-mono ${step.color}`}>
                  {step.agent}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-soft-white">{step.action}</h4>
                <p className="text-[10px] text-cool-gray leading-tight mt-1">
                  {step.detail}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center gap-1 text-[9px] text-bio-mint font-mono mt-2">
                <CheckCircle2 className="w-2.5 h-2.5" /> Evaluated & Passed
              </div>
            </div>
          ))}
        </div>

        {/* Final Decision Box */}
        <div className="bg-bio-mint/10 border border-bio-mint/30 rounded-xl p-3.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <Brain className="w-5 h-5 text-bio-mint shrink-0" />
            <div>
              <span className="text-xs font-bold text-bio-mint uppercase tracking-wider block">
                CONVERGENT DECISION: ROUTE D DESIGNATED AS PRIMARY
              </span>
              <span className="text-[10px] text-cool-gray">
                Evidence synthesis proves Route D achieves Pareto-superiority in safety, fuel efficiency, and mission success.
              </span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-soft-white font-mono hidden sm:block">
            ORCA Confidence: 96%
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
