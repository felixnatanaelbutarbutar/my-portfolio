import { useEffect, useState } from 'react'
import '../css/HeroSection.css'

const HeroSection = ({ scrollToSection }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [ready, setReady] = useState(false)

  // Soft entrance
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100)
    return () => clearTimeout(t)
  }, [])

  // Typing effect — slower, more deliberate
  useEffect(() => {
    if (!ready) return

    const fullFirst = 'Felix Natanael'
    const fullLast = 'Butarbutar'
    let i = 0
    let phase = 'first'

    const timer = setInterval(() => {
      if (phase === 'first') {
        if (i <= fullFirst.length) {
          setFirstName(fullFirst.slice(0, i))
          i++
        } else {
          phase = 'pause'
          i = 0
          setTimeout(() => { phase = 'last' }, 500)
        }
      } else if (phase === 'last') {
        if (i <= fullLast.length) {
          setLastName(fullLast.slice(0, i))
          i++
        } else {
          clearInterval(timer)
          setTimeout(() => setShowCursor(false), 2000)
        }
      }
    }, 100) // slower typing

    return () => clearInterval(timer)
  }, [ready])

  return (
    <section id="home" className={`hero ${ready ? 'hero--visible' : ''}`}>
      {/* Soft ambient glow — not a particle system, just a static subtle element */}
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__container">
        <div className="hero__grid">

          {/* Photo — shown first visually for human warmth */}
          <div className="hero__photo-col">
            <div className="hero__photo-frame">
              <img
                src="/assets/image/profile2.png"
                alt="Felix Natanael Butarbutar"
                className="hero__photo"
              />
            </div>
          </div>

          {/* Text content */}
          <div className="hero__text">
            <span className="hero__greeting">Hi, I'm</span>

            <h1 className="hero__name">
              <span className="hero__name-line">{firstName}</span>
              <span className="hero__name-line">{lastName}</span>
              {showCursor && <span className="hero__cursor" aria-hidden="true" />}
            </h1>

            <p className="hero__role">Full Stack Developer</p>

            <p className="hero__desc">
              Crafting digital experiences with modern technologies and creative
              solutions. Turning ideas into reality, one line of code at a time.
            </p>

            <div className="hero__actions">
              <button
                className="hero__btn hero__btn--fill"
                onClick={() => scrollToSection('experience')}
              >
                See My Projects
              </button>
              <button
                className="hero__btn hero__btn--ghost"
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </button>
            </div>
          </div>

        </div>

        {/* Scroll hint */}
        <button
          className="hero__scroll"
          onClick={() => scrollToSection('about')}
          aria-label="Scroll down"
        >
          <span className="hero__scroll-line" />
        </button>
      </div>
    </section>
  )
}

export default HeroSection