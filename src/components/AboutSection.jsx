import React from "react";
import "../css/AboutSection.css";

const AboutSection = () => {
  const cvPath = "/assets/pdf/CV_FelixNatanaelButarbutar.pdf";

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-grid">

          {/* Left — Main Content */}
          <div className="about-main">
            <h2 className="about-heading">About Me</h2>
            <p className="about-tagline">Developer · Problem Solver · System Thinker</p>

            <div className="about-text">
              <p>
                Diploma (D3) Information Technology student at Institut Teknologi Del
                with hands-on experience as a Part-time Web Developer at PT AOKI MORI
                INDONESIA. Built and deployed a production-ready company profile and
                online student registration system with multilingual support (Japanese,
                English, Indonesian) and responsive UI.
              </p>
              <p>
                Comfortable working on both frontend and backend to turn business
                requirements into working features. Currently seeking a Software
                Engineer Internship where I can contribute to real projects, improve my
                skills, and learn from experienced engineers — flexible to take on
                Backend, Frontend, or Fullstack roles.
              </p>
            </div>

            <a
              className="about-cta"
              href={cvPath}
              download
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download CV Felix Natanael"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21 15v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 15V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download CV
            </a>
          </div>

          {/* Right — Info Card */}
          <aside className="about-aside">
            <div className="about-profile-card">
              <div className="about-avatar">FN</div>
              <div>
                <div className="about-name">Felix Natanael Butarbutar</div>
                <div className="about-role">Full-Stack Developer</div>
              </div>
            </div>

            <div className="about-contact-list">
              <a href="tel:+6285142232595" className="about-contact-item">
                <span className="about-contact-icon">📞</span>
                <div>
                  <span className="about-contact-label">Phone</span>
                  <span className="about-contact-value">+62 851-4223-2595</span>
                </div>
              </a>

              <a href="mailto:felixnatb@gmail.com" className="about-contact-item">
                <span className="about-contact-icon">✉️</span>
                <div>
                  <span className="about-contact-label">Email</span>
                  <span className="about-contact-value">felixnatb@gmail.com</span>
                </div>
              </a>

              <a href="https://felixnatanael.my.id" target="_blank" rel="noreferrer" className="about-contact-item">
                <span className="about-contact-icon">🔗</span>
                <div>
                  <span className="about-contact-label">Portfolio</span>
                  <span className="about-contact-value">felixnatanael.my.id</span>
                </div>
              </a>

              <div className="about-contact-item">
                <span className="about-contact-icon">📍</span>
                <div>
                  <span className="about-contact-label">Location</span>
                  <span className="about-contact-value">Tapanuli Utara, Indonesia</span>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;