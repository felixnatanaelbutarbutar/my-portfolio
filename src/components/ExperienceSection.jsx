import { useEffect, useRef, useState } from 'react'
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiX } from 'react-icons/fi'
import '../css/ExperienceSection.css'

const FEATURED_PROJECTS = [
  {
    id: 'ruangrpp',
    number: '01',
    title: 'RuangRPP',
    subtitle: 'AI-assisted lesson planning',
    role: 'Full-Stack Developer',
    date: 'August 2026',
    description: 'A curriculum knowledge platform that helps educators build citation-backed lesson plans from institutional learning materials.',
    highlights: [
      'Built a Next.js and FastAPI application backed by PostgreSQL 17 and Docker Compose.',
      'Created secure PDF/DOCX ingestion with anti-malware safeguards, extracting structured content from documents over 200 pages.',
      'Implemented Argon2id sessions, role-based access, request throttling, and rule-based curriculum validation for RAG-supported planning.',
    ],
    tech: ['Next.js', 'React 19', 'TypeScript', 'FastAPI', 'PostgreSQL 17', 'SQLAlchemy', 'Docker Compose', 'Pytest', 'RAG / LLM'],
  },
  {
    id: 'glitchrun',
    number: '02',
    title: 'GlitchRun',
    subtitle: 'Real-time multiplayer game platform',
    role: 'Software Engineer',
    date: 'May 2026',
    description: 'A real-time crash game built around concurrent multiplayer rounds and verifiable outcomes.',
    highlights: [
      'Designed a Go game engine with goroutines, channels, and a synchronized WebSocket hub serving sub-100ms game-loop updates.',
      'Implemented a provably fair outcome protocol with HMAC-SHA256 and SHA-256 pre-commitments.',
      'Built atomic cashout validation with Redis Lua scripts and a four-tier Go, Next.js, Redis, and PostgreSQL deployment.',
    ],
    tech: ['Go', 'Next.js', 'TypeScript', 'WebSockets', 'Redis Lua', 'PostgreSQL', 'Docker', 'Zustand', 'Tailwind CSS'],
  },
]

const PROJECTS = [
  {
    id: 'ielts',
    title: 'IELTS Speaking Evaluation System',
    role: 'Machine Learning Engineer',
    date: 'Aug 2025 — Feb 2026',
    description: 'A web-based speaking evaluation system using Whisper for speech recognition and DeBERTa v3-Base to assess semantic coherence. The earlier portfolio also documents T5-based grammar correction.',
    tech: ['Python', 'PyTorch', 'Hugging Face Transformers', 'Whisper', 'DeBERTa v3', 'T5', 'FastAPI', 'Next.js', 'Google Colab'],
    images: ['/assets/image/ielts.png'],
  },
  {
    id: 'stress',
    title: 'Student Stress Level Prediction',
    role: 'Machine Learning Engineer',
    date: 'Aug — Dec 2025',
    description: 'Classifies questionnaire responses into Distress, Eustress, and No Stress using a 1D-CNN and XGBoost ensemble, with an interactive Streamlit application.',
    tech: ['Python', 'TensorFlow', 'Keras', 'XGBoost', 'SMOTE', 'Pandas', 'NumPy', 'Streamlit', 'Flask'],
    images: ['/assets/image/certan.png'],
  },
  {
    id: 'itdel-sis',
    title: 'IT Del Student Information System',
    role: 'Full-Stack Developer',
    date: 'Jan — Jul 2025',
    description: 'Academic information system with 24 functional features and role-based access across four system roles.',
    tech: ['Laravel', 'Inertia.js', 'React', 'PostgreSQL'],
    images: ['/assets/image/sik1.png', '/assets/image/sik2.png', '/assets/image/sik3.png'],
    githubUrl: 'https://github.com/felixnatanaelbutarbutar/PA-II-07-Sistem-Informasi-Kemahasiswaan-IT-DEL',
  },
  {
    id: 'delcheckin',
    title: 'DelCheckIn — Digital Attendance',
    role: 'Mobile Developer',
    date: 'Aug — Dec 2024',
    description: 'A digital attendance app for students and staff. The original portfolio reports 500+ users and 80% faster processing than manual sign-in.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    images: ['/assets/image/pam.png'],
    githubUrl: 'https://github.com/felixnatanaelbutarbutar/FLUTTER-ATTENDANCE-APP-USING-FIREBASE',
  },
  {
    id: 'cinema',
    title: 'Cinema Ticketing System',
    role: 'Backend & Frontend Developer',
    date: 'Jan — May 2024',
    description: 'Desktop cinema management software with dynamic seat selection, payment handling, and an administration module.',
    tech: ['Java', 'Java Swing', 'PostgreSQL', 'JDBC'],
    images: ['/assets/image/pbo.png'],
    githubUrl: 'https://github.com/felixnatanaelbutarbutar/OOP-JAVA-APLIKASI-TIKET-BIOSKOP-',
  },
  {
    id: 'hkbp',
    title: 'HKBP Church Information System',
    role: 'Web Developer',
    date: 'Jan — May 2024',
    description: 'A church management system for member records, finance, announcements, and administration. The original portfolio reports support for 300+ members.',
    tech: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS'],
    images: ['/assets/image/pa1.png'],
    githubUrl: 'https://github.com/felixnatanaelbutarbutar/SISTEM-INFORMASI-HKBP_PEANAJAGAR',
  },
  {
    id: 'toba-essence',
    title: 'Toba Essence: Heritage You Can Taste',
    role: 'Business Strategist',
    date: 'Oct — Dec 2025',
    description: 'A cultural tourism service concept around Lake Toba, developed through market research, a Business Model Canvas, and a Figma prototype.',
    tech: ['Figma', 'Business Model Canvas', 'Market Analysis'],
    images: ['/assets/image/tekno.png'],
  },
  {
    id: 'capacity-governance',
    title: 'System Capacity Governance',
    role: 'IT Governance',
    date: 'Dec 2025',
    description: 'Capacity management framework and As-Is/To-Be process design for a public-service system facing peak-load failures.',
    tech: ['COBIT', 'ITIL', 'ISO 38500'],
    images: ['/assets/image/tkti.png'],
  },
]

