import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { AppLayout } from './components/layout/AppLayout';

import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { AskORCA } from './pages/AskORCA';
import { LiveMarineMap } from './pages/LiveMarineMap';
import { FishingIntelligence } from './pages/FishingIntelligence';
import { WeatherOcean } from './pages/WeatherOcean';
import { SafetyCenter } from './pages/SafetyCenter';
import { RoutePlanner } from './pages/RoutePlanner';
import { AgentMonitor } from './pages/AgentMonitor';
import { Alerts } from './pages/Alerts';
import { DataSources } from './pages/DataSources';
import { Settings } from './pages/Settings';
import { Simulation3D } from './pages/Simulation3D';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Application Layout & Pages */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="simulation" element={<Simulation3D />} />
            <Route path="3d-simulation" element={<Simulation3D />} />
            <Route path="ask" element={<AskORCA />} />
            <Route path="map" element={<LiveMarineMap />} />
            <Route path="fishing" element={<FishingIntelligence />} />
            <Route path="weather" element={<WeatherOcean />} />
            <Route path="safety" element={<SafetyCenter />} />
            <Route path="route" element={<RoutePlanner />} />
            <Route path="agents" element={<AgentMonitor />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="data" element={<DataSources />} />
            <Route path="settings" element={<Settings />} />

            {/* Role-Specific Direct Aliases */}
            <Route path="fisherman" element={<Dashboard />} />
            <Route path="officer" element={<Dashboard />} />
            <Route path="researcher" element={<Dashboard />} />
            <Route path="coast-guard" element={<Dashboard />} />
            <Route path="analyst" element={<Dashboard />} />
            <Route path="admin" element={<Dashboard />} />
          </Route>

          {/* Catch-all Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
