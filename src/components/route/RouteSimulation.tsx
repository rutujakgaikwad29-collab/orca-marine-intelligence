import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Play, Pause, RotateCcw, Ship, AlertTriangle, ShieldCheck, CheckCircle2, Sparkles, Navigation } from 'lucide-react';

export const RouteSimulation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100%
  const [replanned, setReplanned] = useState(false);
  const [eventAlert, setEventAlert] = useState<string | null>(null);

  // Simulation step tick
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          const next = prev + 5;

          // Trigger Dynamic Multi-Agent Replanning Event at 50%
          if (next >= 50 && next < 80 && !replanned) {
            setReplanned(true);
            setEventAlert(
              '⚠️ Real-Time Hazard Event: 38 km/h Wind Surge & 2.8m Swell Detected ahead! Safety Agent re-routed vessel to Leeward Contour Alpha.'
            );
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, replanned]);

  const resetSimulation = () => {
    setIsPlaying(false);
    setProgress(0);
    setReplanned(false);
    setEventAlert(null);
  };

  const currentKm = ((progress / 100) * 23.4).toFixed(1);
  const fuelBurned = ((progress / 100) * 7.8).toFixed(1);

  return (
    <Card id="journey-simulation" className="h-full flex flex-col group border-bio-mint/40 relative overflow-hidden glass-card bg-gradient-to-r from-bio-mint/5 via-[#11111A] to-aurora-violet/5 shadow-2xl">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-bio-mint/20 border border-bio-mint/40 text-bio-mint">
            <Play className="w-4 h-4 fill-bio-mint" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-soft-white">
              LIVE VOYAGE SIMULATOR & DYNAMIC MULTI-AGENT REPLANNING
            </CardTitle>
            <span className="text-[10px] text-bio-mint font-mono font-bold">
              SIH INNOVATION: REAL-TIME ADAPTIVE REROUTING ENGINE
            </span>
          </div>
        </div>

        {/* Play / Pause / Reset Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              isPlaying
                ? 'bg-solar-amber text-black'
                : 'bg-bio-mint text-black shadow-[0_0_15px_rgba(62,240,181,0.4)]'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-black" /> Pause Simulation
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-black" /> {progress === 0 ? 'Start Voyage' : 'Resume'}
              </>
            )}
          </button>

          <button
            onClick={resetSimulation}
            className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-cool-gray hover:text-soft-white border border-white/10 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-5">
        {/* Progress Tracker Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-soft-white flex items-center gap-1.5">
              <Ship className="w-4 h-4 text-bio-mint" /> Vessel Transit Progress: {progress}%
            </span>
            <span className="font-mono text-bio-mint font-bold">
              {currentKm} / 23.4 km • Fuel Burned: {fuelBurned} L
            </span>
          </div>

          <div className="h-3 w-full bg-black/50 rounded-full overflow-hidden flex p-0.5 border border-white/10 relative">
            <div
              className="h-full bg-gradient-to-r from-bio-mint to-electric-lavender rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(62,240,181,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between text-[9px] font-mono text-cool-gray">
            <span>WP1: Port Exit</span>
            <span className="hidden sm:inline">WP2: Coastal Jet</span>
            <span>WP3: Mid-Shelf (Replanning Trigger)</span>
            <span>WP4: PFZ-03 Arrival</span>
          </div>
        </div>

        {/* Dynamic Multi-Agent Replanning Alert Popup */}
        {eventAlert ? (
          <div className="bg-solar-amber/15 border border-solar-amber/40 rounded-xl p-4 space-y-2 animate-pulse">
            <div className="flex items-center gap-2 text-solar-amber">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">
                DYNAMIC MULTI-AGENT COLLABORATION ACTIVE
              </span>
            </div>
            <p className="text-xs text-soft-white/95 leading-relaxed">{eventAlert}</p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[9px] font-mono text-bio-mint font-bold">
              <span>✓ Safety Agent Alerted</span>
              <span>•</span>
              <span>✓ Route Agent Diverted Course</span>
              <span>•</span>
              <span>✓ Safe Arrival Secured</span>
            </div>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-cool-gray">
              <Sparkles className="w-4 h-4 text-bio-mint" />
              <span>Simulate progress to 50% to trigger real-time hazard detection and dynamic multi-agent re-routing demo.</span>
            </div>
            <span className="text-[10px] font-mono text-bio-mint font-bold uppercase hidden sm:block">
              AUTONOMOUS WATCHMAN
            </span>
          </div>
        )}

        {/* Telemetry HUD */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
          <div className="bg-[#0B0B12] border border-white/10 p-2.5 rounded-lg">
            <span className="text-[8px] text-cool-gray uppercase block">Current Speed</span>
            <span className="font-bold text-soft-white">18.2 km/h (9.8 kt)</span>
          </div>
          <div className="bg-[#0B0B12] border border-white/10 p-2.5 rounded-lg">
            <span className="text-[8px] text-cool-gray uppercase block">Heading</span>
            <span className="font-bold text-bio-mint">{replanned ? '315° NW (Detour)' : '285° WNW'}</span>
          </div>
          <div className="bg-[#0B0B12] border border-white/10 p-2.5 rounded-lg">
            <span className="text-[8px] text-cool-gray uppercase block">Remaining ETA</span>
            <span className="font-bold text-electric-lavender">{Math.max(0, 88 - Math.round((progress / 100) * 88))} min</span>
          </div>
          <div className="bg-[#0B0B12] border border-white/10 p-2.5 rounded-lg">
            <span className="text-[8px] text-cool-gray uppercase block">Route State</span>
            <span className={`font-bold ${replanned ? 'text-solar-amber' : 'text-bio-mint'}`}>
              {replanned ? 'ADAPTIVE REROUTE' : 'ON NOMINAL COURSE'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
