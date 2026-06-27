/**
 * Productivity processor
 * Links users with their todos and calculates completion %.
 * Needs both users and todos arrays from the dashboard.
 */

function getTodosForUser(userId, todos) {
  return todos.filter(todo => todo.userId === userId);
}

function getCompletedCount(todos) {
  return todos.filter(todo => todo.completed === true).length;
}

function getCompletionPercentage(total, completed) {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

function getCompletionForAllUsers(users, todos) {
  return users.map(user => {
    const userTodos = getTodosForUser(user.id, todos);
    const total = userTodos.length;
    const completed = getCompletedCount(userTodos);
    const completionPercentage = getCompletionPercentage(total, completed);

    return {
      userId: user.id,
      userName: user.name,
      totalTodos: total,
      completedTodos: completed,
      completionPercentage,
    };
  });
}

export function productivityTracker(users, todos) {
  const userCompletionStats = getCompletionForAllUsers(users, todos);

  return {
    userCompletionStats,
  };
}
