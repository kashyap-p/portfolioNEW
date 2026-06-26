import { useEffect, useState } from 'react'

export default function Loader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 15 + 5
        return Math.min(next, 100)
      })
    }, 120)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'var(--color-bg)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Space Grotesk', sans-serif"
    }}>
      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <svg width="80" height="80" viewBox="0 0 80 80">
          <defs>
            <linearGradient id="loader-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <circle cx="40" cy="40" r="35" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
          <circle cx="40" cy="40" r="35" fill="none" stroke="url(#loader-grad)" strokeWidth="3"
            strokeDasharray={`${2 * Math.PI * 35}`}
            strokeDashoffset={`${2 * Math.PI * 35 * (1 - Math.min(progress, 100) / 100)}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.9rem', color: '#a855f7'
        }}>
          {Math.min(Math.round(progress), 100)}%
        </div>
      </div>
      <div style={{
        fontSize: '1.5rem', fontWeight: 700,
        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        marginBottom: '0.5rem'
      }}>
        Kashyap
      </div>
      <div style={{
        fontSize: '0.85rem', color: 'var(--color-text-tertiary)',
        fontFamily: "'JetBrains Mono', monospace"
      }}>
        Initializing creative workspace...
      </div>
    </div>
  )
}
