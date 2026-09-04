import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Bell, Check, VolumeX, Volume2, Navigation, Eye, AlertTriangle, ShieldCheck, Info } from 'lucide-react';
import type { AlertItem, AlertSeverity } from '../../data/mockAlertsData';

interface AlertCardListProps {
  alerts: AlertItem[];
  activeFilter: 'ALL' | AlertSeverity;
  onFilterChange: (filter: 'ALL' | AlertSeverity) => void;
  onToggleAcknowledge: (id: string) => void;
  onToggleMute: (id: string) => void;
  onNavigateAction: (key?: string) => void;
}

export const AlertCardList = ({
  alerts,
  activeFilter,
  onFilterChange,
  onToggleAcknowledge,
  onToggleMute,
  onNavigateAction,
}: AlertCardListProps) => {
  const filteredAlerts = activeFilter === 'ALL'
    ? alerts
    : alerts.filter((a) => a.severity === activeFilter);

  const getSeverityPill = (sev: AlertSeverity) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-coral-red/15 text-coral-red border-coral-red/40';
      case 'HIGH':
        return 'bg-solar-amber/15 text-solar-amber border-solar-amber/40';
      case 'MEDIUM':
        return 'bg-electric-lavender/15 text-electric-lavender border-electric-lavender/40';
      case 'INFO':
      default:
        return 'bg-bio-mint/15 text-bio-mint border-bio-mint/40';
    }
  };

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-solar-amber" />
          <CardTitle className="text-sm font-semibold uppercase tracking-widest text-soft-white">
            ACTIVE EARLY WARNING & DISPATCH QUEUE
          </CardTitle>
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'ALL', label: 'All Alerts' },
            { id: 'CRITICAL', label: '🔴 Critical' },
            { id: 'HIGH', label: '🟠 High' },
            { id: 'MEDIUM', label: '🟡 Medium' },
            { id: 'INFO', label: '🔵 Info' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onFilterChange(tab.id as any)}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                activeFilter === tab.id
                  ? 'bg-bio-mint text-black font-bold shadow-[0_0_10px_rgba(62,240,181,0.3)]'
                  : 'bg-white/5 border border-white/10 text-cool-gray hover:text-soft-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-1 overflow-y-auto space-y-3 max-h-[580px]">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12 text-cool-gray text-xs font-mono">
            No alerts found in selected severity tier.
          </div>
        ) : (
          filteredAlerts.map((a) => (
            <div
              key={a.id}
              className={`border rounded-2xl p-4 transition-all space-y-3 ${
                a.acknowledged
                  ? 'bg-white/2 border-white/5 opacity-60'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[8px] font-bold font-mono px-2 py-0.5 rounded border uppercase ${getSeverityPill(a.severity)}`}>
                      {a.severity}
                    </span>
                    <h4 className="text-xs font-bold text-soft-white">{a.title}</h4>
                  </div>
                  <span className="text-[10px] text-cool-gray font-mono block">
                    Location: {a.location} • Ingested: {a.source}
                  </span>
                </div>

                <span className="text-[10px] font-mono text-cool-gray shrink-0">{a.timestamp}</span>
              </div>

              <p className="text-xs text-soft-white/90 leading-relaxed">
                {a.description}
              </p>

              {/* Numerical metric pills */}
              {a.metrics && a.metrics.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[10px]">
                  {a.metrics.map((m, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-black/50 border border-white/10 text-cool-gray">
                      {m.label}: <strong className="text-soft-white">{m.value}</strong>
                    </span>
                  ))}
                </div>
              )}

              {/* Recommended Action Box */}
              <div className="bg-[#0B0B12] border border-white/10 rounded-xl p-2.5 flex items-center justify-between text-xs">
                <span className="text-[10px] text-bio-mint font-bold">
                  Guidance: {a.recommendedAction}
                </span>

                {a.actionRouteKey && (
                  <button
                    onClick={() => onNavigateAction(a.actionRouteKey)}
                    className="text-[9px] font-bold font-mono text-electric-lavender hover:text-soft-white uppercase flex items-center gap-1 shrink-0 ml-2"
                  >
                    Open Tab &rarr;
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px]">
                <button
                  onClick={() => onToggleMute(a.id)}
                  className={`px-2.5 py-1 rounded font-bold uppercase flex items-center gap-1 transition-colors ${
                    a.muted
                      ? 'bg-solar-amber/20 text-solar-amber'
                      : 'bg-white/5 hover:bg-white/10 text-cool-gray'
                  }`}
                >
                  {a.muted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                  {a.muted ? 'Muted' : 'Mute Alert'}
                </button>

                <button
                  onClick={() => onToggleAcknowledge(a.id)}
                  className={`px-3 py-1 rounded font-bold uppercase flex items-center gap-1 transition-colors ${
                    a.acknowledged
                      ? 'bg-bio-mint/20 text-bio-mint'
                      : 'bg-bio-mint hover:bg-bio-mint/90 text-black shadow-sm'
                  }`}
                >
                  <Check className="w-3 h-3" />
                  {a.acknowledged ? 'Acknowledged' : 'Acknowledge'}
                </button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
