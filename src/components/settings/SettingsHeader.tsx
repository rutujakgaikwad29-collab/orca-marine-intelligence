import { Settings, Save, RotateCcw, Check, Sparkles, UserCheck } from 'lucide-react';
import { Card } from '../ui/Card';

interface SettingsHeaderProps {
  onSave: () => void;
  onReset: () => void;
  saved: boolean;
}

export const SettingsHeader = ({ onSave, onReset, saved }: SettingsHeaderProps) => {
  return (
    <Card className="glass-card border-white/10 relative overflow-hidden bg-gradient-to-r from-[#11111A] via-[#161528] to-[#11111A] p-6 shadow-2xl">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-electric-lavender/20 border border-electric-lavender/40 text-electric-lavender shadow-[0_0_25px_rgba(139,92,246,0.3)]">
              <Settings className="w-8 h-8 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-soft-white uppercase tracking-wider">
                  SETTINGS & SAFETY CONTROL ⚙️
                </h1>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-bio-mint/15 border border-bio-mint/30 text-bio-mint uppercase">
                  ACTIVE PROFILE
                </span>
              </div>
              <p className="text-xs text-cool-gray">
                "Fisherman Personalization, Multilingual Voice Alerts & Marine Safety Configuration"
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-cool-gray">
            <span className="text-bio-mint font-mono font-bold">Vessel: Sea Queen VII (IND-MH-RTN-4190)</span>
            <span className="text-white/20">•</span>
            <span className="text-electric-lavender font-mono">Port: Mirkarwada, Ratnagiri</span>
            <span className="text-white/20">•</span>
            <span className="text-solar-amber font-mono">Alert Protocol: Multilingual Indian Coastal</span>
          </div>
        </div>

        {/* Save & Reset Buttons */}
        <div className="flex items-center gap-3 w-full lg:w-auto shrink-0">
          <button
            onClick={onReset}
            className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-cool-gray hover:text-soft-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
          </button>

          <button
            onClick={onSave}
            className={`py-2.5 px-5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg ${
              saved
                ? 'bg-bio-mint text-black shadow-[0_0_20px_rgba(62,240,181,0.5)]'
                : 'bg-gradient-to-r from-bio-mint to-electric-lavender text-black hover:opacity-90'
            }`}
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" /> Preferences Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Profile & Settings
              </>
            )}
          </button>
        </div>
      </div>
    </Card>
  );
};
