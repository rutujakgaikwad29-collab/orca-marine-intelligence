import { Card } from '../ui/Card';
import { X, MessageSquare, ArrowRight, CheckCircle2, Code, ShieldCheck } from 'lucide-react';
import type { AgentMessage } from '../../data/mockAgentData';

interface MessageInspectorModalProps {
  message: AgentMessage | null;
  onClose: () => void;
}

export const MessageInspectorModal = ({ message, onClose }: MessageInspectorModalProps) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 z-[700] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <Card className="glass-card border-electric-lavender/40 max-w-lg w-full p-6 relative bg-[#11111A] shadow-2xl space-y-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-cool-gray hover:text-soft-white bg-white/5 rounded-full"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-3">
          <div className="p-2 rounded-xl bg-electric-lavender/20 text-electric-lavender">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-soft-white uppercase tracking-wider">
              MESSAGE PACKET INSPECTOR
            </h3>
            <span className="text-[10px] font-mono text-bio-mint">
              Packet ID: {message.id} • Protocol: gRPC / AgentBus v2
            </span>
          </div>
        </div>

        {/* Envelope Metadata */}
        <div className="grid grid-cols-2 gap-2.5 text-xs bg-[#0B0B12] border border-white/10 p-3.5 rounded-xl font-mono">
          <div>
            <span className="text-[8px] text-cool-gray uppercase block">Originating Agent</span>
            <span className="font-bold text-soft-white">{message.fromAgent}</span>
          </div>
          <div>
            <span className="text-[8px] text-cool-gray uppercase block">Recipient Node</span>
            <span className="font-bold text-electric-lavender">{message.toAgent}</span>
          </div>
          <div>
            <span className="text-[8px] text-cool-gray uppercase block">Message Schema</span>
            <span className="font-bold text-solar-amber">{message.type}</span>
          </div>
          <div>
            <span className="text-[8px] text-cool-gray uppercase block">Transmit Timestamp</span>
            <span className="text-cool-gray">{message.timestamp}</span>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-xs space-y-1">
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest block">
            Payload Summary
          </span>
          <p className="text-soft-white font-medium">{message.summary}</p>
        </div>

        {/* Payload JSON Inspector */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest flex items-center gap-1">
            <Code className="w-3.5 h-3.5 text-bio-mint" /> Structured JSON Telemetry Payload
          </span>
          <pre className="bg-black/70 border border-white/10 rounded-xl p-3 text-[10px] font-mono text-bio-mint overflow-x-auto">
            {JSON.stringify(message.payload, null, 2)}
          </pre>
        </div>

        {/* Delivery Status */}
        <div className="flex items-center justify-between text-xs pt-1">
          <span className="flex items-center gap-1.5 text-bio-mint font-mono font-bold">
            <CheckCircle2 className="w-4 h-4" /> Status: {message.status}
          </span>
          <span className="font-mono text-cool-gray">Confidence Weight: {message.confidence * 100}%</span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold text-soft-white uppercase tracking-wider transition-colors"
        >
          Close Packet Inspector
        </button>
      </Card>
    </div>
  );
};
