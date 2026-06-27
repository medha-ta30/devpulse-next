'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from 'recharts';
import SectionTitle from '../shared/SectionTitle';

function getBarColor(percentage) {
  if (percentage >= 70) return '#16a34a';
  if (percentage >= 50) return '#ca8a04';
  return '#dc2626';
}

function ProductivityPanel({ productivityData }) {
  const stats = productivityData?.userCompletionStats;

  if (!stats || stats.length === 0) {
    return (
      <div className="productivity-panel">
        <p>No productivity data to display.</p>
      </div>
    );
  }

  return (
    <div className="productivity-panel">
      <SectionTitle>User Completion Percentages</SectionTitle>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          layout="vertical"
          data={stats}
          margin={{ top: 8, right: 24, left: 8, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fill: 'var(--dp-text)' }} />
          <YAxis type="category" dataKey="userName" width={110} tick={{ fill: 'var(--dp-text)' }} />
          <Tooltip
            formatter={(value) => [value + '%', 'Completion']}
            labelFormatter={(name) => name}
          />
          <Bar dataKey="completionPercentage" radius={[0, 4, 4, 0]}>
            {stats.map((item) => (
              <Cell
                key={item.userId}
                fill={getBarColor(item.completionPercentage)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProductivityPanel;
