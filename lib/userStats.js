/**
 * Users data processor
 * Pure functions only – takes arrays, returns summary numbers.
 * Used by Overview panel and anywhere user stats are needed.
 */

function getTotalUsers(users) {
  return users.length;
}

// Count each unique company name once (same company can appear on multiple users)
function getTotalCompanies(users) {
  const companyNames = users.map(user => user.company.name);
  const uniqueCompanies = new Set(companyNames);
  return uniqueCompanies.size;
}

export function userStats(users) {
  const totalUsers = getTotalUsers(users);
  const totalCompanies = getTotalCompanies(users);

  return {
    totalUsers,
    totalCompanies,
  };
}
