import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';

import { mockAgentData } from '../data/mockAgentData';
import type { AgentInfo, AgentMessage, ScenarioDefinition } from '../data/mockAgentData';

import { AgentHeroHeader } from '../components/agents/AgentHeroHeader';
import { AgentNetworkGraph } from '../components/agents/AgentNetworkGraph';
import { AgentCardGrid } from '../components/agents/AgentCardGrid';
import { AgentDetailModal } from '../components/agents/AgentDetailModal';
import { LiveActivityFeed } from '../components/agents/LiveActivityFeed';
import { MessageInspectorModal } from '../components/agents/MessageInspectorModal';
import { CollaborationPipeline } from '../components/agents/CollaborationPipeline';
import { ConflictResolutionPanel } from '../components/agents/ConflictResolutionPanel';
import { DecisionPriorityHierarchy } from '../components/agents/DecisionPriorityHierarchy';
import { DecisionReplayPlayer } from '../components/agents/DecisionReplayPlayer';
import { WhatIfAgentSimulator } from '../components/agents/WhatIfAgentSimulator';
import { AgentHealthConfidence } from '../components/agents/AgentHealthConfidence';
import { AgentFailureFallback } from '../components/agents/AgentFailureFallback';
import { SharedStatePanel } from '../components/agents/SharedStatePanel';
import { ScenarioSelector } from '../components/agents/ScenarioSelector';

export const AgentMonitor = () => {
  const [selectedAgent, setSelectedAgent] = useState<AgentInfo | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<AgentMessage | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<ScenarioDefinition>(mockAgentData.scenarios[0]);

  const handleStartJudgeDemo = () => {
    const el = document.getElementById('decision-replay');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-12 fade-in">
      {/* 1. CINEMATIC AI COMMAND-CENTER HERO HEADER */}
      <section>
        <AgentHeroHeader
          onStartJudgeDemo={handleStartJudgeDemo}
          activeScenarioTitle={selectedScenario.title}
        />
      </section>

      {/* 2. SCENARIO SELECTOR */}
      <section>
        <ScenarioSelector
          selectedScenarioId={selectedScenario.id}
          onSelectScenario={setSelectedScenario}
        />
      </section>

      {/* 3 & 4. MAIN RADIAL AGENT NETWORK & LIVE INTER-PROCESS ACTIVITY STREAM */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AgentNetworkGraph
            onSelectAgent={setSelectedAgent}
            selectedAgentId={selectedAgent?.id}
          />
        </div>
        <div className="lg:col-span-1">
          <LiveActivityFeed onInspectMessage={setSelectedMessage} />
        </div>
      </section>

      {/* 5. 8 SPECIALIZED AGENT CARDS */}
      <section>
        <AgentCardGrid
          onSelectAgent={setSelectedAgent}
          selectedAgentId={selectedAgent?.id}
        />
      </section>

      {/* 6. END-TO-END DECISION PIPELINE */}
      <section>
        <CollaborationPipeline />
      </section>

      {/* 7 & 8. CONFLICT RESOLUTION & ARBITRATION HIERARCHY */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConflictResolutionPanel />
        <DecisionPriorityHierarchy />
      </section>

      {/* 9. 60-SECOND DECISION REPLAY & TIMELINE SCRUBBER */}
      <section>
        <DecisionReplayPlayer scenario={selectedScenario} />
      </section>

      {/* 10 & 11. WHAT-IF MULTI-AGENT SIMULATOR & AGENT HEALTH/CONFIDENCE */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WhatIfAgentSimulator />
        <AgentHealthConfidence />
      </section>

      {/* 12 & 13. FAULT TOLERANCE / FALLBACK DEMO & SHARED KNOWLEDGE BLACKBOARD */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AgentFailureFallback />
        <SharedStatePanel />
      </section>

      {/* MODALS */}
      <AgentDetailModal
        agent={selectedAgent}
        onClose={() => setSelectedAgent(null)}
      />

      <MessageInspectorModal
        message={selectedMessage}
        onClose={() => setSelectedMessage(null)}
      />
    </div>
  );
};
