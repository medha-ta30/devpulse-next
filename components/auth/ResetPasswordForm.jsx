'use client';

import { useState } from 'react';
import { resetPassword } from '@/services/auth';

export default function ResetPasswordForm({ token }) {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = await resetPassword(
        token,
        newPassword
      );

      setMessage(data.message);

      if (data.success) {
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }

    } catch (error) {
      console.error(error);
      setMessage('Something went wrong');
    }
  }

  return (
    <div>
      <h2>Reset Password</h2>

      <form
        onSubmit={handleSubmit}
        className="auth-form"
      >

        <div className="auth-form-group">
          <label>New Password</label>

          <input
            className="auth-input"
            type="password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
          />
        </div>

        <button
          type="submit"
          className="auth-btn"
        >
          Reset Password
        </button>

      </form>

      {message && <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--dp-text)' }}>{message}</p>}
    </div>
  );
}
