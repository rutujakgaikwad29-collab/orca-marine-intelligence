import { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Brain, MapPin, Send, Mic, AlertCircle, Sparkles } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { t } from '../utils/translations';

interface MessageMetrics {
  confidence: number;
  agents: string[];
}

interface Message {
  id: number;
  type: 'user' | 'agent';
  content: string;
  metrics?: MessageMetrics | null;
}

export const AskORCA = () => {
  const { language } = useAppStore();
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'agent',
      content: language === 'hi' ? 'नमस्ते! मैं ORCA हूँ, आपका समुद्री बुद्धिमत्ता सहायक। मैं आपकी कैसे मदद कर सकता हूँ?' 
             : language === 'mr' ? 'नमस्कार! मी ORCA आहे. मी तुम्हाला कशी मदत करू शकतो?' 
             : 'Hello! I am ORCA, your Marine Ecosystem Reasoning Agent. How can I assist you today?',
      metrics: null
    }
  ]);

  const handleSend = (textToSend?: string) => {
    const q = textToSend || query;
    if (!q.trim()) return;
    
    // Add user message
    const userMsg: Message = {
      id: messages.length + 1,
      type: 'user',
      content: q,
      metrics: null
    };
    
    setMessages(prev => [...prev, userMsg]);
    
    const userQuery = q;
    setQuery('');

    setTimeout(() => {
      const agentMsg: Message = {
        id: messages.length + 2,
        type: 'agent',
        content: `Based on the latest marine telemetry and satellite data for Ratnagiri Coast, conditions are favorable for ${userQuery.includes('fish') || userQuery.includes('मासे') ? 'fishing in Zone AS-03 (23 km West)' : 'your route'}. Wave height is moderate at 1.4m and wind speed is 18km/h SW. Return before 16:30 hrs recommended.`,
        metrics: {
          confidence: 94,
          agents: ['Marine Habitat Agent', 'ISRO Satellite Telemetry', 'Safety Risk Evaluator']
        }
      };
      setMessages(prev => [...prev, agentMsg]);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-5xl mx-auto w-full gap-4 text-slate-900">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-blue-600 rounded-2xl text-white shadow-md shadow-blue-500/20">
          <Brain className="h-6 w-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">{t('Ask ORCA', language)}</h1>
            <span className="rounded-full bg-blue-50 px-3 py-0.5 text-xs font-bold tracking-wider uppercase text-blue-700 border border-blue-200">
              {t('GPT-4 Marine Model', language)}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Conversational Marine Intelligence & Satellite Reasoning</p>
        </div>
      </div>

      {/* Chat History Card */}
      <Card className="flex-1 flex flex-col overflow-hidden bg-white border border-slate-200 shadow-sm rounded-3xl">
        <CardContent className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-5 ${
                msg.type === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-sm shadow-md shadow-blue-500/20' 
                  : 'bg-white border border-slate-200 text-slate-900 rounded-tl-sm shadow-sm'
              }`}>
                {msg.type === 'agent' && (
                  <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-slate-100">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest font-mono">
                      {t('ORCA MULTI-AGENT REASONING', language)}
                    </span>
                  </div>
                )}
                
                <p className="text-sm sm:text-base leading-relaxed font-medium">{msg.content}</p>
                
                {msg.metrics && (
                  <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-xl text-xs font-bold">
                      <AlertCircle className="h-3.5 w-3.5 text-emerald-600" />
                      {msg.metrics.confidence}% Confidence
                    </div>
                    {msg.metrics.agents.map((agent: string) => (
                      <div key={agent} className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-xl text-xs font-semibold">
                        <MapPin className="h-3 w-3 text-blue-600" />
                        {agent}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>

        {/* Clean White & Blue Input Area */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-white">
          <div className="flex items-center gap-2 max-w-4xl mx-auto relative group">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t('Ask about fishing zones, weather safety, or optimized routes...', language)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-full pl-5 pr-24 py-3.5 sm:py-4 text-sm sm:text-base focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none text-slate-900 placeholder:text-slate-400 transition-all shadow-inner font-medium"
            />
            <div className="absolute right-2 flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 h-8 w-8 sm:h-10 sm:w-10 transition-colors"
                title="Voice Input"
              >
                <Mic className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button 
                size="icon" 
                onClick={() => handleSend()} 
                className="rounded-full h-8 w-8 sm:h-10 sm:w-10 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25 border-none transition-all"
              >
                <Send className="h-4 w-4 sm:h-5 sm:w-5 ml-0.5" />
              </Button>
            </div>
          </div>
          
          {/* Clickable Quick Prompts */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mt-3 text-xs font-semibold text-slate-500">
            <span 
              onClick={() => handleSend("Where is the nearest PFZ?")}
              className="cursor-pointer hover:text-blue-600 hover:underline transition-colors"
            >
              "Where is the nearest PFZ?"
            </span>
            <span 
              onClick={() => handleSend("Is it safe to go fishing tomorrow?")}
              className="hidden sm:inline cursor-pointer hover:text-blue-600 hover:underline transition-colors"
            >
              "Is it safe to go fishing tomorrow?"
            </span>
            <span 
              onClick={() => handleSend("आज समुद्रात जाणे सुरक्षित आहे का?")}
              className="hidden md:inline cursor-pointer hover:text-blue-600 hover:underline transition-colors"
            >
              "आज समुद्रात जाणे सुरक्षित आहे का?"
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
