'use client';

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import SectionTitle from '../shared/SectionTitle';

const DIFFICULTY_COLORS = ['#16a34a', '#ca8a04', '#dc2626'];

function TriviaPanel({ triviaData }) {
  if (triviaData && triviaData.error) {
    return (
      <div className="trivia-panel">
        <article>
          <h3>Trivia could not be loaded</h3>
          <p>{triviaData.error}</p>
        </article>
      </div>
    );
  }

  const questions = triviaData?.questions;
  const difficultyCounts = triviaData?.difficultyCounts;

  if (!questions || questions.length === 0) {
    return (
      <div className="trivia-panel">
        <p>No trivia questions to display.</p>
      </div>
    );
  }

  return (
    <div className="trivia-panel">
      <SectionTitle>Trivia Questions by Difficulty</SectionTitle>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={difficultyCounts}
            dataKey="count"
            nameKey="difficulty"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={2}
          >
            {difficultyCounts.map((entry, index) => (
              <Cell key={entry.difficulty} fill={DIFFICULTY_COLORS[index]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [value, name]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <SectionTitle>All Questions</SectionTitle>
      <div className="trivia-cards-grid">
        {questions.map((item, index) => (
          <article key={index} className="trivia-question-card">
            <p><strong>Question:</strong> {item.question}</p>
            <p><strong>Answer:</strong> {item.answer}</p>
            <p><strong>Difficulty:</strong> {item.difficulty}</p>
            <p><strong>Category:</strong> {item.category}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default TriviaPanel;
