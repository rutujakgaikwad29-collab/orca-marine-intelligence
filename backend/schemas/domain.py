from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Dict, Any, List

class VesselLocationBase(BaseModel):
    latitude: float
    longitude: float
    speed: float
    heading: float
    roll: float
    pitch: float
    fuel_level: float

class VesselLocationCreate(VesselLocationBase):
    vessel_id: int

class VesselLocationResponse(VesselLocationBase):
    id: int
    timestamp: datetime
    class Config:
        from_attributes = True

class MarineConditionBase(BaseModel):
    latitude: float
    longitude: float
    sea_surface_temp: float
    chlorophyll: float
    wave_height: float
    wind_speed: float

class MarineConditionCreate(MarineConditionBase):
    pass

class MarineConditionResponse(MarineConditionBase):
    id: int
    timestamp: datetime
    class Config:
        from_attributes = True

class AlertBase(BaseModel):
    severity: str
    title: str
    description: str

class AlertCreate(AlertBase):
    pass

class AlertResponse(AlertBase):
    id: int
    timestamp: datetime
    is_active: bool
    class Config:
        from_attributes = True

class IntentRequest(BaseModel):
    query: str

class IntentResponse(BaseModel):
    intent: str
    location: Optional[str] = None
    time: Optional[str] = None
    activity: Optional[str] = None
    required_agents: List[str]
