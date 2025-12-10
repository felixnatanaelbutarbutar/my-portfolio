import React from "react";
import '../css/AboutSection.css' // pastikan path ini sesuai struktur proyekmu


/**
 * AboutSection — versi minimal tanpa foto & tanpa Skill Snapshot.
 * Tombol Download CV mengarah ke: /assest/pdf/CV_FelixNatanaelButarbutar.pdf
 * (gunakan path persis yang kamu taruh di folder public)
 */

const IconDownload = ({ className = "" }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M21 15v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 15V3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AboutSection = () => {
  const cvPath = "/assets/pdf/CV_FelixNatanaelButarbutar.pdf"; // path sesuai yang kamu sebutkan

  return (
    <section id="about" className="about-section">


      <div className="about-wrap">
        <div className="about-grid" role="region" aria-label="Tentang saya">

          {/* LEFT */}
          <div className="about-left">
            <h3 className="about-title">About Me</h3>
            <p className="about-sub">Developer • Problem solver • System thinker</p>

            <div className="about-body">
              <p>
                Diploma (D3) Information Technology student at Institut Teknologi Del with hands-on experience as a Part-time
                Web Developer at PT AOKI MORI INDONESIA. Built and deployed a production-ready company profile and online student
                registration system with multilingual support (Japanese, English, Indonesian) and responsive UI. Comfortable working
                on both frontend and backend to turn business requirements into working features. Currently seeking a Software
                Engineer Internship where I can contribute to real projects, improve my skills, and learn from experienced engineers,
                and I am flexible to take on Backend, Frontend, or Fullstack Software Engineer intern roles.               </p>
            </div>

            {/* CTA: Download CV */}
            <div style={{ marginTop: 18 }}>
              <a
                className="btn-primary"
                href={cvPath}
                download
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download CV Felix Natanael"
              >
                <IconDownload />
                <span>Download CV</span>
              </a>


            </div>
          </div>

          {/* RIGHT */}
          <aside className="about-right" aria-label="Kontak dan profil">
            <div className="profile" role="article" aria-label="Profil singkat">
              <div className="profile-meta">
                <div className="profile-name">Felix Natanael Butarbutar</div>
                <div className="profile-role">Full-Stack Developer</div>
                <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 6 }}>Focused on scalable web & mobile systems</div>
              </div>
            </div>

            <a className="contact-card" href="tel:+6285142232595">
              <div className="contact-icon" aria-hidden>📞</div>
              <div className="contact-info">
                <div className="contact-label">Telepon</div>
                <div className="contact-value">+62 851-4223-2595</div>
              </div>
            </a>

            <a className="contact-card" href="mailto:felixnatb@gmail.com">
              <div className="contact-icon" aria-hidden style={{ background: "linear-gradient(90deg,#06b6d4,#3b82f6)" }}>✉️</div>
              <div className="contact-info">
                <div className="contact-label">Email</div>
                <div className="contact-value">felixnatb@gmail.com</div>
              </div>
            </a>

            <a className="contact-card" href="https://felixnatanael.my.id" target="_blank" rel="noreferrer">
              <div className="contact-icon" aria-hidden style={{ background: "linear-gradient(90deg,#111827,#374151)" }}>🔗</div>
              <div className="contact-info">
                <div className="contact-label">Portfolio</div>
                <div className="contact-value">felixnatanael.my.id</div>
              </div>
            </a>

            <div className="contact-card">
              <div className="contact-icon" aria-hidden style={{ background: "linear-gradient(90deg,#ef4444,#fb923c)" }}>📍</div>
              <div className="contact-info">
                <div className="contact-label">Lokasi</div>
                <div className="contact-value">Tapanuli Utara, Indonesia</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
