export type AlertSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';

export interface AlertItem {
  id: string;
  severity: AlertSeverity;
  category: string;
  title: string;
  timestamp: string;
  location: string;
  source: string;
  description: string;
  metrics: {
    label: string;
    value: string;
  }[];
  voiceMessage: string;
  recommendedAction: string;
  actionRouteKey?: string;
  actionHarbourName?: string;
  acknowledged: boolean;
  muted: boolean;
}

export const mockAlertsData = {
  kpis: {
    totalAlerts: 12,
    criticalCount: 2,
    highCount: 3,
    mediumCount: 4,
    infoCount: 3,
    broadcastHealth: '100% Operational',
    activeDistressBeacons: 0,
  },

  activeAlerts: [
    {
      id: 'alt-crit-01',
      severity: 'CRITICAL',
      category: 'Severe Cyclone & Storm Swell',
      title: '🔴 CRITICAL MARINE ALERT: CYCLONIC ACTIVITY & SWELL SURGE',
      timestamp: 'Just now (10:48 AM)',
      location: 'Outer Shelf Sector AS-03 (14.2 km Ahead)',
      source: 'IMD Severe Cyclone Bulletin #07 + INCOIS Altimetry',
      description: 'Rapid cyclonic wind acceleration detected 14.2 km ahead. Significant wave swell rising abruptly to 3.1m with severe cross-sea turbulence.',
      metrics: [
        { label: 'Wave Height', value: '3.1 m' },
        { label: 'Wind Force', value: '48 km/h (Gusts: 62 km/h)' },
        { label: 'Risk Level', value: 'HIGH (84/100)' },
        { label: 'Distance', value: '14.2 km Ahead' },
      ],
      voiceMessage: 'Warning. Severe cyclonic weather and extreme waves detected fourteen kilometers ahead. ORCA recommends immediate course alteration to safe harbour.',
      recommendedAction: 'Immediate 180° course reversal or evasion to Mirkarwada Safe Basin.',
      actionRouteKey: 'route',
      actionHarbourName: 'Mirkarwada Port',
      acknowledged: false,
      muted: false,
    },
    {
      id: 'alt-crit-02',
      severity: 'CRITICAL',
      category: 'Geofence Breach',
      title: '🔴 RESTRICTED ZONE PROXIMITY BREACH',
      timestamp: '4 min ago',
      location: 'Naval Gunnery Sector 4 Perimeter',
      source: 'Geofence Radar Engine & AIS Gateway',
      description: 'Vessel trajectory is 1.8 NM from active naval firing exercise zone boundary. Automatic exclusion perimeter active.',
      metrics: [
        { label: 'Separation', value: '1.8 NM' },
        { label: 'Legal Limit', value: '3.0 NM Standoff' },
        { label: 'Authority', value: 'Indian Coast Guard' },
      ],
      voiceMessage: 'Alert. You are approaching a restricted naval zone. Alter heading immediately.',
      recommendedAction: 'Turn starboard +25° towards inshore corridor.',
      actionRouteKey: 'map',
      acknowledged: false,
      muted: false,
    },
    {
      id: 'alt-high-01',
      severity: 'HIGH',
      category: 'Lightning Hazard',
      title: '🟠 CONVECTIVE LIGHTNING CLUSTER FORMATION',
      timestamp: '12 min ago',
      location: 'Nearshore Corridor (8.4 km NE)',
      source: 'INSAT-3DR Rapid Lightning Feeds',
      description: '18 cloud-to-ground strikes detected within 10 km. Convective cell moving rapidly across coastal fairway.',
      metrics: [
        { label: 'Strikes Count', value: '18 / 10km' },
        { label: 'Nearest Strike', value: '8.4 km' },
        { label: 'Cell Speed', value: '22 km/h SW' },
      ],
      voiceMessage: 'Caution. Lightning activity detected eight kilometers away. Lower exposed radio antennae.',
      recommendedAction: 'Lower radio antenna and avoid exposed wet deck rigging.',
      acknowledged: false,
      muted: false,
    },
    {
      id: 'alt-high-02',
      severity: 'HIGH',
      category: 'Rapid Weather Deterioration',
      title: '🟠 AFTERNOON SWELL SUPERPOSITION',
      timestamp: '18 min ago',
      location: 'Shelf Fairway (2.4m Swell)',
      source: 'Ocean Wave Watch III Model',
      description: 'Wave period stretching to 9.2s inducing resonant vessel roll for craft under 15m.',
      metrics: [
        { label: 'Wave Period', value: '9.2 sec' },
        { label: 'Roll Angle', value: '&plusmn;12.4°' },
      ],
      voiceMessage: 'Caution. Ocean swell is increasing. Reduce cruising throttle.',
      recommendedAction: 'Reduce vessel throttle to 12 km/h and steer into wave crests at 45° angle.',
      acknowledged: true,
      muted: false,
    },
    {
      id: 'alt-med-01',
      severity: 'MEDIUM',
      category: 'Fisheries Shift',
      title: '🟡 FISHING ZONE SUITABILITY DISPERSAL',
      timestamp: '25 min ago',
      location: 'PFZ-01 Sector',
      source: 'Fishing Intelligence Agent',
      description: 'Thermal front in PFZ-01 has dispersed. Target pelagic school migrated 6 NM north to PFZ-03.',
      metrics: [
        { label: 'Old Suitability', value: '72% &rarr; 48%' },
        { label: 'New Hotspot', value: 'PFZ-03 (89%)' },
      ],
      voiceMessage: 'Notice. Fish aggregation in PFZ one has shifted north towards PFZ three.',
      recommendedAction: 'Redirect course to PFZ-03 for higher catch probability.',
      actionRouteKey: 'fishing',
      acknowledged: false,
      muted: false,
    },
    {
      id: 'alt-med-02',
      severity: 'MEDIUM',
      category: 'Fuel Efficiency',
      title: '🟡 BUNKER RESERVE CONSUMPTION ACCELERATION',
      timestamp: '32 min ago',
      location: 'Direct Route B Leg',
      source: 'Fuel & Vessel Agent',
      description: 'Headwind resistance on Direct Route B increases fuel burn rate by +23% (6.4 L/hr).',
      metrics: [
        { label: 'Fuel Burn Rate', value: '6.4 L/h' },
        { label: 'Current Reserve', value: '68% (Adequate)' },
      ],
      voiceMessage: 'Notice. Higher engine fuel consumption detected on current heading.',
      recommendedAction: 'Switch to Route D to utilize tail-current assist and save 1.8 liters.',
      actionRouteKey: 'route',
      acknowledged: true,
      muted: true,
    },
    {
      id: 'alt-info-01',
      severity: 'INFO',
      category: 'PFZ Detection',
      title: '🔵 NEW OPTIMAL PFZ DETECTED (PFZ-03)',
      timestamp: '40 min ago',
      location: '17.05° N, 73.25° E',
      source: 'Chlorophyll MODIS Satellite Ingest',
      description: 'High chlorophyll concentration (1.82 mg/m³) and stable SST front confirmed on outer shelf.',
      metrics: [
        { label: 'Suitability', value: '89%' },
        { label: 'Species', value: 'Indian Mackerel' },
      ],
      voiceMessage: 'Information. New potential fishing zone validated at PFZ three.',
      recommendedAction: 'Inspect PFZ analysis in Fishing Intelligence tab.',
      actionRouteKey: 'fishing',
      acknowledged: true,
      muted: true,
    },
    {
      id: 'alt-info-02',
      severity: 'INFO',
      category: 'System Optimization',
      title: '🔵 MULTI-AGENT ROUTE D OPTIMIZED',
      timestamp: '52 min ago',
      location: 'Ratnagiri to Shelf Leg',
      source: 'Route Optimization Engine',
      description: 'Route D computed with 12% fuel savings and zero geofence conflicts.',
      metrics: [
        { label: 'Score', value: '96 / 100' },
        { label: 'Distance', value: '23.4 km' },
      ],
      voiceMessage: 'Information. Optimal navigation route D calculated.',
      recommendedAction: 'View candidate comparisons in Route Planner.',
      actionRouteKey: 'route',
      acknowledged: true,
      muted: true,
    },
  ] as AlertItem[],

  alertRules: [
    { id: 'rule_wave', name: 'Wave Height Warning Threshold', currentVal: 2.2, min: 1.0, max: 4.5, unit: 'm', enabled: true },
    { id: 'rule_wind', name: 'Wind Speed Gale Trigger', currentVal: 35, min: 15, max: 60, unit: 'km/h', enabled: true },
    { id: 'rule_lightning', name: 'Lightning Strike Proximity Limit', currentVal: 10, min: 2, max: 25, unit: 'km', enabled: true },
    { id: 'rule_geofence', name: 'IMBL & Naval Boundary Buffer', currentVal: 3.0, min: 1.0, max: 10.0, unit: 'NM', enabled: true },
  ],
};
