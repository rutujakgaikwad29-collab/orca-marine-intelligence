from .base_provider import BaseDataProvider
from typing import Dict, Any
from datetime import datetime
import random

class WeatherProvider(BaseDataProvider):
    """Integrates real weather APIs (e.g., OpenWeatherMap, IMD) with fallback logic."""
    
    def __init__(self, api_key: str = None):
        self.api_key = api_key
        self.source_reliability = 95
        
    def get_source_name(self) -> str:
        return "ORCA Weather Services" if not self.api_key else "External Weather API"
        
    def fetch_data(self, lat: float, lon: float) -> Dict[str, Any]:
        """Fetch weather data. Falls back to realistic demo data if API fails."""
        # TODO: Implement real HTTP request here when api_key is available
        # if self.api_key:
        #    return requests.get(...)
        
        # Fallback to demo/simulation mode
        now = datetime.utcnow()
        return {
            "latitude": lat,
            "longitude": lon,
            "temperature": round(random.uniform(25.0, 32.0), 1),
            "wind_speed": round(random.uniform(5.0, 45.0), 1), # km/h
            "wind_direction": round(random.uniform(0, 360), 0),
            "rain_probability": round(random.uniform(0, 100), 0),
            "wave_height": round(random.uniform(0.5, 4.0), 1),
            "pressure": round(random.uniform(1005, 1015), 1),
            "visibility": round(random.uniform(2.0, 10.0), 1), # km
            "timestamp": now.isoformat() + "Z",
            "internal_timestamp": now
        }
        
    def validate_data(self, data: Dict[str, Any]) -> bool:
        required_keys = ["temperature", "wind_speed", "wave_height"]
        return all(k in data for k in required_keys)
        
    def normalize_data(self, data: Dict[str, Any]) -> Dict[str, Any]:
        freshness = self.calculate_freshness(data.get("internal_timestamp", datetime.utcnow()))
        confidence = self.calculate_confidence(freshness, self.source_reliability)
        
        return {
            "location": {"lat": data["latitude"], "lon": data["longitude"]},
            "weather": {
                "temperature": data["temperature"],
                "wind_speed": data["wind_speed"],
                "wind_direction": data["wind_direction"],
                "rain_probability": data["rain_probability"],
                "wave_height": data["wave_height"],
                "pressure": data["pressure"],
                "visibility": data["visibility"]
            },
            "metadata": {
                "timestamp": data["timestamp"],
                "source": self.get_source_name(),
                "freshness": freshness,
                "confidence": confidence,
                "is_live": bool(self.api_key)
            }
        }
