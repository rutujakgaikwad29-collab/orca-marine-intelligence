import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Lightbulb, ArrowRight, ShieldAlert, CheckCircle2, HelpCircle, X } from 'lucide-react';
import { mockSafetyData } from '../../data/mockSafetyData';
import type { SafetyAlert } from '../../data/mockSafetyData';

export const WhyRiskExplainable = () => {
  const [inspectAlert, setInspectAlert] = useState<SafetyAlert | null>(null);
  const { alerts } = mockSafetyData;

  const reasoningSteps = [
    {
      num: '1',
      title: 'Wave Swell Steepness',
      val: '2.4 m (+24%)',
      reason: 'Significant wave height crosses operational threshold for &lt;15m hulls.',
      badge: 'Major Factor',
      badgeColor: 'text-solar-amber border-solar-amber/30 bg-solar-amber/10',
    },
    {
      num: '2',
      title: 'Afternoon Wind Gusts',
      val: '38 km/h SW',
      reason: 'Crosswind vector induces 1.2 kt leeway on westerly return courses.',
      badge: 'Moderate',
      badgeColor: 'text-solar-amber border-solar-amber/30 bg-solar-amber/10',
    },
    {
      num: '3',
      title: 'Geofence Buffer',
      val: '6.2 NM West',
      reason: 'Trajectory approaches naval exercise firing sector safety envelope.',
      badge: 'Geofence Notice',
      badgeColor: 'text-bio-mint border-bio-mint/30 bg-bio-mint/10',
    },
    {
      num: '4',
      title: 'Lightning Discharge',
      val: '18.4 km Inland',
      reason: 'Cluster moving away from maritime corridor; low atmospheric threat.',
      badge: 'Low Threat',
      badgeColor: 'text-bio-mint border-bio-mint/30 bg-bio-mint/10',
    },
  ];

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-solar-amber">
          <Lightbulb className="h-4 w-4" />
          EXPLAINABLE AI: WHY IS SAFETY RISK EVALUATED AS "MODERATE"?
        </CardTitle>
        <span className="text-[10px] font-bold text-soft-white font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded">
          4 Key Primary Drivers
        </span>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-5">
        {/* Step-by-step causal chain */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {reasoningSteps.map((step) => (
            <div
              key={step.num}
              className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex flex-col justify-between relative hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="w-5 h-5 rounded-full bg-solar-amber/20 border border-solar-amber text-[10px] font-mono font-bold text-solar-amber flex items-center justify-center">
                  {step.num}
                </span>
                <span className={`text-[8px] font-bold uppercase px-1.5 py-0.2 rounded border ${step.badgeColor}`}>
                  {step.badge}
                </span>
              </div>

              <div>
                <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest block">
                  {step.title}
                </span>
                <p className="text-sm font-bold font-mono text-soft-white mt-0.5">{step.val}</p>
                <p
                  className="text-[10px] text-cool-gray leading-tight mt-1.5"
                  dangerouslySetInnerHTML={{ __html: step.reason }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Signature UX: "WHY THIS ALERT?" Inspector Trigger Bar */}
        <div className="bg-[#0B0B12] border border-white/10 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-5 h-5 text-electric-lavender shrink-0" />
            <div>
              <span className="text-xs font-bold text-soft-white uppercase tracking-wider block">
                Evidence-Based Alert Inspector ("Why This Alert?")
              </span>
              <span className="text-[10px] text-cool-gray">
                Click any active alert to inspect exact numerical triggers, thresholds, and sensor provenance.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {alerts.map((alt) => (
              <button
                key={alt.id}
                onClick={() => setInspectAlert(alt)}
                className="text-[9px] font-mono font-bold px-2 py-1 rounded bg-white/5 hover:bg-electric-lavender/20 border border-white/10 hover:border-electric-lavender/40 text-soft-white transition-all flex items-center gap-1"
              >
                Inspect {alt.title.split(' ')[0]} <ArrowRight className="w-2.5 h-2.5" />
              </button>
            ))}
          </div>
        </div>

        {/* Signature Feature Modal: "WHY THIS ALERT?" */}
        {inspectAlert && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <Card className="glass-card border-white/10 max-w-lg w-full p-6 relative bg-[#11111A] shadow-2xl">
              <button
                onClick={() => setInspectAlert(null)}
                className="absolute top-4 right-4 p-1.5 text-cool-gray hover:text-soft-white bg-white/5 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <ShieldAlert className="w-5 h-5 text-solar-amber" />
                <h3 className="text-sm font-bold text-soft-white uppercase tracking-wider">
                  WHY THIS ALERT? — EXPLAINABLE EVIDENCE
                </h3>
              </div>

              <div className="bg-[#0B0B12] border border-white/10 p-4 rounded-xl space-y-2.5 text-xs mb-4">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-cool-gray">Alert Identity:</span>
                  <span className="font-bold text-soft-white">{inspectAlert.title}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-cool-gray">Detected Value:</span>
                  <span className="font-mono font-bold text-coral-red">{inspectAlert.detectedVal}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-cool-gray">Configured Safety Threshold:</span>
                  <span className="font-mono text-solar-amber">{inspectAlert.threshold}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-cool-gray">Data Provenance / Model:</span>
                  <span className="font-mono text-bio-mint">{inspectAlert.source}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cool-gray">Seakeeping Impact:</span>
                  <span className="text-soft-white font-medium">{inspectAlert.impact}</span>
                </div>
              </div>

              <div className="bg-bio-mint/10 border border-bio-mint/30 p-3 rounded-lg text-xs mb-4">
                <span className="text-[10px] font-bold text-bio-mint uppercase tracking-widest block mb-0.5">
                  ORCA RECOMMENDED COUNTER-ACTION:
                </span>
                <p className="text-soft-white">{inspectAlert.recommendation}</p>
              </div>

              <button
                onClick={() => setInspectAlert(null)}
                className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold text-soft-white uppercase tracking-wider transition-colors"
              >
                Close Inspector
              </button>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
