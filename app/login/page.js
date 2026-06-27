import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <h1>DevPulse</h1>
          <p>Developer Analytics Dashboard</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
