import { Card, CardHeader, CardTitle } from '../ui/Card';
import { Map as MapIcon, Maximize2, Layers, Target, MoreHorizontal } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useAppStore } from '../../store/useAppStore';
import { t } from '../../utils/translations';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom vessel icon
const vesselIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIgMjFoMjAiLz48cGF0aCBkPSJNMTYgNmg1bC0yIDdoLTEzbC0yLTdoNW0wIDBWM20wIDN2N20wLTMtNyA0bTcgLTRsNyA0Ii8+PC9zdmc+',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export const MarineMap = () => {
  const { vesselData, pfzZones, language } = useAppStore();
  const position: [number, number] = [vesselData.latitude, vesselData.longitude];
  
  // Dummy route
  const route: [number, number][] = [
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

  return (
    <Card className="h-full flex flex-col relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 flex flex-row items-center justify-between bg-[#1C1B2B]/40 z-[400] relative backdrop-blur-md px-4 py-3">
        <div className="flex items-center gap-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-cool-gray">
            <MapIcon className="h-4 w-4 text-electric-lavender drop-shadow-[0_0_8px_rgba(183,148,246,0.6)]" />
            {t('Live Marine Overview', language)}
          </CardTitle>
          <div className="flex items-center gap-1.5 ml-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bio-mint opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-bio-mint shadow-[0_0_8px_rgba(62,240,181,0.8)]"></span>
            </span>
            <span className="text-[9px] font-bold text-bio-mint uppercase tracking-widest">Real-time</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold tracking-widest uppercase text-soft-white border border-white/10 rounded-full hover:bg-white/5 transition-colors bg-white/5">
            <Layers className="h-3 w-3" /> Layers
          </button>
          <button className="p-1.5 text-cool-gray hover:text-soft-white border border-white/10 rounded-full hover:bg-white/5 transition-colors bg-white/5">
            <Target className="h-3 w-3" />
          </button>
          <button className="p-1.5 text-cool-gray hover:text-soft-white border border-white/10 rounded-full hover:bg-white/5 transition-colors bg-white/5">
            <Maximize2 className="h-3 w-3" />
          </button>
          <button className="p-1.5 text-cool-gray hover:text-soft-white border border-white/10 rounded-full hover:bg-white/5 transition-colors bg-white/5">
            <MoreHorizontal className="h-3 w-3" />
          </button>
        </div>
      </CardHeader>
      
      <div className="flex-1 w-full z-0 relative min-h-[300px]">
        {/* CSS Filter to make map fit Abyssal theme better */}
        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay bg-aurora-violet/20"></div>
        <MapContainer center={position} zoom={10} scrollWheelZoom={false} className="absolute inset-0 w-full h-full z-0" style={{ background: '#0B0B12' }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            className="map-tiles-abyssal"
          />
          
          <Marker position={position} icon={vesselIcon}>
            <Popup className="glass-popup">
              <div className="font-semibold text-soft-white">Your Vessel</div>
              <div className="text-xs text-cool-gray">Speed: {vesselData.speed.toFixed(1)} km/h</div>
              <div className="text-xs text-cool-gray">Heading: {Math.round(vesselData.heading)}°</div>
            </Popup>
          </Marker>

          <Polyline positions={route} color="#8B5CF6" weight={3} dashArray="10, 10" className="drop-shadow-[0_0_8px_rgba(139,92,246,0.8)] animate-[dash_5s_linear_infinite]" />

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
              radius={4000} // 4km
            >
              <Popup className="glass-popup">
                <div className="font-bold text-soft-white">{zone.name}</div>
                <div className="text-xs text-cool-gray">Suitability: <span className="text-bio-mint font-bold">{zone.suitabilityScore}%</span></div>
                <div className="text-xs text-cool-gray">Distance: {zone.distance} km</div>
              </Popup>
            </Circle>
          ))}
        </MapContainer>
        
        {/* Living Digital Ocean Overlays */}
        
        {/* Ocean Currents (Animated subtle SVG patterns) */}
        <div className="absolute inset-0 z-[300] pointer-events-none opacity-30 mix-blend-screen" style={{ animation: 'driftCurrents 20s infinite ease-in-out' }}>
          <svg width="100%" height="100%">
            <pattern id="currents" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 0 50 Q 25 25 50 50 T 100 50" fill="none" stroke="rgba(62,240,181,0.2)" strokeWidth="1" />
              <path d="M 0 70 Q 25 45 50 70 T 100 70" fill="none" stroke="rgba(139,92,246,0.1)" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#currents)" />
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
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8B5CF6" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 z-[400] flex flex-wrap items-center gap-4 bg-[#11111A]/90 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-bio-mint shadow-[0_0_8px_rgba(62,240,181,0.8)]"></div><span className="text-[10px] font-medium text-cool-gray">Safe Zone</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-solar-amber shadow-[0_0_8px_rgba(255,181,71,0.8)]"></div><span className="text-[10px] font-medium text-cool-gray">Moderate</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#FF8C42] shadow-[0_0_8px_rgba(255,140,66,0.8)]"></div><span className="text-[10px] font-medium text-cool-gray">High Risk</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-coral-red shadow-[0_0_8px_rgba(255,92,119,0.8)]"></div><span className="text-[10px] font-medium text-cool-gray">Critical</span></div>
          <div className="flex items-center gap-1.5"><div className="w-4 h-[2px] bg-bio-mint border-dashed border-t-2 border-transparent"></div><span className="text-[10px] font-medium text-cool-gray">Vessel Route</span></div>
          <div className="flex items-center gap-1.5"><div className="w-4 h-[2px] bg-aurora-violet border-dashed border-t-2 border-transparent"></div><span className="text-[10px] font-medium text-cool-gray">Maritime Boundary</span></div>
        </div>
        {/* Top Controls Badge */}
        <div className="absolute top-4 left-4 z-[400] flex items-center gap-2">
           <div className="flex items-center gap-2 bg-[#11111A]/90 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
             <span className="w-1.5 h-1.5 rounded-full bg-solar-amber shadow-[0_0_8px_rgba(246,180,76,0.8)] animate-pulse"></span>
             <span className="text-[9px] font-bold text-solar-amber tracking-widest uppercase">Simulation Data</span>
           </div>
        </div>

        {/* Zone Insights Panel */}
        <div className="absolute top-4 right-4 z-[400] w-64 bg-[#11111A]/90 border border-white/10 backdrop-blur-md rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5 bg-[#1C1B2B]/40">
            <h3 className="text-[10px] font-bold text-soft-white tracking-widest uppercase flex items-center gap-2">
              <Target className="w-3.5 h-3.5 text-bio-mint" /> Zone Insights
            </h3>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <p className="text-[10px] text-cool-gray uppercase tracking-widest mb-1">Nearest PFZ</p>
              <div className="flex items-end justify-between">
                <p className="text-sm font-bold text-soft-white">PFZ-03</p>
                <p className="text-xs font-mono text-cool-gray">18.4 km</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-[9px] text-cool-gray uppercase tracking-widest mb-1">Suitability</p>
                <p className="text-lg font-bold text-bio-mint">89%</p>
              </div>
              <div className="flex-1">
                <p className="text-[9px] text-cool-gray uppercase tracking-widest mb-1">Risk</p>
                <p className="text-lg font-bold text-bio-mint">Low</p>
              </div>
            </div>

            <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-[10px] font-bold text-soft-white uppercase tracking-widest transition-colors mt-2">
              View Full Analysis
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};
