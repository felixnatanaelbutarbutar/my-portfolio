import React, { useState, useEffect, useRef } from "react";
import '../css/AboutSection.css';

const IconDownload = ({ className = "" }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M21 15v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 15V3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AboutSection = () => {
  const cvPath = "/assets/pdf/CV_FelixNatanaelButarbutar.pdf";
  
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  
  const fullText = "Developer • Problem solver • System thinker";

  // Intersection Observer for reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Typing animation
  useEffect(() => {
    if (!isVisible) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [isVisible]);

  // Cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // Mouse tracking for gradient effect
  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  // Contact cards data
  const contactCards = [
    {
      icon: "📞",
      label: "Telepon",
      value: "+62 851-4223-2595",
      href: "tel:+6285142232595",
      gradient: "linear-gradient(90deg, #10b981, #06b6d4)",
      delay: "0.2s"
    },
    {
      icon: "✉️",
      label: "Email",
      value: "felixnatb@gmail.com",
      href: "mailto:felixnatb@gmail.com",
      gradient: "linear-gradient(90deg, #06b6d4, #3b82f6)",
      delay: "0.3s"
    },
    {
      icon: "🔗",
      label: "Portfolio",
      value: "felixnatanael.my.id",
      href: "https://felixnatanael.my.id",
      gradient: "linear-gradient(90deg, #111827, #374151)",
      delay: "0.4s",
      external: true
    },
    {
      icon: "📍",
      label: "Lokasi",
      value: "Tapanuli Utara, Indonesia",
      href: null,
      gradient: "linear-gradient(90deg, #ef4444, #fb923c)",
      delay: "0.5s"
    }
  ];

  return (
    <section 
      id="about" 
      className={`about-section ${isVisible ? 'visible' : ''}`}
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mousePos.x}%`,
        '--mouse-y': `${mousePos.y}%`
      }}
    >
      {/* Animated Background Elements */}
      <div className="about-bg-effects">
        <div className="floating-circle circle-1" />
        <div className="floating-circle circle-2" />
        <div className="floating-circle circle-3" />
        <div className="gradient-mesh" />
      </div>

      <div className="about-wrap">
        <div className="about-grid" role="region" aria-label="Tentang saya">

          {/* LEFT */}
          <div 
            className="about-left animate-slide-in"
            ref={leftRef}
          >
            <div className="title-wrapper">
              <h3 className="about-title">
                <span className="title-text">About Me</span>
                <span className="title-glow" />
              </h3>
            </div>
            
            <p className="about-sub typing-text">
              {typedText}
              <span className={`cursor ${cursorVisible ? 'visible' : ''}`}>|</span>
            </p>

            <div className="about-body">
              <p className="paragraph-animated">
                Diploma (D3) Information Technology student at Institut Teknologi Del with hands-on experience as a Part-time
                Web Developer at PT AOKI MORI INDONESIA. Built and deployed a production-ready company profile and online student
                registration system with multilingual support (Japanese, English, Indonesian) and responsive UI. Comfortable working
                on both frontend and backend to turn business requirements into working features. Currently seeking a Software
                Engineer Internship where I can contribute to real projects, improve my skills, and learn from experienced engineers,
                and I am flexible to take on Backend, Frontend, or Fullstack Software Engineer intern roles.
              </p>
            </div>

            {/* CTA: Download CV */}
            <div className="cta-wrapper">
              <a
                className="btn-primary btn-animated"
                href={cvPath}
                download
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download CV Felix Natanael"
              >
                <span className="btn-bg-effect" />
                <IconDownload className="btn-icon" />
                <span className="btn-text">Download CV</span>
                <span className="btn-shine" />
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <aside 
            className="about-right animate-slide-in-right" 
            aria-label="Kontak dan profil"
            ref={rightRef}
          >
            {/* Profile Card */}
            <div className="profile profile-animated" role="article" aria-label="Profil singkat">
              <div className="profile-avatar">
                <div className="avatar-glow" />
                <div className="avatar">
                  <span>FN</span>
                </div>
                <div className="avatar-ring" />
              </div>
              
              <div className="profile-meta">
                <div className="profile-name">
                  Felix Natanael Butarbutar
                </div>
                <div className="profile-role">
                  Full-Stack Developer
                </div>
                <div className="profile-tagline">
                  Focused on scalable web & mobile systems
                </div>
              </div>
            </div>

            {/* Contact Cards */}
            {contactCards.map((contact, index) => {
              const CardElement = contact.href ? 'a' : 'div';
              const cardProps = contact.href ? {
                href: contact.href,
                ...(contact.external && { 
                  target: "_blank", 
                  rel: "noreferrer" 
                })
              } : {};

              return (
                <CardElement
                  key={index}
                  className="contact-card contact-card-animated"
                  style={{ 
                    '--card-delay': contact.delay,
                    '--card-index': index
                  }}
                  {...cardProps}
                >
                  <div className="contact-card-glow" />
                  <div 
                    className="contact-icon" 
                    style={{ background: contact.gradient }}
                    aria-hidden
                  >
                    <span className="icon-emoji">{contact.icon}</span>
                    <span className="icon-pulse" />
                  </div>
                  <div className="contact-info">
                    <div className="contact-label">{contact.label}</div>
                    <div className="contact-value">{contact.value}</div>
                  </div>
                  {contact.href && (
                    <div className="contact-arrow">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  )}
                </CardElement>
              );
            })}

            {/* Floating Stats/Badges */}
            
          </aside>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;