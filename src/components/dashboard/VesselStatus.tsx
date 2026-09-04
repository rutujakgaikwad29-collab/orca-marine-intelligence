import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Navigation, Battery, Compass, Ship } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const VesselStatus = () => {
  const { vesselData } = useAppStore();

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      {/* Background glow */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-aurora-violet/10 blur-3xl rounded-full"></div>
      
      <CardHeader className="pb-3 border-b border-white/5 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-cool-gray">
          <Ship className="h-4 w-4 text-electric-lavender drop-shadow-[0_0_8px_rgba(183,148,246,0.6)]" />
          Live Vessel Telemetry
        </CardTitle>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bio-mint opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-bio-mint shadow-[0_0_8px_rgba(62,240,181,0.8)]"></span>
          </span>
          <span className="text-[10px] font-bold text-bio-mint uppercase tracking-widest">Live</span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 flex flex-col sm:flex-row relative z-10">
        {/* Left: Vessel Image */}
        <div className="w-full sm:w-2/5 h-40 sm:h-full relative overflow-hidden border-b sm:border-b-0 sm:border-r border-white/5 bg-[#0B0B12]/50 p-4 flex items-center justify-center">
          <img 
            src="/futuristic_vessel_1788198847211.jpg" 
            alt="Vessel Isometric" 
            className="w-full h-full object-cover rounded-lg opacity-80 mix-blend-screen drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1C1B2B] sm:block hidden"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B2B] to-transparent sm:hidden block"></div>
        </div>

        {/* Right: Stats Grid */}
        <div className="flex-1 p-4 grid grid-cols-2 gap-4 gap-y-6">
          <div>
            <p className="text-[10px] font-semibold text-cool-gray uppercase tracking-widest mb-1 flex items-center gap-1">
              <Navigation className="h-3 w-3 text-electric-lavender" /> Position
            </p>
            <p className="font-mono text-sm text-soft-white font-medium">{vesselData.latitude.toFixed(4)}° N</p>
            <p className="font-mono text-sm text-soft-white font-medium">{vesselData.longitude.toFixed(4)}° E</p>
            
            <p className="text-[10px] font-semibold text-cool-gray uppercase tracking-widest mb-1 mt-4">Speed</p>
            <p className="font-bold text-lg text-bio-mint">{vesselData.speed.toFixed(1)} km/h</p>
          </div>

          <div>
            <p className="text-[10px] font-semibold text-cool-gray uppercase tracking-widest mb-1 flex items-center gap-1">
              <Compass className="h-3 w-3 text-electric-lavender" /> Motion
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-cool-gray">Roll</p>
                <p className="font-mono text-sm text-soft-white">{vesselData.roll.toFixed(1)}°</p>
              </div>
              <div>
                <p className="text-xs text-cool-gray">Pitch</p>
                <p className="font-mono text-sm text-soft-white">{vesselData.pitch.toFixed(1)}°</p>
              </div>
            </div>
            
            <p className="text-[10px] font-semibold text-cool-gray uppercase tracking-widest mb-1 mt-4 flex items-center gap-1">
              <Battery className="h-3 w-3 text-electric-lavender" /> Fuel
            </p>
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full border-2 border-bio-mint/30 flex items-center justify-center shadow-[0_0_10px_rgba(62,240,181,0.2)]">
                <span className="text-xs font-bold text-bio-mint">{vesselData.fuelLevel}%</span>
              </div>
              <div>
                <p className="text-xs text-cool-gray">Usage</p>
                <p className="text-sm font-medium text-soft-white">{vesselData.fuelConsumption.toFixed(1)} L/hr</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