const WORK = [
  {
    id: 'bintang',
    role: 'Software Engineer',
    company: 'PT Bintang Aplikasi Perkasa',
    date: 'Aug 2026 — Present',
    location: 'South Jakarta, Indonesia',
    current: true,
    highlights: [
      'Develops enterprise CRM solutions using Microsoft Dynamics 365 and .NET (C#), including custom plugins and backend services.',
      'Designs and optimizes MSSQL schemas, complex queries, and stored procedures for business transactions.',
      'Builds n8n workflows and AI pipelines using Whisper and LLMs for interaction summaries and CRM ticket processing.',
    ],
    tech: ['Dynamics 365', '.NET / C#', 'MSSQL', 'n8n', 'Whisper', 'LLMs'],
  },
  {
    id: 'inaai',
    role: 'AI Engineer Intern',
    company: 'PT Teknologi Cerdas Berdaulat Indonesia (INaAI)',
    date: 'Feb 2026 — Aug 2026',
    location: 'Central Jakarta, Indonesia',
    current: false,
    highlights: [
      'Contributed to five enterprise AI projects for Mayora, Prima Abadi Distribusi, BPJS Ketenagakerjaan, and Polda Jakarta.',
      'Prepared retail computer-vision datasets and calibrated homographies across 58 CCTV cameras for Mayora shopper analytics.',
      'Designed adversarial, prompt-injection, and hallucination evaluations for a BPJS health-triage chatbot.',
      'Sourced multi-domain data and ran exploratory analysis for cocoa-price prediction.',
    ],
    tech: ['Python', 'Computer Vision', 'LLM Evaluation', 'CVAT', 'Data Analysis'],
  },
  {
    id: 'aoki-mori',
    role: 'Full-Stack Developer',
    company: 'PT Aoki Mori Indonesia',
    date: 'Apr 2025 — Dec 2025',
    location: 'Siborongborong, North Sumatra',
    current: false,
    highlights: [
      'Built an academic management platform with Go (Gin), GORM, JWT, and Next.js / TypeScript, covering 30+ REST API endpoints.',
      'Developed an e-learning system with assignment submissions and auto-graded online examinations.',
      'Connected company profile and student registration systems with Japanese, English, and Indonesian language support.',
      'Containerized services with Docker Compose and delivered responsive interfaces aligned to the institution brand.',
    ],
    tech: ['Go', 'Next.js', 'TypeScript', 'MySQL', 'Docker', 'i18n'],
    websiteUrl: 'https://lpkmoricentre.co.id',
  },
]

