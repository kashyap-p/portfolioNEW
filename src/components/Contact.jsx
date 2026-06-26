import { useState, useCallback, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin } from 'react-icons/fi'

const socialLinks = [
  { icon: FiGithub, href: 'https://github.com/kashyap-p', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/kashyap-p', label: 'LinkedIn' },
]

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [focused, setFocused] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = useCallback((e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  const formRef = useRef(formData)
  formRef.current = formData

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setSending(true)
    setError(false)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '48fc05b3-d160-459a-8877-cc4defe8c317',
          ...formRef.current
        })
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch {
      setError(true)
      setTimeout(() => setError(false), 5000)
    } finally {
      setSending(false)
    }
  }, [])

  const inputStyle = useCallback((field) => ({
    width: '100%', padding: '14px 18px',
    borderRadius: 12,
    background: 'var(--bg-input)',
    border: `1px solid ${focused === field ? '#6366f1' : 'var(--border)'}`,
    color: 'var(--color-text)', fontSize: '0.95rem',
    fontFamily: "'Inter', sans-serif",
    outline: 'none',
    transition: 'all 0.3s',
    resize: field === 'message' ? 'vertical' : undefined,
  }), [focused])

  return (
    <section id="contact" ref={ref} style={{
      padding: '120px 0', position: 'relative',
      background: 'var(--gradient-section)'
    }}>
      {/* Glow effect */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.06), transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="section-container">
        <div style={{
          textAlign: 'center', marginBottom: '4rem',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease'
        }}>
          <div className="glow-line" style={{ margin: '0 auto 1.5rem' }} />
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle" style={{ margin: '1rem auto 0' }}>
            Have a project in mind? Let's work together to create something amazing.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem', maxWidth: 1000, margin: '0 auto'
        }}>
          {/* Contact Info */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 0.8s ease 0.2s'
          }}>
            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.3rem', fontWeight: 600,
              color: 'var(--color-text)', marginBottom: '1.5rem'
            }}>
              Let's talk about everything
            </h3>
            <p style={{
              color: 'var(--color-text-secondary)', fontSize: '0.95rem',
              lineHeight: 1.7, marginBottom: '2rem'
            }}>
              I'm always open to new opportunities and interesting projects.
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>

            {/* Contact Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2rem' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: 'rgba(99,102,241,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <FiMail size={18} color="#6366f1" />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginBottom: 2 }}>Email</div>
                  <div style={{ color: 'var(--color-text)', fontSize: '0.9rem' }}>kashyappatel326@gmail.com</div>
                </div>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: 'rgba(168,85,247,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <FiMapPin size={18} color="#a855f7" />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginBottom: 2 }}>Location</div>
                  <div style={{ color: 'var(--color-text)', fontSize: '0.9rem' }}>Ahmedabad</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: 10 }}>
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} title={label} style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-text-secondary)', transition: 'all 0.3s', cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#6366f1'
                  e.currentTarget.style.color = '#6366f1'
                  e.currentTarget.style.background = 'rgba(99,102,241,0.1)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.color = 'var(--color-text-secondary)'
                  e.currentTarget.style.background = 'var(--bg-card)'
                }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.8s ease 0.4s',
            display: 'flex', flexDirection: 'column', gap: '1rem'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input
                type="text" name="name" placeholder="Your Name" aria-label="Your Name"
                value={formData.name} onChange={handleChange}
                onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                style={inputStyle('name')}
                required
              />
              <input
                type="email" name="email" placeholder="Your Email" aria-label="Your Email"
                value={formData.email} onChange={handleChange}
                onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                style={inputStyle('email')}
                required
              />
            </div>
            <input
              type="text" name="subject" placeholder="Subject" aria-label="Subject"
              value={formData.subject} onChange={handleChange}
              onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)}
              style={inputStyle('subject')}
            />
            <textarea
              name="message" placeholder="Your Message" rows={5} aria-label="Your Message"
              value={formData.message} onChange={handleChange}
              onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
              style={inputStyle('message')}
              required
            />
            {submitted && (
              <div role="alert" style={{
                padding: '14px 18px', borderRadius: 12,
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                color: '#4ade80', fontSize: '0.9rem',
                display: 'flex', alignItems: 'center', gap: 8
              }}>
                <span>&#10003;</span> Message sent! I'll get back to you soon.
              </div>
            )}
            {error && (
              <div role="alert" style={{
                padding: '14px 18px', borderRadius: 12,
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                color: '#ef4444', fontSize: '0.9rem',
                display: 'flex', alignItems: 'center', gap: 8
              }}>
                <span>&#10007;</span> Something went wrong. Please try again.
              </div>
            )}
            <button type="submit" disabled={sending} style={{
              padding: '14px 32px', borderRadius: 12,
              background: sending ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #6366f1, #a855f7)',
              border: 'none', color: 'white',
              fontWeight: 600, fontSize: '1rem',
              cursor: sending ? 'not-allowed' : 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: sending ? 'none' : '0 0 30px rgba(99,102,241,0.3)',
              transition: 'all 0.3s', opacity: sending ? 0.6 : 1
            }}
            onMouseEnter={e => {
              if (!sending) {
                e.currentTarget.style.boxShadow = '0 0 50px rgba(99,102,241,0.5)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = sending ? 'none' : '0 0 30px rgba(99,102,241,0.3)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
            >
              <FiSend size={18} />
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
