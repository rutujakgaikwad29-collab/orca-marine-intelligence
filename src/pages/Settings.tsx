import { useState, useEffect } from 'react';
import {
  defaultVesselProfile,
  defaultAlertPreferences,
  defaultAlertDeliveryModes,
} from '../data/mockSettingsData';
import type {
  VesselProfile,
  AlertPreferences,
  AlertDeliveryModes,
  IndianLanguage,
  RouteStrategy,
} from '../data/mockSettingsData';

import { SettingsHeader } from '../components/settings/SettingsHeader';
import { FishermanProfileCard } from '../components/settings/FishermanProfileCard';
import { AlertPreferencesCard } from '../components/settings/AlertPreferencesCard';
import { LanguageSelectorCard } from '../components/settings/LanguageSelectorCard';
import { AlertModesCard } from '../components/settings/AlertModesCard';
import { RoutePreferenceSelector } from '../components/settings/RoutePreferenceSelector';
import { HardwareSyncCard } from '../components/settings/HardwareSyncCard';

export const Settings = () => {
  const [profile, setProfile] = useState<VesselProfile>(() => {
    const saved = localStorage.getItem('orca_vessel_profile');
    return saved ? JSON.parse(saved) : defaultVesselProfile;
  });

  const [alertPreferences, setAlertPreferences] = useState<AlertPreferences>(() => {
    const saved = localStorage.getItem('orca_alert_preferences');
    return saved ? JSON.parse(saved) : defaultAlertPreferences;
  });

  const [alertModes, setAlertModes] = useState<AlertDeliveryModes>(() => {
    const saved = localStorage.getItem('orca_alert_modes');
    return saved ? JSON.parse(saved) : defaultAlertDeliveryModes;
  });

  const [language, setLanguage] = useState<IndianLanguage>(() => {
    const saved = localStorage.getItem('orca_language');
    return (saved as IndianLanguage) || 'en';
  });

  const [routeStrategy, setRouteStrategy] = useState<RouteStrategy>(() => {
    const saved = localStorage.getItem('orca_route_strategy');
    return (saved as RouteStrategy) || 'smart';
  });

  const [savedStatus, setSavedStatus] = useState(false);

  const handleUpdateProfile = (updated: Partial<VesselProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const handleToggleAlertPref = (key: keyof AlertPreferences) => {
    setAlertPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleToggleAlertMode = (key: keyof AlertDeliveryModes) => {
    setAlertModes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveAll = () => {
    localStorage.setItem('orca_vessel_profile', JSON.stringify(profile));
    localStorage.setItem('orca_alert_preferences', JSON.stringify(alertPreferences));
    localStorage.setItem('orca_alert_modes', JSON.stringify(alertModes));
    localStorage.setItem('orca_language', language);
    localStorage.setItem('orca_route_strategy', routeStrategy);

    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  const handleResetDefaults = () => {
    setProfile(defaultVesselProfile);
    setAlertPreferences(defaultAlertPreferences);
    setAlertModes(defaultAlertDeliveryModes);
    setLanguage('en');
    setRouteStrategy('smart');
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-12 fade-in">
      {/* 1. HEADER */}
      <section>
        <SettingsHeader
          onSave={handleSaveAll}
          onReset={handleResetDefaults}
          saved={savedStatus}
        />
      </section>

      {/* 2 & 3. FISHERMAN PROFILE & MULTILINGUAL VOICE SELECTOR */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FishermanProfileCard
          profile={profile}
          onChange={handleUpdateProfile}
        />
        <LanguageSelectorCard
          selectedLanguage={language}
          onSelectLanguage={setLanguage}
        />
      </section>

      {/* 4 & 5. ALERT PREFERENCE TOGGLES & DELIVERY CHANNELS */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertPreferencesCard
          preferences={alertPreferences}
          onToggle={handleToggleAlertPref}
        />
        <AlertModesCard
          modes={alertModes}
          onToggle={handleToggleAlertMode}
        />
      </section>

      {/* 6. DEFAULT ROUTE OPTIMIZATION STRATEGY */}
      <section>
        <RoutePreferenceSelector
          selectedStrategy={routeStrategy}
          onSelectStrategy={setRouteStrategy}
        />
      </section>

      {/* 7. HARDWARE SENSOR BUS & MRCC CONTACTS */}
      <section>
        <HardwareSyncCard />
      </section>
    </div>
  );
};
