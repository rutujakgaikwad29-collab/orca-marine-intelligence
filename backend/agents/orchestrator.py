import asyncio
from typing import Dict, Any
from .domain_agents import WeatherAgent, MarineAgent, SafetyAgent
from .reasoning_agent import ReasoningAgent
from backend.services.marine_fusion_engine import MarineFusionEngine

class AgentOrchestrator:
    """Manages multi-agent parallel execution."""
    
    def __init__(self):
        self.weather_agent = WeatherAgent()
        self.marine_agent = MarineAgent()
        self.safety_agent = SafetyAgent()
        self.reasoning = ReasoningAgent()
        self.fusion = MarineFusionEngine()
        
    async def process_query(self, query: str, lat: float, lon: float) -> Dict[str, Any]:
        """Orchestrate the entire pipeline from data fusion to final reasoning."""
        
        # 1. Fetch live fused data (Phase 4 requirement)
        marine_state = self.fusion.get_fused_marine_state(lat, lon)
        
        # 2. Run domain agents concurrently
        results = await asyncio.gather(
            self.weather_agent.analyze(marine_state),
            self.marine_agent.analyze(marine_state),
            self.safety_agent.analyze(marine_state)
        )
        
        # 3. Pass to Reasoning Engine
        final_verdict = self.reasoning.generate_recommendation(list(results))
        
        return {
            "query": query,
            "data_context": marine_state,
            "agent_outputs": results,
            "reasoning": final_verdict
        }

orchestrator = AgentOrchestrator()
