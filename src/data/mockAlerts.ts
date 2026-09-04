import type { Alert } from '../types/alerts';

export const mockAlerts: Alert[] = [
  {
    id: 'a1',
    severity: 'MODERATE',
    title: 'Strong wind expected',
    description: 'Strong wind expected after 2 PM.',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'a2',
    severity: 'HIGH',
    title: 'Wave height increasing',
    description: 'Wave height increasing near Zone B.',
    timestamp: new Date().toISOString(),
    location: 'Zone B',
  },
  {
    id: 'a3',
    severity: 'INFO',
    title: 'High fishing potential',
    description: 'High fishing potential detected in PFZ-02.',
    timestamp: new Date().toISOString(),
    location: 'PFZ-02',
  },
];
