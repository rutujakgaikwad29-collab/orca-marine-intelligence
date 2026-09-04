import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Play, Sparkles, CheckCircle2 } from 'lucide-react';
import { mockAgentData } from '../../data/mockAgentData';
import type { ScenarioDefinition } from '../../data/mockAgentData';

interface ScenarioSelectorProps {
  selectedScenarioId: string;
  onSelectScenario: (scenario: ScenarioDefinition) => void;
}

export const ScenarioSelector = ({
  selectedScenarioId,
  onSelectScenario,
}: ScenarioSelectorProps) => {
  const { scenarios } = mockAgentData;

  return (
    <Card className="glass-card border-white/5 relative overflow-hidden">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-bio-mint">
          <Sparkles className="h-4 w-4" />
          SIH PRESENTATION SCENARIO SELECTOR
        </CardTitle>
        <span className="text-[10px] font-bold text-soft-white font-mono">
          3 Ready-to-Demo Scenarios
        </span>
      </CardHeader>

      <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        {scenarios.map((sc) => {
          const isSelected = selectedScenarioId === sc.id;

          return (
            <div
              key={sc.id}
              onClick={() => onSelectScenario(sc)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between h-28 ${
                isSelected
                  ? 'bg-bio-mint/15 border-bio-mint/60 text-soft-white shadow-[0_0_15px_rgba(62,240,181,0.2)]'
                  : 'bg-white/5 border-white/10 text-cool-gray hover:text-soft-white hover:bg-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-bold text-soft-white">{sc.title}</h4>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-bio-mint" />}
                </div>
                <p className="text-[10px] text-cool-gray line-clamp-2 leading-tight">
                  {sc.desc}
                </p>
              </div>

              <span className={`text-[9px] font-mono font-bold uppercase ${isSelected ? 'text-bio-mint' : 'text-cool-gray'}`}>
                {isSelected ? '● Scenario Loaded' : 'Load Scenario'}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
