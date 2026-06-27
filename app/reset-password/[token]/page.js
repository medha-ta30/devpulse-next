import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

export default async function ResetPasswordPage({ params }) {
  const { token } = await params;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
