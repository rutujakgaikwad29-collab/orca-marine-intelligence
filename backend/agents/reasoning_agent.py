from typing import Dict, Any, List

class ReasoningAgent:
    """The Explainable AI Engine that resolves conflicts and generates final recommendations."""
    
    def generate_recommendation(self, agent_results: List[Dict[str, Any]]) -> Dict[str, Any]:
        weather = next((a for a in agent_results if a["agent"] == "weather_agent"), {})
        marine = next((a for a in agent_results if a["agent"] == "marine_agent"), {})
        safety = next((a for a in agent_results if a["agent"] == "safety_agent"), {})
        
        reasons = []
        
        # Conflict Resolution (Safety overrides fishing)
        if safety.get("risk_score", 0) > 75:
            final_recommendation = "DO NOT RECOMMEND FISHING"
            reasons.append("⚠ CRITICAL: High safety risk detected (Waves/Hazards).")
        elif weather.get("safety_score", 100) < 50:
            final_recommendation = "MODERATE RISK - PROCEED WITH CAUTION"
            reasons.append("⚠ WARNING: Weather conditions are deteriorating.")
        else:
            final_recommendation = "SAFE FOR FISHING"
            reasons.append("✓ Safety and Weather checks passed.")
            
        if marine.get("suitability_score", 0) > 80:
            reasons.append("✓ Excellent fishing suitability based on SST and Chlorophyll.")
            
        return {
            "final_recommendation": final_recommendation,
            "reasons": reasons,
            "overall_suitability": marine.get("suitability_score", 0),
            "overall_risk": safety.get("risk_score", 0)
        }
