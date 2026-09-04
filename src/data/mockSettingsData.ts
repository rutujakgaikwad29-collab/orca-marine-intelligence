export interface VesselProfile {
  fishermanName: string;
  boatId: string;
  boatName: string;
  boatType: string;
  engineType: string;
  engineHp: number;
  fuelCapacity: number;
  currentFuel: number;
  maxOperatingRange: number;
  homePort: string;
  keelDraft: number;
  crewCount: number;
}

export interface AlertPreferences {
  cycloneAlerts: boolean;
  waveAlerts: boolean;
  lightningAlerts: boolean;
  restrictedZoneAlerts: boolean;
  fishZoneAlerts: boolean;
  lowFuelAlerts: boolean;
}

export interface AlertDeliveryModes {
  soundSiren: boolean;
  vibration: boolean;
  pushNotification: boolean;
  voiceAlert: boolean;
}

export type IndianLanguage = 'en' | 'mr' | 'hi' | 'ta' | 'te' | 'ml' | 'kn';

export interface LanguageOption {
  code: IndianLanguage;
  name: string;
  nativeName: string;
  region: string;
  sampleVoiceText: string;
}

export const indianLanguages: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    region: 'Maritime Standard / All Ports',
    sampleVoiceText: 'Warning. High wave swell detected ahead. Please alter course to safe harbour.',
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    region: 'Maharashtra (Ratnagiri, Sindhudurg, Mumbai)',
    sampleVoiceText: 'सावधान. पुढे समुद्रात उंच लाटा आहेत. कृपया ताबडतोब सुरक्षित बंदराकडे वळा.',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिंदी',
    region: 'National Coast Guard Standard',
    sampleVoiceText: 'चेतावनी. आगे समुद्र में ऊंची लहरें और चक्रवात का खतरा है. कृपया सुरक्षित मार्ग चुनें.',
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    region: 'Tamil Nadu & Puducherry',
    sampleVoiceText: 'எச்சரிக்கை. கடல் அலைகள் அதிகமாக உள்ளன. உடனடியாக பாதுகாப்பான துறைமுகத்திற்கு செல்லவும்.',
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    region: 'Andhra Pradesh (Visakhapatnam, Kakinada)',
    sampleVoiceText: 'హెచ్చరిక. సముద్రంలో భారీ అలలు ఉన్నాయి. దయచేసి వెంటనే సురక్షిత తీరానికి వెళ్ళండి.',
  },
  {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    region: 'Kerala (Kochi, Kollam, Beypore)',
    sampleVoiceText: 'മുന്നറിയിപ്പ്. കടലിൽ ഉയർന്ന തിരമാലകൾ ഉണ്ട്. സുരക്ഷിത താവളത്തിലേക്ക് നീങ്ങുക.',
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    region: 'Karnataka (Mangaluru, Karwar, Malpe)',
    sampleVoiceText: 'ಎಚ್ಚರಿಕೆ. ಸಮುದ್ರದಲ್ಲಿ ಭಾರಿ ಅಲೆಗಳು ಇವೆ. ದಯವಿಟ್ಟು ತಕ್ಷಣ ಸುರಕ್ಷಿತ ಬಂದರಿಗೆ ಹಿಂತಿರುಗಿ.',
  },
];

export const defaultVesselProfile: VesselProfile = {
  fishermanName: 'Ramesh Patil (Master Skipper)',
  boatId: 'IND-MH-RTN-4190',
  boatName: 'Sea Queen VII (सागर राणी)',
  boatType: 'Mechanized Pelagic Gillnetter',
  engineType: 'Inboard Ashok Leyland Marine Diesel (AL-680)',
  engineHp: 120,
  fuelCapacity: 650,
  currentFuel: 468,
  maxOperatingRange: 45,
  homePort: 'Mirkarwada Fishing Port, Ratnagiri',
  keelDraft: 1.4,
  crewCount: 6,
};

export const defaultAlertPreferences: AlertPreferences = {
  cycloneAlerts: true,
  waveAlerts: true,
  lightningAlerts: true,
  restrictedZoneAlerts: true,
  fishZoneAlerts: true,
  lowFuelAlerts: true,
};

export const defaultAlertDeliveryModes: AlertDeliveryModes = {
  soundSiren: true,
  vibration: true,
  pushNotification: true,
  voiceAlert: true,
};

export type RouteStrategy = 'smart' | 'safety' | 'speed' | 'fuel' | 'catch';

export const routeStrategies = [
  {
    id: 'smart' as RouteStrategy,
    title: 'ORCA Smart Mode ⭐',
    badge: 'AI RECOMMENDED',
    color: 'text-bio-mint border-bio-mint bg-bio-mint/10',
    desc: 'Autonomous multi-objective Pareto solver balancing Safety + Time + Fuel Conservation + Catch Probability.',
  },
  {
    id: 'safety' as RouteStrategy,
    title: '🛡️ Safety-First Mode',
    badge: 'MAX PROTECTION',
    color: 'text-coral-red border-coral-red/40 bg-coral-red/10',
    desc: 'Strictly avoids all swells >2.0m and keeps maximum standoff from restricted boundaries.',
  },
  {
    id: 'fuel' as RouteStrategy,
    title: '⛽ Fuel Conservation Mode',
    badge: 'MAX ECONOMY',
    color: 'text-electric-lavender border-electric-lavender/40 bg-electric-lavender/10',
    desc: 'Maximizes ocean current drift alignment and limits throttle to optimal hydrodynamic displacement RPM.',
  },
  {
    id: 'speed' as RouteStrategy,
    title: '⚡ Express / Fast Mode',
    badge: 'MINIMAL TIME',
    color: 'text-solar-amber border-solar-amber/40 bg-solar-amber/10',
    desc: 'Selects the shortest navigable direct distance line for urgent transits.',
  },
  {
    id: 'catch' as RouteStrategy,
    title: '🐟 Maximum Catch / PFZ Mode',
    badge: 'MAX PRODUCTIVITY',
    color: 'text-bio-mint border-bio-mint/40 bg-bio-mint/10',
    desc: 'Prioritizes routes intersecting highest chlorophyll density and thermal front boundaries.',
  },
];
