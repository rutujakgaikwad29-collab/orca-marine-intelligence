import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Languages, Volume2, Check, Sparkles } from 'lucide-react';
import { indianLanguages } from '../../data/mockSettingsData';
import type { IndianLanguage } from '../../data/mockSettingsData';

interface LanguageSelectorCardProps {
  selectedLanguage: IndianLanguage;
  onSelectLanguage: (code: IndianLanguage) => void;
}

export const LanguageSelectorCard = ({
  selectedLanguage,
  onSelectLanguage,
}: LanguageSelectorCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const activeLangObj = indianLanguages.find((l) => l.code === selectedLanguage) || indianLanguages[0];

  const handleTestSpeech = (text: string, langCode: string) => {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 0.95;
        u.lang = langCode === 'en' ? 'en-IN' : langCode === 'hi' ? 'hi-IN' : langCode === 'mr' ? 'mr-IN' : langCode === 'ta' ? 'ta-IN' : 'en-IN';
        u.onstart = () => setIsPlaying(true);
        u.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(u);
      }
    } catch (e) {
      console.warn('Speech error:', e);
    }
  };

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-electric-lavender">
          <Languages className="h-4 w-4" />
          MULTILINGUAL VOICE & INTERFACE LANGUAGE
        </CardTitle>
        <span className="text-[10px] font-bold text-electric-lavender font-mono bg-electric-lavender/10 border border-electric-lavender/30 px-2 py-0.5 rounded">
          7 COASTAL LANGUAGES
        </span>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-4">
        <p className="text-xs text-cool-gray leading-tight">
          Select the native language for synthesized hands-free voice broadcasts over bridge speakers and mobile SMS/WhatsApp alerts.
        </p>

        {/* Language Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {indianLanguages.map((lang) => {
            const isSelected = selectedLanguage === lang.code;

            return (
              <div
                key={lang.code}
                onClick={() => onSelectLanguage(lang.code)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between h-20 ${
                  isSelected
                    ? 'bg-electric-lavender/20 border-electric-lavender text-soft-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                    : 'bg-white/5 border-white/10 text-cool-gray hover:text-soft-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-soft-white">{lang.nativeName}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-electric-lavender stroke-[3]" />}
                </div>

                <div>
                  <span className="text-[9px] font-bold uppercase block text-soft-white/80">{lang.name}</span>
                  <span className="text-[8px] text-cool-gray truncate block">{lang.region}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Audio Sample Preview Box */}
        <div className="bg-[#0B0B12] border border-white/10 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest block">
              Synthesized Voice Advisory Preview ({activeLangObj.name} — {activeLangObj.nativeName})
            </span>
            <span className="text-[9px] font-mono text-bio-mint font-bold">READY</span>
          </div>

          <p className="text-xs text-soft-white/95 font-medium leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
            "{activeLangObj.sampleVoiceText}"
          </p>

          <button
            onClick={() => handleTestSpeech(activeLangObj.sampleVoiceText, activeLangObj.code)}
            className={`w-full py-2 px-3 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              isPlaying
                ? 'bg-electric-lavender text-black border-electric-lavender shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-soft-white'
            }`}
          >
            <Volume2 className="w-4 h-4 fill-current" />
            {isPlaying ? `Speaking ${activeLangObj.name}...` : `🔊 Hear Voice Sample (${activeLangObj.nativeName})`}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
