import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { ShieldCheck, AlertTriangle, Disc, Navigation, Compass, Eye } from 'lucide-react';
import { mockWeatherData } from '../../data/mockWeatherData';

export const CycloneTracker = () => {
  const { cycloneDetails } = mockWeatherData;
  const [showSimStorm, setShowSimStorm] = useState(false);

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-electric-lavender">
          <Disc className={`h-4 w-4 ${showSimStorm ? 'text-coral-red animate-spin' : 'text-bio-mint'}`} />
          CYCLONE & TROPICAL STORM TRACKER
        </CardTitle>
        <button
          onClick={() => setShowSimStorm(!showSimStorm)}
          className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border transition-colors ${
            showSimStorm
              ? 'bg-coral-red/20 border-coral-red/40 text-coral-red'
              : 'bg-white/5 border-white/10 text-cool-gray hover:text-soft-white'
          }`}
        >
          {showSimStorm ? 'Demo Storm Active' : 'Toggle Demo Storm'}
        </button>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-4">
        {!showSimStorm ? (
          <>
            <div className="flex items-center gap-3 p-3 bg-bio-mint/10 border border-bio-mint/30 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-bio-mint shrink-0" />
              <div>
                <span className="text-xs font-bold text-soft-white uppercase tracking-wider block">
                  {cycloneDetails.status}
                </span>
                <span className="text-[10px] text-cool-gray">Arabian Sea Sector (AS-04) clear of cyclonic vortices</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest block">Nearest Disturbance</span>
                <span className="text-xs font-mono font-bold text-soft-white mt-1 block">{cycloneDetails.nearestSystem}</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest block">Cyclogenesis Risk</span>
                <span className="text-xs font-mono font-bold text-bio-mint uppercase mt-1 block">{cycloneDetails.risk} Risk</span>
              </div>
            </div>

            <p className="text-[10px] text-cool-gray leading-tight italic">
              Monitored in continuous sync with IMD RSMC & JTWC advisory bulletins.
            </p>
          </>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2.5 bg-coral-red/15 border border-coral-red/30 rounded-xl">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-coral-red shrink-0 animate-pulse" />
                <div>
                  <span className="text-xs font-bold text-coral-red uppercase tracking-wider block">
                    {cycloneDetails.simulatedStorm.name}
                  </span>
                  <span className="text-[9px] text-cool-gray">{cycloneDetails.simulatedStorm.category}</span>
                </div>
              </div>
              <span className="text-[9px] font-mono font-bold text-coral-red uppercase">SIMULATED TRACK</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
                <span className="text-cool-gray uppercase tracking-wider block text-[8px]">Location</span>
                <span className="font-mono text-soft-white font-bold">{cycloneDetails.simulatedStorm.location}</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
                <span className="text-cool-gray uppercase tracking-wider block text-[8px]">Central Wind</span>
                <span className="font-mono text-coral-red font-bold">{cycloneDetails.simulatedStorm.windSpeed}</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
                <span className="text-cool-gray uppercase tracking-wider block text-[8px]">Central Pressure</span>
                <span className="font-mono text-soft-white font-bold">{cycloneDetails.simulatedStorm.pressure}</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
                <span className="text-cool-gray uppercase tracking-wider block text-[8px]">Movement</span>
                <span className="font-mono text-solar-amber font-bold">{cycloneDetails.simulatedStorm.direction}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
