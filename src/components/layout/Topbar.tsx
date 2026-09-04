import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Bell, Menu, Globe, Sparkles, LogOut, ChevronDown, User, ShieldCheck } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { useAuth } from '../../auth/AuthContext';
import { getRoleDisplayName } from '../../auth/permissions';
import type { UserRole } from '../../auth/userTypes';

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
];

const roleOptions: { role: UserRole; label: string; icon: string }[] = [
  { role: 'FISHERMAN', label: 'Fisherman (Skipper)', icon: '🧑🌾' },
  { role: 'GOVERNMENT_OFFICER', label: 'Government Officer', icon: '🏛️' },
  { role: 'MARINE_RESEARCHER', label: 'Marine Researcher', icon: '🔬' },
  { role: 'COAST_GUARD', label: 'Coast Guard Officer', icon: '🛟' },
  { role: 'OCEAN_ANALYST', label: 'Ocean/Weather Analyst', icon: '🌊' },
  { role: 'ADMIN', label: 'System Administrator', icon: '⚙️' },
];

import { OrcaLogo } from '../ui/OrcaLogo';

export const Topbar = ({ onOpenMobileMenu }: { onOpenMobileMenu?: () => void }) => {
  const { language, setLanguage } = useAppStore();
  const { user, role, loginAsRole, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSwitchRole = async (targetRole: UserRole) => {
    setIsProfileOpen(false);
    await loginAsRole(targetRole);
    navigate('/');
  };

  const handleLogout = async () => {
    setIsProfileOpen(false);
    await logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-xl sm:px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <button className="sm:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900" onClick={onOpenMobileMenu}>
          <Menu className="h-6 w-6" />
        </button>

        {/* Brand & Context-Aware Pill */}
        <div className="flex items-center gap-3">
          <OrcaLogo size="sm" />

          
          <div className="group relative flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-full px-2.5 py-0.5 cursor-help">
            <Sparkles className="w-3 h-3 text-blue-600 animate-pulse" />
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider font-mono">
              CONTEXT-AWARE ORCA
            </span>

            {/* Tooltip */}
            <div className="absolute top-full mt-2 left-0 w-64 bg-white border border-slate-200 rounded-xl p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl text-[10px] text-slate-600 leading-relaxed">
              <strong className="text-slate-900 block mb-1">Context-Aware AI Architecture:</strong>
              ORCA adapts its multi-agent reasoning, risk models, available tools, and voice alerts according to the user's active operational role (<strong className="text-blue-600">{role}</strong>).
            </div>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Language Picker */}
        <div className="hidden sm:flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-full px-2 py-1 shadow-inner">
          <Globe className="h-3.5 w-3.5 text-blue-600 ml-1" />
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-xs font-semibold text-slate-700 border-none focus:ring-0 cursor-pointer outline-none pl-1 pr-3 py-0.5 appearance-none"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code} className="bg-white text-slate-800">{lang.native}</option>
            ))}
          </select>
        </div>

        {/* User Profile & Quick Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 p-1.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm shadow-sm">
              {user?.avatar || '🧑'}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-none">{user?.name || 'User'}</span>
              <span className="text-[10px] text-blue-600 font-semibold leading-none mt-1">{getRoleDisplayName(role)}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl p-3 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-3 p-2 border-b border-slate-100 pb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
                  {user?.avatar || '🧑'}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{user?.name}</h4>
                  <p className="text-xs text-slate-500">{user?.organization || 'Maritime Authority'}</p>
                  <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold mt-1">
                    {getRoleDisplayName(role)}
                  </span>
                </div>
              </div>

              {/* Role Switcher */}
              <div className="mt-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 block mb-1">
                  Switch Operational Role
                </span>
                <div className="space-y-1">
                  {roleOptions.map((opt) => (
                    <button
                      key={opt.role}
                      onClick={() => handleSwitchRole(opt.role)}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition-colors text-left ${
                        role === opt.role
                          ? 'bg-blue-600 text-white font-bold'
                          : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{opt.icon}</span>
                        <span>{opt.label}</span>
                      </span>
                      {role === opt.role && <ShieldCheck className="w-4 h-4 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Logout Button */}
              <div className="mt-3 pt-2 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
