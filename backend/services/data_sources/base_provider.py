from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
from datetime import datetime

class BaseDataProvider(ABC):
    """Abstract base class for all external data providers."""
    
    @abstractmethod
    def fetch_data(self, **kwargs) -> Dict[str, Any]:
        """Fetch raw data from the external source or fallback cache/demo."""
        pass
        
    @abstractmethod
    def validate_data(self, data: Dict[str, Any]) -> bool:
        """Validate the incoming data format."""
        pass
        
    @abstractmethod
    def normalize_data(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Transform raw data into ORCA standard schema."""
        pass
        
    def get_timestamp(self) -> str:
        """Get the current ISO timestamp."""
        return datetime.utcnow().isoformat() + "Z"
        
    @abstractmethod
    def get_source_name(self) -> str:
        """Return the name of the data provider."""
        pass
        
    def calculate_freshness(self, data_timestamp: datetime) -> int:
        """Calculate data freshness score (0-100)."""
        now = datetime.utcnow()
        delta_minutes = (now - data_timestamp).total_seconds() / 60.0
        
        if delta_minutes <= 5:
            return 100
        elif delta_minutes <= 15:
            return 90
        elif delta_minutes <= 30:
            return 75
        elif delta_minutes <= 60:
            return 50
        else:
            return max(0, int(50 - (delta_minutes / 60)))
            
    def calculate_confidence(self, freshness: int, source_reliability: int) -> int:
        """Calculate overall data confidence."""
        return int((freshness * 0.4) + (source_reliability * 0.6))
