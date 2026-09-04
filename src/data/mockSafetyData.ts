export interface SafetyAlert {
  id: string;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  title: string;
  timestamp: string;
  location: string;
  source: string;
  description: string;
  detectedVal: string;
  threshold: string;
  impact: string;
  recommendation: string;
  acknowledged?: boolean;
}

export interface VesselTypeProfile {
  id: string;
  name: string;
  type: string;
  length: string;
  crew: number;
  fuelCap: string;
  maxWaveTolerance: number; // in meters
  maxWindTolerance: number; // in km/h
  riskMultiplier: number;
}

export const mockSafetyData = {
  vesselProfiles: [
    {
      id: 'small',
      name: 'Sea Sprite (OBM-12)',
      type: 'Small Fishing Boat (8-10m)',
      length: '9.2 m',
      crew: 3,
      fuelCap: '120 L',
      maxWaveTolerance: 1.6,
      maxWindTolerance: 24,
      riskMultiplier: 1.35,
    },
    {
      id: 'medium',
      name: 'ORCA Harvester (IND-MH-04)',
      type: 'Medium Trawler / Gillnetter (14-18m)',
      length: '16.4 m',
      crew: 6,
      fuelCap: '650 L',
      maxWaveTolerance: 2.5,
      maxWindTolerance: 35,
      riskMultiplier: 1.0,
    },
    {
      id: 'large',
      name: 'Konkan DeepSea (L-24)',
      type: 'Large Deep-Sea Vessel (24m+)',
      length: '26.8 m',
      crew: 12,
      fuelCap: '2400 L',
      maxWaveTolerance: 4.0,
      maxWindTolerance: 48,
      riskMultiplier: 0.75,
    },
    {
      id: 'research',
      name: 'RV Sagar Ratna',
      type: 'Scientific Research Vessel',
      length: '32.0 m',
      crew: 16,
      fuelCap: '5000 L',
      maxWaveTolerance: 4.5,
      maxWindTolerance: 55,
      riskMultiplier: 0.65,
    },
  ] as VesselTypeProfile[],

  currentRiskScore: 42, // Moderate
  riskLevel: 'MODERATE',
  statusLabel: 'CAUTION ADVISED',
  lastUpdated: '10:42 AM',
  confidence: 91,

  riskFactors: [
    { name: 'Cyclone Proximity', score: 12, max: 25, weight: '25%', color: 'bg-bio-mint', desc: 'No direct track; peripheral outer depression 380km away.' },
    { name: 'Wave Swell Hazard', score: 8, max: 20, weight: '20%', color: 'bg-solar-amber', desc: 'Significant wave height 2.4m on outer breakwater.' },
    { name: 'Wind Shear & Gusts', score: 6, max: 15, weight: '15%', color: 'bg-solar-amber', desc: '28 km/h SW with afternoon gusts up to 38 km/h.' },
    { name: 'Lightning & Convection', score: 3, max: 15, weight: '15%', color: 'bg-bio-mint', desc: 'Isolated discharge cells 18km northeast.' },
    { name: 'Current & Tidal Drift', score: 4, max: 10, weight: '10%', color: 'bg-bio-mint', desc: '1.2 kt counter-current across entrance channel.' },
    { name: 'Maritime Boundary Buffer', score: 5, max: 10, weight: '10%', color: 'bg-solar-amber', desc: 'Vessel is 18.4 NM from restricted maritime boundary.' },
    { name: 'Precipitation & Visibility', score: 4, max: 5, weight: '5%', color: 'bg-bio-mint', desc: 'Moderate rain bands; visibility 8.2 km.' },
  ],

  hazards: [
    {
      id: 'cyclone',
      title: 'CYCLONE & STORM',
      icon: '🌪',
      status: 'Peripheral Watch',
      value: 'CY-02 (380 km)',
      risk: 'LOW',
      trend: 'Moving NW (335°)',
      lastUpdated: '10 min ago',
      details: 'Deep depression in Central Arabian Sea moving towards Gujarat/Oman coast. No immediate landfall risk for Ratnagiri.',
    },
    {
      id: 'wave',
      title: 'WAVE CONDITIONS',
      icon: '🌊',
      status: 'Caution (Swell Increasing)',
      value: '2.4 m (Period: 8.4s)',
      risk: 'MODERATE',
      trend: '↑ +0.3m / 3h',
      lastUpdated: 'Real-time',
      details: 'Swell waves entering from SW with moderate steepness. Nearshore shoals experiencing breaker heights up to 2.8m.',
    },
    {
      id: 'wind',
      title: 'WIND FORCE',
      icon: '💨',
      status: 'Moderate Breeze',
      value: '28 km/h (Gusts: 38 km/h)',
      risk: 'MODERATE',
      trend: '↑ Increasing at 14:00',
      lastUpdated: '2 min ago',
      details: 'Sustained SW winds at 15.1 knots. Afternoon thermal intensification expected after 14:00 hrs.',
    },
    {
      id: 'lightning',
      title: 'LIGHTNING ACTIVITY',
      icon: '⚡',
      status: 'Low Convective Threat',
      value: '12 Strikes / 20km',
      risk: 'LOW',
      trend: '→ Stationary',
      lastUpdated: '5 min ago',
      details: 'Nearest convective cell located 18.4 km inland/northeast. Operational marine corridor remains clear.',
    },
    {
      id: 'rain',
      title: 'PRECIPITATION',
      icon: '🌧',
      status: 'Intermittent Showers',
      value: '4.2 mm/h',
      risk: 'LOW',
      trend: '↓ Decreasing',
      lastUpdated: '8 min ago',
      details: 'Scattered cloud bands passing through. Minimal impact on navigational radar and visibility.',
    },
    {
      id: 'current',
      title: 'OCEAN CURRENT',
      icon: '🌊',
      status: 'Cross-Current Active',
      value: '1.2 knots (0.62 m/s)',
      risk: 'LOW',
      trend: '→ Stable SW',
      lastUpdated: '12 min ago',
      details: 'Coastal southward flow creates minor leeway on westerly headings. Fuel allowance compensated by ORCA router.',
    },
    {
      id: 'tide',
      title: 'TIDAL STATE',
      icon: '🌙',
      status: 'Flooding Tide',
      value: 'High: 14:32 (1.9m)',
      risk: 'SAFE',
      trend: 'Low: 21:08 (0.4m)',
      lastUpdated: '1 min ago',
      details: 'High tide peak provides 3.2m keel clearance at harbour bar during departure.',
    },
  ],

  boundaryInfo: {
    imblDistance: '18.4 NM',
    imblStatus: 'SAFE (CLEAR BUFFER)',
    restrictedZoneName: 'Naval Gunnery & Coast Guard Patrol Sector 4',
    restrictedZoneDist: '6.2 NM West',
    mpaName: 'Malvan Marine Sanctuary Buffer Zone',
    mpaDist: '14.8 NM South',
    noFishingZoneDist: '8.1 NM',
    geofenceState: 'SAFE ZONE',
    geofenceAlert: 'All navigation corridors compliant with Maritime Zones of India Act (1981).',
  },

  cycloneDetails: {
    name: 'DEEP DEPRESSION "ARB-02"',
    category: 'Deep Depression (Simulated)',
    location: '15.4° N, 70.1° E',
    windSpeed: '55 km/h (Gusts: 70 km/h)',
    pressure: '998 hPa',
    movement: 'North-Northwest (335°) at 14 km/h',
    radiusOfMaxWind: '45 km',
    vesselDistance: '380 km West-Southwest',
    nearestApproachETA: '36 Hours (Receding)',
    coneOfUncertainty: [
      { step: '00h (Observed)', lat: 15.4, lng: 70.1, radius: 25 },
      { step: '12h (Forecast)', lat: 16.2, lng: 69.6, radius: 55 },
      { step: '24h (Forecast)', lat: 17.1, lng: 69.0, radius: 90 },
      { step: '48h (Forecast)', lat: 18.8, lng: 67.9, radius: 150 },
    ],
  },

  safeHarbours: [
    {
      id: 'h1',
      name: 'Mirkarwada Fishing Harbour (Ratnagiri)',
      distance: '4.2 NM',
      eta: '22 min',
      depth: '4.8 m',
      weather: 'Sheltered (Calm)',
      safetyScore: 96,
      vhfChannel: 'Ch 16 / 68',
      facilities: 'Fuel, Cold Storage, Coast Guard Post',
    },
    {
      id: 'h2',
      name: 'Jaigad Deepwater Port',
      distance: '18.6 NM',
      eta: '1h 14m',
      depth: '14.0 m',
      weather: 'All-Weather Deep Basin',
      safetyScore: 92,
      vhfChannel: 'Ch 16 / 12',
      facilities: 'Full Tug Assistance, Heavy Mooring, Hospital',
    },
    {
      id: 'h3',
      name: 'Devgad Natural Harbour',
      distance: '27.4 NM',
      eta: '1h 48m',
      depth: '5.2 m',
      weather: 'Natural Hill Protection from SW Swell',
      safetyScore: 88,
      vhfChannel: 'Ch 16',
      facilities: 'Lighthouse, Medical Aid, Slipway',
    },
  ],

  alerts: [
    {
      id: 'alt-01',
      severity: 'MODERATE',
      title: 'Afternoon Wave Height Advisory',
      timestamp: '10:42 AM',
      location: 'Outer Shelf Sector (AS-03)',
      source: 'INCOIS Wave Watch III Model',
      description: 'Significant wave height projected to cross 2.4m threshold past 14:00 hrs due to swell superposition.',
      detectedVal: '2.4 m',
      threshold: '2.0 m for Medium Crafts',
      impact: 'High roll acceleration for vessels under 15m.',
      recommendation: 'Conclude outer-shelf operations prior to 13:30 hrs or seek lee behind Jaigad Headland.',
    },
    {
      id: 'alt-02',
      severity: 'LOW',
      title: 'Isolated Convective Lightning Cluster',
      timestamp: '10:35 AM',
      location: '18 km NE (Inland Ghats)',
      source: 'INSAT-3DR Rapid Lightning Feeds',
      description: 'Thunderstorm activity detected over Sahyadri foothills moving slowly eastwards away from coastline.',
      detectedVal: '12 strikes / 20 km',
      threshold: '25 strikes / 10 km',
      impact: 'Negligible threat to coastal fairway.',
      recommendation: 'Maintain standard radio watch on VHF 16.',
    },
    {
      id: 'alt-03',
      severity: 'MODERATE',
      title: 'Naval Patrol Buffer Proximity Notice',
      timestamp: '10:20 AM',
      location: 'Sector 4 Boundary (6.2 NM West)',
      source: 'Geofence Surveillance Engine',
      description: 'Vessel trajectory is 6.2 NM from restricted naval firing exercise boundary.',
      detectedVal: '6.2 NM',
      threshold: '5.0 NM Warning Buffer',
      impact: 'Potential maritime security boarding if heading 270° maintained.',
      recommendation: 'Alter course by +15° Northwards towards waypoint Alpha.',
    },
    {
      id: 'alt-04',
      severity: 'LOW',
      title: 'Arabian Sea Depression Vector Update',
      timestamp: '09:50 AM',
      location: '15.4°N, 70.1°E (380 km WSW)',
      source: 'IMD RSMC Bulletin #06',
      description: 'Deep depression track confirmed moving NNW away from Maharashtra coastline.',
      detectedVal: '55 km/h Core Wind',
      threshold: '65 km/h (Cyclonic Storm)',
      impact: 'Indirect long-period swell (8.4s) arriving at coastline.',
      recommendation: 'No sea prohibition in effect. Maintain normal foul-weather readiness.',
    },
  ] as SafetyAlert[],

  safetyTimeline: [
    { time: 'NOW (10:00)', riskScore: 42, wind: 28, wave: 2.4, lightning: 'Low', status: 'Moderate' },
    { time: '+1h (11:00)', riskScore: 44, wind: 29, wave: 2.4, lightning: 'Low', status: 'Moderate' },
    { time: '+3h (13:00)', riskScore: 52, wind: 34, wave: 2.6, lightning: 'Mod', status: 'Moderate' },
    { time: '+6h (16:00)', riskScore: 68, wind: 42, wave: 3.1, lightning: 'Mod', status: 'High' },
    { time: '+12h (22:00)', riskScore: 58, wind: 36, wave: 2.8, lightning: 'Low', status: 'Moderate' },
    { time: '+24h (10:00)', riskScore: 36, wind: 22, wave: 1.8, lightning: 'Low', status: 'Low' },
  ],

  emergencyContacts: {
    coastGuardMRCC: '1554 (Toll Free) / +91 22 2437 1976 (MRCC Mumbai)',
    marinePoliceRatnagiri: '1093 / +91 2352 222222',
    fisheriesControlRoom: '+91 2352 222584',
    vesselCoordinates: '16.9902° N, 73.3120° E (Ratnagiri Offshore)',
    distressChannel: 'VHF Ch 16 (156.8 MHz) / DSC 70 (2187.5 kHz)',
  },
};
