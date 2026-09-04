import { Card, CardHeader, CardTitle } from '../ui/Card';
import { Map as MapIcon, Layers } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { mockFishingData } from '../../data/mockFishingData';

const vesselIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIgMjFoMjAiLz48cGF0aCBkPSJNMTYgNmg1bC0yIDdoLTEzbC0yLTdoNW0wIDBWM20wIDN2N20wLTMtNyA0bTcgLTRsNyA0Ii8+PC9zdmc+',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export const PFZMap = () => {
  const position: [number, number] = [16.9902, 73.3120];
  const { zones } = mockFishingData;

  const getColor = (suitability: number) => {
    if (suitability > 80) return '#3EF0B5';
    if (suitability > 70) return '#FFB547';
    return '#FF5C77';
  };

  return (
    <Card className="h-full flex flex-col relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 flex flex-row items-center justify-between bg-[#1C1B2B]/40 z-[400] relative backdrop-blur-md px-4 py-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-cool-gray">
          <MapIcon className="h-4 w-4 text-bio-mint drop-shadow-[0_0_8px_rgba(62,240,181,0.6)]" />
          POTENTIAL FISHING ZONES
        </CardTitle>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold tracking-widest uppercase text-soft-white border border-white/10 rounded-full hover:bg-white/5 transition-colors bg-white/5">
          <Layers className="h-3 w-3" /> Layers
        </button>
      </CardHeader>
      
      <div className="flex-1 w-full z-0 relative min-h-[300px]">
        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay bg-aurora-violet/20"></div>
        <MapContainer center={position} zoom={10} scrollWheelZoom={false} className="absolute inset-0 w-full h-full z-0" style={{ background: '#0B0B12' }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; CARTO'
            className="map-tiles-abyssal"
          />
          <Marker position={position} icon={vesselIcon}>
            <Popup className="glass-popup">Vessel ORCA-V01</Popup>
          </Marker>

          {/* Route to PFZ-03 */}
          <Polyline positions={[position, [17.05, 73.25]]} color="#3EF0B5" weight={3} dashArray="10, 10" className="drop-shadow-[0_0_8px_rgba(62,240,181,0.8)] animate-[dash_5s_linear_infinite]" />

          {zones.map(zone => (
            <Circle
              key={zone.id}
              center={[zone.lat, zone.lng]}
              pathOptions={{ 
                fillColor: getColor(zone.suitability), 
                color: getColor(zone.suitability),
                weight: 2,
                fillOpacity: zone.id === 'PFZ-03' ? 0.3 : 0.15,
                className: zone.id === 'PFZ-03' ? 'animate-pulse-slow drop-shadow-[0_0_20px_currentColor]' : ''
              }}
              radius={zone.suitability > 80 ? 4500 : 3500}
            >
              <Popup className="glass-popup min-w-[200px]">
                <div className="font-bold text-soft-white text-lg border-b border-white/10 pb-2 mb-2">{zone.id}</div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-cool-gray uppercase">Suitability</span>
                  <span className="font-bold text-bio-mint">{zone.suitability}%</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-cool-gray uppercase">Distance</span>
                  <span className="text-soft-white text-xs">{zone.distance} km</span>
                </div>
                <button className="w-full mt-3 py-1.5 bg-bio-mint/20 border border-bio-mint/50 rounded text-[10px] font-bold text-bio-mint uppercase tracking-widest hover:bg-bio-mint/30 transition-colors">
                  Analyze Zone
                </button>
              </Popup>
            </Circle>
          ))}
        </MapContainer>
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 z-[300] pointer-events-none opacity-[0.03] mix-blend-overlay">
          <svg width="100%" height="100%">
            <pattern id="gridPFZ" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8B5CF6" strokeWidth="1"/></pattern>
            <rect width="100%" height="100%" fill="url(#gridPFZ)" />
          </svg>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-[400] flex flex-col gap-2 bg-[#11111A]/90 border border-white/10 backdrop-blur-md px-3 py-3 rounded-xl shadow-2xl">
          <p className="text-[9px] font-bold tracking-widest uppercase text-cool-gray mb-1">Suitability</p>
          <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-bio-mint shadow-[0_0_8px_rgba(62,240,181,0.8)]"></div><span className="text-[10px] font-medium text-soft-white">High (&gt;80%)</span></div>
          <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-solar-amber shadow-[0_0_8px_rgba(255,181,71,0.8)]"></div><span className="text-[10px] font-medium text-soft-white">Medium (70-80%)</span></div>
          <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-coral-red shadow-[0_0_8px_rgba(255,92,119,0.8)]"></div><span className="text-[10px] font-medium text-soft-white">Low (&lt;70%)</span></div>
        </div>
      </div>
    </Card>
  );
};
