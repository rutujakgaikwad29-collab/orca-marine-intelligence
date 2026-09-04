import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { t } from '../utils/translations';
import { CloudRain, RefreshCw, MapPin, Waves } from 'lucide-react';

import { mockWeatherData } from '../data/mockWeatherData';
import { CurrentConditions } from '../components/weather/CurrentConditions';
import { LiveOceanMap } from '../components/weather/LiveOceanMap';
import { SSTAnalysis } from '../components/weather/SSTAnalysis';
import { WindAnalysis } from '../components/weather/WindAnalysis';
import { WaveAnalysis } from '../components/weather/WaveAnalysis';
import { OceanCurrent } from '../components/weather/OceanCurrent';
import { TideForecast } from '../components/weather/TideForecast';
import { AtmosphericConditions } from '../components/weather/AtmosphericConditions';
import { LightningMonitor } from '../components/weather/LightningMonitor';
import { CycloneTracker } from '../components/weather/CycloneTracker';
import { MarineForecast } from '../components/weather/MarineForecast';
import { OceanAnalysis } from '../components/weather/OceanAnalysis';
import { AgentContributions } from '../components/weather/AgentContributions';
import { WeatherImpact } from '../components/weather/WeatherImpact';
import { WeatherSimulator } from '../components/weather/WeatherSimulator';
import { ForecastConfidence } from '../components/weather/ForecastConfidence';
import { MarineBrief } from '../components/weather/MarineBrief';
import { OceanVersePreview } from '../components/weather/OceanVersePreview';

export const WeatherOcean = () => {
  const { language } = useAppStore();
  const navigate = useNavigate();
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdatedSec, setLastUpdatedSec] = useState(12);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastUpdatedSec(1);
    }, 1200);
  };

  const handleNavigate = (pathKey: string) => {
    switch (pathKey) {
      case 'fishing':
        navigate('/fishing');
        break;
      case 'route':
        navigate('/route');
        break;
      case 'safety':
        navigate('/safety');
        break;
      case 'ask':
        navigate('/ask');
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-12 fade-in text-slate-900">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-1 bg-white border border-slate-200 p-5 rounded-3xl shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-wide uppercase flex items-center gap-3">
            <CloudRain className="h-7 w-7 text-blue-600" />
            {t('Weather & Ocean', language)}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-Time Marine Conditions, Numerical Forecasting & Ocean State Analysis
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-blue-600" /> {mockWeatherData.location}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              Last Ingestion: {lastUpdatedSec} sec ago
            </span>
          </div>

          <div className="flex items-center gap-2 border border-blue-200 rounded-full px-3 py-1 bg-blue-50 text-blue-800">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-wider uppercase font-mono">
              {mockWeatherData.dataMode}
            </span>
          </div>

          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>
      </div>

      {/* SECTION 1 — CURRENT MARINE CONDITIONS (8-CARD GRID) */}
      <section>
        <CurrentConditions metrics={mockWeatherData.currentMetrics} />
      </section>

      {/* SECTION 2 — LIVE MARINE CONDITION MAP */}
      <section className="h-[480px] lg:h-[540px]">
        <LiveOceanMap />
      </section>

      {/* SECTION 3 & 4 — SST ANALYSIS & WIND INTELLIGENCE */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SSTAnalysis />
        <WindAnalysis />
      </section>

      {/* SECTION 5, 6, 7 — WAVE INTELLIGENCE, OCEAN CURRENT, TIDE FORECAST */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <WaveAnalysis />
        <OceanCurrent />
        <TideForecast />
      </section>

      {/* SECTION 8 & 9 — ATMOSPHERIC CONDITIONS & LIGHTNING MONITOR */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AtmosphericConditions />
        <LightningMonitor />
      </section>

      {/* SECTION 10 — CYCLONE TRACKER */}
      <section>
        <CycloneTracker />
      </section>

      {/* SECTION 11 & 12 — 7-DAY MARINE FORECAST & MULTI-PARAM TIMELINE */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MarineForecast />
        </div>
        <div className="lg:col-span-1">
          <ForecastConfidence />
        </div>
      </section>

      {/* SECTION 13 — ADVANCED OCEAN ANALYSIS */}
      <section>
        <OceanAnalysis />
      </section>

      {/* SECTION 14 & 15 — AGENT CONTRIBUTIONS & WEATHER IMPACT */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AgentContributions />
        <WeatherImpact />
      </section>

      {/* SECTION 16 — INTERACTIVE WHAT-IF WEATHER SIMULATOR */}
      <section>
        <WeatherSimulator />
      </section>

      {/* SECTION 18 & 19 — AUDIO WEATHER BRIEF & OCEANVERSE 3D PREVIEW */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MarineBrief />
        <OceanVersePreview onExplore={() => handleNavigate('route')} />
      </section>
    </div>
  );
};
