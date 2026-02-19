import { useEffect, useState } from 'react'
import '../css/HeroSection.css'

const HeroSection = ({ scrollToSection }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [ready, setReady] = useState(false)
  const [typeDone, setTypeDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200)
    return () => clearTimeout(t)
  }, [])

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
          setTimeout(() => {
            setShowCursor(false)
            setTypeDone(true)
          }, 1500)
        }
      }
    }, 100)

    return () => clearInterval(timer)
  }, [ready])

  return (
    <section id="home" className={`hero ${ready ? 'hero--visible' : ''}`}>
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-grain" />
      </div>

      <div className="hero__container">

        {/* Center — the name is the hero */}
        <div className="hero__center">
          <p className="hero__hi">Hi there, I'm</p>
          <h1 className={`hero__name ${typeDone ? 'hero__name--settled' : ''}`}>
            <span className="hero__name-first">{firstName}</span>
            <span className="hero__name-last">
              {lastName}
              {showCursor && <span className="hero__cursor" aria-hidden="true" />}
            </span>
          </h1>
        </div>

        {/* Bottom — split info row */}
        <div className="hero__bottom">

          {/* Left: photo + role */}
          <div className="hero__identity">
            <img
              src="/assets/image/profile2.png"
              alt="Felix Natanael Butarbutar"
              className="hero__avatar"
            />
            <div>
              <span className="hero__role">Full Stack Developer</span>
              <span className="hero__loc">Jakarta Selatan, Indonesia</span>
            </div>
          </div>

          {/* Right: tagline + actions */}
          <div className="hero__info">
            <p className="hero__desc">
              Crafting digital experiences with modern technologies and creative solutions.
              Turning ideas into reality, one line of code at a time.
            </p>
            <div className="hero__actions">
              <button className="hero__btn hero__btn--fill" onClick={() => scrollToSection('experience')}>
                See My Projects
              </button>
              <button className="hero__btn hero__btn--ghost" onClick={() => scrollToSection('contact')}>
                Get In Touch
              </button>
            </div>
          </div>

        </div>

        {/* Scroll line */}
        <button className="hero__scroll" onClick={() => scrollToSection('about')} aria-label="Scroll down">
          <span className="hero__scroll-line" />
        </button>

      </div>
    </section>
  )
}

export default HeroSection