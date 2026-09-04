export interface Waypoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  distanceFromStart: number; // km
  hazardStatus: 'SAFE' | 'MODERATE' | 'HIGH';
  hazardDesc?: string;
}

export interface RouteOption {
  id: string;
  key: 'safest' | 'fastest' | 'fuel' | 'recommended';
  name: string;
  tag: string;
  color: string;
  strokeColor: string;
  distanceKm: number;
  etaMinutes: number;
  etaFormatted: string;
  fuelLiters: number;
  fuelSavingsPercent?: number;
  riskScore: number;
  orcaScore: number;
  summary: string;
  coordinates: [number, number][];
  waypoints: Waypoint[];
  features: string[];
}

export const mockRouteData = {
  defaultStart: {
    id: 'ratnagiri_port',
    name: 'Ratnagiri Port (Mirkarwada)',
    lat: 16.9902,
    lng: 73.3120,
  },

  defaultDestination: {
    id: 'pfz_03',
    name: 'PFZ-03 (High Productivity Zone)',
    lat: 17.0500,
    lng: 73.2500,
    suitability: 89,
    species: 'Indian Mackerel / Sardine',
  },

  availableDestinations: [
    { id: 'pfz_03', name: 'PFZ-03 (Shelf Center - 89% Suitability)', lat: 17.0500, lng: 73.2500, type: 'PFZ' },
    { id: 'pfz_02', name: 'PFZ-02 (Inshore North - 81% Suitability)', lat: 16.9200, lng: 73.3800, type: 'PFZ' },
    { id: 'pfz_01', name: 'PFZ-01 (Inshore South - 72% Suitability)', lat: 16.8500, lng: 73.4500, type: 'PFZ' },
    { id: 'jaigad_port', name: 'Safe Harbour: Jaigad Deepwater Port', lat: 17.2900, lng: 73.2200, type: 'HARBOUR' },
    { id: 'devgad_port', name: 'Safe Harbour: Devgad Natural Bay', lat: 16.3700, lng: 73.3700, type: 'HARBOUR' },
  ],

  routes: [
    {
      id: 'route_d',
      key: 'recommended',
      name: 'Route D — ORCA Recommended ⭐',
      tag: 'BEST OVERALL BALANCE',
      color: 'text-bio-mint',
      strokeColor: '#3EF0B5',
      distanceKm: 23.4,
      etaMinutes: 88,
      etaFormatted: '1h 28m',
      fuelLiters: 7.8,
      fuelSavingsPercent: 12,
      riskScore: 21,
      orcaScore: 96,
      summary: 'Optimal balance skirting the 2.4m wave swell while riding a +0.7 m/s southwest current assist for 8 km.',
      coordinates: [
        [16.9902, 73.3120],
        [17.0050, 73.3250],
        [17.0280, 73.3000],
        [17.0420, 73.2750],
        [17.0500, 73.2500],
      ],
      waypoints: [
        { id: 'wp1', name: 'Port Outbound Fairway', lat: 16.9902, lng: 73.3120, distanceFromStart: 0, hazardStatus: 'SAFE' },
        { id: 'wp2', name: 'Coastal Current Junction', lat: 17.0050, lng: 73.3250, distanceFromStart: 5.2, hazardStatus: 'SAFE' },
        { id: 'wp3', name: 'Mid-Shelf Corridor', lat: 17.0280, lng: 73.3000, distanceFromStart: 13.8, hazardStatus: 'SAFE', hazardDesc: 'Tail Current Assist (+0.7 m/s)' },
        { id: 'wp4', name: 'PFZ-03 Arrival Threshold', lat: 17.0500, lng: 73.2500, distanceFromStart: 23.4, hazardStatus: 'SAFE' },
      ],
      features: [
        'Low Marine Risk (21/100)',
        'Rides Favorable 0.7 m/s SW Current',
        'Clears High-Wave Swell Zone by 3.8 NM',
        '12% Fuel Savings vs Direct Route',
        'Zero Geofence Conflicts',
      ],
    },
    {
      id: 'route_a',
      key: 'safest',
      name: 'Route A — Safest Passage 🛡️',
      tag: 'MAXIMUM HAZARD AVOIDANCE',
      color: 'text-electric-lavender',
      strokeColor: '#8B5CF6',
      distanceKm: 24.8,
      etaMinutes: 102,
      etaFormatted: '1h 42m',
      fuelLiters: 8.2,
      fuelSavingsPercent: 5,
      riskScore: 18,
      orcaScore: 94,
      summary: 'Hugs inshore sheltered contours with minimal roll acceleration. Longest distance but maximum peace of mind.',
      coordinates: [
        [16.9902, 73.3120],
        [16.9950, 73.3400],
        [17.0250, 73.3300],
        [17.0450, 73.2900],
        [17.0500, 73.2500],
      ],
      waypoints: [
        { id: 'wp1', name: 'Port Fairway', lat: 16.9902, lng: 73.3120, distanceFromStart: 0, hazardStatus: 'SAFE' },
        { id: 'wp2', name: 'Inshore Leeward Waypoint', lat: 16.9950, lng: 73.3400, distanceFromStart: 6.4, hazardStatus: 'SAFE' },
        { id: 'wp3', name: 'Northern Inshore Contour', lat: 17.0250, lng: 73.3300, distanceFromStart: 15.2, hazardStatus: 'SAFE' },
        { id: 'wp4', name: 'Approach Point', lat: 17.0500, lng: 73.2500, distanceFromStart: 24.8, hazardStatus: 'SAFE' },
      ],
      features: [
        'Lowest Risk Score (18/100)',
        'Complete Wave Leeward Protection',
        'Far from Naval Restricted Zone',
        'Takes 14m Longer than Recommended',
      ],
    },
    {
      id: 'route_b',
      key: 'fastest',
      name: 'Route B — Direct / Fastest ⚡',
      tag: 'MINIMUM TRAVEL TIME',
      color: 'text-solar-amber',
      strokeColor: '#FFB547',
      distanceKm: 20.2,
      etaMinutes: 75,
      etaFormatted: '1h 15m',
      fuelLiters: 10.1,
      riskScore: 47,
      orcaScore: 78,
      summary: 'Direct geodesic path to destination. Intersects elevated wave swell region (2.4m) inducing higher engine strain.',
      coordinates: [
        [16.9902, 73.3120],
        [17.0150, 73.2850],
        [17.0350, 73.2650],
        [17.0500, 73.2500],
      ],
      waypoints: [
        { id: 'wp1', name: 'Port Exit', lat: 16.9902, lng: 73.3120, distanceFromStart: 0, hazardStatus: 'SAFE' },
        { id: 'wp2', name: 'Outer Swell Crossing', lat: 17.0150, lng: 73.2850, distanceFromStart: 8.5, hazardStatus: 'MODERATE', hazardDesc: '2.4m Swell Cross-Sea' },
        { id: 'wp3', name: 'Outer Channel', lat: 17.0350, lng: 73.2650, distanceFromStart: 15.2, hazardStatus: 'MODERATE', hazardDesc: '38 km/h Wind Gusts' },
        { id: 'wp4', name: 'Direct PFZ Entry', lat: 17.0500, lng: 73.2500, distanceFromStart: 20.2, hazardStatus: 'SAFE' },
      ],
      features: [
        'Fastest Transit (1h 15m)',
        'Shortest Path (20.2 km)',
        'Higher Fuel Burn (+23%)',
        'Crosses 2.4m High Wave Swell Zone',
      ],
    },
    {
      id: 'route_c',
      key: 'fuel',
      name: 'Route C — Fuel Efficient ⛽',
      tag: 'LOWEST FUEL EXPENDITURE',
      color: 'text-soft-white',
      strokeColor: '#A78BFA',
      distanceKm: 22.7,
      etaMinutes: 91,
      etaFormatted: '1h 31m',
      fuelLiters: 7.4,
      fuelSavingsPercent: 16,
      riskScore: 29,
      orcaScore: 88,
      summary: 'Maximizes tail-current drift vectors for 11 km to minimize throttle load and carbon emissions.',
      coordinates: [
        [16.9902, 73.3120],
        [17.0100, 73.3100],
        [17.0300, 73.2800],
        [17.0500, 73.2500],
      ],
      waypoints: [
        { id: 'wp1', name: 'Harbour Head', lat: 16.9902, lng: 73.3120, distanceFromStart: 0, hazardStatus: 'SAFE' },
        { id: 'wp2', name: 'Current Core Entry', lat: 17.0100, lng: 73.3100, distanceFromStart: 7.1, hazardStatus: 'SAFE', hazardDesc: '0.8 m/s Current Alignment' },
        { id: 'wp3', name: 'Gliding Segment', lat: 17.0300, lng: 73.2800, distanceFromStart: 15.8, hazardStatus: 'SAFE' },
        { id: 'wp4', name: 'PFZ Target', lat: 17.0500, lng: 73.2500, distanceFromStart: 22.7, hazardStatus: 'SAFE' },
      ],
      features: [
        'Lowest Fuel Consumption (7.4 L)',
        '16% Fuel Reduction vs Direct',
        'Rides Ocean Jet Drift',
        'Acceptable Risk Profile (29/100)',
      ],
    },
  ] as RouteOption[],

  vesselConfig: {
    name: 'ORCA-V01 Harvester',
    type: 'Medium Trawler (16.4m)',
    cruisingSpeedKmH: 18,
    fuelCapacityLiters: 650,
    fuelAvailablePercent: 72,
    fuelConsumptionRatePerHour: 5.2, // L/hour
    maxWaveTolerance: 2.5,
  },

  routeRiskFactors: [
    { name: 'Wave Swell Drag', score: 12, max: 30, desc: '2.4m swell skirted along the western edge' },
    { name: 'Wind Vector Impact', score: 8, max: 25, desc: '28 km/h SW wind on port quarter' },
    { name: 'Current Shear Resistance', score: 6, max: 20, desc: '+0.7 m/s tail current on leg 2' },
    { name: 'Cyclone Proximity', score: 0, max: 15, desc: 'Cyclone >380km away; no vortex effect' },
    { name: 'Lightning Threat', score: 2, max: 10, desc: 'Isolated inland cells; clear fairway' },
    { name: 'Maritime Boundary Buffer', score: 0, max: 10, desc: '18.4 NM buffer clear of IMBL' },
    { name: 'Optical Visibility', score: 5, max: 10, desc: '8.2 km visibility; minimal fog' },
  ],

  hazardAvoidanceList: [
    { title: 'Elevated Wave Swell Zone (2.4m - 3.1m)', status: 'AVOIDED', clearance: '3.8 NM Eastward buffer', color: 'text-bio-mint' },
    { title: 'Naval Gunnery Sector 4 Exercise Area', status: 'AVOIDED', clearance: '6.2 NM Separation', color: 'text-bio-mint' },
    { title: 'Inland Sahyadri Lightning Cluster', status: 'AVOIDED', clearance: '18.4 km Inland Separation', color: 'text-bio-mint' },
    { title: 'Malvan Marine Protected Sanctuary', status: 'AVOIDED', clearance: '14.8 NM Southward Clearance', color: 'text-bio-mint' },
    { title: 'International Maritime Boundary Line', status: 'COMPLIANT', clearance: '18.4 NM Buffer', color: 'text-bio-mint' },
  ],

  fuelCalculations: {
    availableFuelPercent: 72,
    baseFuelNeeded: 8.6,
    currentBenefit: -0.8,
    waveDragImpact: +0.4,
    finalEstimatedFuel: 7.8,
    remainingReservePercent: 64.2,
    efficiencyScore: 'High Efficiency (+12% MPG)',
  },

  etaBreakdown: {
    baseTimeMin: 85,
    windDelayMin: +8,
    waveDelayMin: +4,
    currentAssistMin: -11,
    finalTravelTimeMin: 88,
    departureTime: '10:00 AM',
    calculatedETA: '11:28 AM',
  },

  departureTimeComparison: [
    { window: 'DEPART NOW (10:00 AM)', risk: 21, fuel: '7.8 L', wave: '1.2 m', score: 96, status: 'OPTIMAL (RECOMMENDED)' },
    { window: '+1 Hour (11:00 AM)', risk: 28, fuel: '8.0 L', wave: '1.4 m', score: 91, status: 'FAVORABLE' },
    { window: '+2 Hours (12:00 PM)', risk: 42, fuel: '8.6 L', wave: '1.8 m', score: 72, status: 'CAUTION (WIND INCREASING)' },
    { window: '+4 Hours (02:00 PM)', risk: 64, fuel: '9.8 L', wave: '2.4 m', score: 54, status: 'HIGH RISK (SWELL ARRIVAL)' },
    { window: '+6 Hours (04:00 PM)', risk: 71, fuel: '10.4 L', wave: '2.8 m', score: 42, status: 'NOT RECOMMENDED' },
  ],

  agentContributions: [
    { name: 'Fishing Agent', role: 'PFZ Target Identification', status: 'Completed', detail: 'Selected PFZ-03 (89% suitability, high pelagic concentration)' },
    { name: 'Weather Agent', role: 'Wind & Gust Vectoring', status: 'Completed', detail: 'Forecasted 38 km/h afternoon wind; recommended morning transit' },
    { name: 'Ocean State Agent', role: 'Wave & Current Ingestion', status: 'Completed', detail: 'Identified 0.7 m/s SW current stream and 2.4m outer swell' },
    { name: 'Safety Agent', role: 'Hazard Boundaries Evaluation', status: 'Completed', detail: 'Enforced 3 NM standoff buffer around restricted military sector 4' },
    { name: 'Geofence Agent', role: 'Maritime Boundary Verification', status: 'Completed', detail: 'Verified 18.4 NM buffer from IMBL' },
    { name: 'Fuel & Vessel Agent', role: 'Hydrodynamic Drag Modeling', status: 'Completed', detail: 'Calculated 12% fuel savings using current assist' },
    { name: 'Route Optimization Agent', role: 'A* Path Graph Synthesis', status: 'Completed', detail: 'Generated 4 Pareto-optimal candidates' },
    { name: 'Reasoning Agent', role: 'Multi-Objective Decision Synthesis', status: 'Completed', detail: 'Selected Route D (Score: 96/100) as dominant solution' },
  ],

  recentHistory: [
    { date: 'Today 06:30', start: 'Ratnagiri Port', dest: 'PFZ-03', route: 'Route D', risk: 21, fuel: '7.8 L', status: 'Active Plan' },
    { date: 'Yesterday', start: 'Ratnagiri Port', dest: 'PFZ-02', route: 'Route A', risk: 18, fuel: '6.2 L', status: 'Completed Safely' },
    { date: 'Aug 30', start: 'Mirkarwada', dest: 'Jaigad Deep', route: 'Route C', risk: 24, fuel: '8.4 L', status: 'Completed (+14% Fuel saved)' },
    { date: 'Aug 28', start: 'Ratnagiri Port', dest: 'PFZ-01', route: 'Route D', risk: 19, fuel: '5.9 L', status: 'High Catch Logged' },
  ],

  routeDataConfidence: {
    overall: 91,
    weather: 94,
    ocean: 88,
    safety: 91,
    geospatial: 96,
    vessel: 85,
    lastUpdate: '10 sec ago',
    dataFreshness: 'Real-time Ingest Sync (SIMULATION MODE)',
  },
};
