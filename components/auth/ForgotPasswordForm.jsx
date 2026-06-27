'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { forgotPassword } from '@/services/auth';
import { useAuth } from '@/hooks/useAuth';

export default function ForgotPasswordForm() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  }, [isLoggedIn, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const data = await forgotPassword(email);
      setMessage(data.message);
      if (data.success) setSent(true);
    } catch (error) {
      console.error(error);
      setMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="auth-section-title">Forgot Password</h2>
      <p style={{ fontSize: '0.875rem', color: 'var(--dp-text)', marginBottom: '20px' }}>
        Enter your email and we&apos;ll send you a reset link.
      </p>

      {!sent ? (
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

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Sending…' : 'Send Reset Link'}
          </button>
        </form>
      ) : (
        <p style={{ color: '#22c55e', fontSize: '0.9rem', textAlign: 'center' }}>
          ✓ {message}
        </p>
      )}

      {message && !sent && (
        <p style={{ marginTop: '12px', textAlign: 'center', color: 'var(--dp-danger)', fontSize: '0.875rem' }}>
          {message}
        </p>
      )}

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link href="/login" style={linkStyle}>
          ← Back to Login
        </Link>
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
