function StatCard({ icon: Icon, label, value, sub, color = '#6366f1' }) {
  return (
    <div style={{ borderLeft: `4px solid ${color}`, background: '#1e1e2e', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{ background: color + '22', borderRadius: '50%', padding: '10px', display: 'flex' }}>
        <Icon size={22} color={color} />
      </div>
      <div>
        <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>{label}</p>
        <p style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#fff' }}>{value}</p>
        {sub && <p style={{ margin: 0, fontSize: '11px', color: '#aaa' }}>{sub}</p>}
      </div>
    </div>
  );
}

export default StatCard;
