export interface DataSourcePillar {
  id: string;
  title: string;
  icon: string;
  agency: string;
  status: 'LIVE' | 'SYNCING' | 'DEGRADED';
  lastUpdated: string;
  latencySec: number;
  dataQuality: number;
  metrics: {
    label: string;
    value: string;
    subtext?: string;
    color?: string;
  }[];
  description: string;
}

export const mockDataSources = {
  kpis: {
    totalStreams: 6,
    activeSensors: '8/8 Online',
    ingestRate: '128 MB/s',
    overallTrust: 94,
    lastGlobalSync: '12 sec ago',
  },

  satellite: {
    id: 'satellite',
    title: '1. 🛰️ Satellite Earth Observation',
    agency: 'ISRO (Oceansat-3 / INSAT-3DR) & ESA Copernicus (Sentinel-3)',
    status: 'LIVE',
    lastUpdated: '08:07 AM (2 min ago)',
    latencySec: 120,
    dataQuality: 96,
    description: 'High-resolution thermal infrared, optical ocean colour and radar altimetry providing continuous sea surface diagnostics.',
    metrics: [
      { label: 'Sea Surface Temp (SST)', value: '28.4°C', subtext: '&Delta;T = 0.8°C / 2km Front', color: 'text-bio-mint' },
      { label: 'Chlorophyll-a Concentration', value: '1.82 mg/m³', subtext: 'MODIS Ocean Colour Level 3', color: 'text-electric-lavender' },
      { label: 'Sea Surface Height Anomaly', value: '+4.2 cm', subtext: 'Sentinel-3 Altimetry', color: 'text-soft-white' },
      { label: 'Cloud Optical Thickness', value: '18% (Low)', subtext: 'INSAT-3DR Multispectral', color: 'text-bio-mint' },
    ],
  } as DataSourcePillar,

  weather: {
    id: 'weather',
    title: '2. 🌦️ Atmospheric & Meteorological Feeds',
    agency: 'India Meteorological Department (IMD) WRF 3km & ECMWF Open',
    status: 'LIVE',
    lastUpdated: '08:08 AM (1 min ago)',
    latencySec: 60,
    dataQuality: 92,
    description: 'Numerical weather prediction model grids forecasting coastal winds, cyclonic tracks, convective lightning, and precipitation.',
    metrics: [
      { label: 'Sustained Wind Vector', value: '28 km/h SW', subtext: 'Afternoon Gusts: 38 km/h', color: 'text-solar-amber' },
      { label: 'Barometric Air Pressure', value: '1012.4 hPa', subtext: 'Stable Coastal Gradient', color: 'text-soft-white' },
      { label: 'Cyclone Track (ARB-02)', value: '380 km WSW', subtext: 'Deep Depression Recurving NNW', color: 'text-bio-mint' },
      { label: 'Convective Lightning', value: '12 Strikes / 20km', subtext: 'Inland Cell Formation', color: 'text-electric-lavender' },
    ],
  } as DataSourcePillar,

  ocean: {
    id: 'ocean',
    title: '3. 🌊 Ocean Hydrodynamic & Wave Physics',
    agency: 'INCOIS ROMS (Regional Ocean Modeling System) & WaveWatch III',
    status: 'LIVE',
    lastUpdated: '08:05 AM (4 min ago)',
    latencySec: 240,
    dataQuality: 95,
    description: '3D hydrodynamic circulation models resolving significant wave heights, swell periods, surface currents, and bathymetry.',
    metrics: [
      { label: 'Significant Wave Height (Hs)', value: '2.4 m SW', subtext: 'Swell Peak Period: 8.4s', color: 'text-solar-amber' },
      { label: 'Surface Current Drift', value: '+0.7 m/s SW', subtext: 'West Coast Coastal Jet', color: 'text-bio-mint' },
      { label: 'Tidal Water Level', value: '+1.4 m', subtext: 'Rising Flood Tide Phase', color: 'text-soft-white' },
      { label: 'Keel Sounder Depth', value: '18.4 m', subtext: 'Bathymetric Nav Grid', color: 'text-electric-lavender' },
    ],
  } as DataSourcePillar,

  fisheries: {
    id: 'fisheries',
    title: '4. 🐟 Marine Fisheries & PFZ Intelligence',
    agency: 'ICAR-CMFRI & INCOIS Potential Fishing Zone (PFZ) Advisories',
    status: 'LIVE',
    lastUpdated: '07:56 AM (12 min ago)',
    latencySec: 720,
    dataQuality: 89,
    description: 'Marine biological thermal-chlorophyll front correlation models predicting pelagic fish aggregation and commercial catch yield.',
    metrics: [
      { label: 'PFZ Target Suitability', value: '89% (PFZ-03)', subtext: 'Optimal Chlorophyll Overlap', color: 'text-bio-mint' },
      { label: 'Fish Aggregation Index', value: '87% Probable', subtext: 'Pelagic Indian Mackerel', color: 'text-bio-mint' },
      { label: 'Distance from Port', value: '18.4 km (10 NM)', subtext: 'Fairway Bearing 285°', color: 'text-electric-lavender' },
      { label: 'Historical Catch Yield', value: 'Above Average', subtext: 'CMFRI 10-Yr Grid Benchmark', color: 'text-soft-white' },
    ],
  } as DataSourcePillar,

  boatIoT: {
    id: 'boat',
    title: '5. 🚤 Onboard Vessel IoT & Telemetry Bus',
    agency: 'Vessel NMEA 0183 Serial Bus, AIS Class B & LoRaWAN Gateway',
    status: 'LIVE',
    lastUpdated: 'Real-Time (1 sec ago)',
    latencySec: 1,
    dataQuality: 99,
    description: 'Live sensor telemetry streamed from the vessel bridge including DGPS positioning, bunker flowmeters, engine RPM and battery status.',
    metrics: [
      { label: 'DGPS Coordinates', value: '16.9902°N, 73.3120°E', subtext: 'HDOP: 0.8 (Precision Fix)', color: 'text-bio-mint' },
      { label: 'Cruising Speed & Heading', value: '18.2 km/h • 285°', subtext: '9.8 kt (Standard Cruise)', color: 'text-soft-white' },
      { label: 'Bunker Fuel Tank Level', value: '72% (468 Liters)', subtext: 'Safe Operational Reserve', color: 'text-solar-amber' },
      { label: 'Battery & Sensor Bus', value: '91% • 8/8 Online', subtext: 'NMEA 0183 & LoRa Linked', color: 'text-bio-mint' },
    ],
  } as DataSourcePillar,

  healthTable: [
    { source: '🛰️ Satellite Feeds', provider: 'ISRO / ESA Copernicus', status: 'Online', latency: '2 min ago', reliability: '96%', protocol: 'GeoTIFF / HDF5' },
    { source: '🌦️ Weather Forecasts', provider: 'IMD WRF / ECMWF', status: 'Online', latency: '1 min ago', reliability: '92%', protocol: 'GRIB2 / NetCDF' },
    { source: '🌊 Ocean ROMS Model', provider: 'INCOIS Hyderabad', status: 'Online', latency: '4 min ago', reliability: '95%', protocol: 'OPeNDAP / WMS' },
    { source: '🐟 Fisheries PFZ Data', provider: 'CMFRI / INCOIS', status: 'Online', latency: '12 min ago', reliability: '89%', protocol: 'JSON / GeoJSON' },
    { source: '🚤 Onboard IoT Bus', provider: 'NMEA 0183 / AIS Transponder', status: 'Connected', latency: 'Live (1s)', reliability: '99%', protocol: 'Serial / LoRaWAN' },
    { source: '📍 Satellite DGPS', provider: 'NavIC / GPS L1/L5', status: 'Connected', latency: 'Live (0.5s)', reliability: '99%', protocol: 'NMEA GGA/RMC' },
  ],
};
