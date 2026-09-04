import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, LayersControl, LayerGroup } from 'react-leaflet';
import { Layers, Target, Clock, Filter, AlertCircle, RefreshCw } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useAppStore } from '../store/useAppStore';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const vesselIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIgMjFoMjAiLz48cGF0aCBkPSJNMTYgNmg1bC0yIDdoLTEzbC0yLTdoNW0wIDBWM20wIDN2N20wLTMtNyA0bTcgLTRsNyA0Ii8+PC9zdmc+',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

export const LiveMarineMap = () => {
  const { vesselData, pfzZones } = useAppStore();
  const position: [number, number] = [vesselData.latitude, vesselData.longitude];
  
  const [map, setMap] = useState<L.Map | null>(null);

  const route: [number, number][] = [
    [16.8500, 73.4500],
    [16.9000, 73.4000],
    [16.9500, 73.3500],
    position
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return '#3EF0B5'; // Bio-mint
      case 'Moderate': return '#FFB547'; // Solar-amber
      case 'High': return '#FF5C77'; // Coral-red
      case 'Critical': return '#FF5C77';
      default: return '#3EF0B5';
    }
  };

  const handleCenter = () => {
    if (map) {
      map.setView(position, 10, { animate: true });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-8rem)] gap-4 w-full">
      {/* Map Container */}
      <Card className="flex-1 relative overflow-hidden glass-card rounded-xl border-white/5">
        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay bg-aurora-violet/10"></div>
        <MapContainer 
          center={position} 
          zoom={10} 
          scrollWheelZoom={true} 
          className="absolute inset-0 w-full h-full z-0 bg-[#0B0B12]" 
          zoomControl={false}
          ref={setMap}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            className="map-tiles-abyssal"
          />
          
          <LayersControl position="topleft">
            <LayersControl.Overlay checked name="Vessel Tracking">
              <LayerGroup>
                <Marker position={position} icon={vesselIcon}>
                  <Popup className="glass-popup">
                    <div className="font-semibold text-soft-white mb-1">Your Vessel</div>
                    <div className="text-xs text-cool-gray">Lat: {vesselData.latitude.toFixed(4)}</div>
                    <div className="text-xs text-cool-gray">Lng: {vesselData.longitude.toFixed(4)}</div>
                    <div className="text-xs text-cool-gray mt-1">Speed: {vesselData.speed.toFixed(1)} km/h</div>
                  </Popup>
                </Marker>
                <Polyline positions={route} color="#8B5CF6" weight={3} dashArray="10, 10" className="drop-shadow-[0_0_8px_rgba(139,92,246,0.8)] animate-[dash_5s_linear_infinite]" />
              </LayerGroup>
            </LayersControl.Overlay>

            <LayersControl.Overlay checked name="Potential Fishing Zones (PFZ)">
              <LayerGroup>
                {pfzZones.map(zone => (
                  <Circle
                    key={zone.id}
                    center={[zone.latitude, zone.longitude]}
                    pathOptions={{ 
                      fillColor: getRiskColor(zone.risk), 
                      color: getRiskColor(zone.risk),
                      weight: 2,
                      fillOpacity: 0.15,
                      className: 'animate-pulse-slow drop-shadow-[0_0_15px_currentColor]'
                    }}
                    radius={4000}
                  >
                    <Popup className="glass-popup min-w-[200px]">
                      <div className="font-bold text-soft-white mb-2">{zone.name}</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="text-cool-gray">Suitability</div>
                        <div className="text-bio-mint font-bold text-right">{zone.suitabilityScore}%</div>
                        <div className="text-cool-gray">Distance</div>
                        <div className="text-soft-white font-medium text-right">{zone.distance} km</div>
                        <div className="text-cool-gray">Risk Level</div>
                        <div className="font-bold text-right" style={{ color: getRiskColor(zone.risk) }}>{zone.risk}</div>
                      </div>
                      <button className="mt-3 w-full bg-white/10 hover:bg-white/20 text-soft-white text-xs py-1.5 rounded transition-colors">Plan Route</button>
                    </Popup>
                  </Circle>
                ))}
              </LayerGroup>
            </LayersControl.Overlay>

            <LayersControl.Overlay name="Cyclone Zones">
              <LayerGroup>
                {/* Mock Cyclone Zone */}
                <Circle
                  center={[16.5000, 72.8000]}
                  pathOptions={{ 
                    fillColor: '#FF5C77', 
                    color: '#FF5C77',
                    weight: 2,
                    fillOpacity: 0.2,
                    dashArray: '10, 10'
                  }}
                  radius={15000}
                >
                  <Popup className="glass-popup">
                    <div className="font-bold text-coral-red flex items-center gap-2"><AlertCircle className="w-4 h-4" /> SEVERE STORM WARNING</div>
                    <div className="text-xs text-soft-white mt-1">Expected to intensify in 4 hours.</div>
                  </Popup>
                </Circle>
              </LayerGroup>
            </LayersControl.Overlay>
            
            <LayersControl.Overlay name="Restricted Maritime Areas">
              <LayerGroup>
                {/* Mock Restricted Zone */}
                <Circle
                  center={[17.1000, 73.1000]}
                  pathOptions={{ 
                    fillColor: '#FFB547', 
                    color: '#FFB547',
                    weight: 1,
                    fillOpacity: 0.1,
                    dashArray: '5, 5'
                  }}
                  radius={8000}
                >
                  <Popup className="glass-popup">
                    <div className="font-bold text-solar-amber">RESTRICTED ZONE</div>
                    <div className="text-xs text-soft-white mt-1">Naval exercise area. Do not enter.</div>
                  </Popup>
                </Circle>
              </LayerGroup>
            </LayersControl.Overlay>

          </LayersControl>
        </MapContainer>

        {/* Living Digital Ocean Overlays */}
        
        {/* Ocean Currents (Animated subtle SVG patterns) */}
        <div className="absolute inset-0 z-[300] pointer-events-none opacity-30 mix-blend-screen" style={{ animation: 'driftCurrents 20s infinite ease-in-out' }}>
          <svg width="100%" height="100%">
            <pattern id="currents2" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 0 50 Q 25 25 50 50 T 100 50" fill="none" stroke="rgba(62,240,181,0.2)" strokeWidth="1" />
              <path d="M 0 70 Q 25 45 50 70 T 100 70" fill="none" stroke="rgba(139,92,246,0.1)" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#currents2)" />
          </svg>
        </div>

        {/* Storm/Clouds in Top Right */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 z-[310] pointer-events-none overflow-hidden">
          {/* Drifting Clouds */}
          <div className="absolute top-10 right-10 w-64 h-32 bg-[#0B0B12]/80 blur-3xl rounded-full" style={{ animation: 'driftClouds 60s infinite linear' }}></div>
          <div className="absolute top-20 right-40 w-48 h-24 bg-aurora-violet/20 blur-2xl rounded-full" style={{ animation: 'driftClouds 45s infinite linear reverse' }}></div>
          
          {/* Lightning Flashes */}
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-white/20 blur-2xl rounded-full mix-blend-screen" style={{ animation: 'lightning 7s infinite' }}></div>
          <div className="absolute top-1/4 right-1/3 w-40 h-40 bg-white/10 blur-3xl rounded-full mix-blend-screen" style={{ animation: 'lightning 11s infinite' }}></div>
        </div>

        {/* Rain Particles overlay (Subtle vertical streaks) */}
        <div className="absolute top-0 right-0 w-1/3 h-full z-[305] pointer-events-none mix-blend-screen overflow-hidden opacity-30">
          <div className="w-[200%] h-[200%] absolute -top-[50%] -left-[50%] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjIwIj48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSI0IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMykiLz48L3N2Zz4=')] animate-[pulse_1s_infinite]" style={{ transform: 'rotate(15deg)' }}></div>
        </div>

        {/* Animated grid overlay to make it look like a digital twin */}
        <div className="absolute inset-0 z-[300] pointer-events-none opacity-[0.03] mix-blend-overlay">
          <svg width="100%" height="100%">
            <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8B5CF6" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid2)" />
          </svg>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 z-[400] flex flex-col gap-2 bg-[#11111A]/90 border border-white/10 backdrop-blur-md p-3 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <p className="text-[10px] font-bold tracking-widest text-cool-gray uppercase mb-1">Map Legend</p>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-bio-mint/20 border border-bio-mint shadow-[0_0_8px_rgba(62,240,181,0.8)]"></div><span className="text-xs font-medium text-soft-white">Safe / PFZ</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-solar-amber/20 border border-solar-amber shadow-[0_0_8px_rgba(255,181,71,0.8)]"></div><span className="text-xs font-medium text-soft-white">Restricted Area</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-coral-red/20 border border-coral-red shadow-[0_0_8px_rgba(255,92,119,0.8)]"></div><span className="text-xs font-medium text-soft-white">Danger / Cyclone</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-[2px] bg-electric-lavender border-dashed border-t-2 border-transparent mt-1"></div><span className="text-xs font-medium text-soft-white">Vessel Route</span></div>
        </div>
      </Card>

      {/* Floating Control Panel */}
      <Card className="w-full lg:w-80 flex flex-col glass-card border-white/5 rounded-xl h-auto lg:h-full overflow-y-auto">
        <div className="p-4 border-b border-white/5 bg-[#1C1B2B]/40">
          <h2 className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-soft-white">
            <Layers className="h-4 w-4 text-electric-lavender" />
            Layer Controls
          </h2>
        </div>

        <div className="p-4 flex-1 space-y-6">
          
          <div>
            <p className="text-[10px] font-bold tracking-widest text-cool-gray uppercase mb-3">Map Actions</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={handleCenter} className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-2 text-xs font-medium text-soft-white transition-colors">
                <Target className="w-3.5 h-3.5 text-bio-mint" /> Locate Vessel
              </button>
              <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-2 text-xs font-medium text-soft-white transition-colors">
                <RefreshCw className="w-3.5 h-3.5 text-electric-lavender" /> Reset View
              </button>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold tracking-widest text-cool-gray uppercase mb-3 flex items-center gap-2"><Filter className="w-3 h-3"/> Data Source</p>
            <select className="w-full bg-[#0B0B12] border border-white/10 rounded-lg p-2.5 text-xs text-soft-white outline-none focus:border-aurora-violet/50">
              <option>ISRO Satellite Composite</option>
              <option>INCOIS Live Feed</option>
              <option>IMD Weather Radar</option>
              <option>NOAA OceanWatch</option>
            </select>
          </div>

          <div>
            <p className="text-[10px] font-bold tracking-widest text-cool-gray uppercase mb-3 flex items-center gap-2"><Clock className="w-3 h-3"/> Temporal View</p>
            <select className="w-full bg-[#0B0B12] border border-white/10 rounded-lg p-2.5 text-xs text-soft-white outline-none focus:border-aurora-violet/50">
              <option>Live / Real-time</option>
              <option>+12 Hours Forecast</option>
              <option>+24 Hours Forecast</option>
              <option>+48 Hours Forecast</option>
              <option>Historical (Past 7 Days)</option>
            </select>
          </div>

          <div>
            <p className="text-[10px] font-bold tracking-widest text-cool-gray uppercase mb-3">Active Layers</p>
            <div className="space-y-2">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-xs font-medium text-soft-white group-hover:text-bio-mint transition-colors">Sea Surface Temp (SST)</span>
                <input type="checkbox" className="accent-bio-mint bg-white/10" defaultChecked />
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-xs font-medium text-soft-white group-hover:text-bio-mint transition-colors">Chlorophyll Concentration</span>
                <input type="checkbox" className="accent-bio-mint bg-white/10" />
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-xs font-medium text-soft-white group-hover:text-bio-mint transition-colors">Ocean Currents</span>
                <input type="checkbox" className="accent-bio-mint bg-white/10" defaultChecked />
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-xs font-medium text-soft-white group-hover:text-bio-mint transition-colors">Wind Speed</span>
                <input type="checkbox" className="accent-bio-mint bg-white/10" />
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-xs font-medium text-soft-white group-hover:text-bio-mint transition-colors">Wave Height</span>
                <input type="checkbox" className="accent-bio-mint bg-white/10" defaultChecked />
              </label>
            </div>
          </div>

        </div>
      </Card>
    </div>
  );
};
