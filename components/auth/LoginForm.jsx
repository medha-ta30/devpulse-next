'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginUser } from '@/services/auth';
import { useAuth } from '@/hooks/useAuth';

export default function LoginForm() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage]   = useState('');
  const { login, isLoggedIn } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  }, [isLoggedIn, router]);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    try {
      const data = await loginUser({ email, password, rememberMe });

      if (!data.success) {
        setMessage(data.message);
        return;
      }

      login(data.user, data.accessToken, data.refreshToken, rememberMe);
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      setMessage('Something went wrong');
    }
  }

  return (
    <div>
      <h2 className="auth-section-title">Login</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-form-group">
          <label>Email</label>
          <input
            className="auth-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth-form-group">
          <label>Password</label>
          <input
            className="auth-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="auth-checkbox">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
          />
          <label>Remember Me</label>
        </div>

        <button type="submit" className="auth-btn">Login</button>
      </form>

      {message && (
        <p style={{ marginTop: '14px', textAlign: 'center', color: 'var(--dp-danger)', fontSize: '14px' }}>
          {message}
        </p>
      )}

      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.875rem', color: 'var(--dp-text)' }}>
        <p>
          Don&apos;t have an account?{' '}
          <Link href="/register" style={linkStyle}>Register</Link>
        </p>
        <p style={{ marginTop: '8px' }}>
          <Link href="/forgot-password" style={linkStyle}>Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
}

const linkStyle = {
  background: 'none',
  border: 'none',
  padding: 0,
  color: 'var(--dp-accent)',
  cursor: 'pointer',
  fontSize: '0.875rem',
  fontFamily: 'var(--dp-font)',
  textDecoration: 'none',
  display: 'inline-block',
};
