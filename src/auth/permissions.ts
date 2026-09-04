import type { UserRole } from './userTypes';

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  FISHERMAN: [
    'dashboard.view',
    'ask_orca.use',
    'marine_map.view',
    'fishing_intelligence.view',
    'weather.view',
    'safety.view',
    'route_planner.use',
    'alerts.view',
    'vessel.own_view',
    'settings.view',
  ],
  GOVERNMENT_OFFICER: [
    'dashboard.view',
    'ask_orca.use',
    'marine_map.view',
    'fishing_intelligence.view',
    'weather.view',
    'safety.view',
    'route_planner.view',
    'alerts.view',
    'advisories.manage',
    'vessels.regional_view',
    'reports.view',
    'settings.view',
  ],
  MARINE_RESEARCHER: [
    'dashboard.view',
    'ask_orca.use',
    'marine_map.view',
    'weather.view',
    'fishing_intelligence.view',
    'datasets.view',
    'analytics.view',
    'reports.create',
    'alerts.view',
    'settings.view',
  ],
  COAST_GUARD: [
    'dashboard.view',
    'ask_orca.use',
    'marine_map.view',
    'safety.view',
    'vessel.monitor',
    'alerts.manage',
    'emergency.manage',
    'route_planner.view',
    'alerts.view',
    'settings.view',
  ],
  OCEAN_ANALYST: [
    'dashboard.view',
    'ask_orca.use',
    'marine_map.view',
    'weather.view',
    'forecast.view',
    'datasets.view',
    'analytics.view',
    'alerts.view',
    'settings.view',
  ],
  ADMIN: [
    'dashboard.view',
    'ask_orca.use',
    'marine_map.view',
    'fishing_intelligence.view',
    'weather.view',
    'safety.view',
    'route_planner.use',
    'agents.monitor',
    'alerts.view',
    'alerts.manage',
    'users.manage',
    'roles.manage',
    'system.manage',
    'data_sources.manage',
    'settings.view',
  ],
};

export const hasPermission = (userPermissions: string[] | undefined, requiredPermission: string): boolean => {
  if (!userPermissions) return false;
  if (userPermissions.includes('*') || userPermissions.includes('system.manage')) return true;
  return userPermissions.includes(requiredPermission);
};

export const getRoleDisplayName = (role: UserRole): string => {
  switch (role) {
    case 'FISHERMAN':
      return '🧑🌾 Fisherman / Master Skipper';
    case 'GOVERNMENT_OFFICER':
      return '🏛️ Marine Fisheries Officer';
    case 'MARINE_RESEARCHER':
      return '🔬 Marine & Oceanographic Researcher';
    case 'COAST_GUARD':
      return '🛟 Coast Guard Operations Officer';
    case 'OCEAN_ANALYST':
      return '🌊 Oceanographic & Weather Analyst';
    case 'ADMIN':
      return '⚙️ ORCA System Administrator';
    default:
      return role;
  }
};
