import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { CloudRain, Waves, Activity, Wind, Database, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

export const AnalystDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-12 fade-in">
      <Card className="glass-card border-white/10 p-6 relative overflow-hidden bg-gradient-to-r from-[#11111A] via-[#141A28] to-[#11111A] shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌊</span>
              <h1 className="text-2xl font-bold text-soft-white tracking-wide">
                Oceanographic Forecasting & Numerical Modeling
              </h1>
            </div>
            <p className="text-xs text-cool-gray">
              Lead Analyst: <strong className="text-soft-white">{user?.name}</strong> • Centre: {user?.organization}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
              <span className="text-bio-mint font-bold">ROMS & WRF 3km Model Runs Active</span>
              <span className="text-white/20">•</span>
              <span className="text-solar-amber font-bold">Cyclone ARB-02 Track: NNW 14 km/h</span>
              <span className="text-white/20">•</span>
              <span className="text-electric-lavender font-bold">Forecast Horizon: 72 Hours</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/weather')}
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-bio-mint to-electric-lavender text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(62,240,181,0.4)] shrink-0"
          >
            <CloudRain className="w-4 h-4 fill-black" /> 🌊 Open Forecast Center
          </button>
        </div>
      </Card>

      {/* Forecast Numerical Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card border-white/5 p-4 flex flex-col justify-between">
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest">Sustained Wind Field</span>
          <span className="text-3xl font-extrabold text-soft-white font-mono my-1">28 km/h</span>
          <span className="text-[9px] text-solar-amber font-mono">Gusts: 38 km/h (14:00 hrs)</span>
        </Card>

        <Card className="glass-card border-white/5 p-4 flex flex-col justify-between">
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest">Significant Wave (Hs)</span>
          <span className="text-3xl font-extrabold text-solar-amber font-mono my-1">2.4 m</span>
          <span className="text-[9px] text-coral-red font-mono">Outer Shelf Surge: 3.1 m</span>
        </Card>

        <Card className="glass-card border-white/5 p-4 flex flex-col justify-between">
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest">Cyclone Probability Cone</span>
          <span className="text-3xl font-extrabold text-bio-mint font-mono my-1">Low (12%)</span>
          <span className="text-[9px] text-bio-mint font-mono">Recurving Away from Coast</span>
        </Card>

        <Card className="glass-card border-white/5 p-4 flex flex-col justify-between">
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest">Model Forecast Skill (R²)</span>
          <span className="text-3xl font-extrabold text-electric-lavender font-mono my-1">0.92</span>
          <span className="text-[9px] text-soft-white font-mono">Calibrated against INCOIS Buoys</span>
        </Card>
      </div>

      {/* Deep Link to Weather Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card border-white/5 p-5 space-y-3">
          <h3 className="text-xs font-bold text-soft-white uppercase tracking-wider flex items-center gap-2">
            <Wind className="w-4 h-4 text-bio-mint" /> Atmospheric Wind & Barometric Pressure Matrix
          </h3>
          <p className="text-xs text-soft-white/90 leading-relaxed">
            Inspect high-resolution wind streamlines, barometric gradient drop (1012 hPa), and sea-surface thermal radiation.
          </p>
          <button
            onClick={() => navigate('/weather')}
            className="w-full py-2 bg-bio-mint/20 hover:bg-bio-mint/30 border border-bio-mint/50 rounded-xl text-xs font-bold text-bio-mint uppercase tracking-wider transition-colors"
          >
            Launch Meteorological Workspace &rarr;
          </button>
        </Card>

        <Card className="glass-card border-white/5 p-5 space-y-3">
          <h3 className="text-xs font-bold text-soft-white uppercase tracking-wider flex items-center gap-2">
            <Waves className="w-4 h-4 text-solar-amber" /> Wave Superposition & Swell Dynamics
          </h3>
          <p className="text-xs text-soft-white/90 leading-relaxed">
            Simulate wave dispersion, coastal shoaling effects, and wave-current interaction drag along shipping channels.
          </p>
          <button
            onClick={() => navigate('/weather')}
            className="w-full py-2 bg-solar-amber/20 hover:bg-solar-amber/30 border border-solar-amber/50 rounded-xl text-xs font-bold text-solar-amber uppercase tracking-wider transition-colors"
          >
            Open Wave Physics Studio &rarr;
          </button>
        </Card>
      </div>
    </div>
  );
};
