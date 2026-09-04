export type UserRole =
  | 'FISHERMAN'
  | 'GOVERNMENT_OFFICER'
  | 'MARINE_RESEARCHER'
  | 'ADMIN'
  | 'COAST_GUARD'
  | 'OCEAN_ANALYST';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  location: string;
  organization: string;
  vesselId?: string;
  vesselDetails?: {
    name: string;
    type: string;
    hp: number;
    fuelCapacity: number;
    rangeNm: number;
    homePort: string;
  };
  permissions: string[];
  lastLogin: string;
  status: 'ACTIVE' | 'OFFLINE' | 'SUSPENDED';
}

export interface AuthState {
  user: UserProfile | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
