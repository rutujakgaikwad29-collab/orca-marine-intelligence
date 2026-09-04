import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Building2, Ship, AlertTriangle, FileText, ShieldCheck, Fish, ArrowRight, Download } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

export const OfficerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-12 fade-in">
      {/* Officer Header */}
      <Card className="glass-card border-white/10 p-6 relative overflow-hidden bg-gradient-to-r from-[#11111A] via-[#161B28] to-[#11111A] shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏛️</span>
              <h1 className="text-2xl font-bold text-soft-white tracking-wide">
                Regional Fisheries & Marine Safety Command
              </h1>
            </div>
            <p className="text-xs text-cool-gray">
              Officer: <strong className="text-soft-white">{user?.name}</strong> • Jurisdiction: Konkan Division (Ratnagiri, Sindhudurg, Raigad)
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
              <span className="text-bio-mint font-bold">342 Active Registered Vessels</span>
              <span className="text-white/20">•</span>
              <span className="text-solar-amber font-bold">2 Coastal Advisories Active</span>
              <span className="text-white/20">•</span>
              <span className="text-electric-lavender font-bold">Regional Risk: MODERATE (42/100)</span>
            </div>
          </div>

          <button
            onClick={() => alert('Generating Regional Fisheries & Marine Safety Brief (PDF)...')}
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-bio-mint to-electric-lavender text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(62,240,181,0.4)] shrink-0"
          >
            <FileText className="w-4 h-4 fill-black" /> 📋 Generate Regional Marine Brief
          </button>
        </div>
      </Card>

      {/* Regional Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card border-white/5 p-4 flex flex-col justify-between">
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest">Active Sea Vessels</span>
          <span className="text-3xl font-extrabold text-soft-white font-mono my-1">342</span>
          <span className="text-[9px] text-bio-mint font-mono">98% in Verified Safe Zones</span>
        </Card>

        <Card className="glass-card border-white/5 p-4 flex flex-col justify-between">
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest">PFZ Productivity Index</span>
          <span className="text-3xl font-extrabold text-bio-mint font-mono my-1">84%</span>
          <span className="text-[9px] text-cool-gray font-mono">Peak Indian Mackerel Season</span>
        </Card>

        <Card className="glass-card border-white/5 p-4 flex flex-col justify-between">
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest">Active Weather Alerts</span>
          <span className="text-3xl font-extrabold text-solar-amber font-mono my-1">2</span>
          <span className="text-[9px] text-solar-amber font-mono">Afternoon Wind Surge Advisory</span>
        </Card>

        <Card className="glass-card border-white/5 p-4 flex flex-col justify-between">
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest">Harbour Capacity</span>
          <span className="text-3xl font-extrabold text-electric-lavender font-mono my-1">68%</span>
          <span className="text-[9px] text-soft-white font-mono">Mirkarwada Basin Open</span>
        </Card>
      </div>

      {/* Regional Action Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card border-white/5 p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <h3 className="text-xs font-bold text-soft-white uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-solar-amber" /> Broadcast Regional Fisheries Advisory
            </h3>
            <span className="text-[9px] font-mono text-bio-mint">SMS / LoRa / VHF CH 16</span>
          </div>
          <p className="text-xs text-soft-white/90 leading-relaxed">
            Dispatch official advisory to all 342 skippers regarding 2.4m swell and mandatory harbour return before 16:30 hrs.
          </p>
          <button
            onClick={() => navigate('/alerts')}
            className="w-full py-2 bg-solar-amber/20 hover:bg-solar-amber/30 border border-solar-amber/50 rounded-xl text-xs font-bold text-solar-amber uppercase tracking-wider transition-colors"
          >
            Open Alert Broadcast Center &rarr;
          </button>
        </Card>

        <Card className="glass-card border-white/5 p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <h3 className="text-xs font-bold text-soft-white uppercase tracking-wider flex items-center gap-2">
              <Ship className="w-4 h-4 text-bio-mint" /> Regional Vessel Fleet Telemetry
            </h3>
            <span className="text-[9px] font-mono text-cool-gray">AIS Grid Map</span>
          </div>
          <p className="text-xs text-soft-white/90 leading-relaxed">
            View real-time coordinates, fuel reserves, and safety standoff distances for all coastal craft.
          </p>
          <button
            onClick={() => navigate('/map')}
            className="w-full py-2 bg-bio-mint/20 hover:bg-bio-mint/30 border border-bio-mint/50 rounded-xl text-xs font-bold text-bio-mint uppercase tracking-wider transition-colors"
          >
            Open Live Marine Fleet Map &rarr;
          </button>
        </Card>
      </div>
    </div>
  );
};
