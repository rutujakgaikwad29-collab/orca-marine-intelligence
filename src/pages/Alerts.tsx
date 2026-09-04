import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { mockAlertsData } from '../data/mockAlertsData';
import type { AlertItem, AlertSeverity } from '../data/mockAlertsData';

import { AlertHeader } from '../components/alerts/AlertHeader';
import { CriticalEmergencyBanner } from '../components/alerts/CriticalEmergencyBanner';
import { MultiDeviceBroadcastDemo } from '../components/alerts/MultiDeviceBroadcastDemo';
import { AlertCardList } from '../components/alerts/AlertCardList';
import { AlertThresholdConfig } from '../components/alerts/AlertThresholdConfig';
import { VoiceSirenController } from '../components/alerts/VoiceSirenController';
import { AlertHistoryLog } from '../components/alerts/AlertHistoryLog';

export const Alerts = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<AlertItem[]>(mockAlertsData.activeAlerts);
  const [activeFilter, setActiveFilter] = useState<'ALL' | AlertSeverity>('ALL');
  const [refreshing, setRefreshing] = useState(false);

  const handleToggleAcknowledge = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: !a.acknowledged } : a))
    );
  };

  const handleToggleMute = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, muted: !a.muted } : a))
    );
  };

  const handleTriggerMockEmergency = () => {
    const critical = alerts.find((a) => a.severity === 'CRITICAL');
    if (critical) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(critical.voiceMessage);
        window.speechSynthesis.speak(u);
      }
    }
  };

  const handleNavigateAction = (key?: string) => {
    if (!key) return;
    switch (key) {
      case 'route':
        navigate('/route');
        break;
      case 'fishing':
        navigate('/fishing');
        break;
      case 'safety':
        navigate('/safety');
        break;
      case 'weather':
        navigate('/weather');
        break;
      case 'map':
        navigate('/map');
        break;
      default:
        break;
    }
  };

  const criticalAlert = alerts.find((a) => a.severity === 'CRITICAL') || alerts[0];
  const activeUnresolvedCount = alerts.filter((a) => !a.acknowledged).length;
  const criticalCount = alerts.filter((a) => a.severity === 'CRITICAL').length;

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-12 fade-in">
      {/* 1. TOP ALERT HEADER */}
      <section>
        <AlertHeader
          onTriggerMockEmergency={handleTriggerMockEmergency}
          onRefresh={() => {
            setRefreshing(true);
            setTimeout(() => setRefreshing(false), 800);
          }}
          refreshing={refreshing}
          activeCount={activeUnresolvedCount}
          criticalCount={criticalCount}
        />
      </section>

      {/* 2. PROMINENT ACTIVE CRITICAL EMERGENCY BANNER */}
      {criticalAlert && (
        <section>
          <CriticalEmergencyBanner
            alert={criticalAlert}
            onNavigateSafeRoute={() => navigate('/route')}
          />
        </section>
      )}

      {/* 3. SYNCHRONIZED MULTI-DEVICE BROADCAST DEMO (KILLER SIH FEATURE) */}
      <section>
        <MultiDeviceBroadcastDemo
          criticalAlert={criticalAlert}
          onNavigateSafeRoute={() => navigate('/route')}
        />
      </section>

      {/* 4. ACTIVE ALERTS LIST & EARLY WARNING QUEUE */}
      <section>
        <AlertCardList
          alerts={alerts}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          onToggleAcknowledge={handleToggleAcknowledge}
          onToggleMute={handleToggleMute}
          onNavigateAction={handleNavigateAction}
        />
      </section>

      {/* 5 & 6. THRESHOLD CONFIGURATION & VOICE/SIREN SYNTHESIS CONTROLLER */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertThresholdConfig />
        <VoiceSirenController />
      </section>

      {/* 7. HISTORICAL INCIDENT AUDIT TRAIL */}
      <section>
        <AlertHistoryLog />
      </section>
    </div>
  );
};
