function Badge({ children, color = '#6366f1' }) {
  return (
    <span style={{ background: color + '22', color: color, borderRadius: '999px', padding: '2px 10px', fontSize: '11px', fontWeight: 600 }}>
      {children}
    </span>
  );
}

export default Badge;
