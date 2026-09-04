import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Microscope, Database, Activity, Waves, Sparkles, FileText, ArrowRight } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

export const ResearcherDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-12 fade-in">
      <Card className="glass-card border-white/10 p-6 relative overflow-hidden bg-gradient-to-r from-[#11111A] via-[#1A182E] to-[#11111A] shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔬</span>
              <h1 className="text-2xl font-bold text-soft-white tracking-wide">
                Marine Biogeochemistry & Ocean Science Workspace
              </h1>
            </div>
            <p className="text-xs text-cool-gray">
              Principal Investigator: <strong className="text-soft-white">{user?.name}</strong> • Institution: {user?.organization}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
              <span className="text-bio-mint font-bold">Satellite Feeds: Sentinel-3 & MODIS Active</span>
              <span className="text-white/20">•</span>
              <span className="text-electric-lavender font-bold">Chlorophyll Ingest: 1.82 mg/m³</span>
              <span className="text-white/20">•</span>
              <span className="text-soft-white font-bold">ROMS Grid: 1 km Horizontal Mesh</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/fishing')}
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-bio-mint to-electric-lavender text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(62,240,181,0.4)] shrink-0"
          >
            <Database className="w-4 h-4 fill-black" /> 🌊 Explore Ocean Datasets
          </button>
        </div>
      </Card>

      {/* Science Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card border-white/5 p-4 flex flex-col justify-between">
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest">SST Front Gradient (&Delta;T)</span>
          <span className="text-3xl font-extrabold text-bio-mint font-mono my-1">0.8°C / 2km</span>
          <span className="text-[9px] text-cool-gray font-mono">Upwelling Boundary Validated</span>
        </Card>

        <Card className="glass-card border-white/5 p-4 flex flex-col justify-between">
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest">Mean Chlorophyll-a</span>
          <span className="text-3xl font-extrabold text-electric-lavender font-mono my-1">1.82 mg/m³</span>
          <span className="text-[9px] text-bio-mint font-mono">Optimal Trophic Aggregation</span>
        </Card>

        <Card className="glass-card border-white/5 p-4 flex flex-col justify-between">
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest">Ocean Current Shear</span>
          <span className="text-3xl font-extrabold text-soft-white font-mono my-1">0.7 m/s</span>
          <span className="text-[9px] text-cool-gray font-mono">West India Coastal Current</span>
        </Card>

        <Card className="glass-card border-white/5 p-4 flex flex-col justify-between">
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest">Dataset Provenance Trust</span>
          <span className="text-3xl font-extrabold text-bio-mint font-mono my-1">94%</span>
          <span className="text-[9px] text-bio-mint font-mono">5 High-Quality Data Sources</span>
        </Card>
      </div>

      {/* Deep Link to Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card border-white/5 p-5 space-y-3">
          <h3 className="text-xs font-bold text-soft-white uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-bio-mint" /> Potential Fishing Zone (PFZ) Model Diagnostics
          </h3>
          <p className="text-xs text-soft-white/90 leading-relaxed">
            Inspect satellite SST thermal front superposition, biological species probability curves, and historical catch correlation indices.
          </p>
          <button
            onClick={() => navigate('/fishing')}
            className="w-full py-2 bg-bio-mint/20 hover:bg-bio-mint/30 border border-bio-mint/50 rounded-xl text-xs font-bold text-bio-mint uppercase tracking-wider transition-colors"
          >
            Launch PFZ Analytics Suite &rarr;
          </button>
        </Card>

        <Card className="glass-card border-white/5 p-5 space-y-3">
          <h3 className="text-xs font-bold text-soft-white uppercase tracking-wider flex items-center gap-2">
            <Waves className="w-4 h-4 text-electric-lavender" /> Oceanographic Hydrodynamic Models
          </h3>
          <p className="text-xs text-soft-white/90 leading-relaxed">
            Review ROMS circulation models, wave spectra, tidal flux dissipation, and thermal layer stratification.
          </p>
          <button
            onClick={() => navigate('/weather')}
            className="w-full py-2 bg-electric-lavender/20 hover:bg-electric-lavender/30 border border-electric-lavender/50 rounded-xl text-xs font-bold text-electric-lavender uppercase tracking-wider transition-colors"
          >
            Open Hydrodynamic Workspace &rarr;
          </button>
        </Card>
      </div>
    </div>
  );
};
