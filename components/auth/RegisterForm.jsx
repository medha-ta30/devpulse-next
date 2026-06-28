'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { registerUser } from '@/services/auth';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterForm() {
  const { login, isLoggedIn } = useAuth();
  const router = useRouter();

  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage]   = useState('');
  const [loading, setLoading]   = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  }, [isLoggedIn, router]);

  function getPasswordStrength(pwd) {
    const checks = {
      length:    pwd.length >= 6,
      uppercase: /[A-Z]/.test(pwd),
      number:    /[0-9]/.test(pwd),
      symbol:    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
    };
    const passed = Object.values(checks).filter(Boolean).length;
    return { checks, passed };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    const { passed } = getPasswordStrength(password);
    if (passed < 4) {
      setMessage('Password must have 6+ characters, one uppercase letter, one number, and one symbol');
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser({ name, email, password });
      if (!data.success) {
        setMessage(data.message);
        return;
      }
      login(data.user, data.accessToken);
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      setMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  const { checks, passed } = getPasswordStrength(password);
  const strengthColors = ['#ef4444', '#f97316', '#eab308', '#22c55e'];
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div>
      <h2 className="auth-section-title">Create Account</h2>

      {message && (
        <p style={{
          margin: '0 0 16px',
          padding: '10px 14px',
          background: 'rgba(220,38,38,0.07)',
          border: '1px solid rgba(220,38,38,0.3)',
          borderRadius: 'var(--dp-radius-sm)',
          color: 'var(--dp-danger)',
          fontSize: '0.875rem',
        }}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-form-group">
          <label>Name</label>
          <input
            className="auth-input"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            required
          />
        </div>

        <div className="auth-form-group">
          <label>Email</label>
          <input
            className="auth-input"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="auth-form-group">
          <label>Password</label>
          <div className="auth-password-field">
            <input
              className="auth-input auth-password-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="auth-password-toggle"
              onClick={() => setShowPassword(prev => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {password.length > 0 && (
            <div style={{ marginTop: '8px' }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '6px' }}>
                {[0, 1, 2, 3].map(i => (
                  <div key={i} style={{
                    flex: 1, height: '3px', borderRadius: '2px',
                    background: i < passed ? strengthColors[passed - 1] : 'var(--dp-border)',
                    transition: 'background 0.3s',
                  }} />
                ))}
              </div>
              <p style={{ fontSize: '0.75rem', color: strengthColors[passed - 1] || '#9ca3af', margin: '0 0 6px', fontWeight: 600 }}>
                {passed > 0 ? strengthLabels[passed - 1] : ''}
              </p>
              {[
                { key: 'length',    label: 'At least 6 characters' },
                { key: 'uppercase', label: 'One uppercase letter' },
                { key: 'number',    label: 'One number' },
                { key: 'symbol',    label: 'One symbol (!@#$...)' },
              ].map(({ key, label }) => (
                <p key={key} style={{ margin: '2px 0', fontSize: '0.75rem', color: checks[key] ? '#22c55e' : '#9ca3af' }}>
                  {checks[key] ? '✓' : '○'} {label}
                </p>
              ))}
            </div>
          )}
        </div>

        <button className="auth-btn" type="submit" disabled={loading}>
          {loading ? 'Creating account…' : 'Register'}
        </button>
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.8125rem', color: 'var(--dp-text)' }}>
        Already have an account?{' '}
        <Link href="/login" className="auth-link">
          Sign in
        </Link>
      </p>
    </div>
  );
}
