
import { Card, CardContent } from '../components/ui/Card';
import { useLocation } from 'react-router-dom';
import { MessageSquare, Map, Fish, CloudRain, ShieldAlert, Route, Cpu, Bell, Database, Settings } from 'lucide-react';

const pageData: Record<string, { title: string, icon: any, desc: string }> = {
  '/ask': { title: 'Ask ORCA', icon: MessageSquare, desc: 'AI Conversational Interface' },
  '/map': { title: 'Live Marine Map', icon: Map, desc: 'Advanced Geospatial Analysis' },
  '/fishing': { title: 'Fishing Intelligence', icon: Fish, desc: 'PFZ and Suitability Analysis' },
  '/weather': { title: 'Weather & Ocean', icon: CloudRain, desc: 'Meteorological & Oceanographic Data' },
  '/safety': { title: 'Safety Center', icon: ShieldAlert, desc: 'Risk & Hazard Management' },
  '/route': { title: 'Route Planner', icon: Route, desc: 'Smart Navigation & Routing' },
  '/agents': { title: 'Agent Monitor', icon: Cpu, desc: 'Multi-Agent System Status' },
  '/alerts': { title: 'Alerts', icon: Bell, desc: 'Real-time Notifications' },
  '/data': { title: 'Data Sources', icon: Database, desc: 'API & Satellite Telemetry' },
  '/settings': { title: 'Settings', icon: Settings, desc: 'System Configuration' },
};

export const PlaceholderPage = () => {
  const location = useLocation();
  const data = pageData[location.pathname] || { title: 'Coming Soon', icon: Settings, desc: 'Under construction' };
  
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <Card className="max-w-md w-full p-10 text-center border-dashed border-2 bg-transparent dark:bg-transparent shadow-none">
        <CardContent className="flex flex-col items-center justify-center space-y-4 p-0">
          <div className="rounded-full bg-ocean-blue/10 p-4 dark:bg-ocean-cyan/10">
            <data.icon className="h-10 w-10 text-ocean-blue dark:text-ocean-cyan" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">{data.title}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">{data.desc}</p>
          
          <div className="mt-8 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold tracking-wider text-slate-600 dark:bg-slate-800 dark:text-slate-400 uppercase">
            Phase 2
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
