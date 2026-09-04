export interface AgentInfo {
  id: string;
  name: string;
  shortName: string;
  role: string;
  icon: string;
  status: 'ANALYZING' | 'IDLE' | 'COMPLETED' | 'WARNING' | 'ERROR' | 'COORDINATING';
  currentTask: string;
  confidence: number;
  lastUpdate: string;
  messagesCount: number;
  processingTimeMs: number;
  color: string;
  strokeColor: string;
  bgGlow: string;
  inputs: Record<string, string>;
  outputs: Record<string, string>;
  destinations: string[];
  health: {
    cpu: string;
    memory: string;
    latency: string;
    status: 'Healthy' | 'Degraded' | 'Offline';
  };
  dataSource: string;
}

export interface AgentMessage {
  id: string;
  fromAgent: string;
  toAgent: string;
  type: 'DATA' | 'ANALYSIS' | 'WARNING' | 'REQUEST' | 'RESPONSE' | 'ROUTE' | 'DECISION';
  timestamp: string;
  summary: string;
  payload: Record<string, any>;
  confidence: number;
  priority: 'CRITICAL' | 'HIGH' | 'NORMAL' | 'LOW';
  status: 'Delivered' | 'Processed' | 'Acknowledged';
}

export interface ScenarioDefinition {
  id: string;
  title: string;
  desc: string;
  conflict?: {
    agentA: string;
    claimA: string;
    agentB: string;
    claimB: string;
    resolution: string;
    winningAgent: string;
  };
  timeline: {
    time: string;
    agent: string;
    event: string;
    detail: string;
    type: 'DATA' | 'ANALYSIS' | 'WARNING' | 'ROUTE' | 'DECISION';
  }[];
  finalDecision: {
    zone: string;
    route: string;
    risk: number;
    fuel: string;
    confidence: number;
    actionText: string;
  };
}

