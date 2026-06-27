import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <h1>DevPulse</h1>
          <p>Developer Analytics Dashboard</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
