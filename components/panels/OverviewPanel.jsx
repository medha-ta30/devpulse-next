import StatCard from '../shared/StatCard';
import { Users, FileText, CheckSquare, Globe } from 'lucide-react';

function OverviewPanel({ data }) {
  if (!data) {
    return <div className="overview-panel"><p>No overview data available.</p></div>;
  }

  return (
    <div className="overview-panel">
      <div className="overview-stats-grid">
        <StatCard icon={Users} label="Total Users" value={data.totalUsers} color="#6366f1" />
        <StatCard icon={FileText} label="Total Posts" value={data.totalPosts} color="#06b6d4" />
        <StatCard icon={CheckSquare} label="Total Todos" value={data.totalTodos} color="#10b981" />
        <StatCard icon={Globe} label="Total Countries" value={data.totalCountries} color="#f59e0b" />
      </div>
    </div>
  );
}

export default OverviewPanel;
