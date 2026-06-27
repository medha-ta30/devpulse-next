import Badge from '../shared/Badge';
import SectionTitle from '../shared/SectionTitle';

function UsersPanel({ users }) {
  if (!users || users.length === 0) {
    return (
      <div className="users-panel">
        <p>No users to display.</p>
      </div>
    );
  }

  const businessUsers = users.filter(user => user.email.endsWith('.biz'));

  return (
    <div className="users-panel">
      <SectionTitle>Business Accounts (.biz)</SectionTitle>
      {businessUsers.length === 0 ? (
        <p>No business accounts found</p>
      ) : (
        <div className="users-grid">
          {businessUsers.map((user) => (
            <article key={user.id} className="user-card">
              <Badge color="#10b981">BUSINESS ACCOUNT</Badge>
              <h4>{user.name}</h4>
              <p>{user.email}</p>
              <p>{user.company.name}</p>
            </article>
          ))}
        </div>
      )}

      <SectionTitle>All Users</SectionTitle>
      <div className="users-grid">
        {users.map((user) => (
          <article key={user.id} className="user-card">
            <h4>{user.name}</h4>
            <p>{user.email}</p>
            <p>{user.company.name}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default UsersPanel;
