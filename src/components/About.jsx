import { useRef, useCallback, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { useInView } from 'react-intersection-observer'

function AvatarSphere() {
  const mesh = useRef()
  const handleOver = useCallback(() => mesh.current?.scale.setScalar(1.05), [])
  const handleOut = useCallback(() => mesh.current?.scale.setScalar(1), [])
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.3
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })
  return (
      <Float speed={2} rotationIntensity={0} floatIntensity={1}>
        <mesh ref={mesh}
          onPointerOver={handleOver}
          onPointerOut={handleOut}
        >
        <sphereGeometry args={[1.8, 64, 64]} />
        <MeshDistortMaterial
          color="#6366f1"
          emissive="#4f46e5"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  )
}

function AboutScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#6366f1" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#a855f7" />
      <AvatarSphere />
    </>
  )
}

const techStack = [
  'React', 'Node.js', 'TypeScript', 'Python',
  'PostgreSQL', 'AWS', 'Docker', 'GraphQL'
]

const timeline = [
  { year: '2024', role: 'Senior Developer', company: 'Tech Corp', desc: 'Leading full-stack development of enterprise SaaS platform' },
  { year: '2022', role: 'Full Stack Developer', company: 'StartupXYZ', desc: 'Built and scaled core product from 0 to 50k users' },
  { year: '2021', role: 'Frontend Developer', company: 'Digital Agency', desc: 'Developed performant web apps for Fortune 500 clients' },
]

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="about" ref={ref} style={{
      padding: '120px 0', position: 'relative',
      background: 'linear-gradient(180deg, #0a0a0f 0%, #111118 100%)'
    }}>
      <div className="section-container">
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem', alignItems: 'center'
        }}>
          {/* 3D Side */}
          <div style={{
            height: 400, borderRadius: 20,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            overflow: 'hidden',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(-40px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <Suspense fallback={null}>
                <AboutScene />
              </Suspense>
            </Canvas>
          </div>

          {/* Content Side */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(40px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
          }}>
            <div className="glow-line" />
            <h2 className="section-title">About Me</h2>
            <p style={{
              color: '#a1a1aa', fontSize: '1.05rem',
              lineHeight: 1.8, marginBottom: '2rem'
            }}>
              I'm a passionate full-stack developer with expertise in building
              modern web applications. I love turning complex problems into
              simple, beautiful, and intuitive solutions.
            </p>

            {/* Tech Tags */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '2rem'
            }}>
              {techStack.map(tech => (
                <span key={tech} style={{
                  padding: '6px 14px', borderRadius: 8,
                  background: 'rgba(99, 102, 241, 0.1)',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  color: '#818cf8', fontSize: '0.8rem',
                  fontFamily: "'JetBrains Mono', monospace"
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ marginTop: '4rem' }}>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.3rem', fontWeight: 600,
            marginBottom: '2rem', color: '#e4e4e7'
          }}>
            Experience Timeline
          </h3>
          <div style={{ position: 'relative', paddingLeft: '2rem' }}>
            <div style={{
              position: 'absolute', left: '6px', top: 0, bottom: 0,
              width: 2, background: 'linear-gradient(180deg, #6366f1, #a855f7, transparent)'
            }} />
            {timeline.map((item, i) => (
              <div key={i} style={{
                position: 'relative', marginBottom: '2.5rem',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease ${0.3 + i * 0.15}s`
              }}>
                <div style={{
                  position: 'absolute', left: '-2rem', top: '6px',
                  width: 14, height: 14, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  border: '2px solid #0a0a0f'
                }} />
                <div style={{
                  padding: '20px 24px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'
                  e.currentTarget.style.background = 'rgba(99,102,241,0.05)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                }}
                >
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: 8
                  }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.8rem', color: '#6366f1'
                    }}>
                      {item.year}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#71717a' }}>
                      {item.company}
                    </span>
                  </div>
                  <div style={{ fontWeight: 600, marginBottom: 4, color: '#e4e4e7' }}>
                    {item.role}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#a1a1aa' }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
