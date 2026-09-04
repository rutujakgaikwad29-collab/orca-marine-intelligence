import type { UserProfile, UserRole } from './userTypes';
import { ROLE_PERMISSIONS } from './permissions';

export const DEMO_USERS: Record<UserRole, UserProfile> = {
  FISHERMAN: {
    id: 'usr_fish_01',
    name: 'Ramesh Patil',
    email: 'fisherman@orca.demo',
    role: 'FISHERMAN',
    avatar: '👨🏽‍✈️',
    location: 'Mirkarwada Port, Ratnagiri, Maharashtra',
    organization: 'Ratnagiri Coastal Fishermen Cooperative',
    vesselId: 'IND-MH-RTN-4190',
    vesselDetails: {
      name: 'Sea Queen VII (सागर राणी)',
      type: 'Mechanized Pelagic Gillnetter',
      hp: 120,
      fuelCapacity: 650,
      rangeNm: 45,
      homePort: 'Mirkarwada Fishing Port, Ratnagiri',
    },
    permissions: ROLE_PERMISSIONS.FISHERMAN,
    lastLogin: 'Just now',
    status: 'ACTIVE',
  },
  GOVERNMENT_OFFICER: {
    id: 'usr_gov_02',
    name: 'Dr. Sunita Deshmukh',
    email: 'officer@orca.demo',
    role: 'GOVERNMENT_OFFICER',
    avatar: '👩💼',
    location: 'Department of Fisheries, Konkan Division',
    organization: 'Ministry of Fisheries & Animal Husbandry, GoI',
    permissions: ROLE_PERMISSIONS.GOVERNMENT_OFFICER,
    lastLogin: 'Today at 08:30 AM',
    status: 'ACTIVE',
  },
  MARINE_RESEARCHER: {
    id: 'usr_res_03',
    name: 'Prof. Arvind Kulkarni',
    email: 'researcher@orca.demo',
    role: 'MARINE_RESEARCHER',
    avatar: '🔬',
    location: 'National Institute of Oceanography (NIO), Goa',
    organization: 'CSIR - NIO Marine Biogeochemistry Wing',
    permissions: ROLE_PERMISSIONS.MARINE_RESEARCHER,
    lastLogin: 'Today at 09:15 AM',
    status: 'ACTIVE',
  },
  COAST_GUARD: {
    id: 'usr_cg_04',
    name: 'Commandant Vikram Rana',
    email: 'coastguard@orca.demo',
    role: 'COAST_GUARD',
    avatar: '🛟',
    location: 'Maritime Rescue Coordination Centre (MRCC) Mumbai',
    organization: 'Indian Coast Guard (Western Region)',
    permissions: ROLE_PERMISSIONS.COAST_GUARD,
    lastLogin: 'Active Duty',
    status: 'ACTIVE',
  },
  OCEAN_ANALYST: {
    id: 'usr_ana_05',
    name: 'Ananya Nair',
    email: 'analyst@orca.demo',
    role: 'OCEAN_ANALYST',
    avatar: '🌊',
    location: 'INCOIS Ocean Modeling Group, Hyderabad',
    organization: 'Indian National Centre for Ocean Information Services',
    permissions: ROLE_PERMISSIONS.OCEAN_ANALYST,
    lastLogin: 'Today at 07:45 AM',
    status: 'ACTIVE',
  },
  ADMIN: {
    id: 'usr_adm_00',
    name: 'Antigravity System Admin',
    email: 'admin@orca.demo',
    role: 'ADMIN',
    avatar: '⚙️',
    location: 'ORCA DeepMind Cloud Ops Hub',
    organization: 'ORCA Marine Intelligence Core Engineering',
    permissions: ROLE_PERMISSIONS.ADMIN,
    lastLogin: 'Real-time Telemetry Session',
    status: 'ACTIVE',
  },
};

const STORAGE_KEY = 'orca_auth_user';

export const authService = {
  getCurrentUser: (): UserProfile | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse user session:', e);
    }
    // Default to Fisherman demo account for instant seamless prototype experience
    return DEMO_USERS.FISHERMAN;
  },

  loginWithRole: async (role: UserRole): Promise<UserProfile> => {
    // Simulates API authentication latency
    await new Promise((resolve) => setTimeout(resolve, 300));
    const user = DEMO_USERS[role] || DEMO_USERS.FISHERMAN;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  loginWithCredentials: async (email: string): Promise<UserProfile> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    // Match against demo emails or fallback
    const matched = Object.values(DEMO_USERS).find((u) => u.email.toLowerCase() === email.toLowerCase());
    const user = matched || DEMO_USERS.FISHERMAN;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  logout: async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    localStorage.removeItem(STORAGE_KEY);
  },
};
