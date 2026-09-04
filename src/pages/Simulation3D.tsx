import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import {
  Play,
  Pause,
  Maximize,
  Volume2,
  VolumeX,
  Compass,
  Radio,
  Sparkles,
  Waves,
  Fish,
  Anchor,
  Navigation,
  Activity,
  Layers,
  ShieldAlert,
  RotateCcw,
  Zap,
  Globe,
  Sliders,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';
import { useAppStore } from '../store/useAppStore';

const SIMULATION_SCENARIOS = [
  {
    id: 'patrol',
    title: '🐟 Potential Fishing Zone (PFZ) Scan',
    desc: 'Simulating sea surface temperature (SST) fronts & chlorophyll-a density in Zone AS-03 (23 km West).',
    badge: 'HIGH CATCH • 82%',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    depth: '32m',
    wave: '1.4m',
    speed: '8.5 knots',
    heading: '275° W',
    voiceNote: 'Now simulating target fishing zone AS-03. High school density of Indian Mackerel detected at 32 meters depth.'
  },
  {
    id: 'evacuation',
    title: '🚨 Emergency Evacuation Simulation (Heading 115° E)',
    desc: 'Visualizing emergency escape channel to Mirkarwada Port during 2.8m wave surge.',
    badge: 'EVACUATION ROUTE D',
    badgeColor: 'bg-red-100 text-red-800 border-red-300',
    depth: '18m',
    wave: '2.8m',
    speed: '11.2 knots',
    heading: '115° E',
    voiceNote: 'Evacuation simulation active. Vessel steering course 115 degrees East along sheltered Route D to Mirkarwada Port.'
  },
  {
    id: 'subsurface',
    title: '🌊 Subsurface Thermocline & Current Mesh',
    desc: 'Deep bathymetric contour mapping and subsurface current velocity flow models.',
    badge: 'ISRO MOSDAC 3D',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    depth: '64m',
    wave: '1.8m',
    speed: '6.0 knots',
    heading: '180° S',
    voiceNote: 'Subsurface current vectors mapped. Thermocline boundary established at 28 meters.'
  },
  {
    id: 'harbor',
    title: '⚓ Safe Harbor Approach & Docking Simulation',
    desc: 'Navigational channel alignment and high tide clearance at Mirkarwada Port basin.',
    badge: 'PORT ENTRANCE',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    depth: '9m',
    wave: '0.6m',
    speed: '4.2 knots',
    heading: '090° E',
    voiceNote: 'Harbor approach simulation. Channel depth clearance 9 meters. High tide at 11:45 AM.'
  }
];

const CAMERA_VIEWS = [
  { id: 'orbital', label: '🛰️ Satellite Orbital View' },
  { id: 'bridge', label: '🧭 Vessel Helm 3D View' },
  { id: 'underwater', label: '🐟 Underwater Sonar View' },
  { id: 'channel', label: '⚓ Coastal Channel Route' }
];

export const Simulation3D: React.FC = () => {
  const { language } = useAppStore();
  const [selectedScenario, setSelectedScenario] = useState(SIMULATION_SCENARIOS[0]);
  const [activeCam, setActiveCam] = useState('orbital');

  // Video State
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [durationTime, setDurationTime] = useState('00:00');
  const [progressPercent, setProgressPercent] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cloudinary HD 3D simulation video
  const videoSrc = "https://res.cloudinary.com/z4g3pbqt/video/upload/v1788458062/WhatsApp_Video_2026-09-02_at_9.50.06_PM_1.mp4";

  // Dynamic ambient glow canvas reflection
  useEffect(() => {
    let animationFrameId: number;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderGlow = () => {
      if (video.readyState >= 2 && !video.paused && !video.ended) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
      animationFrameId = requestAnimationFrame(renderGlow);
    };

    renderGlow();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 1;
      setCurrentTime(formatTime(current));
      setDurationTime(formatTime(duration));
      setProgressPercent((current / duration) * 100);
    }
  };

  const togglePlayVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = (val / 100) * videoRef.current.duration;
      setProgressPercent(val);
    }
  };

  const handleSpeedChange = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
      toast.info(`Playback speed set to ${speed}x`);
    }
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  // Spoken voice narration for the simulation scenario
  const playScenarioVoice = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.lang = 'en-IN';
    window.speechSynthesis.speak(utterance);
    toast.success("🔊 Spoken audio narration enabled");
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto pb-16 fade-in text-slate-900 selection:bg-blue-600 selection:text-white">
      
      {/* 1. HEADER BAR: 3D Studio Title & Active Scenario Pill */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white border border-slate-200 p-5 rounded-3xl shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-500 flex items-center justify-center text-white text-2xl shrink-0 shadow-md shadow-blue-500/20">
            🌊
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-wide">
                ORCA 3D Marine Simulation Studio
              </h1>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold uppercase">
                Digital Twin • 60 FPS
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Realistic ocean hydrodynamic rendering & satellite telemetry simulation</span>
            </p>
          </div>
        </div>

        {/* Live Simulation Status Indicator */}
        <div className="flex items-center gap-2 self-end md:self-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-300 rounded-full text-xs font-mono font-bold text-emerald-800">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>SIMULATION ENGINE LIVE</span>
          </div>
        </div>
      </div>

      {/* 2. THE MAIN 3D SIMULATION VIDEO SCREEN WITH AMBIENT LIGHT */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-white border-2 border-slate-200 shadow-xl group">
        
        {/* Ambient Backlight Glow Canvas */}
        <canvas
          ref={canvasRef}
          width={64}
          height={36}
          className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 pointer-events-none transition-opacity duration-700 scale-110"
        />

        {/* The 3D Simulation Video Player */}
        <div className="relative z-10 w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            muted={isMuted}
            autoPlay
            loop
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsVideoPlaying(true)}
            onPause={() => setIsVideoPlaying(false)}
            className="w-full h-full object-cover cursor-pointer"
            onClick={togglePlayVideo}
          />

          {/* Top Floating Overlay Telemetry HUD */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none z-20">
            <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-2xl text-xs font-bold text-white shadow-lg">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span className="font-mono text-cyan-300">{selectedScenario.badge}</span>
              <span className="text-white/60">|</span>
              <span className="text-white font-mono">{activeCam.toUpperCase()} VIEW</span>
            </div>

            {/* Depth & Wave Telemetry */}
            <div className="hidden sm:flex items-center gap-3 bg-black/70 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-2xl text-xs text-white shadow-lg font-mono">
              <div className="flex items-center gap-1.5">
                <Fish className="w-3.5 h-3.5 text-emerald-400" />
                <span>Depth: <strong className="text-emerald-300">{selectedScenario.depth}</strong></span>
              </div>
              <span className="text-white/40">•</span>
              <div className="flex items-center gap-1.5">
                <Waves className="w-3.5 h-3.5 text-cyan-400" />
                <span>Wave: <strong className="text-cyan-300">{selectedScenario.wave}</strong></span>
              </div>
              <span className="text-white/40">•</span>
              <div className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>Heading: <strong className="text-amber-300">{selectedScenario.heading}</strong></span>
              </div>
            </div>
          </div>

          {/* Big Center Play Icon (if paused) */}
          {!isVideoPlaying && (
            <button
              onClick={togglePlayVideo}
              className="absolute z-20 w-20 h-20 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer"
            >
              <Play className="w-10 h-10 ml-1 fill-white" />
            </button>
          )}

          {/* Bottom Player Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 flex flex-col gap-2 z-20 transition-opacity">
            {/* Timeline Scrubber */}
            <div className="flex items-center gap-3 text-xs font-mono text-white">
              <span>{currentTime}</span>
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progressPercent}
                onChange={handleSeek}
                className="flex-1 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <span>{durationTime}</span>
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between gap-3 text-white">
              <div className="flex items-center gap-3">
                {/* Play / Pause */}
                <button
                  onClick={togglePlayVideo}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  {isVideoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
                </button>

                {/* Mute / Unmute */}
                <button
                  onClick={handleToggleMute}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
                </button>

                {/* Spoken Voice Narration button */}
                <button
                  onClick={() => playScenarioVoice(selectedScenario.voiceNote)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Spoken Brief
                </button>
              </div>

              {/* Right: Playback Speed & Fullscreen */}
              <div className="flex items-center gap-2">
                {[1.0, 1.25, 1.5, 2.0].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => handleSpeedChange(spd)}
                    className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                      playbackSpeed === spd
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/10 text-gray-300 hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}

                <button
                  onClick={handleFullscreen}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors ml-2"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CAMERA PERSPECTIVE SWITCHER */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mr-2 font-mono shrink-0">
          Camera Angle:
        </span>
        {CAMERA_VIEWS.map((cam) => {
          const isSelected = activeCam === cam.id;
          return (
            <button
              key={cam.id}
              onClick={() => {
                setActiveCam(cam.id);
                toast.info(`Switched to ${cam.label}`);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 border ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 font-black'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              {cam.label}
            </button>
          );
        })}
      </div>

      {/* 4. INTERACTIVE 3D SIMULATION SCENARIO SELECTOR */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 font-mono">
            <Sliders className="w-4 h-4 text-blue-600" />
            Select Operational Simulation Scenario
          </h3>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Click any scenario to simulate vessel trajectory & marine physics
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {SIMULATION_SCENARIOS.map((scenario) => {
            const isSelected = selectedScenario.id === scenario.id;
            return (
              <div
                key={scenario.id}
                onClick={() => {
                  setSelectedScenario(scenario);
                  playScenarioVoice(scenario.voiceNote);
                  toast.success(`Active Scenario: ${scenario.title}`);
                }}
                className={`p-4 rounded-3xl cursor-pointer transition-all border-2 flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-white border-blue-600 shadow-lg shadow-blue-500/10 scale-[1.02]'
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-1">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border ${scenario.badgeColor}`}>
                      {scenario.badge}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    )}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {scenario.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                    {scenario.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Speed: <strong className="text-slate-900">{scenario.speed}</strong></span>
                  <span>Heading: <strong className="text-blue-700">{scenario.heading}</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
