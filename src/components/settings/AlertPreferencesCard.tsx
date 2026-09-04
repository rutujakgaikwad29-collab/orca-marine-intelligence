import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Bell, CloudRain, Waves, Zap, ShieldAlert, Fish, Fuel, Check } from 'lucide-react';
import type { AlertPreferences } from '../../data/mockSettingsData';

interface AlertPreferencesCardProps {
  preferences: AlertPreferences;
  onToggle: (key: keyof AlertPreferences) => void;
}

export const AlertPreferencesCard = ({ preferences, onToggle }: AlertPreferencesCardProps) => {
  const toggles = [
    { key: 'cycloneAlerts' as const, label: 'Cyclone & Gale Storm Alerts', desc: 'Severe cyclonic storm tracking & gale wind warnings', icon: CloudRain, color: 'text-solar-amber' },
    { key: 'waveAlerts' as const, label: 'Extreme Wave & Swell Warnings', desc: 'High wave crests (>2.0m) and resonant vessel roll', icon: Waves, color: 'text-bio-mint' },
    { key: 'lightningAlerts' as const, label: 'Convective Lightning Strikes', desc: 'Real-time lightning discharge clusters within 10 km', icon: Zap, color: 'text-electric-lavender' },
    { key: 'restrictedZoneAlerts' as const, label: 'Restricted Zone & IMBL Geofence', desc: 'Naval firing ranges, Marine Protected Areas & borders', icon: ShieldAlert, color: 'text-coral-red' },
    { key: 'fishZoneAlerts' as const, label: 'Potential Fishing Zone (PFZ) Hotspots', desc: 'High chlorophyll & thermal front aggregation advisories', icon: Fish, color: 'text-bio-mint' },
    { key: 'lowFuelAlerts' as const, label: 'Low Fuel Reserve & Range Warnings', desc: 'Alerts when bunker level drops below 25% safety reserve', icon: Fuel, color: 'text-solar-amber' },
  ];

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-solar-amber">
          <Bell className="h-4 w-4" />
          SAFETY ALERT CATEGORY TOGGLES
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          ALL 6 ACTIVE
        </span>
      </CardHeader>

      <CardContent className="p-4 flex-1 space-y-2.5">
        {toggles.map((item) => {
          const isChecked = preferences[item.key];

          return (
            <div
              key={item.key}
              onClick={() => onToggle(item.key)}
              className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                isChecked
                  ? 'bg-white/5 border-white/10 hover:border-white/20'
                  : 'bg-white/2 border-white/5 opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-black/40 border border-white/10">
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-soft-white">{item.label}</h4>
                  <p className="text-[10px] text-cool-gray">{item.desc}</p>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                  isChecked
                    ? 'bg-bio-mint border-bio-mint text-black shadow-[0_0_8px_rgba(62,240,181,0.5)]'
                    : 'bg-transparent border-white/20'
                }`}
              >
                {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
