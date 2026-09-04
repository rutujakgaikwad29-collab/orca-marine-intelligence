import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { DEMO_USERS } from '../auth/authService';
import type { UserRole } from '../auth/userTypes';
import { Card } from '../components/ui/Card';
import { Bot, Lock, Mail, Eye, EyeOff, ShieldCheck, Cpu, ArrowRight, Sparkles, Video } from 'lucide-react';

import aiSystemVideo from '../assets/WhatsApp Video 2026-09-02 at 9.50.06 PM (1).mp4';

import { OrcaLogo } from '../components/ui/OrcaLogo';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginAsRole } = useAuth();

  const [email, setEmail] = useState('fisherman@orca.demo');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedDemoRole, setSelectedDemoRole] = useState<UserRole>('FISHERMAN');
  const [isInitializing, setIsInitializing] = useState(false);
  const [initStage, setInitStage] = useState('');

  const roleOptions: { role: UserRole; label: string; icon: string; desc: string }[] = [
    { role: 'FISHERMAN', label: 'Fisherman', icon: '🧑🌾', desc: 'PFZ zones, wave seakeeping, smart routes' },
    { role: 'GOVERNMENT_OFFICER', label: 'Gov Officer', icon: '🏛️', desc: 'Regional risks, active vessels, advisories' },
    { role: 'MARINE_RESEARCHER', label: 'Researcher', icon: '🔬', desc: 'SST fronts, chlorophyll, datasets' },
    { role: 'COAST_GUARD', label: 'Coast Guard', icon: '🛟', desc: 'AIS monitoring, distress alerts, rescue' },
    { role: 'OCEAN_ANALYST', label: 'Ocean Analyst', icon: '🌊', desc: 'High-res models, cyclones, forecast grids' },
    { role: 'ADMIN', label: 'Administrator', icon: '⚙️', desc: '8-agent cluster, API gateway, telemetry' },
  ];

  const handleExecuteLogin = async (targetRole: UserRole) => {
    setIsInitializing(true);
    setInitStage('Authenticating Credentials...');

    setTimeout(() => {
      setInitStage(`Loading ${targetRole} Operational Context...`);
    }, 400);

    setTimeout(() => {
      setInitStage('Activating 8 Specialized Marine Agents...');
    }, 800);

    setTimeout(() => {
      setInitStage('ORCA AI CORE READY');
    }, 1100);

    setTimeout(async () => {
      await loginAsRole(targetRole);
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    }, 1300);
  };

  return (
    <div className="min-h-screen w-full bg-[#0B132B] text-slate-900 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Live AI System Marine Video Background Layer - 100% Clear & Vivid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter saturate-110 brightness-105 contrast-105 opacity-90 transition-opacity duration-1000 scale-105"
        >
          <source src={aiSystemVideo} type="video/mp4" />
          <source src="/ai_system_bg.mp4" type="video/mp4" />
          <source src="https://res.cloudinary.com/z4g3pbqt/video/upload/v1788458062/WhatsApp_Video_2026-09-02_at_9.50.06_PM_1.mp4" type="video/mp4" />
        </video>
        {/* Soft Transparent Gradient Overlay for Perfect Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/65 via-slate-900/30 to-slate-950/40" />
      </div>

      {/* Top Brand Bar */}
      <header className="p-6 flex items-center justify-between relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/40 shadow-lg">
          <OrcaLogo size="md" />
        </div>


        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-blue-700 bg-white/90 border border-white/50 px-3.5 py-1.5 rounded-full font-bold hidden sm:flex items-center gap-2 shadow-lg backdrop-blur-md">
            <Video className="w-3.5 h-3.5 text-blue-600 animate-pulse" /> LIVE AI SYSTEM DEMO VIDEO
          </span>
          <span className="text-amber-800 bg-white/90 border border-white/50 px-3.5 py-1.5 rounded-full font-bold hidden sm:block shadow-lg backdrop-blur-md">
            SIH 2026 PROTOTYPE ENVIRONMENT
          </span>
        </div>
      </header>

      {/* Main Login Centerpiece */}
      <main className="flex-1 flex items-center justify-center p-4 relative z-10 max-w-7xl mx-auto w-full">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Context & Hero Branding */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-white/50 text-xs font-bold text-blue-800 shadow-md backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Autonomous Reasoning & Collaborative Agents
            </div>

            <div className="bg-slate-900/60 border border-white/20 backdrop-blur-md p-6 rounded-3xl shadow-2xl space-y-3">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight drop-shadow-md">
                AI-Powered Marine Intelligence & Decision Support.
              </h1>

              <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                ORCA dynamically adapts its multi-agent reasoning, safety bounds, navigation tools, and voice alerts according to your operational role.
              </p>
            </div>

            {/* Live System Online Telemetry Badges */}
            <div className="bg-white/95 border border-white/60 backdrop-blur-md rounded-3xl p-5 space-y-3 shadow-xl">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-mono">
                System Infrastructure Status
              </span>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <span className="text-slate-800 font-bold flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span> ORCA AI Core
                  </span>
                  <span className="text-emerald-600 font-bold">ONLINE</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <span className="text-slate-800 font-bold flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Marine Data Services (INCOIS / IMD)
                  </span>
                  <span className="text-emerald-600 font-bold">ONLINE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-800 font-bold flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Multi-Agent Network (8 Nodes)
                  </span>
                  <span className="text-blue-600 font-bold">READY</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Login Card & 1-Click Role Switcher */}
          <div className="lg:col-span-6">
            <Card className="p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl shadow-xl relative overflow-hidden text-slate-900">
              
              <div className="mb-5">
                <h2 className="text-xl font-extrabold text-slate-900 tracking-wide">
                  Sign In to ORCA Command
                </h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Select a role below for instant demo evaluation or enter your credentials.
                </p>
              </div>

              {/* 1-Click Role Switcher Grid */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest block font-mono">
                  ⚡ Quick Demo Persona Select (1-Click Access)
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {roleOptions.map((opt) => {
                    const isSelected = selectedDemoRole === opt.role;
                    return (
                      <button
                        key={opt.role}
                        type="button"
                        onClick={() => {
                          setSelectedDemoRole(opt.role);
                          setEmail(DEMO_USERS[opt.role].email);
                        }}
                        className={`p-2.5 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-blue-50 hover:border-blue-200'
                        }`}
                      >
                        <span className="text-lg block mb-0.5">{opt.icon}</span>
                        <span className="text-xs font-bold block truncate">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Inputs */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleExecuteLogin(selectedDemoRole);
                }}
                className="space-y-4 text-xs"
              >
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Email / Organization ID
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-slate-900 font-medium outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                      placeholder="user@orca.demo"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Access Passphrase
                    </label>
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-[10px] text-blue-600 font-semibold hover:underline">
                      Forgot?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-slate-900 font-medium outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer font-medium">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="accent-blue-600 cursor-pointer rounded"
                    />
                    Remember credentials
                  </label>
                  <span className="text-emerald-600 font-mono font-bold">256-Bit SSL Encrypted</span>
                </div>

                {/* Sign In CTA */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25 mt-2"
                >
                  <ShieldCheck className="w-4 h-4" /> Launch {DEMO_USERS[selectedDemoRole].name} Session <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-5 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
                New marine station or vessel? <a href="#" onClick={(e) => e.preventDefault()} className="text-blue-600 font-bold hover:underline">Register Vessel ID</a>
              </div>
            </Card>
          </div>

        </div>
      </main>

      {/* Cinematic AI Initialization Overlay */}
      {isInitializing && (
        <div className="fixed inset-0 z-[1000] bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-fade-in text-white">
          <div className="flex flex-col items-center gap-4 text-center max-w-sm">
            <div className="p-4 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/30 animate-spin-slow">
              <Cpu className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold uppercase tracking-widest font-mono">
                INITIALIZING ORCA ENGINE
              </h3>
              <p className="text-xs font-mono text-cyan-300 animate-pulse">
                {initStage}
              </p>
            </div>

            <div className="w-48 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 animate-pulse w-full"></div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="p-4 text-center text-xs text-slate-500 font-mono border-t border-slate-200 relative z-10 bg-white/50">
        ORCA Marine Intelligence • Smart India Hackathon (SIH) 2026 • Autonomous Multi-Agent Decision Architecture
      </footer>
    </div>
  );
};

