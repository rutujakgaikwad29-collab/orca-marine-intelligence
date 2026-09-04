export interface MarineConditionMetric {
  id: string;
  label: string;
  value: string;
  rawVal: number;
  unit: string;
  status: string;
  trend: string;
  trendDir: 'up' | 'down' | 'stable';
  color: string;
  sparkline: number[];
}

export const mockWeatherData = {
  location: 'Ratnagiri Coast, Maharashtra (16.9902° N, 73.3120° E)',
  lastUpdated: '12 sec ago',
  dataMode: 'SIMULATION',
  
  currentMetrics: [
    {
      id: 'sst',
      label: 'SEA SURFACE TEMPERATURE',
      value: '28.4',
      rawVal: 28.4,
      unit: '°C',
      status: 'Favorable',
      trend: '↑ 0.4°C',
      trendDir: 'up',
      color: 'text-solar-amber',
      sparkline: [27.8, 28.0, 28.1, 28.3, 28.4, 28.4]
    },
    {
      id: 'wind',
      label: 'WIND SPEED',
      value: '14',
      rawVal: 14,
      unit: 'km/h',
      status: 'Moderate (SW 225°)',
      trend: '↑ 2 km/h',
      trendDir: 'up',
      color: 'text-bio-mint',
      sparkline: [10, 11, 12, 13, 13, 14]
    },
    {
      id: 'wave_height',
      label: 'WAVE HEIGHT',
      value: '1.2',
      rawVal: 1.2,
      unit: 'm',
      status: 'Calm',
      trend: '↑ 0.2m',
      trendDir: 'up',
      color: 'text-electric-lavender',
      sparkline: [0.9, 1.0, 1.0, 1.1, 1.1, 1.2]
    },
    {
      id: 'wave_period',
      label: 'WAVE PERIOD',
      value: '8.4',
      rawVal: 8.4,
      unit: 'sec',
      status: 'Stable (SW)',
      trend: '→ 0.0s',
      trendDir: 'stable',
      color: 'text-cool-gray',
      sparkline: [8.2, 8.3, 8.4, 8.4, 8.3, 8.4]
    },
    {
      id: 'current',
      label: 'OCEAN CURRENT',
      value: '0.7',
      rawVal: 0.7,
      unit: 'm/s',
      status: 'Southwest (210°)',
      trend: '→ Stable',
      trendDir: 'stable',
      color: 'text-bio-mint',
      sparkline: [0.6, 0.6, 0.7, 0.7, 0.7, 0.7]
    },
    {
      id: 'tide',
      label: 'TIDE LEVEL',
      value: '1.4',
      rawVal: 1.4,
      unit: 'm',
      status: 'Rising (High: 11:42 AM)',
      trend: '↑ 0.3m',
      trendDir: 'up',
      color: 'text-soft-white',
      sparkline: [0.8, 1.0, 1.1, 1.2, 1.3, 1.4]
    },
    {
      id: 'pressure',
      label: 'ATMOSPHERIC PRESSURE',
      value: '1012',
      rawVal: 1012,
      unit: 'hPa',
      status: 'Stable',
      trend: '↓ 1 hPa',
      trendDir: 'down',
      color: 'text-solar-amber',
      sparkline: [1014, 1014, 1013, 1013, 1012, 1012]
    },
    {
      id: 'visibility',
      label: 'VISIBILITY',
      value: '8.2',
      rawVal: 8.2,
      unit: 'km',
      status: 'Good (No Fog)',
      trend: '→ Clear',
      trendDir: 'stable',
      color: 'text-bio-mint',
      sparkline: [8.0, 8.0, 8.1, 8.2, 8.2, 8.2]
    }
  ] as MarineConditionMetric[],

  sstDetails: {
    current: 28.4,
    min24h: 27.2,
    max24h: 28.9,
    optimalMin: 27.0,
    optimalMax: 30.0,
    trend: '+0.4°C over 24h',
    contribution: 92,
    interpretation: 'SST conditions are currently favorable for the selected fishing zone. Upwelling signature detected 12km offshore.',
    history24h: [
      { time: '00:00', temp: 27.6 },
      { time: '04:00', temp: 27.4 },
      { time: '08:00', temp: 27.9 },
      { time: '12:00', temp: 28.8 },
      { time: '16:00', temp: 28.6 },
      { time: '20:00', temp: 28.1 },
      { time: '24:00', temp: 28.4 }
    ]
  },

  windDetails: {
    speed: 14,
    direction: 'Southwest (SW - 225°)',
    headingAngle: 225,
    gust: 21,
    expectedIncrease: '02:00 PM (21 km/h)',
    forecast12h: [
      { time: '06:00', speed: 10, gust: 14 },
      { time: '09:00', speed: 12, gust: 17 },
      { time: '12:00', speed: 14, gust: 20 },
      { time: '15:00', speed: 21, gust: 29 },
      { time: '18:00', speed: 18, gust: 24 },
      { time: '21:00', speed: 15, gust: 19 }
    ]
  },

  waveDetails: {
    height: 1.2,
    period: 8.4,
    direction: 'SW (220°)',
    energy: 'Moderate (4.2 kJ/m²)',
    forecast: [
      { time: '06 AM', height: 0.8 },
      { time: '09 AM', height: 1.0 },
      { time: '12 PM', height: 1.2 },
      { time: '03 PM', height: 1.8 },
      { time: '06 PM', height: 2.1 }
    ]
  },

  currentDetails: {
    speed: 0.7,
    direction: 'Southwest (210°)',
    stability: 'Stable',
    impact: {
      fishing: 'Positive (+14% nutrient retention)',
      navigation: 'Moderate (1.2 kt counter-drift on return)',
      fuelEfficiency: 'Favorable on outbound route'
    }
  },

  tideDetails: {
    state: 'Rising',
    currentHeight: 1.4,
    nextHigh: '11:42 AM (1.8m)',
    nextLow: '06:20 PM (0.4m)',
    recommendedWindow: '06:00 AM — 11:30 AM (Slack High Tide peak)',
    curve: [
      { time: '00:00', height: 0.5, type: 'Low' },
      { time: '03:00', height: 0.9, type: 'Rising' },
      { time: '06:00', height: 1.4, type: 'Current' },
      { time: '09:00', height: 1.7, type: 'Rising' },
      { time: '12:00', height: 1.8, type: 'High' },
      { time: '15:00', height: 1.1, type: 'Falling' },
      { time: '18:00', height: 0.4, type: 'Low' },
      { time: '21:00', height: 0.8, type: 'Rising' }
    ]
  },

  atmosphericDetails: {
    temp: 28.4,
    humidity: 76,
    rainProb: 12,
    pressure: 1012,
    visibility: 8.2,
    cloudCover: 34
  },

  lightningDetails: {
    activity: 'LOW',
    detectedCells: 0,
    nearestLightning: '> 20 km (No threat)',
    riskLevel: 'LOW',
    warning: 'Normal conditions. No convective cells within operational radius.'
  },

  cycloneDetails: {
    status: 'NO ACTIVE CYCLONE DETECTED',
    nearestSystem: 'None within 500 km',
    risk: 'Low',
    activeDemo: false,
    simulatedStorm: {
      name: 'DEMO STORM — "CY-02 (ARABIAN)"',
      category: 'Deep Depression (Simulated)',
      location: '14.2° N, 69.8° E (~380 km WSW)',
      windSpeed: '55 km/h',
      pressure: '998 hPa',
      direction: 'North-Northwest (335° at 14 km/h)',
      affectedRadius: '140 km'
    }
  },

  hourlyForecast24: [
    { time: '06:00', temp: 26, wind: 8, wave: 0.8, rain: 5, risk: 'Low' },
    { time: '09:00', temp: 28, wind: 10, wave: 1.0, rain: 8, risk: 'Low' },
    { time: '12:00', temp: 30, wind: 14, wave: 1.2, rain: 12, risk: 'Moderate' },
    { time: '15:00', temp: 29, wind: 21, wave: 1.8, rain: 25, risk: 'Moderate' },
    { time: '18:00', temp: 27, wind: 18, wave: 2.1, rain: 35, risk: 'High' },
    { time: '21:00', temp: 26, wind: 14, wave: 1.6, rain: 20, risk: 'Moderate' },
    { time: '00:00', temp: 25, wind: 11, wave: 1.3, rain: 10, risk: 'Low' },
    { time: '03:00', temp: 24, wind: 9, wave: 1.0, rain: 5, risk: 'Low' }
  ],

  threeDayForecast: [
    {
      day: 'TODAY',
      date: 'Sep 2',
      weather: 'Mostly Clear / Afternoon Breezy',
      wind: '14-21 km/h',
      wave: '1.2-2.1 m',
      rain: '12%',
      marineRisk: 'MODERATE',
      fishingSuitability: 'HIGH (89%)'
    },
    {
      day: 'TOMORROW',
      date: 'Sep 3',
      weather: 'Calm Waters / Sunny',
      wind: '8-14 km/h',
      wave: '0.8-1.2 m',
      rain: '5%',
      marineRisk: 'LOW',
      fishingSuitability: 'MEDIUM (74%)'
    },
    {
      day: 'DAY 3',
      date: 'Sep 4',
      weather: 'Optimal Swell / Light Breeze',
      wind: '10-15 km/h',
      wave: '0.9-1.3 m',
      rain: '10%',
      marineRisk: 'LOW',
      fishingSuitability: 'HIGH (86%)'
    }
  ],

  oceanAnalysis: {
    stateText: 'Ocean conditions are currently favorable for nearshore and mid-shelf fishing activity. SST remains within a highly productive biological range (28.4°C), while moderate wind conditions are expected to increase after 2:00 PM.',
    confidence: 91,
    factors: [
      { name: 'SST', score: 92 },
      { name: 'Currents', score: 86 },
      { name: 'Waves', score: 81 },
      { name: 'Weather', score: 78 },
      { name: 'Wind', score: 74 }
    ]
  },

  agentContributions: [
    { name: 'Weather Agent', status: 'ACTIVE', desc: 'Analyzing wind, gusts, and barometric trends', color: 'text-bio-mint' },
    { name: 'Ocean State Agent', status: 'ACTIVE', desc: 'Analyzing sea surface temperature and current shear', color: 'text-electric-lavender' },
    { name: 'Safety Agent', status: 'ACTIVE', desc: 'Checking lightning cells and maritime hazard boundaries', color: 'text-solar-amber' },
    { name: 'Marine/Fisheries Agent', status: 'ACTIVE', desc: 'Evaluating environmental impact on PFZ suitability', color: 'text-bio-mint' },
    { name: 'Geospatial Agent', status: 'ACTIVE', desc: 'Mapping spatial boundaries and bathymetric contours', color: 'text-soft-white' },
    { name: 'Reasoning Agent', status: 'SYNTHESIZING', desc: 'Combining multi-domain evidence for operational guidance', color: 'text-aurora-violet' }
  ],

  impacts: {
    fishing: {
      status: 'FAVORABLE WITH CAUTION',
      factors: [
        { label: 'SST (28.4°C)', state: 'Favorable', icon: '✓', pos: true },
        { label: 'Chlorophyll (1.82 mg/m³)', state: 'High', icon: '✓', pos: true },
        { label: 'Wind Speed', state: 'Moderate (Increasing)', icon: '⚠', pos: false },
        { label: 'Wave Height', state: '1.2m → 2.1m (After 3PM)', icon: '⚠', pos: false },
        { label: 'Rainfall', state: 'Low Probability', icon: '✓', pos: true }
      ]
    },
    route: {
      risk: 'MODERATE',
      reason: 'Wind increasing after 2 PM; wave height climbing to 2.1m on return leg.',
      action: 'Depart before 10:00 AM. Plan return transit before 02:30 PM.'
    },
    safety: {
      status: 'SAFE WITH CAUTION',
      wind: 'Moderate',
      wave: 'Low (Morning)',
      lightning: 'Low',
      cyclone: 'None',
      visibility: 'Good (8.2 km)'
    }
  },

  forecastConfidence: {
    overall: 90,
    sources: [
      { name: 'Weather Model', score: 94 },
      { name: 'Tide Prediction', score: 96 },
      { name: 'Wave Model (WW3)', score: 91 },
      { name: 'Ocean Currents', score: 88 },
      { name: 'SST Satellite Feed', score: 84 }
    ]
  },

  dataSources: [
    { name: 'Satellite Data (INSAT-3DR / Sentinel)', status: 'Available', latency: '4 min ago', quality: '91%', mode: 'SIMULATION' },
    { name: 'Ocean Data (INCOIS ROMS Model)', status: 'Available', latency: '12 min ago', quality: '88%', mode: 'SIMULATION' },
    { name: 'Weather Data (ECMWF / IMD HWRF)', status: 'Available', latency: '2 min ago', quality: '94%', mode: 'SIMULATION' },
    { name: 'Tide Gauge & Astronomical Tables', status: 'Available', latency: 'Real-time', quality: '96%', mode: 'CALCULATED' },
    { name: 'Historical Fishery Catch Logs', status: 'Available', latency: 'Historical', quality: '82%', mode: 'CACHED' }
  ]
};
