import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Cpu, Users, Activity, ShieldCheck, Database, Server, ArrowRight } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-12 fade-in">
      <Card className="glass-card border-electric-lavender/40 p-6 relative overflow-hidden bg-gradient-to-r from-[#11111A] via-[#1B162C] to-[#11111A] shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚙️</span>
              <h1 className="text-2xl font-bold text-soft-white tracking-wide">
                ORCA Core Infrastructure & Multi-Agent Admin Command
              </h1>
            </div>
            <p className="text-xs text-cool-gray">
              Administrator: <strong className="text-soft-white">{user?.name}</strong> • Global Cluster: DeepMind Ocean AI Node 01
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
              <span className="text-bio-mint font-bold">8/8 Agent Microservices Online</span>
              <span className="text-white/20">•</span>
              <span className="text-electric-lavender font-bold">Avg Latency: 42 ms</span>
              <span className="text-white/20">•</span>
              <span className="text-soft-white font-bold">Uptime: 99.98%</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/agents')}
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-bio-mint to-electric-lavender text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.4)] shrink-0"
          >
            <Cpu className="w-4 h-4 fill-black" /> 🤖 Open ORCA AI Core
          </button>
        </div>
      </Card>

      {/* Admin Infrastructure Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card border-white/5 p-4 flex flex-col justify-between">
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest">Active User Sessions</span>
          <span className="text-3xl font-extrabold text-soft-white font-mono my-1">1,248</span>
          <span className="text-[9px] text-bio-mint font-mono">342 Vessel Telemetry Streams</span>
        </Card>

        <Card className="glass-card border-white/5 p-4 flex flex-col justify-between">
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest">Agent Message Influx</span>
          <span className="text-3xl font-extrabold text-electric-lavender font-mono my-1">4.2k / min</span>
          <span className="text-[9px] text-bio-mint font-mono">Zero Message Queue Backlog</span>
        </Card>

        <Card className="glass-card border-white/5 p-4 flex flex-col justify-between">
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest">API Gateway Health</span>
          <span className="text-3xl font-extrabold text-bio-mint font-mono my-1">100%</span>
          <span className="text-[9px] text-bio-mint font-mono">FastAPI / gRPC Router OK</span>
        </Card>

        <Card className="glass-card border-white/5 p-4 flex flex-col justify-between">
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest">Data Lake Ingest Rate</span>
          <span className="text-3xl font-extrabold text-solar-amber font-mono my-1">128 MB/s</span>
          <span className="text-[9px] text-soft-white font-mono">INCOIS + IMD + MODIS Feeds</span>
        </Card>
      </div>

      {/* Action Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card border-white/5 p-5 space-y-3">
          <h3 className="text-xs font-bold text-soft-white uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-electric-lavender" /> Multi-Agent Cluster Orchestrator
          </h3>
          <p className="text-xs text-soft-white/90 leading-relaxed">
            Monitor real-time LangGraph node execution, agent-to-agent conflict resolution logs, and decision consensus pipelines.
          </p>
          <button
            onClick={() => navigate('/agents')}
            className="w-full py-2 bg-electric-lavender/20 hover:bg-electric-lavender/30 border border-electric-lavender/50 rounded-xl text-xs font-bold text-electric-lavender uppercase tracking-wider transition-colors"
          >
            Open Multi-Agent Monitor &rarr;
          </button>
        </Card>

        <Card className="glass-card border-white/5 p-5 space-y-3">
          <h3 className="text-xs font-bold text-soft-white uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-bio-mint" /> Role-Based Access & Security Audit
          </h3>
          <p className="text-xs text-soft-white/90 leading-relaxed">
            Inspect RBAC permissions, active JWT sessions, cryptographic audit trails, and multi-channel emergency broadcast gateways.
          </p>
          <button
            onClick={() => navigate('/settings')}
            className="w-full py-2 bg-bio-mint/20 hover:bg-bio-mint/30 border border-bio-mint/50 rounded-xl text-xs font-bold text-bio-mint uppercase tracking-wider transition-colors"
          >
            Manage System Policies &rarr;
          </button>
        </Card>
      </div>
    </div>
  );
};
