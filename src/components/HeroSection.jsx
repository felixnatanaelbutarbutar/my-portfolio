import { useEffect, useRef } from 'react'
import '../css/HeroSection.css' // pastikan path ini sesuai struktur proyekmu

const HeroSection = ({ scrollToSection }) => {
  const heroRef = useRef(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const particlesRef = useRef([])

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }

      // Update cursor trail
      const cursor = document.querySelector('.custom-cursor')
      if (cursor) {
        cursor.style.left = `${e.clientX}px`
        cursor.style.top = `${e.clientY}px`
      }

      // Parallax effect untuk foto profil
      const profilePhoto = document.querySelector('.profile-photo')
      if (profilePhoto && heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height

        profilePhoto.style.transform = `translate(${x * 20}px, ${y * 20}px) scale(1.05)`
      }

      // Floating elements interaction
      const floatingElements = document.querySelectorAll('.floating-element')
      floatingElements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const elX = rect.left + rect.width / 2
        const elY = rect.top + rect.height / 2
        const distance = Math.sqrt(
          Math.pow(e.clientX - elX, 2) + Math.pow(e.clientY - elY, 2)
        )

        if (distance < 150) {
          const angle = Math.atan2(e.clientY - elY, e.clientX - elX)
          const force = (150 - distance) / 150
          el.style.transform = `translate(${Math.cos(angle) * force * 30}px, ${Math.sin(angle) * force * 30}px) scale(${1 + force * 0.2})`
        }
      })
    }

    // Create particles
    const createParticle = () => {
      const particle = document.createElement('div')
      particle.className = 'particle'
      const size = Math.random() * 4 + 2
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particle.style.animationDuration = `${Math.random() * 20 + 10}s`
      particle.style.animationDelay = `${Math.random() * 5}s`
      particle.style.opacity = Math.random() * 0.5 + 0.2

      if (heroRef.current) {
        heroRef.current.appendChild(particle)
        particlesRef.current.push(particle)
      }
    }

    // Initialize particles
    for (let i = 0; i < 30; i++) {
      createParticle()
    }

    const particles = [...particlesRef.current]

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      particles.forEach(particle => {
        if (particle && particle.parentNode) {
          particle.remove()
        }
      })
    }
  }, [])

  return (
    <section id="home" className="section home-section" ref={heroRef}>
      <div className="animated-bg"></div>
      <div className="spotlight"></div>
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>

      {/* Floating Elements */}
      <div className="floating-element floating-1"></div>
      <div className="floating-element floating-2"></div>
      <div className="floating-element floating-3"></div>
      <div className="floating-element floating-4"></div>
      <div className="floating-element floating-5"></div>

      <div className="container">
        <div className="home-content-grid">
          <div className="text-content">
            <h1 className="home-title fade-in">
              <span className="title-line">Building the future, I'm</span>
              <span className="highlight typing-effect">Felix Natanael Butarbutar</span>
            </h1>
            <p className="home-subtitle fade-in">
              <span className="subtitle-text">Full Stack Developer</span>
              <span className="divider">|</span>
              {/* <span className="subtitle-text">UI/UX Enthusiast</span> */}
            </p>
            <p className="description fade-in">
              Crafting digital experiences with modern technologies and creative solutions. 
              Turning ideas into reality, one line of code at a time.
            </p>

            <div className="home-buttons fade-in">
              <button
                className="btn btn-primary pulse-on-hover"
                onClick={() => scrollToSection('experience')}
              >
                <span>Lihat Projek</span>
                <div className="btn-glow"></div>
              </button>
              <button
                className="btn btn-secondary pulse-on-hover"
                onClick={() => scrollToSection('contact')}
              >
                <span>Hubungi Saya</span>
              </button>
            </div>

            {/* <div className="stats-row fade-in">
              <div className="stat-item">
                <div className="stat-number">5+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Projects Done</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">30+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
            </div> */}
          </div>

          <div className="profile-photo-container fade-in">
            <div className="photo-spotlight"></div>
            <div className="photo-glow"></div>
            <div className="photo-ring"></div>
            <div className="photo-ring-2"></div>
            <div className="photo-hexagon"></div>
            <img
              src="/assets/image/profile2.png"
              alt="Profile"
              className="profile-photo"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div className="profile-photo-placeholder" style={{ display: 'none' }}>
              <span>FN</span>
            </div>
            <div className="photo-border-animation"></div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="mouse"></div>
          <div className="scroll-arrow"></div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection