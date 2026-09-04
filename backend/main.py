from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(title="ORCA Intelligence API", version="1.0.0")

# Allow frontend to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from backend.api.endpoints import live_data
from backend.api.endpoints import intelligence

app.include_router(live_data.router, prefix="/api/live", tags=["Live Data"])
app.include_router(intelligence.router, prefix="/api/orca", tags=["Intelligence"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the ORCA Marine Intelligence API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
