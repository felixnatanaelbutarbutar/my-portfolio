import React from "react";
import "../css/AboutSection.css";

const AboutSection = () => {
  const cvPath = "/assets/pdf/CV_FelixNatanaelButarbutar.pdf";

  return (
    <section id="about" className="about">
      {/* Decorative accent shape */}
      <div className="about__accent" aria-hidden="true" />

      <div className="about__container">

        {/* Oversized label */}
        <div className="about__label-row">
          <span className="about__label">About</span>
          <div className="about__label-line" />
        </div>

        {/* Asymmetric content grid */}
        <div className="about__content">

          {/* Left column — offset intro */}
          <div className="about__intro">
            <h2 className="about__title">
              Software Dev.<br />
              <span className="about__title--light">AI Engineer.</span><br />
              <span className="about__title--accent">System Thinker.</span>
            </h2>
          </div>

          {/* Right column — body text */}
          <div className="about__body">
            <p>
              Information Technology Graduate from Institut Teknologi Del with a versatile background in Full-stack Development and AI Engineering.
            </p>
            <p>
              Previously, I served as a Web Developer at PT AOKI MORI INDONESIA, where I deployed production-ready multilingual systems. Most recently, as an AI Engineer Intern at PT Teknologi Cerdas Berdaulat Indonesia,
              I contributed to various real-world AI projects, bridging the gap between complex algorithms and functional software.
              I am passionate about building intelligent, scalable solutions and am currently looking for opportunities to grow as a Software or AI Engineer.
            </p>
          </div>

        </div>

        {/* Quick facts strip */}
        <div className="about__facts">
          <div className="about__fact">
            <span className="about__fact-num">3.37</span>
            <span className="about__fact-label">GPA</span>
          </div>
          <div className="about__fact-divider" />
          <div className="about__fact">
            <span className="about__fact-num">10+</span>
            <span className="about__fact-label">Projects</span>
          </div>
          <div className="about__fact-divider" />
          <div className="about__fact">
            <span className="about__fact-num">2</span>
            <span className="about__fact-label">Work Experience</span>
          </div>
          <div className="about__fact-divider" />
          <a
            className="about__cta"
            href={cvPath}
            download
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download CV"
          >
            <span className="about__cta-text">Download CV</span>
            <svg className="about__cta-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 15v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;