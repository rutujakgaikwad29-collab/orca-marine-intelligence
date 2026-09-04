import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Volume2, VolumeX, Siren, Radio, Play, CheckCircle2, Sparkles } from 'lucide-react';

export const VoiceSirenController = () => {
  const [testVoiceText, setTestVoiceText] = useState('Warning. Severe cyclonic activity and 3.1 meter waves detected ahead. Please alter course immediately.');
  const [isPlaying, setIsPlaying] = useState(false);

  const testSynthesizer = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(testVoiceText);
      u.rate = 1.0;
      u.onstart = () => setIsPlaying(true);
      u.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(u);
    }
  };

  const testSirenTone = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
      osc.frequency.exponentialRampToValueAtTime(520, ctx.currentTime + 0.6);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch (e) {
      console.warn('Audio API error:', e);
    }
  };

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-bio-mint">
          <Volume2 className="h-4 w-4" />
          VOICE & SIREN SYNTHESIS TEST CONSOLE
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          SPEECH ENGINE READY
        </span>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-4">
        <p className="text-xs text-cool-gray leading-tight">
          Test maritime speech alerts in real-time. The synthesized voice engine delivers hands-free audio advisories over vessel bridge speakers and mobile apps.
        </p>

        {/* Input Textarea */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-bold text-cool-gray uppercase tracking-widest block">
            Custom Voice String to Synthesize
          </label>
          <textarea
            value={testVoiceText}
            onChange={(e) => setTestVoiceText(e.target.value)}
            rows={2}
            className="w-full bg-[#0B0B12] border border-white/10 rounded-xl p-2.5 text-xs text-soft-white font-mono outline-none focus:border-bio-mint"
          />
        </div>

        {/* Playback Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            onClick={testSynthesizer}
            className={`py-2 px-3 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              isPlaying
                ? 'bg-bio-mint text-black border-bio-mint shadow-[0_0_15px_rgba(62,240,181,0.4)]'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-soft-white'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {isPlaying ? 'Speaking...' : 'Test Voice Speech'}
          </button>

          <button
            onClick={testSirenTone}
            className="py-2 px-3 rounded-xl bg-coral-red/20 hover:bg-coral-red/30 border border-coral-red/50 text-coral-red text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <Siren className="w-3.5 h-3.5" /> Test Vessel Siren (95dB)
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] text-cool-gray pt-1 border-t border-white/5">
          <span>Supported Formats: PCM Audio / Web Speech API</span>
          <span className="text-bio-mint font-mono font-bold">Latency: &lt;120ms</span>
        </div>
      </CardContent>
    </Card>
  );
};
