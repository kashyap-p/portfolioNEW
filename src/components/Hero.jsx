import { useRef, useMemo, useCallback, memo, Suspense, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

const NAV_HEIGHT = 72

const ParticleField = memo(function ParticleField() {
  const mesh = useRef()
  const count = 800

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const c = new THREE.Color()
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50
      c.setHSL(0.6 + Math.random() * 0.3, 0.8, 0.6)
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return { positions: pos, colors: col }
  }, [])

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.elapsedTime * 0.015
      mesh.current.rotation.x = Math.sin(clock.elapsedTime * 0.008) * 0.08
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
})

const FloatingGeometry = memo(function FloatingGeometry() {
  return (
    <>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[4, 1, -5]} rotation={[0.5, 0.5, 0]}>
          <icosahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial color="#6366f1" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[-4, -2, -3]} rotation={[1, 0.5, 0]}>
          <octahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial color="#a855f7" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={1} floatIntensity={2.5}>
        <mesh position={[2, -3, -6]} rotation={[0, 1, 0.5]}>
          <torusGeometry args={[1, 0.3, 16, 32]} />
          <meshStandardMaterial color="#ec4899" wireframe transparent opacity={0.25} />
        </mesh>
      </Float>
    </>
  )
})

const RotatingTorusKnot = memo(function RotatingTorusKnot() {
  const mesh = useRef()
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.x = clock.elapsedTime * 0.25
      mesh.current.rotation.y = clock.elapsedTime * 0.15
    }
  })
  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh} position={[0, 0, -4]}>
        <torusKnotGeometry args={[1.5, 0.4, 100, 24, 2, 3]} />
        <meshStandardMaterial
          color="#6366f1" emissive="#4f46e5" emissiveIntensity={0.4}
          wireframe transparent opacity={0.2}
        />
      </mesh>
    </Float>
  )
})

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
      <ParticleField />
      <FloatingGeometry />
      <RotatingTorusKnot />
      <Stars radius={80} depth={40} count={1500} factor={3} saturation={0} fade speed={0.8} />
    </>
  )
}

class CanvasBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: false }
  }
  static getDerivedStateFromError() {
    return { error: true }
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.1) 0%, transparent 70%)'
        }} />
      )
    }
    return this.props.children
  }
}

function ThreeCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}

const Stats = memo(function Stats() {
  const stats = useMemo(() => [
    { num: '5+', label: 'Years Experience' },
    { num: '50+', label: 'Projects Completed' },
    { num: '30+', label: 'Happy Clients' },
  ], [])

  return (
    <div style={{ display: 'flex', gap: '3rem', marginTop: '4rem', flexWrap: 'wrap' }}>
      {stats.map(s => (
        <div key={s.label}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '2rem', fontWeight: 700,
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>{s.num}</div>
          <div style={{ fontSize: '0.85rem', color: '#71717a' }}>{s.label}</div>
        </div>
      ))}
    </div>
  )
})

export default function Hero() {
  const handlePrimaryEnter = useCallback((e) => {
    e.currentTarget.style.boxShadow = '0 0 50px rgba(99,102,241,0.6)'
    e.currentTarget.style.transform = 'translateY(-2px)'
  }, [])
  const handlePrimaryLeave = useCallback((e) => {
    e.currentTarget.style.boxShadow = '0 0 30px rgba(99,102,241,0.4)'
    e.currentTarget.style.transform = 'translateY(0)'
  }, [])
  const handleSecondaryEnter = useCallback((e) => {
    e.currentTarget.style.borderColor = '#6366f1'
    e.currentTarget.style.background = 'rgba(99,102,241,0.05)'
  }, [])
  const handleSecondaryLeave = useCallback((e) => {
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
    e.currentTarget.style.background = 'transparent'
  }, [])

  return (
    <section id="home" style={{
      position: 'relative',
      height: '100vh',
      overflow: 'hidden'
    }}>
      {/* 3D Background — fills entire 100vh behind navbar */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <CanvasBoundary>
          <ThreeCanvas />
        </CanvasBoundary>
      </div>

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10,10,15,0.6) 70%, rgba(10,10,15,0.95) 100%)'
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 2,
        paddingTop: NAV_HEIGHT + 40,
        paddingBottom: 60,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        boxSizing: 'border-box'
      }}>
        <div style={{ maxWidth: 700, width: '100%', paddingLeft: 86, paddingRight: 86 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 16px', borderRadius: 999,
            background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99,102,241,0.2)',
            marginBottom: '1.5rem', fontSize: '0.85rem', color: '#818cf8',
            fontFamily: "'JetBrains Mono', monospace"
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#22c55e', display: 'inline-block',
              animation: 'pulse 2s infinite'
            }} />
            Available for new opportunities
          </div>

          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 800, lineHeight: 1.05,
            marginBottom: '1.5rem'
          }}>
            <span style={{
              fontSize: 'clamp(1rem, 2vw, 1.5rem)',
              fontWeight: 400, color: '#a1a1aa',
              display: 'block', marginBottom: '0.5rem',
              fontFamily: "'Inter', sans-serif"
            }}>
              Hi, I'm Kashyap
            </span>
            Building
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              display: 'block'
            }}>
              Digital Experiences
            </span>
            That Matter
          </h1>

          <p style={{
            fontSize: '1.15rem', color: '#a1a1aa',
            lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: 520
          }}>
            Full-stack developer crafting performant web applications
            with modern technologies and clean architecture.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#projects" style={{
              padding: '14px 32px', borderRadius: 12,
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              color: 'white', fontWeight: 600, fontSize: '1rem',
              boxShadow: '0 0 30px rgba(99,102,241,0.4)',
              transition: 'all 0.3s', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 8
            }}
            onMouseEnter={handlePrimaryEnter}
            onMouseLeave={handlePrimaryLeave}
            >
              View Projects
              <span style={{ fontSize: '1.2rem' }}>&#8594;</span>
            </a>
            <a href="#contact" style={{
              padding: '14px 32px', borderRadius: 12,
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#e4e4e7', fontWeight: 500, fontSize: '1rem',
              transition: 'all 0.3s', cursor: 'pointer'
            }}
            onMouseEnter={handleSecondaryEnter}
            onMouseLeave={handleSecondaryLeave}
            >
              Get In Touch
            </a>
          </div>

          <Stats />
        </div>
      </div>
    </section>
  )
}
