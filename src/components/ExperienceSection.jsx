import React, { useState, useEffect } from "react";
import "../css/ExperienceSection.css";
import { FiGithub, FiExternalLink, FiCode, FiTool } from "react-icons/fi";
import {
  SiLaravel,
  SiVuedotjs,
  SiMysql,
  SiPython,
  SiFastapi,
  SiNextdotjs,
  SiPytorch,
  SiReact,
  SiPostgresql,
  SiStreamlit,
  SiTensorflow,
  SiFlutter,
  SiDart,
  SiFirebase,
  SiPhp,
  SiTailwindcss,
  SiFigma
} from "react-icons/si";
import { TbBrandXamarin } from "react-icons/tb";

const ExperienceSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const openImage = (imgSrc) => {
    if (!imgSrc) return;
    setModalImage(imgSrc);
    setIsOpen(true);
  };

  const closeImage = () => {
    setIsOpen(false);
    setModalImage(null);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") closeImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Icon mapping untuk tech stack
  const getTechIcon = (techName) => {
    const iconMap = {
      "laravel": SiLaravel,
      "vue.js": SiVuedotjs,
      "vue": SiVuedotjs,
      "mysql": SiMysql,
      "i18n": FiTool,
      "python": SiPython,
      "fastapi": SiFastapi,
      "next.js": SiNextdotjs,
      "nextjs": SiNextdotjs,
      "whisper": FiCode,
      "pytorch": SiPytorch,
      "inertia.js": SiReact,
      "inertia": SiReact,
      "react": SiReact,
      "postgresql": SiPostgresql,
      "postgres": SiPostgresql,
      "streamlit": SiStreamlit,
      "xgboost": FiCode,
      "tensorflow": SiTensorflow,
      "flutter": SiFlutter,
      "dart": SiDart,
      "firebase": SiFirebase,
      "firestore": SiFirebase,
      "java": FiCode,
      "java swing": FiCode,
      "jdbc": FiCode,
      "figma": SiFigma,
      "bmc": FiTool,
      "market analysis": FiTool,
      "strategy": FiTool,
      "php": SiPhp,
      "tailwind css": SiTailwindcss,
      "tailwind": SiTailwindcss,
      "cobit": FiTool,
      "itil": FiTool,
      "iso 38500": FiTool
    };

    const key = techName.toLowerCase().trim();
    return iconMap[key] || FiCode;
  };

  const workExperience = {
    badge: "Professional",
    role: "Part-time Web Developer",
    date: "Aug 2025 – Dec 2025",
    title: "PT AOKI MORI INDONESIA",
    company: "North Sumatra",
    address: "Siborongborong, North Sumatra",
    description: "Multilingual company profile with integrated student registration system",
    highlights: [
      "Developed company profile website with online student registration platform",
      "Implemented multilingual support (Japanese, English, Indonesian) with dynamic switching",
      "Designed responsive UI layouts aligned with company branding",
      "Collaborated with internal team to deliver production-ready features"
    ],
    tech: ["Laravel", "Vue.js", "MySQL", "i18n"],
    githubUrl: "https://github.com/felixnatanaelbutarbutar/lpk-site.git",
    image: "/assets/image/lpk.png"
  };

  const projects = [
    {
      role: "Machine Learning Engineer",
      date: "Aug 2024 – Jan 2025",
      title: "IELTS Speaking Evaluation System",
      company: "Web-Based NLP Application",
      description: "Automated evaluation system integrating Whisper, T5-Base, and DeBERTa v3-Base for grammar and coherence analysis",
      highlights: [
        "Integrated Whisper for speech-to-text, T5-Base for grammar correction",
        "DeBERTa v3-Base for semantic coherence evaluation",
        "Deployed with FastAPI backend and Next.js frontend"
      ],
      tech: ["Python", "FastAPI", "Next.js", "Whisper", "PyTorch"],
      githubUrl: "",
      image: "/assets/image/ielts.png"
    },
    {
      role: "Full Stack Developer",
      date: "Jan 2025 – Jul 2025",
      title: "IT Del Student Information System",
      company: "Institut Teknologi Del",
      description: "Comprehensive campus information system with 24 features and 4 role-based access levels",
      highlights: [
        "Full-stack architecture using Laravel and Inertia.js with React",
        "Secure PostgreSQL database schema for 24 functional features",
        "Implemented RBAC for 4 system roles"
      ],
      tech: ["Laravel", "Inertia.js", "React", "PostgreSQL","Typescript"],
      githubUrl: "https://github.com/felixnatanaelbutarbutar/PA-II-07-Sistem-Informasi-Kemahasiswaan-IT-DEL.git",
      image: "/assets/image/sik1.png"
    },
    {
      role: "ML Engineer & Full-Stack Developer",
      date: "Aug 2025 – Dec 2025",
      title: "Student Stress Level Prediction",
      company: "Machine Learning Project",
      description: "Ensemble ML model using 1D-CNN and XGBoost to predict student stress levels",
      highlights: [
        "Data preprocessing, feature engineering, and SMOTE balancing",
        "2-Block 1D-CNN model for embedding extraction",
        "Deployed interactive Streamlit web application"
      ],
      tech: ["Python", "Streamlit", "XGBoost", "TensorFlow"],
      githubUrl: "",
      image: "/assets/image/certan.png"
    },
    {
      role: "Mobile Application Developer",
      date: "Aug 2024 – Dec 2024",
      title: "DelCheckIn – Digital Attendance",
      company: "Institut Teknologi Del",
      description: "Mobile app to digitize attendance process for 500+ students and staff",
      highlights: [
        "Complete mobile attendance system for 500+ users",
        "Firebase Authentication and Firestore for real-time data",
        "Reduced attendance processing time by 80%"
      ],
      tech: ["Flutter", "Dart", "Firebase", "Firestore"],
      githubUrl: "https://github.com/felixnatanaelbutarbutar/FLUTTER-ATTENDANCE-APP-USING-FIREBASE.git",
      image: "/assets/image/pam.png"
    },
    {
      role: "Backend & Frontend Developer",
      date: "Jan 2024 – May 2024",
      title: "Cinema Ticketing System",
      company: "Desktop Application",
      description: "Desktop cinema management with dynamic seat selection and payment processing",
      highlights: [
        "Dynamic seat selection and validation system",
        "Automated payment calculation and receipt printing",
        "Admin module for movie and showtime management"
      ],
      tech: ["Java", "Java Swing", "PostgreSQL", "JDBC"],
      githubUrl: "https://github.com/felixnatanaelbutarbutar/OOP-JAVA-APLIKASI-TIKET-BIOSKOP-.git",
      image: "/assets/image/pbo.png"
    },
    {
      role: "Business Concept Strategist",
      date: "Oct 2025 – Dec 2025",
      title: "Toba Essence: Heritage You Can Taste",
      company: "Cultural Tourism Innovation",
      description: "Tourism service concept integrating cultural experiences around Lake Toba",
      highlights: [
        "Market research and business opportunity validation",
        "Comprehensive Business Model Canvas creation",
        "Digital platform prototype design in Figma"
      ],
      tech: ["Figma", "BMC", "Market Analysis", "Strategy"],
      githubUrl: "",
      image: "/assets/image/tekno.png"
    },
    {
      role: "Web Developer",
      date: "Jan 2024 – May 2024",
      title: "HKBP Church Information System",
      company: "Church Management Platform",
      description: "Digital church management system serving 300+ congregation members",
      highlights: [
        "System architecture and database structure design",
        "Admin dashboard for financial records and announcements",
        "Increased administrative efficiency by 70%"
      ],
      tech: ["Laravel", "PHP", "MySQL", "Tailwind CSS"],
      githubUrl: "https://github.com/felixnatanaelbutarbutar/SISTEM-INFORMASI-HKBP_PEANAJAGAR.git",
      image: "/assets/image/pa1.png"
    },
    {
      role: "IT Governance Project",
      date: "Dec 2025",
      title: "System Capacity Governance",
      company: "Dinas X Public Service",
      description: "Designed capacity management governance for a public service system that frequently failed during peak load.",
      highlights: [
        "Assessed current capacity practices using ITIL, COBIT, and ISO 38500",
        "Identified key bottlenecks and governance gaps",
        "Designed As-Is vs To-Be capacity processes and improvement roadmap"
      ],
      tech: ["COBIT", "ITIL", "ISO 38500"],
      githubUrl: "",
      image: "/assets/image/tkti.png"
    }
  ];

  return (
    <section id="experience" className="experience-section">
      <div className="experience-container">
        <h2 className="section-title">Work Experience & Project</h2>

        <div className="work-experience-wrapper">
          <div className="category-header">
            <h3 className="category-title">Work Experience</h3>
            <div className="category-line" />
          </div>

          <article className="work-card featured-work" aria-labelledby="featured-title">
            <div className="work-badge">{workExperience.badge}</div>

            <div className="featured-image-wrapper">
              <img
                src={workExperience.image}
                alt={`${workExperience.title} screenshot`}
                className="featured-image full-visible"
                onClick={() => openImage(workExperience.image)}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="work-header">
              <div className="work-meta" aria-hidden={false}>
                <span className="badge-brand badge-orange work-role">{workExperience.role}</span>
                <span className="badge-brand badge-teal work-date">{workExperience.date}</span>
              </div>

              <h3 id="featured-title" className="work-title">{workExperience.title}</h3>
              <p className="work-company-address">{workExperience.company} • {workExperience.address}</p>
              <p className="work-description">{workExperience.description}</p>
            </div>

            <ul className="work-highlights">
              {workExperience.highlights.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <div className="work-tech">
              {workExperience.tech.map((tech, i) => {
                const IconComponent = getTechIcon(tech);
                return (
                  <span key={i} className="tech-tag">
                    <IconComponent className="tech-icon" />
                    <span> {tech}</span>
                  </span>
                );
              })}
            </div>

            <div className="project-links">
              {workExperience.githubUrl && (
                <a href={workExperience.githubUrl} target="_blank" rel="noopener noreferrer" className="github-link">
                  <FiGithub />
                  <span>View on GitHub</span>
                </a>
              )}
            </div>
          </article>
        </div>

        <div className="projects-wrapper">
          <div className="category-header">
            <h3 className="category-title">Academic & Personal Projects</h3>
            <div className="category-line" />
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <article key={index} className={`project-card ${index >= 5 ? "last-row" : ""}`}>
                <div className="project-image-wrapper">
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="project-image full-visible"
                    onClick={() => openImage(project.image)}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="card-accent" />
                <div className="project-meta">
                  <span className="project-role">{project.role}</span>
                  <span className="project-date">{project.date}</span>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-company">{project.company}</p>
                <p className="project-description">{project.description}</p>

                <ul className="project-highlights">
                  {project.highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                <div className="project-tech">
                  {project.tech.map((tech, i) => {
                    const IconComponent = getTechIcon(tech);
                    return (
                      <span key={i} className="tech-badge">
                        <IconComponent className="tech-icon" />
                        <span> {tech}</span>
                         
                      </span>
                    );
                  })}
                </div>

                <div className="project-links">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="github-link">
                      <FiGithub />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {isOpen && modalImage && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true" aria-label="Image preview">
          <div className="lightbox-content">
            <button className="lightbox-close" aria-label="Close" onClick={closeImage}>✕</button>
            <div className="lightbox-main">
              <img src={modalImage} alt="preview" className="lightbox-image" />
            </div>
          </div>
          <div className="lightbox-backdrop" onClick={closeImage} />
        </div>
      )}
    </section>
  );
};

export default ExperienceSection;
// felixnatanaelbutarbutar