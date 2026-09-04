import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  Volume2,
  VolumeX,
  Sparkles,
  Send,
  X,
  Globe,
  Radio,
  Bot,
  MessageSquare,
  Check,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAppStore } from '../../store/useAppStore';

// Supported 8 Coastal & Major Indian Languages
export type SupportedLang = 'MR' | 'HI' | 'TE' | 'TA' | 'GU' | 'BN' | 'ML' | 'EN';

interface LangConfig {
  code: SupportedLang;
  name: string;
  nativeName: string;
  speechCode: string;
  greeting: string;
  placeholder: string;
  sampleQueries: string[];
  switchedMsg: string;
}

export const LANGUAGES: Record<SupportedLang, LangConfig> = {
  MR: {
    code: 'MR',
    name: 'Marathi',
    nativeName: 'मराठी',
    speechCode: 'mr-IN',
    greeting: 'नमस्कार! मी ORCA सागरी गुप्तचर एजंट आहे. तुम्हाला मासेमारी, समुद्राच्या लाटा, हवामान किंवा सुरक्षित मार्गाबद्दल काय माहिती हवी आहे?',
    placeholder: 'मासेमारी झोन, लाटा किंवा हवामानाबद्दल विचारा...',
    sampleQueries: [
      'आज समुद्रात जाणे सुरक्षित आहे का?',
      'जवळचा मासेमारी झोन (PFZ) कुठे आहे?',
      'दुपारी समुद्रात लाटा किती वाढतील?'
    ],
    switchedMsg: 'नमस्कार! ऑर्का आता मराठीत संवाद साधण्यासाठी सज्ज आहे.'
  },
  HI: {
    code: 'HI',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    speechCode: 'hi-IN',
    greeting: 'नमस्ते! मैं ORCA समुद्री सहायक हूँ। आज मैं आपकी मछली पकड़ने के क्षेत्र, मौसम और सुरक्षा में कैसे मदद कर सकता हूँ?',
    placeholder: 'मछली पकड़ने के क्षेत्र, मौसम या मार्ग के बारे में पूछें...',
    sampleQueries: [
      'क्या आज समुद्र में मछली पकड़ना सुरक्षित है?',
      'सबसे नजदीकी मछली क्षेत्र (PFZ) कहाँ है?',
      'मौसम और तूफ़ान का क्या अनुमान है?'
    ],
    switchedMsg: 'नमस्ते! ORCA अब हिन्दी में सहायता के लिए तैयार है।'
  },
  TE: {
    code: 'TE',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    speechCode: 'te-IN',
    greeting: 'నమస్కారం! నేను ORCA సముద్ర మేధస్సు సహాయకుడిని. చేపల వేట, సముద్ర వాతావరణం లేదా సురక్షిత మార్గం గురించి నన్ను అడగండి.',
    placeholder: 'చేపల వేట జోన్, వాతావరణం లేదా భద్రత గురించి అడగండి...',
    sampleQueries: [
      'ఈ రోజు సముద్రంలో చేపల వేటకు వెళ్లడం సురక్షితమేనా?',
      'సమీపంలోని ఫిషింగ్ జోన్ (PFZ) ఎక్కడ ఉంది?',
      'అలల తీవ్రత మరియు వాతావరణం ఎలా ఉంది?'
    ],
    switchedMsg: 'నమస్కారం! ORCA ఇప్పుడు తెలుగులో మాట్లాడటానికి సిద్ధంగా ఉంది.'
  },
  TA: {
    code: 'TA',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    speechCode: 'ta-IN',
    greeting: 'வணக்கம்! நான் ORCA கடல்சார் புலனாய்வு முகவர். மீன்பிடித்தல், கடல் அலைகள், வானிலை அல்லது பாதுகாப்பு பற்றி கேட்கலாம்.',
    placeholder: 'மீன்பிடி மண்டலம், அலைகள் அல்லது வானிலை பற்றி கேட்கவும்...',
    sampleQueries: [
      'இன்று கடலுக்கு மீன்பிடிக்க செல்வது பாதுகாப்பானதா?',
      'அருகிலுள்ள மீன்பிடி மண்டலம் (PFZ) எங்குள்ளது?',
      'மாலையில் அலைகளின் சீற்றம் எப்படி இருக்கும்?'
    ],
    switchedMsg: 'வணக்கம்! ORCA இப்போது தமிழில் பேச தயாராக உள்ளது.'
  },
  GU: {
    code: 'GU',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    speechCode: 'gu-IN',
    greeting: 'નમસ્તે! હું ORCA મરીન એજન્ટ છું. માછીમારી, દરિયાઈ હવામાન, મોજાં અથવા સલામત માર્ગ વિશે કંઈપણ પૂછો.',
    placeholder: 'માછીમારી ઝોન, મોજાં અથવા હવામાન વિશે પૂછો...',
    sampleQueries: [
      'શું આજે દરિયામાં માછીમારી માટે જવું સલામત છે?',
      'સૌથી નજીકનો ફિશિંગ ઝોન ક્યાં છે?',
      'આજે પવન અને મોજાંની સ્થિતિ કેવી રહેશે?'
    ],
    switchedMsg: 'નમસ્તે! ORCA હવે ગુજરાતીમાં સંવાદ માટે તૈયાર છે.'
  },
  BN: {
    code: 'BN',
    name: 'Bengali',
    nativeName: 'বাংলা',
    speechCode: 'bn-IN',
    greeting: 'নমস্কার! আমি ORCA সামুদ্রিক সহায়ক। মাছ ধরার অঞ্চল, আবহাওয়া, ঢেউ বা সুরক্ষা সম্পর্কে আমাকে জিজ্ঞাসা করুন।',
    placeholder: 'মাছ ধরার অঞ্চল, ঢেউ বা আবহাওয়া সম্পর্কে জিজ্ঞাসা করুন...',
    sampleQueries: [
      'আজ কি সমুদ্রে মাছ ধরতে যাওয়া নিরাপদ?',
      'নিকটতম মাছ ধরার এলাকা (PFZ) কোথায়?',
      'বিকেলে ঢেউ এবং বাতাসের গতি কেমন থাকবে?'
    ],
    switchedMsg: 'নমস্কার! ORCA এখন বাংলায় কথা বলার জন্য প্রস্তুত।'
  },
  ML: {
    code: 'ML',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    speechCode: 'ml-IN',
    greeting: 'നമസ്കാരം! ഞാൻ ORCA സമുദ്ര ഇന്റലിജൻസ് ഏജന്റ് ആണ്. മത്സ്യബന്ധനം, കാലാവസ്ഥ, തിരമാലകൾ അല്ലെങ്കിൽ സുരക്ഷിത റൂട്ട് എന്നിവ ചോദിക്കാം.',
    placeholder: 'മത്സ്യബന്ധന മേഖല, കാലാവസ്ഥ അല്ലെങ്കിൽ സുരക്ഷ ചോദിക്കുക...',
    sampleQueries: [
      'ഇന്ന് കടലിൽ മത്സ്യബന്ധനത്തിന് പോകുന്നത് സുരക്ഷിതമാണോ?',
      'ഏറ്റവും അടുത്തുള്ള ഫിഷിംഗ് സോൺ എവിടെയാണ്?',
      'തിരമാലകളുടെ ഉയരം എത്രയായിരിക്കും?'
    ],
    switchedMsg: 'നമസ്കാരം! ORCA ഇപ്പോൾ മലയാളത്തിൽ സംസാരിക്കാൻ സജ്ജമാണ്.'
  },
  EN: {
    code: 'EN',
    name: 'English',
    nativeName: 'English',
    speechCode: 'en-IN',
    greeting: 'Hello! I am ORCA, your persistent Marine Intelligence Voice Agent. How can I assist with fishing zones, weather risks, or navigation routes?',
    placeholder: 'Ask about fishing zones, wave swells, or route safety...',
    sampleQueries: [
      'Is it safe to go fishing in Zone AS-03 today?',
      'Where is the nearest Potential Fishing Zone (PFZ)?',
      'What is the wave swell and weather forecast?'
    ],
    switchedMsg: 'Hello! ORCA is now speaking in English.'
  },
};

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  lang: SupportedLang;
  timestamp: string;
  agentTags?: string[];
}

