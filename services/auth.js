import { getAccessToken } from '@/lib/tokenStorage';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth`;

// credentials: 'include' tells the browser to send the HttpOnly cookie
// on every request automatically

export async function registerUser(userData) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(userData),
  });
  return response.json();
}

export async function loginUser(loginData) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(loginData),
  });
  return response.json();
}

export async function refreshAccessToken() {
  // No body needed — browser sends HttpOnly cookie automatically
  const response = await fetch(`${BASE_URL}/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  return response.json();
}

export async function logoutUser() {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    credentials: 'include',
  });
  return response.json();
}

export async function getProfile() {
  const response = await fetch(`${BASE_URL}/profile`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getAccessToken()}` },
    credentials: 'include',
  });
  return response.json();
}

export async function forgotPassword(email) {
  const response = await fetch(`${BASE_URL}/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email }),
  });
  return response.json();
}

export async function resetPassword(token, newPassword) {
  const response = await fetch(`${BASE_URL}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ token, newPassword }),
  });
  return response.json();
}
