import { FiHeart, FiGithub, FiLinkedin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer style={{
      padding: '40px 0',
      borderTop: '1px solid var(--border)',
      background: 'var(--color-bg)'
    }}>
      <div className="section-container">
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            color: 'var(--color-text-tertiary)', fontSize: '0.85rem'
          }}>
            Made with <FiHeart size={14} color="#ec4899" /> by Kashyap
          </div>

          <div style={{
            display: 'flex', gap: 10
          }}>
            {[
              { icon: FiGithub, href: 'https://github.com/kashyap-p', label: 'GitHub' },
              { icon: FiLinkedin, href: 'https://linkedin.com/in/kashyap-p', label: 'LinkedIn' },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} aria-label={label} style={{
                width: 36, height: 36, borderRadius: 8,
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--color-text-tertiary)', transition: 'all 0.3s', cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#6366f1'
                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--color-text-tertiary)'
                e.currentTarget.style.borderColor = 'var(--border)'
              }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          <div style={{
            fontSize: '0.8rem', color: 'var(--color-text-tertiary)',
            fontFamily: "'JetBrains Mono', monospace"
          }}>
            &copy; 2026 All rights reserved
          </div>
        </div>
      </div>
    </footer>
  )
}