function ProjectImage({ project, onOpen }) {
  const [index, setIndex] = useState(0)

  if (!project.images?.length) return null

  const move = (step) => {
    setIndex((current) => (current + step + project.images.length) % project.images.length)
  }

  return (
    <div className="project-visual">
      <button
        className="project-visual__open"
        type="button"
        onClick={() => onOpen(project, index)}
        aria-label={'Open screenshot for ' + project.title}
      >
        <img
          src={project.images[index]}
          alt={project.title + ' project screenshot'}
          loading="lazy"
          decoding="async"
        />
        <span className="project-visual__hint">View image <span aria-hidden="true">↗</span></span>
      </button>

      {project.images.length > 1 && (
        <div className="project-visual__controls" role="group" aria-label="Screenshot navigation">
          <button type="button" onClick={() => move(-1)} aria-label={'Previous ' + project.title + ' screenshot'}>
            <FiArrowLeft aria-hidden="true" />
          </button>
          <span>{String(index + 1).padStart(2, '0')} / {String(project.images.length).padStart(2, '0')}</span>
          <button type="button" onClick={() => move(1)} aria-label={'Next ' + project.title + ' screenshot'}>
            <FiArrowRight aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}

export default function ExperienceSection() {
  const [lightbox, setLightbox] = useState(null)
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!lightbox) return undefined

    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()

    const handleKeys = (event) => {
      if (event.key === 'Escape') setLightbox(null)
      if (event.key === 'ArrowRight') {
        setLightbox((state) => ({ ...state, index: (state.index + 1) % state.project.images.length }))
      }
      if (event.key === 'ArrowLeft') {
        setLightbox((state) => ({ ...state, index: (state.index - 1 + state.project.images.length) % state.project.images.length }))
      }
      if (event.key === 'Tab') {
        const focusable = [...(dialogRef.current?.querySelectorAll('button') ?? [])]
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeys)
    return () => {
      window.removeEventListener('keydown', handleKeys)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [lightbox])

  const openImage = (project, index) => setLightbox({ project, index })

  return (
    <div className="work-showcase">
      <section id="projects" className="projects-section section-wrap" aria-labelledby="projects-heading">
        <div className="projects-section__heading">
          <div>
            <span className="section-label">Selected work · 2026</span>
            <h2 id="projects-heading" className="section-heading">Built to work<br /><em>in the real world.</em></h2>
          </div>
          <p>Recent systems across applied AI, enterprise workflows, and full-stack product engineering.</p>
        </div>

        <div className="featured-projects">
          {FEATURED_PROJECTS.map((project) => (
            <article className="featured-project" key={project.id}>
              <div className="featured-project__top">
                <span className="featured-project__number">{project.number}</span>
                <span>{project.date}</span>
              </div>
              <p className="featured-project__subtitle">{project.subtitle}</p>
              <h3>{project.title}</h3>
              <p className="featured-project__description">{project.description}</p>
              <ul>
                {project.highlights.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p className="featured-project__tech">{project.role} <span>·</span> {project.tech.join(' · ')}</p>
            </article>
          ))}
        </div>

        <div className="project-archive-heading">
          <h3>More work</h3>
          <p>Eight projects across web, mobile, machine learning, and systems design.</p>
        </div>

        <div className="project-archive">
          {PROJECTS.map((project) => (
            <article className="project-card" key={project.id}>
              {project.images?.length > 0 && (
                <ProjectImage project={project} onOpen={openImage} />
              )}
              <div className="project-card__content">
                <div className="project-meta">
                  <span>{project.role}</span>
                  <span>{project.date}</span>
                </div>
                <h4>{project.title}</h4>
                <p className="project-description">{project.description}</p>
                <div className="project-footer">
                  <p className="project-tech">{project.tech.join(' · ')}</p>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-link">
                      Source <FiArrowUpRight aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="experience-section section-wrap" aria-labelledby="experience-heading">
        <div className="experience-section__heading">
          <div>
            <span className="section-label">Experience</span>
            <h2 id="experience-heading" className="section-heading">Where I’ve<br /><em>contributed.</em></h2>
          </div>
          <p>Roles spanning enterprise CRM, applied AI, and international education technology.</p>
        </div>

        <div className="experience-list">
          {WORK.map((item, index) => (
            <article className="experience-item" key={item.id}>
              <div className="experience-item__meta">
                <span className="experience-item__index">0{index + 1}</span>
                <span>{item.date}</span>
                {item.current && <span className="experience-item__current">Current</span>}
              </div>
              <div className="experience-item__content">
                <div className="experience-item__title">
                  <div>
                    <h3>{item.company}</h3>
                    <p>{item.role} <span>·</span> {item.location}</p>
                  </div>
                  {item.websiteUrl && (
                    <a href={item.websiteUrl} target="_blank" rel="noreferrer" aria-label={'Visit ' + item.company + ' website'}>
                      <FiArrowUpRight aria-hidden="true" />
                    </a>
                  )}
                </div>
                <ul>
                  {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
                <p className="experience-item__tech">{item.tech.join(' · ')}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {lightbox && (
        <div
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.project.title + ' image preview'}
          tabIndex={-1}
          ref={dialogRef}
          onMouseDown={(event) => { if (event.target === event.currentTarget) setLightbox(null) }}
        >
          <button className="project-lightbox__close" type="button" onClick={() => setLightbox(null)} aria-label="Close image preview">
            <FiX aria-hidden="true" />
          </button>
          {lightbox.project.images.length > 1 && (
            <button className="project-lightbox__previous" type="button" onClick={() => setLightbox((state) => ({ ...state, index: (state.index - 1 + state.project.images.length) % state.project.images.length }))} aria-label="Previous image">
              <FiArrowLeft aria-hidden="true" />
            </button>
          )}
          <figure>
            <img src={lightbox.project.images[lightbox.index]} alt={lightbox.project.title + ' project screenshot'} />
            <figcaption>{lightbox.project.title} · {lightbox.index + 1} / {lightbox.project.images.length}</figcaption>
          </figure>
          {lightbox.project.images.length > 1 && (
            <button className="project-lightbox__next" type="button" onClick={() => setLightbox((state) => ({ ...state, index: (state.index + 1) % state.project.images.length }))} aria-label="Next image">
              <FiArrowRight aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
