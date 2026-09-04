export interface VesselData {
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  roll: number;
  pitch: number;
  acceleration: number;
  fuelLevel: number;
  fuelConsumption: number;
  stability: 'STABLE' | 'MODERATE' | 'DANGER';
}