export const PersistentVoiceAgent: React.FC = () => {
  const { language: globalLang, setLanguage: setGlobalLang } = useAppStore();

  const [isOpen, setIsOpen] = useState(false);
  const normalizedLang = (globalLang.toUpperCase() as SupportedLang);
  const selectedLang: SupportedLang = LANGUAGES[normalizedLang] ? normalizedLang : 'MR';

  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const setSelectedLang = (lang: SupportedLang) => {
    setGlobalLang(lang.toLowerCase());
  };

  // Load and cache browser speech synthesis voices
  useEffect(() => {
    const updateVoices = () => {
      if ('speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
      }
    };

    updateVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // Initialize greeting on first load or language switch
  useEffect(() => {
    setMessages([
      {
        id: `initial_greeting_${selectedLang}`,
        sender: 'agent',
        text: LANGUAGES[selectedLang].greeting,
        lang: selectedLang,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        agentTags: ['WeatherAgent', 'MarineAgent', 'SafetyAgent'],
      },
    ]);
  }, [selectedLang]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Find best matching voice for the target Indian language
  const getBestVoiceForLanguage = (langCode: SupportedLang): SpeechSynthesisVoice | null => {
    if (availableVoices.length === 0 && 'speechSynthesis' in window) {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0) setAvailableVoices(v);
    }

    const voices = availableVoices.length > 0 ? availableVoices : ('speechSynthesis' in window ? window.speechSynthesis.getVoices() : []);
    const targetSpeechCode = LANGUAGES[langCode].speechCode.toLowerCase(); // e.g. 'mr-in', 'te-in', 'ta-in'
    const langPrefix = LANGUAGES[langCode].speechCode.split('-')[0].toLowerCase(); // e.g. 'mr', 'te', 'ta'
    const langEnglishName = LANGUAGES[langCode].name.toLowerCase();

    // 1. Direct match on language code (e.g., 'mr-IN', 'hi-IN', 'te-IN')
    let matched = voices.find(
      (v) =>
        v.lang.toLowerCase() === targetSpeechCode ||
        v.lang.toLowerCase().replace('_', '-') === targetSpeechCode
    );
    if (matched) return matched;

    // 2. Match on prefix or name (e.g. 'mr', 'te', 'ta', 'Marathi', 'Telugu', 'Tamil')
    matched = voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith(langPrefix) ||
        v.name.toLowerCase().includes(langEnglishName) ||
        v.name.toLowerCase().includes(langPrefix)
    );
    if (matched) return matched;

    // 3. Match any Indian voice (e.g., 'hi-IN', 'en-IN', 'India')
    matched = voices.find(
      (v) =>
        v.lang.toLowerCase().includes('in') ||
        v.name.toLowerCase().includes('india') ||
        v.name.toLowerCase().includes('hindi')
    );
    if (matched) return matched;

    return voices[0] || null;
  };

  // Robust Text-To-Speech Synthesis
  const speakText = (text: string, langCode: SupportedLang) => {
    if (!audioEnabled || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // Stop prior playback

    const utterance = new SpeechSynthesisUtterance(text);
    const targetSpeechCode = LANGUAGES[langCode].speechCode;
    utterance.lang = targetSpeechCode;
    utterance.rate = 0.92; // Clear pacing for fishermen
    utterance.pitch = 1.0;

    const matchedVoice = getBestVoiceForLanguage(langCode);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e) => {
      console.warn('Speech synthesis error/interrupted:', e);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Switch language and speak audio confirmation in that exact language
  const handleSwitchLanguage = (lang: SupportedLang) => {
    setSelectedLang(lang);
    toast.success(`🌐 ORCA Language: ${LANGUAGES[lang].nativeName} (${LANGUAGES[lang].name})`);
    speakText(LANGUAGES[lang].switchedMsg, lang);
  };

  // Detect script or keywords to dynamically route language if user speaks in another tongue
  const detectLanguageFromInput = (text: string): SupportedLang => {
    if (/[\u0900-\u097F]/.test(text)) {
      if (text.includes('आहे') || text.includes('नाही') || text.includes('कशी') || text.includes('मासे') || text.includes('सांगा') || text.includes('लाटा') || text.includes('कुठे')) {
        return 'MR';
      }
      return 'HI';
    }
    if (/[\u0C00-\u0C7F]/.test(text)) return 'TE'; // Telugu
    if (/[\u0B80-\u0BFF]/.test(text)) return 'TA'; // Tamil
    if (/[\u0A80-\u0AFF]/.test(text)) return 'GU'; // Gujarati
    if (/[\u0980-\u09FF]/.test(text)) return 'BN'; // Bengali
    if (/[\u0D00-\u0D7F]/.test(text)) return 'ML'; // Malayalam

    // If typing in Roman script, keep selectedLang
    return selectedLang;
  };

  // Multi-lingual domain intelligence response generator
  const generateAgentResponse = (userQuery: string, lang: SupportedLang): string => {
    const q = userQuery.toLowerCase();

    const responses: Record<SupportedLang, { safe: string; wave: string; zone: string; general: string }> = {
      MR: {
        safe: "ऑर्का निर्णय: आज सकाळी समुद्रात मासेमारीसाठी परिस्थिती पूर्णपणे सुरक्षित आहे. AS-03 झोन (23 किमी पश्चिम) मध्ये मुबलक मासे आहेत. दुपारी 2 नंतर लाटा 2.8 मीटरपर्यंत वाढतील, म्हणून दुपारी 4:30 पूर्वी मिरकरवाडा बंदरात परत या.",
        wave: "लाटा आणि हवामान इशारा: सध्या लाटा 1.4 मीटर आहेत. दुपारी 2:00 नंतर वारे 38 किमी/ताशी वेगाने वाहतील आणि लाटा 2.8 मीटरपर्यंत उसळतील. कृपया खोल समुद्रात जास्त वेळ थांबू नका.",
        zone: "मासेमारी झोन: तुमच्यापासून सर्वात जवळचा संभाव्य मासेमारी झोन AS-03 (अंतर 23 किमी पश्चिम) आहे. येथे 82% अनुकूलता आणि मुबलक बांगडा मासे मिळण्याची शक्यता आहे.",
        general: "मी तुमच्या जहाजाची स्थिती (16.99° N, 73.31° E) ट्रॅक करत आहे. तुम्ही आंतरराष्ट्रीय सीमेपासून 48 किमी सुरक्षित अंतरावर आहात. हवामान आणि सुरक्षा एजंट सतत कार्यरत आहेत."
      },
      HI: {
        safe: "ओरका निर्णय: आज सुबह समुद्र में मछली पकड़ने के लिए मौसम पूरी तरह सुरक्षित है। AS-03 क्षेत्र (23 किमी पश्चिम) में प्रचुर मछली है। दोपहर 2 बजे के बाद लहरें बढ़ेंगी, इसलिए शाम 4:30 बजे से पहले मिरकरवाड़ा बंदरगाह लौटें।",
        wave: "लहर और मौसम चेतावनी: वर्तमान में लहरें 1.4 मीटर हैं। दोपहर 2:00 बजे के बाद हवाएं 38 किमी/घंटा और लहरें 2.8 मीटर तक उठेंगी। कृपया समय पर बंदरगाह लौटें।",
        zone: "मछली पकड़ने का क्षेत्र: निकटतम संभावित मछली क्षेत्र (PFZ) AS-03 है (23 किमी पश्चिम)। उपग्रह डेटा के अनुसार यहाँ 82% मछली अनुकूलता है।",
        general: "आपका पोत (16.99° N, 73.31° E) सुरक्षित भारतीय समुद्री क्षेत्र में है और अंतरराष्ट्रीय सीमा से 48 किमी दूर है। सभी AI एजंट सक्रिय हैं।"
      },
      TE: {
        safe: "ORCA నిర్ణయం: ఈ ఉదయం సముద్రం చేపల వేటకు పూర్తిగా సురక్షితంగా ఉంది. AS-03 జోన్ (23 కి.మీ పశ్చిమం) వద్ద అధిక చేపలు ఉన్నాయి. మధ్యాహ్నం 2 తర్వాత అలల తీవ్రత పెరుగుతుంది, కాబట్టి సాయంత్రం 4:30 లోపు ఓడరేవుకు తిరిగి రండి.",
        wave: "అలలు మరియు వాతావరణ హెచ్చరిక: ప్రస్తుతం అలల ఎత్తు 1.4 మీటర్లు. మధ్యాహ్నం 2 గంటల తర్వాత గాలి వేగం 38 కిమీ/గం మరియు అలలు 2.8 మీటర్లకు పెరుగుతాయి. సకాలంలో తీరానికి చేరండి.",
        zone: "చేపల జోన్: సమీపంలోని అనుకూలమైన ఫిషింగ్ జోన్ AS-03 (23 కి.మీ పశ్చిమం). ఇక్కడ 82% అధిక చేపల లభ్యత నమోదైంది.",
        general: "మీ నావ స్థానం (16.99° N, 73.31° E) అంతర్జాతీయ సరిహద్దుకు 48 కి.మీ దూరంలో సురక్షితంగా ఉంది. వాతావరణ మరియు భద్రతా ఏజెంట్లు పర్యవేక్షిస్తున్నారు."
      },
      TA: {
        safe: "ORCA முடிவு: இன்று காலை மீன்பிடிக்க கடல் மிகவும் பாதுகாப்பானது. AS-03 மண்டலத்தில் (23 கி.மீ மேற்கு) அதிக மீன்வளம் உள்ளது. மதியம் 2 மணிக்கு பிறகு அலைகள் உயரும் என்பதால் மாலை 4:30 மணிக்குள் துறைமுகத்திற்கு திரும்பவும்.",
        wave: "அலைகள் மற்றும் வானிலை எச்சரிக்கை: தற்போது அலைகள் 1.4 மீட்டர் உயரத்தில் உள்ளன. பிற்பகல் 2:00 மணிக்கு பிறகு காற்று 38 கிமீ வேகத்திலும், அலைகள் 2.8 மீட்டர் உயரத்திலும் எழக்கூடும்.",
        zone: "மீன்பிடி மண்டலம்: சிறந்த மீன்பிடி மண்டலம் AS-03 (23 கி.மீ மேற்கு). செயற்கைக்கோள் தரவின்படி இங்கு 82% மீன்பிடி சாதகமான சூழல் உள்ளது.",
        general: "உங்கள் படகு (16.99° N, 73.31° E) இந்திய கடல் எல்லைக்குள் 48 கி.மீ தொலைவில் பாதுகாப்பாக உள்ளது. எங்களின் அனைத்து AI முகவர்களும் கண்காணிப்பில் உள்ளனர்."
      },
      GU: {
        safe: "ORCA નિર્ણય: આજે સવારે માછીમારી માટે દરિયો એકદમ સલામત છે. AS-03 ઝોન (23 કિમી પશ્ચિમ) માં પુષ્કળ માછલીઓ છે. બપોરે 2 વાગ્યા પછી મોજાં વધશે, જેથી સાંજે 4:30 પહેલાં મીરકરવાડા બંદરે પાછા ફરો.",
        wave: "મોજાં અને હવામાન ચેતવણી: હાલમાં મોજાં 1.4 મીટર છે. બપોરે 2:00 પછી પવન 38 કિમી/કલાક અને મોજાં 2.8 મીટર સુધી પહોંચશે. સમયસર પાછા આવો.",
        zone: "માછીમારી ક્ષેત્ર: સૌથી નજીકનો માછીમારી ઝોન AS-03 છે (23 કિમી પશ્ચિમ). સેટેલાઇટ રિપોર્ટ મુજબ અહીં 82% અનુકૂળતા છે.",
        general: "તમારું વહાણ (16.99° N, 73.31° E) આંતરરાષ્ટ્રીય સીમાથી 48 કિમી સુરક્ષિત છે. તમામ મરીન એજન્ટ્સ કાર્યરત છે."
      },
      BN: {
        safe: "ORCA সিদ্ধান্ত: আজ সকালে সমুদ্রে মাছ ধরার অবস্থা সম্পূর্ণ নিরাপদ। AS-03 জোনে (২৩ কিমি পশ্চিম) প্রচুর মাছ পাওয়া যাবে। দুপুর ২টার পর ঢেউ বাড়বে, তাই বিকেল ৪:৩০ এর মধ্যে বন্দরে ফিরুন।",
        wave: "ঢেউ ও আবহাওয়ার সতর্কতা: বর্তমানে ঢেউ ১.৪ মিটার। দুপুর ২টার পর বাতাসের গতি ৩৮ কিমি/ঘণ্টা এবং ঢেউ ২.৮ মিটার পর্যন্ত বাড়তে পারে।",
        zone: "মাছ ধরার অঞ্চল: নিকটতম মাছ ধরার এলাকা AS-03 (২৩ কিমি পশ্চিম)। স্যাটেলাইট অনুযায়ী এখানে ৮২% মাছ পাওয়ার সম্ভাবনা রয়েছে।",
        general: "আপনার নৌকা (16.99° N, 73.31° E) আন্তর্জাতিক জলসীমা থেকে ৪৮ কিমি নিরাপদে রয়েছে। সব সুরক্ষা এজেন্ট সতর্ক রয়েছে।"
      },
      ML: {
        safe: "ORCA തീരുമാനം: ഇന്ന് രാവിലെ കടലിൽ മത്സ്യബന്ധനത്തിന് പൂർണ്ണമായും സുരക്ഷിതമാണ്. AS-03 സോണിൽ (23 കി.മീ പടിഞ്ഞാറ്) ധാരാളം മത്സ്യങ്ങളുണ്ട്. ഉച്ചയ്ക്ക് 2 ന് ശേഷം തിരമാലകൾ ഉയരുമെന്നതിനാൽ വൈകുന്നേരം 4:30 ന് മുൻപായി തുറമുഖത്ത് തിരിച്ചെത്തുക.",
        wave: "തിരമാലയും കാലാവസ്ഥാ മുന്നറിയിപ്പും: നിലവിൽ തിരമാലകൾ 1.4 മീറ്ററാണ്. ഉച്ചയ്ക്ക് 2:00 ന് ശേഷം കാറ്റിന്റെ വേഗത 38 കി.മീ/മണിക്കൂറും തിരമാലകൾ 2.8 മീറ്ററായും ഉയരും.",
        zone: "ഫിഷിംഗ് സോൺ: ഏറ്റവും അടുത്തുള്ള അനുകൂല മേഖല AS-03 ആണ് (23 കി.മീ പടിഞ്ഞാറ്). സാറ്റലൈറ്റ് ഡാറ്റ പ്രകാരം ഇവിടെ 82% മത്സ്യ ലഭ്യതയുണ്ട്.",
        general: "നിങ്ങളുടെ ബോട്ട് (16.99° N, 73.31° E) അന്താരാഷ്ട്ര അതിർത്തിയിൽ നിന്ന് 48 കി.മീ സുരക്ഷിതമാണ്. എല്ലാ ഏജന്റുകളും നിരീക്ഷണം തുടരുന്നു."
      },
      EN: {
        safe: "ORCA Decision: Conditions are SAFE for fishing operations this morning. Recommended Zone is AS-03 (23 km West) with high pelagic fish density. Afternoon swells rise to 2.8m past 14:00 hrs, ensure return to Mirkarwada Port before 16:30 hrs.",
        wave: "Wave Swell & Weather Alert: Currently swells are 1.4m. Past 14:00 hrs wind speeds will reach 38 km/h and wave heights will rise to 2.8m SW. Please haul lines before 15:30 hrs.",
        zone: "Potential Fishing Zone: Nearest target is PFZ Zone AS-03 (23 km West). Satellite SST (28.4°C) and chlorophyll profiles indicate 82% suitability for mackerel aggregation.",
        general: "Your vessel (16.99° N, 73.31° E) is in safe territorial waters, 48 km clear of the International Boundary. All domain agents are active."
      }
    };

    const targetPack = responses[lang] || responses.MR;

    if (q.includes('wave') || q.includes('swell') || q.includes('danger') || q.includes('हवा') || q.includes('लाटा') || q.includes('तोफान') || q.includes('अलाइगल') || q.includes('అలలు') || q.includes('మోజా') || q.includes('ঢেউ') || q.includes('തിരമാല')) {
      return targetPack.wave;
    }
    if (q.includes('zone') || q.includes('fish') || q.includes('मच्छी') || q.includes('मासे') || q.includes('చేపలు') || q.includes('மீன்') || q.includes('માછલી') || q.includes('মাছ') || q.includes('മത്സ്യം') || q.includes('pfz')) {
      return targetPack.zone;
    }

    return targetPack.safe;
  };

  // Handle Query Execution
  const handleProcessQuery = (queryText: string) => {
    if (!queryText.trim()) return;

    const detectedLang = detectLanguageFromInput(queryText);
    const activeLang = detectedLang !== 'EN' && selectedLang === 'EN' ? detectedLang : selectedLang;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: queryText,
      lang: activeLang,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // Background multi-agent reasoning delay
    setTimeout(() => {
      const responseText = generateAgentResponse(queryText, activeLang);
      const agentMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: responseText,
        lang: activeLang,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        agentTags: ['WeatherAgent', 'MarineAgent', 'SafetyAgent'],
      };

      setMessages((prev) => [...prev, agentMessage]);
      speakText(responseText, activeLang);
    }, 450);
  };

  // Speech Recognition with specific selected dialect
  const toggleSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error('Voice input not supported in this browser. Please type or use Chrome/Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = LANGUAGES[selectedLang].speechCode; // Explicit dialect code (mr-IN, te-IN, ta-IN, hi-IN etc.)
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        toast.info(`🎙️ Listening in ${LANGUAGES[selectedLang].nativeName}... Please speak now!`);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        if (transcript) {
          setIsOpen(true);
          handleProcessQuery(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error !== 'no-speech') {
          toast.error(`Mic status: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      setIsListening(false);
      console.error(err);
    }
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. FIXED FLOATING VOICE DOCK & MIC BUTTON (FIXED ACROSS ALL PAGES)        */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Floating Callout Teaser Badge */}
        <div 
          onClick={toggleSpeechRecognition}
          className="hidden md:flex items-center gap-2 bg-slate-900/90 hover:bg-slate-900 text-white border border-cyan-400/40 rounded-full px-3.5 py-1.5 shadow-xl cursor-pointer backdrop-blur-md transition-all hover:scale-105 group"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isListening ? 'bg-red-400' : 'bg-cyan-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isListening ? 'bg-red-500' : 'bg-cyan-400'}`}></span>
          </span>
          <span className="text-xs font-bold tracking-wide bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 bg-clip-text text-transparent">
            {isListening ? 'ORCA Listening...' : '🎙️ Talk to ORCA AI'}
          </span>
        </div>

        {/* Floating Language Pill */}
        <div className="flex items-center gap-1.5 bg-white/95 border border-slate-200 shadow-lg rounded-full px-3 py-1.5 backdrop-blur-md">
          <Globe className="w-3.5 h-3.5 text-blue-600" />
          <select
            value={selectedLang}
            onChange={(e) => handleSwitchLanguage(e.target.value as SupportedLang)}
            className="bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer pr-1"
          >
            {Object.values(LANGUAGES).map((l) => (
              <option key={l.code} value={l.code} className="bg-[#11111A] text-soft-white">
                {l.nativeName} ({l.name})
              </option>
            ))}
          </select>
        </div>

        {/* 1-Tap Mic Voice Trigger Button with Gemini-Style Ocean Aura Lights */}
        <div className="relative group flex items-center justify-center p-2">
          {/* Layer 1: Deep Diffuse Revolving Gradient Back-Glow */}
          <div 
            className={`absolute -inset-4 rounded-full blur-xl opacity-90 transition-all duration-700 ${
              isListening
                ? 'bg-[conic-gradient(from_0deg,#EF4444,#F59E0B,#06B6D4,#EF4444)] animate-aura-rotate-fast scale-125'
                : isSpeaking
                ? 'bg-[conic-gradient(from_0deg,#2563EB,#10B981,#00F2FE,#2563EB)] animate-aura-rotate-fast scale-110'
                : 'bg-[conic-gradient(from_0deg,#00F2FE,#2563EB,#7C3AED,#10B981,#00F2FE)] animate-aura-rotate group-hover:scale-125'
            }`}
          />

          {/* Layer 2: Secondary Concentric Pulsing Light Halo */}
          <div 
            className={`absolute -inset-2 rounded-full blur-md opacity-80 transition-all ${
              isListening
                ? 'bg-red-500 animate-ping'
                : 'bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 animate-aura-pulse'
            }`}
          />

          {/* Layer 3: Gemini-style Orbiting Bioluminescent Particles */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-300 blur-[1px] shadow-[0_0_8px_#00F2FE] absolute animate-orbit-1" />
            <span className="w-2 h-2 rounded-full bg-indigo-400 blur-[1px] shadow-[0_0_8px_#8B5CF6] absolute animate-orbit-2" />
            <span className="w-2 h-2 rounded-full bg-emerald-300 blur-[1px] shadow-[0_0_8px_#10B981] absolute animate-orbit-3" />
          </div>

          {/* Core Mic Button */}
          <button
            onClick={toggleSpeechRecognition}
            className={`relative z-10 p-4 rounded-full font-bold shadow-2xl transition-all duration-300 flex items-center justify-center border-2 ${
              isListening
                ? 'bg-slate-900 text-red-400 border-red-500 scale-110 shadow-red-500/80'
                : isSpeaking
                ? 'bg-slate-900 text-cyan-300 border-cyan-400 scale-105 shadow-cyan-500/80'
                : 'bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white border-cyan-300/80 hover:border-cyan-200 hover:scale-110 shadow-cyan-500/50'
            }`}
            title={`Click to speak with ORCA AI Voice in ${LANGUAGES[selectedLang].nativeName}`}
          >
            {isListening ? (
              <Radio className="w-6 h-6 animate-spin text-red-400" />
            ) : (
              <Mic className={`w-6 h-6 transition-all ${isSpeaking ? 'animate-bounce text-cyan-300' : 'fill-cyan-300 text-cyan-300'}`} />
            )}

            {isListening && (
              <span className="absolute -inset-2.5 rounded-full border-2 border-red-400 animate-ping opacity-90" />
            )}
          </button>
        </div>

        {/* Floating Conversational Window Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3.5 bg-white hover:bg-blue-50 border border-slate-200 rounded-full text-slate-700 shadow-lg hover:scale-105 transition-all flex items-center justify-center relative"
          title="Open ORCA Conversational Assistant"
        >
          <Bot className="w-5 h-5 text-blue-600" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 border-2 border-white rounded-full animate-ping" />
        </button>
      </div>


      {/* ========================================================================= */}
      {/* 2. EXPANDABLE FLOATING CONVERSATIONAL ASSISTANT WINDOW                    */}
      {/* ========================================================================= */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[94vw] sm:w-[450px] max-h-[82vh] h-[600px] bg-white border-2 border-blue-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden fade-in text-slate-900">
          {/* Header */}
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center">
                <Bot className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-slate-900 tracking-wide">ORCA Voice Assistant</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono">
                  Speaking in: <strong className="text-blue-600">{LANGUAGES[selectedLang].nativeName}</strong>
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  if (isSpeaking) window.speechSynthesis.cancel();
                  setAudioEnabled(!audioEnabled);
                }}
                className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                title={audioEnabled ? 'Mute Voice Audio' : 'Unmute Voice Audio'}
              >
                {audioEnabled ? (
                  <Volume2 className="w-4 h-4 text-blue-600" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-400" />
                )}
              </button>

              <button
                onClick={() => {
                  if (isSpeaking) window.speechSynthesis.cancel();
                  setIsOpen(false);
                }}
                className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 8-Language Selector Chips Bar */}
          <div className="px-4 py-2 bg-slate-100/70 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {Object.values(LANGUAGES).map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSwitchLanguage(lang.code)}
                className={`px-3 py-1 rounded-full font-bold shrink-0 transition-all text-xs flex items-center gap-1 ${
                  selectedLang === lang.code
                    ? 'bg-blue-600 text-white shadow-sm scale-105'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {selectedLang === lang.code && <Check className="w-3 h-3 text-white stroke-[3]" />}
                {lang.nativeName}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-sm shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-900 rounded-tl-sm shadow-sm'
                  }`}
                >
                  {msg.sender === 'agent' && (
                    <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-100">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 uppercase tracking-wider font-mono">
                        <Sparkles className="w-3 h-3 text-blue-600" /> ORCA REASONING ({LANGUAGES[msg.lang].nativeName})
                      </div>
                      <button
                        onClick={() => speakText(msg.text, msg.lang)}
                        className="text-slate-400 hover:text-blue-600 transition-colors p-0.5"
                        title="Replay Spoken Audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <p>{msg.text}</p>

                  {msg.agentTags && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2 border-t border-slate-100">
                      {msg.agentTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-slate-100 text-[9px] font-mono text-slate-600 border border-slate-200"
                        >
                          ✓ {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[9px] font-mono text-slate-400 px-2 mt-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Clickable Sample Questions in Active Language */}
          <div className="px-3 py-2 bg-slate-100 border-t border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {LANGUAGES[selectedLang].sampleQueries.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => handleProcessQuery(sample)}
                className="text-[11px] text-slate-600 hover:text-blue-700 bg-white hover:bg-blue-50 px-2.5 py-1 rounded-xl shrink-0 transition-colors border border-slate-200 font-medium"
              >
                💬 {sample}
              </button>
            ))}
          </div>

          {/* Input & Voice Trigger Bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <button
              onClick={toggleSpeechRecognition}
              className={`p-2.5 rounded-xl transition-all shrink-0 ${
                isListening
                  ? 'bg-red-600 text-white animate-pulse shadow-md shadow-red-500/50'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200'
              }`}
              title={`Speak in ${LANGUAGES[selectedLang].nativeName}`}
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleProcessQuery(inputText)}
              placeholder={LANGUAGES[selectedLang].placeholder}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />

            <button
              onClick={() => handleProcessQuery(inputText)}
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold disabled:opacity-40 disabled:hover:bg-blue-600 transition-all shrink-0 shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
