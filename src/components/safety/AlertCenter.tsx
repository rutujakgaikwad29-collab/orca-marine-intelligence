import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Bell, Check, Eye, VolumeX, AlertTriangle, ShieldAlert } from 'lucide-react';
import { mockSafetyData } from '../../data/mockSafetyData';
import type { SafetyAlert } from '../../data/mockSafetyData';

interface AlertCenterProps {
  onInspectAlert?: (alert: SafetyAlert) => void;
}

export const AlertCenter = ({ onInspectAlert }: AlertCenterProps) => {
  const [alerts, setAlerts] = useState<SafetyAlert[]>(mockSafetyData.alerts);

  const handleAcknowledge = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: !a.acknowledged } : a))
    );
  };

  const getSeverityStyle = (sev: string) => {
    switch (sev) {
      case 'CRITICAL':
      case 'HIGH':
        return 'text-coral-red border-coral-red/40 bg-coral-red/10';
      case 'MODERATE':
        return 'text-solar-amber border-solar-amber/40 bg-solar-amber/10';
      case 'LOW':
      default:
        return 'text-bio-mint border-bio-mint/40 bg-bio-mint/10';
    }
  };

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-cool-gray">
          <Bell className="h-4 w-4 text-solar-amber" />
          SAFETY ALERT & EARLY WARNING TIMELINE
        </CardTitle>
        <span className="text-[10px] font-bold text-soft-white font-mono">
          {alerts.filter((a) => !a.acknowledged).length} Active Alerts
        </span>
      </CardHeader>

      <CardContent className="p-4 flex-1 overflow-y-auto space-y-3">
        {alerts.map((a) => (
          <div
            key={a.id}
            className={`border rounded-xl p-3.5 transition-all ${
              a.acknowledged
                ? 'bg-white/2 border-white/5 opacity-60'
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <div className="flex items-center gap-2">
                <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded border font-mono ${getSeverityStyle(a.severity)}`}>
                  {a.severity}
                </span>
                <h4 className="text-xs font-bold text-soft-white">{a.title}</h4>
              </div>
              <span className="text-[10px] font-mono text-cool-gray">{a.timestamp}</span>
            </div>

            <p className="text-xs text-cool-gray leading-relaxed mb-3">{a.description}</p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-[10px]">
              <span className="text-bio-mint font-mono truncate max-w-[200px]">
                Trigger: {a.detectedVal} (Limit: {a.threshold})
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onInspectAlert && onInspectAlert(a)}
                  className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-soft-white font-bold uppercase flex items-center gap-1 transition-colors"
                >
                  <Eye className="w-3 h-3" /> Inspect Evidence
                </button>

                <button
                  onClick={() => handleAcknowledge(a.id)}
                  className={`px-2 py-1 rounded font-bold uppercase flex items-center gap-1 transition-colors ${
                    a.acknowledged
                      ? 'bg-bio-mint/20 text-bio-mint'
                      : 'bg-white/5 hover:bg-bio-mint/15 text-cool-gray hover:text-bio-mint'
                  }`}
                >
                  <Check className="w-3 h-3" /> {a.acknowledged ? 'Acknowledged' : 'Ack'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
