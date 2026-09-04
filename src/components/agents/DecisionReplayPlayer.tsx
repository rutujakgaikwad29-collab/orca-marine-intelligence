import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Play, Pause, RotateCcw, ChevronRight, CheckCircle2, Sparkles, Brain } from 'lucide-react';
import { mockAgentData } from '../../data/mockAgentData';
import type { ScenarioDefinition } from '../../data/mockAgentData';

interface DecisionReplayPlayerProps {
  scenario: ScenarioDefinition;
}

export const DecisionReplayPlayer = ({ scenario }: DecisionReplayPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= scenario.timeline.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1600);
    }
    return () => clearInterval(timer);
  }, [isPlaying, scenario]);

  const activeTimelineItem = scenario.timeline[currentStepIndex];

  return (
    <Card id="decision-replay" className="glass-card border-bio-mint/40 relative overflow-hidden bg-gradient-to-r from-bio-mint/5 via-[#11111A] to-electric-lavender/5 shadow-2xl">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-bio-mint/20 text-bio-mint border border-bio-mint/40">
            <Play className="w-4 h-4 fill-bio-mint" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold uppercase tracking-widest text-soft-white">
              60-SECOND DECISION REPLAY & TIMELINE SCRUBBER
            </CardTitle>
            <span className="text-[10px] text-bio-mint font-mono font-bold">
              SIH PRESENTATION ENGINE: STEP-BY-STEP REASONING INSPECTION
            </span>
          </div>
        </div>

        {/* Play Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              isPlaying
                ? 'bg-solar-amber text-black'
                : 'bg-bio-mint text-black shadow-[0_0_15px_rgba(62,240,181,0.4)]'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-black" /> Pause
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-black" /> Replay Decision
              </>
            )}
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIndex(0);
            }}
            className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-cool-gray hover:text-soft-white border border-white/10"
            title="Reset Timeline"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-6">
        {/* Timeline Scrubber Step Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {scenario.timeline.map((step, idx) => {
            const isCurrent = currentStepIndex === idx;
            const isPassed = currentStepIndex >= idx;

            return (
              <button
                key={idx}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStepIndex(idx);
                }}
                className={`p-2.5 rounded-xl border text-left transition-all relative ${
                  isCurrent
                    ? 'bg-bio-mint/20 border-bio-mint text-soft-white shadow-[0_0_15px_rgba(62,240,181,0.3)]'
                    : isPassed
                    ? 'bg-white/10 border-white/20 text-soft-white'
                    : 'bg-white/2 border-white/5 text-cool-gray opacity-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[8px] font-mono text-bio-mint font-bold">{step.time}</span>
                  {isPassed && <CheckCircle2 className="w-3 h-3 text-bio-mint" />}
                </div>
                <span className="text-[9px] font-bold block truncate">{step.agent}</span>
                <span className="text-[8px] text-cool-gray truncate block mt-0.5">{step.event}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Telemetry Display */}
        {activeTimelineItem && (
          <div className="bg-[#0B0B12] border border-white/10 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-bio-mint/20 border border-bio-mint/40 text-bio-mint flex items-center justify-center font-bold text-xs">
                  0{currentStepIndex + 1}
                </span>
                <div>
                  <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest block">
                    Active Executing Node
                  </span>
                  <h4 className="text-sm font-bold text-soft-white font-mono">
                    {activeTimelineItem.agent}
                  </h4>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold text-bio-mint uppercase bg-bio-mint/10 px-2.5 py-1 rounded-full border border-bio-mint/30">
                Timestamp: {activeTimelineItem.time}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-soft-white block">
                {activeTimelineItem.event}
              </span>
              <p className="text-xs text-cool-gray leading-relaxed">
                {activeTimelineItem.detail}
              </p>
            </div>
          </div>
        )}

        {/* Final Synthesized Decision Summary */}
        <div className="bg-gradient-to-r from-bio-mint/10 to-transparent border border-bio-mint/30 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <Brain className="w-5 h-5 text-bio-mint shrink-0" />
            <div>
              <span className="text-[9px] font-bold text-bio-mint uppercase tracking-widest block">
                Final Coordinated Decision (Confidence {scenario.finalDecision.confidence}%)
              </span>
              <p className="text-soft-white font-medium">{scenario.finalDecision.actionText}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px] shrink-0">
            <span className="text-soft-white">Route: <strong className="text-bio-mint">{scenario.finalDecision.route}</strong></span>
            <span className="text-soft-white">Risk: <strong className={scenario.finalDecision.risk > 50 ? 'text-coral-red' : 'text-bio-mint'}>{scenario.finalDecision.risk}/100</strong></span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
