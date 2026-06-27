'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { userStats } from '@/lib/userStats';
import { postAnalysis } from '@/lib/postAnalysis';
import { productivityTracker } from '@/lib/productivityTracker';
import { triviaScorer } from '@/lib/triviaScorer';
import { countryLookup } from '@/lib/countryLookup';

import OverviewPanel from '../panels/OverviewPanel';
import UsersPanel from '../panels/UsersPanel';
import PostsPanel from '../panels/PostsPanel';
import ProductivityPanel from '../panels/ProductivityPanel';
import TriviaPanel from '../panels/TriviaPanel';
import CountriesPanel from '../panels/CountriesPanel';
import ContactPanel from '../panels/ContactPanel';

import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

const TABS = [
  'Overview',
  'Users',
  'Posts',
  'Productivity',
  'Trivia',
  'Countries',
  'Contact'
];

function buildPanelData(users, posts, todos, trivia, countries, errors) {
  const overviewData =
    users && posts && todos && countries
      ? {
          totalUsers: userStats(users).totalUsers,
          totalPosts: postAnalysis(posts).totalPosts,
          totalTodos: todos.length,
          totalCountries: countryLookup(countries).totalCountries,
        }
      : null;

  const processedPostsData = posts ? postAnalysis(posts) : null;

  const productivityData =
    users && todos ? productivityTracker(users, todos) : null;

  let triviaData = null;

  if (trivia) {
    triviaData = triviaScorer(trivia);
  } else if (errors.trivia) {
    triviaData = {
      error: errors.trivia,
    };
  }

  const countriesData = countries
    ? countryLookup(countries)
    : null;

  return {
    overviewData,
    processedPostsData,
    productivityData,
    triviaData,
    countriesData,
  };
}

export default function DevPulseDashboard({ initialData, initialErrors, serverLoadTime }) {
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [activeTab, setActiveTab] = useState('Overview');

  const users = initialData.users;
  const posts = initialData.posts;
  const todos = initialData.todos;
  const trivia = initialData.trivia;
  const countries = initialData.countries;
  const errors = initialErrors;
  const loadTime = serverLoadTime;
  const loading = isPending;

  async function handleLogout() {
    await logout();
  }

  function handleRefresh() {
    startTransition(() => {
      router.refresh();
    });
  }

  const panelData = buildPanelData(users, posts, todos, trivia, countries, errors);

  const errorList = [];
  const DATA_KEYS = ['users', 'posts', 'todos', 'trivia', 'countries'];
  for (let i = 0; i < DATA_KEYS.length; i++) {
    const key = DATA_KEYS[i];
    if (errors[key]) {
      errorList.push({ key, message: errors[key] });
    }
  }

  function renderActivePanel() {
    if (activeTab === 'Overview') return <OverviewPanel data={panelData.overviewData} />;
    if (activeTab === 'Users') return <UsersPanel users={users} />;
    if (activeTab === 'Posts') return <PostsPanel processedPostsData={panelData.processedPostsData} />;
    if (activeTab === 'Productivity') return <ProductivityPanel productivityData={panelData.productivityData} />;
    if (activeTab === 'Trivia') return <TriviaPanel triviaData={panelData.triviaData} />;
    if (activeTab === 'Countries') return <CountriesPanel countriesData={panelData.countriesData} />;
    if (activeTab === 'Contact') return <ContactPanel />;
    return null;
  }

  return (
    <div className="devpulse-dashboard">
      <header className="devpulse-header">
        <div>
          <h1>DevPulse Dashboard</h1>
          {user?.name && (
            <p style={{ margin: '4px 0 0', fontSize: '0.8125rem', color: 'var(--dp-text)', fontWeight: 400 }}>
              Hello!!, <strong style={{ color: 'var(--dp-accent)' }}>{user.name}</strong> 👋
            </p>
          )}
        </div>
        <div>
          <button
            type="button"
            className="devpulse-refresh-btn"
            onClick={toggleTheme}
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>

          <button
            type="button"
            className="devpulse-refresh-btn"
            onClick={handleRefresh}
            disabled={loading}
          >
            Refresh
          </button>

          <button
            type="button"
            className="devpulse-refresh-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {loading && (
        <p className="devpulse-loading">Loading dashboard data...</p>
      )}

      {!loading && errorList.length > 0 && (
        <div className="devpulse-errors">
          <h3>Some data could not be loaded</h3>
          <ul>
            {errorList.map((item) => (
              <li key={item.key}>
                <strong>{item.key}:</strong> {item.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      <nav className="devpulse-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={activeTab === tab ? 'devpulse-tab-btn active' : 'devpulse-tab-btn'}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {!loading && (
        <div className="devpulse-panel-content">
          {renderActivePanel()}
        </div>
      )}

      {loadTime && (
        <footer style={{ marginTop: '24px', textAlign: 'center', fontSize: '12px', color: '#888', padding: '16px', borderTop: '1px solid var(--dp-border)' }}>
          Dashboard loaded in {loadTime}ms
        </footer>
      )}
    </div>
  );
}
