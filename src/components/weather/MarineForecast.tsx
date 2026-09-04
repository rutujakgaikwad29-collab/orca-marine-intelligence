import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Clock, Calendar, Thermometer, Wind, Waves, CloudRain, ShieldAlert } from 'lucide-react';
import { mockWeatherData } from '../../data/mockWeatherData';

export const MarineForecast = () => {
  const { hourlyForecast24, threeDayForecast } = mockWeatherData;
  const [activeTab, setActiveTab] = useState<'temp' | 'wind' | 'wave' | 'rain' | 'risk'>('wind');

  return (
    <div className="space-y-6">
      {/* 24-Hour Interactive Timeline Card */}
      <Card className="glass-card border-white/5 relative overflow-hidden">
        <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-soft-white">
            <Clock className="h-4 w-4 text-electric-lavender" />
            24-HOUR HOURLY MARINE METEOROLOGY
          </CardTitle>

          {/* Switch variable tabs */}
          <div className="flex items-center gap-1 bg-black/40 border border-white/10 p-1 rounded-lg">
            {[
              { id: 'wind', label: 'Wind', icon: Wind },
              { id: 'wave', label: 'Waves', icon: Waves },
              { id: 'temp', label: 'Temp', icon: Thermometer },
              { id: 'rain', label: 'Rain', icon: CloudRain },
              { id: 'risk', label: 'Risk', icon: ShieldAlert },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${
                    activeTab === tab.id
                      ? 'bg-bio-mint text-black font-bold shadow-[0_0_8px_rgba(62,240,181,0.6)]'
                      : 'text-cool-gray hover:text-soft-white'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </CardHeader>

        <CardContent className="p-5 overflow-x-auto hide-scrollbar">
          <div className="flex items-center justify-between gap-4 min-w-[700px]">
            {hourlyForecast24.map((h, i) => {
              let displayVal = `${h.wind} km/h`;
              let color = 'text-bio-mint';
              let heightPercent = (h.wind / 25) * 100;

              if (activeTab === 'wave') {
                displayVal = `${h.wave} m`;
                color = h.wave > 1.5 ? 'text-solar-amber' : 'text-electric-lavender';
                heightPercent = (h.wave / 2.5) * 100;
              } else if (activeTab === 'temp') {
                displayVal = `${h.temp}°C`;
                color = 'text-solar-amber';
                heightPercent = ((h.temp - 20) / 15) * 100;
              } else if (activeTab === 'rain') {
                displayVal = `${h.rain}%`;
                color = h.rain > 30 ? 'text-coral-red' : 'text-cool-gray';
                heightPercent = h.rain;
              } else if (activeTab === 'risk') {
                displayVal = h.risk;
                color = h.risk === 'High' ? 'text-coral-red' : h.risk === 'Moderate' ? 'text-solar-amber' : 'text-bio-mint';
                heightPercent = h.risk === 'High' ? 100 : h.risk === 'Moderate' ? 60 : 30;
              }

              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 p-2 bg-white/5 border border-white/5 rounded-xl hover:border-white/20 transition-all">
                  <span className="text-[10px] font-mono text-cool-gray">{h.time}</span>
                  
                  {/* Visual progression bar */}
                  <div className="h-16 w-3 bg-black/40 rounded-full overflow-hidden flex items-end p-0.5">
                    <div
                      className={`w-full rounded-full transition-all duration-500 ${
                        activeTab === 'risk' && h.risk === 'High'
                          ? 'bg-coral-red'
                          : activeTab === 'risk' && h.risk === 'Moderate'
                          ? 'bg-solar-amber'
                          : 'bg-bio-mint'
                      }`}
                      style={{ height: `${Math.max(15, Math.min(100, heightPercent))}%` }}
                    />
                  </div>

                  <span className={`text-xs font-bold font-mono ${color}`}>{displayVal}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 3-Day Marine Forecast Cards */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-bio-mint" />
          <h3 className="text-xs font-bold text-cool-gray tracking-widest uppercase">3-Day Operational Marine Outlook</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {threeDayForecast.map((fc, i) => (
            <Card key={i} className="glass-card border-white/5 p-4 flex flex-col justify-between hover:border-white/20 transition-all">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div>
                  <span className="text-xs font-bold text-soft-white uppercase tracking-wider">{fc.day}</span>
                  <span className="text-[10px] text-cool-gray font-mono ml-2">({fc.date})</span>
                </div>
                <span className="text-[10px] font-bold text-bio-mint uppercase bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
                  Suitability: {fc.fishingSuitability}
                </span>
              </div>

              <div className="py-3 space-y-2 text-xs">
                <div className="flex justify-between text-cool-gray">
                  <span>Conditions:</span>
                  <span className="text-soft-white font-medium">{fc.weather}</span>
                </div>
                <div className="flex justify-between text-cool-gray">
                  <span>Wind Range:</span>
                  <span className="text-soft-white font-mono">{fc.wind}</span>
                </div>
                <div className="flex justify-between text-cool-gray">
                  <span>Wave Swell:</span>
                  <span className="text-soft-white font-mono">{fc.wave}</span>
                </div>
                <div className="flex justify-between text-cool-gray">
                  <span>Precipitation:</span>
                  <span className="text-soft-white font-mono">{fc.rain}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-[9px] font-bold text-cool-gray uppercase tracking-wider">Marine Risk:</span>
                <span className={`text-[10px] font-bold uppercase ${fc.marineRisk === 'MODERATE' ? 'text-solar-amber' : 'text-bio-mint'}`}>
                  {fc.marineRisk}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
