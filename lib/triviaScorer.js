/**
 * Trivia processor
 * Converts Open Trivia DB response into:
 * 1) question cards for the list
 * 2) difficulty counts for the donut chart
 */

function getQuestionsList(triviaData) {
  return triviaData.results.map(item => ({
    question: item.question,
    answer: item.correct_answer,
    difficulty: item.difficulty,
    category: item.category,
  }));
}

function getDifficultyCounts(questions) {
  const counts = questions.reduce((acc, question) => {
    acc[question.difficulty] = (acc[question.difficulty] || 0) + 1;
    return acc;
  }, { easy: 0, medium: 0, hard: 0 });

  return [
    { difficulty: 'easy', count: counts.easy },
    { difficulty: 'medium', count: counts.medium },
    { difficulty: 'hard', count: counts.hard },
  ];
}

export function triviaScorer(triviaData) {
  const questions = getQuestionsList(triviaData);
  const difficultyCounts = getDifficultyCounts(questions);

  return {
    questions,
    difficultyCounts,
  };
}
