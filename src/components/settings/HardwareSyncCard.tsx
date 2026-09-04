import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Radio, ShieldAlert, Cpu, PhoneCall, CheckCircle2 } from 'lucide-react';

export const HardwareSyncCard = () => {
  return (
    <Card className="glass-card border-white/5 relative overflow-hidden">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-cool-gray">
          <Radio className="h-4 w-4 text-electric-lavender" />
          ONBOARD IOT SENSOR BUS & EMERGENCY DISTRESS PROTOCOL
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          NMEA 0183 & AIS LINKED
        </span>
      </CardHeader>

      <CardContent className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
        <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1">
          <span className="text-[8px] text-cool-gray uppercase block">MMSI / AIS Beacon ID</span>
          <span className="font-bold text-soft-white text-sm">419001234</span>
          <span className="text-[8px] text-bio-mint block">Transmitting 2W Class B</span>
        </div>

        <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1">
          <span className="text-[8px] text-cool-gray uppercase block">LoRaWAN Long-Range Mesh</span>
          <span className="font-bold text-bio-mint text-sm">865-867 MHz (IN865)</span>
          <span className="text-[8px] text-bio-mint block">Gateway RSSI: -92 dBm</span>
        </div>

        <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-1">
          <span className="text-[8px] text-cool-gray uppercase block">Echo Sounder Keel Offset</span>
          <span className="font-bold text-electric-lavender text-sm">1.4 m Draft Buffer</span>
          <span className="text-[8px] text-cool-gray block">NMEA DPT Sentence Active</span>
        </div>

        <div className="bg-coral-red/10 border border-coral-red/30 p-3 rounded-xl space-y-1">
          <span className="text-[8px] text-coral-red uppercase block font-bold">MRCC Mumbai Distress Line</span>
          <span className="font-bold text-coral-red text-sm">+91 22 2431 6558</span>
          <span className="text-[8px] text-soft-white block">VHF CH 16 / DSC 2187.5 kHz</span>
        </div>
      </CardContent>
    </Card>
  );
};
