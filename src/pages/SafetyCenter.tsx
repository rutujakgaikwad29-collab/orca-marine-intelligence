import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

import { mockSafetyData } from '../data/mockSafetyData';
import type { VesselTypeProfile, SafetyAlert } from '../data/mockSafetyData';

import { SafetyHeader } from '../components/safety/SafetyHeader';
import { HazardGrid } from '../components/safety/HazardGrid';
import { SafetyMap } from '../components/safety/SafetyMap';
import { CycloneMonitor } from '../components/safety/CycloneMonitor';
import { WaveSafetyPanel } from '../components/safety/WaveSafetyPanel';
import { LightningSafetyPanel } from '../components/safety/LightningSafetyPanel';
import { BoundaryGeofence } from '../components/safety/BoundaryGeofence';
import { VesselProfileCard } from '../components/safety/VesselProfileCard';
import { AIRiskEngine } from '../components/safety/AIRiskEngine';
import { WhyRiskExplainable } from '../components/safety/WhyRiskExplainable';
import { MultiAgentSafety } from '../components/safety/MultiAgentSafety';
import { AlertCenter } from '../components/safety/AlertCenter';
import { SafetyRecommendation } from '../components/safety/SafetyRecommendation';
import { WhatIfSafetySimulator } from '../components/safety/WhatIfSafetySimulator';
import { EmergencyModal } from '../components/safety/EmergencyModal';
import { SafeHarbours } from '../components/safety/SafeHarbours';
import { SafetyForecastTimeline } from '../components/safety/SafetyForecastTimeline';
import { DataQualityTrust } from '../components/safety/DataQualityTrust';
import { SafetyOceanVersePreview } from '../components/safety/SafetyOceanVersePreview';

export const SafetyCenter = () => {
  const navigate = useNavigate();
  const [selectedVessel, setSelectedVessel] = useState<VesselTypeProfile>(mockSafetyData.vesselProfiles[1]); // Medium Trawler default
  const [riskScore, setRiskScore] = useState<number>(mockSafetyData.currentRiskScore);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [emergencyOpen, setEmergencyOpen] = useState<boolean>(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      // Small simulated recalculation based on vessel profile multiplier
      const calculated = Math.round(42 * selectedVessel.riskMultiplier);
      setRiskScore(calculated);
    }, 1000);
  };

  const handleSelectVessel = (vessel: VesselTypeProfile) => {
    setSelectedVessel(vessel);
    const updatedScore = Math.round(42 * vessel.riskMultiplier);
    setRiskScore(updatedScore);
  };

  const handleNavigate = (pathKey: string) => {
    switch (pathKey) {
      case 'route':
        navigate('/route');
        break;
      case 'fishing':
        navigate('/fishing');
        break;
      case 'weather':
        navigate('/weather');
        break;
      case 'ask':
        navigate('/ask');
        break;
      case 'map':
        navigate('/map');
        break;
      default:
        break;
    }
  };

  const scrollToSimulator = () => {
    const el = document.getElementById('safety-simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-12 fade-in">
      {/* 1. TOP SAFETY STATUS HEADER */}
      <section>
        <SafetyHeader
          riskScore={riskScore}
          riskLevel={riskScore > 60 ? 'HIGH' : riskScore > 35 ? 'MODERATE' : 'LOW'}
          statusLabel={riskScore > 60 ? 'CAUTION: DELAY RECOMMENDED' : 'CAUTION ADVISED'}
          lastUpdated={mockSafetyData.lastUpdated}
          confidence={mockSafetyData.confidence}
          onEmergencyClick={() => setEmergencyOpen(true)}
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />
      </section>

      {/* 2. LIVE HAZARD OVERVIEW (7-CARD MATRIX) */}
      <section>
        <HazardGrid />
      </section>

      {/* 3. LIVE MARINE SAFETY & GEOFENCE MAP */}
      <section className="h-[460px] lg:h-[530px]">
        <SafetyMap />
      </section>

      {/* 4 & 5. CYCLONE & WAVE SAFETY PANELS */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CycloneMonitor />
        <WaveSafetyPanel selectedVessel={selectedVessel} />
      </section>

      {/* 6 & 7. LIGHTNING MONITOR & BOUNDARY GEOFENCE */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LightningSafetyPanel />
        <BoundaryGeofence />
      </section>

      {/* 8 & 9. VESSEL SEAKEEPING PROFILE & AI RISK DECOMPOSITION */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VesselProfileCard
          selectedVessel={selectedVessel}
          onSelectVessel={handleSelectVessel}
        />
        <AIRiskEngine riskScore={riskScore} />
      </section>

      {/* 10. EXPLAINABLE AI: WHY IS RISK MODERATE? & "WHY THIS ALERT?" INSPECTOR */}
      <section>
        <WhyRiskExplainable />
      </section>

      {/* 11 & 12. MULTI-AGENT REASONING & ALERT CENTER TIMELINE */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MultiAgentSafety />
        <AlertCenter />
      </section>

      {/* 13. SMART SAFETY RECOMMENDATION (EXECUTIVE STRATEGY) */}
      <section>
        <SafetyRecommendation
          onNavigate={handleNavigate}
          onScrollToSimulator={scrollToSimulator}
        />
      </section>

      {/* 14. WHAT-IF SAFETY SIMULATOR */}
      <section>
        <WhatIfSafetySimulator />
      </section>

      {/* 15 & 16. NEAREST SAFE HARBOURS & SAFETY RISK FORECAST TIMELINE */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SafeHarbours onNavigateToRoute={() => navigate('/route')} />
        <SafetyForecastTimeline />
      </section>

      {/* 17 & 18. DATA QUALITY & 3D OCEANVERSE SAFETY DIGITAL TWIN */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DataQualityTrust />
        <SafetyOceanVersePreview />
      </section>

      {/* EMERGENCY MODAL POPUP */}
      <EmergencyModal
        isOpen={emergencyOpen}
        onClose={() => setEmergencyOpen(false)}
        onNavigateToHarbour={() => navigate('/route')}
      />
    </div>
  );
};
