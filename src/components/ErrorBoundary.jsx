import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed', inset: 0, background: 'var(--color-bg)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          color: 'var(--color-text)', fontFamily: 'monospace', padding: 24
        }}>
          <h2 style={{ color: '#ef4444', marginBottom: 16 }}>Something went wrong</h2>
          <pre style={{
            background: 'var(--bg-card)', padding: 16,
            borderRadius: 8, maxWidth: 600, overflow: 'auto',
            fontSize: '0.85rem', color: 'var(--color-text-secondary)'
          }}>
            {this.state.error?.message}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
