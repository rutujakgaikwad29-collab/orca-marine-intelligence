import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Box, Eye, ShieldAlert, Compass, ArrowRight } from 'lucide-react';

export const SafetyOceanVersePreview = () => {
  return (
    <Card className="glass-card border-white/5 relative overflow-hidden group">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-coral-red">
          <Box className="h-4 w-4" />
          OCEANVERSE™ 3D SAFETY DIGITAL TWIN
        </CardTitle>
        <span className="text-[9px] font-bold text-solar-amber font-mono uppercase bg-solar-amber/10 border border-solar-amber/30 px-2 py-0.5 rounded">
          Geofence Boundary 3D Mesh
        </span>
      </CardHeader>

      <CardContent className="p-5 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Visual 3D Viewport representation */}
        <div className="w-full md:w-2/3 h-52 rounded-xl bg-black/60 border border-white/10 relative overflow-hidden flex items-center justify-center group/img">
          <img
            src="/marine_safety_shield.jpg"
            alt="3D Marine Safety Geofence Shield"
            className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover/img:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12] via-transparent to-black/40"></div>

          {/* Stylized Vessel & Danger Zone Marker */}
          <div className="relative z-10 flex flex-col items-center gap-1.5 text-center bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
            <div className="w-9 h-9 rounded-xl bg-coral-red/20 border border-coral-red/50 flex items-center justify-center text-coral-red shadow-[0_0_20px_rgba(255,92,119,0.5)] animate-pulse">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-soft-white uppercase tracking-widest block">
                3D Volumetric Wave & Geofence Barrier Shield
              </span>
              <p className="text-[10px] text-coral-red font-mono font-bold">
                Swell Height: 2.4m • Roll Angle: 8.4° • Exclusion Buffer: 18.4 NM
              </p>
            </div>
          </div>
        </div>

        {/* Right Details & CTA */}
        <div className="w-full md:w-1/3 flex flex-col justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-cool-gray uppercase tracking-widest block mb-1">
              Hazard Simulation Environment
            </span>
            <p className="text-xs text-soft-white/90 leading-relaxed">
              Experience realistic vessel rolling physics, breaking waves over shallow shoals, and spatial 3D geofence barrier fences in the digital twin engine.
            </p>
          </div>

          <button
            onClick={() => alert('3D OceanVerse Safety Simulation initializing...')}
            className="w-full py-2.5 bg-coral-red/20 hover:bg-coral-red/30 border border-coral-red/50 rounded-lg text-xs font-bold text-coral-red uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(255,92,119,0.2)]"
          >
            <Eye className="w-4 h-4" /> Open 3D Safety Simulation <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
