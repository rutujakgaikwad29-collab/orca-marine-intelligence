import { create } from 'zustand';
import type { VesselData } from '../types/vessel';
import type { MarineData, PFZZone } from '../types/marine';
import type { Alert } from '../types/alerts';
import { mockMarineData } from '../data/mockMarineData';
import { mockVesselData } from '../data/mockVesselData';
import { mockAlerts } from '../data/mockAlerts';
import { mockPFZData } from '../data/mockPFZData';

interface AppState {
  isDemoMode: boolean;
  language: string;
  marineData: MarineData;
  vesselData: VesselData;
  alerts: Alert[];
  pfzZones: PFZZone[];
  updateVesselData: (data: Partial<VesselData>) => void;
  updateMarineData: (data: Partial<MarineData>) => void;
  addAlert: (alert: Alert) => void;
  setLanguage: (lang: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isDemoMode: true,
  language: 'en',
  marineData: mockMarineData,
  vesselData: mockVesselData,
  alerts: mockAlerts,
  pfzZones: mockPFZData,
  updateVesselData: (data) =>
    set((state) => ({ vesselData: { ...state.vesselData, ...data } })),
  updateMarineData: (data) =>
    set((state) => ({ marineData: { ...state.marineData, ...data } })),
  addAlert: (alert) =>
    set((state) => ({ alerts: [alert, ...state.alerts] })),
  setLanguage: (lang) =>
    set(() => ({ language: lang })),
}));
