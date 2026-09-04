import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Siren, PhoneCall, Radio, Share2, MapPin, Anchor, X, CheckCircle2, AlertTriangle } from 'lucide-react';
import { mockSafetyData } from '../../data/mockSafetyData';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToHarbour?: () => void;
}

export const EmergencyModal = ({ isOpen, onClose, onNavigateToHarbour }: EmergencyModalProps) => {
  const [sosSent, setSosSent] = useState(false);
  const [locationShared, setLocationShared] = useState(false);
  const { emergencyContacts } = mockSafetyData;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[700] flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg">
      <Card className="glass-card border-coral-red/40 max-w-2xl w-full p-6 relative bg-[#11111A] shadow-[0_0_50px_rgba(255,92,119,0.3)]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-cool-gray hover:text-soft-white bg-white/5 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with pulsing beacon */}
        <div className="flex items-center gap-3 pb-4 border-b border-coral-red/30 mb-5">
          <div className="w-12 h-12 rounded-xl bg-coral-red/20 border border-coral-red/50 flex items-center justify-center text-coral-red shadow-[0_0_20px_rgba(255,92,119,0.6)] animate-pulse">
            <Siren className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-coral-red uppercase tracking-wider">
                🚨 EMERGENCY DISTRESS & EVACUATION PROTOCOL
              </h2>
            </div>
            <span className="text-[10px] text-solar-amber font-mono font-bold">
              SIMULATED MARITIME RESCUE COORDINATION (MRCC MUMBAI / COAST GUARD CH-16)
            </span>
          </div>
        </div>

        {/* Live Coordinates & Distress Telemetry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 text-xs">
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-[9px] text-cool-gray uppercase block font-bold">GPS Coordinates</span>
            <span className="font-mono font-bold text-soft-white text-sm mt-0.5 block">
              {emergencyContacts.vesselCoordinates}
            </span>
            <span className="text-[9px] text-bio-mint">AIS Transponder: ACTIVE (419001234)</span>
          </div>

          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <span className="text-[9px] text-cool-gray uppercase block font-bold">Primary Distress Channels</span>
            <span className="font-mono font-bold text-solar-amber text-sm mt-0.5 block">
              {emergencyContacts.distressChannel}
            </span>
            <span className="text-[9px] text-cool-gray">Coast Guard Toll-Free: 1554</span>
          </div>
        </div>

        {/* Emergency Contacts Directory */}
        <div className="space-y-2 mb-5 text-xs bg-[#0B0B12] border border-white/10 p-3.5 rounded-xl">
          <div className="flex justify-between border-b border-white/5 pb-1.5">
            <span className="text-cool-gray">Coast Guard MRCC Mumbai:</span>
            <span className="font-mono text-soft-white font-bold">{emergencyContacts.coastGuardMRCC}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-1.5">
            <span className="text-cool-gray">Coastal Marine Police (Ratnagiri):</span>
            <span className="font-mono text-soft-white font-bold">{emergencyContacts.marinePoliceRatnagiri}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cool-gray">Fisheries Dept Control Room:</span>
            <span className="font-mono text-soft-white font-bold">{emergencyContacts.fisheriesControlRoom}</span>
          </div>
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
          <button
            onClick={() => setSosSent(true)}
            className={`p-3 rounded-xl border text-center font-bold text-xs uppercase tracking-wider flex flex-col items-center justify-center gap-1.5 transition-all ${
              sosSent
                ? 'bg-bio-mint/20 border-bio-mint/50 text-bio-mint shadow-[0_0_15px_rgba(62,240,181,0.3)]'
                : 'bg-coral-red/20 hover:bg-coral-red/30 border-coral-red/60 text-coral-red animate-pulse'
            }`}
          >
            <Radio className="w-5 h-5" />
            {sosSent ? 'SOS TRANSMITTED' : 'BROADCAST SOS'}
          </button>

          <button
            onClick={() => setLocationShared(true)}
            className={`p-3 rounded-xl border text-center font-bold text-xs uppercase tracking-wider flex flex-col items-center justify-center gap-1.5 transition-all ${
              locationShared
                ? 'bg-bio-mint/20 border-bio-mint/50 text-bio-mint'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-soft-white'
            }`}
          >
            <Share2 className="w-5 h-5" />
            {locationShared ? 'LOCATION SHARED' : 'SHARE GPS POSITION'}
          </button>

          <button
            onClick={() => alert('Simulating direct sat-phone patch to Coast Guard MRCC...')}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-soft-white font-bold text-xs uppercase tracking-wider flex flex-col items-center justify-center gap-1.5 transition-all"
          >
            <PhoneCall className="w-5 h-5 text-solar-amber" />
            CALL COAST GUARD
          </button>

          <button
            onClick={() => {
              onClose();
              if (onNavigateToHarbour) onNavigateToHarbour();
            }}
            className="p-3 rounded-xl bg-bio-mint/20 hover:bg-bio-mint/30 border border-bio-mint/50 text-bio-mint font-bold text-xs uppercase tracking-wider flex flex-col items-center justify-center gap-1.5 transition-all shadow-[0_0_12px_rgba(62,240,181,0.2)]"
          >
            <Anchor className="w-5 h-5" />
            EVACUATE TO HARBOUR
          </button>
        </div>

        <p className="text-[10px] text-cool-gray text-center italic">
          * Simulated emergency dispatch interface for Smart India Hackathon operational demo.
        </p>
      </Card>
    </div>
  );
};
