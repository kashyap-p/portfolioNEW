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
          position: 'fixed', inset: 0, background: '#0a0a0f',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          color: '#e4e4e7', fontFamily: 'monospace', padding: 24
        }}>
          <h2 style={{ color: '#ef4444', marginBottom: 16 }}>Something went wrong</h2>
          <pre style={{
            background: 'rgba(255,255,255,0.05)', padding: 16,
            borderRadius: 8, maxWidth: 600, overflow: 'auto',
            fontSize: '0.85rem', color: '#a1a1aa'
          }}>
            {this.state.error?.message}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
