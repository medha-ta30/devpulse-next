'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { setAccessToken, getAccessToken, clearAccessToken } from '@/lib/tokenStorage';
import { refreshAccessToken, logoutUser } from '@/services/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // On every page load/refresh — try to get a new access token using
  // the HttpOnly cookie the browser sends automatically
  useEffect(() => {
    refreshAccessToken().then(async (result) => {
      if (result.success) {
        setAccessToken(result.accessToken);
        // Fetch user profile so name is available after page refresh
        try {
          const { getProfile } = await import('@/services/auth');
          const profileResult = await getProfile();
          if (profileResult.success) {
            setUser(profileResult.user);
          }
        } catch {
        // profile fetch failed, user stays null but session still valid
        }
      } else {
        clearAccessToken();
      }
      setLoading(false);
    }).catch(() => {
      clearAccessToken();
      setLoading(false);
    });
  }, []);

  function login(userData, accessToken) {
    setAccessToken(accessToken);
    setUser(userData);
  }

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch {
      // clear local state even if server call fails
    }
    clearAccessToken();
    setUser(null);
  }, []);

  // Call this when any request gets a 401 — silently gets a new access token
  const refresh = useCallback(async () => {
    const result = await refreshAccessToken();

    if (!result.success) {
      logout();
      return null;
    }

    setAccessToken(result.accessToken);
    return result.accessToken;
  }, [logout]);

  const isLoggedIn = !!getAccessToken() || !!user;

  return (
    <AuthContext.Provider value={{ user, setUser, loading, isLoggedIn, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
