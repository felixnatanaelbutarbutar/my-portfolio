import { useEffect, useState, useRef } from 'react'
import '../css/HeroSection.css'

const HeroSection = ({ scrollToSection }) => {
  const [ready, setReady] = useState(false)
  const cardRef = useRef(null)
  const shineRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200)
    return () => clearTimeout(t)
  }, [])

  // 3D Tilt Effect
  useEffect(() => {
    const card = cardRef.current
    const shine = shineRef.current

    if (!card || !shine) return

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -15
      const rotateY = ((x - centerX) / centerX) * 15

      card.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`

      // Update shine effect position
      const mouseX = (x / rect.width) * 100
      const mouseY = (y / rect.height) * 100
      shine.style.setProperty('--mouse-x', mouseX + '%')
      shine.style.setProperty('--mouse-y', mouseY + '%')
    }

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section id="home" className={`hero ${ready ? 'hero--visible' : ''}`}>
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-grain" />
      </div>
      <div className="hero__container">
        {/* Main Row */}
        <div className="hero__main">
          {/* Left Column: Text & Info */}
          <div className="hero__content">
            <div className="hero__header">
              <p className="hero__hi">Hi there, I'm</p>
              <h1 className="hero__name">
                <span className="hero__name-first" data-text="Felix">Felix</span>
                <span className="hero__name-first" data-text="Natanael">Natanael</span>
                <span className="hero__name-last" data-text="Butarbutar">Butarbutar</span>
              </h1>
            </div>
            <div className="hero__info-block">
              <div className="hero__identity-text">
                <span className="hero__role">Full Stack Developer - AI Engineer</span>
                <span className="hero__loc">Jakarta Selatan, Indonesia</span>
              </div>
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

          {/* Right Column: FIFA Card - PREMIUM VERSION */}
          <div className="hero__card-col">
            <div className="fifa-card-wrapper">
              <div className="fifa-card" ref={cardRef}>
                <div className="fifa-card__inner">
                  {/* Premium Border */}
                  <div className="fifa-card__border"></div>

                  {/* Holographic Overlay */}
                  <div className="fifa-card__holographic"></div>

                  {/* Shine Effect */}
                  <div className="fifa-card__shine" ref={shineRef}></div>

                  {/* Corner Accents */}
                  <div className="fifa-corner-accent fifa-corner-accent--tl"></div>
                  <div className="fifa-corner-accent fifa-corner-accent--tr"></div>
                  <div className="fifa-corner-accent fifa-corner-accent--bl"></div>
                  <div className="fifa-corner-accent fifa-corner-accent--br"></div>

                  {/* Sparkles */}
                  <div className="fifa-sparkle" style={{ left: '20%', top: '15%', animationDelay: '0s' }}></div>
                  <div className="fifa-sparkle" style={{ left: '80%', top: '25%', animationDelay: '1s' }}></div>
                  <div className="fifa-sparkle" style={{ left: '15%', top: '70%', animationDelay: '2s' }}></div>
                  <div className="fifa-sparkle" style={{ left: '85%', top: '80%', animationDelay: '1.5s' }}></div>
                  <div className="fifa-sparkle" style={{ left: '50%', top: '40%', animationDelay: '2.5s' }}></div>
                  <div className="fifa-sparkle" style={{ left: '30%', top: '90%', animationDelay: '0.5s' }}></div>

                  {/* Card Content */}
                  <div className="fifa-card__content">
                    {/* Rarity Badge */}
                    {/* <div className="fifa-rarity-badge">ICON</div> */}

                    {/* Rating & Position */}
                    <div className="fifa-card__rating-position">
                      <div className="fifa-card__rating">99</div>
                      <div className="fifa-card__position">FSD</div>
                    </div>

                    {/* Player Image */}
                    <div className="fifa-card__image-container">
                      <img
                        src="/assets/image/profile2.png"
                        alt="Felix Natanael Butarbutar"
                        className="fifa-card__avatar"
                      />
                    </div>

                    {/* Player Name */}
                    <div className="fifa-card__name">FELIX N.</div>

                    {/* Logos (Nation & Club) */}
                    <div className="fifa-card__logos">
                      <img src="https://flagcdn.com/w40/id.png" alt="Indonesia" className="fifa-card__logo" />
                      <img src="/assets/image/Real_Madrid_CF.png" alt="Real Madrid" className="fifa-card__logo fifa-card__logo--club" />
                    </div>

                    {/* Stats */}
                    <div className="fifa-card__stats">
                      <div className="fifa-stat">
                        <div className="fifa-stat__value">99</div>
                        <div className="fifa-stat__label">PAC</div>
                      </div>
                      <div className="fifa-stat">
                        <div className="fifa-stat__value">95</div>
                        <div className="fifa-stat__label">SHO</div>
                      </div>
                      <div className="fifa-stat">
                        <div className="fifa-stat__value">98</div>
                        <div className="fifa-stat__label">PAS</div>
                      </div>
                      <div className="fifa-stat">
                        <div className="fifa-stat__value">99</div>
                        <div className="fifa-stat__label">DRI</div>
                      </div>
                      <div className="fifa-stat">
                        <div className="fifa-stat__value">90</div>
                        <div className="fifa-stat__label">DEF</div>
                      </div>
                      <div className="fifa-stat">
                        <div className="fifa-stat__value">92</div>
                        <div className="fifa-stat__label">PHY</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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