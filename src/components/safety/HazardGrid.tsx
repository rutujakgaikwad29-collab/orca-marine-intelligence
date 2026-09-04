import { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { AlertCircle, ChevronRight, X, ShieldAlert } from 'lucide-react';
import { mockSafetyData } from '../../data/mockSafetyData';

interface HazardGridProps {
  onHazardSelect?: (hazardId: string) => void;
}

export const HazardGrid = ({ onHazardSelect }: HazardGridProps) => {
  const [selectedHazard, setSelectedHazard] = useState<any | null>(null);
  const { hazards } = mockSafetyData;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'CRITICAL':
      case 'HIGH':
        return 'text-coral-red border-coral-red/30 bg-coral-red/10';
      case 'MODERATE':
        return 'text-solar-amber border-solar-amber/30 bg-solar-amber/10';
      case 'LOW':
      case 'SAFE':
      default:
        return 'text-bio-mint border-bio-mint/30 bg-bio-mint/10';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-bold text-cool-gray tracking-widest uppercase flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-solar-amber" /> LIVE HAZARD MATRIX TELEMETRY
        </h2>
        <span className="text-[10px] text-cool-gray font-mono">7 Key Vector Streams Active</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {hazards.map((h) => {
          const badgeClass = getRiskColor(h.risk);

          return (
            <Card
              key={h.id}
              onClick={() => {
                setSelectedHazard(h);
                if (onHazardSelect) onHazardSelect(h.id);
              }}
              className="glass-card border-white/5 p-3.5 flex flex-col justify-between h-[155px] hover:border-white/20 transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">{h.icon}</span>
                <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${badgeClass}`}>
                  {h.risk}
                </span>
              </div>

              <div>
                <span className="text-[8px] font-bold text-cool-gray uppercase tracking-widest block truncate">
                  {h.title}
                </span>
                <p className="text-xs font-bold text-soft-white font-mono mt-0.5 truncate">{h.value}</p>
                <span className="text-[9px] text-cool-gray block truncate">{h.status}</span>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[8px] text-cool-gray">
                <span className="font-mono">{h.trend}</span>
                <span className="text-electric-lavender group-hover:text-soft-white font-bold flex items-center">
                  Details <ChevronRight className="w-2.5 h-2.5 ml-0.5" />
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Details Modal */}
      {selectedHazard && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <Card className="glass-card border-white/10 max-w-md w-full p-6 relative bg-[#11111A]">
            <button
              onClick={() => setSelectedHazard(null)}
              className="absolute top-4 right-4 p-1.5 text-cool-gray hover:text-soft-white bg-white/5 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{selectedHazard.icon}</span>
              <div>
                <h3 className="text-sm font-bold text-soft-white uppercase tracking-wider">
                  {selectedHazard.title} HAZARD TELEMETRY
                </h3>
                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border inline-block mt-1 ${getRiskColor(selectedHazard.risk)}`}>
                  Risk Level: {selectedHazard.risk}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs bg-white/5 border border-white/10 p-3.5 rounded-xl mb-4">
              <div className="flex justify-between">
                <span className="text-cool-gray">Current Observed Value:</span>
                <span className="font-mono font-bold text-soft-white">{selectedHazard.value}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cool-gray">Operational Status:</span>
                <span className="font-bold text-bio-mint">{selectedHazard.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cool-gray">Trend Direction:</span>
                <span className="font-mono text-solar-amber">{selectedHazard.trend}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cool-gray">Telemetry Age:</span>
                <span className="font-mono text-cool-gray">{selectedHazard.lastUpdated}</span>
              </div>
            </div>

            <p className="text-xs text-soft-white/90 leading-relaxed bg-[#0B0B12] p-3 rounded-lg border border-white/5 mb-4">
              {selectedHazard.details}
            </p>

            <button
              onClick={() => setSelectedHazard(null)}
              className="w-full py-2 bg-bio-mint/20 hover:bg-bio-mint/30 border border-bio-mint/50 rounded-lg text-xs font-bold text-bio-mint uppercase tracking-wider transition-colors"
            >
              Acknowledge & Close
            </button>
          </Card>
        </div>
      )}
    </div>
  );
};
