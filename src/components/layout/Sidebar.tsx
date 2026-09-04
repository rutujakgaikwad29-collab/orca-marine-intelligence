import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Map, 
  Fish, 
  CloudRain, 
  ShieldAlert, 
  Route, 
  Cpu, 
  Bell, 
  Database, 
  Settings,
  Sparkles,
  Video
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAppStore } from '../../store/useAppStore';
import { t } from '../../utils/translations';
import { useAuth } from '../../auth/AuthContext';
import { getRoleDisplayName } from '../../auth/permissions';

const allNavItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard, permission: 'dashboard.view' },
  { name: '3D Simulation', path: '/simulation', icon: Video, permission: 'dashboard.view' },
  { name: 'Ask ORCA', path: '/ask', icon: MessageSquare, permission: 'ask_orca.use' },
  { name: 'Live Marine Map', path: '/map', icon: Map, permission: 'marine_map.view' },
  { name: 'Fishing Intelligence', path: '/fishing', icon: Fish, permission: 'fishing_intelligence.view' },
  { name: 'Weather & Ocean', path: '/weather', icon: CloudRain, permission: 'weather.view' },
  { name: 'Safety Center', path: '/safety', icon: ShieldAlert, permission: 'safety.view' },
  { name: 'Route Planner', path: '/route', icon: Route, permission: 'route_planner.use' },
  { name: 'Agent Monitor', path: '/agents', icon: Cpu, permission: 'agents.monitor' },
  { name: 'Alerts', path: '/alerts', icon: Bell, permission: 'alerts.view' },
  { name: 'Data Sources', path: '/data', icon: Database, permission: 'datasets.view' },
  { name: 'Settings', path: '/settings', icon: Settings, permission: 'settings.view' },
];

import { OrcaLogo } from '../ui/OrcaLogo';

export const Sidebar = ({ isOpen, onClose }: { isOpen?: boolean, onClose?: () => void }) => {
  const { language } = useAppStore();
  const { role, hasPermission, user } = useAuth();

  // Filter items based on active role permissions
  const visibleNavItems = allNavItems.filter((item) => {
    if (item.permission === 'dashboard.view') return true;
    if (item.permission === 'route_planner.use') {
      return hasPermission('route_planner.use') || hasPermission('route_planner.view');
    }
    if (item.permission === 'datasets.view') {
      return hasPermission('datasets.view') || hasPermission('data_sources.manage');
    }
    return hasPermission(item.permission);
  });

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-white transition-transform sm:translate-x-0 overflow-hidden shadow-sm",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 to-transparent pointer-events-none"></div>
      
      <div className="flex h-full flex-col overflow-y-auto px-3 py-4 relative z-10">
        <div className="mb-5 px-1 flex items-center justify-between">
          <div className="flex items-center">
            <OrcaLogo size="md" />
          </div>
          {/* Close button for mobile */}
          <button 
            className="sm:hidden p-2 text-slate-500 hover:text-slate-900 rounded-md"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>


        {/* User Role Badge */}
        <div className="mb-4 px-2 py-2.5 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
              {user?.avatar || '🧑'}
            </div>
            <div className="truncate">
              <span className="text-xs font-bold text-slate-900 block truncate">{user?.name || 'User'}</span>
              <span className="text-[10px] text-blue-700 font-medium block uppercase tracking-wide truncate">
                {getRoleDisplayName(role)}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 space-y-1">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold transition-all",
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 font-black"
                      : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                  )
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{t(item.name, language)}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom System Status */}
        <div className="mt-auto pt-3 border-t border-slate-100 px-2">
          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>SYSTEM ONLINE • ISRO MOSDAC</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
