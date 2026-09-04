import { useState } from 'react';
import { Card, CardHeader, CardTitle } from '../ui/Card';
import { Compass, Layers, MapPin, Target, ShieldAlert, Waves, Wind, CheckCircle2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, Polygon } from 'react-leaflet';
import L from 'leaflet';
import { mockRouteData } from '../../data/mockRouteData';
import type { RouteOption } from '../../data/mockRouteData';

// Icons for Leaflet
const startIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjM0VGMEI1IiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0xMiAyMWE4IDggMCAwIDEtOCA4di0yYTYgNiAwIDAgMSAxMiAwdi0yYTggOCAwIDAgMSA4IDh6Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMCIgcj0iMyIvPjwvc3ZnPg==',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const destIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjODBCNUY2IiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+PHBhdGggZD0ibTEwIDE1IDUtMy01LTMiLz48L3N2Zz4=',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

interface RouteMapProps {
  selectedRouteId: string;
  onSelectRoute: (routeId: string) => void;
}

export const RouteMap = ({ selectedRouteId, onSelectRoute }: RouteMapProps) => {
  const position: [number, number] = [17.0200, 73.2800];
  const { routes, defaultStart, defaultDestination } = mockRouteData;
  const [showHazards, setShowHazards] = useState(true);
  const [showCurrents, setShowCurrents] = useState(true);

  // Naval Restricted Zone Polygon (Sector 4)
  const navalRestrictedZone: [number, number][] = [
    [17.15, 73.05],
    [17.15, 72.85],
    [16.85, 72.85],
    [16.85, 73.05],
  ];

  return (
    <Card className="h-full flex flex-col relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 flex flex-wrap items-center justify-between bg-[#1C1B2B]/40 z-[400] relative backdrop-blur-md px-4 py-3 gap-3">
        <div className="flex items-center gap-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-bio-mint">
            <Compass className="h-4 w-4 drop-shadow-[0_0_8px_rgba(62,240,181,0.6)]" />
            MULTI-CANDIDATE MARINE NAVIGATION MAP
          </CardTitle>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-bio-mint/10 border border-bio-mint/30">
            <span className="w-1.5 h-1.5 rounded-full bg-bio-mint animate-pulse"></span>
            <span className="text-[9px] font-bold text-bio-mint uppercase tracking-wider">4 PARETO PATHS</span>
          </div>
        </div>

        {/* Map Layer Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHazards(!showHazards)}
            className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md border transition-all ${
              showHazards
                ? 'bg-solar-amber/20 border-solar-amber/40 text-solar-amber'
                : 'bg-white/5 border-white/10 text-cool-gray'
            }`}
          >
            <ShieldAlert className="w-3 h-3 inline mr-1" /> Hazard Zones
          </button>

          <button
            onClick={() => setShowCurrents(!showCurrents)}
            className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md border transition-all ${
              showCurrents
                ? 'bg-bio-mint/20 border-bio-mint/40 text-bio-mint'
                : 'bg-white/5 border-white/10 text-cool-gray'
            }`}
          >
            <Waves className="w-3 h-3 inline mr-1" /> Current Vectors
          </button>
        </div>
      </CardHeader>

      <div className="flex-1 w-full z-0 relative min-h-[460px] lg:min-h-[540px]">
        {/* Visual grid overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay bg-bio-mint/5"></div>

        <MapContainer
          center={position}
          zoom={11}
          scrollWheelZoom={false}
          className="absolute inset-0 w-full h-full z-0"
          style={{ background: '#0B0B12' }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; CARTO'
            className="map-tiles-abyssal"
          />

          {/* Start Marker (Ratnagiri Port) */}
          <Marker position={[defaultStart.lat, defaultStart.lng]} icon={startIcon}>
            <Popup className="glass-popup">
              <div className="font-bold text-bio-mint">Departure: {defaultStart.name}</div>
              <div className="text-xs text-cool-gray">Lat: {defaultStart.lat}°N, Lng: {defaultStart.lng}°E</div>
            </Popup>
          </Marker>

          {/* Destination Marker (PFZ-03) */}
          <Marker position={[defaultDestination.lat, defaultDestination.lng]} icon={destIcon}>
            <Popup className="glass-popup">
              <div className="font-bold text-electric-lavender">Target: {defaultDestination.name}</div>
              <div className="text-xs text-bio-mint font-bold">Suitability: {defaultDestination.suitability}%</div>
              <div className="text-[10px] text-cool-gray">Target: {defaultDestination.species}</div>
            </Popup>
          </Marker>

          {/* High Wave Swell Hazard Circle */}
          {showHazards && (
            <Circle
              center={[17.0200, 73.2800]}
              radius={3800}
              pathOptions={{
                fillColor: '#FF5C77',
                color: '#FF5C77',
                weight: 1.5,
                fillOpacity: 0.18,
                dashArray: '4, 6',
                className: 'animate-pulse-slow',
              }}
            >
              <Popup className="glass-popup">
                <div className="font-bold text-coral-red">HAZARD: Elevated 2.4m Wave Swell Zone</div>
                <div className="text-xs text-cool-gray">Crossed by Route B. Avoided by Routes A, C & D.</div>
              </Popup>
            </Circle>
          )}

          {/* Naval Sector Polygon */}
          {showHazards && (
            <Polygon
              positions={navalRestrictedZone}
              pathOptions={{
                fillColor: '#FFB547',
                color: '#FFB547',
                weight: 1.5,
                fillOpacity: 0.12,
                dashArray: '6, 6',
              }}
            >
              <Popup className="glass-popup">
                <div className="font-bold text-solar-amber">RESTRICTED: Naval Gunnery Sector 4</div>
              </Popup>
            </Polygon>
          )}

          {/* Render All 4 Candidate Routes */}
          {routes.map((r) => {
            const isSelected = selectedRouteId === r.id;
            const isRecommended = r.key === 'recommended';

            return (
              <Polyline
                key={r.id}
                positions={r.coordinates}
                color={r.strokeColor}
                weight={isSelected ? 5 : 2.5}
                opacity={isSelected ? 1.0 : 0.45}
                dashArray={isRecommended ? '8, 8' : undefined}
                className={`cursor-pointer transition-all ${
                  isSelected ? 'drop-shadow-[0_0_12px_currentColor]' : ''
                } ${isRecommended && isSelected ? 'animate-[dash_4s_linear_infinite]' : ''}`}
                eventHandlers={{
                  click: () => onSelectRoute(r.id),
                }}
              >
                <Popup className="glass-popup">
                  <div className="font-bold text-soft-white">{r.name}</div>
                  <div className="text-xs text-cool-gray">Distance: {r.distanceKm} km • ETA: {r.etaFormatted}</div>
                  <div className="text-xs text-bio-mint font-bold">Fuel: {r.fuelLiters} L • Risk: {r.riskScore}/100</div>
                  <button
                    onClick={() => onSelectRoute(r.id)}
                    className="mt-2 w-full py-1 bg-white/10 hover:bg-white/20 rounded text-[9px] font-bold uppercase text-soft-white"
                  >
                    Select This Route
                  </button>
                </Popup>
              </Polyline>
            );
          })}
        </MapContainer>

        {/* Floating Route Selector Pill Bar */}
        <div className="absolute top-4 left-4 z-[400] flex flex-wrap items-center gap-2">
          {routes.map((r) => {
            const isSelected = selectedRouteId === r.id;
            return (
              <button
                key={r.id}
                onClick={() => onSelectRoute(r.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold font-mono tracking-wider uppercase backdrop-blur-md transition-all ${
                  isSelected
                    ? 'bg-[#11111A] border-2 text-soft-white shadow-[0_4px_20px_rgba(0,0,0,0.8)]'
                    : 'bg-[#11111A]/80 border border-white/10 text-cool-gray hover:text-soft-white'
                }`}
                style={{ borderColor: isSelected ? r.strokeColor : undefined }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: r.strokeColor }}></span>
                {r.name.split('—')[0]}
              </button>
            );
          })}
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 z-[400] flex flex-wrap items-center gap-3 bg-[#11111A]/90 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-2xl text-[10px]">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1 rounded bg-[#3EF0B5] shadow-[0_0_6px_#3EF0B5]"></div>
            <span className="text-soft-white font-medium">Route D (ORCA ⭐)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1 rounded bg-[#8B5CF6]"></div>
            <span className="text-cool-gray">Route A (Safest)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1 rounded bg-[#FFB547]"></div>
            <span className="text-cool-gray">Route B (Fastest)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1 rounded bg-[#A78BFA]"></div>
            <span className="text-cool-gray">Route C (Fuel)</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
