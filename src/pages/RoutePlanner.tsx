import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

import { mockRouteData } from '../data/mockRouteData';
import type { RouteOption } from '../data/mockRouteData';

import { RouteHeader } from '../components/route/RouteHeader';
import { RouteInputPanel } from '../components/route/RouteInputPanel';
import { RoutePreferenceControls } from '../components/route/RoutePreferenceControls';
import { RouteMap } from '../components/route/RouteMap';
import { RouteComparison } from '../components/route/RouteComparison';
import { OrcaRecommendation } from '../components/route/OrcaRecommendation';
import { RouteReasoning } from '../components/route/RouteReasoning';
import { RouteRiskBreakdown } from '../components/route/RouteRiskBreakdown';
import { HazardAvoidance } from '../components/route/HazardAvoidance';
import { FuelIntelligence } from '../components/route/FuelIntelligence';
import { CurrentAssistance } from '../components/route/CurrentAssistance';
import { DepartureOptimizer } from '../components/route/DepartureOptimizer';
import { WhatIfRouteSimulator } from '../components/route/WhatIfRouteSimulator';
import { RouteSimulation } from '../components/route/RouteSimulation';
import { JourneyMonitor } from '../components/route/JourneyMonitor';
import { AgentRouteContributions } from '../components/route/AgentRouteContributions';
import { OptimizationEngine } from '../components/route/OptimizationEngine';
import { RouteHistory } from '../components/route/RouteHistory';
import { RouteDataConfidence } from '../components/route/RouteDataConfidence';
import { OceanVerseRoutePreview } from '../components/route/OceanVerseRoutePreview';

export const RoutePlanner = () => {
  const navigate = useNavigate();
  const [selectedRouteId, setSelectedRouteId] = useState<string>('route_d'); // Route D recommended default
  const [selectedDestination, setSelectedDestination] = useState<string>('pfz_03');
  const [safetyWeight, setSafetyWeight] = useState<number>(50);
  const [speedWeight, setSpeedWeight] = useState<number>(20);
  const [fuelWeight, setFuelWeight] = useState<number>(30);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleStartSimulation = () => {
    const el = document.getElementById('journey-simulation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewWhy = () => {
    const el = document.getElementById('route-reasoning');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-12 fade-in">
      {/* 1. PAGE HEADER */}
      <section>
        <RouteHeader onRefresh={handleRefresh} refreshing={refreshing} />
      </section>

      {/* 2. ROUTE INPUT & VOYAGE PARAMETERS */}
      <section>
        <RouteInputPanel
          selectedDestination={selectedDestination}
          onDestinationChange={setSelectedDestination}
          onCalculate={handleRefresh}
        />
      </section>

      {/* 3 & 4. ROUTE MAP & PREFERENCE WEIGHTS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[480px] lg:h-[560px]">
          <RouteMap
            selectedRouteId={selectedRouteId}
            onSelectRoute={setSelectedRouteId}
          />
        </div>
        <div className="lg:col-span-1 h-full">
          <RoutePreferenceControls
            safetyWeight={safetyWeight}
            speedWeight={speedWeight}
            fuelWeight={fuelWeight}
            onSafetyChange={setSafetyWeight}
            onSpeedChange={setSpeedWeight}
            onFuelChange={setFuelWeight}
          />
        </div>
      </section>

      {/* 5. ROUTE COMPARISON (4 PARETO CANDIDATE CARDS) */}
      <section>
        <RouteComparison
          selectedRouteId={selectedRouteId}
          onSelectRoute={setSelectedRouteId}
        />
      </section>

      {/* 6. ORCA EXECUTIVE RECOMMENDATION BANNER */}
      <section>
        <OrcaRecommendation
          onStartSimulation={handleStartSimulation}
          onViewWhy={handleViewWhy}
          onNavigateToLiveMap={() => navigate('/map')}
        />
      </section>

      {/* 7. LIVE VOYAGE SIMULATION WITH DYNAMIC REPLANNING DEMO */}
      <section>
        <RouteSimulation />
      </section>

      {/* 8. EXPLAINABLE AI ROUTE REASONING */}
      <section>
        <RouteReasoning />
      </section>

      {/* 9 & 10. ROUTE RISK BREAKDOWN & HAZARD AVOIDANCE */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RouteRiskBreakdown />
        <HazardAvoidance />
      </section>

      {/* 11 & 12. HYDRODYNAMIC FUEL INTELLIGENCE & CURRENT ASSISTANCE */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FuelIntelligence />
        <CurrentAssistance />
      </section>

      {/* 13 & 14. DEPARTURE WINDOW OPTIMIZER & WHAT-IF ROUTE SIMULATOR */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DepartureOptimizer />
        <WhatIfRouteSimulator />
      </section>

      {/* 15. ACTIVE JOURNEY MONITOR & SAFE HARBOUR DIVERSION */}
      <section>
        <JourneyMonitor onDivertToHarbour={() => setSelectedRouteId('route_a')} />
      </section>

      {/* 16 & 17. MULTI-AGENT PIPELINE & TECHNICAL OPTIMIZATION ENGINE */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AgentRouteContributions />
        <OptimizationEngine />
      </section>

      {/* 18 & 19. AUDIT HISTORY, DATA CONFIDENCE & 3D OCEANVERSE PREVIEW */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RouteHistory />
        <RouteDataConfidence />
      </section>

      {/* 20. 3D OCEANVERSE ROUTE PREVIEW */}
      <section>
        <OceanVerseRoutePreview />
      </section>
    </div>
  );
};
