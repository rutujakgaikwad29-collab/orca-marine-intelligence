import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import {
  Fish,
  Waves,
  ShieldCheck,
  Compass,
  Volume2,
  VolumeX,
  AlertTriangle,
  PhoneCall,
  MapPin,
  Anchor,
  Clock,
  Navigation,
  MessageSquare,
  AlertOctagon,
  Globe,
  Sparkles,
  Wind,
  X,
  ShieldAlert,
  CheckCircle2,
  BellRing
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { useAppStore } from '../store/useAppStore';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { toast } from 'sonner';

// Custom vessel & zone icons for the map
const boatIcon = new L.DivIcon({
  className: 'custom-boat-marker',
  html: `<div style="background:#2563eb; width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 10px rgba(37,99,235,0.5); border:2px solid white; font-size:18px;">⛵</div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

const harborIcon = new L.DivIcon({
  className: 'custom-harbor-marker',
  html: `<div style="background:#7c3aed; width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 10px rgba(124,58,237,0.5); border:2px solid white; font-size:16px;">⚓</div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

// Comprehensive Translations Dictionary for 8 Coastal Languages
interface DashboardContent {
  skipperTitle: string;
  activeVoyage: string;
  homePortLabel: string;
  homePortName: string;
  voiceLangLabel: string;
  safeBadge: string;
  aiVerified: string;
  mainHeadline: string;
  returnWindowLabel: string;
  returnWindowDesc: string;
  listenAudioBtn: string;
  stopAudioBtn: string;
  speakOrcaBtn: string;
  fishProbTitle: string;
  fishProbValue: string;
  fishProbZone: string;
  fishSpecies: string;
  waveTitle: string;
  waveValue: string;
  waveDesc: string;
  portDistanceTitle: string;
  portDistanceValue: string;
  portDistanceDesc: string;
  alertsSectionTitle: string;
  roughnessAlertTitle: string;
  roughnessAlertDesc: string;
  borderAlertTitle: string;
  borderAlertDesc: string;
  mapTitle: string;
  sosBtnText: string;
  sosActiveText: string;
  sosSubtext: string;
  sosActiveSubtext: string;
  helplineLabel: string;
  routeNavBtn: string;
  audioAdvisory: string;
  speechCode: string;
  quickQuestionsTitle: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;

  // Emergency Alert Screen Popup & Action System
  alertModalTitle: string;
  alertModalSeverity: string;
  alertModalDesc: string;
  alertVoiceWarning: string;
  whatToDoTitle: string;
  whatToDoSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  simulateAlertBtn: string;
  dismissAlertBtn: string;
}

const DASHBOARD_TRANSLATIONS: Record<string, DashboardContent> = {
  mr: {
    skipperTitle: 'कप्तान रमेश पाटील',
    activeVoyage: 'सक्रिय जलप्रवास (Sea Queen VII)',
    homePortLabel: 'गृह बंदर',
    homePortName: 'मिरकरवाडा बंदर, रत्नागिरी',
    voiceLangLabel: 'मराठी',
    safeBadge: '🟢 आज मासेमारीसाठी जाणे सुरक्षित आहे',
    aiVerified: 'ISRO आणि INCOIS उपग्रहांद्वारे पडताळणी पूर्ण',
    mainHeadline: 'झोन AS-03 (23 किमी पश्चिम) मध्ये मुबलक मासे मिळण्याची शक्यता.',
    returnWindowLabel: 'परतीची वेळ: दुपारी 16:30 पूर्वी बंदरात परत या',
    returnWindowDesc: 'सकाळी समुद्र शांत आहे. दुपारनंतर लाटांची उंची 2.8 मीटरपर्यंत वाढेल, वारे 38 किमी/ताशी वाहतील.',
    listenAudioBtn: '🔊 सुरक्षा सल्ला ऐका (ऑडिओ)',
    stopAudioBtn: 'ऑडिओ थांबवा',
    speakOrcaBtn: 'ORCA सहायकाशी बोला',
    fishProbTitle: 'मासे मिळण्याचे ठिकाण (PFZ)',
    fishProbValue: 'झोन AS-03 • 23 किमी',
    fishProbZone: '82% मुबलक मासे • खोली: 32 मी',
    fishSpecies: 'प्रमुख मासे: बांगडा, सुरमई व तारली',
    waveTitle: 'समुद्रातील लाटांची स्थिती',
    waveValue: '1.4 मी शांत लाटा',
    waveDesc: 'दुपारी 14:00 नंतर 2.8 मी वाढतील',
    portDistanceTitle: 'बंदराचे अंतर व परतीचा वेळ',
    portDistanceValue: '14.2 किमी • 45 मिनिटे',
    portDistanceDesc: 'मिरकरवाडा बंदर (16:30 पूर्वी पोहोचा)',
    alertsSectionTitle: 'तुमच्या मार्गासाठी महत्त्वाच्या थेट सूचना',
    roughnessAlertTitle: 'दुपारनंतर समुद्र खवळण्याचा इशारा',
    roughnessAlertDesc: 'दुपारी 14:00 वाजेपर्यंत वारे 38 किमी/ताशी वेगाने वाहतील. 15:30 पूर्वी मासेमारी जाळी आवरा.',
    borderAlertTitle: 'आंतरराष्ट्रीय सागरी सीमा (IMBL): पूर्ण सुरक्षित',
    borderAlertDesc: 'तुम्ही आंतरराष्ट्रीय सागरी सीमेपासून 48 किमी सुरक्षित अंतरावर आहात. कोणताही धोका नाही.',
    mapTitle: 'थेट GPS बोट व मासेमारी झोन रडार',
    sosBtnText: '🚨 आणीबाणी SOS',
    sosActiveText: '🚨 SOS सक्रिय - रद्द करा',
    sosSubtext: 'तटरक्षक दलास 1-टॅप आणीबाणी संदेश',
    sosActiveSubtext: 'प्रसारण रद्द करण्यासाठी टॅप करा',
    helplineLabel: 'तटरक्षक दल थेट हेल्पलाइन',
    routeNavBtn: 'संपूर्ण GPS सुरक्षित मार्ग उघडा',
    audioAdvisory: 'ऑर्का सुरक्षा सल्ला: आज मासेमारीसाठी परिस्थिती सुरक्षित आहे. शिफारस केलेले क्षेत्र AS-03, 23 किलोमीटर पश्चिमेस आहे, जिथे बांगडा व सुरमई मुबलक प्रमाणात मिळतील. महत्त्वाची सूचना: दुपारनंतर समुद्राच्या लाटा 2.8 मीटरपर्यंत वाढतील, त्यामुळे दुपारी 4:30 पूर्वी मिरकरवाडा बंदरात परत या.',
    speechCode: 'mr-IN',
    quickQuestionsTitle: 'मासेमारांसाठी जलद प्रश्न (1-टॅप विचारा)',
    q1: 'झोन AS-03 मध्ये कोणते मासे आहेत?',
    q2: 'दुपारी समुद्रात लाटा किती वाढतील?',
    q3: 'बंदरात परतण्यासाठी सुरक्षित मार्ग कोणता?',
    q4: 'रत्नागिरी किनाऱ्यावर चक्रीवादळाचा धोका आहे का?',

    alertModalTitle: '⚠️ तीव्र समुद्र खवळणे व उच्च लाटांचा थेट इशारा!',
    alertModalSeverity: 'अति-महत्त्वाचा सुरक्षा इशारा (HIGH PRIORITY)',
    alertModalDesc: 'दुपारी 14:00 नंतर समुद्रात 2.8 मीटर उंच लाटा व 38 किमी/तास वेगाने वारे वाहणार आहेत. खालील कृती लगेच करा.',
    alertVoiceWarning: 'सावधान! समुद्रात लाटांची उंची २.८ मीटरपर्यंत वाढत आहे. कृपया ताबडतोब जाळी वर ओढा आणि बोट मार्ग D ने मिरकरवाडा बंदराकडे वळवा!',
    whatToDoTitle: '👨🏽‍✈️ आता काय करावे? (तातडीच्या कृती पायऱ्या)',
    whatToDoSubtitle: 'खालील 4 पायऱ्यांचे तंतोतंत पालन करा',
    step1Title: 'पायरी 1: मासेमारी जाळी लगेच वर ओढा',
    step1Desc: 'सर्व जाळी व गळ तात्काळ बोटीवर घ्या, जेणेकरून बोट सुरक्षितपणे वळवता येईल.',
    step2Title: 'पायरी 2: होकायंत्र 115° पूर्वेला वळवा',
    step2Desc: 'आपल्या बोटीची दिशा 115° पूर्व (मिरकरवाडा बंदर) कडे निश्चित करा.',
    step3Title: 'पायरी 3: सुरक्षित मार्ग D वरून वेगाने निघा',
    step3Desc: 'किनाऱ्यालगतच्या सुरक्षित मार्गावरून 8.5 नॉट वेगाने प्रवास सुरू करा (वेळ: 45 मिनिटे).',
    step4Title: 'पायरी 4: VHF चॅनल 16 वर संपर्कात राहा',
    step4Desc: 'तटरक्षक दल व शेजारील बोटींशी VHF चॅनल 16 किंवा 1554 हेल्पलाइनवर संपर्क ठेवा.',
    simulateAlertBtn: '⚠️ आपत्कालीन इशारा तपासा (Test Live Alert)',
    dismissAlertBtn: 'माहिती समजली, बंद करा',
  },
  hi: {
    skipperTitle: 'कप्तान रमेश पाटिल',
    activeVoyage: 'सक्रिय समुद्री यात्रा (Sea Queen VII)',
    homePortLabel: 'गृह बंदरगाह',
    homePortName: 'मिरकरवाड़ा बंदरगाह, रत्नागिरी',
    voiceLangLabel: 'हिन्दी',
    safeBadge: '🟢 आज मछली पकड़ने के लिए सुरक्षित है',
    aiVerified: 'ISRO और INCOIS उपग्रह द्वारा सत्यापित',
    mainHeadline: 'क्षेत्र AS-03 (23 किमी पश्चिम) में प्रचुर मछली मिलने की संभावना।',
    returnWindowLabel: 'वापसी का समय: शाम 16:30 बजे से पहले लौटें',
    returnWindowDesc: 'सुबह समुद्र शांत है। दोपहर 14:00 के बाद लहरों की ऊंचाई 2.8 मीटर तक बढ़ जाएगी।',
    listenAudioBtn: '🔊 सुरक्षा सलाह सुनें (ऑडियो)',
    stopAudioBtn: 'ऑडियो रोकें',
    speakOrcaBtn: 'ORCA सहायक से बात करें',
    fishProbTitle: 'मछली का क्षेत्र (PFZ)',
    fishProbValue: 'क्षेत्र AS-03 • 23 किमी',
    fishProbZone: '82% उच्च संभावना • गहराई: 32 मी',
    fishSpecies: 'प्रमुख मछली: बांगड़ा, सुरमई और टूना',
    waveTitle: 'समुद्र और लहर की स्थिति',
    waveValue: '1.4 मी शांत लहरें',
    waveDesc: 'दोपहर 2 बजे के बाद 2.8 मी बढ़ेंगी',
    portDistanceTitle: 'बंदरगाह की दूरी व समय',
    portDistanceValue: '14.2 किमी • 45 मिनट',
    portDistanceDesc: 'मिरकरवाड़ा (16:30 से पहले लौटें)',
    alertsSectionTitle: 'आपके मार्ग के लिए महत्वपूर्ण लाइव अलर्ट',
    roughnessAlertTitle: 'दोपहर बाद समुद्र में अशांति की चेतावनी',
    roughnessAlertDesc: 'दोपहर 14:00 बजे तक हवा की गति 38 किमी/घंटा होगी। 15:30 से पहले जाल समेट लें।',
    borderAlertTitle: 'अंतरराष्ट्रीय समुद्री सीमा: पूरी तरह सुरक्षित',
    borderAlertDesc: 'आप अंतरराष्ट्रीय समुद्री सीमा रेखा (IMBL) से 48 किमी सुरक्षित दूरी पर हैं। कोई जोखिम नहीं।',
    mapTitle: 'लाइव GPS नाव और मछली क्षेत्र रडार',
    sosBtnText: '🚨 आपातकालीन SOS',
    sosActiveText: '🚨 SOS सक्रिय - रद्द करें',
    sosSubtext: 'तटरक्षक बल को 1-टैप आपात संदेश',
    sosActiveSubtext: 'प्रसारण रद्द करने के लिए टैप करें',
    helplineLabel: 'तटरक्षक बल हेल्पलाइन',
    routeNavBtn: 'पूर्ण GPS मार्ग नेविगेटर खोलें',
    audioAdvisory: 'ओरका सुरक्षा सलाह: आज मछली पकड़ने के लिए सुरक्षित है। अनुशंसित क्षेत्र AS-03, 23 किलोमीटर पश्चिम है। दोपहर बाद समुद्र की लहरें 2.8 मीटर तक बढ़ेंगी, इसलिए शाम 4:30 बजे से पहले मिरकरवाड़ा बंदरगाह वापस लौटें।',
    speechCode: 'hi-IN',
    quickQuestionsTitle: 'मछुआरों के त्वरित प्रश्न (1-टैप पूछें)',
    q1: 'क्षेत्र AS-03 में कौन सी मछली मिलेगी?',
    q2: 'दोपहर बाद समुद्र की स्थिति कैसी रहेगी?',
    q3: 'बंदरगाह लौटने का सबसे सुरक्षित रास्ता क्या है?',
    q4: 'क्या आज चक्रवात का कोई खतरा है?',

    alertModalTitle: '⚠️ समुद्र में ऊंची लहरों और अशांति की सीधी चेतावनी!',
    alertModalSeverity: 'अति-महत्वपूर्ण सुरक्षा चेतावनी (HIGH PRIORITY)',
    alertModalDesc: 'दोपहर 14:00 के बाद 2.8 मीटर ऊंची लहरें और 38 किमी/घंटा हवा चलेगी। तुरंत निम्नलिखित कदम उठाएं।',
    alertVoiceWarning: 'सावधान! समुद्र में लहरों की ऊंचाई बढ़ रही है। तुरंत जाल समेटें और नाव को मिरकरवाड़ा बंदरगाह की ओर मोड़ें!',
    whatToDoTitle: '👨🏽‍✈️ अभी क्या करना है? (तुरंत कार्रवाई के चरण)',
    whatToDoSubtitle: 'इन 4 चरणों का पालन करें',
    step1Title: 'चरण 1: मछली पकड़ने का जाल तुरंत समेटें',
    step1Desc: 'सभी जाल तुरंत नाव में खींच लें ताकि नाव सुरक्षित रूप से आगे बढ़ सके।',
    step2Title: 'चरण 2: कंपास को 115° पूर्व की ओर मोड़ें',
    step2Desc: 'अपनी नाव का मुंह 115° पूर्व (मिरकरवाड़ा बंदरगाह) की ओर करें।',
    step3Title: 'चरण 3: सुरक्षित मार्ग D से तेजी से आगे बढ़ें',
    step3Desc: 'तट के निकटतम सुरक्षित मार्ग D का पालन करें (समय: 45 मिनट)।',
    step4Title: 'चरण 4: VHF चैनल 16 पर संपर्क में रहें',
    step4Desc: 'तटरक्षक बल और आसपास की नावों से VHF चैनल 16 या 1554 हेल्पलाइन पर संपर्क बनाए रखें।',
    simulateAlertBtn: '⚠️ आपातकालीन चेतावनी जांचें (Test Live Alert)',
    dismissAlertBtn: 'समझ गया, बंद करें',
  },
  te: {
    skipperTitle: 'కెప్టెన్ రమేష్ పాటిల్',
    activeVoyage: 'క్రియాశీల సముద్ర ప్రయాణం (Sea Queen VII)',
    homePortLabel: 'స్వదేశీ ఓడరేవు',
    homePortName: 'మిర్కర్‌వాడ పోర్ట్, రత్నగిరి',
    voiceLangLabel: 'తెలుగు',
    safeBadge: '🟢 ఈ రోజు చేపల వేటకు వెళ్లడం సురక్షితం',
    aiVerified: 'ఇస్రో మరియు INCOIS శాటిలైట్ ధృవీకరణ',
    mainHeadline: 'జోన్ AS-03 (23 కి.మీ పశ్చిమం) వద్ద అధిక చేపలు లభిస్తాయి.',
    returnWindowLabel: 'తిరిగి వచ్చే సమయం: సాయంత్రం 16:30 లోపు చేరుకోండి',
    returnWindowDesc: 'ఉదయం సముద్రం ప్రశాంతంగా ఉంది. మధ్యాహ్నం తర్వాత అలల ఎత్తు 2.8 మీటర్లకు పెరుగుతుంది.',
    listenAudioBtn: '🔊 భద్రతా సలహా వినండి (ఆడియో)',
    stopAudioBtn: 'ఆడియో ఆపండి',
    speakOrcaBtn: 'ORCA సహాయకుడితో మాట్లాడండి',
    fishProbTitle: 'చేపల జోన్ (PFZ)',
    fishProbValue: 'జోన్ AS-03 • 23 కి.మీ',
    fishProbZone: '82% అధిక లభ్యత • లోతు: 32 మీ',
    fishSpecies: 'ప్రధాన చేపలు: కణగంతలు, వంజరం, ట్యూనా',
    waveTitle: 'సముద్రపు అలల ఎత్తు',
    waveValue: '1.4 మీ ప్రశాంత అలలు',
    waveDesc: 'మధ్యాహ్నం 2 తర్వాత 2.8 మీ పెరుగుతాయి',
    portDistanceTitle: 'ఓడరేవు దూరం & సమయం',
    portDistanceValue: '14.2 కి.మీ • 45 నిమిషాలు',
    portDistanceDesc: 'మిర్కర్‌వాడ (16:30 లోపు చేరండి)',
    alertsSectionTitle: 'ముఖ్యమైన ప్రత్యక్ష భద్రతా హెచ్చరికలు',
    roughnessAlertTitle: 'మధ్యాహ్నం సముద్రపు ఉధృతి హెచ్చరిక',
    roughnessAlertDesc: 'మధ్యాహ్నం 14:00 గంటలకు గాలి వేగం 38 కిమీ/గం చేరుకుంటుంది. 15:30 లోపు వలలను తీయండి.',
    borderAlertTitle: 'అంతర్జాతీయ సరిహద్దు (IMBL): సురక్షితం',
    borderAlertDesc: 'మీరు అంతర్జాతీయ సముద్ర సరిహద్దు నుండి 48 కి.మీ సురక్షిత దూరంలో ఉన్నారు.',
    mapTitle: 'లైవ్ GPS బోట్ & ఫిషింగ్ జోన్ రాడార్',
    sosBtnText: '🚨 అత్యవసర SOS',
    sosActiveText: '🚨 SOS సక్రియంగా ఉంది',
    sosSubtext: 'కోస్ట్ గార్డ్‌కు 1-ట్యాప్ సందేశం',
    sosActiveSubtext: 'రద్దు చేయడానికి నొక్కండి',
    helplineLabel: 'కోస్ట్ గార్డ్ హెల్ప్‌లైన్',
    routeNavBtn: 'GPS రూట్ నావిగేటర్‌ను తెరవండి',
    audioAdvisory: 'ORCA భద్రతా సలహా: ఈ ఉదయం సముద్రం చేపల వేటకు అనుకూలంగా ఉంది. AS-03 జోన్ వద్ద అధిక చేపలు లభిస్తాయి. మధ్యాహ్నం 2 తర్వాత అలల ఉధృతి పెరుగుతుంది, కాబట్టి సాయంత్రం 4:30 లోపు ఓడరేవుకు తిరిగి రండి.',
    speechCode: 'te-IN',
    quickQuestionsTitle: 'మత్స్యకారుల ప్రశ్నలు (1-ట్యాప్)',
    q1: 'AS-03 జోన్‌లో ఏ చేపలు దొరుకుతాయి?',
    q2: 'మధ్యాహ్నం అలల ఉధృతి ఎంత ఉంటుంది?',
    q3: 'ఓడరేవుకు తిరిగి రావడానికి సురక్షిత మార్గం ఏది?',
    q4: 'తుఫాను హెచ్చరికలు ఏవైనా ఉన్నాయా?',

    alertModalTitle: '⚠️ తీవ్రమైన అలల ఉధృతి హెచ్చరిక!',
    alertModalSeverity: 'అత్యవసర భద్రతా హెచ్చరిక (HIGH PRIORITY)',
    alertModalDesc: 'మధ్యాహ్నం 14:00 తర్వాత అలలు 2.8 మీటర్లకు పెరుగుతాయి. వెంటనే క్రింది చర్యలు తీసుకోండి.',
    alertVoiceWarning: 'హెచ్చరిక! అలల ఉధృతి పెరుగుతోంది. వెంటనే వలలను తీసి ఓడరేవుకు తిరిగి రండి!',
    whatToDoTitle: '👨🏽‍✈️ ఇప్పుడు ఏమి చేయాలి? (తక్షణ చర్యల మార్గదర్శి)',
    whatToDoSubtitle: 'ఈ 4 దశలను పాటించండి',
    step1Title: 'దశ 1: వలలను వెంటనే పైకి తీయండి',
    step1Desc: 'బోటు సురక్షితంగా మళ్లించడానికి అన్ని వలలను లాగండి.',
    step2Title: 'దశ 2: 115° తూర్పు దిశకు తిరగండి',
    step2Desc: 'మిర్కర్‌వాడ పోర్ట్ వైపు 115° దిక్సూచి మార్గాన్ని నిర్ణయించండి.',
    step3Title: 'దశ 3: సురక్షిత మార్గం D ద్వారా రండి',
    step3Desc: 'సురక్షిత తీరప్రాంత మార్గం D ద్వారా 45 నిమిషాల్లో చేరుకోండి.',
    step4Title: 'దశ 4: కోస్ట్ గార్డ్‌తో సంప్రదించండి',
    step4Desc: 'VHF ఛానెల్ 16 లేదా 1554 హెల్ప్‌లైన్‌లో అందుబాటులో ఉండండి.',
    simulateAlertBtn: '⚠️ అత్యవసర హెచ్చరికను తనిఖీ చేయండి (Test Alert)',
    dismissAlertBtn: 'అర్థమైంది, మూసివేయండి',
  },
  ta: {
    skipperTitle: 'கேப்டன் ரமேஷ் பாட்டீல்',
    activeVoyage: 'செயலில் உள்ள கடல் பயணம் (Sea Queen VII)',
    homePortLabel: 'சொந்த துறைமுகம்',
    homePortName: 'மிர்கர்வாடா துறைமுகம், ரத்னகிரி',
    voiceLangLabel: 'தமிழ்',
    safeBadge: '🟢 இன்று மீன்பிடிக்க செல்வது பாதுகாப்பானது',
    aiVerified: 'ISRO மற்றும் INCOIS செயற்கைக்கோள் சரிபார்ப்பு',
    mainHeadline: 'மண்டலம் AS-03 (23 கி.மீ மேற்கு) இல் அதிக மீன்வளம் உள்ளது.',
    returnWindowLabel: 'திரும்பும் நேரம்: மாலை 16:30 மணிக்குள் திரும்பவும்',
    returnWindowDesc: 'காலையில் கடல் அமைதியாக உள்ளது. பிற்பகலில் அலைகள் 2.8 மீட்டர் வரை உயரும்.',
    listenAudioBtn: '🔊 ஆடியோ ஆலோசனை கேளுங்கள்',
    stopAudioBtn: 'ஆடியோவை நிறுத்து',
    speakOrcaBtn: 'ORCA உதவியாளரிடம் பேசுங்கள்',
    fishProbTitle: 'மீன்பிடி மண்டலம் (PFZ)',
    fishProbValue: 'மண்டலம் AS-03 • 23 கி.மீ',
    fishProbZone: '82% அதிக வாய்ப்பு • ஆழம்: 32 மீ',
    fishSpecies: 'முக்கிய மீன்கள்: கானாங்கெளுத்தி, வஞ்சிரம், சூரை',
    waveTitle: 'கடல் அலைகளின் உயரம்',
    waveValue: '1.4 மீ அமைதியான அலைகள்',
    waveDesc: 'பிற்பகல் 2 மணிக்கு பின் 2.8 மீ உயரும்',
    portDistanceTitle: 'துறைமுக தூரம் & நேரம்',
    portDistanceValue: '14.2 கி.மீ • 45 நிமிடம்',
    portDistanceDesc: 'மிர்கர்வாடா (16:30 க்குள் திரும்பவும்)',
    alertsSectionTitle: 'முக்கியமான நேரலை எச்சரிக்கைகள்',
    roughnessAlertTitle: 'பிற்பகல் கடல் சீற்ற எச்சரிக்கை',
    roughnessAlertDesc: 'மதியம் 14:00 மணிக்கு காற்றின் வேகம் 38 கிமீ ஆக அதிகரிக்கும். 15:30 க்குள் வலைகளை மீட்கவும்.',
    borderAlertTitle: 'சர்வதேச எல்லை (IMBL): பாதுகாப்பானது',
    borderAlertDesc: 'நீங்கள் சர்வதேச கடல் எல்லையிலிருந்து 48 கி.மீ தொலைவில் பாதுகாப்பாக உள்ளீர்கள்.',
    mapTitle: 'நேரலை GPS படகு மற்றும் மீன்வள ரேடார்',
    sosBtnText: '🚨 அவசர SOS உதவி',
    sosActiveText: '🚨 SOS செயலில் உள்ளது',
    sosSubtext: 'கடலோர காவல்படைக்கு 1-தட்டல் தகவல்',
    sosActiveSubtext: 'ரத்து செய்ய தட்டவும்',
    helplineLabel: 'கடலோர காவல்படை உதவி எண்',
    routeNavBtn: 'முழு GPS வழிகாட்டியைத் திறக்கவும்',
    audioAdvisory: 'ORCA ஆலோசனை: இன்று காலை மீன்பிடிக்க கடல் பாதுகாப்பானது. AS-03 மண்டலத்தில் அதிக மீன்வளம் உள்ளது. மதியம் 2 மணிக்கு பிறகு அலைகள் உயரும் என்பதால் மாலை 4:30 மணிக்குள் துறைமுகத்திற்கு திரும்பவும்.',
    speechCode: 'ta-IN',
    quickQuestionsTitle: 'மீனவர்களுக்கான உடனடி கேள்விகள்',
    q1: 'AS-03 மண்டலத்தில் என்ன மீன்கள் கிடைக்கும்?',
    q2: 'மதியத்திற்குப் பிறகு அலைகள் எவ்வளவு உயரும்?',
    q3: 'துறைமுகம் திரும்ப பாதுகாப்பான பாதை எது?',
    q4: 'புயல் எச்சரிக்கை ஏதேனும் உள்ளதா?',

    alertModalTitle: '⚠️ உயர் அலை மற்றும் கடல் சீற்ற எச்சரிக்கை!',
    alertModalSeverity: 'அவசர எச்சரிக்கை (HIGH PRIORITY)',
    alertModalDesc: 'மதியம் 14:00 மணிக்கு பின் அலைகள் 2.8 மீ உயரும். உடனடியாக வலைகளை மீட்டு துறைமுகம் திரும்பவும்.',
    alertVoiceWarning: 'எச்சரிக்கை! கடல் அலைகள் உயர்கிறது. உடனடியாக துறைமுகம் திரும்பவும்!',
    whatToDoTitle: '👨🏽‍✈️ இப்போது என்ன செய்ய வேண்டும்? (அவசர வழிகாட்டி)',
    whatToDoSubtitle: 'இந்த 4 படிகளைப் பின்பற்றவும்',
    step1Title: 'படி 1: வலைகளை உடனே மேலே இழுக்கவும்',
    step1Desc: 'படகை விரைவாக திருப்ப அனைத்து வலைகளையும் மீட்கவும்.',
    step2Title: 'படி 2: திசைகாட்டியை 115° கிழக்கு நோக்கி திருப்பவும்',
    step2Desc: 'துறைமுகத்தை நோக்கி 115° திசையை அமைக்கவும்.',
    step3Title: 'படி 3: பாதுகாப்பான பாதை D வழியாக செல்லவும்',
    step3Desc: 'பாதுகாப்பான பாதையில் 45 நிமிடங்களில் துறைமுகம் அடையலாம்.',
    step4Title: 'படி 4: VHF சேனல் 16 இல் தொடர்பில் இருக்கவும்',
    step4Desc: 'கடலோர காவல்படையுடன் 1554 மூலம் தொடர்பில் இருக்கவும்.',
    simulateAlertBtn: '⚠️ எச்சரிக்கையை சோதிக்கவும் (Test Alert)',
    dismissAlertBtn: 'புரிந்தது, மூடு',
  },
  gu: {
    skipperTitle: 'કેપ્ટન રમેશ પાટીલ',
    activeVoyage: 'સક્રિય દરિયાઈ સફર (Sea Queen VII)',
    homePortLabel: 'હોમ પોર્ટ',
    homePortName: 'મીરકરવાડા બંદર, રત્નાગિરી',
    voiceLangLabel: 'ગુજરાતી',
    safeBadge: '🟢 આજે માછીમારી માટે જવું સુરક્ષિત છે',
    aiVerified: 'ISRO અને INCOIS ઉપગ્રહ દ્વારા ચકાસાયેલ',
    mainHeadline: 'ઝોન AS-03 (23 કિમી પશ્ચિમ) માં પુષ્કળ માછલીઓ.',
    returnWindowLabel: 'પરત ફરવાનો સમય: સાંજે 16:30 પહેલાં પાછા ફરો',
    returnWindowDesc: 'સવારે દરિયો શાંત છે. બપોરે 2 પછી મોજાં 2.8 મીટર વધશે.',
    listenAudioBtn: '🔊 સલાહ સાંભળો (ઓડિયો)',
    stopAudioBtn: 'ઓડિયો રોકો',
    speakOrcaBtn: 'ORCA સહાયક સાથે વાત કરો',
    fishProbTitle: 'માછલી ઝોન (PFZ)',
    fishProbValue: 'ઝોન AS-03 • 23 કિમી',
    fishProbZone: '82% ઉત્તમ સંભાવના • ઊંડાઈ: 32 મી',
    fishSpecies: 'મુખ્ય માછલી: બાંગડા, સુરમઈ, ટુના',
    waveTitle: 'દરિયાઈ મોજાંની ઊંચાઈ',
    waveValue: '1.4 મીટર શાંત મોજાં',
    waveDesc: 'બપોરે 2 પછી મોજાં 2.8 મીટર વધશે',
    portDistanceTitle: 'બંદરનું અંતર અને સમય',
    portDistanceValue: '14.2 કિમી • 45 મિનિટ',
    portDistanceDesc: 'મીરકરવાડા (16:30 પહેલાં પહોંચો)',
    alertsSectionTitle: 'તમારા માર્ગ માટે મહત્વપૂર્ણ ચેતવણીઓ',
    roughnessAlertTitle: 'બપોર પછી દરિયાઈ તોફાનની ચેતવણી',
    roughnessAlertDesc: 'બપોરે 14:00 વાગ્યા સુધીમાં પવનની ગતિ 38 કિમી/કલાક થશે. 15:30 પહેલાં જાળીઓ સંકેલી લો.',
    borderAlertTitle: 'આંતરરાષ્ટ્રીય સીમા (IMBL): સલામત',
    borderAlertDesc: 'તમે આંતરરાષ્ટ્રીય દરિયાઈ સીમાથી 48 કિમી સુરક્ષિત અંતરે છો.',
    mapTitle: 'લાઈવ GPS બોટ અને ફિશિંગ ઝોન રડાર',
    sosBtnText: '🚨 કટોકટી SOS',
    sosActiveText: '🚨 SOS સક્રિય - રદ કરો',
    sosSubtext: 'કોસ્ટ ગાર્ડને 1-ટેપ કટોકટી સંદેશ',
    sosActiveSubtext: 'રદ કરવા માટે ટેપ કરો',
    helplineLabel: 'કોસ્ટ ગાર્ડ હેલ્પલાઇન',
    routeNavBtn: 'સંપૂર્ણ GPS રૂટ નેવિગેટર ખોલો',
    audioAdvisory: 'ORCA સલાહ: આજે સવારે માછીમારી માટે દરિયો અનુકૂળ છે. AS-03 ઝોનમાં માછલીઓ પુષ્કળ છે. બપોરે 2 પછી મોજાં 2.8 મીટર વધશે, જેથી સાંજે 4:30 પહેલાં બંદરે પાછા ફરો.',
    speechCode: 'gu-IN',
    quickQuestionsTitle: 'માછીમારો માટે ઝડપી પ્રશ્નો',
    q1: 'AS-03 ઝોનમાં કઈ માછલી મળશે?',
    q2: 'બપોર પછી મોજાં કેટલા વધશે?',
    q3: 'બંદરે પરત ફરવા સૌથી સલામત રસ્તો કયો છે?',
    q4: 'શું કોઈ વાવાઝોડાની ચેતવણી છે?',

    alertModalTitle: '⚠️ દરિયાઈ તોફાન અને ઊંચા મોજાંની ચેતવણી!',
    alertModalSeverity: 'અતિ-મહત્વપૂર્ણ સુરક્ષા ચેતવણી (HIGH PRIORITY)',
    alertModalDesc: 'બપોરે 2 પછી મોજાં 2.8 મીટર વધશે. તાત્કાલિક જાળીઓ સંકેલીને બંદરે પાછા ફરો.',
    alertVoiceWarning: 'સાવધાન! દરિયામાં મોજાં વધી રહ્યા છે. તરત જ જાળીઓ સંકેલીને મીરકરવાડા બંદરે પાછા ફરો!',
    whatToDoTitle: '👨🏽‍✈️ હવે શું કરવું? (તાત્કાલિક પગલાં)',
    whatToDoSubtitle: 'આ 4 પગલાં અનુસરો',
    step1Title: 'પગલું 1: માછીમારીની જાળી તરત જ સંકેલી લો',
    step1Desc: 'બોટ ઝડપથી વાળવા માટે તમામ જાળી બોટમાં ખેંચી લો.',
    step2Title: 'પગલું 2: હોકાયંત્ર 115° પૂર્વ તરફ ફેરવો',
    step2Desc: 'બોટનું મોઢું 115° પૂર્વ (મીરકરવાડા બંદર) તરફ કરો.',
    step3Title: 'પગલું 3: સલામત રૂટ D પરથી ઝડપથી નીકળો',
    step3Desc: 'સલામત દરિયાઈ માર્ગ D થી 45 મિનિટમાં બંદરે પહોંચો.',
    step4Title: 'પગલું 4: કોસ્ટ ગાર્ડ સાથે સંપર્કમાં રહો',
    step4Desc: 'VHF ચેનલ 16 અથવા 1554 હેલ્પલાઇન પર સંપર્ક રાખો.',
    simulateAlertBtn: '⚠️ ચેતવણી તપાસો (Test Live Alert)',
    dismissAlertBtn: 'સમજાયું, બંધ કરો',
  },
  bn: {
    skipperTitle: 'ক্যাপ্টেন রমেশ পাটিল',
    activeVoyage: 'সক্রিয় সমুদ্রযাত্রা (Sea Queen VII)',
    homePortLabel: 'স্বদেশী বন্দর',
    homePortName: 'মিরকারওয়াদা বন্দর, রত্নগিরি',
    voiceLangLabel: 'বাংলা',
    safeBadge: '🟢 আজ মাছ ধরতে যাওয়া নিরাপদ',
    aiVerified: 'ISRO এবং INCOIS উপগ্রহ দ্বারা যাচাইকৃত',
    mainHeadline: 'জোন AS-03 (২৩ কিমি পশ্চিম) এ প্রচুর মাছ পাওয়া যাবে।',
    returnWindowLabel: 'ফিরে আসার সময়: বিকেল ১৬:৩০ এর মধ্যে ফিরুন',
    returnWindowDesc: 'সকালে সমুদ্র শান্ত আছে। দুপুরের পর ঢেউয়ের উচ্চতা ২.৮ মিটার পর্যন্ত বাড়বে।',
    listenAudioBtn: '🔊 পরামর্শ শুনুন (অডিও)',
    stopAudioBtn: 'অডিও বন্ধ করুন',
    speakOrcaBtn: 'ORCA সহকারীর সাথে কথা বলুন',
    fishProbTitle: 'মাছের জোন (PFZ)',
    fishProbValue: 'জোন AS-03 • ২৩ কিমি',
    fishProbZone: '৮২% সম্ভাবনা • গভীরতা: ৩২ মি',
    fishSpecies: 'প্রধান মাছ: ইলিশ, সুরমাই ও টুনা',
    waveTitle: 'ঢেউ ও সমুদ্রের অবস্থা',
    waveValue: '১.৪ মিটার শান্ত ঢেউ',
    waveDesc: 'দুপুর ২টার পর ২.৮ মিটার হবে',
    portDistanceTitle: 'বন্দরের দূরত্ব ও সময়',
    portDistanceValue: '১৪.২ কিমি • ৪৫ মিনিট',
    portDistanceDesc: 'মিরকারওয়াদা (১৬:৩০ এর মধ্যে ফিরুন)',
    alertsSectionTitle: 'লাইভ নিরাপত্তা সতর্কতা',
    roughnessAlertTitle: 'বিকেলে সমুদ্র উত্তাল হওয়ার সতর্কতা',
    roughnessAlertDesc: 'দুপুর ১৪:০০ নাগাদ বাতাসের গতি ৩৮ কিমি/ঘণ্টা হবে। ১৫:৩০ এর মধ্যে জাল তুলে নিন।',
    borderAlertTitle: 'আন্তর্জাতিক জলসীমা: নিরাপদ',
    borderAlertDesc: 'আপনি আন্তর্জাতিক সমুদ্রসীমা (IMBL) থেকে ৪৮ কিমি নিরাপদ দূরত্বে আছেন।',
    mapTitle: 'লাইভ GPS বোট ও মাছ ধরার জোন রাডার',
    sosBtnText: '🚨 জরুরি SOS বার্তা',
    sosActiveText: '🚨 SOS সক্রিয় - বাতিল করুন',
    sosSubtext: 'কোস্ট গার্ডের কাছে ১-ট্যাপ জরুরি বার্তা',
    sosActiveSubtext: 'বাতিল করতে ট্যাপ করুন',
    helplineLabel: 'কোস্ট গার্ড হেল্পলাইন',
    routeNavBtn: 'সম্পূর্ণ GPS রুট নেভিগেটর খুলুন',
    audioAdvisory: 'ORCA পরামর্শ: আজ সকালে মাছ ধরার জন্য সমুদ্র অনুকূল। AS-03 জোনে প্রচুর মাছ রয়েছে। দুপুর ২টার পর ঢেউ ২.৮ মিটার পর্যন্ত বাড়বে, তাই বিকেল ৪:৩০ এর মধ্যে বন্দরে ফিরুন।',
    speechCode: 'bn-IN',
    quickQuestionsTitle: 'মৎস্যজীবীদের প্রশ্ন (১-ট্যাপ)',
    q1: 'AS-03 জোনে কি মাছ পাওয়া যাবে?',
    q2: 'বিকেলের পর ঢেউ কত বাড়বে?',
    q3: 'বন্দরে ফেরার নিরাপদ রুট কোনটি?',
    q4: 'কোনো ঘূর্ণিঝড়ের সতর্কতা আছে কি?',

    alertModalTitle: '⚠️ সমুদ্র উত্তাল হওয়ার জরুরি সতর্কতা!',
    alertModalSeverity: 'জরুরি নিরাপত্তা সতর্কতা (HIGH PRIORITY)',
    alertModalDesc: 'দুপুর ১৪:০০ এর পর ঢেউ ২.৮ মিটার বাড়বে। অবিলম্বে জাল তুলে বন্দরে ফিরুন।',
    alertVoiceWarning: 'সাবধান! সমুদ্রে ঢেউ বাড়ছে। দ্রুত জাল তুলে বন্দরে ফিরে আসুন!',
    whatToDoTitle: '👨🏽‍✈️ এখন কি করতে হবে? (জরুরি নির্দেশিকা)',
    whatToDoSubtitle: 'এই 4টি ধাপ অনুসরণ করুন',
    step1Title: 'ধাপ ১: মাছ ধরার জাল অবিলম্বে তুলে নিন',
    step1Desc: 'নৌকা সহজে ঘোরাতে সমস্ত জাল নৌকায় তুলুন।',
    step2Title: 'ধাপ ২: কম্পাস ১১৫° পূর্ব দিকে ঘোরান',
    step2Desc: 'বন্দরের দিকে ১১৫° কোর্স সেট করুন।',
    step3Title: 'ধাপ ৩: নিরাপদ রুট D দিয়ে দ্রুত ফিরুন',
    step3Desc: 'নিরাপদ রুট D দিয়ে ৪৫ মিনিটে বন্দরে পৌঁছান।',
    step4Title: 'ধাপ ৪: কোস্ট গার্ডের সাথে যোগাযোগ রাখুন',
    step4Desc: 'VHF চ্যানেল ১৬ বা ১৫৫৪ নম্বরে যোগাযোগ রাখুন।',
    simulateAlertBtn: '⚠️ সতর্কতা পরীক্ষা করুন (Test Alert)',
    dismissAlertBtn: 'বুঝেছি, বন্ধ করুন',
  },
  ml: {
    skipperTitle: 'ക്യാപ്റ്റൻ രമേഷ് പാട്ടീൽ',
    activeVoyage: 'സജീവ സമുദ്രയാത്ര (Sea Queen VII)',
    homePortLabel: 'ഹോം പോർട്ട്',
    homePortName: 'മിർക്കർവാഡ പോർട്ട്, രത്നഗിരി',
    voiceLangLabel: 'മലയാളം',
    safeBadge: '🟢 ഇന്ന് മത്സ്യബന്ധനത്തിന് പോകുന്നത് സുരക്ഷിതമാണ്',
    aiVerified: 'ഐഎസ്ആർഒ ഉപഗ്രഹ പരിശോധന പൂർത്തിയായി',
    mainHeadline: 'സോൺ AS-03 (23 കി.മീ പടിഞ്ഞാറ്) ൽ ഉയർന്ന മത്സ്യ ലഭ്യത.',
    returnWindowLabel: 'മടങ്ങിയെത്തേണ്ട സമയം: 16:30 ന് മുൻപായി തിരിച്ചെത്തുക',
    returnWindowDesc: 'രാവിലെ കടൽ ശാന്തമാണ്. ഉച്ചയ്ക്ക് ശേഷം തിരമാലകൾ 2.8 മീറ്ററായി ഉയരും.',
    listenAudioBtn: '🔊 സുരക്ഷാ ഉപദേശം കേൾക്കുക (ഓഡിയോ)',
    stopAudioBtn: 'ഓഡിയോ നിർത്തുക',
    speakOrcaBtn: 'ORCA അസിസ്റ്റന്റുമായി സംസാരിക്കുക',
    fishProbTitle: 'മത്സ്യബന്ധന മേഖല (PFZ)',
    fishProbValue: 'സോൺ AS-03 • 23 കി.മീ',
    fishProbZone: '82% ലഭ്യത • ആഴം: 32 മീ',
    fishSpecies: 'പ്രധാന മത്സ്യങ്ങൾ: അയല, നെയ്മീൻ, ചൂര',
    waveTitle: 'തിരമാലകളുടെ ഉയരം',
    waveValue: '1.4 മീറ്റർ ശാന്തമായ തിരകൾ',
    waveDesc: 'ഉച്ചയ്ക്ക് 2 ന് ശേഷം 2.8 മീറ്ററാകും',
    portDistanceTitle: 'തുറമുഖ ദൂരവും സമയവും',
    portDistanceValue: '14.2 കി.മീ • 45 മിനിറ്റ്',
    portDistanceDesc: 'മിർക്കർവാഡ (16:30 ന് മുൻപ് എത്തുക)',
    alertsSectionTitle: 'പ്രധാന തത്സമയ അലേർട്ടുകൾ',
    roughnessAlertTitle: 'ഉച്ചയ്ക്ക് ശേഷമുള്ള കടൽക്ഷോഭ മുന്നറിയിപ്പ്',
    roughnessAlertDesc: 'ഉച്ചയ്ക്ക് 14:00 മണിയോടെ കാറ്റിന്റെ വേഗത 38 കി.മീ/മണിക്കൂറാകും. 15:30 ന് മുൻപ് വലകൾ കയറ്റുക.',
    borderAlertTitle: 'അന്താരാഷ്ട്ര അതിർത്തി: സുരക്ഷിതം',
    borderAlertDesc: 'നിങ്ങൾ അന്താരാഷ്ട്ര സമുദ്ര അതിർത്തിയിൽ നിന്ന് 48 കി.മീ സുരക്ഷിത അകലത്തിലാണ്.',
    mapTitle: 'തത്സമയ GPS ബോട്ട് & ഫിഷിംഗ് സോൺ റഡാർ',
    sosBtnText: '🚨 അടിയന്തര SOS',
    sosActiveText: '🚨 SOS സജീവമാണ്',
    sosSubtext: 'കോസ്റ്റ് ഗാർഡിന് 1-ടാപ്പ് അടിയന്തര സന്ദേശം',
    sosActiveSubtext: 'റദ്ദാക്കാൻ ടാപ്പ് ചെയ്യുക',
    helplineLabel: 'കോസ്റ്റ് ഗാർഡ് ഹെൽപ്പ്‌ലൈൻ',
    routeNavBtn: 'GPS റൂട്ട് നാവിഗേറ്റർ തുറക്കുക',
    audioAdvisory: 'ORCA ഉപദേശം: ഇന്ന് രാവിലെ മത്സ്യബന്ധനത്തിന് അനുകൂലമായ കാലാവസ്ഥയാണ്. AS-03 സോണിൽ ധാരാളം മത്സ്യങ്ങളുണ്ട്. ഉച്ചയ്ക്ക് ശേഷം തിരമാലകൾ ഉയരുമെന്നതിനാൽ വൈകുന്നേരം 4:30 ന് മുൻപായി തിരിച്ചെത്തുക.',
    speechCode: 'ml-IN',
    quickQuestionsTitle: 'പെട്ടെന്നുള്ള ചോദ്യങ്ങൾ',
    q1: 'AS-03 സോണിൽ ഏത് തരം മീനുകളാണുള്ളത്?',
    q2: 'ഉച്ചയ്ക്ക് ശേഷം തിരമാലകൾ എത്രത്തോളം ഉയരും?',
    q3: 'തുറമുഖത്തേക്ക് മടങ്ങാനുള്ള സുരക്ഷിത വഴി ഏതാണ്?',
    q4: 'ചുഴലിക്കാറ്റ് മുന്നറിയിപ്പ് ഉണ്ടോ?',

    alertModalTitle: '⚠️ ഉയർന്ന തിരമാല മുന്നറിയിപ്പ്!',
    alertModalSeverity: 'അടിയന്തര മുന്നറിയിപ്പ് (HIGH PRIORITY)',
    alertModalDesc: 'ഉച്ചയ്ക്ക് 14:00 ന് ശേഷം തിരമാലകൾ 2.8 മീറ്ററായി ഉയരും. ഉടൻ തന്നെ തുറമുഖത്തേക്ക് മടങ്ങുക.',
    alertVoiceWarning: 'ജാഗ്രത! കടലിൽ തിരമാലകൾ ഉയരുന്നു. ഉടൻ തന്നെ തുറമുഖത്തേക്ക് മടങ്ങുക!',
    whatToDoTitle: '👨🏽‍✈️ ഇപ്പോൾ എന്തുചെയ്യണം? (അടിയന്തര ഘട്ടങ്ങൾ)',
    whatToDoSubtitle: 'ഈ 4 ഘട്ടങ്ങൾ പാലിക്കുക',
    step1Title: 'ഘട്ടം 1: വലകൾ ഉടൻ തന്നെ കയറ്റുക',
    step1Desc: 'ബോട്ട് തിരിക്കാൻ എല്ലാ വലകളും വേഗത്തിൽ എടുക്കുക.',
    step2Title: 'ഘട്ടം 2: 115° കിഴക്കോട്ട് തിരിക്കുക',
    step2Desc: 'തുറമുഖത്തേക്ക് 115° ദിശ നിശ്ചയിക്കുക.',
    step3Title: 'ഘട്ടം 3: സുരക്ഷിത റൂട്ട് D വഴി മടങ്ങുക',
    step3Desc: 'റൂട്ട് D വഴി 45 മിനിറ്റിൽ തുറമുഖത്ത് എത്തുക.',
    step4Title: 'ഘട്ടം 4: കോസ്റ്റ് ഗാർഡുമായി ബന്ധപ്പെടുക',
    step4Desc: 'VHF ചാനൽ 16 അല്ലെങ്കിൽ 1554 ൽ ബന്ധപ്പെടുക.',
    simulateAlertBtn: '⚠️ മുന്നറിയിപ്പ് പരിശോധിക്കുക (Test Alert)',
    dismissAlertBtn: 'മനസ്സിലായി, അടയ്ക്കുക',
  },
  en: {
    skipperTitle: 'Skipper Ramesh Patil',
    activeVoyage: 'ACTIVE VOYAGE (Sea Queen VII)',
    homePortLabel: 'Home Port',
    homePortName: 'Mirkarwada Port, Ratnagiri',
    voiceLangLabel: 'English',
    safeBadge: '🟢 SAFE TO GO FISHING TODAY',
    aiVerified: 'Verified via ISRO MOSDAC & INCOIS Satellites',
    mainHeadline: 'Abundant Catch Expected in Zone AS-03 (23 km West).',
    returnWindowLabel: 'Return Window: Return to Port before 16:30 hrs',
    returnWindowDesc: 'Sea conditions are calm in the morning. Wave height will increase to 2.8m after 14:00 hrs with 38 km/h gusts.',
    listenAudioBtn: '🔊 LISTEN SAFETY ADVISORY (AUDIO)',
    stopAudioBtn: 'STOP VOICE ADVISORY',
    speakOrcaBtn: 'SPEAK WITH ORCA ASSISTANT',
    fishProbTitle: 'TARGET FISHING ZONE (PFZ)',
    fishProbValue: 'Zone AS-03 • 23 km West',
    fishProbZone: '82% High Catch Density • Depth: 32m',
    fishSpecies: 'Target Species: Indian Mackerel, Seer Fish & Tuna',
    waveTitle: 'SEA & WAVE CONDITIONS',
    waveValue: '1.4m Calm Swells',
    waveDesc: 'Rises to 2.8m after 2 PM (14:00 hrs)',
    portDistanceTitle: 'PORT DISTANCE & RETURN TIME',
    portDistanceValue: '14.2 km • 45 min ride',
    portDistanceDesc: 'Mirkarwada Port (Reach before 16:30)',
    alertsSectionTitle: 'IMPORTANT LIVE ALERTS FOR YOUR ROUTE',
    roughnessAlertTitle: 'Afternoon Sea Roughness Warning',
    roughnessAlertDesc: 'Wind speeds pick up to 38 km/h by 14:00 hrs. Ensure nets are hauled before 15:30 hrs.',
    borderAlertTitle: 'International Maritime Boundary (IMBL): SAFE',
    borderAlertDesc: 'You are 48 km away from the International Maritime Boundary Line (IMBL). No crossing risk.',
    mapTitle: 'Live GPS Vessel & Fishing Zone Radar',
    sosBtnText: '🚨 EMERGENCY SOS',
    sosActiveText: '🚨 SOS ACTIVE - CANCEL',
    sosSubtext: '1-tap distress broadcast to coast guard',
    sosActiveSubtext: 'tap to cancel broadcast',
    helplineLabel: 'Coast Guard Helpline',
    routeNavBtn: 'Open Full GPS Route Navigator',
    audioAdvisory: 'ORCA Safety Verdict: SAFE TO FISH. Recommended Zone is AS-03, 23 kilometers West. High fish catch expected. Important warning: Sea swells will rise to 2.8 meters after 2 PM. You must return to Mirkarwada Port before 4:30 PM.',
    speechCode: 'en-IN',
    quickQuestionsTitle: 'Quick Voice Questions for Fishermen',
    q1: 'Which fish species are abundant in Zone AS-03?',
    q2: 'When will the waves become rough today?',
    q3: 'What is the safest navigation route back to port?',
    q4: 'Are there any cyclone or squall warnings active?',

    alertModalTitle: '⚠️ High Wave & Sea Roughness Live Emergency Alert!',
    alertModalSeverity: 'HIGH PRIORITY MARITIME HAZARD',
    alertModalDesc: 'Dangerous wave swells of 2.8m and 38 km/h wind gusts developing after 14:00 hrs. Follow the emergency action checklist immediately.',
    alertVoiceWarning: 'Attention! Sea swells are rising to 2.8 meters. Haul up your fishing nets immediately and steer course 115 degrees East along Route D back to Mirkarwada Port!',
    whatToDoTitle: '👨🏽‍✈️ WHAT TO DO RIGHT NOW? (Action Checklist)',
    whatToDoSubtitle: 'Follow these 4 simple steps shown in guidance',
    step1Title: 'Step 1: Haul In All Fishing Nets Immediately',
    step1Desc: 'Clear your vessel deck and retrieve lines to allow full maneuverability.',
    step2Title: 'Step 2: Steer Compass Heading 115° East',
    step2Desc: 'Turn vessel helm to 115° East directly aligned with Mirkarwada Port channel.',
    step3Title: 'Step 3: Follow Sheltered Coastal Route D',
    step3Desc: 'Maintain cruising speed of 8.5 knots along Route D (estimated arrival: 45 mins).',
    step4Title: 'Step 4: Monitor VHF Radio Channel 16',
    step4Desc: 'Stay tuned to Coast Guard broadcast on VHF Ch-16 or call emergency helpline 1554.',
    simulateAlertBtn: '⚠️ Simulate Live Hazard Alert (Test on Screen)',
    dismissAlertBtn: 'Understood, Close Alert',
  },
};

const LANG_PILLS = [
  { code: 'mr', label: 'मराठी' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'ml', label: 'മലയാളം' },
  { code: 'en', label: 'English' },
];

export const FishermanDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language, setLanguage } = useAppStore();

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [sosActive, setSosActive] = useState(false);

  // Emergency Alert Modal State
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  // Active content based on global language store
  const currentLangCode = language.toLowerCase();
  const tContent = DASHBOARD_TRANSLATIONS[currentLangCode] || DASHBOARD_TRANSLATIONS.mr || DASHBOARD_TRANSLATIONS.en;

  // Vessel & Location state
  const vesselLat = 16.99;
  const vesselLon = 73.31;
  const harborCoords: [number, number] = [16.985, 73.285];
  const pfzCoords: [number, number] = [17.06, 73.18];

  // Spoken Voice Advisory
  const playSpokenText = (text: string, code: string) => {
    if (!('speechSynthesis' in window)) {
      toast.error('Voice synthesis not supported on this device.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92;
    utterance.pitch = 1.0;
    utterance.lang = code;

    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(
      (v) =>
        v.lang.toLowerCase() === code.toLowerCase() ||
        v.lang.toLowerCase().replace('_', '-') === code.toLowerCase() ||
        v.lang.toLowerCase().startsWith(code.split('-')[0].toLowerCase())
    );
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  const handlePlayVoiceAdvisory = () => {
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }
    playSpokenText(tContent.audioAdvisory, tContent.speechCode);
    toast.success(`🔊 Broadcasting voice advisory in ${tContent.voiceLangLabel}`);
  };

  // Trigger Interactive Live Hazard Alert (Popup in user's language)
  const triggerHazardAlert = () => {
    setIsAlertModalOpen(true);
    playSpokenText(tContent.alertVoiceWarning, tContent.speechCode);
    toast.error(`⚠️ ${tContent.alertModalTitle}`, { duration: 8000 });
  };

  // Emergency SOS Trigger
  const handleTriggerSOS = () => {
    const nextState = !sosActive;
    setSosActive(nextState);

    if (nextState) {
      toast.error('🚨 DISTRESS SOS SENT to Indian Coast Guard & nearby vessels with your GPS coordinates (16.99°N, 73.31°E)!', {
        duration: 9000,
      });
      playSpokenText("Emergency SOS Alert sent to Coast Guard with vessel GPS coordinates 16.99 North, 73.31 East.", "en-IN");
    } else {
      toast.info('Emergency SOS has been cancelled.');
    }
  };

  // Quick Question handler to ask ORCA
  const handleQuickQuestion = (qText: string) => {
    navigate('/ask', { state: { initialPrompt: qText } });
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto pb-16 fade-in text-slate-900 selection:bg-blue-600 selection:text-white relative">
      
      {/* ========================================================================= */}
      {/* ON-SCREEN FULL EMERGENCY ALERT MODAL (IN USER'S SELECTED REGIONAL LANGUAGE) */}
      {/* ========================================================================= */}
      {isAlertModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in zoom-in duration-200">
          <div className="relative w-full max-w-3xl bg-white border-2 border-red-500 rounded-3xl p-5 sm:p-7 shadow-[0_20px_60px_rgba(239,68,68,0.25)] overflow-hidden text-slate-900">
            {/* Top red pulse bar */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-red-600 via-amber-400 to-red-600 animate-pulse"></div>

            {/* Close Button */}
            <button
              onClick={() => setIsAlertModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-all z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with Pulse & Voice */}
            <div className="flex items-start gap-3.5 pr-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-red-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-500/30 animate-bounce">
                <AlertOctagon className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-300 text-[10px] font-mono font-black uppercase">
                  <BellRing className="w-3 h-3 animate-ping" /> {tContent.alertModalSeverity}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 leading-tight">
                  {tContent.alertModalTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed font-medium">
                  {tContent.alertModalDesc}
                </p>
              </div>
            </div>

            {/* Spoken Voice Readout Bar inside Alert */}
            <div className="mt-4 p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <Volume2 className="w-4 h-4 text-amber-600 animate-pulse shrink-0" />
                <span>{tContent.voiceLangLabel}: {tContent.alertVoiceWarning}</span>
              </div>
              <button
                onClick={() => playSpokenText(tContent.alertVoiceWarning, tContent.speechCode)}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs uppercase tracking-wider shrink-0 flex items-center gap-1.5 shadow-sm"
              >
                <Volume2 className="w-3.5 h-3.5" /> Re-play
              </button>
            </div>

            {/* Visual Action Checklist ("What to do right now") */}
            <div className="mt-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-blue-600" />
                  {tContent.whatToDoTitle}
                </h3>
                <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                  {tContent.whatToDoSubtitle}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Step 1 */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-red-100 text-red-700 border border-red-200 flex items-center justify-center font-mono font-black text-xs shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{tContent.step1Title}</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{tContent.step1Desc}</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 border border-amber-200 flex items-center justify-center font-mono font-black text-xs shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{tContent.step2Title}</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{tContent.step2Desc}</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center font-mono font-black text-xs shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{tContent.step3Title}</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{tContent.step3Desc}</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 border border-blue-200 flex items-center justify-center font-mono font-black text-xs shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{tContent.step4Title}</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{tContent.step4Desc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href="tel:1554"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-900 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-amber-700" />
                <span>तटरक्षक दल (Coast Guard): <strong>1554</strong></span>
              </a>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setIsAlertModalOpen(false);
                    navigate('/route');
                  }}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/30 transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{tContent.routeNavBtn}</span>
                </button>
                <button
                  onClick={() => setIsAlertModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                >
                  {tContent.dismissAlertBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. TOP ESSENTIAL BAR: Skipper Profile, Live ISRO Feed, Language Selector */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white border border-slate-200 p-4 sm:p-5 rounded-3xl shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-500 flex items-center justify-center text-2xl shrink-0 shadow-md shadow-blue-500/20 text-white">
            ⛵
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-wide">
                {user?.name ? `${tContent.skipperTitle.split(' ')[0]} ${user.name}` : tContent.skipperTitle}
              </h1>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                {tContent.activeVoyage}
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <strong className="text-slate-800 font-mono">{vesselLat.toFixed(2)}°N, {vesselLon.toFixed(2)}°E</strong>
              <span>• {tContent.homePortLabel}: <span className="text-slate-700 font-medium">{tContent.homePortName}</span></span>
            </p>
          </div>
        </div>

        {/* Live Status Pill & Multi-Language Switcher */}
        <div className="flex items-center gap-2.5 flex-wrap self-end md:self-center">
          {/* Test Live Hazard Alert Button */}
          <button
            onClick={triggerHazardAlert}
            className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 border border-red-300 rounded-full text-xs font-mono font-bold text-red-700 flex items-center gap-1.5 shadow-sm transition-all"
            title="Click to trigger emergency alert modal in selected language"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-600 animate-bounce" />
            <span>{tContent.simulateAlertBtn}</span>
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-300 rounded-full text-xs font-mono font-bold text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>ISRO & INCOIS LIVE</span>
          </div>

          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl p-1 gap-1 overflow-x-auto max-w-full shadow-inner">
            <Globe className="w-3.5 h-3.5 text-blue-600 ml-1.5 mr-0.5 shrink-0 hidden sm:inline" />
            {LANG_PILLS.map((l) => {
              const isActive = currentLangCode === l.code;
              return (
                <button
                  key={l.code}
                  onClick={() => {
                    setLanguage(l.code);
                    toast.success(`🌐 भाषा बदलली: ${l.label}`);
                  }}
                  className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm font-black'
                      : 'text-slate-600 hover:text-blue-700 hover:bg-white'
                  }`}
                >
                  {l.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. THE CORE DECISION BANNER (GO / NO-GO DIRECT GUIDANCE + VOICE AUDIO) */}
      <Card className="glass-card border-2 border-emerald-400 bg-gradient-to-r from-emerald-50/90 via-teal-50/80 to-blue-50/90 p-6 sm:p-7 rounded-3xl shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 flex-1">
            {/* Status Tag */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-600 text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
                {tContent.safeBadge}
              </span>
              <span className="text-xs text-slate-500 font-medium hidden md:inline">
                {tContent.aiVerified}
              </span>
            </div>

            {/* Big Actionable Verdict */}
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
              {tContent.mainHeadline}
            </h2>

            {/* Clear Plain Guidance Box */}
            <div className="p-4 rounded-2xl bg-white border border-emerald-200 text-sm text-slate-700 leading-relaxed shadow-sm">
              <p className="font-bold text-emerald-800 flex items-center gap-2 mb-1 text-sm sm:text-base">
                <Clock className="w-4 h-4 text-amber-600" />
                {tContent.returnWindowLabel}
              </p>
              <p className="text-xs sm:text-sm text-slate-600">
                {tContent.returnWindowDesc}
              </p>
            </div>
          </div>

          {/* Large Spoken Voice Announcement Button */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={handlePlayVoiceAdvisory}
              className={`py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all shadow-md ${
                isPlayingAudio
                  ? 'bg-amber-500 hover:bg-amber-600 text-white animate-pulse'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-6 h-6 animate-spin" /> {tContent.stopAudioBtn}
                </>
              ) : (
                <>
                  <Volume2 className="w-6 h-6" /> {tContent.listenAudioBtn}
                </>
              )}
            </button>

            <button
              onClick={() => navigate('/ask')}
              className="py-3 px-5 rounded-2xl bg-white hover:bg-blue-50 border border-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-blue-600" /> {tContent.speakOrcaBtn}
            </button>
          </div>
        </div>
      </Card>

      {/* 3. ONLY 3 ESSENTIAL METRICS CARDS (EXACT & CLEAR FOR FISHERMEN) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: Potential Fishing Zone */}
        <div
          onClick={() => navigate('/fishing')}
          className="bg-white border-2 border-emerald-100 hover:border-emerald-500 p-5 rounded-3xl flex items-center gap-4 cursor-pointer transition-all hover:shadow-md group"
        >
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-105 transition-transform">
            <Fish className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest block font-mono">
              {tContent.fishProbTitle}
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">{tContent.fishProbValue}</span>
            <span className="text-xs text-slate-600 block mt-0.5 font-medium">{tContent.fishProbZone}</span>
            <span className="text-[11px] text-slate-500 block">{tContent.fishSpecies}</span>
          </div>
        </div>

        {/* Metric 2: Sea Waves & Wind */}
        <div
          onClick={() => navigate('/safety')}
          className="bg-white border-2 border-blue-100 hover:border-blue-500 p-5 rounded-3xl flex items-center gap-4 cursor-pointer transition-all hover:shadow-md group"
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-105 transition-transform">
            <Waves className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-blue-700 uppercase tracking-widest block font-mono">
              {tContent.waveTitle}
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">{tContent.waveValue}</span>
            <span className="text-xs text-slate-600 block mt-0.5 font-medium">{tContent.waveDesc}</span>
            <span className="text-[11px] text-slate-500 block flex items-center gap-1">
              <Wind className="w-3 h-3 text-blue-600" /> वारे: 16-38 किमी/तास
            </span>
          </div>
        </div>

        {/* Metric 3: Distance to Port & Return Time */}
        <div
          onClick={() => navigate('/route')}
          className="bg-white border-2 border-sky-100 hover:border-sky-500 p-5 rounded-3xl flex items-center gap-4 cursor-pointer transition-all hover:shadow-md group"
        >
          <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0 group-hover:scale-105 transition-transform">
            <Anchor className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-sky-700 uppercase tracking-widest block font-mono">
              {tContent.portDistanceTitle}
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">{tContent.portDistanceValue}</span>
            <span className="text-xs text-slate-600 block mt-0.5 font-medium">{tContent.portDistanceDesc}</span>
            <span className="text-[11px] text-slate-500 block">भरती: सकाळी 11:45 (उंची: +1.8 मी)</span>
          </div>
        </div>
      </div>

      {/* 4. LIVE GPS RADAR MAP & 3D SIMULATION LINK */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-blue-600" />
              {tContent.mapTitle}
            </h3>
            <p className="text-xs text-slate-500">थेट उपग्रह GPS ट्रॅक व सुरक्षित मार्ग (Live GPS Radar)</p>
          </div>

          {/* Direct Link Button to Dedicated 3D Simulation Page */}
          <button
            onClick={() => navigate('/simulation')}
            className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shadow-blue-500/25 transition-all"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>🌊 3D Simulation Video Studio उघडा →</span>
          </button>
        </div>

        {/* Clean Interactive Map */}
        <div className="h-[440px] bg-white border border-slate-200 rounded-3xl overflow-hidden relative shadow-sm">
          <div className="absolute top-4 left-4 z-[400] bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-200 text-xs font-bold text-slate-900 flex items-center gap-2 shadow-sm">
            <Navigation className="w-4 h-4 text-blue-600" /> {tContent.mapTitle}
          </div>

          <MapContainer
            center={[vesselLat, vesselLon]}
            zoom={10}
            scrollWheelZoom={false}
            className="w-full h-full"
            style={{ background: '#F8FAFC' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap'
            />

            {/* Boat Location */}
            <Marker position={[vesselLat, vesselLon]} icon={boatIcon}>
              <Popup className="glass-popup">
                <div className="font-bold text-xs text-slate-900">{tContent.skipperTitle} (Sea Queen VII)</div>
                <div className="text-[10px] text-slate-600">16.99° N, 73.31° E • Speed: 8.5 knots</div>
              </Popup>
            </Marker>

            {/* Home Harbor */}
            <Marker position={harborCoords} icon={harborIcon}>
              <Popup className="glass-popup">
                <div className="font-bold text-xs text-slate-900">{tContent.homePortLabel}: {tContent.homePortName}</div>
                <div className="text-[10px] text-slate-600">Distance: 14.2 km</div>
              </Popup>
            </Marker>

            {/* Recommended PFZ Zone */}
            <Circle
              center={pfzCoords}
              pathOptions={{
                fillColor: '#2563eb',
                color: '#2563eb',
                weight: 2,
                fillOpacity: 0.2,
              }}
              radius={5500}
            >
              <Popup className="glass-popup">
                <div className="font-bold text-xs text-blue-700">Target Fishing Zone AS-03</div>
                <div className="text-[10px] text-slate-600">82% High Catch Density (Mackerel & Tuna)</div>
              </Popup>
            </Circle>

            {/* Dotted Route line */}
            <Polyline
              positions={[[vesselLat, vesselLon], harborCoords]}
              color="#2563eb"
              weight={3}
              dashArray="6, 8"
            />
          </MapContainer>
        </div>
      </div>

      {/* 5. STEP-BY-STEP ACTION GUIDANCE SECTION (WHAT TO DO) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 font-mono">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              {tContent.whatToDoTitle}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">{tContent.whatToDoSubtitle}</p>
          </div>
          <button
            onClick={triggerHazardAlert}
            className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 border border-red-300 rounded-xl text-xs font-bold text-red-700 flex items-center gap-1.5 transition-all shadow-sm"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            <span>{tContent.simulateAlertBtn}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Step 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-red-300 transition-all flex flex-col justify-between group">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-red-100 text-red-700 border border-red-200 flex items-center justify-center font-mono font-black text-xs">
                  1
                </span>
                <span className="text-[10px] text-slate-400 font-mono font-bold">NETS</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-red-700 transition-colors">
                {tContent.step1Title}
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {tContent.step1Desc}
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-all flex flex-col justify-between group">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 border border-amber-200 flex items-center justify-center font-mono font-black text-xs">
                  2
                </span>
                <span className="text-[10px] text-slate-400 font-mono font-bold">HEADING 115°</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                {tContent.step2Title}
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {tContent.step2Desc}
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between group">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center font-mono font-black text-xs">
                  3
                </span>
                <span className="text-[10px] text-slate-400 font-mono font-bold">ROUTE D</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                {tContent.step3Title}
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {tContent.step3Desc}
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between group">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 border border-blue-200 flex items-center justify-center font-mono font-black text-xs">
                  4
                </span>
                <span className="text-[10px] text-slate-400 font-mono font-bold">VHF CH-16</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                {tContent.step4Title}
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {tContent.step4Desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. CRITICAL LIVE ALERTS & SAFETY SHIELD */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 shadow-sm">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 font-mono">
          <AlertTriangle className="w-4 h-4 text-amber-600" /> {tContent.alertsSectionTitle}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Swell Alert */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
            <Waves className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">{tContent.roughnessAlertTitle}</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {tContent.roughnessAlertDesc}
              </p>
            </div>
          </div>

          {/* Border Security Alert */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">{tContent.borderAlertTitle}</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {tContent.borderAlertDesc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 7. GIANT EMERGENCY SOS & COAST GUARD HELPLINE */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Giant SOS Distress Button */}
        <button
          onClick={handleTriggerSOS}
          className={`sm:col-span-2 p-5 rounded-3xl font-black text-lg sm:text-xl flex items-center justify-center gap-3 uppercase tracking-wider transition-all border-2 ${
            sosActive
              ? 'bg-red-600 text-white border-red-700 animate-bounce shadow-xl'
              : 'bg-red-50 hover:bg-red-100 text-red-700 border-red-300 shadow-sm'
          }`}
        >
          <AlertOctagon className="w-8 h-8 text-red-600 animate-pulse" />
          <div className="text-left">
            <div>{sosActive ? tContent.sosActiveText : tContent.sosBtnText}</div>
            <div className="text-[11px] font-mono font-normal lowercase text-red-600">
              {sosActive ? tContent.sosActiveSubtext : tContent.sosSubtext}
            </div>
          </div>
        </button>

        {/* Direct Coast Guard Helpline */}
        <a
          href="tel:1554"
          className="p-5 bg-white hover:bg-blue-50 border border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-1 text-slate-900 font-bold text-sm transition-all shadow-sm group"
        >
          <PhoneCall className="w-6 h-6 text-amber-600 group-hover:scale-110 transition-transform" />
          <span className="text-xs text-slate-500 font-medium">{tContent.helplineLabel}</span>
          <span className="text-xl font-black text-blue-700 font-mono">1554</span>
        </a>
      </div>

      {/* 8. QUICK 1-TAP QUESTIONS FOR FISHERMEN (ASK ORCA) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 shadow-sm">
        <h4 className="text-xs font-bold text-blue-700 uppercase tracking-widest flex items-center gap-2 font-mono">
          <MessageSquare className="w-4 h-4" /> {tContent.quickQuestionsTitle}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {[tContent.q1, tContent.q2, tContent.q3, tContent.q4].map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickQuestion(q)}
              className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-2xl text-left text-xs font-semibold text-slate-800 hover:text-blue-800 transition-all flex items-center justify-between group"
            >
              <span>{q}</span>
              <span className="text-blue-600 text-base group-hover:translate-x-1 transition-transform">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
