import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Box, Eye, Compass, Navigation, ArrowRight } from 'lucide-react';

export const OceanVerseRoutePreview = () => {
  return (
    <Card className="glass-card border-white/5 relative overflow-hidden group">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-electric-lavender">
          <Box className="h-4 w-4" />
          OCEANVERSE™ 3D ROUTE TRAJECTORY TWIN
        </CardTitle>
        <span className="text-[9px] font-bold text-bio-mint font-mono uppercase bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          Raytraced Nav Mesh
        </span>
      </CardHeader>

      <CardContent className="p-5 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* 3D Viewport Teaser */}
        <div className="w-full md:w-2/3 h-52 rounded-xl bg-black/60 border border-white/10 relative overflow-hidden flex items-center justify-center group/img">
          <img
            src="/marine_3d_bathymetry_radar.jpg"
            alt="3D Marine Bathymetry Radar"
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover/img:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12] via-transparent to-black/40"></div>

          {/* Stylized Vessel Route Trajectory Badge */}
          <div className="relative z-10 flex flex-col items-center gap-1.5 text-center bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
            <div className="w-9 h-9 rounded-xl bg-bio-mint/20 border border-bio-mint/50 flex items-center justify-center text-bio-mint shadow-[0_0_20px_rgba(62,240,181,0.5)] animate-pulse">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-soft-white uppercase tracking-widest block">
                3D Hydrodynamic Course & Bathymetric Trajectory
              </span>
              <p className="text-[10px] text-bio-mint font-mono font-bold">
                Route D Active • Leg: 23.4 km • Swell Avoidance Vector
              </p>
            </div>
          </div>
        </div>

        {/* Details & CTA */}
        <div className="w-full md:w-1/3 flex flex-col justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-cool-gray uppercase tracking-widest block mb-1">
              Immersive Path Inspection
            </span>
            <p className="text-xs text-soft-white/90 leading-relaxed">
              Fly through the full 3D course to inspect real-time wave crest heights, leeward island shielding, and current shear vectors prior to physical departure.
            </p>
          </div>

          <button
            onClick={() => alert('3D OceanVerse Route Trajectory environment initializing...')}
            className="w-full py-2.5 bg-electric-lavender/20 hover:bg-electric-lavender/30 border border-electric-lavender/50 rounded-lg text-xs font-bold text-electric-lavender uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(139,92,246,0.2)]"
          >
            <Eye className="w-4 h-4" /> Open 3D Route Simulation <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
