import { useAuth } from '../auth/AuthContext';
import { FishermanDashboard } from '../dashboards/FishermanDashboard';
import { OfficerDashboard } from '../dashboards/OfficerDashboard';
import { ResearcherDashboard } from '../dashboards/ResearcherDashboard';
import { CoastGuardDashboard } from '../dashboards/CoastGuardDashboard';
import { AnalystDashboard } from '../dashboards/AnalystDashboard';
import { AdminDashboard } from '../dashboards/AdminDashboard';

export const Dashboard = () => {
  const { role } = useAuth();

  // Role-Specific Custom Dashboard Views
  if (role === 'FISHERMAN') {
    return <FishermanDashboard />;
  }

  if (role === 'GOVERNMENT_OFFICER') {
    return <OfficerDashboard />;
  }

  if (role === 'MARINE_RESEARCHER') {
    return <ResearcherDashboard />;
  }

  if (role === 'COAST_GUARD') {
    return <CoastGuardDashboard />;
  }

  if (role === 'OCEAN_ANALYST') {
    return <AnalystDashboard />;
  }

  if (role === 'ADMIN') {
    return <AdminDashboard />;
  }

  // Default fallback: Fisherman Marine Dashboard
  return <FishermanDashboard />;
};
