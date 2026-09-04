import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle } from '../ui/Card';
import { Cpu, Bot, Sparkles, Activity, ShieldAlert, ArrowRight, Zap, Info } from 'lucide-react';
import { mockAgentData } from '../../data/mockAgentData';
import type { AgentInfo } from '../../data/mockAgentData';

interface AgentNetworkGraphProps {
  onSelectAgent: (agent: AgentInfo) => void;
  selectedAgentId?: string;
}

export const AgentNetworkGraph = ({ onSelectAgent, selectedAgentId }: AgentNetworkGraphProps) => {
  const { agents } = mockAgentData;
  const [coreStatusIndex, setCoreStatusIndex] = useState(0);

  const coreStatuses = [
    'ORCHESTRATING MULTI-AGENT INFERENCE',
    'VALIDATING OCEANOGRAPHIC CONSTRAINTS',
    'EVALUATING PARETO ROUTE CANDIDATES',
    'SYNTHESIZING FINAL DECISION CONSENSUS',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCoreStatusIndex((prev) => (prev + 1) % coreStatuses.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Geometry for 8 agents positioned symmetrically in a circle around center (cx: 300, cy: 300, r: 210)
  const cx = 300;
  const cy = 300;
  const radius = 210;

  const agentPositions = agents.map((ag, idx) => {
    // 8 positions: angle = (idx * 360 / 8) - 90 deg (start top)
    const angleDeg = idx * 45 - 90;
    const angleRad = (angleDeg * Math.PI) / 180;
    const x = cx + radius * Math.cos(angleRad);
    const y = cy + radius * Math.sin(angleRad);
    return { ...ag, x, y, angleDeg };
  });

  return (
    <Card className="h-full flex flex-col relative overflow-hidden glass-card bg-gradient-to-b from-[#11111A] to-[#0D0D15]">
      <CardHeader className="pb-3 border-b border-white/5 flex flex-wrap items-center justify-between bg-[#1C1B2B]/40 z-20 relative backdrop-blur-md px-4 py-3">
        <div className="flex items-center gap-2.5">
          <Cpu className="h-4 w-4 text-bio-mint drop-shadow-[0_0_8px_rgba(62,240,181,0.6)]" />
          <CardTitle className="text-sm font-semibold uppercase tracking-widest text-soft-white">
            RADIAL MULTI-AGENT COLLABORATION NETWORK
          </CardTitle>
        </div>
        <span className="text-[10px] text-cool-gray font-mono">
          Interactive Neural Topology • Click Agent to Inspect
        </span>
      </CardHeader>

      <div className="flex-1 w-full relative flex items-center justify-center p-2 min-h-[520px] lg:min-h-[580px] overflow-hidden">
        {/* Ambient Neural background glow */}
        <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-40"></div>

        <svg
          viewBox="0 0 600 600"
          className="w-full h-full max-w-[620px] max-h-[620px] relative z-10 select-none"
        >
          <defs>
            {/* Radial glow filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Core glowing linear gradient */}
            <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#11111A" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#3EF0B5" stopOpacity="0.2" />
            </radialGradient>
          </defs>

          {/* Concentric Background Orbital Rings */}
          <circle cx={cx} cy={cy} r={210} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx={cx} cy={cy} r={140} fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="1" strokeDasharray="8 8" className="animate-[spin_40s_linear_infinite]" style={{ transformOrigin: 'center' }} />
          <circle cx={cx} cy={cy} r={75} fill="none" stroke="rgba(62,240,181,0.25)" strokeWidth="1" />

          {/* SVG Animated Communication Lines from Center to each Agent */}
          {agentPositions.map((ag) => (
            <g key={`link-${ag.id}`}>
              {/* Static background dashed link */}
              <line
                x1={cx}
                y1={cy}
                x2={ag.x}
                y2={ag.y}
                stroke={ag.strokeColor}
                strokeWidth="1.5"
                strokeOpacity="0.3"
                strokeDasharray="4 4"
              />

              {/* Animated traveling glowing data particle */}
              <line
                x1={cx}
                y1={cy}
                x2={ag.x}
                y2={ag.y}
                stroke={ag.strokeColor}
                strokeWidth="2.5"
                strokeDasharray="8 60"
                className="animate-[dash_2.5s_linear_infinite]"
                filter="url(#glow)"
              />
            </g>
          ))}

          {/* Cross-Agent Peer Communication Links */}
          <path
            d={`M ${agentPositions[1].x} ${agentPositions[1].y} Q ${cx} ${cy - 80} ${agentPositions[3].x} ${agentPositions[3].y}`}
            fill="none"
            stroke="#FFB547"
            strokeWidth="1.2"
            strokeDasharray="4 8"
            strokeOpacity="0.4"
            className="animate-[dash_3s_linear_infinite]"
          />
          <path
            d={`M ${agentPositions[3].x} ${agentPositions[3].y} Q ${cx + 80} ${cy} ${agentPositions[4].x} ${agentPositions[4].y}`}
            fill="none"
            stroke="#FF5C77"
            strokeWidth="1.2"
            strokeDasharray="4 8"
            strokeOpacity="0.4"
            className="animate-[dash_3s_linear_infinite]"
          />
          <path
            d={`M ${agentPositions[4].x} ${agentPositions[4].y} Q ${cx} ${cy + 80} ${agentPositions[5].x} ${agentPositions[5].y}`}
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="1.2"
            strokeDasharray="4 8"
            strokeOpacity="0.4"
            className="animate-[dash_3s_linear_infinite]"
          />

          {/* =======================================================
              CENTRAL ORCA AI CORE NODE
          ======================================================= */}
          <g className="cursor-pointer" onClick={() => onSelectAgent(agents[7])}>
            {/* Outer pulsating core halo */}
            <circle
              cx={cx}
              cy={cy}
              r={60}
              fill="url(#coreGrad)"
              stroke="#8B5CF6"
              strokeWidth="2"
              className="drop-shadow-[0_0_25px_rgba(139,92,246,0.6)] animate-pulse-slow"
            />
            <circle
              cx={cx}
              cy={cy}
              r={46}
              fill="#0B0B12"
              stroke="#3EF0B5"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              className="animate-[spin_20s_linear_infinite]"
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />

            {/* Central Icon and Branding */}
            <text x={cx} y={cy - 12} textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" letterSpacing="2">
              🤖 ORCA CORE
            </text>
            <text x={cx} y={cy + 6} textAnchor="middle" fill="#3EF0B5" fontSize="8" fontWeight="bold" fontFamily="monospace">
              8 AGENTS LINKED
            </text>
            <text x={cx} y={cy + 18} textAnchor="middle" fill="#A0A0B0" fontSize="7" fontFamily="monospace">
              CONFIDENCE 91%
            </text>
          </g>

          {/* =======================================================
              8 RADIAL AGENT NODES
          ======================================================= */}
          {agentPositions.map((ag) => {
            const isSelected = selectedAgentId === ag.id;

            return (
              <g
                key={ag.id}
                className="cursor-pointer group/node"
                onClick={() => onSelectAgent(ag)}
                transform={`translate(${ag.x}, ${ag.y})`}
              >
                {/* Outer Glow Halo on selection / hover */}
                <circle
                  cx={0}
                  cy={0}
                  r={isSelected ? 36 : 30}
                  fill="#11111A"
                  stroke={ag.strokeColor}
                  strokeWidth={isSelected ? 3 : 1.5}
                  className={`transition-all duration-300 ${
                    isSelected
                      ? 'drop-shadow-[0_0_20px_currentColor]'
                      : 'group-hover/node:stroke-soft-white group-hover/node:scale-110'
                  }`}
                  style={{ color: ag.strokeColor }}
                />

                {/* Agent Icon (Emoji in SVG) */}
                <text x={0} y={-4} textAnchor="middle" fontSize="16" dominantBaseline="middle">
                  {ag.icon}
                </text>

                {/* Agent Short Code */}
                <text
                  x={0}
                  y={14}
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="8"
                  fontWeight="bold"
                  letterSpacing="1"
                  fontFamily="monospace"
                >
                  {ag.shortName}
                </text>

                {/* Status Indicator Dot */}
                <circle
                  cx={18}
                  cy={-18}
                  r={4}
                  fill={ag.status === 'WARNING' ? '#FFB547' : ag.status === 'ERROR' ? '#FF5C77' : '#3EF0B5'}
                  className="animate-pulse"
                />

                {/* Confidence Badge Pill below node */}
                <g transform="translate(0, 42)">
                  <rect
                    x={-28}
                    y={-8}
                    width={56}
                    height={14}
                    rx={7}
                    fill="#0B0B12"
                    stroke={ag.strokeColor}
                    strokeWidth={0.8}
                    strokeOpacity={0.6}
                  />
                  <text x={0} y={2} textAnchor="middle" fill="#E2E8F0" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                    {ag.confidence}% Trust
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Bottom Status Rotator Bar */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between bg-[#11111A]/95 border border-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-bio-mint animate-pulse"></span>
            <span className="text-[10px] font-mono font-bold text-soft-white uppercase">
              ORCA REASONING STATE: <strong className="text-bio-mint">{coreStatuses[coreStatusIndex]}</strong>
            </span>
          </div>

          <span className="text-[9px] font-mono text-cool-gray hidden sm:block">
            Decentralized Marine Actor Framework (LangGraph Topology)
          </span>
        </div>
      </div>
    </Card>
  );
};
