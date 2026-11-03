import { FiArrowUpRight } from 'react-icons/fi'
import '../css/AboutSection.css'

const cvPath = '/assets/pdf/CV_FelixNatanaelButarbutar.pdf'

export default function AboutSection() {
  return (
    <section id="about" className="about section-wrap" aria-labelledby="about-heading">
      <div className="about__topline">
        <span className="section-label">A little about me</span>
        <span className="about__index">01 / Profile</span>
      </div>

      <div className="about__grid">
        <h2 id="about-heading" className="about__heading">
          Engineering systems<br />
          <em>that make work clearer.</em>
        </h2>

        <div className="about__body">
          <p>
            I’m a software engineer working across enterprise CRM, full-stack products, and applied AI. I currently build Microsoft Dynamics 365 and .NET solutions at PT Bintang Aplikasi Perkasa.
          </p>
          <p>
            Before that, I developed academic platforms at PT Aoki Mori Indonesia and contributed to computer-vision, LLM-evaluation, and data projects at INaAI. I enjoy taking a system from its data model through its interface and into dependable production workflows.
          </p>
          <a className="text-link" href={cvPath} target="_blank" rel="noreferrer">
            Open résumé <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="about__facts" aria-label="Career facts">
        <div className="about__fact">
          <span className="about__fact-value">3.50</span>
          <span className="about__fact-label">GPA · IT Del</span>
        </div>
        <div className="about__fact">
          <span className="about__fact-value">10</span>
          <span className="about__fact-label">Selected projects</span>
        </div>
        <div className="about__fact">
          <span className="about__fact-value">03</span>
          <span className="about__fact-label">Professional roles</span>
        </div>
      </div>
    </section>
  )
}
