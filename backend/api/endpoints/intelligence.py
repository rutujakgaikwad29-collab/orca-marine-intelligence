from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from backend.agents.orchestrator import orchestrator
from backend.services.marine_fusion_engine import MarineFusionEngine
import asyncio
import json

router = APIRouter()
fusion_engine = MarineFusionEngine()

class OrcaQuery(BaseModel):
    query: str
    lat: float = 16.99
    lon: float = 73.31

@router.post("/query")
async def ask_orca(request: OrcaQuery):
    """The main entry point for the Multi-Agent Intelligence Engine."""
    result = await orchestrator.process_query(request.query, request.lat, request.lon)
    return result

@router.websocket("/ws/marine/live")
async def websocket_live_stream(websocket: WebSocket):
    """Real-time data streaming for the Phase 4 Live Dashboard."""
    await websocket.accept()
    try:
        while True:
            # Generate simulated live update (fallback demo mode)
            data = fusion_engine.get_fused_marine_state(16.99, 73.31)
            await websocket.send_text(json.dumps({
                "type": "marine_update",
                "payload": data
            }))
            await asyncio.sleep(5) # Stream every 5 seconds
    except WebSocketDisconnect:
        print("Client disconnected from live stream")
