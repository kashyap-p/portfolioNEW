import { useRef, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi'

const projects = [
  {
    title: 'Todo App',
    desc: 'A clean client-side todo list app built with plain HTML, CSS and JavaScript. Add, complete, and manage tasks with a minimal interface.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    stats: { stars: 0, forks: 0 },
    github: 'https://github.com/kashyap-p/todo-app',
    href: 'https://kashyap-p.github.io/todo-app/',
    image: '/images/todo-app.png',
    featured: true,
  },
  {
    title: 'Tech News',
    desc: 'A static tech-news demo site built with plain HTML, CSS and JavaScript. Browse and read tech articles with a responsive layout.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    color: '#a855f7',
    gradient: 'linear-gradient(135deg, #a855f7, #9333ea)',
    stats: { stars: 0, forks: 0 },
    github: 'https://github.com/kashyap-p/tech-news',
    href: 'https://kashyap-p.github.io/tech-news/',
    image: '/images/tech-news.png',
    featured: true,
  },
  {
    title: 'Social Media Analytics',
    desc: 'Cross-platform social media analytics tool with sentiment analysis, engagement prediction, and automated reporting.',
    tech: ['React', 'FastAPI', 'MongoDB', 'Redis', 'Docker'],
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
    stats: { stars: 67, forks: 18 },
    featured: false,
  },
  {
    title: 'Real-time Collaboration Tool',
    desc: 'A collaborative workspace with real-time document editing, video conferencing, and project management features.',
    tech: ['React', 'Socket.io', 'Node.js', 'WebRTC', 'PostgreSQL'],
    color: '#22d3ee',
    gradient: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
    stats: { stars: 156, forks: 42 },
    featured: true,
  },
  {
    title: 'DevOps Pipeline Manager',
    desc: 'CI/CD pipeline visualization and management tool with container orchestration and deployment monitoring.',
    tech: ['Vue.js', 'Go', 'Kubernetes', 'Terraform', 'Grafana'],
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    stats: { stars: 94, forks: 28 },
    featured: false,
  },
  {
    title: 'Healthcare Patient Portal',
    desc: 'HIPAA-compliant patient management system with telehealth capabilities, appointment scheduling, and medical records.',
    tech: ['React', 'NestJS', 'PostgreSQL', 'Redis', 'Azure'],
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    stats: { stars: 73, forks: 15 },
    featured: false,
  },
]

function ProjectCard({ project, index, inView }) {
  const cardRef = useRef()
  const acronymRef = useRef()

  const handleEnter = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    el.style.borderColor = project.color + '40'
    el.style.transform = 'translateY(-8px)'
    el.style.boxShadow = `0 20px 40px ${project.color}15`
    if (acronymRef.current) acronymRef.current.style.transform = 'scale(1.1)'
  }, [project.color])

  const handleLeave = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    el.style.borderColor = 'rgba(255,255,255,0.06)'
    el.style.transform = inView ? 'translateY(0)' : 'translateY(40px)'
    el.style.boxShadow = 'none'
    if (acronymRef.current) acronymRef.current.style.transform = 'scale(1)'
  }, [project.color, inView])

  return (
    <div ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        borderRadius: 16,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        opacity: inView ? 1 : 0,
        transitionDelay: `${index * 0.1}s`,
        cursor: 'pointer',
        willChange: 'transform, box-shadow'
      }}
    >
      {/* Header bar */}
      <div style={{
        padding: '16px 20px',
        background: `linear-gradient(135deg, ${project.color}10, ${project.color}05)`,
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        </div>
        {project.featured && (
          <span style={{
            padding: '3px 10px', borderRadius: 999,
            background: `${project.color}20`, color: project.color,
            fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 600
          }}>
            Featured
          </span>
        )}
      </div>

      {/* Project Image Area */}
      <div style={{
        height: 180, position: 'relative',
        background: project.gradient,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {project.image ? (
          <img src={project.image} alt={project.title}
            ref={acronymRef}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: 'scale(1)',
              transition: 'transform 0.4s ease'
            }}
            onError={e => { e.target.style.display = 'none' }}
          />
        ) : (
          <>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1), transparent 60%)'
            }} />
            <div ref={acronymRef} style={{
              fontSize: '3rem', fontWeight: 800, color: 'rgba(255,255,255,0.15)',
              fontFamily: "'Space Grotesk', sans-serif",
              transform: 'scale(1)',
              transition: 'transform 0.4s ease'
            }}>
              {project.title.split(' ').map(w => w[0]).join('')}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '1.2rem', fontWeight: 700,
          color: '#e4e4e7', marginBottom: 8
        }}>
          {project.title}
        </h3>
        <p style={{
          fontSize: '0.88rem', color: '#a1a1aa',
          lineHeight: 1.6, marginBottom: '1rem'
        }}>
          {project.desc}
        </p>

        {/* Tech tags */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1rem'
        }}>
          {project.tech.map(t => (
            <span key={t} style={{
              padding: '4px 10px', borderRadius: 6,
              background: `${project.color}10`,
              color: project.color,
              fontSize: '0.72rem',
              fontFamily: "'JetBrains Mono', monospace"
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* Stats & Actions */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', paddingTop: '1rem',
          borderTop: '1px solid rgba(255,255,255,0.06)'
        }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{
              display: 'flex', alignItems: 'center', gap: 4,
              fontSize: '0.8rem', color: '#71717a'
            }}>
              <FiGithub size={13} /> {project.stats.forks}
            </span>
          </div>
          <div style={{
            display: 'flex', gap: 8
          }}>
            <a href={project.github || '#'} target="_blank" rel="noopener noreferrer" style={{
              padding: '8px 14px', borderRadius: 8,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#a1a1aa', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 4,
              fontSize: '0.8rem', transition: 'all 0.3s', textDecoration: 'none'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = project.color
              e.currentTarget.style.color = project.color
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.color = '#a1a1aa'
            }}
            >
              <FiGithub size={14} />
            </a>
            <a href={project.href || '#'} target="_blank" rel="noopener noreferrer" style={{
              padding: '8px 14px', borderRadius: 8,
              background: project.color,
              border: 'none',
              color: 'white', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 4,
              fontSize: '0.8rem', fontWeight: 500,
              transition: 'all 0.3s', textDecoration: 'none'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.9'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
            >
              <FiExternalLink size={14} />
              Live
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="projects" ref={ref} style={{
      padding: '120px 0', position: 'relative',
      background: 'linear-gradient(180deg, #0a0a0f 0%, #111118 50%, #0a0a0f 100%)'
    }}>
      <div className="section-container">
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease'
        }}>
          <div>
            <div className="glow-line" />
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              A selection of projects that showcase my skills and passion
            </p>
          </div>
          <a href="#" style={{
            display: 'flex', alignItems: 'center', gap: 6,
            color: '#6366f1', fontSize: '0.9rem', fontWeight: 500,
            transition: 'gap 0.3s'
          }}
          onMouseEnter={e => e.currentTarget.style.gap = '10px'}
          onMouseLeave={e => e.currentTarget.style.gap = '6px'}
          >
            View All <FiArrowRight />
          </a>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
