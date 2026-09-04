import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Sliders, ShieldCheck, RefreshCw, CheckCircle2 } from 'lucide-react';
import { mockAlertsData } from '../../data/mockAlertsData';

export const AlertThresholdConfig = () => {
  const [waveLimit, setWaveLimit] = useState(2.2);
  const [windLimit, setWindLimit] = useState(35);
  const [lightningLimit, setLightningLimit] = useState(10);
  const [geofenceLimit, setGeofenceLimit] = useState(3.0);

  const resetRules = () => {
    setWaveLimit(2.2);
    setWindLimit(35);
    setLightningLimit(10);
    setGeofenceLimit(3.0);
  };

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-electric-lavender">
          <Sliders className="h-4 w-4" />
          ALERT TRIGGER & SENSITIVITY CONFIGURATION
        </CardTitle>
        <button
          onClick={resetRules}
          className="flex items-center gap-1 text-[9px] font-bold text-cool-gray hover:text-soft-white uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-0.5 rounded transition-colors"
        >
          <RefreshCw className="w-2.5 h-2.5" /> Reset Defaults
        </button>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-4">
        <p className="text-xs text-cool-gray leading-tight">
          Configure threshold rules that trigger automatic early warning broadcasts across fisherman mobile devices and onboard LoRaWAN beacons.
        </p>

        <div className="space-y-3">
          {/* Wave Height Trigger */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cool-gray uppercase text-[9px] font-bold tracking-wider">
                Wave Swell Warning Threshold
              </span>
              <span className="font-mono font-bold text-bio-mint">{waveLimit.toFixed(1)} m</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="4.5"
              step="0.1"
              value={waveLimit}
              onChange={(e) => setWaveLimit(Number(e.target.value))}
              className="w-full accent-bio-mint cursor-pointer"
            />
          </div>

          {/* Wind Speed Trigger */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cool-gray uppercase text-[9px] font-bold tracking-wider">
                Gale Wind Force Threshold
              </span>
              <span className="font-mono font-bold text-solar-amber">{windLimit} km/h</span>
            </div>
            <input
              type="range"
              min="15"
              max="60"
              value={windLimit}
              onChange={(e) => setWindLimit(Number(e.target.value))}
              className="w-full accent-solar-amber cursor-pointer"
            />
          </div>

          {/* Lightning Proximity Trigger */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cool-gray uppercase text-[9px] font-bold tracking-wider">
                Lightning Strike Proximity Limit
              </span>
              <span className="font-mono font-bold text-electric-lavender">{lightningLimit} km</span>
            </div>
            <input
              type="range"
              min="2"
              max="25"
              value={lightningLimit}
              onChange={(e) => setLightningLimit(Number(e.target.value))}
              className="w-full accent-electric-lavender cursor-pointer"
            />
          </div>

          {/* Geofence Boundary Buffer */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-cool-gray uppercase text-[9px] font-bold tracking-wider">
                Geofence & IMBL Safety Buffer
              </span>
              <span className="font-mono font-bold text-soft-white">{geofenceLimit.toFixed(1)} NM</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="10.0"
              step="0.5"
              value={geofenceLimit}
              onChange={(e) => setGeofenceLimit(Number(e.target.value))}
              className="w-full accent-bio-mint cursor-pointer"
            />
          </div>
        </div>

        <div className="bg-[#0B0B12] border border-white/10 p-2.5 rounded-lg flex items-center justify-between text-[10px] font-mono">
          <span className="text-cool-gray">Autonomous Rules Engine:</span>
          <span className="text-bio-mint font-bold">4 Active Triggers Engaged</span>
        </div>
      </CardContent>
    </Card>
  );
};
