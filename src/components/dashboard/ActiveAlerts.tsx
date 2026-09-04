import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const ActiveAlerts = () => {
  const { alerts } = useAppStore();

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return <AlertCircle className="h-5 w-5 text-coral-red drop-shadow-[0_0_8px_rgba(255,92,119,0.8)]" />;
      case 'HIGH': return <AlertCircle className="h-5 w-5 text-coral-red drop-shadow-[0_0_8px_rgba(255,92,119,0.8)]" />;
      case 'MODERATE': return <AlertTriangle className="h-5 w-5 text-solar-amber drop-shadow-[0_0_8px_rgba(255,181,71,0.8)]" />;
      default: return <Info className="h-5 w-5 text-bio-mint drop-shadow-[0_0_8px_rgba(62,240,181,0.8)]" />;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': 
      case 'HIGH': return 'border-coral-red/30 bg-coral-red/5';
      case 'MODERATE': return 'border-solar-amber/30 bg-solar-amber/5';
      default: return 'border-bio-mint/30 bg-bio-mint/5';
    }
  };

  const getAlertTextColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': 
      case 'HIGH': return 'text-coral-red';
      case 'MODERATE': return 'text-solar-amber';
      default: return 'text-bio-mint';
    }
  };

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-cool-gray">
          <AlertCircle className="h-4 w-4 text-electric-lavender drop-shadow-[0_0_8px_rgba(183,148,246,0.6)]" />
          Active Alerts
        </CardTitle>
        <span className="text-[10px] font-bold text-electric-lavender uppercase tracking-widest cursor-pointer hover:text-soft-white transition-colors">View All</span>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-cool-gray">
            <Info className="h-8 w-8 mb-2 opacity-50 text-bio-mint" />
            <p className="text-sm">No active alerts</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-3 rounded-lg border ${getAlertColor(alert.severity)} transition-colors hover:bg-white/5`}
            >
              <div className="flex gap-3">
                <div className="mt-0.5">{getAlertIcon(alert.severity)}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${getAlertTextColor(alert.severity)}`}>
                      {alert.severity}
                    </p>
                    <span className="text-[10px] text-cool-gray">
                      {Math.floor((Date.now() - new Date(alert.timestamp).getTime()) / 60000)} min ago
                    </span>
                  </div>
                  <p className="text-xs text-soft-white leading-relaxed">{alert.description}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
