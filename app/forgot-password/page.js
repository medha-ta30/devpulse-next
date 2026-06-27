import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <h1>DevPulse</h1>
          <p>Developer Analytics Dashboard</p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
