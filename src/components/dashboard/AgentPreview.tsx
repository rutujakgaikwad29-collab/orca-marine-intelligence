import { MessageSquare, Fish, CloudRain, ShieldAlert, Map, Brain, Network, ArrowDown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

export const AgentPreview = () => {
  const agents = [
    { name: 'Conversational Agent', status: 'Listening', color: 'text-bio-mint', dot: 'bg-bio-mint', icon: MessageSquare },
    { name: 'Marine & Fisheries Agent', status: 'Analyzing PFZ', color: 'text-solar-amber', dot: 'bg-solar-amber', icon: Fish },
    { name: 'Research & Analytics', status: 'Processing patterns', color: 'text-cool-gray', dot: 'bg-cool-gray', icon: Network },
    { name: 'Ocean & Weather Agent', status: 'Forecasting conditions', color: 'text-bio-mint', dot: 'bg-bio-mint', icon: CloudRain },
    { name: 'Safety & Hazard Agent', status: 'Monitoring hazards', color: 'text-solar-amber', dot: 'bg-solar-amber', icon: ShieldAlert },
    { name: 'Geospatial Agent', status: 'Checking boundaries', color: 'text-bio-mint', dot: 'bg-bio-mint', icon: Map },
    { name: 'Reasoning Agent', status: 'Synthesizing decision', color: 'text-aurora-violet', dot: 'bg-aurora-violet', icon: Brain },
  ];

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-cool-gray">
          AI AGENT ACTIVITY
        </CardTitle>
        <span className="text-[10px] font-bold text-electric-lavender uppercase tracking-widest cursor-pointer hover:text-soft-white transition-colors">Open Monitor</span>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
        
        {/* Agent List */}
        <div className="space-y-1">
          {agents.map((agent) => (
            <div key={agent.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors group/item cursor-pointer">
              <div className="flex items-center gap-3">
                <agent.icon className={`h-4 w-4 ${agent.color} opacity-70 group-hover/item:opacity-100 transition-opacity`} />
                <span className="text-xs sm:text-sm font-medium text-soft-white">{agent.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${agent.dot} shadow-[0_0_5px_currentColor] animate-pulse`}></span>
                <span className={`text-[9px] sm:text-[10px] font-bold tracking-widest uppercase ${agent.color}`}>
                  {agent.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Reasoning Flow */}
        <div className="border-t border-white/5 pt-4">
          <p className="text-[9px] font-bold tracking-widest text-cool-gray uppercase mb-4 text-center">Live Reasoning Flow</p>
          
          <div className="flex flex-col items-center text-xs text-soft-white font-medium">
            <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full mb-1">User Query</div>
            <ArrowDown className="w-3 h-3 text-cool-gray mb-1 animate-bounce" />
            <div className="bg-bio-mint/10 border border-bio-mint/30 text-bio-mint px-3 py-1.5 rounded-full mb-1">Conversational Agent</div>
            <ArrowDown className="w-3 h-3 text-cool-gray mb-1 animate-bounce" style={{ animationDelay: '0.2s' }} />
            
            <div className="grid grid-cols-2 gap-2 p-2 border border-white/10 rounded-lg bg-black/20 mb-1">
              <span className="text-[9px] text-cool-gray flex items-center gap-1"><Fish className="w-3 h-3 text-solar-amber"/> Marine</span>
              <span className="text-[9px] text-cool-gray flex items-center gap-1"><CloudRain className="w-3 h-3 text-bio-mint"/> Weather</span>
              <span className="text-[9px] text-cool-gray flex items-center gap-1"><ShieldAlert className="w-3 h-3 text-solar-amber"/> Safety</span>
              <span className="text-[9px] text-cool-gray flex items-center gap-1"><Map className="w-3 h-3 text-bio-mint"/> Geospatial</span>
            </div>
            <ArrowDown className="w-3 h-3 text-cool-gray mb-1 animate-bounce" style={{ animationDelay: '0.4s' }} />
            
            <div className="bg-aurora-violet/10 border border-aurora-violet/30 text-electric-lavender px-3 py-1.5 rounded-full mb-1 flex items-center gap-1">
              <Brain className="w-3 h-3" /> Reasoning Engine
            </div>
            <ArrowDown className="w-3 h-3 text-cool-gray mb-1 animate-bounce" style={{ animationDelay: '0.6s' }} />
            <div className="text-[10px] font-bold text-bio-mint uppercase tracking-widest">Final Recommendation</div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
