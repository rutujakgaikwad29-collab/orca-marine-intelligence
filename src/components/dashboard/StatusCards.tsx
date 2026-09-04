import { useAppStore } from '../../store/useAppStore';
import { Card, CardContent } from '../ui/Card';
import { ShieldAlert, Fish, CloudSun, Waves, Ship, Activity } from 'lucide-react';
import { t } from '../../utils/translations';
import { motion } from 'framer-motion';
import { Sparkline } from '../ui/Sparkline';

export const StatusCards = () => {
  const { marineData, vesselData, language } = useAppStore();

  const cards = [
    {
      title: t('Marine Risk', language),
      value: marineData.riskScore < 50 ? 'MODERATE' : 'HIGH',
      subtitle: `${marineData.riskScore} / 100`,
      icon: ShieldAlert,
      color: marineData.riskScore < 50 ? 'text-solar-amber' : 'text-coral-red',
      sparkline: [20, 30, 25, 40, 35, 50, 42],
      trend: '↑ 4%',
      tooltip: 'Calculated using: Wind, Waves, Lightning, Cyclone, Restricted zones'
    },
    {
      title: t('Fishing Suitability', language),
      value: `${marineData.fishingScore}%`,
      subtitle: marineData.fishingScore > 75 ? 'FAVORABLE' : 'MODERATE',
      icon: Fish,
      color: 'text-bio-mint drop-shadow-[0_0_8px_rgba(62,240,181,0.5)]',
      sparkline: [60, 65, 80, 75, 85, 82, 84],
      trend: '↑ 6%',
      tooltip: 'Calculated using: SST, Chlorophyll, Historical Productivity'
    },
    {
      title: t('Weather', language),
      value: `${marineData.seaSurfaceTemperature.toFixed(1)}°C`,
      subtitle: 'Partly Cloudy',
      icon: CloudSun,
      color: 'text-solar-amber',
      sparkline: [26, 27, 27.5, 28, 28.2, 28.4, 28.4],
      trend: '↓ 0.2°C',
      tooltip: 'Live API data from OpenWeather & IMD'
    },
    {
      title: t('Wave Height', language),
      value: `${marineData.waveHeight.toFixed(1)}m`,
      subtitle: marineData.waveHeight > 2 ? 'High' : 'Moderate',
      icon: Waves,
      color: 'text-electric-lavender',
      sparkline: [0.8, 0.9, 1.1, 1.0, 1.3, 1.2, 1.2],
      trend: '— Steady',
      tooltip: 'Measured via satellite altimetry'
    },
    {
      title: t('Vessel Status', language),
      value: vesselData.stability,
      subtitle: vesselData.stability === 'STABLE' ? 'All Systems Normal' : 'Caution Advised',
      icon: Ship,
      color: vesselData.stability === 'STABLE' ? 'text-bio-mint' : 'text-solar-amber',
      sparkline: [100, 100, 95, 100, 100, 100, 100],
      trend: '✓ 100%',
      tooltip: 'IoT telemetry from vessel engine, IMU, and GPS'
    },
    {
      title: t('Data Confidence', language),
      value: `${marineData.confidence}%`,
      subtitle: 'High Reliability',
      icon: Activity,
      color: 'text-aurora-violet drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]',
      sparkline: [85, 88, 87, 90, 89, 91, 91],
      trend: '↑ 2%',
      tooltip: 'Overall confidence based on data freshness and source consensus'
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ y: -3, scale: 1.02 }}
          className="relative group"
        >
          <Card className="h-[130px] hover:bg-white/5 transition-all duration-300 border-white/5 shadow-lg relative overflow-hidden glass-card">
            
            {/* Tooltip */}
            <div className="absolute top-0 left-0 w-full h-full bg-[#11111A]/95 backdrop-blur-sm p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-center border border-white/10">
               <p className="text-[11px] text-soft-white leading-relaxed">{card.tooltip}</p>
            </div>

            <CardContent className="p-4 flex flex-col justify-between h-full relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <card.icon className={`h-4 w-4 ${card.color}`} />
                  <p className="text-[10px] font-semibold text-cool-gray uppercase tracking-widest">{card.title}</p>
                </div>
                <span className="text-[9px] text-cool-gray/70 font-mono">12s ago</span>
              </div>
              
              <div>
                <div className="flex items-end justify-between">
                  <h3 className={`text-2xl font-bold tracking-tight ${card.title === 'Marine Risk' ? card.color : 'text-soft-white'}`}>{card.value}</h3>
                  <span className={`text-[10px] font-bold ${card.trend.includes('↑') ? 'text-bio-mint' : card.trend.includes('↓') ? 'text-coral-red' : 'text-cool-gray'}`}>{card.trend}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-[11px] font-medium text-cool-gray tracking-wide">{card.subtitle}</p>
                  <Sparkline color={card.color} data={card.sparkline} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
