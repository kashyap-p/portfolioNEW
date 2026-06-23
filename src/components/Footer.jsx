import { FiHeart, FiGithub, FiLinkedin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer style={{
      padding: '40px 0',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: '#0a0a0f'
    }}>
      <div className="section-container">
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            color: '#71717a', fontSize: '0.85rem'
          }}>
            Made with <FiHeart size={14} color="#ec4899" /> by Kashyap
          </div>

          <div style={{
            display: 'flex', gap: 10
          }}>
            {[
              { icon: FiGithub, href: 'https://github.com/kashyap-p' },
              { icon: FiLinkedin, href: 'https://linkedin.com/in/kashyap-p' },
            ].map(({ icon: Icon, href }, i) => (
              <a key={i} href={href} style={{
                width: 36, height: 36, borderRadius: 8,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#71717a', transition: 'all 0.3s', cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#6366f1'
                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#71717a'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
              }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          <div style={{
            fontSize: '0.8rem', color: '#52525b',
            fontFamily: "'JetBrains Mono', monospace"
          }}>
            &copy; 2026 All rights reserved
          </div>
        </div>
      </div>
    </footer>
  )
}
