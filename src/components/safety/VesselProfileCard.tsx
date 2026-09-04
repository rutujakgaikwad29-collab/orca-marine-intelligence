import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Ship, Users, Fuel, Gauge, Sliders } from 'lucide-react';
import type { VesselTypeProfile } from '../../data/mockSafetyData';
import { mockSafetyData } from '../../data/mockSafetyData';

interface VesselProfileCardProps {
  selectedVessel: VesselTypeProfile;
  onSelectVessel: (vessel: VesselTypeProfile) => void;
}

export const VesselProfileCard = ({ selectedVessel, onSelectVessel }: VesselProfileCardProps) => {
  const { vesselProfiles } = mockSafetyData;

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-soft-white">
          <Ship className="h-4 w-4 text-bio-mint" />
          ACTIVE VESSEL SEAKEEPING PROFILE
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint uppercase font-mono">
          PROFILE ACTIVE
        </span>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-4">
        {/* Vessel Selector Dropdown / Pills */}
        <div>
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest block mb-2">
            Select Craft Class for Adaptive Risk Weighting
          </span>

          <div className="grid grid-cols-2 gap-2">
            {vesselProfiles.map((v) => (
              <button
                key={v.id}
                onClick={() => onSelectVessel(v)}
                className={`p-2 rounded-xl text-left border transition-all ${
                  selectedVessel.id === v.id
                    ? 'bg-bio-mint/15 border-bio-mint/50 text-soft-white shadow-[0_0_12px_rgba(62,240,181,0.2)]'
                    : 'bg-white/5 border-white/10 text-cool-gray hover:text-soft-white hover:bg-white/10'
                }`}
              >
                <span className="text-xs font-bold block truncate">{v.name}</span>
                <span className="text-[9px] font-mono text-cool-gray block truncate">{v.type}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Vessel Specifications */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
            <span className="text-[8px] text-cool-gray block uppercase">LOA Length</span>
            <span className="font-mono font-bold text-soft-white">{selectedVessel.length}</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
            <span className="text-[8px] text-cool-gray block uppercase">Complement</span>
            <span className="font-mono font-bold text-soft-white">{selectedVessel.crew} Crew</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
            <span className="text-[8px] text-cool-gray block uppercase">Max Wave Limit</span>
            <span className="font-mono font-bold text-electric-lavender">{selectedVessel.maxWaveTolerance} m</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
            <span className="text-[8px] text-cool-gray block uppercase">Max Wind Limit</span>
            <span className="font-mono font-bold text-solar-amber">{selectedVessel.maxWindTolerance} km/h</span>
          </div>
        </div>

        <p className="text-[10px] text-cool-gray leading-tight italic">
          * Dynamic physics calibration: Risk equations scale according to craft displacement and beam inertia.
        </p>
      </CardContent>
    </Card>
  );
};
