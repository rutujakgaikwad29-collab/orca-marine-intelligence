type Translations = Record<string, Record<string, string>>;

export const translations: Translations = {
  // Sidebar & Navigation
  'Dashboard': {
    en: 'Dashboard',
    mr: 'डॅशबोर्ड',
    hi: 'डैशबोर्ड',
  },
  'Ask ORCA': {
    en: 'Ask ORCA',
    mr: 'ORCA ला विचारा',
    hi: 'ORCA से पूछें',
  },
  'Live Marine Map': {
    en: 'Live Marine Map',
    mr: 'थेट सागरी नकाशा',
    hi: 'लाइव समुद्री मानचित्र',
  },
  'Fishing Intelligence': {
    en: 'Fishing Intelligence',
    mr: 'मासेमारी बुद्धिमत्ता',
    hi: 'मत्स्य पालन बुद्धिमत्ता',
  },
  'Weather & Ocean': {
    en: 'Weather & Ocean',
    mr: 'हवामान आणि महासागर',
    hi: 'मौसम और महासागर',
  },
  'Safety Center': {
    en: 'Safety Center',
    mr: 'सुरक्षा केंद्र',
    hi: 'सुरक्षा केंद्र',
  },
  'Route Planner': {
    en: 'Route Planner',
    mr: 'मार्ग नियोजक',
    hi: 'मार्ग योजनाकार',
  },
  'Agent Monitor': {
    en: 'Agent Monitor',
    mr: 'एजंट मॉनिटर',
    hi: 'एजेंट मॉनिटर',
  },
  'Alerts': {
    en: 'Alerts',
    mr: 'सतर्कता (Alerts)',
    hi: 'अलर्ट',
  },
  'Data Sources': {
    en: 'Data Sources',
    mr: 'डेटा स्रोत',
    hi: 'डेटा स्रोत',
  },
  'Settings': {
    en: 'Settings',
    mr: 'सेटिंग्ज',
    hi: 'सेटिंग्स',
  },
  'Marine Intelligence Platform': {
    en: 'Marine Intelligence Platform',
    mr: 'सागरी बुद्धिमत्ता प्लॅटफॉर्म',
    hi: 'समुद्री खुफिया मंच',
  },
  'System Status': {
    en: 'System Status',
    mr: 'सिस्टम स्थिती',
    hi: 'सिस्टम स्थिति',
  },
  'ONLINE': {
    en: 'ONLINE',
    mr: 'ऑनलाइन',
    hi: 'ऑनलाइन',
  },
  'Data Sync': {
    en: 'Data Sync',
    mr: 'डेटा सिंक',
    hi: 'डेटा सिंक',
  },
  'Live Demo Mode': {
    en: 'Live Demo Mode',
    mr: 'थेट डेमो मोड',
    hi: 'लाइव डेमो मोड',
  },
  
  // Dashboard Hero
  'System Active': {
    en: 'System Active',
    mr: 'सिस्टम सक्रिय आहे',
    hi: 'सिस्टम सक्रिय है',
  },
  'Good Morning, Captain': {
    en: 'Good Morning, Captain',
    mr: 'शुभ प्रभात, कॅप्टन',
    hi: 'सुप्रभात, कप्तान',
  },
  'Your intelligent marine summary is ready. Analyzing IoT vessel telemetry and ISRO satellite data.': {
    en: 'Your intelligent marine summary is ready. Analyzing IoT vessel telemetry and ISRO satellite data.',
    mr: 'तुमचा सागरी सारांश तयार आहे. आयओटी (IoT) आणि इस्रो (ISRO) सॅटेलाइट डेटाचे विश्लेषण करत आहे.',
    hi: 'आपका समुद्री सारांश तैयार है। IoT और ISRO उपग्रह डेटा का विश्लेषण कर रहा है।',
  },
  
  // Ask ORCA
  'GPT-4 Marine Model': {
    en: 'GPT-4 Marine Model',
    mr: 'GPT-4 मरीन मॉडेल',
    hi: 'GPT-4 मरीन मॉडल',
  },
  'Ask about fishing zones, weather safety, or optimized routes...': {
    en: 'Ask about fishing zones, weather safety, or optimized routes...',
    mr: 'मासेमारी क्षेत्र, हवामान सुरक्षा किंवा मार्गांबद्दल विचारा...',
    hi: 'मछली पकड़ने के क्षेत्र, मौसम सुरक्षा या मार्गों के बारे में पूछें...',
  },
  'ORCA MULTI-AGENT REASONING': {
    en: 'ORCA MULTI-AGENT REASONING',
    mr: 'ORCA मल्टी-एजंट रिझनिंग',
    hi: 'ORCA मल्टी-एजेंट रीजनिंग',
  },
  
  // Status Cards
  'Marine Risk': {
    en: 'Marine Risk',
    mr: 'सागरी धोका',
    hi: 'समुद्री जोखिम',
  },
  'Fishing Suitability': {
    en: 'Fishing Suitability',
    mr: 'मासेमारी अनुकूलता',
    hi: 'मछली पकड़ने की उपयुक्तता',
  },
  'Weather': {
    en: 'Weather',
    mr: 'हवामान',
    hi: 'मौसम',
  },
  'Wave Height': {
    en: 'Wave Height',
    mr: 'लाटेची उंची',
    hi: 'लहर की ऊंचाई',
  },
  'Vessel Status': {
    en: 'Vessel Status',
    mr: 'जहाजाची स्थिती',
    hi: 'पोत की स्थिति',
  },
  'Data Confidence': {
    en: 'Data Confidence',
    mr: 'डेटा विश्वास',
    hi: 'डेटा विश्वास',
  }
};

export const t = (key: string, lang: string): string => {
  if (!translations[key]) return key;
  return translations[key][lang] || translations[key]['en'] || key;
};
