import React, { useState, useEffect, useRef } from 'react';
import { Video, Image as ImageIcon, Layers } from 'lucide-react';

interface Hero3DBackgroundProps {
  opacity?: number;
  showControls?: boolean;
}

export const Hero3DBackground: React.FC<Hero3DBackgroundProps> = ({
  opacity = 0.55,
  showControls = true,
}) => {
  const [mode, setMode] = useState<'video' | '3d-image'>('video');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);

  // 3D rendered marine scenes from the project assets
  const scenes = [
    {
      src: '/marine_3d_bathymetry_radar.jpg',
      title: '3D Ocean Sonar',
    },
    {
      src: '/ocean_cyclone_vortex.jpg',
      title: '3D Atmospheric Swell',
    },
    {
      src: '/futuristic_vessel_1788198847211.jpg',
      title: 'Vessel Digital Twin',
    },
    {
      src: '/ocean_data_grid_1788198867746.jpg',
      title: 'Sensor Neural Mesh',
    },
    {
      src: '/ocean_earth_satellite.jpg',
      title: 'Orbital SST Radar',
    }
  ];

  // High quality streaming marine video loop from aquanova simulation
  const videoSources = [
    'https://res.cloudinary.com/z4g3pbqt/video/upload/v1788458062/WhatsApp_Video_2026-09-02_at_9.50.06_PM_1.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-waves-crashing-on-the-beach-40114-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-deep-underwater-sun-rays-in-the-ocean-41559-large.mp4'
  ];

  const [currentVideo, setCurrentVideo] = useState(videoSources[0]);

  // Subtle 3D mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 24;
      const y = (e.clientY / innerHeight - 0.5) * 24;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Automatic gentle crossfade for 3D imagery mode
  useEffect(() => {
    if (mode !== '3d-image') return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % scenes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [mode, scenes.length]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 rounded-3xl">
      {/* 1. Dynamic Video / 3D Layer */}
      {mode === 'video' ? (
        <div
          className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out"
          style={{
            transform: `scale(1.1) translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0)`,
          }}
        >
          <video
            ref={videoRef}
            src={currentVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center filter saturate-150 brightness-75 contrast-125 transition-opacity duration-1000"
            style={{ opacity }}
            onError={() => setMode('3d-image')}
          />
        </div>
      ) : (
        <div
          className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-out"
          style={{
            transform: `scale(1.08) translate3d(${mousePos.x * 0.7}px, ${mousePos.y * 0.7}px, 0)`,
          }}
        >
          {scenes.map((scene, idx) => (
            <div
              key={scene.src}
              className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
                idx === currentImageIndex ? 'opacity-70 scale-100' : 'opacity-0 scale-105'
              }`}
              style={{
                backgroundImage: `url('${scene.src}')`,
                filter: 'brightness(0.7) contrast(1.2) saturate(1.3)',
              }}
            />
          ))}
        </div>
      )}

      {/* 2. 3D Bioluminescent Gradient & Abyssal Blending */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12] via-[#0B0B12]/80 to-[#0B0B12]/40 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B12]/90 via-transparent to-[#0B0B12]/85 z-10" />

      {/* Living animated digital scanlines & depth glow */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-bio-mint/15 to-transparent mix-blend-screen opacity-40 animate-pulse pointer-events-none z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-aurora-violet/20 rounded-full blur-3xl pointer-events-none z-10" />

      {/* 3. Subtle Controls Badge */}
      {showControls && (
        <div className="absolute top-3 right-3 z-30 pointer-events-auto flex items-center gap-1.5 bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-[10px] text-cool-gray shadow-lg">
          <button
            onClick={() => setMode(mode === 'video' ? '3d-image' : 'video')}
            className="flex items-center gap-1 hover:text-bio-mint transition-colors px-1"
            title="Toggle 3D Live Sea Video / 3D Sonar View"
          >
            {mode === 'video' ? (
              <>
                <Video className="w-3 h-3 text-bio-mint animate-pulse" />
                <span className="font-mono font-bold text-soft-white">3D Live Sea</span>
              </>
            ) : (
              <>
                <ImageIcon className="w-3 h-3 text-electric-lavender" />
                <span className="font-mono font-bold text-soft-white">3D Sonar</span>
              </>
            )}
          </button>
          <span className="text-white/20">|</span>
          <button
            onClick={() => {
              if (mode === 'video') {
                setCurrentVideo(prev => prev === videoSources[0] ? videoSources[1] : videoSources[0]);
              } else {
                setCurrentImageIndex(prev => (prev + 1) % scenes.length);
              }
            }}
            className="hover:text-soft-white font-mono px-1 flex items-center gap-1"
            title="Switch 3D Scene"
          >
            <Layers className="w-2.5 h-2.5 text-solar-amber" />
            <span>Switch</span>
          </button>
        </div>
      )}
    </div>
  );
};
