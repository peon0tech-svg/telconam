export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0', color: '#3b82f6' }}>404</h1>
      <p style={{ fontSize: '1.2rem', margin: '10px 0 20px 0', opacity: 0.8 }}>Page Not Found</p>
      <a href="/" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: '600' }}>Go Home &rarr;</a>
    </div>
  )
}
