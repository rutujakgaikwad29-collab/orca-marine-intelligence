export interface PFZZone {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  suitabilityScore: number;
  distance: number;
  risk: 'Low' | 'Moderate' | 'High' | 'Critical';
}

export interface MarineData {
  seaSurfaceTemperature: number;
  windSpeed: number;
  waveHeight: number;
  tide: 'Rising' | 'Falling' | 'High' | 'Low';
  oceanCurrent: number;
  visibility: number;
  riskScore: number;
  fishingScore: number;
  confidence: number;
}
