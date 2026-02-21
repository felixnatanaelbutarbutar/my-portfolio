import { useEffect, useState } from 'react'
import '../css/HeroSection.css'

const HeroSection = ({ scrollToSection }) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200)
    return () => clearTimeout(t)
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

          {/* Right Column: FIFA Card */}
          <div className="hero__card-col">
            <div className="fifa-card" id="w-node-a6066a20-15fa-9e70-deae-1ade8abfe8f3-0597053f">
              {/* Card Background Glow */}
              <div className="fifa-card__bg"></div>

              {/* Shimmer Effect overlay */}
              <div className="fifa-card-shimmer"></div>

              {/* Card Content */}
              <div className="fifa-card__content">
                {/* Top Section: Rating, Position, Nation, Club */}
                <div className="fifa-card__top">
                  <div className="fifa-card__rating">99</div>
                  <div className="fifa-card__position">FSD</div>
                  <div className="fifa-card__nation">
                    <img src="https://flagcdn.com/w40/id.png" alt="Indonesia" className="fifa-card__flag" />
                  </div>
                  <div className="fifa-card__club">💻</div>
                </div>

                {/* Avatar Image */}
                <div className="fifa-card__image-wrapper">
                  <img
                    src="/assets/image/profile2.png"
                    alt="Felix Natanael Butarbutar"
                    className="fifa-card__avatar"
                  />
                </div>

                {/* Name */}
                <div className="fifa-card__name">FELIX N.</div>

                {/* Stats */}
                <div className="fifa-card__stats">
                  <div className="fifa-stat">
                    <span>99</span> <span>PAC</span>
                  </div>
                  <div className="fifa-stat">
                    <span>95</span> <span>SHO</span>
                  </div>
                  <div className="fifa-stat">
                    <span>98</span> <span>PAS</span>
                  </div>
                  <div className="fifa-stat">
                    <span>99</span> <span>DRI</span>
                  </div>
                  <div className="fifa-stat">
                    <span>90</span> <span>DEF</span>
                  </div>
                  <div className="fifa-stat">
                    <span>92</span> <span>PHY</span>
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