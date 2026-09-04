from .data_sources.weather_provider import WeatherProvider
from .data_sources.ocean_provider import OceanProvider
from typing import Dict, Any

class MarineFusionEngine:
    """Fuses data from multiple sources to provide a unified marine state."""
    
    def __init__(self):
        self.weather = WeatherProvider()
        self.ocean = OceanProvider()
        
    def get_fused_marine_state(self, lat: float, lon: float) -> Dict[str, Any]:
        """Fetch, validate, and normalize data from all sources."""
        
        # 1. Fetch
        raw_weather = self.weather.fetch_data(lat, lon)
        raw_ocean = self.ocean.fetch_data(lat, lon)
        
        # 2. Validate
        weather_valid = self.weather.validate_data(raw_weather)
        ocean_valid = self.ocean.validate_data(raw_ocean)
        
        # 3. Normalize
        norm_weather = self.weather.normalize_data(raw_weather) if weather_valid else {}
        norm_ocean = self.ocean.normalize_data(raw_ocean) if ocean_valid else {}
        
        # 4. Data Fusion & Confidence Calculation
        # In a real scenario, this would handle conflicting values (e.g. wave height from weather vs ocean)
        
        weather_conf = norm_weather.get("metadata", {}).get("confidence", 0)
        ocean_conf = norm_ocean.get("metadata", {}).get("confidence", 0)
        
        overall_confidence = (weather_conf + ocean_conf) / 2 if (weather_conf and ocean_conf) else 0
        
        return {
            "location": {"lat": lat, "lon": lon},
            "environment": {
                **norm_weather.get("weather", {}),
                **norm_ocean.get("ocean", {})
            },
            "fusion_metadata": {
                "overall_confidence": overall_confidence,
                "sources_used": [
                    norm_weather.get("metadata", {}).get("source", "Unknown"),
                    norm_ocean.get("metadata", {}).get("source", "Unknown")
                ],
                "status": "LIVE" if (norm_weather.get("metadata", {}).get("is_live") or norm_ocean.get("metadata", {}).get("is_live")) else "SIMULATED"
            }
        }
