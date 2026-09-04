export type AlertSeverity = 'INFO' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export interface Alert {
  id: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  timestamp: string;
  location?: string;
}
