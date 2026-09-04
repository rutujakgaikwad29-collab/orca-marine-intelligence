import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Activity, MessageSquare, Clock, Cpu, ChevronRight } from 'lucide-react';
import { mockAgentData } from '../../data/mockAgentData';
import type { AgentInfo } from '../../data/mockAgentData';

interface AgentCardGridProps {
  onSelectAgent: (agent: AgentInfo) => void;
  selectedAgentId?: string;
}

export const AgentCardGrid = ({ onSelectAgent, selectedAgentId }: AgentCardGridProps) => {
  const { agents } = mockAgentData;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'WARNING':
        return 'text-solar-amber border-solar-amber/40 bg-solar-amber/10';
      case 'ERROR':
        return 'text-coral-red border-coral-red/40 bg-coral-red/10';
      case 'COMPLETED':
        return 'text-bio-mint border-bio-mint/40 bg-bio-mint/10';
      case 'ANALYZING':
      case 'COORDINATING':
      default:
        return 'text-electric-lavender border-electric-lavender/40 bg-electric-lavender/10';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-cool-gray tracking-widest uppercase flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-bio-mint" /> SPECIALIZED MARINE AGENTS INVENTORY
        </h2>
        <span className="text-[10px] font-mono text-cool-gray">8 Autonomous Nodes</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {agents.map((ag) => {
          const isSelected = selectedAgentId === ag.id;

          return (
            <Card
              key={ag.id}
              onClick={() => onSelectAgent(ag)}
              className={`p-3.5 flex flex-col justify-between h-[190px] transition-all cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? 'glass-card border-2 shadow-[0_0_20px_rgba(62,240,181,0.2)] bg-white/5'
                  : 'glass-card border-white/5 hover:border-white/20'
              }`}
              style={{ borderColor: isSelected ? ag.strokeColor : undefined }}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{ag.icon}</span>
                    <div>
                      <h4 className="text-xs font-bold text-soft-white">{ag.name}</h4>
                      <span className="text-[8px] font-mono text-cool-gray uppercase block">{ag.role}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-1">
                  <span className={`text-[8px] font-bold uppercase font-mono px-2 py-0.5 rounded border inline-block ${getStatusBadge(ag.status)}`}>
                    ● {ag.status}
                  </span>
                </div>

                <p className="text-[10px] text-cool-gray line-clamp-2 leading-tight">
                  <strong className="text-soft-white">Task: </strong>{ag.currentTask}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-cool-gray">
                <span className="text-bio-mint font-bold">{ag.confidence}% Trust</span>
                <span>{ag.messagesCount} Msgs</span>
                <span className="text-soft-white group-hover:text-bio-mint font-bold flex items-center">
                  Inspect <ChevronRight className="w-2.5 h-2.5 ml-0.5" />
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
