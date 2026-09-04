import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { User, Ship, Gauge, Fuel, Compass, Anchor } from 'lucide-react';
import type { VesselProfile } from '../../data/mockSettingsData';

interface FishermanProfileCardProps {
  profile: VesselProfile;
  onChange: (updated: Partial<VesselProfile>) => void;
}

export const FishermanProfileCard = ({ profile, onChange }: FishermanProfileCardProps) => {
  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-bio-mint">
          <User className="h-4 w-4" />
          FISHERMAN & VESSEL REGISTRATION PROFILE
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          {profile.boatId}
        </span>
      </CardHeader>

      <CardContent className="p-5 flex-1 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
          {/* Fisherman Name */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-cool-gray uppercase tracking-wider block">
              Skipper / Fisherman Name
            </label>
            <input
              type="text"
              value={profile.fishermanName}
              onChange={(e) => onChange({ fishermanName: e.target.value })}
              className="w-full bg-[#0B0B12] border border-white/10 rounded-xl px-3 py-2 text-soft-white font-medium outline-none focus:border-bio-mint"
            />
          </div>

          {/* Vessel Name */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-cool-gray uppercase tracking-wider block">
              Vessel Name
            </label>
            <input
              type="text"
              value={profile.boatName}
              onChange={(e) => onChange({ boatName: e.target.value })}
              className="w-full bg-[#0B0B12] border border-white/10 rounded-xl px-3 py-2 text-soft-white font-medium outline-none focus:border-bio-mint"
            />
          </div>

          {/* Boat ID */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-cool-gray uppercase tracking-wider block">
              Official MMD Registration ID
            </label>
            <input
              type="text"
              value={profile.boatId}
              onChange={(e) => onChange({ boatId: e.target.value })}
              className="w-full bg-[#0B0B12] border border-white/10 rounded-xl px-3 py-2 text-soft-white font-mono outline-none focus:border-bio-mint"
            />
          </div>

          {/* Boat Type */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-cool-gray uppercase tracking-wider block">
              Vessel Craft Class
            </label>
            <select
              value={profile.boatType}
              onChange={(e) => onChange({ boatType: e.target.value })}
              className="w-full bg-[#0B0B12] border border-white/10 rounded-xl px-3 py-2 text-soft-white outline-none focus:border-bio-mint"
            >
              <option value="Mechanized Pelagic Gillnetter">Mechanized Pelagic Gillnetter (12-15m)</option>
              <option value="Single-Day FRP Trawler">Single-Day FRP Trawler (9-12m)</option>
              <option value="Multi-Day Longliner">Multi-Day Longliner (15-20m)</option>
              <option value="Traditional Motorized Canoe">Traditional Motorized Canoe (OLED-8m)</option>
              <option value="Deep Sea Purse Seiner">Deep Sea Purse Seiner (20-25m)</option>
            </select>
          </div>

          {/* Engine Type & HP */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-cool-gray uppercase tracking-wider block">
              Propulsion Engine & Rating
            </label>
            <input
              type="text"
              value={`${profile.engineType} (${profile.engineHp} HP)`}
              onChange={(e) => onChange({ engineType: e.target.value })}
              className="w-full bg-[#0B0B12] border border-white/10 rounded-xl px-3 py-2 text-soft-white outline-none focus:border-bio-mint"
            />
          </div>

          {/* Home Port */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-cool-gray uppercase tracking-wider block">
              Home Harbour / Base
            </label>
            <input
              type="text"
              value={profile.homePort}
              onChange={(e) => onChange({ homePort: e.target.value })}
              className="w-full bg-[#0B0B12] border border-white/10 rounded-xl px-3 py-2 text-soft-white outline-none focus:border-bio-mint"
            />
          </div>
        </div>

        {/* Numeric Telemetry Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-white/5 text-xs font-mono">
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
            <span className="text-[8px] text-cool-gray uppercase block">Bunker Tank</span>
            <span className="font-bold text-bio-mint">{profile.fuelCapacity} Liters</span>
          </div>

          <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
            <span className="text-[8px] text-cool-gray uppercase block">Max Range</span>
            <span className="font-bold text-electric-lavender">{profile.maxOperatingRange} NM (83 km)</span>
          </div>

          <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
            <span className="text-[8px] text-cool-gray uppercase block">Draft Depth</span>
            <span className="font-bold text-soft-white">{profile.keelDraft} m Keel</span>
          </div>

          <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
            <span className="text-[8px] text-cool-gray uppercase block">Crew Capacity</span>
            <span className="font-bold text-solar-amber">{profile.crewCount} Persons</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
