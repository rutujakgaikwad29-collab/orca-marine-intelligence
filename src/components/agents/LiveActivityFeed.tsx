import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { MessageSquare, Pause, Play, Trash2, Filter, Eye, ArrowRight } from 'lucide-react';
import { mockAgentData } from '../../data/mockAgentData';
import type { AgentMessage } from '../../data/mockAgentData';

interface LiveActivityFeedProps {
  onInspectMessage: (msg: AgentMessage) => void;
}

export const LiveActivityFeed = ({ onInspectMessage }: LiveActivityFeedProps) => {
  const [messages, setMessages] = useState<AgentMessage[]>(mockAgentData.messages);
  const [isPaused, setIsPaused] = useState(false);
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredMessages = filterType === 'ALL'
    ? messages
    : messages.filter((m) => m.type === filterType);

  const getMsgTypeBadge = (type: string) => {
    switch (type) {
      case 'WARNING':
        return 'text-solar-amber border-solar-amber/40 bg-solar-amber/10';
      case 'DECISION':
        return 'text-bio-mint border-bio-mint/40 bg-bio-mint/10';
      case 'ROUTE':
        return 'text-electric-lavender border-electric-lavender/40 bg-electric-lavender/10';
      case 'DATA':
      case 'ANALYSIS':
      default:
        return 'text-soft-white border-white/20 bg-white/5';
    }
  };

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-electric-lavender" />
          <CardTitle className="text-sm font-semibold uppercase tracking-widest text-soft-white">
            LIVE AGENT INTER-PROCESS ACTIVITY STREAM
          </CardTitle>
        </div>

        {/* Stream Controls */}
        <div className="flex items-center gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-[#0B0B12] border border-white/10 rounded-lg px-2 py-1 text-[10px] font-mono text-soft-white outline-none"
          >
            <option value="ALL">All Types</option>
            <option value="WARNING">Warnings</option>
            <option value="DECISION">Decisions</option>
            <option value="ROUTE">Routes</option>
            <option value="DATA">Data</option>
          </select>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`p-1.5 rounded-lg border text-xs font-mono transition-colors ${
              isPaused
                ? 'bg-solar-amber/20 border-solar-amber/40 text-solar-amber'
                : 'bg-white/5 border-white/10 text-cool-gray hover:text-soft-white'
            }`}
            title={isPaused ? 'Resume Stream' : 'Pause Stream'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 fill-solar-amber" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setMessages([])}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-coral-red/20 border border-white/10 text-cool-gray hover:text-coral-red transition-colors"
            title="Clear Stream"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-1 overflow-y-auto space-y-2.5 max-h-[460px]">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-12 text-cool-gray text-xs font-mono">
            Stream paused or cleared. Waiting for active agent event bus...
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => onInspectMessage(msg)}
              className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-xl p-3 flex flex-col justify-between transition-all cursor-pointer group/msg relative"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <span className="text-soft-white">{msg.fromAgent}</span>
                  <ArrowRight className="w-3 h-3 text-bio-mint" />
                  <span className="text-cool-gray">{msg.toAgent}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[8px] font-bold uppercase font-mono px-1.5 py-0.2 rounded border ${getMsgTypeBadge(msg.type)}`}>
                    {msg.type}
                  </span>
                  <span className="text-[9px] font-mono text-cool-gray">{msg.timestamp}</span>
                </div>
              </div>

              <p className="text-xs text-soft-white/90 leading-tight my-1">
                {msg.summary}
              </p>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-cool-gray">
                <span className="text-bio-mint">Confidence: {Math.round(msg.confidence * 100)}%</span>
                <span className="text-electric-lavender group-hover/msg:text-soft-white flex items-center gap-1 font-bold">
                  <Eye className="w-3 h-3" /> Inspect Payload
                </span>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
