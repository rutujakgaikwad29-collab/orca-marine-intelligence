import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  AlertTriangle,
  Wind,
  Waves,
  Compass,
  Fish,
  Volume2,
  VolumeX,
  PhoneCall,
  MapPin,
  Sparkles,
  ArrowRight,
  Radio,
  Clock,
  Navigation,
  Globe,
  Bot,
  AlertOctagon,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Play
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { useAppStore } from '../store/useAppStore';
import { toast } from 'sonner';

export const MobileFishermanDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language, setLanguage } = useAppStore();

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [sosActive, setSosActive] = useState(false);
  const [cycloneSimActive, setCycloneSimActive] = useState(true);

  // Supported language codes
  const currentLang = language.toLowerCase();

  // Multi-lingual content for Mobile Fisherman
  const mobileI18n: Record<string, any> = {
    mr: {
      platformTitle: 'सागरी बुद्धिमत्ता प्लॅटफॉर्म',
      roleName: 'मासेमार (Skipper)',
      cycloneBadge: 'चक्रीवादळ इशारा सक्रिय',
      safetyRadar: 'सागरी सुरक्षा आणि आणीबाणी रडार',
      warningSystem: 'सुरक्षा आणि धोका चेतावणी प्रणाली',
      warningSub: 'थेट चक्रीवादळ ट्रॅकिंग, लाटांचा इशारा आणि सुरक्षित निर्गमन मार्ग',
      criticalSeverity: 'गंभीर आणीबाणी (CRITICAL EMERGENCY)',
      cycloneTitle: "चक्रीवादळ इशारा 'अर्णव' (CYCLONE ARNAV)",
      cycloneDesc: 'तीव्र चक्रीवादळ तुमच्या स्थानाकडे (18.52°N, 72.83°E) सरकत आहे.',
      viewEvacRoute: 'सुरक्षित परतीचा मार्ग पहा',
      estArrival: 'अंदाजे वेळ',
      estArrivalVal: '3 तास',
      riskLevel: 'सध्याचा धोका',
      riskLevelVal: 'अति-गंभीर',
      windSpeed: 'वाऱ्याचा वेग',
      windSpeedVal: '68 किमी/तास',
      recAction: 'शिफारस',
      recActionVal: 'बंदरात परत या',
      squallTitle: 'तीव्र वारे आणि वादळ इशारा',
      squallDesc: 'वायव्य दिशेने 14 किमी/ताशी वारे. सामान्य परिस्थितीत सुरक्षित.',
      waveAdvisory: 'उच्च लाटांचा धोका सल्ला',
      waveDesc: 'किनाऱ्याजवळ लाटांची उंची 2.8 मीटरपर्यंत वाढेल. दुपारनंतर सावधानता बाळगा.',
      pfzTitle: 'नवीन मासेमारी झोन (PFZ Target)',
      pfzSub: 'झोन AS-03 (23 किमी पश्चिम) • 82% मुबलक बांगडा मासे',
      bestRouteTitle: 'सर्वोत्तम सुरक्षित मार्ग (Route D)',
      bestRouteSub: '+12% इंधन बचत • चक्रीवादळापासून सुरक्षित किनारी मार्ग',
      listenVoice: '🔊 ऑडिओ इशारा ऐका',
      stopVoice: 'ऑडिओ थांबवा',
      sosText: '🚨 आणीबाणी SOS',
      sosSub: 'तटरक्षक दलास थेट 1-टॅप संदेश',
      helpline: 'तटरक्षक दल हेल्पलाइन: 1554',
      speechText: "लक्ष द्या! चक्रीवादळ अर्णव पुढील 3 तासांत येत आहे. वाऱ्याचा वेग 68 किमी प्रतितास असेल. कृपया त्वरित मार्ग D ने मिरकरवाडा बंदरात परत या."
    },
    hi: {
      platformTitle: 'समुद्री खुफिया मंच',
      roleName: 'मछुआरा (Skipper)',
      cycloneBadge: 'चक्रवात अलर्ट सक्रिय',
      safetyRadar: 'समुद्री सुरक्षा और आपातकालीन रडार',
      warningSystem: 'सुरक्षा एवं खतरा चेतावनी प्रणाली',
      warningSub: 'रीयल-टाइम चक्रवात ट्रैकिंग, समुद्री लहर अलर्ट और आपातकालीन निकासी मार्ग',
      criticalSeverity: 'गंभीर आपातकाल (CRITICAL EMERGENCY)',
      cycloneTitle: "चक्रवात अलर्ट 'अर्णव' (CYCLONE ARNAV)",
      cycloneDesc: 'तीव्र चक्रवाती बवंडर आपके स्थान (18.52°N, 72.83°E) की ओर बढ़ रहा है।',
      viewEvacRoute: 'सुरक्षित निकासी मार्ग देखें',
      estArrival: 'अनुमानित आगमन',
      estArrivalVal: '3 घंटे',
      riskLevel: 'वर्तमान जोखिम',
      riskLevelVal: 'अत्यधिक उच्च',
      windSpeed: 'हवा की गति',
      windSpeedVal: '68 किमी/घंटा',
      recAction: 'अनुशंसित कार्रवाई',
      recActionVal: 'तट पर लौटें',
      squallTitle: 'तेज हवा और तूफान की चेतावनी',
      squallDesc: 'उत्तर-पश्चिम दिशा से 14 किमी/घंटा हवा। सामान्य जहाजों के लिए सुरक्षित।',
      waveAdvisory: 'ऊंची लहरों की चेतावनी',
      waveDesc: 'अपतटीय लहर की ऊंचाई 2.8 मीटर तक पहुंचेगी। दोपहर बाद सावधानी रखें।',
      pfzTitle: 'नया मछली पकड़ने का क्षेत्र (PFZ)',
      pfzSub: 'क्षेत्र AS-03 (23 किमी पश्चिम) • 82% मछली घनत्व',
      bestRouteTitle: 'सर्वोत्तम सुरक्षित मार्ग (Route D)',
      bestRouteSub: '+12% ईंधन बचत • चक्रवात से सुरक्षित आश्रय मार्ग',
      listenVoice: '🔊 ऑडियो चेतावनी सुनें',
      stopVoice: 'ऑडियो रोकें',
      sosText: '🚨 आपातकालीन SOS',
      sosSub: 'तटरक्षक बल को 1-टैप संदेश',
      helpline: 'तटरक्षक बल हेल्पलाइन: 1554',
      speechText: "सावधान! चक्रवात अर्णव 3 घंटे में आ रहा है। हवा की गति 68 किलोमीटर प्रति घंटा है। तुरंत मार्ग D से बंदरगाह वापस लौटें।"
    },
    te: {
      platformTitle: 'సముద్ర మేధస్సు ప్లాట్‌ఫాం',
      roleName: 'మత్స్యకారుడు (Skipper)',
      cycloneBadge: 'తుఫాను హెచ్చరిక క్రియాశీలం',
      safetyRadar: 'సముద్ర భద్రత మరియు అత్యవసర రాడార్',
      warningSystem: 'భద్రత మరియు ప్రమాద హెచ్చరిక వ్యవస్థ',
      warningSub: 'రియల్-టైమ్ తుఫాను ట్రాకింగ్, అలల ఉధృతి హెచ్చరికలు & అత్యవసర తరలింపు మార్గం',
      criticalSeverity: 'తీవ్ర అత్యవసర పరిస్థితి (CRITICAL EMERGENCY)',
      cycloneTitle: "తుఫాను హెచ్చరిక 'ఆర్నవ్' (CYCLONE ARNAV)",
      cycloneDesc: 'తీవ్రమైన తుఫాను సుడిగుండం మీ స్థానానికి (18.52°N, 72.83°E) చేరుకుంటోంది.',
      viewEvacRoute: 'సురక్షిత తరలింపు మార్గాన్ని చూడండి',
      estArrival: 'అంచనా సమయం',
      estArrivalVal: '3 గంటలు',
      riskLevel: 'ప్రస్తుత ప్రమాదం',
      riskLevelVal: 'తీవ్ర ప్రమాదం',
      windSpeed: 'గాలి వేగం',
      windSpeedVal: '68 కిమీ/గం',
      recAction: 'సిఫార్సు చేసిన చర్య',
      recActionVal: 'తీరానికి తిరిగి రండి',
      squallTitle: 'తీవ్రమైన గాలి హెచ్చరిక',
      squallDesc: 'వాయవ్య దిశ నుండి 14 కిమీ/గం గాలి వేగం.',
      waveAdvisory: 'ఎత్తైన అలల హెచ్చరిక',
      waveDesc: 'సముద్రపు అలల ఎత్తు 2.8 మీటర్లకు పెరుగుతుంది.',
      pfzTitle: 'కొత్త ఫిషింగ్ జోన్ (PFZ)',
      pfzSub: 'జోన్ AS-03 (23 కి.మీ పశ్చిమం) • 82% చేపల లభ్యత',
      bestRouteTitle: 'ఉత్తమ సురక్షిత మార్గం (Route D)',
      bestRouteSub: '+12% ఇంధన ఆదా • తుఫానును నివారించే మార్గం',
      listenVoice: '🔊 ఆడియో హెచ్చరిక వినండి',
      stopVoice: 'ఆడియో ఆపండి',
      sosText: '🚨 అత్యవసర SOS',
      sosSub: 'కోస్ట్ గార్డ్‌కు 1-ట్యాప్ సందేశం',
      helpline: 'కోస్ట్ గార్డ్ హెల్ప్‌లైన్: 1554',
      speechText: "హెచ్చరిక! తుఫాను అర్ణవ్ 3 గంటల్లో వస్తోంది. వెంటనే సురక్షిత మార్గం D ద్వారా తీరానికి చేరుకోండి."
    },
    ta: {
      platformTitle: 'கடல்சார் புலனாய்வு தளம்',
      roleName: 'மீனவர் (Skipper)',
      cycloneBadge: 'புயல் எச்சரிக்கை செயலில் உள்ளது',
      safetyRadar: 'கடல்சார் பாதுகாப்பு & அவசர ராடார்',
      warningSystem: 'பாதுகாப்பு & ஆபத்து எச்சரிக்கை அமைப்பு',
      warningSub: 'நேரலை புயல் கண்காணிப்பு மற்றும் அவசர வெளியேற்ற வழித்தடம்',
      criticalSeverity: 'அவசர நிலை (CRITICAL EMERGENCY)',
      cycloneTitle: "புயல் எச்சரிக்கை 'அர்ணவ்' (CYCLONE ARNAV)",
      cycloneDesc: 'தீவிர புயல் சுழல் உங்கள் பகுதியை (18.52°N, 72.83°E) நோக்கி நகர்கிறது.',
      viewEvacRoute: 'பாதுகாப்பான பாதையைக் காண்க',
      estArrival: 'வருகை நேரம்',
      estArrivalVal: '3 மணி நேரம்',
      riskLevel: 'தற்போதைய ஆபத்து',
      riskLevelVal: 'அதி தீவிர ஆபத்து',
      windSpeed: 'காற்றின் வேகம்',
      windSpeedVal: '68 கிமீ/மணி',
      recAction: 'பரிந்துரைக்கப்படும் செயல்',
      recActionVal: 'துறைமுகம் திரும்பவும்',
      squallTitle: 'சூறாவளி காற்று எச்சரிக்கை',
      squallDesc: 'வடமேற்கில் 14 கிமீ வேகத்தில் காற்று.',
      waveAdvisory: 'உயர் அலை எச்சரிக்கை',
      waveDesc: 'கடல் அலைகள் 2.8 மீட்டர் வரை உயரும்.',
      pfzTitle: 'புதிய மீன்பிடி மண்டலம் (PFZ)',
      pfzSub: 'மண்டலம் AS-03 (23 கி.மீ மேற்கு) • 82% மீன்வளம்',
      bestRouteTitle: 'சிறந்த பாதுகாப்பான பாதை (Route D)',
      bestRouteSub: '+12% எரிபொருள் சேமிப்பு • புயல் தவிர்ப்பு பாதை',
      listenVoice: '🔊 ஆடியோ எச்சரிக்கை கேட்கவும்',
      stopVoice: 'ஆடியோவை நிறுத்து',
      sosText: '🚨 அவசர SOS',
      sosSub: 'கடலோர காவல்படைக்கு 1-தட்டல் தகவல்',
      helpline: 'கடலோர காவல்படை உதவி எண்: 1554',
      speechText: "எச்சரிக்கை! அர்ணவ் புயல் 3 மணி நேரத்தில் வரவுள்ளது. உடனடியாக பாதை D வழியாக துறைமுகம் திரும்பவும்."
    },
    en: {
      platformTitle: 'Marine Ecosystem Reasoning Platform',
      roleName: 'Fisherman (Skipper)',
      cycloneBadge: 'Cyclone Scenario Active',
      safetyRadar: 'MARITIME DEFENSE & EMERGENCY RADAR',
      warningSystem: 'Safety & Hazard Warning System',
      warningSub: 'Real-time cyclone tracking, wave surge breach alerts & emergency vessel evacuation routing',
      criticalSeverity: 'SEVERITY: CRITICAL EMERGENCY',
      cycloneTitle: "CYCLONE ALERT 'ARNAV'",
      cycloneDesc: 'Severe Cyclonic Vortex approaching your location (18.52°N, 72.83°E).',
      viewEvacRoute: 'View Evacuation Safe Route',
      estArrival: 'Estimated Arrival',
      estArrivalVal: '3 Hours',
      riskLevel: 'Current Risk',
      riskLevelVal: 'HIGH / EXTREME',
      windSpeed: 'Max Wind Speed',
      windSpeedVal: '68 km/h',
      recAction: 'Recommended Action',
      recActionVal: 'RETURN TO SHORE',
      squallTitle: 'Squall & Gale Wind Warning',
      squallDesc: 'Offshore wind vector tracking | 14 km/h NW. Safe for all vessel types under normal conditions.',
      waveAdvisory: 'High Wave Breach Advisory',
      waveDesc: 'Offshore swell wave height at 2.8 m post afternoon. Wave energy increases significantly.',
      pfzTitle: 'Optimal Potential Fishing Zone (PFZ)',
      pfzSub: 'Zone AS-03 (23 km West) • High Pelagic Aggregation (82%)',
      bestRouteTitle: 'Recommended Route D (ORCA ⭐)',
      bestRouteSub: '+12% Current Assist Fuel Savings • Storm Avoidance Path',
      listenVoice: '🔊 Listen Audio Warning',
      stopVoice: 'Stop Audio Warning',
      sosText: '🚨 EMERGENCY SOS',
      sosSub: '1-tap distress broadcast to coast guard',
      helpline: 'Coast Guard Helpline: 1554',
      speechText: "Urgent Cyclone Warning! Cyclone Arnav is approaching within 3 hours with winds of 68 kilometers per hour. Immediately follow Route D to return to shore."
    }
  };

  const t = mobileI18n[currentLang] || mobileI18n.en;

  // Voice speech trigger
  const handlePlayVoice = () => {
    if (!('speechSynthesis' in window)) {
      toast.error('Voice synthesis not available.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(t.speechText);
    utterance.rate = 0.93;
    utterance.pitch = 1.0;
    utterance.lang = currentLang === 'mr' ? 'mr-IN' : currentLang === 'hi' ? 'hi-IN' : currentLang === 'te' ? 'te-IN' : currentLang === 'ta' ? 'ta-IN' : 'en-IN';

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    toast.success('🔊 Broadcasting Emergency Warning in spoken voice');
  };

  const handleSOS = () => {
    const next = !sosActive;
    setSosActive(next);
    if (next) {
      toast.error('🚨 DISTRESS SOS SENT to Indian Coast Guard with GPS coordinates (18.52°N, 72.83°E)!', {
        duration: 9000,
      });
      if ('speechSynthesis' in window) {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance("Distress SOS Broadcasted to Indian Coast Guard."));
      }
    } else {
      toast.info('Distress SOS cancelled.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-[#070B14] text-soft-white flex flex-col justify-between pb-24 shadow-2xl relative border-x border-white/5 selection:bg-bio-mint selection:text-black">
      {/* 1. TOP MOBILE APP HEADER */}
      <div className="sticky top-0 z-30 bg-[#0A101D]/95 backdrop-blur-xl border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <Waves className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-black tracking-wide text-white font-mono">ORCA</h1>
                <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                  MULTI-AGENT AI
                </span>
              </div>
              <p className="text-[9px] text-gray-400 truncate max-w-[180px]">
                {t.platformTitle}
              </p>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/15 rounded-full px-2 py-1">
            <Globe className="w-3 h-3 text-cyan-400" />
            <select
              value={currentLang}
              onChange={(e) => {
                setLanguage(e.target.value);
                toast.success('Language Updated');
              }}
              className="bg-transparent text-[11px] font-bold text-white outline-none cursor-pointer pr-1"
            >
              <option value="mr" className="bg-[#0A101D] text-white">मराठी</option>
              <option value="hi" className="bg-[#0A101D] text-white">हिन्दी</option>
              <option value="te" className="bg-[#0A101D] text-white">తెలుగు</option>
              <option value="ta" className="bg-[#0A101D] text-white">தமிழ்</option>
              <option value="gu" className="bg-[#0A101D] text-white">ગુજરાતી</option>
              <option value="bn" className="bg-[#0A101D] text-white">বাংলা</option>
              <option value="ml" className="bg-[#0A101D] text-white">മലയാളം</option>
              <option value="en" className="bg-[#0A101D] text-white">English</option>
            </select>
          </div>
        </div>

        {/* Fisherman ID & Live Location Bar */}
        <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-bio-mint animate-pulse"></span>
            <span>👨🏽‍✈️ {user?.name || 'Skipper Ramesh Patil'}</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-cyan-300">
            <MapPin className="w-3 h-3 text-bio-mint" />
            <span>18.52°N, 72.83°E (Ratnagiri)</span>
          </div>
        </div>
      </div>

      {/* 2. QUICK SHORTCUT PILLS */}
      <div className="px-3 pt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => navigate('/ask')}
          className="px-3 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[11px] font-bold shrink-0 flex items-center gap-1.5"
        >
          <Bot className="w-3.5 h-3.5" /> 🎙️ Ask ORCA
        </button>
        <button
          onClick={() => navigate('/fishing')}
          className="px-3 py-1.5 rounded-full bg-bio-mint/15 border border-bio-mint/30 text-bio-mint text-[11px] font-bold shrink-0 flex items-center gap-1.5"
        >
          <Fish className="w-3.5 h-3.5" /> 🐟 Fish PFZ
        </button>
        <button
          onClick={() => navigate('/route')}
          className="px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[11px] font-bold shrink-0 flex items-center gap-1.5"
        >
          <Compass className="w-3.5 h-3.5" /> 🧭 Route
        </button>
        <button
          onClick={() => navigate('/safety')}
          className="px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold shrink-0 flex items-center gap-1.5"
        >
          <ShieldAlert className="w-3.5 h-3.5" /> ⚠️ Safety
        </button>
      </div>

      {/* 3. MAIN MOBILE BODY: ONLY FISHERMAN, CYCLONE & CRITICAL ROUTE */}
      <div className="p-3.5 space-y-4 flex-1">
        {/* ========================================================================= */}
        {/* CRITICAL CYCLONE & HAZARD RADAR WARNING CARD (Matches Uploaded Mockup)   */}
        {/* ========================================================================= */}
        <div className="rounded-2xl border border-red-500/40 bg-gradient-to-b from-[#1C0D15] via-[#150A10] to-[#0D070B] p-4 shadow-[0_0_30px_rgba(239,68,68,0.25)] relative overflow-hidden">
          {/* Header Radar Badge */}
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-red-500/20">
            <div className="flex items-center gap-1.5 text-[9px] font-black text-cyan-400 tracking-wider font-mono uppercase">
              <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
              {t.safetyRadar}
            </div>
            <span className="inline-flex items-center gap-1 text-[8px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse">
              <Radio className="w-2.5 h-2.5" /> {t.cycloneBadge}
            </span>
          </div>

          <div className="mt-2.5 space-y-1">
            <h2 className="text-base font-black text-white leading-tight">
              {t.warningSystem}
            </h2>
            <p className="text-[10px] text-gray-300 leading-snug">
              {t.warningSub}
            </p>
          </div>

          {/* Red Alert Box */}
          <div className="mt-3 p-3 rounded-xl bg-red-950/60 border border-red-500/50 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center shrink-0 shadow-md">
                  <AlertOctagon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-[8px] font-black text-red-400 uppercase tracking-widest block">
                    {t.criticalSeverity}
                  </span>
                  <h3 className="text-xs sm:text-sm font-extrabold text-white leading-tight">
                    {t.cycloneTitle}
                  </h3>
                </div>
              </div>

              {/* View Evac Route Link */}
              <button
                onClick={() => navigate('/route')}
                className="text-[9px] font-bold px-2.5 py-1 rounded-lg bg-bio-mint text-black shrink-0 flex items-center gap-1 shadow-sm hover:scale-105 transition-transform"
              >
                {t.viewEvacRoute} <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <p className="text-[10px] text-gray-200">
              {t.cycloneDesc}
            </p>

            {/* 4 Emergency Grid Badges */}
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <div className="p-2 rounded-lg bg-black/60 border border-red-500/30 text-center">
                <span className="text-[8px] font-bold text-gray-400 uppercase block">{t.estArrival}</span>
                <span className="text-xs font-black text-cyan-300 font-mono">{t.estArrivalVal}</span>
              </div>
              <div className="p-2 rounded-lg bg-black/60 border border-red-500/30 text-center">
                <span className="text-[8px] font-bold text-gray-400 uppercase block">{t.riskLevel}</span>
                <span className="text-xs font-black text-red-400 font-mono">{t.riskLevelVal}</span>
              </div>
              <div className="p-2 rounded-lg bg-black/60 border border-red-500/30 text-center">
                <span className="text-[8px] font-bold text-gray-400 uppercase block">{t.windSpeed}</span>
                <span className="text-xs font-black text-yellow-400 font-mono">{t.windSpeedVal}</span>
              </div>
              <div className="p-2 rounded-lg bg-black/60 border border-red-500/30 text-center">
                <span className="text-[8px] font-bold text-gray-400 uppercase block">{t.recAction}</span>
                <span className="text-xs font-black text-green-400 font-mono">{t.recActionVal}</span>
              </div>
            </div>
          </div>

          {/* Live Voice Broadcast Button */}
          <div className="mt-3">
            <button
              onClick={handlePlayVoice}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg ${
                isPlayingAudio
                  ? 'bg-amber-400 text-black animate-pulse shadow-[0_0_20px_rgba(251,191,36,0.6)]'
                  : 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4 animate-spin" /> {t.stopVoice}
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" /> {t.listenVoice}
                </>
              )}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* NEW POTENTIAL FISHING ZONE (PFZ) & BEST ROUTE RECOMMENDATION             */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 gap-2.5">
          {/* Target Fishing Zone Card */}
          <div
            onClick={() => navigate('/fishing')}
            className="p-3.5 rounded-2xl bg-[#0E1626] border border-bio-mint/40 hover:border-bio-mint flex items-center justify-between gap-3 cursor-pointer shadow-md transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-bio-mint/15 border border-bio-mint/30 flex items-center justify-center text-bio-mint shrink-0 group-hover:scale-105 transition-transform">
                <Fish className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[9px] font-bold text-bio-mint uppercase tracking-wider block font-mono">
                  {t.pfzTitle}
                </span>
                <h4 className="text-xs font-extrabold text-white">Zone AS-03 (82% Catch)</h4>
                <p className="text-[10px] text-gray-300">23 km West • Depth: 32m</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-bio-mint shrink-0" />
          </div>

          {/* Best Evacuation / Fishing Route Card */}
          <div
            onClick={() => navigate('/route')}
            className="p-3.5 rounded-2xl bg-[#131124] border border-purple-500/40 hover:border-purple-400 flex items-center justify-between gap-3 cursor-pointer shadow-md transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[9px] font-bold text-purple-300 uppercase tracking-wider block font-mono">
                  {t.bestRouteTitle}
                </span>
                <h4 className="text-xs font-extrabold text-white">Sheltered Route D</h4>
                <p className="text-[10px] text-gray-300">{t.bestRouteSub}</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-purple-300 shrink-0" />
          </div>
        </div>

        {/* 2 Sub-Warning Tiles */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1">
            <div className="flex items-center gap-1 text-amber-400 text-[9px] font-bold">
              <Wind className="w-3.5 h-3.5" />
              <span>{t.squallTitle}</span>
            </div>
            <p className="text-[9px] text-gray-300 leading-tight">{t.squallDesc}</p>
          </div>

          <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-1">
            <div className="flex items-center gap-1 text-blue-400 text-[9px] font-bold">
              <Waves className="w-3.5 h-3.5" />
              <span>{t.waveAdvisory}</span>
            </div>
            <p className="text-[9px] text-gray-300 leading-tight">{t.waveDesc}</p>
          </div>
        </div>
      </div>

      {/* 4. FIXED BOTTOM MOBILE ACTION BAR: SOS & VOICE MIC */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 bg-[#0A101D]/95 backdrop-blur-2xl border-t border-white/10 p-3 flex items-center gap-2.5">
        {/* Big 1-Tap Emergency SOS */}
        <button
          onClick={handleSOS}
          className={`flex-1 py-3 px-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all border ${
            sosActive
              ? 'bg-red-600 text-white animate-bounce shadow-[0_0_25px_rgba(255,0,0,0.9)]'
              : 'bg-red-500/20 text-red-400 border-red-500/50 hover:bg-red-500/30 shadow-md'
          }`}
        >
          <AlertOctagon className="w-4 h-4 text-red-400" />
          <span>{sosActive ? '🚨 SOS ACTIVE - CANCEL' : t.sosText}</span>
        </button>

        {/* Direct Helpline */}
        <a
          href="tel:1554"
          className="p-3 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center"
          title="Call Coast Guard (1554)"
        >
          <PhoneCall className="w-4 h-4" />
        </a>

        {/* Direct Voice Assistant Link */}
        <button
          onClick={() => navigate('/ask')}
          className="py-3 px-3.5 rounded-xl bg-gradient-to-r from-bio-mint to-cyan-400 text-black font-extrabold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(62,240,181,0.4)]"
        >
          <Bot className="w-4 h-4" />
          <span>Voice</span>
        </button>
      </div>
    </div>
  );
};
