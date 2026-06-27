/**
 * Posts data processor
 * Counts posts and finds which users posted the most.
 * Pure functions – no fetch, no React.
 */

function getTotalPosts(posts) {
  return posts.length;
}

// Group posts by userId and count how many each user wrote
function getPostCountPerUser(posts) {
  const userCounts = {};

  posts.forEach(post => {
    if (userCounts[post.userId]) {
      userCounts[post.userId].postCount += 1;
    } else {
      userCounts[post.userId] = { userId: post.userId, postCount: 1 };
    }
  });

  return Object.values(userCounts);
}

// Sort by postCount descending
function sortByPostCountDescending(userCounts) {
  return [...userCounts].sort((a, b) => b.postCount - a.postCount);
}

function getTop5UsersByPostCount(posts) {
  const userCounts = getPostCountPerUser(posts);
  const sorted = sortByPostCountDescending(userCounts);
  return sorted.slice(0, 5);
}

export function postAnalysis(posts) {
  const totalPosts = getTotalPosts(posts);
  const top5UsersByPostCount = getTop5UsersByPostCount(posts);

  return {
    totalPosts,
    top5UsersByPostCount,
  };
}