export const mockAgentData = {
  kpis: {
    activeAgents: 8,
    messagesProcessed: 124,
    decisionsGenerated: 17,
    avgResponseTime: '1.8s',
    overallConfidence: 91,
  },

  agents: [
    {
      id: 'ocean',
      name: 'Ocean State Agent',
      shortName: 'OCEAN',
      role: 'Hydrodynamics, SST & Currents',
      icon: '🌊',
      status: 'ANALYZING',
      currentTask: '24h SST gradient & swell wave superposition',
      confidence: 94,
      lastUpdate: '08:21:05',
      messagesCount: 28,
      processingTimeMs: 320,
      color: 'text-bio-mint',
      strokeColor: '#3EF0B5',
      bgGlow: 'bg-bio-mint/10 border-bio-mint/30',
      inputs: {
        'SST Feed': '28.4°C (INCOIS ROMS)',
        'Significant Wave': '2.4 m SW',
        'Current Drift': '0.7 m/s (210°)',
        'Tide Flood': '1.4 m (Rising)',
      },
      outputs: {
        'Wave Impact': 'Elevated Outer Swell (2.4m - 2.8m)',
        'Current Yield': '+0.7 m/s SW Tail-Current on Leg 2',
        'Upwelling Confidence': '94% (Favorable Biology)',
      },
      destinations: ['Safety Agent', 'Route Agent', 'Decision Agent'],
      health: { cpu: '14%', memory: '128 MB', latency: '42ms', status: 'Healthy' },
      dataSource: 'INCOIS ROMS & Sentinel-3 altimetry',
    },
    {
      id: 'weather',
      name: 'Weather Agent',
      shortName: 'WEATHER',
      role: 'Atmospheric & Cyclone Tracker',
      icon: '🌦',
      status: 'WARNING',
      currentTask: 'Afternoon wind gust vector modeling (38 km/h)',
      confidence: 91,
      lastUpdate: '08:21:04',
      messagesCount: 34,
      processingTimeMs: 280,
      color: 'text-solar-amber',
      strokeColor: '#FFB547',
      bgGlow: 'bg-solar-amber/10 border-solar-amber/30',
      inputs: {
        'Sustained Wind': '28 km/h SW',
        'Wind Gusts': '38 km/h (Expected 14:00 hrs)',
        'Cyclone ARB-02': '380 km WSW (Deep Depression)',
        'Lightning Cells': '12 strikes / 20km (Inland)',
      },
      outputs: {
        'Wind Hazard': 'Elevated afternoon chop after 14:00',
        'Cyclone Track': 'Moving NNW away from coast',
        'Safe Window': 'Morning Departure (06:00 - 11:30 AM)',
      },
      destinations: ['Safety Agent', 'Route Agent', 'Decision Agent'],
      health: { cpu: '18%', memory: '142 MB', latency: '38ms', status: 'Healthy' },
      dataSource: 'IMD High-Res WRF & INSAT-3DR Rapid feeds',
    },
    {
      id: 'fishing',
      name: 'Fishing Agent',
      shortName: 'FISHING',
      role: 'PFZ Identification & Marine Biology',
      icon: '🐟',
      status: 'COMPLETED',
      currentTask: 'Chlorophyll-a front detection (PFZ-03)',
      confidence: 87,
      lastUpdate: '08:21:02',
      messagesCount: 19,
      processingTimeMs: 410,
      color: 'text-bio-mint',
      strokeColor: '#3EF0B5',
      bgGlow: 'bg-bio-mint/10 border-bio-mint/30',
      inputs: {
        'Chlorophyll Conc.': '1.82 mg/m³',
        'Thermal Front': '&Delta;T = 0.8°C / 2 km',
        'Species Probability': 'Indian Mackerel (86%), Sardine (82%)',
        'Catch History': 'Above Average Yield on AS-03',
      },
      outputs: {
        'Top Candidate': 'PFZ-03 (89% Suitability Score)',
        'Fallback Candidate': 'PFZ-02 (81% Inshore Suitability)',
        'Biological Viability': 'HIGH (Pelagic Aggregation)',
      },
      destinations: ['Route Agent', 'Decision Agent'],
      health: { cpu: '22%', memory: '210 MB', latency: '65ms', status: 'Healthy' },
      dataSource: 'CMFRI Historical Logs & NASA MODIS Chlorophyll',
    },
    {
      id: 'safety',
      name: 'Safety Agent',
      shortName: 'SAFETY',
      role: 'Hazard Boundary & Seakeeping Risk',
      icon: '⚠️',
      status: 'ANALYZING',
      currentTask: 'Synthesizing multi-vector composite risk score',
      confidence: 93,
      lastUpdate: '08:21:06',
      messagesCount: 42,
      processingTimeMs: 190,
      color: 'text-coral-red',
      strokeColor: '#FF5C77',
      bgGlow: 'bg-coral-red/10 border-coral-red/30',
      inputs: {
        'Wave Swell Risk': '0.40 (2.4m vs 2.5m vessel limit)',
        'Wind Shear Risk': '0.35 (38 km/h peak)',
        'Geofence State': 'Clear of IMBL (18.4 NM buffer)',
        'Lightning Risk': '0.15 (Inland buffer)',
      },
      outputs: {
        'Composite Risk': '42 / 100 (MODERATE)',
        'Seakeeping Notice': 'Roll amplitude &plusmn;8.4° on direct course',
        'Safety Constraint': 'Prohibit outer direct transit after 13:30',
      },
      destinations: ['Route Agent', 'Decision Agent'],
      health: { cpu: '28%', memory: '160 MB', latency: '24ms', status: 'Healthy' },
      dataSource: 'Coast Guard Geofence & Multi-Hazard Aggregator',
    },
    {
      id: 'route',
      name: 'Route Agent',
      shortName: 'ROUTE',
      role: 'Pareto Graph Search & Pathing',
      icon: '🧭',
      status: 'COORDINATING',
      currentTask: 'Computing A* multi-objective candidate routes',
      confidence: 89,
      lastUpdate: '08:21:07',
      messagesCount: 38,
      processingTimeMs: 440,
      color: 'text-electric-lavender',
      strokeColor: '#8B5CF6',
      bgGlow: 'bg-electric-lavender/10 border-electric-lavender/30',
      inputs: {
        'Target Coordinates': '17.05°N, 73.25°E (PFZ-03)',
        'Hazard Mask': 'Avoid 2.4m outer swell & Naval Sector 4',
        'Current Drift Field': '0.7 m/s SW Vector Matrix',
        'Vessel Speed': '18 km/h',
      },
      outputs: {
        'Candidate Routes': '4 Pareto Paths (Safest, Fastest, Fuel, ORCA ⭐)',
        'Top Candidate': 'Route D (Distance: 23.4 km, ETA: 1h 28m)',
        'Hazard Clearance': '3.8 NM Eastward Standoff',
      },
      destinations: ['Fuel Agent', 'Decision Agent'],
      health: { cpu: '34%', memory: '240 MB', latency: '82ms', status: 'Healthy' },
      dataSource: 'Bathymetric Nav Grid & Hydrodynamic Routing Core',
    },
    {
      id: 'fuel',
      name: 'Fuel & Vessel Agent',
      shortName: 'FUEL',
      role: 'Hydrodynamic Drag & Bunker Conservation',
      icon: '⛽',
      status: 'COMPLETED',
      currentTask: 'Simulating current assist fuel economy delta',
      confidence: 92,
      lastUpdate: '08:21:09',
      messagesCount: 22,
      processingTimeMs: 210,
      color: 'text-soft-white',
      strokeColor: '#A78BFA',
      bgGlow: 'bg-white/10 border-white/20',
      inputs: {
        'Bunker Level': '72% Available (468 Liters)',
        'Nominal Consumption': '5.2 L / hour',
        'Current Vector': '+0.7 m/s SW on Leg 2',
        'Wave Added Drag': '+0.4 L impact',
      },
      outputs: {
        'Estimated Burn': '7.8 L (Route D)',
        'Net Fuel Economy': '+12% Savings via Current Jet',
        'Reserve at Port': '64.2% (Safe Buffer)',
      },
      destinations: ['Decision Agent'],
      health: { cpu: '12%', memory: '110 MB', latency: '30ms', status: 'Healthy' },
      dataSource: 'Hull Resistance Polar Curves & Flowmeter Telemetry',
    },
    {
      id: 'sensor',
      name: 'Sensor & IoT Agent',
      shortName: 'SENSOR',
      role: 'NMEA 0183 & Vessel Telemetry Ingest',
      icon: '📡',
      status: 'IDLE',
      currentTask: 'DGPS positioning & gyrocompass heading verification',
      confidence: 96,
      lastUpdate: '08:21:09',
      messagesCount: 54,
      processingTimeMs: 90,
      color: 'text-bio-mint',
      strokeColor: '#3EF0B5',
      bgGlow: 'bg-bio-mint/10 border-bio-mint/30',
      inputs: {
        'DGPS Fix': '16.9902°N, 73.3120°E (HDOP: 0.8)',
        'Gyro Heading': '285° True',
        'Engine RPM': '1450 RPM (Nominal)',
        'Keel Echo Sounder': '18.4m Depth Under Keel',
      },
      outputs: {
        'Vessel Status': 'Underway / Navigating',
        'Cross-Track Error': '&plusmn; 4.2m',
        'Telemetry Health': 'All 8 Bus Sensors Online',
      },
      destinations: ['ORCA AI Core', 'Route Agent'],
      health: { cpu: '8%', memory: '95 MB', latency: '12ms', status: 'Healthy' },
      dataSource: 'Onboard NMEA 0183 & AIS Marine Gateway Simulator',
    },
    {
      id: 'decision',
      name: 'Decision & Consensus Agent',
      shortName: 'DECISION',
      role: 'Multi-Objective Synthesis & Policy Enforcement',
      icon: '🧠',
      status: 'COORDINATING',
      currentTask: 'Evaluating candidate trade-offs against Safety > Fuel priority',
      confidence: 91,
      lastUpdate: '08:21:10',
      messagesCount: 36,
      processingTimeMs: 390,
      color: 'text-electric-lavender',
      strokeColor: '#8B5CF6',
      bgGlow: 'bg-electric-lavender/10 border-electric-lavender/30',
      inputs: {
        'Fishing Goal': 'PFZ-03 (89% Suitability)',
        'Safety Limit': 'Risk = 42 (Moderate, Caution on afternoon wind)',
        'Route Evaluation': 'Route D Score: 96 / 100',
        'Fuel Feasibility': '7.8 L (12% Savings, Safe Reserve)',
      },
      outputs: {
        'Final Recommendation': 'Execute Departure NOW for PFZ-03 via Route D',
        'Departure Slot': '06:00 — 11:30 AM Flood Window',
        'Consensus Status': 'Unanimous 8-Agent Agreement',
      },
      destinations: ['ORCA UI Core', 'User Mission Brief'],
      health: { cpu: '38%', memory: '280 MB', latency: '95ms', status: 'Healthy' },
      dataSource: 'Multi-Criteria Utility Matrix & Rule Engine',
    },
  ] as AgentInfo[],

  messages: [
    {
      id: 'msg-01',
      fromAgent: 'Weather Agent',
      toAgent: 'Safety Agent',
      type: 'WARNING',
      timestamp: '08:21:04',
      summary: 'Afternoon wind gust surge detected (38 km/h) over outer sector AS-03.',
      payload: { windSpeed: '28 km/h', gustSpeed: '38 km/h', direction: 'SW', startTime: '14:00' },
      confidence: 0.91,
      priority: 'HIGH',
      status: 'Acknowledged',
    },
    {
      id: 'msg-02',
      fromAgent: 'Ocean Agent',
      toAgent: 'Safety Agent',
      type: 'DATA',
      timestamp: '08:21:05',
      summary: 'Significant wave height rising to 2.4m on direct outer corridor.',
      payload: { hs: '2.4 m', tp: '8.4 s', swellDirection: '220°', waveEnergy: '4.2 kJ/m²' },
      confidence: 0.94,
      priority: 'HIGH',
      status: 'Acknowledged',
    },
    {
      id: 'msg-03',
      fromAgent: 'Safety Agent',
      toAgent: 'Route Agent',
      type: 'REQUEST',
      timestamp: '08:21:06',
      summary: 'Direct Route B classified as MODERATE/HIGH risk. Compute leeward alternatives.',
      payload: { riskScore: 47, maxAllowedRisk: 35, avoidZone: 'Outer Swell AS-03' },
      confidence: 0.93,
      priority: 'HIGH',
      status: 'Processed',
    },
    {
      id: 'msg-04',
      fromAgent: 'Ocean Agent',
      toAgent: 'Route Agent',
      type: 'DATA',
      timestamp: '08:21:07',
      summary: 'Favorable +0.7 m/s SW current identified along inshore shelf corridor.',
      payload: { currentSpeed: '0.7 m/s', angle: '210°', legDistance: '8.0 km' },
      confidence: 0.94,
      priority: 'NORMAL',
      status: 'Processed',
    },
    {
      id: 'msg-05',
      fromAgent: 'Route Agent',
      toAgent: 'Fuel Agent',
      type: 'ROUTE',
      timestamp: '08:21:08',
      summary: 'Candidate Route D generated. Requesting bunker consumption profile.',
      payload: { routeId: 'route_d', distanceKm: 23.4, cruisingSpeed: 18, waypoints: 4 },
      confidence: 0.89,
      priority: 'NORMAL',
      status: 'Processed',
    },
    {
      id: 'msg-06',
      fromAgent: 'Fuel Agent',
      toAgent: 'Decision Agent',
      type: 'ANALYSIS',
      timestamp: '08:21:09',
      summary: 'Route D achieves 12% fuel savings (7.8 L total burn) with 64.2% bunker reserve.',
      payload: { estimatedFuel: '7.8 L', fuelSavings: '12%', reserve: '64.2%' },
      confidence: 0.92,
      priority: 'NORMAL',
      status: 'Delivered',
    },
    {
      id: 'msg-07',
      fromAgent: 'Decision Agent',
      toAgent: 'ORCA AI Core',
      type: 'DECISION',
      timestamp: '08:21:10',
      summary: 'Route D designated as primary recommendation (Score: 96/100).',
      payload: { route: 'Route D', score: 96, departure: 'NOW (10:00 AM)', risk: 21 },
      confidence: 0.96,
      priority: 'CRITICAL',
      status: 'Delivered',
    },
  ] as AgentMessage[],

  conflictExample: {
    title: 'AGENT CONFLICT DETECTED: FISHING OPPORTUNITY VS MARINE SAFETY',
    agentA: 'Fishing Agent',
    claimA: 'PFZ-03 Suitability is 89% (HIGH) — Peak Indian Mackerel aggregation detected.',
    agentB: 'Safety Agent',
    claimB: 'Outer Shelf Wave Swell is 2.8m (HIGH RISK) after 14:00 hrs.',
    resolution: 'Enforcing Safety Priority #1: Authorize departure for PFZ-03 ONLY during the morning 06:00—11:30 AM flood window via sheltered Route D; mandatory return transit prior to 13:30 hrs.',
    winningAgent: 'Safety Agent (Safety Policy Prevails)',
  },

  decisionPriorities: [
    { rank: 1, title: 'Human Crew Safety & Seakeeping Thresholds', weight: 'Absolute Mandate (Non-Negotiable)', color: 'text-coral-red' },
    { rank: 2, title: 'Legal IMBL & Naval Restricted Geofences', weight: 'Statutory Compliance', color: 'text-coral-red' },
    { rank: 3, title: 'Severe Tropical Cyclone & Gale Warnings', weight: 'Immediate Port Return Trigger', color: 'text-solar-amber' },
    { rank: 4, title: 'Vessel Keel Clearance & Shoal Depths', weight: 'Structural Protection', color: 'text-solar-amber' },
    { rank: 5, title: 'Route Reliability & Travel Time (ETA)', weight: 'Operational Efficiency', color: 'text-electric-lavender' },
    { rank: 6, title: 'Hydrodynamic Fuel Conservation', weight: 'Economic Optimization', color: 'text-bio-mint' },
    { rank: 7, title: 'Fisheries Yield & Target PFZ Catch', weight: 'Objective Maximization', color: 'text-bio-mint' },
  ],

  scenarios: [
    {
      id: 'safe_fishing',
      title: '1. Optimal Morning Fishing Transit (Default)',
      desc: 'Moderate weather, high chlorophyll in PFZ-03, favorable ocean current assist.',
      finalDecision: {
        zone: 'PFZ-03',
        route: 'Route D (ORCA ⭐)',
        risk: 21,
        fuel: '7.8 L',
        confidence: 96,
        actionText: 'Execute morning departure for PFZ-03 via Route D. Return transit before 14:00 hrs.',
      },
      timeline: [
        { time: '00:00', agent: 'Fishing Agent', event: 'PFZ-03 identified (89% suitability)', detail: 'High pelagic mackerel signature', type: 'DATA' },
        { time: '00:02', agent: 'Weather Agent', event: 'Wind forecast evaluated (28 km/h SW)', detail: 'Afternoon gust warning past 14:00', type: 'ANALYSIS' },
        { time: '00:04', agent: 'Ocean Agent', event: '2.4m swell skirted; +0.7 m/s current', detail: 'Favorable tail current on Leg 2', type: 'DATA' },
        { time: '00:06', agent: 'Safety Agent', event: 'Safety clearance approved for morning', detail: 'Risk index: 21/100 (Safe)', type: 'ANALYSIS' },
        { time: '00:08', agent: 'Route Agent', event: 'Route D synthesized (23.4 km, 1h 28m)', detail: '3.8 NM buffer from high swell', type: 'ROUTE' },
        { time: '00:10', agent: 'Fuel Agent', event: '12% fuel savings calculated (7.8 L)', detail: '64.2% reserve preserved', type: 'DATA' },
        { time: '00:12', agent: 'Decision Agent', event: 'Consensus reached (Score 96/100)', detail: 'Route D recommended unanimously', type: 'DECISION' },
      ],
    },
    {
      id: 'cyclone_alert',
      title: '2. Cyclone Peripheral Swell Surge (High Hazard)',
      desc: 'Simulating Arabian Sea deep depression vectoring close to coastal shelf.',
      conflict: {
        agentA: 'Fishing Agent',
        claimA: 'PFZ-03 remains highly productive (89%).',
        agentB: 'Safety Agent',
        claimB: 'Cyclone gale swell reaches 3.8m across all outer routes (CRITICAL RISK).',
        resolution: 'Decision Agent vetoes all outer fishing operations. Diverts vessel to Mirkarwada Safe Basin.',
        winningAgent: 'Safety Agent',
      },
      finalDecision: {
        zone: 'MISSION ABORTED',
        route: 'Emergency Diversion to Mirkarwada Port',
        risk: 82,
        fuel: '2.4 L',
        confidence: 94,
        actionText: 'HARBOUR CLOSURE PROTOCOL: Abort outer transit immediately. Proceed to sheltered Mirkarwada basin.',
      },
      timeline: [
        { time: '00:00', agent: 'Weather Agent', event: 'Gale Warning Issued for Sector AS-03', detail: 'Core winds 65 km/h within 180 km', type: 'WARNING' },
        { time: '00:02', agent: 'Ocean Agent', event: 'Swell surge exceeds 3.8m limit', detail: 'Significant wave height dangerous for <20m hulls', type: 'WARNING' },
        { time: '00:04', agent: 'Safety Agent', event: 'Risk elevated to 82/100 (CRITICAL)', detail: 'Breach of vessel seakeeping threshold', type: 'WARNING' },
        { time: '00:06', agent: 'Route Agent', event: 'Outer routes A, B, C, D invalidated', detail: 'Emergency evasion vector computed to Mirkarwada', type: 'ROUTE' },
        { time: '00:08', agent: 'Decision Agent', event: 'EMERGENCY REFUGE DIRECTIVE', detail: 'Vessel redirected to Safe Harbour', type: 'DECISION' },
      ],
    },
    {
      id: 'boundary_proximity',
      title: '3. International Boundary Geofence Risk',
      desc: 'Vessel course approaches restricted military and IMBL boundary buffer.',
      conflict: {
        agentA: 'Route Agent',
        claimA: 'Direct trajectory intersects Naval Sector 4 by 0.8 NM for faster ETA.',
        agentB: 'Geofence Agent',
        claimB: 'Strict 3 NM standoff required around Naval Sector 4 firing range.',
        resolution: 'Geofence Agent overrides shortest path. Route Agent recalculates +15° eastward dogleg.',
        winningAgent: 'Geofence Agent',
      },
      finalDecision: {
        zone: 'PFZ-03',
        route: 'Route A (Inshore Compliant)',
        risk: 18,
        fuel: '8.2 L',
        confidence: 98,
        actionText: 'Course altered +15° Northwards. 6.2 NM standoff maintained from restricted boundary.',
      },
      timeline: [
        { time: '00:00', agent: 'Geofence Agent', event: 'Naval Sector 4 buffer breach detected', detail: 'Direct path enters exclusion polygon', type: 'WARNING' },
        { time: '00:02', agent: 'Safety Agent', event: 'Statutory compliance violation flagged', detail: 'Maritime Security Alert Level 2', type: 'WARNING' },
        { time: '00:04', agent: 'Route Agent', event: 'A* replanning with hard polygon barrier', detail: 'Generated inshore bypass contour', type: 'ROUTE' },
        { time: '00:06', agent: 'Decision Agent', event: 'Compliant course approved', detail: 'Zero regulatory infractions', type: 'DECISION' },
      ],
    },
  ] as ScenarioDefinition[],

  sharedState: {
    location: '16.9902° N, 73.3120° E (Ratnagiri Fairway)',
    weatherState: 'Sustained SW 28 km/h • Gusts 38 km/h at 14:00',
    oceanState: 'Hs: 2.4m Swell • +0.7 m/s SW Current • SST: 28.4°C',
    fishingTarget: 'PFZ-03 (89% Suitability Score)',
    safetyRisk: '42 / 100 (MODERATE — Caution Advised)',
    activeRoute: 'Route D (ORCA ⭐) • 23.4 km • ETA: 1h 28m',
    fuelState: '72% Available • Est. Burn: 7.8 L (12% Savings)',
    boundaryStatus: 'SAFE (18.4 NM from IMBL • 6.2 NM from Naval Sector 4)',
    sensorHealth: 'All 8 IoT Sensors Active (DGPS, Gyro, Sounder, Flowmeter)',
    decisionConsensus: 'Consensus Reached • Confidence: 91%',
  },
};
