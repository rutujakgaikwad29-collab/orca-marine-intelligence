import math
import random
from datetime import datetime
from typing import Dict, Any

class DemoDataGenerator:
    """
    Generates realistic fallback data for the Indian West Coast (Ratnagiri region)
    if actual API satellite/sensor data is unavailable.
    """
    def __init__(self):
        # Base coordinate: Ratnagiri Coast
        self.base_lat = 16.9902
        self.base_lon = 73.3120
        
        # State
        self.current_lat = self.base_lat
        self.current_lon = self.base_lon
        self.fuel_level = 75.0

    def get_live_telemetry(self) -> Dict[str, Any]:
        """Simulate vessel movement and engine telemetry."""
        # Random walk
        self.current_lat += (random.random() - 0.5) * 0.002
        self.current_lon += (random.random() - 0.5) * 0.002
        self.fuel_level = max(0, self.fuel_level - 0.05)
        
        return {
            "latitude": self.current_lat,
            "longitude": self.current_lon,
            "speed": round(random.uniform(10.0, 15.0), 1),
            "heading": round(random.uniform(240, 260), 1),
            "roll": round(random.uniform(2.0, 12.0), 1),
            "pitch": round(random.uniform(1.0, 5.0), 1),
            "fuel_level": round(self.fuel_level, 1)
        }

    def get_marine_conditions(self) -> Dict[str, Any]:
        """Simulate realistic marine environment conditions."""
        # Slight correlation: Higher wind -> Higher waves
        wind_speed = round(random.uniform(10.0, 35.0), 1)
        wave_height = round(0.5 + (wind_speed / 20.0) + random.uniform(-0.3, 0.5), 1)
        
        return {
            "latitude": self.current_lat,
            "longitude": self.current_lon,
            "sea_surface_temp": round(random.uniform(27.5, 29.5), 1),
            "chlorophyll": round(random.uniform(0.5, 3.5), 2),
            "wind_speed": wind_speed,
            "wave_height": wave_height
        }

generator = DemoDataGenerator()
