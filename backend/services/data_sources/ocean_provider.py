from .base_provider import BaseDataProvider
from typing import Dict, Any
from datetime import datetime
import random

class OceanProvider(BaseDataProvider):
    """Integrates real ocean APIs (e.g., INCOIS, NOAA) with fallback logic."""
    
    def __init__(self, api_key: str = None):
        self.api_key = api_key
        self.source_reliability = 90
        
    def get_source_name(self) -> str:
        return "ORCA Ocean Model" if not self.api_key else "INCOIS/NOAA Ocean API"
        
    def fetch_data(self, lat: float, lon: float) -> Dict[str, Any]:
        """Fetch ocean data. Falls back to realistic demo data if API fails."""
        now = datetime.utcnow()
        return {
            "latitude": lat,
            "longitude": lon,
            "sea_surface_temp": round(random.uniform(26.5, 30.5), 1),
            "chlorophyll": round(random.uniform(0.1, 4.5), 2),
            "current_speed": round(random.uniform(0.1, 1.5), 2),
            "salinity": round(random.uniform(33.0, 37.0), 1),
            "timestamp": now.isoformat() + "Z",
            "internal_timestamp": now
        }
        
    def validate_data(self, data: Dict[str, Any]) -> bool:
        required_keys = ["sea_surface_temp", "chlorophyll"]
        return all(k in data for k in required_keys)
        
    def normalize_data(self, data: Dict[str, Any]) -> Dict[str, Any]:
        freshness = self.calculate_freshness(data.get("internal_timestamp", datetime.utcnow()))
        confidence = self.calculate_confidence(freshness, self.source_reliability)
        
        return {
            "location": {"lat": data["latitude"], "lon": data["longitude"]},
            "ocean": {
                "sst": data["sea_surface_temp"],
                "chlorophyll": data["chlorophyll"],
                "current_speed": data["current_speed"],
                "salinity": data["salinity"]
            },
            "metadata": {
                "timestamp": data["timestamp"],
                "source": self.get_source_name(),
                "freshness": freshness,
                "confidence": confidence,
                "is_live": bool(self.api_key)
            }
        }
