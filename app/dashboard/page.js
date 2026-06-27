/* eslint-disable react-hooks/purity */
import { fetchUsers } from '@/services/users';
import { fetchPosts } from '@/services/posts';
import { fetchTodos } from '@/services/todos';
import { fetchTrivia } from '@/services/trivia';
import { fetchCountries } from '@/services/countries';
import DevPulseDashboard from '@/components/dashboard/DevPulseDashboard';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const startTime = Date.now();

  const results = await Promise.allSettled([
    fetchUsers(),
    fetchPosts(),
    fetchTodos(),
    fetchTrivia(),
    fetchCountries(),
  ]);

  const DATA_KEYS = ['users', 'posts', 'todos', 'trivia', 'countries'];
  const initialData = {
    users: null,
    posts: null,
    todos: null,
    trivia: null,
    countries: null,
  };
  const initialErrors = {
    users: null,
    posts: null,
    todos: null,
    trivia: null,
    countries: null,
  };

  for (let i = 0; i < results.length; i++) {
    const key = DATA_KEYS[i];
    if (results[i].status === 'fulfilled') {
      initialData[key] = results[i].value;
    } else {
      initialData[key] = null;
      initialErrors[key] = results[i].reason?.message || 'Request failed';
    }
  }

  const serverLoadTime = Date.now() - startTime;

  return (
    <DevPulseDashboard 
      initialData={initialData} 
      initialErrors={initialErrors} 
      serverLoadTime={serverLoadTime}
    />
  );
}
