'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import SectionTitle from '../shared/SectionTitle';

function PostsPanel({ processedPostsData }) {
  const top5 = processedPostsData?.top5UsersByPostCount;

  if (!top5 || top5.length === 0) {
    return (
      <div className="posts-panel">
        <p>No posts data to display.</p>
      </div>
    );
  }

  return (
    <div className="posts-panel">
      <SectionTitle>Top 5 Users by Post Count</SectionTitle>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={top5} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="userId" tickFormatter={(userId) => 'User ' + userId} />
          <YAxis allowDecimals={false} />
          <Tooltip
            labelFormatter={(userId) => 'User ' + userId}
            formatter={(value) => [value, 'Posts']}
          />
          <Bar dataKey="postCount" fill="#2563eb" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <ul className="posts-list">
        {top5.map((item) => (
          <li key={item.userId}>
            User {item.userId}: {item.postCount} posts
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsPanel;
