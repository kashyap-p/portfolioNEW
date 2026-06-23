import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useInView } from 'react-intersection-observer'
import {
  SiReact, SiNodedotjs, SiTypescript, SiPython,
  SiPostgresql, SiDocker, SiGraphql,
  SiTailwindcss, SiGit, SiMongodb, SiFigma, SiVercel
} from 'react-icons/si'

const skillCategories = [
  {
    title: 'Frontend',
    color: '#6366f1',
    skills: [
      { name: 'React', icon: SiReact, level: 95 },
      { name: 'TypeScript', icon: SiTypescript, level: 90 },
      { name: 'Tailwind CSS', icon: SiTailwindcss, level: 92 },
      { name: 'GraphQL', icon: SiGraphql, level: 85 },
    ]
  },
  {
    title: 'Backend',
    color: '#a855f7',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, level: 93 },
      { name: 'Python', icon: SiPython, level: 88 },
      { name: 'PostgreSQL', icon: SiPostgresql, level: 87 },
      { name: 'MongoDB', icon: SiMongodb, level: 82 },
    ]
  },
  {
    title: 'DevOps & Tools',
    color: '#ec4899',
    skills: [
      { name: 'Docker', icon: SiDocker, level: 85 },
      { name: 'Vercel', icon: SiVercel, level: 80 },
      { name: 'Git', icon: SiGit, level: 95 },
      { name: 'Figma', icon: SiFigma, level: 78 },
    ]
  }
]

function SkillOrb({ position, color }) {
  const mesh = useRef()
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.5
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position} ref={mesh}>
        <mesh>
          <dodecahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>
        <mesh scale={0.85}>
          <dodecahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.1}
          />
        </mesh>
      </group>
    </Float>
  )
}

function SkillsScene() {
  const orbs = useMemo(() => [
    { pos: [-3, 1.5, 0], color: '#6366f1', name: 'React', level: 95 },
    { pos: [-1, -1, 1], color: '#a855f7', name: 'Node.js', level: 93 },
    { pos: [1.5, 1.2, -1], color: '#ec4899', name: 'TypeScript', level: 90 },
    { pos: [3, -0.5, 0], color: '#22d3ee', name: 'Python', level: 88 },
    { pos: [0, 2.5, -2], color: '#6366f1', name: 'Docker', level: 85 },
    { pos: [-2, -2, -1], color: '#a855f7', name: 'AWS', level: 80 },
  ], [])

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#6366f1" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#a855f7" />
      {orbs.map((orb, i) => (
        <SkillOrb key={i} position={orb.pos} color={orb.color} />
      ))}
    </>
  )
}

function SkillBar({ skill, color, delay, inView }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 6
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          color: '#e4e4e7', fontSize: '0.9rem'
        }}>
          <skill.icon size={16} color={color} />
          {skill.name}
        </div>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.75rem', color
        }}>
          {skill.level}%
        </span>
      </div>
      <div style={{
        height: 6, borderRadius: 3,
        background: 'rgba(255,255,255,0.06)',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%', borderRadius: 3,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          width: inView ? `${skill.level}%` : '0%',
          transition: `width 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
          boxShadow: `0 0 10px ${color}40`
        }} />
      </div>
    </div>
  )
}

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="skills" ref={ref} style={{
      padding: '120px 0', position: 'relative',
      background: '#0a0a0f'
    }}>
      <div className="section-container">
        <div style={{
          textAlign: 'center', marginBottom: '4rem',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease'
        }}>
          <div className="glow-line" style={{ margin: '0 auto 1.5rem' }} />
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-subtitle" style={{ margin: '1rem auto 0' }}>
            Technologies I work with to build amazing products
          </p>
        </div>

        {/* 3D Visualization */}
        <div style={{
          height: 350, borderRadius: 20, marginBottom: '3rem',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          overflow: 'hidden',
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.8s ease 0.2s'
        }}>
          <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
            <Suspense fallback={null}>
              <SkillsScene />
            </Suspense>
          </Canvas>
        </div>

        {/* Skill Bars by Category */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {skillCategories.map((cat, catIdx) => (
            <div key={cat.title} style={{
              padding: '24px', borderRadius: 16,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.6s ease ${0.3 + catIdx * 0.15}s`
            }}>
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.1rem', fontWeight: 600,
                color: cat.color, marginBottom: '1.2rem',
                display: 'flex', alignItems: 'center', gap: 8
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: cat.color, display: 'inline-block'
                }} />
                {cat.title}
              </h3>
              {cat.skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  color={cat.color}
                  delay={0.5 + catIdx * 0.2 + i * 0.1}
                  inView={inView}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
