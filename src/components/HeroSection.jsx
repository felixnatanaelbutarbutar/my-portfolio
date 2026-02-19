import { useEffect, useRef, useState } from 'react'
import '../css/HeroSection.css'

const HeroSection = ({ scrollToSection }) => {
  const heroRef = useRef(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [showFirstCursor, setShowFirstCursor] = useState(false)
  const [showLastCursor, setShowLastCursor] = useState(false)
  const [, setIsTypingComplete] = useState(false)
  const mousePosition = useRef({ x: 0, y: 0 })
  const particlesRef = useRef([])

  const descriptionText = "Crafting digital experiences with modern technologies and creative solutions. Turning ideas into reality, one line of code at a time."

  // Smooth Typing Effect - FROM EMPTY
  useEffect(() => {
    const fullFirstName = "Felix Natanael"
    const fullLastName = "Butarbutar"
    
    // Start typing after animation delay
    const startDelay = setTimeout(() => {
      setShowFirstCursor(true)
      
      let firstIndex = 0
      const firstTyping = setInterval(() => {
        if (firstIndex <= fullFirstName.length) {
          setFirstName(fullFirstName.slice(0, firstIndex))
          firstIndex++
        } else {
          clearInterval(firstTyping)
          setShowFirstCursor(false)
          
          // Delay before starting last name
          setTimeout(() => {
            setShowLastCursor(true)
            let lastIndex = 0
            
            const lastTyping = setInterval(() => {
              if (lastIndex <= fullLastName.length) {
                setLastName(fullLastName.slice(0, lastIndex))
                lastIndex++
              } else {
                clearInterval(lastTyping)
                
                // Show cursor for 1.5s then hide
                setTimeout(() => {
                  setShowLastCursor(false)
                  setIsTypingComplete(true)
                }, 1500)
              }
            }, 80)
          }, 400)
        }
      }, 80)
    }, 1000)

    return () => clearTimeout(startDelay)
  }, [])

  // Enhanced Mouse Effects
  useEffect(() => {
    let frameCount = 0

    const handleMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }

      if (frameCount % 2 === 0) {
        // Smooth Parallax on profile photo
        const profilePhoto = document.querySelector('.profile-photo')
        if (profilePhoto && heroRef.current) {
          const rect = heroRef.current.getBoundingClientRect()
          const x = (e.clientX - rect.left - rect.width / 2) / rect.width
          const y = (e.clientY - rect.top - rect.height / 2) / rect.height
          
          const moveX = x * 20
          const moveY = y * 20
          
          profilePhoto.style.transform = `translate(${moveX}px, ${moveY}px)`
        }

        // Magnetic floating elements
        const floatingElements = document.querySelectorAll('.floating-element')
        floatingElements.forEach((el) => {
          const rect = el.getBoundingClientRect()
          const elX = rect.left + rect.width / 2
          const elY = rect.top + rect.height / 2
          const distance = Math.sqrt(
            Math.pow(e.clientX - elX, 2) + Math.pow(e.clientY - elY, 2)
          )

          if (distance < 250) {
            const angle = Math.atan2(e.clientY - elY, e.clientX - elX)
            const force = (250 - distance) / 250
            const moveX = Math.cos(angle) * force * 50
            const moveY = Math.sin(angle) * force * 50
            el.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.2}) rotate(${force * 10}deg)`
          } else {
            el.style.transform = ''
          }
        })

        // Dynamic spotlight
        const spotlight = document.querySelector('.spotlight')
        if (spotlight && heroRef.current) {
          const rect = heroRef.current.getBoundingClientRect()
          const x = ((e.clientX - rect.left) / rect.width) * 100
          const y = ((e.clientY - rect.top) / rect.height) * 100
          spotlight.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(139, 92, 246, 0.12) 0%, transparent 60%)`
        }
      }

      frameCount++
    }

    // Create enhanced particles
    const createParticle = () => {
      const particle = document.createElement('div')
      particle.className = 'particle'
      const size = Math.random() * 4 + 2
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.left = `${Math.random() * 100}%`
      particle.style.animationDuration = `${Math.random() * 20 + 15}s`
      particle.style.animationDelay = `${Math.random() * 8}s`
      particle.style.opacity = Math.random() * 0.5 + 0.3

      if (heroRef.current) {
        heroRef.current.appendChild(particle)
        particlesRef.current.push(particle)
      }
    }

    // Optimal particle count
    for (let i = 0; i < 25; i++) {
      createParticle()
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      particlesRef.current.forEach((p) => p?.remove())
    }
  }, [])

  // Enhanced Button Interaction
  const handleButtonHover = (e) => {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const distance = Math.sqrt(x * x + y * y)
    const maxDistance = Math.sqrt(rect.width * rect.width + rect.height * rect.height) / 2
    const force = 1 - (distance / maxDistance)

    btn.style.transform = `
      translateY(-3px) 
      scale(${1 + force * 0.03}) 
      translate(${x * 0.2}px, ${y * 0.2}px)
    `
  }

  const handleButtonLeave = (e) => {
    const btn = e.currentTarget
    btn.style.transform = ''
  }

  // Photo Interactive Effects
  const handlePhotoHover = () => {
    const ring = document.querySelector('.photo-ring')
    if (ring) {
      ring.style.animationDuration = '12s'
    }
  }

  const handlePhotoLeave = () => {
    const ring = document.querySelector('.photo-ring')
    if (ring) {
      ring.style.animationDuration = '20s'
    }
  }

  return (
    <section id="home" className="section home-section" ref={heroRef}>
      {/* Enhanced Background Elements */}
      <div className="animated-bg"></div>
      <div className="spotlight"></div>
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="floating-element floating-1"></div>
      <div className="floating-element floating-2"></div>
      <div className="floating-element floating-3"></div>

      <div className="container">
        <div className="home-content-grid">
          {/* Text Content */}
          <div className="text-content">
            {/* Title Line */}
            <div className="text-reveal-box">
              <span className="title-line rolling-text delay-1">
                Building the future, I'm
              </span>
            </div>

            {/* Name with Smooth Typing - FROM EMPTY */}
            <h1 className="home-title" style={{ display: 'block', visibility: 'visible' }}>
              <div className="text-reveal-box">
                <span 
                  className="highlight rolling-text-large delay-2"
                  style={{ display: 'inline-block', opacity: 1, visibility: 'visible' }}
                >
                  {firstName}
                  {showFirstCursor && <span className="typing-cursor">|</span>}
                </span>
              </div>
              <div className="text-reveal-box">
                <span 
                  className="highlight rolling-text-large delay-3"
                  style={{ display: 'inline-block', opacity: 1, visibility: 'visible' }}
                >
                  {lastName}
                  {showLastCursor && <span className="typing-cursor">|</span>}
                </span>
              </div>
            </h1>

            {/* Elegant Subtitle */}
            <div className="home-subtitle-wrapper">
              <div className="text-reveal-box">
                <p className="home-subtitle rolling-text delay-4">
                  <span className="subtitle-text">Full Stack Developer</span>
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="text-reveal-box mb-large">
              <div className="description-container">
                <p className="description typing-effect">
                  {descriptionText}
                </p>
              </div>
            </div>

            {/* Premium Buttons */}
            <div className="home-buttons">
              <div className="text-reveal-box">
                <button
                  className="btn btn-primary rolling-button delay-6"
                  onClick={() => scrollToSection('experience')}
                  onMouseMove={handleButtonHover}
                  onMouseLeave={handleButtonLeave}
                >
                  <span>See My Projects</span>
                </button>
              </div>

              <div className="text-reveal-box">
                <button
                  className="btn btn-secondary rolling-button delay-7"
                  onClick={() => scrollToSection('contact')}
                  onMouseMove={handleButtonHover}
                  onMouseLeave={handleButtonLeave}
                >
                  <span>Get In Touch</span>
                </button>
              </div>
            </div>
          </div>

          {/* Profile Photo with Stellar Effects */}
          <div className="profile-photo-container">
            <div className="photo-spotlight"></div>
            <div className="photo-glow"></div>
            <div className="photo-ring"></div>
            <img
              src="/assets/image/profile2.png"
              alt="Felix Natanael Butarbutar"
              className="profile-photo"
              onMouseEnter={handlePhotoHover}
              onMouseLeave={handlePhotoLeave}
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div className="profile-photo-placeholder" style={{ display: 'none' }}>
              <span>FN</span>
            </div>
          </div>
        </div>

        {/* Elegant Scroll Indicator */}
        <div
          className="scroll-indicator"
          onClick={() => scrollToSection('about')}
        >
          <div className="mouse"></div>
          <div className="scroll-arrow"></div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection