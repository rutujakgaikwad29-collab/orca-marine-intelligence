import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Cpu, Bot, Brain, ArrowDown, ArrowRight, Sparkles, ShieldCheck, Compass, Fish, Siren } from 'lucide-react';

export const DataFusionPipeline = () => {
  const sources = [
    { title: '🛰️ SATELLITE', desc: 'SST & Chlorophyll-a', color: 'border-bio-mint/40 text-bio-mint' },
    { title: '🌦️ WEATHER', desc: 'Wind & Barometric Pressure', color: 'border-solar-amber/40 text-solar-amber' },
    { title: '🌊 OCEAN', desc: 'Wave Swell & Current Vectors', color: 'border-bio-mint/40 text-bio-mint' },
    { title: '🐟 FISHERIES', desc: 'PFZ Thermal Frontiers', color: 'border-electric-lavender/40 text-electric-lavender' },
    { title: '🚤 BOAT IOT', desc: 'DGPS, Fuel & Engine Bus', color: 'border-white/30 text-soft-white' },
  ];

  return (
    <Card className="glass-card border-bio-mint/40 relative overflow-hidden bg-gradient-to-b from-[#11111A] via-[#161B28] to-[#11111A] shadow-2xl p-6">
      <CardHeader className="pb-4 border-b border-white/5 flex flex-wrap items-center justify-between gap-3 px-0">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-bio-mint/20 text-bio-mint border border-bio-mint/40">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-base font-bold uppercase tracking-widest text-soft-white">
              ORCA MULTI-STREAM DATA FUSION ARCHITECTURE
            </CardTitle>
            <span className="text-[10px] text-bio-mint font-mono font-bold">
              SIH CORE EVIDENCE: HOW MULTI-SOURCE TELEMETRY POWERS AUTONOMOUS MARINE REASONING
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 px-0 space-y-6">
        {/* 3D Earth Observation Satellite Hero Banner */}
        <div className="w-full h-56 rounded-2xl bg-black/60 border border-white/10 relative overflow-hidden flex items-end p-5 group/sat">
          <img
            src="/ocean_earth_satellite.jpg"
            alt="3D Earth Observation Satellite Scanning Indian Ocean"
            className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover/sat:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12] via-black/30 to-transparent"></div>

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full bg-black/60 backdrop-blur-md p-3.5 rounded-xl border border-white/20">
            <div>
              <span className="text-[10px] font-bold text-bio-mint uppercase tracking-widest block font-mono">
                ISRO OCEANSAT-3 & SENTINEL-3 REAL-TIME INGEST
              </span>
              <h4 className="text-xs font-bold text-soft-white">
                Multi-Spectral Lidar & Thermal Infrared Sea Surface Scanning
              </h4>
            </div>
            <span className="text-[10px] font-mono text-bio-mint font-bold px-2.5 py-1 rounded-full bg-bio-mint/10 border border-bio-mint/30 shrink-0">
              ● Optical Lidar Active
            </span>
          </div>
        </div>

        {/* Tier 1: 5 Data Source Streams */}
        <div className="space-y-1.5 text-center">
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest block">
            1. Multi-Spectral Data Ingestion Layer
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {sources.map((src, i) => (
              <div
                key={i}
                className={`bg-[#0B0B12] border rounded-xl p-3 text-center transition-all hover:scale-105 ${src.color}`}
              >
                <span className="text-xs font-bold font-mono block">{src.title}</span>
                <span className="text-[9px] text-cool-gray block mt-0.5">{src.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Downward Fusion Arrow */}
        <div className="flex justify-center">
          <div className="w-8 h-8 rounded-full bg-bio-mint/20 border border-bio-mint text-bio-mint flex items-center justify-center animate-bounce">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 2: ORCA Data Fusion & AI Agents Layer */}
        <div className="bg-[#0B0B12] border border-white/10 rounded-2xl p-4 text-center space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono font-bold">
            <span className="px-3 py-1 rounded-full bg-bio-mint/10 border border-bio-mint/40 text-bio-mint">
              ⚡ ORCA DATA FUSION ENGINE
            </span>
            <span className="text-cool-gray">&rarr;</span>
            <span className="px-3 py-1 rounded-full bg-electric-lavender/10 border border-electric-lavender/40 text-electric-lavender">
              🤖 8 SPECIALIZED AI AGENTS
            </span>
            <span className="text-cool-gray">&rarr;</span>
            <span className="px-3 py-1 rounded-full bg-soft-white/10 border border-white/20 text-soft-white">
              🧠 ORCA REASONING CORE
            </span>
          </div>
          <p className="text-xs text-cool-gray max-w-xl mx-auto leading-relaxed">
            Data streams are normalized, filtered for cloud obscuration, and evaluated against vessel hydrodynamic polar drag matrices to reach verified Pareto consensus.
          </p>
        </div>

        {/* Downward Fusion Arrow */}
        <div className="flex justify-center">
          <div className="w-8 h-8 rounded-full bg-electric-lavender/20 border border-electric-lavender text-electric-lavender flex items-center justify-center animate-bounce">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 3: Coordinated Operational Outputs */}
        <div className="space-y-1.5 text-center">
          <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest block">
            3. Synthesized Decision Support Outputs
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Output 1 */}
            <div className="bg-bio-mint/10 border border-bio-mint/40 rounded-xl p-3 text-left space-y-1">
              <span className="text-[9px] font-bold text-bio-mint uppercase tracking-wider flex items-center gap-1.5">
                <Fish className="w-3.5 h-3.5" /> 🐟 Fishing Recommendation
              </span>
              <p className="text-xs font-bold text-soft-white">PFZ-03 (89% Suitability)</p>
              <span className="text-[9px] font-mono text-cool-gray">High pelagic mackerel front</span>
            </div>

            {/* Output 2 */}
            <div className="bg-coral-red/10 border border-coral-red/40 rounded-xl p-3 text-left space-y-1">
              <span className="text-[9px] font-bold text-coral-red uppercase tracking-wider flex items-center gap-1.5">
                <Siren className="w-3.5 h-3.5" /> ⚠️ Early Safety Warning
              </span>
              <p className="text-xs font-bold text-soft-white">Moderate Swell (2.4m SW)</p>
              <span className="text-[9px] font-mono text-cool-gray">Mandatory return before 16:30</span>
            </div>

            {/* Output 3 */}
            <div className="bg-electric-lavender/10 border border-electric-lavender/40 rounded-xl p-3 text-left space-y-1">
              <span className="text-[9px] font-bold text-electric-lavender uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" /> 🧭 Pareto Safe Route
              </span>
              <p className="text-xs font-bold text-soft-white">Route D (23.4 km • 1h 28m)</p>
              <span className="text-[9px] font-mono text-cool-gray">+12% fuel savings via current jet</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
