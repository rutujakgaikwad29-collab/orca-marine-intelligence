from fastapi import APIRouter
from pydantic import BaseModel
from backend.services.marine_fusion_engine import MarineFusionEngine

router = APIRouter()
fusion_engine = MarineFusionEngine()

class LocationQuery(BaseModel):
    lat: float = 16.99
    lon: float = 73.31

@router.post("/marine-state")
async def get_live_marine_state(query: LocationQuery):
    """Get the fused, real-time marine state for a location."""
    data = fusion_engine.get_fused_marine_state(query.lat, query.lon)
    return data

@router.get("/data-sources/status")
async def get_data_source_status():
    """Get the health and freshness of active data connections."""
    return {
        "weather_api": {
            "status": "SIMULATED", # Since no API key is provided
            "latency_ms": 12,
            "confidence": 95
        },
        "ocean_api": {
            "status": "SIMULATED",
            "latency_ms": 15,
            "confidence": 90
        },
        "vessel_iot": {
            "status": "DISCONNECTED",
            "latency_ms": 0,
            "confidence": 0
        }
    }
