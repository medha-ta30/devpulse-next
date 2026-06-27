function SectionTitle({ children }) {
  return (
    <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '8px', marginBottom: '16px', color: '#fff', fontSize: '16px' }}>
      {children}
    </h2>
  );
}

export default SectionTitle;
