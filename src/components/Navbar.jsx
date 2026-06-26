import { useState, useEffect, useCallback } from 'react'
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

const NAV_HEIGHT = 72

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      height: NAV_HEIGHT, padding: '0 24px',
      background: scrolled ? 'var(--bg-nav-scrolled)' : 'var(--bg-nav)',
      backdropFilter: 'blur(12px) saturate(150%)',
      WebkitBackdropFilter: 'blur(12px) saturate(150%)',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid rgba(255,255,255,0.04)',
      transition: 'background 0.3s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
      willChange: 'background, backdrop-filter'
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '100%'
      }}>
        <a href="#home" style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '1.4rem', fontWeight: 700,
          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          cursor: 'pointer', flexShrink: 0
        }}>
          Kashyap
        </a>

        {/* Desktop Nav */}
        <div style={{
          display: 'flex', gap: '2rem', alignItems: 'center'
        }} className="desktop-nav">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="nav-link" style={{
              fontSize: '0.9rem', color: 'var(--color-text-secondary)',
              transition: 'color 0.3s', position: 'relative'
            }}>
              {link.name}
            </a>
          ))}
          <button onClick={toggleTheme} style={{
            background: 'none', border: '1px solid var(--border)',
            color: 'var(--color-text-secondary)', cursor: 'pointer',
            padding: '8px', borderRadius: 8, lineHeight: 1,
            display: 'flex', alignItems: 'center',
            transition: 'all 0.3s', fontSize: '1.1rem'
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--color-text-secondary)' }}
          aria-label="Toggle theme">
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          <a href="#contact" className="nav-cta" style={{
            padding: '10px 24px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            color: 'white', fontSize: '0.9rem', fontWeight: 600,
            transition: 'all 0.3s', boxShadow: '0 0 20px rgba(99,102,241,0.3)',
            cursor: 'pointer'
          }}>
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(prev => !prev)}
          className="mobile-toggle"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          style={{
            display: 'none', background: 'none', border: 'none',
            color: 'var(--color-text)', fontSize: '1.5rem', cursor: 'pointer',
            padding: 8, lineHeight: 1, flexShrink: 0
          }}
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className="mobile-menu"
        style={{
          position: 'absolute', top: NAV_HEIGHT, left: 0, right: 0,
          background: 'var(--bg-mobile)', backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: mobileOpen ? '24px' : '0 24px',
          maxHeight: mobileOpen ? '400px' : '0',
          overflow: 'hidden',
          borderBottom: mobileOpen ? '1px solid var(--border)' : 'none',
          transition: 'max-height 0.35s ease, padding 0.35s ease',
          display: 'flex', flexDirection: 'column', gap: '4px'
        }}
      >
        {navLinks.map(link => (
          <a key={link.name} href={link.href}
            onClick={closeMobile}
            className="nav-link"
            style={{
              fontSize: '1rem', color: 'var(--color-text-secondary)', padding: '10px 0',
              transition: 'color 0.3s', borderBottom: '1px solid var(--border)'
            }}
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  )
}
