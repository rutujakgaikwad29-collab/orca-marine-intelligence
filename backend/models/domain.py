from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import JSONB
from geoalchemy2 import Geometry
from backend.database.database import Base

class Vessel(Base):
    __tablename__ = "vessels"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(String)
    
class VesselLocation(Base):
    __tablename__ = "vessel_locations"
    id = Column(Integer, primary_key=True, index=True)
    vessel_id = Column(Integer, ForeignKey("vessels.id"))
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    latitude = Column(Float)
    longitude = Column(Float)
    speed = Column(Float)
    heading = Column(Float)
    roll = Column(Float)
    pitch = Column(Float)
    fuel_level = Column(Float)
    geom = Column(Geometry('POINT', srid=4326))

class MarineCondition(Base):
    __tablename__ = "marine_conditions"
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    latitude = Column(Float)
    longitude = Column(Float)
    sea_surface_temp = Column(Float)
    chlorophyll = Column(Float)
    wave_height = Column(Float)
    wind_speed = Column(Float)
    geom = Column(Geometry('POINT', srid=4326))

class FishingZone(Base):
    __tablename__ = "fishing_zones"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    suitability_score = Column(Float)
    risk_level = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    radius_km = Column(Float)
    geom = Column(Geometry('POLYGON', srid=4326))

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    severity = Column(String, index=True)
    title = Column(String)
    description = Column(String)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    is_active = Column(Boolean, default=True)

class AgentLog(Base):
    __tablename__ = "agent_logs"
    id = Column(Integer, primary_key=True, index=True)
    agent_name = Column(String, index=True)
    status = Column(String)
    confidence = Column(Float)
    data = Column(JSONB)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
