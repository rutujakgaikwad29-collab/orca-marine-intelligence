import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Smartphone, Monitor, Ship, Volume2, VolumeX, Bell, Siren, Radio, Play, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import type { AlertItem } from '../../data/mockAlertsData';

interface MultiDeviceBroadcastDemoProps {
  criticalAlert: AlertItem;
  onNavigateSafeRoute?: () => void;
}

export const MultiDeviceBroadcastDemo = ({ criticalAlert, onNavigateSafeRoute }: MultiDeviceBroadcastDemoProps) => {
  const [isPlayingSiren, setIsPlayingSiren] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);

  // Play synthetic siren via Web Audio API
  const playSiren = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.4);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
      setIsPlayingSiren(true);
      setTimeout(() => setIsPlayingSiren(false), 1200);
    } catch (e) {
      console.warn('Audio playback not supported:', e);
    }
  };

  // Play synthesized voice alert via Web Speech API
  const playVoiceAlert = (text: string) => {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.onstart = () => setVoiceActive(true);
        utterance.onend = () => setVoiceActive(false);
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  };

  const handleTriggerFullAlert = () => {
    playSiren();
    playVoiceAlert(criticalAlert.voiceMessage);
  };

  return (
    <Card className="glass-card border-coral-red/40 relative overflow-hidden bg-gradient-to-r from-coral-red/10 via-[#11111A] to-[#11111A] shadow-2xl p-6">
      <div className="flex flex-col gap-5">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-coral-red/20 text-coral-red border border-coral-red/50 shadow-[0_0_15px_rgba(255,92,119,0.4)] animate-pulse">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-soft-white uppercase tracking-widest">
                  SYNCHRONIZED MULTI-DEVICE BROADCAST DEMO
                </h3>
                <span className="text-[10px] text-solar-amber font-mono font-bold">
                  SIH KILLER FEATURE: INSTANTANEOUS 3-SCREEN DISPATCH (DASHBOARD &rarr; MOBILE &rarr; VESSEL IOT)
                </span>
              </div>
            </div>
          </div>

          {/* Audio & Voice Trigger Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleTriggerFullAlert}
              className="py-2 px-3.5 rounded-xl bg-coral-red text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(255,92,119,0.5)] animate-pulse"
            >
              <Volume2 className="w-4 h-4 fill-black" /> 🔊 BROADCAST VOICE & SIREN
            </button>

            <button
              onClick={() => {
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                setVoiceActive(false);
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-cool-gray hover:text-soft-white"
              title="Mute Speech"
            >
              <VolumeX className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Synchronized Device Mockups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Dashboard Notification View */}
          <div className="bg-[#0B0B12] border border-white/10 rounded-2xl p-4 flex flex-col justify-between h-72 shadow-lg relative overflow-hidden group">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest flex items-center gap-1.5">
                <Monitor className="w-3.5 h-3.5 text-electric-lavender" /> 🖥️ Command Dashboard
              </span>
              <span className="text-[8px] font-mono text-bio-mint font-bold px-1.5 py-0.2 rounded bg-bio-mint/10 border border-bio-mint/30">
                CONNECTED
              </span>
            </div>

            <div className="my-auto space-y-2 bg-coral-red/15 border border-coral-red/40 rounded-xl p-3">
              <div className="flex items-center gap-2 text-coral-red">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  EMERGENCY BROADCAST
                </span>
              </div>
              <p className="text-xs font-bold text-soft-white leading-tight">
                {criticalAlert.title.replace('🔴 ', '')}
              </p>
              <div className="text-[9px] font-mono text-cool-gray">
                Wave: <strong className="text-soft-white">3.1 m</strong> • Wind: <strong className="text-soft-white">48 km/h</strong>
              </div>
            </div>

            <button
              onClick={onNavigateSafeRoute}
              className="w-full py-1.5 rounded-lg bg-white/5 hover:bg-bio-mint/20 border border-white/10 text-soft-white hover:text-bio-mint font-bold text-[9px] uppercase tracking-wider flex items-center justify-center gap-1 transition-colors"
            >
              🧭 View Evasion Route <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>

          {/* 2. Mobile App Mockup View (iPhone / Android) */}
          <div className="bg-[#0B0B12] border-2 border-solar-amber/40 rounded-3xl p-4 flex flex-col justify-between h-72 shadow-[0_0_25px_rgba(255,181,71,0.15)] relative overflow-hidden">
            {/* Phone notch */}
            <div className="w-16 h-3 bg-white/10 rounded-full mx-auto mb-1"></div>

            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-[9px] font-bold text-solar-amber uppercase tracking-widest flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" /> 📱 Fisherman Mobile App
              </span>
              <span className="text-[8px] font-mono text-solar-amber font-bold">PUSH SENT</span>
            </div>

            <div className="my-auto bg-[#1A1424] border border-coral-red/50 rounded-2xl p-3 space-y-1.5 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-coral-red uppercase flex items-center gap-1">
                  <Siren className="w-3 h-3" /> ORCA Safety Alert
                </span>
                <span className="text-[8px] font-mono text-cool-gray">NOW</span>
              </div>
              <p className="text-[11px] font-bold text-soft-white leading-tight">
                Cyclonic swell 3.1m ahead! Tap to navigate to Mirkarwada safe harbour.
              </p>
              <div className="flex items-center gap-1.5 pt-1 text-[8px] font-mono text-bio-mint font-bold">
                <span>🔊 Siren Triggered</span>
                <span>•</span>
                <span>🗣️ Voice Active</span>
              </div>
            </div>

            <span className="text-[8px] font-mono text-cool-gray text-center block">
              SMS / WhatsApp / Native Push Dispatched
            </span>
          </div>

          {/* 3. Onboard Marine IoT Display / Transponder */}
          <div className="bg-[#05050A] border border-bio-mint/40 rounded-2xl p-4 flex flex-col justify-between h-72 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-[9px] font-bold text-bio-mint uppercase tracking-widest flex items-center gap-1.5">
                <Ship className="w-3.5 h-3.5" /> 🚢 Vessel Marine IoT Display
              </span>
              <span className="text-[8px] font-mono text-bio-mint font-bold px-1.5 py-0.2 rounded bg-bio-mint/10">
                LoRaWAN / NMEA
              </span>
            </div>

            <div className="my-auto border-2 border-coral-red bg-black/90 rounded-xl p-3 text-center space-y-1 relative">
              {/* Flashing Strobe Indicator */}
              <div className="w-3 h-3 rounded-full bg-coral-red mx-auto shadow-[0_0_12px_rgba(255,92,119,1)] animate-ping mb-1"></div>
              <span className="text-xs font-mono font-bold text-coral-red uppercase block">
                ! DANGER: ALTER COURSE !
              </span>
              <span className="text-[10px] font-mono text-soft-white block font-bold">
                BEARING: 090° TO REFUGE
              </span>
              <span className="text-[8px] font-mono text-cool-gray">
                Buzzer: 95dB ACTIVE • VHF CH 16 ON
              </span>
            </div>

            <div className="flex items-center justify-between text-[8px] font-mono text-cool-gray pt-1 border-t border-white/5">
              <span>Transponder: 419001234</span>
              <span className="text-bio-mint">Link: Sat-IoT OK</span>
            </div>
          </div>
        </div>

        {/* Voice Speech Indicator Sub-bar */}
        {voiceActive && (
          <div className="bg-electric-lavender/15 border border-electric-lavender/40 rounded-xl p-3 flex items-center gap-3 animate-pulse text-xs">
            <Volume2 className="w-5 h-5 text-electric-lavender shrink-0" />
            <div>
              <span className="text-[9px] font-bold text-electric-lavender uppercase tracking-widest block">
                🗣️ SYNTHESIZED VOICE BROADCAST PLAYING IN SPEECH ENGINE:
              </span>
              <p className="text-soft-white font-mono text-[11px] leading-tight mt-0.5">
                "{criticalAlert.voiceMessage}"
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
