import { useState } from 'react';
import { Card, CardHeader, CardTitle } from '../ui/Card';
import { ShieldCheck, ShieldAlert, Layers, MapPin, AlertTriangle, Compass, Disc, Zap, Waves, Anchor } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, Polygon } from 'react-leaflet';
import L from 'leaflet';

const vesselIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIgMjFoMjAiLz48cGF0aCBkPSJNMTYgNmg1bC0yIDdoLTEzbC0yLTdoNW0wIDBWM20wIDN2N20wLTMtNyA0bTcgLTRsNyA0Ii8+PC9zdmc+',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

export const SafetyMap = () => {
  const position: [number, number] = [16.9902, 73.3120];
  const [layers, setLayers] = useState<string[]>([
    'vessel',
    'cyclone',
    'waves',
    'boundaries',
    'restricted',
    'lightning',
  ]);

  const toggleLayer = (layerKey: string) => {
    setLayers((prev) =>
      prev.includes(layerKey) ? prev.filter((k) => k !== layerKey) : [...prev, layerKey]
    );
  };

  // IMBL Line Coordinates (Simulated outer boundary)
  const imblLine: [number, number][] = [
    [17.50, 72.40],
    [17.00, 72.50],
    [16.50, 72.60],
    [16.00, 72.70],
  ];

  // Naval Restricted Zone Polygon (Sector 4)
  const navalRestrictedZone: [number, number][] = [
    [17.15, 73.05],
    [17.15, 72.85],
    [16.85, 72.85],
    [16.85, 73.05],
  ];

  // Marine Protected Area (Malvan Buffer)
  const mpaZone: [number, number][] = [
    [16.20, 73.30],
    [16.20, 73.10],
    [15.95, 73.10],
    [15.95, 73.30],
  ];

  // Simulated Cyclone Track
  const cycloneTrack: [number, number][] = [
    [15.40, 70.10], // Observed
    [16.20, 69.60], // 12h
    [17.10, 69.00], // 24h
    [18.80, 67.90], // 48h
  ];

  return (
    <Card className="h-full flex flex-col relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 flex flex-wrap items-center justify-between bg-[#1C1B2B]/40 z-[400] relative backdrop-blur-md px-4 py-3 gap-3">
        <div className="flex items-center gap-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-cool-gray">
            <ShieldAlert className="h-4 w-4 text-solar-amber drop-shadow-[0_0_8px_rgba(255,181,71,0.6)]" />
            LIVE MARINE SAFETY & GEOFENCE RADAR
          </CardTitle>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-bio-mint/10 border border-bio-mint/30">
            <span className="w-1.5 h-1.5 rounded-full bg-bio-mint animate-pulse"></span>
            <span className="text-[9px] font-bold text-bio-mint uppercase tracking-wider">GEOFENCE ACTIVE</span>
          </div>
        </div>

        {/* Safety Layer Selector Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'vessel', label: 'Vessel AIS', icon: Compass },
            { id: 'cyclone', label: 'Cyclone Track', icon: Disc },
            { id: 'waves', label: 'High Swell Zone', icon: Waves },
            { id: 'boundaries', label: 'Maritime Boundary', icon: Anchor },
            { id: 'restricted', label: 'Naval Exclusion', icon: ShieldAlert },
            { id: 'lightning', label: 'Lightning Cells', icon: Zap },
          ].map((l) => {
            const active = layers.includes(l.id);
            const Icon = l.icon;
            return (
              <button
                key={l.id}
                onClick={() => toggleLayer(l.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md transition-all ${
                  active
                    ? 'bg-solar-amber/20 border border-solar-amber/40 text-solar-amber shadow-[0_0_10px_rgba(255,181,71,0.2)]'
                    : 'bg-white/5 border border-white/10 text-cool-gray hover:text-soft-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3 h-3" />
                {l.label}
              </button>
            );
          })}
        </div>
      </CardHeader>

      <div className="flex-1 w-full z-0 relative min-h-[440px] lg:min-h-[520px]">
        {/* Visual atmospheric grid overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay bg-coral-red/5"></div>

        <MapContainer
          center={position}
          zoom={9}
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
          {layers.includes('vessel') && (
            <>
              <Marker position={position} icon={vesselIcon}>
                <Popup className="glass-popup">
                  <div className="font-bold text-soft-white">ORCA Harvester (IND-MH-04)</div>
                  <div className="text-xs text-cool-gray">Lat: 16.9902°N, Lng: 73.3120°E</div>
                  <div className="text-xs text-bio-mint font-bold mt-1">Geofence Status: Compliant (Inshore)</div>
                  <div className="text-[10px] text-solar-amber font-mono mt-0.5">Nearest Boundary: 18.4 NM</div>
                </Popup>
              </Marker>
              {/* Vessel Safety Buffer Circle (5 NM Safe Bubble) */}
              <Circle
                center={position}
                radius={9260} // 5 NM
                pathOptions={{
                  fillColor: '#3EF0B5',
                  color: '#3EF0B5',
                  weight: 1,
                  dashArray: '4, 8',
                  fillOpacity: 0.04,
                }}
              />
            </>
          )}

          {/* International Maritime Boundary Line */}
          {layers.includes('boundaries') && (
            <Polyline
              positions={imblLine}
              color="#FF5C77"
              weight={3}
              dashArray="6, 10"
              className="drop-shadow-[0_0_10px_rgba(255,92,119,0.8)]"
            >
              <Popup className="glass-popup">
                <div className="font-bold text-coral-red">International Maritime Boundary / EEZ Limit</div>
                <div className="text-xs text-cool-gray">Strict cross-border authorization required.</div>
              </Popup>
            </Polyline>
          )}

          {/* Naval Restricted Area */}
          {layers.includes('restricted') && (
            <Polygon
              positions={navalRestrictedZone}
              pathOptions={{
                fillColor: '#FFB547',
                color: '#FFB547',
                weight: 2,
                fillOpacity: 0.18,
                dashArray: '6, 6',
                className: 'animate-pulse-slow',
              }}
            >
              <Popup className="glass-popup">
                <div className="font-bold text-solar-amber">RESTRICTED: Naval Gunnery & Exercise Sector 4</div>
                <div className="text-xs text-cool-gray">Prohibited for civilian fishing craft (24/7).</div>
              </Popup>
            </Polygon>
          )}

          {/* Marine Protected Area */}
          {layers.includes('restricted') && (
            <Polygon
              positions={mpaZone}
              pathOptions={{
                fillColor: '#3EF0B5',
                color: '#3EF0B5',
                weight: 2,
                fillOpacity: 0.12,
              }}
            >
              <Popup className="glass-popup">
                <div className="font-bold text-bio-mint">PROTECTED: Malvan Marine Sanctuary Buffer</div>
                <div className="text-xs text-cool-gray">No bottom-trawling zone. Traditional crafts only.</div>
              </Popup>
            </Polygon>
          )}

          {/* High Wave Hazard Zone (2.4m - 3.2m swell area) */}
          {layers.includes('waves') && (
            <Circle
              center={[17.15, 73.15]}
              radius={12000}
              pathOptions={{
                fillColor: '#8B5CF6',
                color: '#8B5CF6',
                weight: 2,
                fillOpacity: 0.15,
                className: 'animate-pulse-slow',
              }}
            >
              <Popup className="glass-popup">
                <div className="font-bold text-electric-lavender">HAZARD: Elevated Swell Sector AS-03</div>
                <div className="text-xs text-cool-gray">Significant Wave Height: 2.4m — 3.1m</div>
              </Popup>
            </Circle>
          )}

          {/* Cyclone Track and Uncertainty Cones */}
          {layers.includes('cyclone') && (
            <>
              <Polyline
                positions={cycloneTrack}
                color="#FF5C77"
                weight={3}
                dashArray="4, 8"
                className="drop-shadow-[0_0_12px_rgba(255,92,119,0.9)] animate-[dash_3s_linear_infinite]"
              />
              <Circle
                center={[15.40, 70.10]}
                radius={25000}
                pathOptions={{ fillColor: '#FF5C77', color: '#FF5C77', weight: 2, fillOpacity: 0.25 }}
              />
              <Circle
                center={[17.10, 69.00]}
                radius={90000}
                pathOptions={{ fillColor: '#FF5C77', color: '#FF5C77', weight: 1, fillOpacity: 0.08, dashArray: '8, 8' }}
              />
            </>
          )}

          {/* Lightning Warning Zone */}
          {layers.includes('lightning') && (
            <Circle
              center={[17.12, 73.48]}
              radius={6000}
              pathOptions={{
                fillColor: '#FFB547',
                color: '#FFB547',
                weight: 1,
                fillOpacity: 0.2,
                dashArray: '3, 6',
              }}
            >
              <Popup className="glass-popup">
                <div className="font-bold text-solar-amber">LIGHTNING CONVECTIVE CELL</div>
                <div className="text-xs text-cool-gray">12 strikes detected (Inland Ghats corridor)</div>
              </Popup>
            </Circle>
          )}
        </MapContainer>

        {/* Top Floating Geofence Banner */}
        <div className="absolute top-4 left-4 z-[400] flex items-center gap-2">
          <div className="flex items-center gap-2 bg-[#11111A]/95 border border-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
            <span className="w-2 h-2 rounded-full bg-bio-mint shadow-[0_0_8px_rgba(62,240,181,0.8)]"></span>
            <span className="text-[9px] font-bold text-bio-mint tracking-widest uppercase">
              GEOFENCE: SAFE (18.4 NM CLEAR OF IMBL)
            </span>
          </div>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 z-[400] flex flex-wrap items-center gap-3 bg-[#11111A]/90 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-2xl">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-coral-red shadow-[0_0_6px_rgba(255,92,119,0.8)]"></div>
            <span className="text-[10px] text-cool-gray font-medium">IMBL Boundary</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-solar-amber/50 border border-solar-amber"></div>
            <span className="text-[10px] text-cool-gray font-medium">Naval Restricted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-bio-mint/40 border border-bio-mint"></div>
            <span className="text-[10px] text-cool-gray font-medium">Marine Sanctuary</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-electric-lavender"></div>
            <span className="text-[10px] text-cool-gray font-medium">High Swell Zone</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
