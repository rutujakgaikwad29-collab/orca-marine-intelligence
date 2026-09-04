import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { t } from '../utils/translations';
import { Fish, MapPin, RefreshCw, Target, Activity, ShieldCheck, Waves } from 'lucide-react';
import { Card } from '../components/ui/Card';

// Stubs / Components
import { PFZMap } from '../components/fishing/PFZMap';
import { PFZAnalysis } from '../components/fishing/PFZAnalysis';
import { EnvironmentalFactors } from '../components/fishing/EnvironmentalFactors';
import { FishingPrediction } from '../components/fishing/FishingPrediction';
import { SpeciesPotential } from '../components/fishing/SpeciesPotential';
import { WhatIfSimulator } from '../components/fishing/WhatIfSimulator';
import { ExplainableAI } from '../components/fishing/ExplainableAI';

export const FishingIntelligence = () => {
  const { language } = useAppStore();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-10 fade-in text-slate-900">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2 bg-white border border-slate-200 p-5 rounded-3xl shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-wide uppercase flex items-center gap-3">
            <Fish className="h-7 w-7 text-blue-600" />
            {t('Fishing Intelligence', language)}
          </h1>
          <p className="text-xs text-slate-500 mt-1">AI-Powered Potential Fishing Zone (PFZ) Analysis & Bathymetry</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex flex-col items-end hidden sm:flex">
             <span className="text-xs font-bold text-slate-800">Ratnagiri Coast, Maharashtra</span>
             <span className="text-[10px] text-slate-500 font-mono">Last Updated: 12 sec ago</span>
          </div>
          <div className="flex items-center gap-2 border border-emerald-300 rounded-full px-3 py-1 bg-emerald-50 text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-wider uppercase font-mono">ISRO Satellite Live</span>
          </div>
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh Analysis
          </button>
        </div>
      </div>

      {/* INTELLIGENCE SUMMARY (5 KPI CARDS) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Best PFZ', value: 'PFZ-03', sub: 'Distance: 18.4 km', icon: MapPin, color: 'text-blue-600' },
          { label: 'Fishing Suitability', value: '89%', sub: 'HIGH', icon: Fish, color: 'text-emerald-600' },
          { label: 'AI Confidence', value: '91%', sub: 'HIGH', icon: Target, color: 'text-blue-700' },
          { label: 'Estimated Productivity', value: '8.6 / 10', sub: 'EXCELLENT', icon: Activity, color: 'text-teal-600' },
          { label: 'Safety Status', value: 'SAFE', sub: 'WITH CAUTION', icon: ShieldCheck, color: 'text-amber-600' },
        ].map((kpi, i) => (
          <Card key={i} className="bg-white border border-slate-200 p-4 flex flex-col justify-between h-[110px] hover:-translate-y-0.5 transition-all shadow-sm rounded-2xl">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">{kpi.label}</span>
              <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
            </div>
            <div>
              <p className={`text-xl font-black ${kpi.color}`}>{kpi.value}</p>
              <p className="text-[10px] text-slate-500 tracking-wider uppercase font-bold mt-0.5">{kpi.sub}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* PFZ MAP + SELECTED ZONE ANALYSIS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[600px]">
        <div className="lg:col-span-2 h-[400px] lg:h-full">
          <PFZMap />
        </div>
        <div className="lg:col-span-1 h-full">
          <PFZAnalysis />
        </div>
      </div>

      {/* ENVIRONMENTAL FACTORS + AI PREDICTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EnvironmentalFactors />
        </div>
        <div className="lg:col-span-1">
          <FishingPrediction />
        </div>
      </div>
      
      {/* EXPLAINABLE AI */}
      <div className="w-full">
         <ExplainableAI />
      </div>

      {/* SPECIES INTELLIGENCE + WHAT-IF SIMULATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpeciesPotential />
        <WhatIfSimulator />
      </div>

    </div>
  );
};
