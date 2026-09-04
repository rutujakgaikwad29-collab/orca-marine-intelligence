import type { PFZZone } from '../types/marine';

export const mockPFZData: PFZZone[] = [
  {
    id: 'pfz-01',
    name: 'PFZ-01',
    latitude: 16.9202,
    longitude: 73.2120,
    suitabilityScore: 91,
    distance: 12,
    risk: 'Low',
  },
  {
    id: 'pfz-02',
    name: 'PFZ-02',
    latitude: 16.8502,
    longitude: 73.1120,
    suitabilityScore: 84,
    distance: 18,
    risk: 'Low',
  },
  {
    id: 'pfz-03',
    name: 'PFZ-03',
    latitude: 16.7902,
    longitude: 73.0120,
    suitabilityScore: 72,
    distance: 25,
    risk: 'Moderate',
  },
];
