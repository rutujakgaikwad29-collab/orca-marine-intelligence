export const mockFishingData = {
  zones: [
    { id: 'PFZ-01', name: 'Zone Alpha', lat: 16.85, lng: 73.45, suitability: 72, distance: 12.5, risk: 'Low', productivity: 7.2 },
    { id: 'PFZ-02', name: 'Zone Beta', lat: 16.92, lng: 73.38, suitability: 81, distance: 15.2, risk: 'Low', productivity: 7.9 },
    { id: 'PFZ-03', name: 'Zone Gamma', lat: 17.05, lng: 73.25, suitability: 89, distance: 18.4, risk: 'Low', productivity: 8.6 },
    { id: 'PFZ-04', name: 'Zone Delta', lat: 16.78, lng: 73.55, suitability: 63, distance: 8.4, risk: 'Moderate', productivity: 6.1 },
    { id: 'PFZ-05', name: 'Zone Epsilon', lat: 17.15, lng: 73.15, suitability: 76, distance: 24.1, risk: 'Moderate', productivity: 7.3 },
  ],
  environmental: {
    sst: { value: 28.4, optimal: '27°C — 30°C', suitability: 92, trend: 'stable' },
    chlorophyll: { value: 1.82, optimal: '1.5 — 3.0 mg/m³', suitability: 88, trend: 'increasing' },
    ssh: { value: 0.18, optimal: '0.1 — 0.3 m', suitability: 85, trend: 'stable' },
    current: { value: 0.7, optimal: '0.2 — 0.8 m/s', suitability: 80, trend: 'stable' },
    wave: { value: 1.1, optimal: '0.5 — 1.5 m', suitability: 75, trend: 'increasing' },
    wind: { value: 14, optimal: '5 — 20 km/h', suitability: 82, trend: 'increasing' }
  },
  species: [
    { name: 'Indian Mackerel', potential: 'HIGH', confidence: 86 },
    { name: 'Sardine', potential: 'HIGH', confidence: 82 },
    { name: 'Tuna', potential: 'MEDIUM', confidence: 67 },
    { name: 'Pomfret', potential: 'MEDIUM', confidence: 61 }
  ],
  forecast: [
    { time: '06 AM', score: 86 },
    { time: '08 AM', score: 89 },
    { time: '10 AM', score: 92 },
    { time: '12 PM', score: 87 },
    { time: '02 PM', score: 71 },
    { time: '04 PM', score: 62 },
  ],
  confidence: {
    satellite: 91,
    ocean: 88,
    weather: 94,
    historical: 82,
    overall: 91
  }
};
