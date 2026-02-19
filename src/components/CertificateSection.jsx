import { useState } from "react";
import "../css/CertificateSection.css";

const CERTIFICATES = [
  {
    id: "aws-ml",
    title: "AWS Certified Machine Learning Specialty 2025",
    issuer: "Amazon Web Services (AWS)",
    date: "2025",
    type: "Hands-On Training",
    description:
      "Comprehensive training on machine learning services and best practices on AWS platform.",
    skills: ["Machine Learning", "AWS SageMaker", "Deep Learning", "Model Deployment"],
    logo: "/assets/image/AWS.svg",
    credentialUrl: "/assets/pdf/certificate_aws_felixnatanaelbutarbutar.pdf",
  },
  {
    id: "dicoding-c",
    title: "Memulai Pemrograman Dengan C",
    issuer: "Dicoding Indonesia",
    date: "2025",
    type: "Course Completion",
    description: "Fundamental programming concepts and C language mastery.",
    skills: ["C Programming", "Data Structures", "Algorithms", "Memory Management"],
    logo: "/assets/image/dicoding-logo.png",
    credentialUrl: "/assets/pdf/Dicoding Academy Certificate.pdf",
  },
];

const CertificateCard = ({ item }) => {
  const [imgError, setImgError] = useState(false);
  const initials = item.issuer
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="cert-card" aria-labelledby={`${item.id}-title`}>
      <div className="cert-card__logo">
        {!imgError ? (
          <img
            src={item.logo}
            alt={item.issuer}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="cert-card__logo-fallback" aria-hidden="true">
            {initials}
          </div>
        )}
      </div>

      <div className="cert-card__body">
        <div className="cert-card__top">
          <div>
            <h3 id={`${item.id}-title`} className="cert-card__title">
              {item.title}
            </h3>
            <p className="cert-card__issuer">{item.issuer}</p>
          </div>
          <div className="cert-card__meta">
            <span className="cert-card__date">{item.date}</span>
            <span className="cert-card__type">{item.type}</span>
          </div>
        </div>

        <p className="cert-card__desc">{item.description}</p>

        <div className="cert-card__skills">
          {item.skills.map((skill, i) => (
            <span key={i} className="cert-card__skill">{skill}</span>
          ))}
        </div>

        {item.credentialUrl && (
          <a
            href={item.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cert-card__link"
          >
            View Credential
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
};

const CertificateSection = () => (
  <section id="certificates" className="section cert-section" aria-labelledby="cert-title">
    <div className="cert-container">
      <h2 id="cert-title" className="cert-heading">Certificates & Training</h2>
      <div className="cert-list">
        {CERTIFICATES.map((item) => (
          <CertificateCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  </section>
);

export default CertificateSection;