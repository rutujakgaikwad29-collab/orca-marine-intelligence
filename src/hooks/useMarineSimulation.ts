import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import type { Alert } from '../types/alerts';

export const useMarineSimulation = () => {
  const { isDemoMode, vesselData, marineData, updateVesselData, updateMarineData, addAlert } = useAppStore();

  useEffect(() => {
    if (!isDemoMode) return;

    const interval = setInterval(() => {
      // Simulate vessel movement
      const newLat = vesselData.latitude + (Math.random() - 0.5) * 0.001;
      const newLng = vesselData.longitude + (Math.random() - 0.5) * 0.001;
      const newRoll = Math.max(0, vesselData.roll + (Math.random() - 0.5) * 2);
      const newPitch = Math.max(0, vesselData.pitch + (Math.random() - 0.5) * 1);
      const newSpeed = Math.max(0, vesselData.speed + (Math.random() - 0.5) * 0.5);
      const newHeading = (vesselData.heading + (Math.random() - 0.5) * 5) % 360;
      const newFuelLevel = Math.max(0, vesselData.fuelLevel - (vesselData.fuelConsumption / 1800)); // Simulate fuel consumption every 2s

      let stability: 'STABLE' | 'MODERATE' | 'DANGER' = 'STABLE';
      if (newRoll > 15) {
        stability = 'DANGER';
      } else if (newRoll > 10) {
        stability = 'MODERATE';
      }

      updateVesselData({
        latitude: newLat,
        longitude: newLng,
        roll: newRoll,
        pitch: newPitch,
        speed: newSpeed,
        heading: newHeading < 0 ? newHeading + 360 : newHeading,
        fuelLevel: newFuelLevel,
        stability,
      });

      // Simulate marine condition changes
      const newWaveHeight = Math.max(0.5, marineData.waveHeight + (Math.random() - 0.5) * 0.1);
      const newWindSpeed = Math.max(5, marineData.windSpeed + (Math.random() - 0.5) * 2);
      
      let riskScore = marineData.riskScore;
      if (newWaveHeight > 2.5) {
        riskScore = Math.min(100, riskScore + 2);
      } else if (newWaveHeight < 1.5) {
        riskScore = Math.max(0, riskScore - 1);
      }

      updateMarineData({
        waveHeight: newWaveHeight,
        windSpeed: newWindSpeed,
        riskScore,
      });

      // Generate alerts based on conditions
      if (newWindSpeed > 30 && Math.random() > 0.9) {
        const alert: Alert = {
          id: `alert-${Date.now()}`,
          severity: 'HIGH',
          title: 'High Wind Warning',
          description: `Wind speed exceeded 30 km/h (${newWindSpeed.toFixed(1)} km/h)`,
          timestamp: new Date().toISOString(),
        };
        addAlert(alert);
      }

      if (newFuelLevel < 20 && Math.random() > 0.95) {
        const alert: Alert = {
          id: `alert-${Date.now()}`,
          severity: 'CRITICAL',
          title: 'Low Fuel Warning',
          description: `Fuel level is critically low (${newFuelLevel.toFixed(1)}%)`,
          timestamp: new Date().toISOString(),
        };
        addAlert(alert);
      }

    }, 5000);

    return () => clearInterval(interval);
  }, [isDemoMode, vesselData, marineData, updateVesselData, updateMarineData, addAlert]);
};
