import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { MapPin, Navigation, Ship, Clock, Fuel, Gauge, Sparkles } from 'lucide-react';
import { mockRouteData } from '../../data/mockRouteData';

interface RouteInputPanelProps {
  selectedDestination: string;
  onDestinationChange: (destId: string) => void;
  onCalculate: () => void;
}

export const RouteInputPanel = ({
  selectedDestination,
  onDestinationChange,
  onCalculate,
}: RouteInputPanelProps) => {
  const [startPoint, setStartPoint] = useState('ratnagiri_port');
  const [departureTime, setDepartureTime] = useState('NOW');
  const { availableDestinations, vesselConfig } = mockRouteData;

  return (
    <Card className="glass-card border-white/10 relative overflow-hidden p-5">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-bio-mint" />
            <h3 className="text-xs font-bold text-soft-white uppercase tracking-widest">
              PLAN YOUR VOYAGE & CRUISE PARAMETERS
            </h3>
          </div>
          <span className="text-[10px] font-mono text-cool-gray">Multi-Agent Constraint Solver</span>
        </div>

        {/* Inputs Form Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Start Point */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-cool-gray uppercase tracking-widest flex items-center gap-1">
              <MapPin className="w-3 h-3 text-bio-mint" /> Start Point
            </label>
            <select
              value={startPoint}
              onChange={(e) => setStartPoint(e.target.value)}
              className="w-full bg-[#0B0B12] border border-white/10 rounded-xl p-2.5 text-soft-white font-mono focus:border-bio-mint outline-none"
            >
              <option value="ratnagiri_port">● Current GPS: Ratnagiri Port (16.99°N, 73.31°E)</option>
              <option value="mirkarwada">● Mirkarwada Fishing Harbour</option>
              <option value="jaigad">● Jaigad Port Basin</option>
            </select>
          </div>

          {/* Destination */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-cool-gray uppercase tracking-widest flex items-center gap-1">
              <Navigation className="w-3 h-3 text-electric-lavender" /> Destination Target
            </label>
            <select
              value={selectedDestination}
              onChange={(e) => onDestinationChange(e.target.value)}
              className="w-full bg-[#0B0B12] border border-white/10 rounded-xl p-2.5 text-soft-white font-mono focus:border-electric-lavender outline-none"
            >
              {availableDestinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Vessel Profile & Speed */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-cool-gray uppercase tracking-widest flex items-center gap-1">
              <Ship className="w-3 h-3 text-solar-amber" /> Vessel & Cruising Speed
            </label>
            <div className="bg-[#0B0B12] border border-white/10 rounded-xl p-2.5 flex items-center justify-between">
              <span className="font-bold text-soft-white truncate">{vesselConfig.name}</span>
              <span className="font-mono text-bio-mint font-bold shrink-0">{vesselConfig.cruisingSpeedKmH} km/h</span>
            </div>
          </div>

          {/* Departure Window & Fuel */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-cool-gray uppercase tracking-widest flex items-center gap-1">
              <Clock className="w-3 h-3 text-soft-white" /> Departure Window & Fuel
            </label>
            <div className="flex items-center gap-2">
              <select
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                className="flex-1 bg-[#0B0B12] border border-white/10 rounded-xl p-2.5 text-soft-white font-mono focus:border-bio-mint outline-none"
              >
                <option value="NOW">Depart: NOW (10:00 AM)</option>
                <option value="+1h">Depart: +1h (11:00 AM)</option>
                <option value="+2h">Depart: +2h (12:00 PM)</option>
              </select>
              <div className="bg-[#0B0B12] border border-white/10 rounded-xl p-2.5 flex items-center gap-1 shrink-0 font-mono text-bio-mint font-bold">
                <Fuel className="w-3.5 h-3.5" /> {vesselConfig.fuelAvailablePercent}%
              </div>
            </div>
          </div>
        </div>

        {/* Calculate Action Button */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] text-cool-gray italic hidden sm:block">
            * Constraints applied: 2.4m wave height threshold, restricted military sector buffer, tidal gate clearance.
          </span>
          <button
            onClick={onCalculate}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-bio-mint hover:bg-bio-mint/90 text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(62,240,181,0.4)] ml-auto"
          >
            <Sparkles className="w-4 h-4" /> CALCULATE OPTIMAL ROUTES
          </button>
        </div>
      </div>
    </Card>
  );
};
