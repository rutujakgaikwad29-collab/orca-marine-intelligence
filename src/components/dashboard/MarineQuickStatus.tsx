import { ThermometerSun, Wind, Waves, Moon, Eye, Droplets } from 'lucide-react';

export const MarineQuickStatus = () => {
  const conditions = [
    { label: 'Sea Temp', value: '28.4°C', icon: ThermometerSun, color: 'text-bio-mint' },
    { label: 'Wind', value: '14 km/h', icon: Wind, color: 'text-soft-white' },
    { label: 'Current', value: '0.7 m/s', icon: Waves, color: 'text-electric-lavender' },
    { label: 'Tide', value: 'Rising', icon: Moon, color: 'text-cool-gray' },
    { label: 'Visibility', value: '8 km', icon: Eye, color: 'text-soft-white' },
    { label: 'Rain Prob', value: '12%', icon: Droplets, color: 'text-solar-amber' },
  ];

  return (
    <div className="w-full bg-[#11111A]/80 border border-white/5 rounded-xl px-4 py-3 flex items-center overflow-x-auto hide-scrollbar shadow-md">
      <div className="flex items-center gap-2 mr-6 shrink-0 border-r border-white/10 pr-6">
        <span className="w-1.5 h-1.5 rounded-full bg-bio-mint shadow-[0_0_8px_rgba(62,240,181,0.8)] animate-pulse"></span>
        <span className="text-[10px] font-bold tracking-widest uppercase text-cool-gray">Live Conditions</span>
      </div>
      
      <div className="flex items-center gap-8 shrink-0">
        {conditions.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <item.icon className={`h-4 w-4 ${item.color} opacity-80`} />
            <div className="flex flex-col">
              <span className="text-[9px] text-cool-gray tracking-widest uppercase">{item.label}</span>
              <span className="text-sm font-mono font-bold text-soft-white tracking-wide">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
