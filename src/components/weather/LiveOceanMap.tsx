import { useState } from 'react';
import { Card, CardHeader, CardTitle } from '../ui/Card';
import { Layers, Maximize2, Compass, Waves, Wind, CloudRain, Zap, ShieldAlert, Target } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet';
import L from 'leaflet';

const vesselIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIgMjFoMjAiLz48cGF0aCBkPSJNMTYgNmg1bC0yIDdoLTEzbC0yLTdoNW0wIDBWM20wIDN2N20wLTMtNyA0bTcgLTRsNyA0Ii8+PC9zdmc+',
  iconSize: [26, 26],
  iconAnchor: [13, 13],
});

export const LiveOceanMap = () => {
  const position: [number, number] = [16.9902, 73.3120];
  const [activeLayers, setActiveLayers] = useState<string[]>(['sst', 'currents', 'pfz', 'vessel']);

  const toggleLayer = (layer: string) => {
    setActiveLayers((prev) =>
      prev.includes(layer) ? prev.filter((l) => l !== layer) : [...prev, layer]
    );
  };

  // Demo Zones
  const pfzZones = [
    { id: 'PFZ-01', lat: 16.85, lng: 73.45, temp: '28.1°C', wave: '1.0m', color: '#3EF0B5' },
    { id: 'PFZ-02', lat: 16.92, lng: 73.38, temp: '28.3°C', wave: '1.1m', color: '#3EF0B5' },
    { id: 'PFZ-03', lat: 17.05, lng: 73.25, temp: '28.6°C', wave: '1.2m', color: '#8B5CF6' },
    { id: 'PFZ-04', lat: 16.78, lng: 73.55, temp: '27.9°C', wave: '1.5m', color: '#FFB547' },
  ];

  // Demo simulated current stream vectors
  const currentVectors: [number, number][][] = [
    [[17.15, 73.10], [17.00, 73.25], [16.85, 73.40]],
    [[17.20, 73.25], [17.05, 73.38], [16.90, 73.52]],
    [[17.10, 72.95], [16.95, 73.12], [16.80, 73.28]],
  ];

  return (
    <Card className="h-full flex flex-col relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 flex flex-wrap items-center justify-between bg-[#1C1B2B]/40 z-[400] relative backdrop-blur-md px-4 py-3 gap-3">
        <div className="flex items-center gap-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-cool-gray">
            <Waves className="h-4 w-4 text-bio-mint drop-shadow-[0_0_8px_rgba(62,240,181,0.6)]" />
            LIVE OCEAN CONDITIONS & WEATHER STATE
          </CardTitle>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-bio-mint/10 border border-bio-mint/30">
            <span className="w-1.5 h-1.5 rounded-full bg-bio-mint animate-pulse"></span>
            <span className="text-[9px] font-bold text-bio-mint uppercase tracking-wider">LIVE TELEMETRY</span>
          </div>
        </div>

        {/* Layer Selector Bar */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'sst', label: 'SST Heatmap', icon: Compass },
            { id: 'wind', label: 'Wind Vector', icon: Wind },
            { id: 'waves', label: 'Wave Heights', icon: Waves },
            { id: 'currents', label: 'Currents Flow', icon: Compass },
            { id: 'rain', label: 'Precipitation', icon: CloudRain },
            { id: 'lightning', label: 'Lightning Cells', icon: Zap },
            { id: 'pfz', label: 'PFZ Polygons', icon: Target },
          ].map((layer) => {
            const active = activeLayers.includes(layer.id);
            const Icon = layer.icon;
            return (
              <button
                key={layer.id}
                onClick={() => toggleLayer(layer.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md transition-all ${
                  active
                    ? 'bg-bio-mint/20 border border-bio-mint/40 text-bio-mint shadow-[0_0_10px_rgba(62,240,181,0.2)]'
                    : 'bg-white/5 border border-white/10 text-cool-gray hover:text-soft-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3 h-3" />
                {layer.label}
              </button>
            );
          })}
        </div>
      </CardHeader>

      <div className="flex-1 w-full z-0 relative min-h-[420px] lg:min-h-[500px]">
        {/* Visual atmospheric glow overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay bg-aurora-violet/15"></div>

        <MapContainer
          center={position}
          zoom={10}
          scrollWheelZoom={false}
          className="absolute inset-0 w-full h-full z-0"
          style={{ background: '#0B0B12' }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; CARTO'
            className="map-tiles-abyssal"
          />

          {/* Vessel */}
          {activeLayers.includes('vessel') && (
            <Marker position={position} icon={vesselIcon}>
              <Popup className="glass-popup">
                <div className="font-bold text-soft-white">ORCA Marine Sensor Buoy / Vessel</div>
                <div className="text-xs text-cool-gray">Lat: 16.9902°N, Lng: 73.3120°E</div>
                <div className="text-xs text-bio-mint font-bold mt-1">SST: 28.4°C • Wave: 1.2m • Wind: 14 km/h</div>
              </Popup>
            </Marker>
          )}

          {/* Current vectors */}
          {activeLayers.includes('currents') &&
            currentVectors.map((pts, i) => (
              <Polyline
                key={i}
                positions={pts}
                color="#3EF0B5"
                weight={2.5}
                dashArray="8, 12"
                className="animate-[dash_4s_linear_infinite] drop-shadow-[0_0_8px_rgba(62,240,181,0.8)]"
              />
            ))}

          {/* PFZ Zones */}
          {activeLayers.includes('pfz') &&
            pfzZones.map((z) => (
              <Circle
                key={z.id}
                center={[z.lat, z.lng]}
                radius={3800}
                pathOptions={{
                  fillColor: z.color,
                  color: z.color,
                  weight: 2,
                  fillOpacity: z.id === 'PFZ-03' ? 0.25 : 0.12,
                  className: z.id === 'PFZ-03' ? 'animate-pulse-slow drop-shadow-[0_0_15px_currentColor]' : '',
                }}
              >
                <Popup className="glass-popup">
                  <div className="font-bold text-soft-white">{z.id} Ocean Profile</div>
                  <div className="text-xs text-cool-gray">Surface Temp: <span className="text-solar-amber font-bold">{z.temp}</span></div>
                  <div className="text-xs text-cool-gray">Significant Wave: <span className="text-electric-lavender font-bold">{z.wave}</span></div>
                </Popup>
              </Circle>
            ))}

          {/* SST Thermal Gradient Zone */}
          {activeLayers.includes('sst') && (
            <Circle
              center={[17.02, 73.20]}
              radius={9000}
              pathOptions={{
                fillColor: '#FFB547',
                color: '#FFB547',
                weight: 1,
                fillOpacity: 0.08,
                dashArray: '4, 8'
              }}
            />
          )}
        </MapContainer>

        {/* Ocean Current Pattern Simulation overlay */}
        {activeLayers.includes('currents') && (
          <div
            className="absolute inset-0 z-[300] pointer-events-none opacity-30 mix-blend-screen"
            style={{ animation: 'driftCurrents 18s infinite ease-in-out' }}
          >
            <svg width="100%" height="100%">
              <pattern id="currentStream" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                <path d="M 0 60 Q 30 30 60 60 T 120 60" fill="none" stroke="rgba(62,240,181,0.25)" strokeWidth="1.5" />
                <path d="M 0 90 Q 30 60 60 90 T 120 90" fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="1.2" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#currentStream)" />
            </svg>
          </div>
        )}

        {/* Simulated lightning flash in top-right */}
        {activeLayers.includes('lightning') && (
          <div className="absolute top-4 right-12 w-48 h-32 z-[310] pointer-events-none">
            <div className="w-full h-full bg-white/10 blur-3xl rounded-full" style={{ animation: 'lightning 8s infinite' }}></div>
          </div>
        )}

        {/* Simulation Watermark Badge */}
        <div className="absolute top-4 left-4 z-[400] flex items-center gap-2">
          <div className="flex items-center gap-2 bg-[#11111A]/95 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
            <span className="w-2 h-2 rounded-full bg-solar-amber animate-pulse"></span>
            <span className="text-[9px] font-bold text-solar-amber tracking-widest uppercase">SIMULATION MODE</span>
          </div>
        </div>

        {/* Live Map Legend */}
        <div className="absolute bottom-4 left-4 z-[400] flex flex-wrap items-center gap-4 bg-[#11111A]/90 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-2xl">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-bio-mint shadow-[0_0_6px_rgba(62,240,181,0.8)]"></div>
            <span className="text-[10px] text-cool-gray font-medium">Optimal Upwelling</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-aurora-violet shadow-[0_0_6px_rgba(139,92,246,0.8)]"></div>
            <span className="text-[10px] text-cool-gray font-medium">Recommended Zone (PFZ-03)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-[2px] bg-bio-mint border-dashed border-t-2"></div>
            <span className="text-[10px] text-cool-gray font-medium">Current Flow (SW 0.7 m/s)</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
