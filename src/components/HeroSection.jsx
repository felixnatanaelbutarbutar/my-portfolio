import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi'
import '../css/HeroSection.css'

export default function HeroSection({ scrollToSection }) {
  return (
    <section id="home" className="hero">
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">Software engineer <span>·</span> Applied AI</p>

          <h1 className="hero__name">
            <span>Felix Natanael</span>
            <span className="hero__surname">Butarbutar</span>
          </h1>

          <div className="hero__bottom">
            <div>
              <p className="hero__location">South Jakarta, Indonesia</p>
              <p className="hero__statement">
                I build reliable enterprise software and applied AI systems, from CRM workflows to production machine-learning pipelines.
              </p>
            </div>

            <div className="hero__actions">
              <a href="#projects" className="hero__primary" onClick={(event) => { event.preventDefault(); scrollToSection('projects') }}>
                Explore selected work <FiArrowUpRight aria-hidden="true" />
              </a>
              <a className="hero__secondary" href="/assets/pdf/CV_FelixNatanaelButarbutar.pdf" target="_blank" rel="noreferrer">
                View CV
              </a>
            </div>
          </div>
        </div>

        <figure className="hero__portrait">
          <div className="hero__portrait-frame">
            <img
              src="/assets/image/pp.jpeg"
              alt="Portrait of Felix Natanael Butarbutar"
              width="1086"
              height="1448"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <figcaption>
            <span>Currently building CRM and AI workflows</span>
            <span>Jakarta · Indonesia</span>
          </figcaption>
        </figure>
      </div>

      <a className="hero__scroll" href="#projects" onClick={(event) => { event.preventDefault(); scrollToSection('projects') }}>
        <span>Scroll to selected work</span>
        <FiArrowDown aria-hidden="true" />
      </a>
    </section>
  )
}
