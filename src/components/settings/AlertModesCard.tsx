import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Volume2, Smartphone, Bell, MessageSquare, Check } from 'lucide-react';
import type { AlertDeliveryModes } from '../../data/mockSettingsData';

interface AlertModesCardProps {
  modes: AlertDeliveryModes;
  onToggle: (key: keyof AlertDeliveryModes) => void;
}

export const AlertModesCard = ({ modes, onToggle }: AlertModesCardProps) => {
  const deliveryChannels = [
    { key: 'soundSiren' as const, label: '🔊 Audible Bridge Siren', desc: '95dB acoustic horn & bridge loudspeaker alarm', icon: Volume2, color: 'text-coral-red' },
    { key: 'vibration' as const, label: '📳 Haptic Vibration Alert', desc: 'Continuous smartphone & smartwatch vibration bursts', icon: Smartphone, color: 'text-solar-amber' },
    { key: 'pushNotification' as const, label: '📱 Push / SMS / WhatsApp', desc: 'Instant satellite SMS & high-priority push banner', icon: Bell, color: 'text-bio-mint' },
    { key: 'voiceAlert' as const, label: '🗣️ Hands-Free Voice Synthesis', desc: 'Natural voice speech broadcast in chosen Indian language', icon: MessageSquare, color: 'text-electric-lavender' },
  ];

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-bio-mint">
          <Volume2 className="h-4 w-4" />
          MULTI-CHANNEL ALERT DELIVERY MODES
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          4 CHANNELS
        </span>
      </CardHeader>

      <CardContent className="p-4 flex-1 space-y-2.5">
        {deliveryChannels.map((ch) => {
          const isChecked = modes[ch.key];

          return (
            <div
              key={ch.key}
              onClick={() => onToggle(ch.key)}
              className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                isChecked
                  ? 'bg-white/5 border-white/10 hover:border-white/20'
                  : 'bg-white/2 border-white/5 opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-black/40 border border-white/10">
                  <ch.icon className={`w-4 h-4 ${ch.color}`} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-soft-white">{ch.label}</h4>
                  <p className="text-[10px] text-cool-gray">{ch.desc}</p>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                  isChecked
                    ? 'bg-bio-mint border-bio-mint text-black shadow-[0_0_8px_rgba(62,240,181,0.5)]'
                    : 'bg-transparent border-white/20'
                }`}
              >
                {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
