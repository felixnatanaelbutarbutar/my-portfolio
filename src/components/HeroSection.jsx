import { useEffect, useRef } from 'react'
import '../css/HeroSection.css' 

const HeroSection = ({ scrollToSection }) => {
  const heroRef = useRef(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const particlesRef = useRef([])

  // ... (Bagian useEffect untuk mouse/particles BIARKAN SAMA PERSIS seperti kodemu sebelumnya) ...
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
      // Update cursor trail
      const cursor = document.querySelector('.custom-cursor')
      if (cursor) {
        cursor.style.left = `${e.clientX}px`
        cursor.style.top = `${e.clientY}px`
      }
      // Parallax effect
      const profilePhoto = document.querySelector('.profile-photo')
      if (profilePhoto && heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height
        profilePhoto.style.transform = `translate(${x * 20}px, ${y * 20}px) scale(1.05)`
      }
      // Floating elements
      const floatingElements = document.querySelectorAll('.floating-element')
      floatingElements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const elX = rect.left + rect.width / 2
        const elY = rect.top + rect.height / 2
        const distance = Math.sqrt(Math.pow(e.clientX - elX, 2) + Math.pow(e.clientY - elY, 2))
        if (distance < 150) {
          const angle = Math.atan2(e.clientY - elY, e.clientX - elX)
          const force = (150 - distance) / 150
          el.style.transform = `translate(${Math.cos(angle) * force * 30}px, ${Math.sin(angle) * force * 30}px) scale(${1 + force * 0.2})`
        }
      })
    }

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

    for (let i = 0; i < 30; i++) createParticle()
    const particles = [...particlesRef.current]
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      particles.forEach(particle => particle?.remove())
    }
  }, [])
  // ... (Akhir useEffect) ...

  return (
    <section id="home" className="section home-section" ref={heroRef}>
      {/* Background Elements (TETAP) */}
      <div className="animated-bg"></div>
      <div className="spotlight"></div>
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>
      <div className="floating-element floating-1"></div>
      <div className="floating-element floating-2"></div>
      <div className="floating-element floating-3"></div>
      <div className="floating-element floating-4"></div>
      <div className="floating-element floating-5"></div>

      <div className="container">
        <div className="home-content-grid">
          
          {/* BAGIAN TEKS (DIROMBAK STRUKTURNYA UNTUK EFEK BERGULUNG) */}
          <div className="text-content">
            
            {/* Title Line */}
            <div className="text-reveal-box">
              <span className="title-line rolling-text delay-1">Building the future, I'm</span>
            </div>

            {/* Nama Utama */}
            <h1 className="home-title">
              <div className="text-reveal-box">
                <span className="highlight rolling-text-large delay-2">Felix Natanael</span>
              </div>
              <div className="text-reveal-box">
                <span className="highlight rolling-text-large delay-3">Butarbutar</span>
              </div>
            </h1>

            {/* Subtitle / Job */}
            <div className="home-subtitle-wrapper">
              <div className="text-reveal-box">
                <p className="home-subtitle rolling-text delay-4">
                  <span className="subtitle-text">Full Stack Developer</span>
                  <span className="rolling-line"></span>
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="text-reveal-box mb-large">
              <p className="description rolling-text delay-5">
                Crafting digital experiences with modern technologies and creative solutions. 
                Turning ideas into reality, one line of code at a time.
              </p>
            </div>

            {/* Buttons */}
            <div className="home-buttons">
              <div className="text-reveal-box">
                <button
                  className="btn btn-primary rolling-button delay-6"
                  onClick={() => scrollToSection('experience')}
                >
                  <span>Lihat Projek</span>
                  <div className="btn-glow"></div>
                </button>
              </div>
              
              <div className="text-reveal-box">
                <button
                  className="btn btn-secondary rolling-button delay-7"
                  onClick={() => scrollToSection('contact')}
                >
                  <span>Hubungi Saya</span>
                </button>
              </div>
            </div>
          </div>

          {/* BAGIAN FOTO (TETAP SAMA PERSIS) */}
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

        {/* Scroll Indicator (TETAP) */}
        <div className="scroll-indicator">
          <div className="mouse"></div>
          <div className="scroll-arrow"></div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection