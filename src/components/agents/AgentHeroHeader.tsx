import { Bot, Cpu, Sparkles, Activity, Play, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { mockAgentData } from '../../data/mockAgentData';

interface AgentHeroHeaderProps {
  onStartJudgeDemo: () => void;
  activeScenarioTitle: string;
}

export const AgentHeroHeader = ({ onStartJudgeDemo, activeScenarioTitle }: AgentHeroHeaderProps) => {
  const { kpis } = mockAgentData;

  return (
    <Card className="glass-card border-white/10 relative overflow-hidden bg-gradient-to-r from-[#11111A] via-[#161528] to-[#11111A] p-6 shadow-2xl group">
      {/* Background 3D AI Core Watermark Image */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none overflow-hidden">
        <img
          src="/multi_agent_ai_core.jpg"
          alt="3D Multi-Agent Neural Core"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#11111A] to-transparent"></div>
      </div>

      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-aurora-violet/15 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-32 bg-bio-mint/10 blur-3xl pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
        {/* Left: Identity */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-aurora-violet/30 to-electric-lavender/20 border border-electric-lavender/40 shadow-[0_0_25px_rgba(139,92,246,0.3)]">
              <Bot className="w-8 h-8 text-electric-lavender animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-soft-white uppercase tracking-wider">
                  AGENT MONITOR 🤖
                </h1>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-solar-amber/15 border border-solar-amber/30 text-solar-amber uppercase">
                  SIMULATION MODE
                </span>
              </div>
              <p className="text-xs text-cool-gray">
                "Real-Time Multi-Agent Collaboration, Autonomous Reasoning & Decision Intelligence"
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-cool-gray">
            <span className="text-bio-mint font-bold font-mono">8 SPECIALIZED AGENTS</span>
            <span className="text-white/20">•</span>
            <span className="text-electric-lavender font-mono">1 SHARED AI CORE</span>
            <span className="text-white/20">•</span>
            <span className="text-soft-white font-mono">1 COORDINATED DECISION</span>
            <span className="text-white/20">•</span>
            <span className="text-solar-amber font-mono">Active Scenario: {activeScenarioTitle}</span>
          </div>
        </div>

        {/* Center: Live KPI Counters */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 bg-black/40 border border-white/10 p-3 rounded-2xl">
          <div className="text-center px-2">
            <span className="text-[8px] font-bold text-cool-gray uppercase block">Active Agents</span>
            <span className="text-xl font-bold font-mono text-bio-mint">{kpis.activeAgents}</span>
            <span className="text-[8px] text-bio-mint block font-mono">100% Online</span>
          </div>

          <div className="text-center px-2 border-l border-white/5">
            <span className="text-[8px] font-bold text-cool-gray uppercase block">Messages</span>
            <span className="text-xl font-bold font-mono text-soft-white">{kpis.messagesProcessed}</span>
            <span className="text-[8px] text-cool-gray block font-mono">Transmitted</span>
          </div>

          <div className="text-center px-2 border-l border-white/5">
            <span className="text-[8px] font-bold text-cool-gray uppercase block">Decisions</span>
            <span className="text-xl font-bold font-mono text-electric-lavender">{kpis.decisionsGenerated}</span>
            <span className="text-[8px] text-electric-lavender block font-mono">Synthesized</span>
          </div>

          <div className="text-center px-2 border-l border-white/5">
            <span className="text-[8px] font-bold text-cool-gray uppercase block">Avg Latency</span>
            <span className="text-xl font-bold font-mono text-soft-white">{kpis.avgResponseTime}</span>
            <span className="text-[8px] text-bio-mint block font-mono">&plusmn; 40ms</span>
          </div>

          <div className="text-center px-2 border-l border-white/5 col-span-3 sm:col-span-1">
            <span className="text-[8px] font-bold text-cool-gray uppercase block">Confidence</span>
            <span className="text-xl font-bold font-mono text-bio-mint">{kpis.overallConfidence}%</span>
            <span className="text-[8px] text-bio-mint block font-mono">Consensus</span>
          </div>
        </div>

        {/* Right: Judge Demo CTA */}
        <div className="w-full lg:w-48 shrink-0">
          <button
            onClick={onStartJudgeDemo}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-bio-mint to-electric-lavender hover:opacity-90 text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(62,240,181,0.4)] animate-pulse"
          >
            <Play className="w-4 h-4 fill-black" /> 🎬 JUDGE DEMO MODE
          </button>
        </div>
      </div>
    </Card>
  );
};
