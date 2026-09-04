import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { X, Bot, ArrowRight, Cpu, Database, CheckCircle2, ShieldCheck } from 'lucide-react';
import type { AgentInfo } from '../../data/mockAgentData';

interface AgentDetailModalProps {
  agent: AgentInfo | null;
  onClose: () => void;
}

export const AgentDetailModal = ({ agent, onClose }: AgentDetailModalProps) => {
  if (!agent) return null;

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <Card className="glass-card border-white/10 max-w-xl w-full p-6 relative bg-[#11111A] shadow-2xl space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-cool-gray hover:text-soft-white bg-white/5 rounded-full"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-3">
          <span className="text-3xl">{agent.icon}</span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-soft-white uppercase tracking-wider">
                {agent.name}
              </h3>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-bio-mint/10 text-bio-mint border border-bio-mint/30">
                {agent.confidence}% Confidence
              </span>
            </div>
            <p className="text-xs text-cool-gray">{agent.role}</p>
          </div>
        </div>

        {/* Current Task Banner */}
        <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-xs space-y-1">
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest block">
            Current Autonomous Task
          </span>
          <p className="font-mono text-soft-white font-bold">{agent.currentTask}</p>
        </div>

        {/* Input -> Processing -> Output Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Inputs */}
          <div className="bg-[#0B0B12] border border-white/10 p-3 rounded-xl space-y-2">
            <span className="text-[9px] font-bold text-electric-lavender uppercase tracking-widest block">
              Observed Vector Inputs
            </span>
            <div className="space-y-1 font-mono text-[10px]">
              {Object.entries(agent.inputs).map(([key, val]) => (
                <div key={key} className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-cool-gray">{key}:</span>
                  <span className="text-soft-white font-bold">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Outputs */}
          <div className="bg-[#0B0B12] border border-white/10 p-3 rounded-xl space-y-2">
            <span className="text-[9px] font-bold text-bio-mint uppercase tracking-widest block">
              Synthesized Outputs
            </span>
            <div className="space-y-1 font-mono text-[10px]">
              {Object.entries(agent.outputs).map(([key, val]) => (
                <div key={key} className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-cool-gray">{key}:</span>
                  <span className="text-bio-mint font-bold">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dispatches To & Health Telemetry */}
        <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest block">
              Message Dispatch Targets
            </span>
            <div className="flex flex-wrap items-center gap-1.5 mt-1">
              {agent.destinations.map((d, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-black/40 border border-white/10 text-[9px] font-mono text-soft-white flex items-center gap-1"
                >
                  <ArrowRight className="w-2.5 h-2.5 text-bio-mint" /> {d}
                </span>
              ))}
            </div>
          </div>

          <div className="text-right text-[10px] font-mono text-cool-gray border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-3">
            <span>CPU: <strong className="text-soft-white">{agent.health.cpu}</strong></span> • 
            <span> RAM: <strong className="text-soft-white">{agent.health.memory}</strong></span> • 
            <span> Latency: <strong className="text-bio-mint">{agent.health.latency}</strong></span>
          </div>
        </div>

        {/* Data Provenance Source */}
        <div className="flex items-center justify-between text-[10px] text-cool-gray pt-1">
          <span className="flex items-center gap-1">
            <Database className="w-3 h-3 text-bio-mint" /> Source: <strong className="text-soft-white">{agent.dataSource}</strong>
          </span>
          <span className="font-mono">Processing: {agent.processingTimeMs} ms</span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold text-soft-white uppercase tracking-wider transition-colors"
        >
          Close Inspector
        </button>
      </Card>
    </div>
  );
};
